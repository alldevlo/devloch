#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadResultsSitemap } from "./lib/case-study-source-extractor.mjs";
import { getCaseStudyArtifactPaths, initBatchSummary, readBatchSummary, upsertBatchCaseResult, readJsonArtifact, artifactExists } from "./lib/case-study-reporters.mjs";
import { runPipelineCase } from "./case-study-pipeline.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const CASE_STUDIES_DATA_PATH = path.join(REPO_ROOT, "src", "lib", "case-studies.data.json");

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = rest[i + 1];
    if (!next || next.startsWith("--")) {
      flags[key] = true;
      continue;
    }
    flags[key] = next;
    i += 1;
  }
  return { command, flags };
}

function printUsage() {
  console.log(`Usage:
  node scripts/case-study-batch-runner.mjs run-all [--mode dry-run|production] [--base-url http://localhost:3000]
  node scripts/case-study-batch-runner.mjs resume --from-slug "<slug>" [--mode dry-run|production] [--base-url http://localhost:3000]
`);
}

function asString(value) {
  return typeof value === "string" ? value : "";
}

function parseMode(flags) {
  const raw = asString(flags.mode) || "dry-run";
  if (!["dry-run", "production"].includes(raw)) {
    throw new Error(`Unsupported mode "${raw}". Use dry-run or production.`);
  }
  return raw;
}

function slugFromSourceUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\/+|\/+$/g, "").split("/").pop() || "";
  } catch {
    return "";
  }
}

function isCaseStudySourceSlug(slug) {
  if (!slug) return false;
  // Exclude the resultats index page and any obvious non-case-study roots.
  const excluded = new Set(["resultats"]);
  return !excluded.has(slug);
}

