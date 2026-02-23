import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { load } from "cheerio";

export const SOURCE_DOMAIN = "https://devlo.ch";
export const SITEMAP_INDEX_URL = `${SOURCE_DOMAIN}/sitemap_index.xml`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const REPORTS_ROOT = path.join(REPO_ROOT, "reports", "case-study-rewrites");

function clean(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/[\u2000-\u200f\u202f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function toAbsoluteUrl(url) {
  if (!url) return "";
  try {
    return new URL(url, SOURCE_DOMAIN).toString();
  } catch {
    return "";
  }
}

function normalizeForMatch(value = "") {
  return clean(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function slugFromSourceUrl(sourceUrl) {
  const url = new URL(sourceUrl);
  return url.pathname.replace(/^\/+|\/+$/g, "").split("/").pop() || "";
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.text();
}

export async function loadSitemapIndex() {
  const xml = await fetchText(SITEMAP_INDEX_URL);
  const $ = load(xml, { xmlMode: true });
  const sitemapUrls = $("sitemap > loc")
    .toArray()
    .map((el) => clean($(el).text()))
    .filter(Boolean);
  return { xml, sitemapUrls };
}

export async function loadResultsSitemap() {
  const { sitemapUrls } = await loadSitemapIndex();
  const sitemapUrl = sitemapUrls.find((url) => /resultats-sitemap\.xml$/i.test(url));
  if (!sitemapUrl) {
    throw new Error("Unable to find resultats-sitemap.xml in sitemap index");
  }

  const xml = await fetchText(sitemapUrl);
  const $ = load(xml, { xmlMode: true });
  const urls = $("url > loc")
    .toArray()
    .map((el) => clean($(el).text()))
    .filter((url) => /\/resultats\//.test(url));

  return { sitemapUrl, xml, urls };
}

function extractPageSignals(html) {
  const $ = load(html);
  return {
    title: clean($("title").first().text()),
    h1: clean($("h1").first().text()),
  };
}

async function resolveSourceUrlByClientName(clientName, urls) {
  const target = normalizeForMatch(clientName);
  if (!target) return null;

  const slugMatch = urls.find((url) => normalizeForMatch(slugFromSourceUrl(url)).includes(target));
  if (slugMatch) {
    return slugMatch;
  }

  for (const url of urls) {
    try {
      const html = await fetchText(url);
      const { title, h1 } = extractPageSignals(html);
      if (normalizeForMatch(title).includes(target) || normalizeForMatch(h1).includes(target)) {
        return url;
      }
    } catch {
      // ignore individual page lookup failures and continue
    }
  }

  return null;
}

export async function resolveCaseStudySourceUrl({ clientName, sourceSlug }) {
  const { sitemapUrl, urls } = await loadResultsSitemap();

  let sourceUrl = null;
  if (sourceSlug) {
    sourceUrl = urls.find((url) => slugFromSourceUrl(url) === sourceSlug) || null;
    if (!sourceUrl) {
      throw new Error(`Unable to find source slug "${sourceSlug}" in ${sitemapUrl}`);
    }
  } else if (clientName) {
    sourceUrl = await resolveSourceUrlByClientName(clientName, urls);
    if (!sourceUrl) {
      throw new Error(`Unable to resolve source URL for client "${clientName}" from ${sitemapUrl}`);
    }
  } else {
    throw new Error("Either clientName or sourceSlug must be provided");
  }

  return {
    sourceUrl,
    sourceSlug: slugFromSourceUrl(sourceUrl),
    sitemapUrl,
  };
}

function parseHeroStats($) {
  const stats = [];
  const blocks = [
    [".desktopkeym .textkeym1", ".desktopkeym .textkeym2"],
    [".desktopkeym .textkeym21", ".desktopkeym .textkeym22"],
  ];

  for (const [valueSelector, labelSelector] of blocks) {
    const value = clean($(valueSelector).first().text());
    const label = clean($(labelSelector).first().text());
    if (value && label) {
      stats.push({ value, label });
    }
  }

  return unique(stats.map((item) => JSON.stringify(item))).map((item) => JSON.parse(item));
}

function parseCampaignDetails($) {
  const details = [];
  $(".othdets > div").each((_, el) => {
    const label = clean($(el).find("h4").first().text());
    const value = clean($(el).find("p").first().text());
    if (label && value) {
      details.push({ label, value });
    }
  });
  return details;
}

function parseSections($) {
  const sections = [];

  $(".casestudybody .leftsec > div").each((_, el) => {
    const section = $(el);
    const heading = clean(section.find("h2").first().text());
    if (!heading) return;

    let paragraphs = section
      .children("p")
      .toArray()
      .map((p) => clean($(p).text()))
      .filter(Boolean);

    if (!paragraphs.length) {
      paragraphs = section
        .find("p")
        .toArray()
        .map((p) => clean($(p).text()))
        .filter(Boolean);
    }

    const bullets = section
      .find("li")
      .toArray()
      .map((li) => clean($(li).text()))
      .filter(Boolean);

    sections.push({
      heading,
      paragraphs: unique(paragraphs),
      bullets: unique(bullets),
    });
  });

  return sections;
}

function parseTestimonials(sections) {
  const testimonials = [];
  for (const section of sections) {
    if (!/témoignage|temoignage/i.test(section.heading)) continue;
    for (const paragraph of section.paragraphs) {
      const quote = clean(paragraph);
      if (!quote) continue;
      const split = quote.split(" – ").map(clean).filter(Boolean);
      if (split.length >= 4) {
        testimonials.push({
          quote: split[0],
          author: split[1],
          role: split[2],
          company: split[3],
        });
      } else {
        testimonials.push({ quote });
      }
    }
  }
  return testimonials;
}

function parseCtas($) {
  const ctas = [];
  $(".casestudybody a, .banner-section a").each((_, el) => {
    const text =
      clean($(el).text()) ||
      clean($(el).attr("aria-label")) ||
      clean($(el).attr("title")) ||
      clean($(el).attr("value"));
    const href = toAbsoluteUrl($(el).attr("href"));
    if (!text || !href) return;
    ctas.push({ text, href });
  });

  const seen = new Set();
  return ctas.filter((cta) => {
    const key = `${cta.text}::${cta.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function classifyAssets($, sections) {
  const allImages = $("img")
    .toArray()
    .map((img) => ({
      src: toAbsoluteUrl($(img).attr("src")),
      alt: clean($(img).attr("alt") || ""),
      context:
        $(img).closest("figure").attr("class") ||
        $(img).closest("div").attr("class") ||
        $(img).parent().prop("tagName") ||
        "",
    }))
    .filter((img) => img.src);

  let heroImages = unique(
    $(".banner-section figure.mainimg img, figure.mainimg img")
      .toArray()
      .map((img) => toAbsoluteUrl($(img).attr("src")))
      .filter(Boolean),
  );

  if (!heroImages.length) {
    heroImages = unique(
      $(".banner-section img")
        .toArray()
        .filter((img) => !$(img).closest("figure.compimg, .logoimg").length)
        .map((img) => toAbsoluteUrl($(img).attr("src")))
        .filter(Boolean),
    );
  }

  const clientLogos = unique(
    $(".banner-section figure.compimg img, .banner-section .compimg img, .banner-section .logoimg img")
      .toArray()
      .map((img) => toAbsoluteUrl($(img).attr("src")))
      .filter(Boolean),
  );

  const testimonialSectionHeadings = new Set(
    sections.filter((s) => /témoignage|temoignage/i.test(s.heading)).map((s) => s.heading),
  );

  const profilePhotos = unique(
    $("img")
      .toArray()
      .filter((img) => {
        const sectionHeading = clean($(img).closest("div").find("h2").first().text());
        return testimonialSectionHeadings.has(sectionHeading);
      })
      .map((img) => toAbsoluteUrl($(img).attr("src")))
      .filter(Boolean),
  );

  const otherImages = unique(
    allImages
      .map((img) => img.src)
      .filter((src) => !heroImages.includes(src) && !clientLogos.includes(src) && !profilePhotos.includes(src)),
  );

  return {
    allImages,
    assets: {
      heroImages,
      clientLogos,
      profilePhotos,
      otherImages,
    },
  };
}

function detectOutOfScope($) {
  const out = [];
  const discoverText = clean($(".discover-section").first().text());
  if (discoverText) {
    out.push({
      label: "section.discover-section",
      reason: discoverText,
    });
  }
  return out;
}

function buildMissingFromSource(snapshot) {
  const missing = [];
  const page = snapshot.page;
  if (!page.titleTag) missing.push("Title tag");
  if (!page.h1) missing.push("H1");
  if (!page.intro.length) missing.push("Intro");
  if (!page.heroKpis.length) missing.push("Hero KPI blocks");
  if (!page.campaignDetails.length) missing.push("Campaign metadata blocks");
  if (!page.sections.length) missing.push("Main content sections");
  if (!page.testimonials.length) missing.push("Témoignage client (section dedicated parsing)");
  if (!page.ctas.length) missing.push("CTA links in article/body");
  return missing;
}

function deriveIntro($) {
  const introFromSubtitle = $(".sub_title_contnet p")
    .toArray()
    .map((el) => clean($(el).text()))
    .filter(Boolean);
  if (introFromSubtitle.length) return unique(introFromSubtitle);

  const bannerParagraphs = $(".banner-section p")
    .toArray()
    .map((el) => clean($(el).text()))
    .filter(Boolean);
  return unique(bannerParagraphs).slice(0, 2);
}

export function extractSourceSnapshot({ html, sourceUrl, sitemapUrl }) {
  const $ = load(html);
  const titleTag = clean($("title").first().text());
  const h1 = clean($(".banner-section h1, h1").first().text());
  const intro = deriveIntro($);
  const heroKpis = parseHeroStats($);
  const campaignDetails = parseCampaignDetails($);
  const sections = parseSections($);
  const testimonials = parseTestimonials(sections);
  const ctas = parseCtas($);
  const { assets } = classifyAssets($, sections);
  const outOfScopeDetected = detectOutOfScope($);

  const snapshot = {
    sourceDomain: SOURCE_DOMAIN,
    sitemapIndexUrl: SITEMAP_INDEX_URL,
    sitemapUrl,
    sourceUrl,
    fetchedAt: new Date().toISOString(),
    page: {
      titleTag,
      h1,
      intro,
      heroKpis,
      campaignDetails,
      sections,
      testimonials,
      ctas,
      assets,
    },
    outOfScopeDetected,
    missingFromSource: [],
    ambiguousClaims: [],
  };

  snapshot.missingFromSource = buildMissingFromSource(snapshot);
  return snapshot;
}

function pushLine(lines, value = "") {
  lines.push(value);
}

export function renderSourceSnapshotMarkdown(snapshot, { htmlRelativePath }) {
  const lines = [];
  const { page } = snapshot;
  const slug = slugFromSourceUrl(snapshot.sourceUrl);

  pushLine(lines, `# ${slug} Source Snapshot (devlo.ch)`);
  pushLine(lines);
  pushLine(lines, `- Source domain: ${snapshot.sourceDomain}`);
  pushLine(lines, `- Sitemap URL: ${snapshot.sitemapUrl}`);
  pushLine(lines, `- Source URL: ${snapshot.sourceUrl}`);
  pushLine(lines, `- Extracted at: ${snapshot.fetchedAt}`);
  pushLine(lines, `- HTML file: ${htmlRelativePath}`);
  pushLine(lines);

  pushLine(lines, "## Page Metadata");
  pushLine(lines, `- Title tag: ${page.titleTag || "(not found)"}`);
  pushLine(lines);

  pushLine(lines, "## Hero / Banner Section (exact source text)");
  pushLine(lines, `- H1: ${page.h1 || "(not found)"}`);
  if (page.intro.length) {
    for (const intro of page.intro) {
      pushLine(lines, `- Intro: ${intro}`);
    }
  } else {
    pushLine(lines, "- Intro: (not found)");
  }
  pushLine(lines);

  pushLine(lines, "### Hero KPI Blocks");
  if (page.heroKpis.length) {
    for (const stat of page.heroKpis) {
      pushLine(lines, `- ${stat.value} — ${stat.label}`);
    }
  } else {
    pushLine(lines, "- (none found)");
  }
  pushLine(lines);

  pushLine(lines, "### Campaign Metadata Blocks");
  if (page.campaignDetails.length) {
    for (const detail of page.campaignDetails) {
      pushLine(lines, `- ${detail.label}: ${detail.value}`);
    }
  } else {
    pushLine(lines, "- (none found)");
  }
  pushLine(lines);

  pushLine(lines, "### Assets Found (Banner / Hero / Logo / Others)");
  const assetGroups = [
    ["Hero images", page.assets.heroImages],
    ["Client logos", page.assets.clientLogos],
    ["Profile photos", page.assets.profilePhotos],
    ["Other images", page.assets.otherImages],
  ];
  for (const [label, list] of assetGroups) {
    pushLine(lines, `- ${label}:`);
    if (list.length) {
      for (const item of list) {
        pushLine(lines, `  - ${item}`);
      }
    } else {
      pushLine(lines, "  - (none found)");
    }
  }
  pushLine(lines);

  pushLine(lines, "## Main Content Sections (exact source text)");
  if (!page.sections.length) {
    pushLine(lines, "- (no sections parsed)");
    pushLine(lines);
  } else {
    page.sections.forEach((section, index) => {
      pushLine(lines, `### ${index + 1}. ${section.heading}`);
      if (section.paragraphs.length) {
        pushLine(lines, "Paragraphs:");
        section.paragraphs.forEach((paragraph, i) => pushLine(lines, `${i + 1}. ${paragraph}`));
      }
      if (section.bullets.length) {
        pushLine(lines, "Bullets:");
        section.bullets.forEach((bullet) => pushLine(lines, `- ${bullet}`));
      }
      if (!section.paragraphs.length && !section.bullets.length) {
        pushLine(lines, "(No paragraphs or bullets parsed)");
      }
      pushLine(lines);
    });
  }

  pushLine(lines, "## Testimonials (parsed)");
  if (page.testimonials.length) {
    page.testimonials.forEach((testimonial, i) => {
      pushLine(lines, `### ${i + 1}. Testimonial`);
      pushLine(lines, `- Quote: ${testimonial.quote}`);
      if (testimonial.author) pushLine(lines, `- Author: ${testimonial.author}`);
      if (testimonial.role) pushLine(lines, `- Role: ${testimonial.role}`);
      if (testimonial.company) pushLine(lines, `- Company: ${testimonial.company}`);
    });
  } else {
    pushLine(lines, "- (none parsed)");
  }
  pushLine(lines);

  pushLine(lines, "## CTAs / Links Found In Case Study");
  if (page.ctas.length) {
    page.ctas.forEach((cta) => pushLine(lines, `- ${cta.text} -> ${cta.href}`));
  } else {
    pushLine(lines, "- (none found)");
  }
  pushLine(lines);

  pushLine(lines, "## Out-of-Scope Blocks Detected In Article");
  if (snapshot.outOfScopeDetected.length) {
    snapshot.outOfScopeDetected.forEach((item) => pushLine(lines, `- ${item.label}: ${item.reason}`));
  } else {
    pushLine(lines, "- (none detected)");
  }
  pushLine(lines);

  pushLine(lines, "## Missing From Source (do not fabricate)");
  if (snapshot.missingFromSource.length) {
    snapshot.missingFromSource.forEach((item) => pushLine(lines, `- ${item}`));
  } else {
    pushLine(lines, "- (none)");
  }
  pushLine(lines);

  pushLine(lines, "## Ambiguous Claims (internal only)");
  if (snapshot.ambiguousClaims.length) {
    snapshot.ambiguousClaims.forEach((claim) => {
      pushLine(lines, `- ${claim.label} [policy: ${claim.chosenPolicy}]`);
      claim.options.forEach((option) => pushLine(lines, `  - option: ${option}`));
      pushLine(lines, `  - note: ${claim.note}`);
    });
  } else {
    pushLine(lines, "- (none detected)");
  }
  pushLine(lines);

  return lines.join("\n");
}

export async function writeRetrievalArtifacts({ sourceSlug, html, snapshot, force = false }) {
  const targetDir = path.join(REPORTS_ROOT, sourceSlug);
  await fs.mkdir(targetDir, { recursive: true });

  const htmlPath = path.join(targetDir, "source.html");
  const jsonPath = path.join(targetDir, "source-snapshot.json");
  const mdPath = path.join(targetDir, "source-snapshot.md");

  if (!force) {
    for (const filePath of [htmlPath, jsonPath, mdPath]) {
      try {
        await fs.access(filePath);
        throw new Error(`Artifact already exists: ${filePath} (use --force to overwrite)`);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
    }
  }

  await fs.writeFile(htmlPath, html, "utf8");
  await fs.writeFile(jsonPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");

  const htmlRelativePath = path.relative(REPO_ROOT, htmlPath).replaceAll(path.sep, "/");
  const markdown = renderSourceSnapshotMarkdown(snapshot, { htmlRelativePath });
  await fs.writeFile(mdPath, `${markdown}\n`, "utf8");

  return {
    targetDir,
    htmlPath,
    jsonPath,
    mdPath,
  };
}

export async function retrieveCaseStudySourceArtifacts({ clientName, sourceSlug, force = false }) {
  const { sourceUrl, sourceSlug: resolvedSlug, sitemapUrl } = await resolveCaseStudySourceUrl({
    clientName,
    sourceSlug,
  });
  const html = await fetchText(sourceUrl);
  const snapshot = extractSourceSnapshot({ html, sourceUrl, sitemapUrl });
  const artifactPaths = await writeRetrievalArtifacts({
    sourceSlug: resolvedSlug,
    html,
    snapshot,
    force,
  });

  return {
    sourceUrl,
    sourceSlug: resolvedSlug,
    sitemapUrl,
    snapshot,
    artifacts: artifactPaths,
  };
}
