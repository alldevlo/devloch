#!/usr/bin/env node
/**
 * Extract all translatable content from 25 cold-email-template pages
 * and output a structured JSON file.
 *
 * Usage: node scripts/extract-cold-email-content.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, basename } from "path";

const TEMPLATES_DIR = join(
  process.cwd(),
  "src/app/insights/cold-email-templates"
);
const OUTPUT_PATH = join(
  process.cwd(),
  "src/lib/i18n/cold-email-sequences-content.json"
);

// Get all slug directories
const slugDirs = readdirSync(TEMPLATES_DIR)
  .filter((f) => {
    const fullPath = join(TEMPLATES_DIR, f);
    return statSync(fullPath).isDirectory();
  })
  .sort();

console.log(`Found ${slugDirs.length} template directories`);

function extractStringContent(source, varName) {
  // Look for const varName = "..." or const varName = `...`
  const regex = new RegExp(
    `const\\s+${varName}\\s*=\\s*(?:"([^"]*?)"|'([^']*?)'|\`([\\s\\S]*?)\`)`,
    "m"
  );
  const match = source.match(regex);
  if (match) return match[1] || match[2] || match[3] || "";
  return null;
}

function extractMetadata(source) {
  // Extract title from buildPageMetadata
  const titleMatch = source.match(
    /buildPageMetadata\(\{[\s\S]*?title:\s*\n?\s*"([\s\S]*?)"/m
  );
  const descMatch = source.match(
    /buildPageMetadata\(\{[\s\S]*?description:\s*\n?\s*"([\s\S]*?)"/m
  );
  return {
    metaTitle: titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "",
    metaDescription: descMatch
      ? descMatch[1].replace(/\s+/g, " ").trim()
      : "",
  };
}

function extractBreadcrumb(source) {
  // Get the last breadcrumb item name (the page-specific one)
  const breadcrumbBlock = source.match(
    /const breadcrumbItems\s*=\s*\[([\s\S]*?)\];/
  );
  if (!breadcrumbBlock) return { lastBreadcrumb: "" };

  // Get all name values
  const names = [...breadcrumbBlock[1].matchAll(/name:\s*"([^"]*?)"/g)].map(
    (m) => m[1]
  );
  return {
    lastBreadcrumb: names[names.length - 1] || "",
  };
}

function extractFaqItems(source) {
  const faqBlock = source.match(
    /const faqItems\s*=\s*\[([\s\S]*?)\];\s*\n\s*\/\*/
  );
  if (!faqBlock) {
    // Try alternate pattern
    const faqBlock2 = source.match(
      /const faqItems\s*(?::\s*[^=]*?)?\s*=\s*\[([\s\S]*?)\];\s*\n/
    );
    if (!faqBlock2) return [];
    return parseFaqFromBlock(faqBlock2[1]);
  }
  return parseFaqFromBlock(faqBlock[1]);
}

function parseFaqFromBlock(block) {
  const items = [];
  // Match question/answer pairs
  const matches = [
    ...block.matchAll(
      /question:\s*\n?\s*(?:"([\s\S]*?)"|`([\s\S]*?)`),\s*\n?\s*answer:\s*\n?\s*(?:"([\s\S]*?)"|`([\s\S]*?)`)/g
    ),
  ];
  for (const m of matches) {
    items.push({
      question: (m[1] || m[2] || "").replace(/\s+/g, " ").trim(),
      answer: (m[3] || m[4] || "").replace(/\s+/g, " ").trim(),
    });
  }
  return items;
}

