import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

const slugMapPath = resolve(process.cwd(), "src/lib/i18n/slug-map.json");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing Sanity env vars. Required: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  perspective: "published",
});

const slugMap = JSON.parse(readFileSync(slugMapPath, "utf8"));

function docTypeFromPageId(pageId) {
  if (pageId.startsWith("service:")) return "service";
  if (pageId.startsWith("case-study:")) return "caseStudy";
  return "page";
}

function sanityIdFromPageId(pageId) {
  return `localizedPage.${pageId.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
}

async function main() {
  let upserted = 0;

  for (const [pageId, entry] of Object.entries(slugMap)) {
    if (!entry.fr) continue;

    const doc = {
      _id: sanityIdFromPageId(pageId),
      _type: docTypeFromPageId(pageId),
      pageId,
      slug: {
        fr: entry.fr,
        en: entry.en ?? null,
        de: entry.de ?? null,
        nl: entry.nl ?? null,
      },
      updatedAt: new Date().toISOString(),
    };

    await client.createOrReplace(doc);
    upserted += 1;
  }

  console.log(`Sanity seed complete: ${upserted} docs upserted from slug-map.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
