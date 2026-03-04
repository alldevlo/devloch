import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const DEFAULT_INPUT_CANDIDATES = [
  "/mnt/data/sitemap 11.14.03.xml",
  "/Users/charlesperret/Desktop/sitemap 11.14.03.xml",
];

const OUTPUT_JSON_PATH = join(REPO_ROOT, "src/lib/i18n/slug-map.json");
const OUTPUT_REPORT_PATH = join(REPO_ROOT, "docs/i18n_sanity_migration/phase2_slug_map_report.md");
const CASE_STUDIES_DATA_PATH = join(REPO_ROOT, "src/lib/case-studies.data.json");
const FILL_NL_WITH_DEEPL = process.argv.includes("--fill-nl-deepl");
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

const SERVICE_SLUGS = [
  "outbound-multicanal",
  "cold-email",
  "linkedin-outreach",
  "cold-calling",
  "intent-data",
  "enrichissement-clay",
  "generation-leads",
  "qualification-leads",
  "prise-de-rendez-vous",
  "crm-delivrabilite",
];

const LOCALE_TO_FR_PATH_OVERRIDES = {
  "/en/casestudy/urban-cleanliness-71-meetings": "/etudes-de-cas/proprete-urbaine-71-rendez-vous",
  "/en/casestudy/biofuels-52-sales-meetings": "/etudes-de-cas/biocarburants-52-rendez-vous",
  "/en/casestudy/learning-development-14-meetings": "/etudes-de-cas/formation-14-rendez-vous",
  "/en/casestudy/audiovisual-16-meetings": "/etudes-de-cas/audiovisuel-16-rendez-vous",
  "/en/casestudy/biodiversity-70-meetings": "/etudes-de-cas/biodiversite-70-rendez-vous",
  "/en/casestudy/commercial-real-estate-11-prospects": "/etudes-de-cas/immobilier-11-prospects",
  "/de/fallstudien/training-14-termine": "/etudes-de-cas/formation-14-rendez-vous",
  "/de/fallstudien/av-integration-16-termine": "/etudes-de-cas/audiovisuel-16-rendez-vous",
  "/de/fallstudien/biodiversitat-70-termine": "/etudes-de-cas/biodiversite-70-rendez-vous",
  "/de/fallstudien/gewerbeimmobilien-11-interessenten": "/etudes-de-cas/immobilier-11-prospects",
  "/de/fallstudien/immobilien-30-interessenten": "/etudes-de-cas/immobilier-30-prospects",
  "/de/fallstudien/mobilitat-40-interessenten": "/etudes-de-cas/mobilite-40-prospects",
  "/de/fallstudien/merchandising-23-interessenten": "/etudes-de-cas/merchandising-23-prospects",
};

const BASE_FR_ROUTES = [
  "/",
  "/academy",
  "/consultation",
  "/conditions",
  "/etudes-de-cas",
  "/services",
  "/resultats-cas-etudes",
];

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function detectLocale(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/nl" || pathname.startsWith("/nl/")) return "nl";
  return "fr";
}

function removeLocalePrefix(pathname) {
  if (pathname === "/en" || pathname === "/de" || pathname === "/nl") return "/";
  return pathname.replace(/^\/(en|de|nl)(?=\/|$)/, "") || "/";
}

function slugifySegment(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function slugifyPath(pathname) {
  if (pathname === "/") return "/";
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => slugifySegment(segment))
    .filter(Boolean);
  return `/${segments.join("/")}`;
}

function buildPageId(frPath) {
  if (frPath === "/") return "home";
  if (frPath === "/academy") return "academy";
  if (frPath === "/consultation") return "consultation";
  if (frPath === "/conditions") return "conditions";
  if (frPath === "/services") return "services";
  if (frPath === "/etudes-de-cas") return "case-studies";
  if (frPath.startsWith("/services/")) return `service:${frPath.slice("/services/".length)}`;
  if (frPath.startsWith("/etudes-de-cas/")) return `case-study:${frPath.slice("/etudes-de-cas/".length)}`;
  return `page:${frPath.replace(/^\//, "").replace(/\//g, "__")}`;
}

function addEntry(map, pageId) {
  if (!map[pageId]) {
    map[pageId] = { fr: null, en: null, de: null, nl: null };
  }
}

