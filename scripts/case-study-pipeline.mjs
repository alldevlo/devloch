#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  retrieveCaseStudySourceArtifacts,
  SITEMAP_INDEX_URL,
  SOURCE_DOMAIN,
} from "./lib/case-study-source-extractor.mjs";
import { auditCaseStudyAssets } from "./lib/case-study-assets.mjs";
import { validateCaseStudyPage } from "./lib/case-study-validators.mjs";
import {
  artifactExists,
  getCaseStudyArtifactPaths,
  readJsonArtifact,
  writeRunSummaryMarkdown,
  writeTextArtifact,
} from "./lib/case-study-reporters.mjs";
import {
  findLegacyCaseStudySlugs,
} from "../src/lib/case-study-slug-redirects.shared.mjs";

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
  node scripts/case-study-pipeline.mjs retrieve --client "Saporo"
  node scripts/case-study-pipeline.mjs retrieve --source-slug "cybersecurite-4500-entreprises" [--force]
  node scripts/case-study-pipeline.mjs assets-audit --source-slug "cybersecurite-4500-entreprises"
  node scripts/case-study-pipeline.mjs validate-page --route "/etudes-de-cas/cybersecurite-4500-entreprises" [--base-url "http://localhost:3000"] [--source-slug "<slug>"] [--legacy-route "/etudes-de-cas/legacy"]
  node scripts/case-study-pipeline.mjs run --source-slug "<slug>" [--mode draft|production] [--base-url "..."] [--force]

Supported commands:
  retrieve
  assets-audit
  validate-page
  run
`);
}

function relativeFromCwd(filePath) {
  return path.relative(process.cwd(), filePath) || ".";
}

function asString(value) {
  return typeof value === "string" ? value : "";
}

function shouldPrintJson(flags) {
  return Boolean(flags.json);
}

function printJson(payload) {
  console.log(JSON.stringify(payload, null, 2));
}

function parseMode(flags) {
  const mode = asString(flags.mode) || "draft";
  if (!["draft", "production"].includes(mode)) {
    throw new Error(`Unsupported mode "${mode}". Use draft or production.`);
  }
  return mode;
}

function buildBaseUrl(flags) {
  return asString(flags["base-url"]) || "";
}

async function ensureRewriteScaffold({ sourceSlug, retrieval }) {
  const paths = getCaseStudyArtifactPaths(sourceSlug);
  if (await artifactExists(paths.rewriteFr)) {
    return { created: false, path: paths.rewriteFr };
  }

  const snapshot = retrieval?.snapshot || (await readJsonArtifact(paths.sourceSnapshotJson));
  const page = snapshot.page;
  const lines = [
    `# Rewrite FR — ${sourceSlug}`,
    "",
    "## Objet",
    "- Réécriture SEO/GEO interne prête à publier (sans hallucination).",
    "- Ce fichier est un artefact interne et ne doit pas être affiché publiquement.",
    "",
    "## Source",
    `- URL source: ${snapshot.sourceUrl}`,
    `- Sitemap: ${snapshot.sitemapUrl}`,
    "",
    "## Structure cible (publique)",
    "1. H1 orienté résultat + client",
    "2. Intro",
    "3. Résultats clés",
    "4. Contexte client",
    "5. Défi / objectif",
    "6. ICP ciblé (si présent)",
    "7. Approche / méthode",
    "8. Résultats",
    "9. Pourquoi ça a fonctionné",
    "10. Témoignage (si présent)",
    "11. CTA final (HubSpot inline)",
    "",
    "## Snapshot rapide",
    `- Title tag: ${page.titleTag || "(not found)"}`,
    `- H1 source: ${page.h1 || "(not found)"}`,
    `- Intro paragraphs: ${page.intro.length}`,
    `- Hero KPIs: ${page.heroKpis.length}`,
    `- Campaign details: ${page.campaignDetails.length}`,
    `- Sections: ${page.sections.length}`,
    `- Testimonials: ${page.testimonials.length}`,
    `- CTAs source détectés: ${page.ctas.length}`,
    "",
    "## SEO/GEO notes (à remplir)",
    "- [ ] Clarifier le contexte client pour un décideur B2B",
    "- [ ] Mettre en avant les KPI principaux (sans ajouter de chiffres)",
    "- [ ] Structurer les H2/H3 pour lisibilité + SEO",
    "- [ ] Garder un ton FR business premium",
    "- [ ] Supprimer du public tout framing audit/source",
    "",
    "## Ambiguïtés source (interne)",
    ...(snapshot.ambiguousClaims.length
      ? snapshot.ambiguousClaims.flatMap((claim) => [
          `- ${claim.label} (policy: ${claim.chosenPolicy})`,
          ...claim.options.map((option) => `  - option: ${option}`),
          `  - note: ${claim.note}`,
        ])
      : ["- (none detected in retrieval)"]),
    "",
    "## Fact integrity checklist (interne)",
    "- Mapper chaque KPI/claim publié à une ligne/section de source-snapshot.md",
    "- Ne publier aucun chiffre non présent dans la source",
    "- Ne pas exposer de texte “source/audit/transparence” dans la page publique",
    "",
  ];

  await writeTextArtifact(paths.rewriteFr, lines.join("\n"));
  return { created: true, path: paths.rewriteFr };
}

