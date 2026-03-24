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
  const latestSeoRefreshDate = new Date("2026-03-14");
  const evergreenContentRefreshDate = new Date("2026-03-09");
  const fallbackRefreshDate = new Date("2026-03-01");

  for (const [pageId, entry] of entriesByPageId()) {
    if (pageId.startsWith("page:")) continue;
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
      const isCaseStudy = path.includes("/etudes-de-cas/") || path.includes("/casestudy/") || path.includes("/fallstudien/");
      const isBlog = path.includes("/blog");
      const isGeo = path.includes("/prospection-commerciale-")
        || path.includes("/b2b-prospecting-")
        || path.includes("/b2b-akquise-")
        || path.includes("/b2b-prospectie-");
      const isAgence = path.endsWith("/agence")
        || path.endsWith("/about")
        || path.endsWith("/uber-uns")
        || path.endsWith("/over-ons");
      const isConsultation = path.endsWith("/consultation")
        || path.endsWith("/contact")
        || path.endsWith("/kostenlose-beratung")
        || path.endsWith("/gratis-consultatie");
      const isAcademy = path.endsWith("/academy")
        || path.endsWith("/outbound-academy");
      const isAiSalesOps = path.endsWith("/ai-sales-ops");
      const isCaseStudiesHub = path.endsWith("/etudes-de-cas")
        || path.endsWith("/case-studies")
        || path.endsWith("/fallstudien")
        || path.endsWith("/case-studies-nl");
      const isAlternative = path.includes("/alternative-") || path.includes("/alternatief-");
      const isPrimarySeoSurface = isHome
        || isService
        || isBlog
        || isGeo
        || isAgence
        || isConsultation
        || isAcademy
        || isAiSalesOps
        || isCaseStudiesHub
        || isAlternative;

      const lastModifiedDate = isPrimarySeoSurface
        ? latestSeoRefreshDate
        : isCaseStudy
          ? evergreenContentRefreshDate
          : fallbackRefreshDate;

      return {
        url,
        lastModified: lastModifiedDate,
        changeFrequency: isHome ? "weekly" : isService ? "monthly" : isCaseStudy ? "yearly" : isBlog ? "monthly" : ("monthly" as const),
        priority: isHome ? 1.0 : isService ? 0.9 : isCaseStudy ? 0.8 : isBlog ? 0.7 : isGeo ? 0.8 : isAgence ? 0.8 : isAlternative ? 0.75 : 0.6,
      };
    });
}
