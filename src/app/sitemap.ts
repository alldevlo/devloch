import type { MetadataRoute } from "next";

import { entriesByPageId, normalizePath } from "@/lib/i18n/slug-map";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = new Set<string>();

  for (const [, entry] of entriesByPageId()) {
    for (const path of [entry.fr, entry.en, entry.de, entry.nl]) {
      if (!path) continue;
      urls.add(`${siteConfig.url}${normalizePath(path)}`);
    }
  }

  return Array.from(urls)
    .sort((a, b) => a.localeCompare(b))
    .map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: url === siteConfig.url ? 1 : 0.8,
    }));
}