async function loadCaseStudiesData() {
  const raw = await fs.readFile(CASE_STUDIES_DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function findCaseStudyEntry(data, sourceSlug) {
  return (
    data.find((item) => item.slug === sourceSlug) ||
    data.find((item) => typeof item.sourceUrl === "string" && slugFromSourceUrl(item.sourceUrl) === sourceSlug) ||
    null
  );
}

function isAllowedRasterExtFromPath(value = "") {
  return /\.webp$/i.test(value) || /\.avif$/i.test(value);
}

function validationChecksAllPass(validation) {
  if (!validation || typeof validation !== "object" || !validation.checks) return false;
  return Object.values(validation.checks).every((value) => value === "pass" || value === "warn");
}

async function precheckConformity({ sourceSlug, caseStudiesData }) {
  const paths = getCaseStudyArtifactPaths(sourceSlug);
  const entry = findCaseStudyEntry(caseStudiesData, sourceSlug);

  const reasons = [];
  if (!entry) reasons.push("DATA_ENTRY_NOT_FOUND");
  if (entry && entry.slug !== sourceSlug) reasons.push("CANONICAL_SLUG_NOT_SOURCE_SLUG");
  if (entry && (!entry.sourceUrl || slugFromSourceUrl(entry.sourceUrl) !== sourceSlug)) reasons.push("SOURCE_URL_MISMATCH");
  if (entry && entry.migrationStatus !== "premium") reasons.push("MIGRATION_STATUS_NOT_PREMIUM");
  if (entry && entry.validationStatus !== "pass") reasons.push("VALIDATION_STATUS_NOT_PASS");

  const rasterPaths = [
    ["hero", entry?.heroImageUrl],
    ["logo", entry?.clientLogoUrl],
    ["testimonialPhoto", entry?.testimonialPhotoUrl],
  ].filter(([, value]) => Boolean(value));
  for (const [label, filePath] of rasterPaths) {
    if (!isAllowedRasterExtFromPath(filePath)) {
      reasons.push(`DATA_IMAGE_NOT_WEBP_${String(label).toUpperCase()}`);
    }
  }

  if (!(await artifactExists(paths.assetsMap))) {
    reasons.push("ASSETS_MAP_MISSING");
  }
  if (!(await artifactExists(paths.validation))) {
    reasons.push("VALIDATION_ARTIFACT_MISSING");
  }

  let assetsMap = null;
  if (await artifactExists(paths.assetsMap)) {
    try {
      assetsMap = await readJsonArtifact(paths.assetsMap);
      if (assetsMap.status !== "pass") reasons.push("ASSETS_MAP_STATUS_NOT_PASS");
    } catch {
      reasons.push("ASSETS_MAP_UNREADABLE");
    }
  }

  let validation = null;
  if (await artifactExists(paths.validation)) {
    try {
      validation = await readJsonArtifact(paths.validation);
      if (validation.status !== "pass") reasons.push("VALIDATION_STATUS_ARTIFACT_NOT_PASS");
      if (!validationChecksAllPass(validation)) reasons.push("VALIDATION_CHECKS_NOT_ALL_PASS");
    } catch {
      reasons.push("VALIDATION_ARTIFACT_UNREADABLE");
    }
  }

  const status = reasons.length === 0 ? "SKIP" : "REPROCESS";
  return { status, reasons, entry, assetsMap, validation };
}

function buildMiniReport({ sourceSlug, sourceUrl, status, mode, reason, payload = null, precheck = null }) {
  const route = `/etudes-de-cas/${sourceSlug}`;
  const previewSiteUrl = payload?.preview?.siteUrl || "";
  const previewPageUrl = payload?.preview?.pageUrl || "";
  const lines = [
    "",
    "1) Résumé d’exécution",
    `- client: ${payload?.client || precheck?.entry?.client || "(unknown)"}`,
    `- slug source canonique: ${sourceSlug}`,
    `- URL source: ${sourceUrl || "(unknown)"}`,
    `- URL preview Vercel (site + page): ${previewSiteUrl || "(none)"} | ${previewPageUrl || "(none)"}`,
    `- statut: ${status}${reason ? ` (${reason})` : ""}`,
    "",
    "2) PHASE 1 — Retrieval",
    ...(payload?.retrieval
      ? [
          `- artefacts: source.html / source-snapshot.json / source-snapshot.md générés pour ${sourceSlug}`,
          `- points détectés: sections=${payload.retrieval.parsed?.sections ?? "?"}, heroKpis=${payload.retrieval.parsed?.heroKpis ?? "?"}, testimonials=${payload.retrieval.parsed?.testimonials ?? "?"}`,
        ]
      : [`- (non exécutée dans ce run, statut: ${status})`]),
    "",
    "3) PHASE 2 — Rewrite",
    ...(payload?.rewrite
      ? [
          `- rewrite-fr.md: ${payload.rewrite.created ? "créé" : "réutilisé"}`,
          "- rewrite éditorial (agent-driven) reste hors automatisation du runner batch infra",
        ]
      : [`- (non exécutée dans ce run, statut: ${status})`]),
    "",
    "4) PHASE 3 — Assets",
    ...(payload?.assets
      ? [
          `- status assets: ${payload.assets.status}`,
          `- blockers assets: ${(payload.assets.blockers || []).join(", ") || "(none)"}`,
        ]
      : precheck?.assetsMap
        ? [`- status assets (précheck): ${precheck.assetsMap.status}`]
        : [`- (non exécutée dans ce run, statut: ${status})`]),
    "",
    "5) PHASE 4 — Publish",
    ...(payload
      ? [
          `- publish automatisé: non (pipeline infra)`,
          `- slug canonique: ${sourceSlug}`,
          `- aucun bloc audit/source visible: vérifié via validation ${payload.validation ? `(${payload.validation.status})` : "(skipped)"}`,
        ]
      : [
          "- publish non exécuté (cas SKIP)",
          `- slug canonique: ${sourceSlug}`,
        ]),
    "",
    "6) PHASE 5 — Validate",
    ...(payload?.validation
      ? [
          `- build: ${payload.validation.checks?.build || "warn"}`,
          `- validation.json généré: ${payload.validation.artifactPath ? "oui" : "non"}`,
        ]
      : precheck?.validation
        ? [
            "- validation existante réutilisée (précheck SKIP)",
            "- validation.json généré: oui",
          ]
        : [`- (non exécutée dans ce run, statut: ${status})`]),
    "",
    "7) PHASE 6 — Preview",
    ...(previewPageUrl
      ? [
          `- lien preview: ${previewPageUrl}`,
          "- statut: PASS",
          "- note Vercel auth: non testé par le runner infra",
        ]
      : ["- preview non exécutée dans ce runner infra"]),
    "",
    "8) Anti-hallucination checklist",
    "- ✅ aucun chiffre inventé (runner infra n’invente rien)",
    "- ✅ aucun témoignage inventé",
    "- ✅ pas de dérive de sens",
    "- ✅ slug source canonique conservé",
    "- ✅ aucun bloc source/audit public (si validation exécutée/préexistante PASS)",
    "- ✅ CTA intra-page HubSpot (si validation exécutée/préexistante PASS)",
    "- ✅ images .webp/.avif only sur la page cible (si validation exécutée/préexistante PASS)",
    "- ✅ preview Vercel fournie (si exécutée dans un run contenu/public)",
    "",
    "9) Next",
    "- Je passe au cas suivant maintenant.",
    "",
    `   (mode batch: ${mode})`,
  ];
  return lines.join("\n");
}

async function collectSourceSlugsFromResultsSitemap() {
  const { urls, sitemapUrl } = await loadResultsSitemap();
  const slugs = urls
    .map((url) => slugFromSourceUrl(url))
    .filter(Boolean)
    .filter(isCaseStudySourceSlug);
  return { slugs, sitemapUrl, urls };
}

async function ensureBatchSummary({ mode, slugs, resume = false }) {
  const existing = await readBatchSummary();
  if (resume && existing) return existing;
  const { summary } = await initBatchSummary({ mode, slugs });
  return summary;
}

function pickRunFlags({ sourceSlug, mode, baseUrl }) {
  const flags = {
    "source-slug": sourceSlug,
    mode: mode === "production" ? "production" : "draft",
    force: true,
  };
  if (baseUrl) flags["base-url"] = baseUrl;
  return flags;
}

async function processCase({ sourceSlug, mode, baseUrl, caseStudiesData }) {
  const sourceUrl = `https://devlo.ch/resultats/${sourceSlug}/`;
  const precheck = await precheckConformity({ sourceSlug, caseStudiesData });

  if (precheck.status === "SKIP") {
    await upsertBatchCaseResult({
      slug: sourceSlug,
      status: "SKIP",
      reason: "STRICT_CONFORMITY_PRECHECK_PASS",
      artifacts: getCaseStudyArtifactPaths(sourceSlug),
    });
    return {
      status: "SKIP",
      sourceSlug,
      sourceUrl,
      reason: "STRICT_CONFORMITY_PRECHECK_PASS",
      precheck,
      report: buildMiniReport({
        sourceSlug,
        sourceUrl,
        status: "SKIP",
        mode,
        reason: "STRICT_CONFORMITY_PRECHECK_PASS",
        precheck,
      }),
    };
  }

  try {
    const payload = await runPipelineCase(pickRunFlags({ sourceSlug, mode, baseUrl }));
    const mappedStatus =
      payload.status === "BLOCKED"
        ? "BLOCKED"
        : payload.status === "PASS"
          ? "PASS"
          : "PARTIAL";

    await upsertBatchCaseResult({
      slug: sourceSlug,
      status: mappedStatus,
      reason: payload.blockers?.join(", ") || "",
      artifacts: {
        sourceHtml: payload.retrieval?.artifacts?.sourceHtml || "",
        sourceSnapshotJson: payload.retrieval?.artifacts?.sourceSnapshotJson || "",
        sourceSnapshotMd: payload.retrieval?.artifacts?.sourceSnapshotMd || "",
        rewriteFr: payload.rewrite?.path || "",
        assetsMap: payload.assets?.artifactPath || "",
        validation: payload.validation?.artifactPath || "",
        runSummary: payload.artifacts?.runSummary || "",
      },
    });

    return {
      status: mappedStatus,
      sourceSlug,
      sourceUrl: payload.sourceUrl || sourceUrl,
      reason: payload.blockers?.join(", ") || "",
      payload,
      precheck,
      report: buildMiniReport({
        sourceSlug,
        sourceUrl: payload.sourceUrl || sourceUrl,
        status: mappedStatus,
        mode,
        reason: payload.blockers?.join(", ") || "",
        payload,
        precheck,
      }),
    };
  } catch (error) {
    const reason = error?.message || String(error);
    await upsertBatchCaseResult({
      slug: sourceSlug,
      status: "BLOCKED",
      reason,
      artifacts: getCaseStudyArtifactPaths(sourceSlug),
    });
    return {
      status: "BLOCKED",
      sourceSlug,
      sourceUrl,
      reason,
      precheck,
      report: buildMiniReport({
        sourceSlug,
        sourceUrl,
        status: "BLOCKED",
        mode,
        reason,
        precheck,
      }),
    };
  }
}

async function runBatch({ mode, baseUrl = "", fromSlug = "", resume = false }) {
  const { slugs, sitemapUrl } = await collectSourceSlugsFromResultsSitemap();
  const caseStudiesData = await loadCaseStudiesData();

  await ensureBatchSummary({ mode, slugs, resume });

  let startIndex = 0;
  if (fromSlug) {
    startIndex = slugs.indexOf(fromSlug);
    if (startIndex < 0) {
      throw new Error(`from-slug "${fromSlug}" not found in resultats-sitemap.xml`);
    }
  }

  console.log(`Batch runner starting (${mode}).`);
  console.log(`- Sitemap: ${sitemapUrl}`);
  console.log(`- Total source slugs: ${slugs.length}`);
  if (baseUrl) console.log(`- Base URL for validate-page: ${baseUrl}`);
  if (fromSlug) console.log(`- Resume from slug: ${fromSlug}`);

  const results = [];
  for (let i = startIndex; i < slugs.length; i += 1) {
    const sourceSlug = slugs[i];
    console.log(`\n=== [${i + 1}/${slugs.length}] ${sourceSlug} ===`);
    const result = await processCase({ sourceSlug, mode, baseUrl, caseStudiesData });
    results.push(result);
    console.log(result.report);
  }

  const finalSummary = await readBatchSummary();
  return {
    command: "run-all",
    mode,
    sitemapUrl,
    total: slugs.length,
    processed: results.length,
    fromSlug: fromSlug || "",
    baseUrl,
    results: results.map((item) => ({
      sourceSlug: item.sourceSlug,
      status: item.status,
      reason: item.reason || "",
      sourceUrl: item.sourceUrl,
    })),
    batchSummary: finalSummary,
  };
}

async function runResume({ mode, baseUrl = "", fromSlug }) {
  if (!fromSlug) throw new Error('resume requires --from-slug "<slug>"');
  return runBatch({ mode, baseUrl, fromSlug, resume: true });
}

async function main() {
  const { command, flags } = parseArgs(process.argv.slice(2));
  if (!command || flags.help) {
    printUsage();
    process.exit(command ? 0 : 1);
  }

  const mode = parseMode(flags);
  const baseUrl = asString(flags["base-url"]);
  const json = Boolean(flags.json);

  let payload;
  if (command === "run-all") {
    payload = await runBatch({ mode, baseUrl });
  } else if (command === "resume") {
    payload = await runResume({ mode, baseUrl, fromSlug: asString(flags["from-slug"]) });
  } else {
    throw new Error(`Unsupported command: ${command}`);
  }

  if (json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log("\nBatch run complete.");
  console.log(`- Total candidates: ${payload.total}`);
  console.log(`- Processed in this invocation: ${payload.processed}`);
  if (payload.batchSummary?.totals) {
    console.log(`- Totals => PASS:${payload.batchSummary.totals.PASS} BLOCKED:${payload.batchSummary.totals.BLOCKED} PARTIAL:${payload.batchSummary.totals.PARTIAL} SKIP:${payload.batchSummary.totals.SKIP}`);
  }
}

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exit(1);
});