function toLocalePath(locale, path) {
  const normalized = normalizePath(path);
  if (locale === "fr") return normalized;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

function resolveFinalDestination(path, exactRedirectMap) {
  let current = normalizePath(path);
  const seen = new Set();
  while (exactRedirectMap.has(current) && !seen.has(current)) {
    seen.add(current);
    current = normalizePath(exactRedirectMap.get(current));
  }
  return current;
}

function mapLegacyFrPath(pathname) {
  const normalized = normalizePath(pathname);
  if (normalized === "/resultats" || normalized === "/resultats-cas-etudes") return "/etudes-de-cas";
  if (normalized.startsWith("/resultats/")) {
    return `/etudes-de-cas/${normalized.slice("/resultats/".length)}`;
  }
  return normalized;
}

function readInputPath() {
  const fromArg = process.argv[2];
  if (fromArg) return fromArg;
  for (const candidate of DEFAULT_INPUT_CANDIDATES) {
    try {
      readFileSync(candidate, "utf8");
      return candidate;
    } catch {
      // continue
    }
  }
  throw new Error(
    `Unable to find sitemap file. Tried: ${DEFAULT_INPUT_CANDIDATES.join(", ")}. Pass explicit path as first argument.`,
  );
}

function extractLocUrls(xml) {
  return Array.from(xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)).map((match) => match[1].trim());
}

async function buildExactRedirectMap() {
  const { default: nextConfig } = await import("../next.config.mjs");
  const redirects = typeof nextConfig.redirects === "function" ? await nextConfig.redirects() : [];
  const map = new Map();
  for (const redirect of redirects) {
    const source = normalizePath(redirect.source ?? "");
    const destination = normalizePath(redirect.destination ?? "");
    if (!source || !destination) continue;
    if (source.includes(":")) continue;
    map.set(source, destination);
  }
  return map;
}

function ensureBaseRoutes(entries, caseStudySlugs) {
  for (const route of BASE_FR_ROUTES) {
    const id = buildPageId(route);
    addEntry(entries, id);
    entries[id].fr = route;
  }

  for (const serviceSlug of SERVICE_SLUGS) {
    const route = `/services/${serviceSlug}`;
    const id = buildPageId(route);
    addEntry(entries, id);
    entries[id].fr = route;
  }

  for (const slug of caseStudySlugs) {
    const route = `/etudes-de-cas/${slug}`;
    const id = buildPageId(route);
    addEntry(entries, id);
    entries[id].fr = route;
  }
}

function fillMissingLocales(entries) {
  return Object.values(entries).reduce((count, entry) => {
    if (!entry.fr) return count;
    if (!entry.en) entry.en = toLocalePath("en", slugifyPath(entry.fr));
    if (!entry.de) entry.de = toLocalePath("de", slugifyPath(entry.fr));
    if (!entry.nl) return count + 1;
    return count;
  }, 0);
}

async function translateToNlSlugPath(sourcePath) {
  if (!DEEPL_API_KEY) return null;
  if (sourcePath === "/") return "/";

  const segments = sourcePath.split("/").filter(Boolean);
  const translatedSegments = [];

  for (const segment of segments) {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: segment.replace(/-/g, " "),
        source_lang: "EN",
        target_lang: "NL",
      }),
    });

    if (!response.ok) return null;
    const payload = await response.json();
    const translated = payload?.translations?.[0]?.text;
    if (!translated) return null;
    translatedSegments.push(slugifySegment(translated));
  }

  return `/${translatedSegments.join("/")}`;
}

async function fillNlPaths(entries, initialMissingCount) {
  let translatedCount = 0;
  let deterministicCount = 0;

  for (const entry of Object.values(entries)) {
    if (!entry.fr || entry.nl) continue;

    const nlBase = entry.en ? removeLocalePrefix(entry.en) : slugifyPath(entry.fr);
    let generated = null;

    if (FILL_NL_WITH_DEEPL) {
      generated = await translateToNlSlugPath(nlBase).catch(() => null);
      if (generated) translatedCount += 1;
    }

    if (!generated) {
      generated = slugifyPath(nlBase);
      deterministicCount += 1;
    }

    entry.nl = toLocalePath("nl", generated);
  }

  return {
    initialMissingCount,
    translatedCount,
    deterministicCount,
  };
}

function countByLocale(entries) {
  const counts = { fr: 0, en: 0, de: 0, nl: 0 };
  for (const entry of Object.values(entries)) {
    if (entry.fr) counts.fr += 1;
    if (entry.en) counts.en += 1;
    if (entry.de) counts.de += 1;
    if (entry.nl) counts.nl += 1;
  }
  return counts;
}