export async function runRetrieve(flags) {
  const clientName = asString(flags.client);
  const sourceSlug = asString(flags["source-slug"]);
  const force = Boolean(flags.force);

  if (!clientName && !sourceSlug) {
    throw new Error("retrieve requires --client or --source-slug");
  }

  const result = await retrieveCaseStudySourceArtifacts({
    clientName,
    sourceSlug,
    force,
  });

  return {
    command: "retrieve",
    sourceDomain: SOURCE_DOMAIN,
    sitemapIndexUrl: SITEMAP_INDEX_URL,
    sitemapUrl: result.sitemapUrl,
    sourceUrl: result.sourceUrl,
    sourceSlug: result.sourceSlug,
    artifacts: {
      targetDir: result.artifacts.targetDir,
      sourceHtml: result.artifacts.htmlPath,
      sourceSnapshotJson: result.artifacts.jsonPath,
      sourceSnapshotMd: result.artifacts.mdPath,
    },
    parsed: {
      sections: result.snapshot.page.sections.length,
      heroKpis: result.snapshot.page.heroKpis.length,
      campaignDetails: result.snapshot.page.campaignDetails.length,
      testimonials: result.snapshot.page.testimonials.length,
      missingFromSource: result.snapshot.missingFromSource.length,
    },
    snapshot: result.snapshot,
  };
}

export async function runAssetsAudit(flags) {
  const sourceSlug = asString(flags["source-slug"]);
  if (!sourceSlug) {
    throw new Error("assets-audit requires --source-slug");
  }
  const result = await auditCaseStudyAssets({ sourceSlug });
  return {
    command: "assets-audit",
    sourceSlug,
    status: result.status,
    blockers: result.blockers,
    artifactPath: result.artifactPath,
    hero: result.hero,
    logo: result.logo,
    testimonialPhoto: result.testimonialPhoto,
  };
}

export async function runValidatePage(flags) {
  const route = asString(flags.route);
  const baseUrl = buildBaseUrl(flags);
  const sourceSlug = asString(flags["source-slug"]);
  const legacyRoute = asString(flags["legacy-route"]);
  const runBuild = Boolean(flags["run-build"]);
  const previewSiteUrl = asString(flags["preview-site-url"]);
  const previewPageUrl = asString(flags["preview-page-url"]);

  if (!route) {
    throw new Error("validate-page requires --route");
  }
  if (!baseUrl) {
    throw new Error("validate-page requires --base-url");
  }

  const result = await validateCaseStudyPage({
    baseUrl,
    route,
    sourceSlug,
    legacyRoute,
    previewSiteUrl,
    previewPageUrl,
    runBuild,
    buildStatus: runBuild ? "unknown" : "warn",
  });

  return {
    command: "validate-page",
    ...result,
  };
}

