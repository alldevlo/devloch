import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { hadoseoMetadataByRoute } from "@/content/hadoseo-metadata";
import { buildLanguageAlternatesForFrPath, normalizePath as normalizeLocalizedPath } from "@/lib/i18n/slug-map";
import { siteConfig } from "@/lib/site";

export const defaultOgImagePath = "/images/devlo_OG_Banner.webp";

export function normalizeRoute(path: string): string {
  if (!path || path === "/") return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function stripDevloSuffix(title: string): string {
  return title.replace(/\s*\|\s*devlo\s*$/i, "").trim();
}

export function buildLanguageAlternates(path: string): NonNullable<Metadata["alternates"]>["languages"] {
  return buildLanguageAlternatesForFrPath(path) as NonNullable<Metadata["alternates"]>["languages"];
}

export function toAbsoluteUrl(path: string): string {
  return `${siteConfig.url}${normalizeLocalizedPath(path)}`;
}

export function getHadoSeoMetadataOverride(path: string) {
  const canonicalRoute = normalizeRoute(path);
  return hadoseoMetadataByRoute[canonicalRoute];
}

export function resolveOgImagePath(candidate?: string): string {
  if (!candidate) return defaultOgImagePath;
  if (!candidate.startsWith("/images/")) return defaultOgImagePath;
  if (candidate.slice("/images/".length).includes("/")) return defaultOgImagePath;

  const filePath = join(process.cwd(), "public", candidate.replace(/^\//, ""));
  return existsSync(filePath) ? candidate : defaultOgImagePath;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  imagePath?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  imagePath,
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = normalizeRoute(path);
  const override = getHadoSeoMetadataOverride(canonicalPath);
  const resolvedTitle = override ? stripDevloSuffix(override.title) : title;
  const resolvedDescription = override?.description ?? description;
  const ogImage = resolveOgImagePath(override?.ogImage ?? imagePath);
  const ogImageAbsoluteUrl = toAbsoluteUrl(ogImage);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(canonicalPath),
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: siteConfig.name,
      type,
      locale: "fr_CH",
      url: toAbsoluteUrl(canonicalPath),
      images: [
        {
          url: ogImageAbsoluteUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - aperçu`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImageAbsoluteUrl],
    },
  };
}
