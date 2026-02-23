import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const REPORTS_ROOT = path.join(REPO_ROOT, "reports", "case-study-rewrites");

function toPosix(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

export function getRepoRoot() {
  return REPO_ROOT;
}

export function getReportsRoot() {
  return REPORTS_ROOT;
}

export function getCaseStudyReportDir(sourceSlug) {
  return path.join(REPORTS_ROOT, sourceSlug);
}

export async function ensureCaseStudyReportDir(sourceSlug) {
  const dir = getCaseStudyReportDir(sourceSlug);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function writeJsonArtifact(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}

export async function writeTextArtifact(filePath, text) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  return filePath;
}

export async function readJsonArtifact(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function artifactExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function getCaseStudyArtifactPaths(sourceSlug) {
  const dir = getCaseStudyReportDir(sourceSlug);
  return {
    dir,
    sourceHtml: path.join(dir, "source.html"),
    sourceSnapshotJson: path.join(dir, "source-snapshot.json"),
    sourceSnapshotMd: path.join(dir, "source-snapshot.md"),
    rewriteFr: path.join(dir, "rewrite-fr.md"),
    assetsMap: path.join(dir, "assets-map.json"),
    validation: path.join(dir, "validation.json"),
    runSummary: path.join(dir, "run-summary.md"),
  };
}

export async function writeRunSummaryMarkdown({
  sourceSlug,
  status,
  sourceUrl = "",
  previewSiteUrl = "",
  previewPageUrl = "",
  notes = [],
  artifacts = {},
}) {
  const paths = getCaseStudyArtifactPaths(sourceSlug);
  const lines = [
    `# Run Summary — ${sourceSlug}`,
    "",
    `- Status: ${status}`,
    sourceUrl ? `- Source URL: ${sourceUrl}` : null,
    previewSiteUrl ? `- Preview site: ${previewSiteUrl}` : null,
    previewPageUrl ? `- Preview page: ${previewPageUrl}` : null,
    "",
    "## Artifacts",
    ...Object.entries(artifacts).map(([key, value]) => `- ${key}: ${value ? toPosix(String(value)) : "(none)"}`),
    "",
    "## Notes",
    ...(notes.length ? notes.map((note) => `- ${note}`) : ["- (none)"]),
    "",
  ].filter(Boolean);

  await writeTextArtifact(paths.runSummary, lines.join("\n"));
  return paths.runSummary;
}

function renderBatchSummaryMarkdown(summary) {
  const lines = [
    "# Batch Run Summary",
    "",
    `- Started at: ${summary.startedAt || "(unknown)"}`,
    `- Updated at: ${summary.updatedAt || "(unknown)"}`,
    `- Status: ${summary.status || "in_progress"}`,
    `- Mode: ${summary.mode || "(unknown)"}`,
    "",
    "## Totals",
    `- Total candidates: ${summary.totals?.total ?? 0}`,
    `- PASS: ${summary.totals?.PASS ?? 0}`,
    `- BLOCKED: ${summary.totals?.BLOCKED ?? 0}`,
    `- PARTIAL: ${summary.totals?.PARTIAL ?? 0}`,
    `- SKIP: ${summary.totals?.SKIP ?? 0}`,
    "",
    "## Cases",
  ];

  for (const item of summary.cases || []) {
    lines.push(`- ${item.slug}: ${item.status}${item.reason ? ` — ${item.reason}` : ""}`);
    if (item.previewPageUrl) lines.push(`  - Preview: ${item.previewPageUrl}`);
  }

  if (!summary.cases?.length) {
    lines.push("- (none)");
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

export async function readBatchSummary() {
  const jsonPath = path.join(REPORTS_ROOT, "_batch-run-summary.json");
  if (!(await artifactExists(jsonPath))) return null;
  return readJsonArtifact(jsonPath);
}

export async function writeBatchSummary(summary) {
  await fs.mkdir(REPORTS_ROOT, { recursive: true });
  const jsonPath = path.join(REPORTS_ROOT, "_batch-run-summary.json");
  const mdPath = path.join(REPORTS_ROOT, "_batch-run-summary.md");
  const payload = {
    ...summary,
    updatedAt: new Date().toISOString(),
  };
  await writeJsonArtifact(jsonPath, payload);
  await writeTextArtifact(mdPath, renderBatchSummaryMarkdown(payload));
  return { jsonPath, mdPath, summary: payload };
}

export async function initBatchSummary({ mode, slugs }) {
  const now = new Date().toISOString();
  return writeBatchSummary({
    mode,
    startedAt: now,
    updatedAt: now,
    status: "in_progress",
    totals: { total: slugs.length, PASS: 0, BLOCKED: 0, PARTIAL: 0, SKIP: 0 },
    cases: slugs.map((slug) => ({ slug, status: "pending" })),
    previews: [],
  });
}

export async function upsertBatchCaseResult({ slug, status, reason = "", previewSiteUrl = "", previewPageUrl = "", artifacts = {} }) {
  const current = (await readBatchSummary()) || {
    mode: "unknown",
    startedAt: new Date().toISOString(),
    status: "in_progress",
    totals: { total: 0, PASS: 0, BLOCKED: 0, PARTIAL: 0, SKIP: 0 },
    cases: [],
    previews: [],
  };

  const nextCases = [...current.cases];
  const existingIndex = nextCases.findIndex((item) => item.slug === slug);
  const nextCase = {
    ...(existingIndex >= 0 ? nextCases[existingIndex] : { slug }),
    status,
    reason,
    previewSiteUrl,
    previewPageUrl,
    artifacts,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) nextCases[existingIndex] = nextCase;
  else nextCases.push(nextCase);

  const totals = { ...(current.totals || { total: nextCases.length, PASS: 0, BLOCKED: 0, PARTIAL: 0, SKIP: 0 }) };
  const statuses = ["PASS", "BLOCKED", "PARTIAL", "SKIP"];
  for (const candidate of statuses) {
    totals[candidate] = nextCases.filter((item) => item.status === candidate).length;
  }
  totals.total = nextCases.length;

  const previews = [...(current.previews || [])];
  if (previewPageUrl && !previews.includes(previewPageUrl)) previews.push(previewPageUrl);

  const summaryStatus = nextCases.every((item) => ["PASS", "BLOCKED", "PARTIAL", "SKIP"].includes(item.status))
    ? "completed"
    : "in_progress";

  return writeBatchSummary({
    ...current,
    cases: nextCases,
    totals,
    previews,
    status: summaryStatus,
  });
}