function createReport({
  inputPath,
  totalUrls,
  localeUrlCounts,
  entryCounts,
  generatedNlCount,
  nlFillMode,
  nlTranslatedCount,
  nlDeterministicCount,
  generatedEnCount,
  generatedDeCount,
}) {
  const now = new Date().toISOString();
  return `# Phase 2 — Slug Map Report

- Generated at: ${now}
- Source sitemap: \`${inputPath}\`
- Total \`<loc>\` URLs parsed: **${totalUrls}**

## Parsed URL counts (source sitemap)
- FR URLs: **${localeUrlCounts.fr}**
- EN URLs: **${localeUrlCounts.en}**
- DE URLs: **${localeUrlCounts.de}**
- NL URLs: **${localeUrlCounts.nl}**

## Slug map coverage (page IDs)
- Total page IDs: **${entryCounts.total}**
- Entries with FR path: **${entryCounts.fr}**
- Entries with EN path: **${entryCounts.en}**
- Entries with DE path: **${entryCounts.de}**
- Entries with NL path: **${entryCounts.nl}**

## Deterministic fill summary
- EN generated (missing in sitemap): **${generatedEnCount}**
- DE generated (missing in sitemap): **${generatedDeCount}**
- NL generated (missing in sitemap): **${generatedNlCount}**
- NL fill mode: **${nlFillMode}**
- NL translated via DeepL: **${nlTranslatedCount}**
- NL filled deterministically: **${nlDeterministicCount}**

## Rules applied
1. Paths are normalized without trailing slash (except \`/\`).
2. Locale detection:
   - FR: no \`/en\`, \`/de\`, \`/nl\` prefix
   - EN: \`/en/*\`
   - DE: \`/de/*\`
   - NL: \`/nl/*\`
3. EN/DE paths from sitemap are preserved exactly when present.
4. Final FR canonical path is resolved via repo redirects map (exact-path redirects only).
5. NL path generation is deterministic:
   - derive from EN path when available, else from FR path
   - normalize with slugify (lowercase, hyphens, accent removal)
6. Optional DeepL mode:
   - pass \`--fill-nl-deepl\` with \`DEEPL_API_KEY\` to translate missing NL slugs before deterministic fallback.
`;
}

async function main() {
  const inputPath = readInputPath();
  const xml = readFileSync(inputPath, "utf8");
  const locUrls = extractLocUrls(xml);
  const exactRedirectMap = await buildExactRedirectMap();

  const caseStudiesData = JSON.parse(readFileSync(CASE_STUDIES_DATA_PATH, "utf8"));
  const caseStudySlugs = Array.from(new Set(caseStudiesData.map((item) => item.slug)));

  const entries = {};
  const localeUrlCounts = { fr: 0, en: 0, de: 0, nl: 0 };

  for (const locUrl of locUrls) {
    const parsed = new URL(locUrl);
    const normalizedPath = normalizePath(parsed.pathname);
    const locale = detectLocale(normalizedPath);
    localeUrlCounts[locale] += 1;

    const directDestination = locale === "fr" ? null : exactRedirectMap.get(normalizedPath);
    const overrideDestination = locale === "fr" ? null : LOCALE_TO_FR_PATH_OVERRIDES[normalizedPath] ?? null;
    let frPathCandidate =
      locale === "fr"
        ? normalizedPath
        : overrideDestination
          ? overrideDestination
        : directDestination && directDestination !== "/"
          ? directDestination
          : removeLocalePrefix(normalizedPath);
    frPathCandidate = mapLegacyFrPath(frPathCandidate);

    const canonicalFrPath =
      locale === "fr" || overrideDestination || (directDestination && directDestination !== "/")
        ? mapLegacyFrPath(resolveFinalDestination(frPathCandidate, exactRedirectMap))
        : frPathCandidate;
    const pageId = buildPageId(canonicalFrPath);
    addEntry(entries, pageId);

    if (!entries[pageId].fr) entries[pageId].fr = canonicalFrPath;
    if (!entries[pageId][locale]) entries[pageId][locale] = normalizedPath;
  }

  ensureBaseRoutes(entries, caseStudySlugs);

  const beforeFill = JSON.parse(JSON.stringify(entries));
  const initialMissingNlCount = fillMissingLocales(entries);
  const nlFillStats = await fillNlPaths(entries, initialMissingNlCount);

  const sortedEntries = Object.fromEntries(
    Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)),
  );

  const beforeCounts = countByLocale(beforeFill);
  const afterCounts = countByLocale(sortedEntries);
  const generatedEnCount = afterCounts.en - beforeCounts.en;
  const generatedDeCount = afterCounts.de - beforeCounts.de;
  const generatedNlCount = afterCounts.nl - beforeCounts.nl;

  mkdirSync(dirname(OUTPUT_JSON_PATH), { recursive: true });
  mkdirSync(dirname(OUTPUT_REPORT_PATH), { recursive: true });
  writeFileSync(OUTPUT_JSON_PATH, `${JSON.stringify(sortedEntries, null, 2)}\n`, "utf8");

  const report = createReport({
    inputPath,
    totalUrls: locUrls.length,
    localeUrlCounts,
    entryCounts: { total: Object.keys(sortedEntries).length, ...afterCounts },
    generatedNlCount,
    generatedEnCount,
    generatedDeCount,
    nlFillMode: FILL_NL_WITH_DEEPL ? "deepl+deterministic-fallback" : "deterministic-only",
    nlTranslatedCount: nlFillStats.translatedCount,
    nlDeterministicCount: nlFillStats.deterministicCount,
  });
  writeFileSync(OUTPUT_REPORT_PATH, report, "utf8");

  console.log(`Slug map written to ${OUTPUT_JSON_PATH}`);
  console.log(`Report written to ${OUTPUT_REPORT_PATH}`);
  console.log(`Entries: ${Object.keys(sortedEntries).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