export async function runPipelineCase(flags) {
  const sourceSlug = asString(flags["source-slug"]);
  const clientName = asString(flags.client);
  const force = Boolean(flags.force);
  const mode = parseMode(flags);
  const baseUrl = buildBaseUrl(flags);
  const legacySlugsFlag = asString(flags["legacy-slugs"]);
  const legacySlugs =
    legacySlugsFlag
      ? legacySlugsFlag.split(",").map((item) => item.trim()).filter(Boolean)
      : sourceSlug
        ? findLegacyCaseStudySlugs(sourceSlug)
        : [];

  if (!sourceSlug && !clientName) {
    throw new Error("run requires --source-slug or --client");
  }

  const retrieval = await runRetrieve({ ...flags, force });
  const resolvedSourceSlug = retrieval.sourceSlug;
  const rewrite = await ensureRewriteScaffold({
    sourceSlug: resolvedSourceSlug,
    retrieval,
  });
  const assets = await runAssetsAudit({ "source-slug": resolvedSourceSlug });

  let validation = null;
  const route = `/etudes-de-cas/${resolvedSourceSlug}`;
  if (baseUrl) {
    validation = await runValidatePage({
      route,
      "base-url": baseUrl,
      "source-slug": resolvedSourceSlug,
      "legacy-route": legacySlugs[0] ? `/etudes-de-cas/${legacySlugs[0]}` : "",
    });
  }

  const blockers = [];
  if (assets.status !== "pass") blockers.push(...(assets.blockers || []));
  if (!baseUrl) blockers.push("VALIDATION_SKIPPED_NO_BASE_URL");
  if (validation && validation.status !== "pass") {
    blockers.push(...(validation.blockers || []));
    blockers.push(`VALIDATION_STATUS_${String(validation.status).toUpperCase()}`);
  }

  let status = "PASS";
  if (blockers.length) {
    const hasCritical = blockers.some((item) =>
      !String(item).startsWith("VALIDATION_SKIPPED_")
    );
    status = hasCritical ? "BLOCKED" : "PARTIAL";
  }

  const paths = getCaseStudyArtifactPaths(resolvedSourceSlug);
  const runSummaryPath = await writeRunSummaryMarkdown({
    sourceSlug: resolvedSourceSlug,
    status,
    sourceUrl: retrieval.sourceUrl,
    notes: [
      `Mode: ${mode}`,
      rewrite.created ? "rewrite-fr.md scaffold created" : "rewrite-fr.md scaffold reused",
      assets.status === "pass" ? "assets-audit passed" : `assets-audit blockers: ${(assets.blockers || []).join(", ")}`,
      baseUrl ? `validate-page executed against ${baseUrl}` : "validate-page skipped (no --base-url)",
      ...blockers.map((item) => `BLOCKER: ${item}`),
    ],
    artifacts: {
      sourceHtml: paths.sourceHtml,
      sourceSnapshotJson: paths.sourceSnapshotJson,
      sourceSnapshotMd: paths.sourceSnapshotMd,
      rewriteFr: paths.rewriteFr,
      assetsMap: paths.assetsMap,
      validation: validation?.artifactPath || paths.validation,
    },
  });

  return {
    command: "run",
    mode,
    sourceSlug: resolvedSourceSlug,
    sourceUrl: retrieval.sourceUrl,
    route,
    retrieval: {
      sitemapUrl: retrieval.sitemapUrl,
      artifacts: retrieval.artifacts,
      parsed: retrieval.parsed,
    },
    rewrite: {
      path: rewrite.path,
      created: rewrite.created,
    },
    assets,
    validation: validation
      ? {
          status: validation.status,
          checks: validation.checks,
          blockers: validation.blockers,
          artifactPath: validation.artifactPath,
        }
      : null,
    legacySlugs,
    blockers,
    status,
    artifacts: {
      runSummary: runSummaryPath,
    },
  };
}

