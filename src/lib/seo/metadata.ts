import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { siteConfig } from "@/lib/site";

export const defaultOgImagePath = "/images/devlo_OG_Banner.webp";

type SupportedLang = "fr" | "en" | "de" | "nl";

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function localizedPath(lang: SupportedLang, path: string): string {
  const normalized = normalizePath(path);
  if (lang === "fr") return normalized;
  return normalized === "/" ? `/${lang}` : `/${lang}${normalized}`;
}

export function buildLanguageAlternates(path: string): NonNullable<Metadata["alternates"]>["languages"] {
  return {
    fr: localizedPath("fr", path),
    en: localizedPath("en", path),
    de: localizedPath("de", path),
    nl: localizedPath("nl", path),
  };
}

export function toAbsoluteUrl(path: string): string {
  return `${siteConfig.url}${normalizePath(path)}`;
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
  const canonicalPath = normalizePath(path);
  const ogImage = resolveOgImagePath(imagePath);

  return {
    title,
    description,
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
      title,
      description,
      siteName: siteConfig.name,
      type,
      locale: "fr_CH",
      url: toAbsoluteUrl(canonicalPath),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - aperçu`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
