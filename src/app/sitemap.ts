import type { MetadataRoute } from "next";

import { caseStudiesCards } from "@/content/masterfile.fr";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "/",
  "/etudes-de-cas",
  "/academy",
  "/consultation",
  "/conditions",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/etudes-de-cas" ? 0.9 : 0.8,
  }));

  const caseEntries: MetadataRoute.Sitemap = caseStudiesCards.map((study) => ({
    url: `${siteConfig.url}/etudes-de-cas/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticEntries, ...caseEntries];
}
