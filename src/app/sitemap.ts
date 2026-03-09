import type { MetadataRoute } from "next";

import { entriesByPageId, normalizePath } from "@/lib/i18n/slug-map";
import { siteConfig } from "@/lib/site";

function normalizeSitemapPath(path: string): string | null {
  const normalized = normalizePath(path);
  if (normalized.includes("/page/")) return null;

  if (normalized === "/resultats-cas-etudes") return "/etudes-de-cas";
  if (normalized === "/en/results_cas_studies") return "/en/etudes-de-cas";
  if (normalized === "/de/ergebnisse_fall_studien") return "/de/etudes-de-cas";
  if (normalized === "/nl/results_cas_studies") return "/nl/etudes-de-cas";

  const frCaseStudyLegacy = normalized.match(/^\/resultats\/([^/]+)$/);
  if (frCaseStudyLegacy) {
    return `/etudes-de-cas/${frCaseStudyLegacy[1]}`;
  }

  return normalized;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = new Set<string>();

  for (const [, entry] of entriesByPageId()) {
    for (const path of [entry.fr, entry.en, entry.de, entry.nl]) {
      if (!path) continue;
      const normalized = normalizeSitemapPath(path);
      if (!normalized) continue;
      urls.add(`${siteConfig.url}${normalized}`);
    }
  }

  return Array.from(urls)
    .sort((a, b) => a.localeCompare(b))
    .map((url) => {
      const path = url.replace(siteConfig.url, "");
      const isHome = path === "" || path === "/";
      const isService = path.includes("/services/");
      const isCaseStudy = path.includes("/etudes-de-cas/");
      const isBlog = path.includes("/blog");
      const isGeo = path.includes("/prospection-commerciale-");
      const isAgence = path.endsWith("/agence");
      const isAlternative = path.includes("/alternative-");

      const lastModifiedDate = isHome || isService || isBlog || isGeo || isAgence || isAlternative
        ? new Date("2026-03-09")
        : new Date("2026-03-01");

      return {
        url,
        lastModified: lastModifiedDate,
        changeFrequency: isHome ? "weekly" : isService ? "monthly" : isCaseStudy ? "yearly" : isBlog ? "monthly" : ("monthly" as const),
        priority: isHome ? 1.0 : isService ? 0.9 : isCaseStudy ? 0.8 : isBlog ? 0.7 : isGeo ? 0.8 : isAgence ? 0.8 : isAlternative ? 0.75 : 0.6,
      };
    });
}
