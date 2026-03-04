import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_TOKEN;
const deeplKey = process.env.DEEPL_API_KEY;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing Sanity env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN",
  );
}
if (!deeplKey) {
  throw new Error("Missing DEEPL_API_KEY");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: "published",
});

const TARGETS = [
  { locale: "en", deepl: "EN-GB" },
  { locale: "de", deepl: "DE" },
  { locale: "nl", deepl: "NL" },
];

async function translate(text, targetLang) {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      text,
      target_lang: targetLang,
      source_lang: "FR",
      preserve_formatting: "1",
      tag_handling: "xml",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`DeepL error (${response.status}): ${body}`);
  }

  const payload = await response.json();
  return payload?.translations?.[0]?.text ?? text;
}

async function main() {
  const docs = await client.fetch(
    `*[_type in ["page","service","caseStudy"] && defined(pageId)]{
      _id,
      pageId,
      title,
      description
    }`,
  );

  let patches = 0;

  for (const doc of docs) {
    const frTitle = doc?.title?.fr;
    const frDescription = doc?.description?.fr;
    if (!frTitle && !frDescription) continue;

    const patch = {};

    for (const target of TARGETS) {
      if (frTitle && !doc?.title?.[target.locale]) {
        patch[`title.${target.locale}`] = await translate(frTitle, target.deepl);
      }
      if (frDescription && !doc?.description?.[target.locale]) {
        patch[`description.${target.locale}`] = await translate(frDescription, target.deepl);
      }
    }

    if (Object.keys(patch).length > 0) {
      await client.patch(doc._id).set(patch).commit({ autoGenerateArrayKeys: true });
      patches += 1;
    }
  }

  console.log(`DeepL translation complete: ${patches} docs patched.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