function extractTags(source) {
  // Tags are typically in the hero section as an array of strings
  const tagMatch = source.match(
    /\{?\[([^\]]*?)\]\.map\(\(tag\)/
  );
  if (!tagMatch) return [];
  const tagStr = tagMatch[1];
  return [...tagStr.matchAll(/"([^"]*?)"/g)].map((m) => m[1]);
}

function extractHero(source) {
  // Extract h1 content
  const h1Match = source.match(
    /<h1[\s\S]*?>\s*([\s\S]*?)\s*<\/h1>/
  );
  let title = "";
  if (h1Match) {
    title = h1Match[1]
      .replace(/<[^>]*>/g, "")
      .replace(/\{["']\s*\}/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Extract subtitle (p after h1 in hero)
  const heroSection = source.match(
    /<section className="bg-gradient-to-b from-\[#074f74\]([\s\S]*?)<\/section>/
  );
  let subtitle = "";
  if (heroSection) {
    // Get the subtitle paragraph
    const subtitleMatch = heroSection[1].match(
      /className="mx-auto max-w-xl text-white\/80"[\s\S]*?>\s*([\s\S]*?)\s*<\/p>/
    );
    if (subtitleMatch) {
      subtitle = subtitleMatch[1]
        .replace(/<[^>]*>/g, "")
        .replace(/\{["']\s*\}/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }
  }

  return { title, subtitle };
}

function extractMetrics(source) {
  // Metrics are in an array with value/label pairs
  const metricsBlock = source.match(
    /\{\/\*\s*Metrics Bar[\s\S]*?grid-cols-2[\s\S]*?\{?\[([\s\S]*?)\]\.map\(\(metric\)/
  );
  if (!metricsBlock) return [];

  const metrics = [];
  const matches = [
    ...metricsBlock[1].matchAll(
      /value:\s*"([^"]*?)"[\s\S]*?label:\s*"([^"]*?)"/g
    ),
  ];
  for (const m of matches) {
    metrics.push({ value: m[1], label: m[2] });
  }
  return metrics;
}

function extractTouches(source) {
  // Extract the touches array
  const touchesBlock = source.match(
    /const touches(?::\s*SequenceTouch\[\])?\s*=\s*\[([\s\S]*?)\];\s*\n\s*\/\*/
  );
  if (!touchesBlock) return [];

  const touches = [];
  // Split by individual touch objects
  const touchMatches = [
    ...touchesBlock[1].matchAll(
      /\{\s*number:\s*(\d+),\s*channel:\s*"(\w+)",\s*label:\s*"([^"]*?)",\s*timing:\s*"([^"]*?)"(?:,\s*subject:\s*\n?\s*(?:"([\s\S]*?)"|`([\s\S]*?)`))?[\s\S]*?content:\s*`([\s\S]*?)`,?\s*\}/g
    ),
  ];

  for (const m of touchMatches) {
    touches.push({
      number: parseInt(m[1]),
      channel: m[2],
      label: m[3],
      timing: m[4],
      subject: m[5] || m[6] || null,
      content: m[7],
    });
  }
  return touches;
}

function extractSectionContent(source, sectionIdentifier) {
  // Generic section extractor for "why it works", "learnings", "when to use", "who can use"
  const sectionRegex = new RegExp(
    `<h2[\\s\\S]*?>\\s*${sectionIdentifier}\\s*<\\/h2>([\\s\\S]*?)<\\/section>`,
    "m"
  );
  const match = source.match(sectionRegex);
  if (!match) return null;
  return match[1];
}

function extractWhyItWorks(source) {
  // Find the "Pourquoi cette séquence fonctionne" section
  const sectionMatch = source.match(
    />\s*(Pourquoi cette séquence fonctionne)\s*<\/h2>([\s\S]*?)<\/section>/
  );
  if (!sectionMatch) return { heading: "", paragraphs: [] };

  const heading = sectionMatch[1];
  const content = sectionMatch[2];

  // Extract paragraphs
  const paragraphs = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) =>
    m[1]
      .replace(/<[^>]*>/g, "")
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&middot;/g, "·")
      .replace(/\s+/g, " ")
      .trim()
  );

  return { heading, paragraphs };
}

function extractLearnings(source) {
  const sectionMatch = source.match(
    />\s*(Ce que vous pouvez apprendre de cette campagne)\s*<\/h2>([\s\S]*?)<\/section>/
  );
  if (!sectionMatch) return { heading: "", items: [] };

  const heading = sectionMatch[1];
  const content = sectionMatch[2];

  // Extract list items - each <li> has a bullet span + content span with <strong>title</strong> + desc
  const items = [];
  const liMatches = [...content.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)];
  for (const liMatch of liMatches) {
    const liContent = liMatch[1];
    const strongMatch = liContent.match(/<strong>([\s\S]*?)<\/strong>/);
    if (!strongMatch) continue;
    const title = strongMatch[1].replace(/\s+/g, " ").trim();
    // Get the text after </strong> within the second <span>
    const afterStrong = liContent.split("</strong>")[1] || "";
    const desc = afterStrong
      .replace(/<[^>]*>/g, "")
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\{"\s*"\}/g, "")
      .replace(/\s+/g, " ")
      .trim();
    items.push({ title, desc });
  }

  return { heading, items };
}

function extractWhenToUse(source) {
  const sectionMatch = source.match(
    />\s*(Quand utiliser cette séquence)\s*<\/h2>([\s\S]*?)<\/section>/
  );
  if (!sectionMatch) return { heading: "", items: [] };

  const heading = sectionMatch[1];
  return { heading, items: extractCardGrid(sectionMatch[2]) };
}

function extractWhoCanUse(source) {
  const sectionMatch = source.match(
    />\s*(Qui peut utiliser cette séquence)\s*<\/h2>([\s\S]*?)<\/section>/
  );
  if (!sectionMatch) return { heading: "", items: [] };

  const heading = sectionMatch[1];
  return { heading, items: extractCardGrid(sectionMatch[2]) };
}

function extractCardGrid(content) {
  // Extract card items with title/desc
  const items = [];
  const matches = [
    ...content.matchAll(
      /title:\s*"([\s\S]*?)",\s*\n?\s*desc:\s*"([\s\S]*?)"/g
    ),
  ];
  for (const m of matches) {
    items.push({
      title: m[1].replace(/\s+/g, " ").trim(),
      desc: m[2].replace(/\s+/g, " ").trim(),
    });
  }
  return items;
}

function extractSequenceDetailsHeading(source) {
  // The "Les X touches de la séquence" heading
  const match = source.match(
    />\s*(Les \d+ touches de la séquence)\s*<\/h2>/
  );
  return match ? match[1] : "";
}

function extractSequenceDetailsSubtitle(source) {
  // The subtitle under the sequence details heading
  const match = source.match(
    /Les \d+ touches de la séquence[\s\S]*?<p[\s\S]*?>\s*([\s\S]*?)\s*<\/p>/
  );
  if (!match) return "";
  return match[1]
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractCtaSection(source) {
  // CTA heading and body
  const ctaSection = source.match(
    /Vous voulez une séquence personnalisée[\s\S]*?<\/section>/
  );
  if (!ctaSection) {
    // Try to find any CTA heading
    const altMatch = source.match(
      /<h2[\s\S]*?className="font-black text-white"[\s\S]*?>\s*([\s\S]*?)\s*<\/h2>\s*<p className="text-base text-white\/80">\s*([\s\S]*?)\s*<\/p>/
    );
    if (altMatch) {
      return {
        heading: altMatch[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
        body: altMatch[2].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim(),
      };
    }
    return { heading: "", body: "" };
  }

  return {
    heading: "Vous voulez une séquence personnalisée pour votre industrie ?",
    body: "",
  };
}

function extractPageData(slug) {
  const filePath = join(TEMPLATES_DIR, slug, "page.tsx");
  const source = readFileSync(filePath, "utf-8");

  const metadata = extractMetadata(source);
  const breadcrumb = extractBreadcrumb(source);
  const tags = extractTags(source);
  const hero = extractHero(source);
  const metrics = extractMetrics(source);
  const touches = extractTouches(source);
  const faq = extractFaqItems(source);
  const sequenceHeading = extractSequenceDetailsHeading(source);
  const sequenceSubtitle = extractSequenceDetailsSubtitle(source);
  const whyItWorks = extractWhyItWorks(source);
  const learnings = extractLearnings(source);
  const whenToUse = extractWhenToUse(source);
  const whoCanUse = extractWhoCanUse(source);

  // CTA - extract from source
  const ctaHeadingMatch = source.match(
    /font-black text-white[\s\S]*?>\s*([\s\S]*?)\s*<\/h2>/
  );
  const ctaBodyMatch = source.match(
    /text-base text-white\/80[\s\S]*?>\s*([\s\S]*?)\s*<\/p>/
  );
  const cta = {
    heading: ctaHeadingMatch
      ? ctaHeadingMatch[1]
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
      : "",
    body: ctaBodyMatch
      ? ctaBodyMatch[1]
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
      : "",
  };

  // Channel labels used in the page
  const channelLabelsMatch = source.match(
    /const CHANNEL_LABELS[\s\S]*?=\s*\{([\s\S]*?)\}/
  );
  let channelLabels = { email: "Email", call: "Appel", linkedin: "LinkedIn" };
  if (channelLabelsMatch) {
    const emailLabel = channelLabelsMatch[1].match(/email:\s*"([^"]*?)"/);
    const callLabel = channelLabelsMatch[1].match(/call:\s*"([^"]*?)"/);
    const linkedinLabel = channelLabelsMatch[1].match(
      /linkedin:\s*"([^"]*?)"/
    );
    channelLabels = {
      email: emailLabel ? emailLabel[1] : "Email",
      call: callLabel ? callLabel[1] : "Appel",
      linkedin: linkedinLabel ? linkedinLabel[1] : "LinkedIn",
    };
  }

  // "Subject" label
  const subjectLabelMatch = source.match(/>\s*(Objet\s*:)\s*{" "}/);
  const subjectLabel = subjectLabelMatch ? subjectLabelMatch[1] : "Objet :";

  // FAQ section title
  const faqTitleMatch = source.match(
    />\s*(Questions fréquentes)\s*<\/h2>/
  );
  const faqSectionTitle = faqTitleMatch ? faqTitleMatch[1] : "Questions fréquentes";

  // Back link text
  const backLinkMatch = source.match(
    />\s*(Voir toutes les 25 séquences)\s*<\/Link>/
  );
  const backLinkText = backLinkMatch ? backLinkMatch[1] : "Voir toutes les 25 séquences";

  // Last updated
  const lastUpdatedMatch = source.match(
    />\s*(Dernière mise à jour\s*:\s*[^<]*)\s*<\/p>/
  );
  const lastUpdated = lastUpdatedMatch
    ? lastUpdatedMatch[1].trim()
    : "Dernière mise à jour : mars 2026";

  // Author role text
  const authorRoleMatch = source.match(
    />\s*(Fondateur de)\s*{" "}/
  );
  const authorRole = authorRoleMatch ? authorRoleMatch[1] : "Fondateur de";

  // CTA buttons
  const primaryButtonMatch = source.match(
    /href="\/consultation"[\s\S]*?>\s*([\s\S]*?)\s*<\/Link>/
  );
  const secondaryButtonMatch = source.match(
    /href="\/services\/cold-email"[\s\S]*?>\s*([\s\S]*?)\s*<\/Link>/
  );
  const ctaPrimaryButton = primaryButtonMatch
    ? primaryButtonMatch[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
    : "Réserver une consultation";
  const ctaSecondaryButton = secondaryButtonMatch
    ? secondaryButtonMatch[1]
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
    : "Voir nos services";

  return {
    slug,
    metadata,
    breadcrumb,
    tags,
    hero,
    metrics,
    channelLabels,
    subjectLabel,
    sequenceHeading,
    sequenceSubtitle,
    touches,
    whyItWorks,
    learnings,
    whenToUse,
    whoCanUse,
    faqSectionTitle,
    faq,
    cta: {
      heading: cta.heading,
      body: cta.body,
      primaryButton: ctaPrimaryButton,
      secondaryButton: ctaSecondaryButton,
    },
    backLinkText,
    lastUpdated,
    authorRole,
  };
}

// Extract all pages
const allPages = {};
for (const slug of slugDirs) {
  console.log(`Extracting: ${slug}`);
  try {
    allPages[slug] = extractPageData(slug);
  } catch (err) {
    console.error(`  ERROR extracting ${slug}: ${err.message}`);
  }
}

// Build the output JSON structure
const output = {
  _meta: {
    generated: new Date().toISOString(),
    slugs: slugDirs,
    locales: ["fr", "en", "de", "nl"],
  },
  // Shared UI strings (same across all pages)
  shared: {
    fr: {
      breadcrumbs: {
        home: "Accueil",
        insights: "Insights",
        templates: "Templates Cold Email",
      },
      channelLabels: { email: "Email", call: "Appel", linkedin: "LinkedIn" },
      subjectLabel: "Objet :",
      faqSectionTitle: "Questions fréquentes",
      backLinkText: "Voir toutes les 25 séquences",
      lastUpdated: "Dernière mise à jour : mars 2026",
      authorRole: "Fondateur de",
      authorAlt: "Charles Perret, fondateur de devlo",
      dateLabel: "Mars 2026",
      cta: {
        heading:
          "Vous voulez une séquence personnalisée pour votre industrie ?",
        body: "devlo conçoit et exécute des campagnes cold email B2B sur-mesure. ICP, signaux d'achat, séquences multicanal — on s'occupe de tout.",
        primaryButton: "Réserver une consultation",
        secondaryButton: "Voir nos services",
      },
    },
  },
  sequences: {},
};

for (const [slug, data] of Object.entries(allPages)) {
  output.sequences[slug] = {
    fr: {
      metaTitle: data.metadata.metaTitle,
      metaDescription: data.metadata.metaDescription,
      lastBreadcrumb: data.breadcrumb.lastBreadcrumb,
      tags: data.tags,
      heroTitle: data.hero.title,
      heroSubtitle: data.hero.subtitle,
      metrics: data.metrics,
      sequenceHeading: data.sequenceHeading,
      sequenceSubtitle: data.sequenceSubtitle,
      touches: data.touches.map((t) => ({
        number: t.number,
        channel: t.channel,
        label: t.label,
        timing: t.timing,
        subject: t.subject,
        content: t.content,
      })),
      whyItWorks: data.whyItWorks,
      learnings: data.learnings,
      whenToUse: data.whenToUse,
      whoCanUse: data.whoCanUse,
      faq: data.faq,
    },
  };
}

writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
console.log(`\nExtracted ${Object.keys(allPages).length} pages`);
console.log(`Output: ${OUTPUT_PATH}`);
console.log(
  `File size: ${(readFileSync(OUTPUT_PATH).length / 1024).toFixed(1)} KB`
);
