#!/usr/bin/env node
/**
 * Translate cold email sequence content from FR to EN-GB, DE, NL using DeepL API.
 *
 * Usage: node scripts/translate-cold-email-content.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

// Read .env.local manually
const envContent = readFileSync(join(process.cwd(), ".env.local"), "utf-8");
const envMatch = envContent.match(/^DEEPL_API_KEY=(.+)$/m);
const DEEPL_API_KEY = envMatch ? envMatch[1].trim() : null;
if (!DEEPL_API_KEY) {
  console.error("DEEPL_API_KEY not found in .env.local");
  process.exit(1);
}

const CONTENT_PATH = join(
  process.cwd(),
  "src/lib/i18n/cold-email-sequences-content.json"
);

const DEEPL_URL = "https://api.deepl.com/v2/translate";

// Track stats
let totalChars = 0;
let totalCalls = 0;

/**
 * Translate an array of strings via DeepL
 */
async function translateBatch(texts, targetLang) {
  // Filter out empty strings, keep track of indices
  const nonEmpty = [];
  const indexMap = [];
  for (let i = 0; i < texts.length; i++) {
    if (texts[i] && texts[i].trim()) {
      nonEmpty.push(texts[i]);
      indexMap.push(i);
    }
  }

  if (nonEmpty.length === 0) return texts.map(() => "");

  // DeepL has a limit of 128KB per request and 50 text params
  // Batch into chunks of 50
  const BATCH_SIZE = 50;
  const results = [...texts]; // copy original

  for (let start = 0; start < nonEmpty.length; start += BATCH_SIZE) {
    const batch = nonEmpty.slice(start, start + BATCH_SIZE);
    const batchIndices = indexMap.slice(start, start + BATCH_SIZE);

    const charCount = batch.reduce((sum, t) => sum + t.length, 0);
    totalChars += charCount;
    totalCalls++;

    const res = await fetch(DEEPL_URL, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: batch,
        source_lang: "FR",
        target_lang: targetLang,
        // Preserve XML-like tags and variables
        tag_handling: "html",
        preserve_formatting: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`DeepL API error ${res.status}: ${body}`);
    }

    const data = await res.json();
    for (let j = 0; j < data.translations.length; j++) {
      results[batchIndices[j]] = data.translations[j].text;
    }

    // Rate limit: small delay between batches
    if (start + BATCH_SIZE < nonEmpty.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  return results;
}

/**
 * Collect all translatable strings from a sequence's FR content into a flat array.
 * Returns { strings, reconstruct } where reconstruct(translatedStrings) rebuilds the structure.
 */
function flattenSequence(frData) {
  const strings = [];
  const push = (s) => { strings.push(s || ""); return strings.length - 1; };

  const indices = {
    metaTitle: push(frData.metaTitle),
    metaDescription: push(frData.metaDescription),
    lastBreadcrumb: push(frData.lastBreadcrumb),
    heroTitle: push(frData.heroTitle),
    heroSubtitle: push(frData.heroSubtitle),
    sequenceHeading: push(frData.sequenceHeading),
    sequenceSubtitle: push(frData.sequenceSubtitle),
    tags: frData.tags.map(t => push(t)),
    metrics: frData.metrics.map(m => ({
      label: push(m.label),
      // value stays the same (numbers/percentages)
    })),
    touches: frData.touches.map(t => ({
      label: push(t.label),
      timing: push(t.timing),
      subject: t.subject ? push(t.subject) : null,
      content: push(t.content),
    })),
    whyItWorks: {
      heading: push(frData.whyItWorks.heading),
      paragraphs: frData.whyItWorks.paragraphs.map(p => push(p)),
    },
    learnings: {
      heading: push(frData.learnings.heading),
      items: frData.learnings.items.map(item => ({
        title: push(item.title),
        desc: push(item.desc),
      })),
    },
    whenToUse: {
      heading: push(frData.whenToUse.heading),
      items: frData.whenToUse.items.map(item => ({
        title: push(item.title),
        desc: push(item.desc),
      })),
    },
    whoCanUse: {
      heading: push(frData.whoCanUse.heading),
      items: frData.whoCanUse.items.map(item => ({
        title: push(item.title),
        desc: push(item.desc),
      })),
    },
    faq: frData.faq.map(item => ({
      question: push(item.question),
      answer: push(item.answer),
    })),
  };

  function reconstruct(translated) {
    const get = (idx) => translated[idx] || "";
    return {
      metaTitle: get(indices.metaTitle),
      metaDescription: get(indices.metaDescription),
      lastBreadcrumb: get(indices.lastBreadcrumb),
      heroTitle: get(indices.heroTitle),
      heroSubtitle: get(indices.heroSubtitle),
      sequenceHeading: get(indices.sequenceHeading),
      sequenceSubtitle: get(indices.sequenceSubtitle),
      tags: indices.tags.map(idx => get(idx)),
      metrics: frData.metrics.map((m, i) => ({
        value: m.value,
        label: get(indices.metrics[i].label),
      })),
      touches: frData.touches.map((t, i) => ({
        number: t.number,
        channel: t.channel,
        label: get(indices.touches[i].label),
        timing: get(indices.touches[i].timing),
        subject: indices.touches[i].subject !== null ? get(indices.touches[i].subject) : null,
        content: get(indices.touches[i].content),
      })),
      whyItWorks: {
        heading: get(indices.whyItWorks.heading),
        paragraphs: indices.whyItWorks.paragraphs.map(idx => get(idx)),
      },
      learnings: {
        heading: get(indices.learnings.heading),
        items: indices.learnings.items.map(item => ({
          title: get(item.title),
          desc: get(item.desc),
        })),
      },
      whenToUse: {
        heading: get(indices.whenToUse.heading),
        items: indices.whenToUse.items.map(item => ({
          title: get(item.title),
          desc: get(item.desc),
        })),
      },
      whoCanUse: {
        heading: get(indices.whoCanUse.heading),
        items: indices.whoCanUse.items.map(item => ({
          title: get(item.title),
          desc: get(item.desc),
        })),
      },
      faq: indices.faq.map(item => ({
        question: get(item.question),
        answer: get(item.answer),
      })),
    };
  }

  return { strings, reconstruct };
}

/**
 * Flatten shared UI strings
 */
function flattenShared(shared) {
  const strings = [];
  const push = (s) => { strings.push(s || ""); return strings.length - 1; };

  const indices = {
    home: push(shared.breadcrumbs.home),
    insights: push(shared.breadcrumbs.insights),
    templates: push(shared.breadcrumbs.templates),
    callLabel: push(shared.channelLabels.call),
    subjectLabel: push(shared.subjectLabel),
    faqSectionTitle: push(shared.faqSectionTitle),
    backLinkText: push(shared.backLinkText),
    lastUpdated: push(shared.lastUpdated),
    authorRole: push(shared.authorRole),
    authorAlt: push(shared.authorAlt),
    dateLabel: push(shared.dateLabel),
    ctaHeading: push(shared.cta.heading),
    ctaBody: push(shared.cta.body),
    ctaPrimary: push(shared.cta.primaryButton),
    ctaSecondary: push(shared.cta.secondaryButton),
  };

  function reconstruct(translated) {
    const get = (idx) => translated[idx] || "";
    return {
      breadcrumbs: {
        home: get(indices.home),
        insights: get(indices.insights),
        templates: get(indices.templates),
      },
      channelLabels: {
        email: "Email", // Keep Email/LinkedIn unchanged
        call: get(indices.callLabel),
        linkedin: "LinkedIn",
      },
      subjectLabel: get(indices.subjectLabel),
      faqSectionTitle: get(indices.faqSectionTitle),
      backLinkText: get(indices.backLinkText),
      lastUpdated: get(indices.lastUpdated),
      authorRole: get(indices.authorRole),
      authorAlt: get(indices.authorAlt),
      dateLabel: get(indices.dateLabel),
      cta: {
        heading: get(indices.ctaHeading),
        body: get(indices.ctaBody),
        primaryButton: get(indices.ctaPrimary),
        secondaryButton: get(indices.ctaSecondary),
      },
    };
  }

  return { strings, reconstruct };
}

async function main() {
  const content = JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
  const targetLangs = [
    { code: "EN-GB", key: "en" },
    { code: "DE", key: "de" },
    { code: "NL", key: "nl" },
  ];

  for (const { code, key } of targetLangs) {
    console.log(`\n=== Translating to ${code} ===`);

    // Translate shared strings
    console.log("  Translating shared UI strings...");
    const sharedFlat = flattenShared(content.shared.fr);
    const sharedTranslated = await translateBatch(sharedFlat.strings, code);
    content.shared[key] = sharedFlat.reconstruct(sharedTranslated);

    // Translate each sequence
    const slugs = Object.keys(content.sequences);

    // Batch all sequences together for fewer API calls
    // Collect all strings across all sequences
    const allStrings = [];
    const reconstructors = [];

    for (const slug of slugs) {
      const frData = content.sequences[slug].fr;
      const { strings, reconstruct } = flattenSequence(frData);
      const startIdx = allStrings.length;
      allStrings.push(...strings);
      reconstructors.push({ slug, reconstruct, startIdx, count: strings.length });
    }

    console.log(`  Total strings to translate: ${allStrings.length}`);
    console.log(`  Total characters: ${allStrings.reduce((s, t) => s + t.length, 0)}`);

    // Translate all at once (the translateBatch function handles chunking)
    const allTranslated = await translateBatch(allStrings, code);

    // Reconstruct each sequence
    for (const { slug, reconstruct, startIdx, count } of reconstructors) {
      const translatedSlice = allTranslated.slice(startIdx, startIdx + count);
      content.sequences[slug][key] = reconstruct(translatedSlice);
    }

    console.log(`  Done with ${code}`);
  }

  // Write output
  writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2));
  console.log(`\n=== Summary ===`);
  console.log(`Total characters sent to DeepL: ${totalChars.toLocaleString()}`);
  console.log(`Total API calls: ${totalCalls}`);
  console.log(`Output: ${CONTENT_PATH}`);
  const fileSize = readFileSync(CONTENT_PATH).length;
  console.log(`File size: ${(fileSize / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