function printHumanSummary(payload) {
  switch (payload.command) {
    case "retrieve":
      console.log("Retrieval complete.");
      console.log(`- Source domain: ${payload.sourceDomain}`);
      console.log(`- Sitemap index URL: ${payload.sitemapIndexUrl}`);
      console.log(`- Sitemap URL: ${payload.sitemapUrl}`);
      console.log(`- Source URL: ${payload.sourceUrl}`);
      console.log(`- Source slug: ${payload.sourceSlug}`);
      console.log(`- Artifacts dir: ${relativeFromCwd(payload.artifacts.targetDir)}`);
      console.log(`- source.html: ${relativeFromCwd(payload.artifacts.sourceHtml)}`);
      console.log(`- source-snapshot.json: ${relativeFromCwd(payload.artifacts.sourceSnapshotJson)}`);
      console.log(`- source-snapshot.md: ${relativeFromCwd(payload.artifacts.sourceSnapshotMd)}`);
      console.log(`- Parsed sections: ${payload.parsed.sections}`);
      console.log(`- Parsed hero KPIs: ${payload.parsed.heroKpis}`);
      console.log(`- Parsed campaign details: ${payload.parsed.campaignDetails}`);
      console.log(`- Parsed testimonials: ${payload.parsed.testimonials}`);
      console.log(`- Missing from source: ${payload.parsed.missingFromSource}`);
      break;
    case "assets-audit":
      console.log("Assets audit complete.");
      console.log(`- Source slug: ${payload.sourceSlug}`);
      console.log(`- Status: ${payload.status}`);
      console.log(`- assets-map.json: ${relativeFromCwd(payload.artifactPath)}`);
      if (payload.blockers?.length) {
        console.log(`- Blockers: ${payload.blockers.join(", ")}`);
      }
      break;
    case "validate-page":
      console.log("Page validation complete.");
      console.log(`- Route: ${payload.route}`);
      console.log(`- Source slug: ${payload.sourceSlug}`);
      console.log(`- Status: ${payload.status}`);
      console.log(`- validation.json: ${payload.artifactPath ? relativeFromCwd(payload.artifactPath) : "(not written)"}`);
      Object.entries(payload.checks || {}).forEach(([key, value]) => {
        console.log(`  - ${key}: ${value}`);
      });
      if (payload.blockers?.length) {
        console.log(`- Blockers: ${payload.blockers.join(", ")}`);
      }
      break;
    case "run":
      console.log("Pipeline run complete.");
      console.log(`- Mode: ${payload.mode}`);
      console.log(`- Source slug: ${payload.sourceSlug}`);
      console.log(`- Source URL: ${payload.sourceUrl}`);
      console.log(`- Route: ${payload.route}`);
      console.log(`- Status: ${payload.status}`);
      console.log(`- rewrite-fr.md: ${relativeFromCwd(payload.rewrite.path)}`);
      console.log(`- assets status: ${payload.assets.status}`);
      console.log(`- run-summary.md: ${relativeFromCwd(payload.artifacts.runSummary)}`);
      if (payload.validation) {
        console.log(`- validate-page: ${payload.validation.status}`);
      }
      if (payload.blockers?.length) {
        console.log(`- Blockers: ${payload.blockers.join(", ")}`);
      }
      break;
    default:
      console.log(JSON.stringify(payload, null, 2));
  }
}

export async function runCommand(command, flags) {
  switch (command) {
    case "retrieve":
      return runRetrieve(flags);
    case "assets-audit":
      return runAssetsAudit(flags);
    case "validate-page":
      return runValidatePage(flags);
    case "run":
      return runPipelineCase(flags);
    default:
      throw new Error(`Unsupported command: ${command}`);
  }
}

async function main() {
  const { command, flags } = parseArgs(process.argv.slice(2));

  if (!command || flags.help) {
    printUsage();
    process.exit(command ? 0 : 1);
  }

  const payload = await runCommand(command, flags);

  if (shouldPrintJson(flags)) {
    printJson(payload);
    return;
  }

  printHumanSummary(payload);
}

const isDirectExecution = (() => {
  const modulePath = fileURLToPath(import.meta.url);
  const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
  return modulePath === entryPath;
})();

if (isDirectExecution) {
  main().catch((error) => {
    console.error(error?.stack || String(error));
    process.exit(1);
  });
}
