import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HomePageRoute from "@/app/page";
import AcademyPageRoute from "@/app/academy/page";
import ConsultationPageRoute from "@/app/consultation/page";
import ConditionsPageRoute from "@/app/conditions/page";
import ServicesHubPageRoute from "@/app/services/page";
import CaseStudiesPageRoute from "@/app/etudes-de-cas/page";
import { generateMetadata as generateCaseStudyFrMetadata } from "@/app/etudes-de-cas/[slug]/page";
import { CaseStudyMasterPage } from "@/components/pages/case-study-master-page";
import { ServicePageTemplate } from "@/components/pages/service-page";
import { SERVICE_PAGE_DATA, type ServiceSlug } from "@/content/services";
import { academySeo, caseStudiesSeo, conditionsSeo, consultationSeo, homeSeo } from "@/content/masterfile.fr";
import { getSanityLocalizedSeo } from "@/lib/i18n/localized-seo";
import {
  findEntryByLocalePath,
  normalizePath,
  slugMap,
  supportedLocales,
  type SupportedLocale,
} from "@/lib/i18n/slug-map";
import { defaultOgImagePath, resolveOgImagePath, toAbsoluteUrl } from "@/lib/seo/metadata";

type Params = {
  params: {
    locale: string;
    slug?: string[];
  };
};

const consultationAliases = new Set([
  "/contact",
  "/telephone",
  "/notrerendez-vous",
  "/academy-notre-appel",
  "/merci",
  "/merci-prise-de-contact",
]);

const conditionsAliases = new Set([
  "/terms",
  "/politique-confidentialite",
  "/conditions-utilisation-academie",
  "/privacy-policy",
  "/academy-terms-conditions",
]);

const openGraphLocaleByLanguage: Record<SupportedLocale, string> = {
  fr: "fr_CH",
  en: "en_US",
  de: "de_DE",
  nl: "nl_NL",
};

function isSupportedLocale(value: string): value is Exclude<SupportedLocale, "fr"> {
  return value === "en" || value === "de" || value === "nl";
}

function mapFrPathToRenderable(path: string): string {
  const normalized = normalizePath(path);
  if (consultationAliases.has(normalized)) return "/consultation";
  if (conditionsAliases.has(normalized)) return "/conditions";

  if (normalized === "/resultats" || normalized === "/resultats-cas-etudes") return "/etudes-de-cas";
  if (normalized.startsWith("/resultats/")) {
    return `/etudes-de-cas/${normalized.slice("/resultats/".length)}`;
  }

  return normalized;
}

function resolveRoute(locale: string, slug: string[] | undefined) {
  if (!isSupportedLocale(locale)) return null;

  const relativePath = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const localePath = relativePath === "/" ? `/${locale}` : `/${locale}${relativePath}`;
  const found = findEntryByLocalePath(locale, localePath);
  if (!found || !found.entry.fr) return null;

  return {
    locale,
    localePath: normalizePath(localePath),
    pageId: found.pageId,
    entry: found.entry,
    frPath: mapFrPathToRenderable(found.entry.fr),
  };
}

function buildAlternates(entry: { fr: string | null; en: string | null; de: string | null; nl: string | null }, frFallbackPath: string) {
  const fr = normalizePath(entry.fr ?? frFallbackPath);
  return {
    canonical: fr,
    languages: {
      fr,
      en: normalizePath(entry.en ?? `/en${fr === "/" ? "" : fr}`),
      de: normalizePath(entry.de ?? `/de${fr === "/" ? "" : fr}`),
      nl: normalizePath(entry.nl ?? `/nl${fr === "/" ? "" : fr}`),
      "x-default": fr,
    },
  };
}

function resolveFrSeo(frPath: string): { title: string; description: string; imagePath?: string; type?: "website" | "article" } {
  const path = normalizePath(frPath);

  if (path === "/") return { title: homeSeo.title.replace(/\s*\|\s*devlo$/i, ""), description: homeSeo.description };
  if (path === "/academy") return { title: academySeo.title.replace(/\s*\|\s*devlo$/i, ""), description: academySeo.description };
  if (path === "/consultation") return { title: consultationSeo.title.replace(/\s*\|\s*devlo$/i, ""), description: consultationSeo.description };
  if (path === "/conditions") return { title: conditionsSeo.title.replace(/\s*\|\s*devlo$/i, ""), description: conditionsSeo.description };
  if (path === "/etudes-de-cas") return { title: caseStudiesSeo.title.replace(/\s*\|\s*devlo$/i, ""), description: caseStudiesSeo.description };

  if (path === "/services") {
    return {
      title: "Services de prospection B2B : cold email, LinkedIn, calling",
      description:
        "devlo est une agence de prospection B2B basée en Suisse : génération de leads, cold email, LinkedIn outreach, cold calling, intent data et enrichissement Clay.",
    };
  }

  if (path.startsWith("/services/")) {
    const serviceSlug = path.slice("/services/".length) as ServiceSlug;
    const service = SERVICE_PAGE_DATA[serviceSlug];
    if (service) {
      return {
        title: service.metadataTitle,
        description: service.metadataDescription,
      };
    }
  }

  if (path.startsWith("/etudes-de-cas/")) {
    const caseStudySlug = path.slice("/etudes-de-cas/".length);
    const metadata = generateCaseStudyFrMetadata({ params: { slug: caseStudySlug } });
    const title = typeof metadata.title === "string" ? metadata.title : "Étude de cas";
    const description = metadata.description ?? caseStudiesSeo.description;
    const image = Array.isArray(metadata.openGraph?.images) && metadata.openGraph.images.length > 0
      ? metadata.openGraph.images[0]
      : defaultOgImagePath;
    const imagePath =
      typeof image === "string"
        ? image
        : image instanceof URL
          ? image.toString()
          : String(image.url);
    return {
      title,
      description,
      imagePath,
      type: "article",
    };
  }

  return {
    title: homeSeo.title.replace(/\s*\|\s*devlo$/i, ""),
    description: homeSeo.description,
  };
}

export function generateStaticParams() {
  const seen = new Set<string>();
  const params: Array<{ locale: string; slug?: string[] }> = [];

  for (const entry of Object.values(slugMap)) {
    for (const locale of supportedLocales) {
      if (locale === "fr") continue;
      const localePath = entry[locale];
      if (!localePath) continue;
      const normalizedLocalePath = normalizePath(localePath);
      const expectedPrefix = `/${locale}`;
      if (!(normalizedLocalePath === expectedPrefix || normalizedLocalePath.startsWith(`${expectedPrefix}/`))) continue;

      const relativePath = normalizePath(normalizedLocalePath.replace(expectedPrefix, "") || "/");
      const slug = relativePath === "/" ? [] : relativePath.slice(1).split("/");
      const key = `${locale}|${slug.join("/")}`;
      if (seen.has(key)) continue;
      seen.add(key);
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolved = resolveRoute(params.locale, params.slug);
  if (!resolved) {
    return {};
  }

  const baseSeo = resolveFrSeo(resolved.frPath);
  const sanitySeo = await getSanityLocalizedSeo(resolved.pageId, resolved.locale);
  const title = sanitySeo?.title ?? baseSeo.title;
  const description = sanitySeo?.description ?? baseSeo.description;
  const imagePath = resolveOgImagePath(sanitySeo?.ogImage ?? baseSeo.imagePath ?? defaultOgImagePath);
  const alternates = buildAlternates(resolved.entry, resolved.frPath);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: resolved.localePath,
      languages: alternates.languages,
    },
    openGraph: {
      title,
      description,
      siteName: "devlo",
      type: baseSeo.type ?? "website",
      locale: openGraphLocaleByLanguage[resolved.locale],
      url: toAbsoluteUrl(resolved.localePath),
      images: [
        {
          url: toAbsoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: "devlo — aperçu",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [toAbsoluteUrl(imagePath)],
    },
  };
}

export default function LocalizedPage({ params }: Params) {
  const resolved = resolveRoute(params.locale, params.slug);
  if (!resolved) {
    notFound();
  }

  const frPath = resolved.frPath;

  if (frPath === "/") return <HomePageRoute />;
  if (frPath === "/academy") return <AcademyPageRoute />;
  if (frPath === "/consultation") return <ConsultationPageRoute />;
  if (frPath === "/conditions") return <ConditionsPageRoute />;
  if (frPath === "/services") return <ServicesHubPageRoute />;
  if (frPath === "/etudes-de-cas") return <CaseStudiesPageRoute />;

  if (frPath.startsWith("/services/")) {
    const serviceSlug = frPath.slice("/services/".length) as ServiceSlug;
    const service = SERVICE_PAGE_DATA[serviceSlug];
    if (!service) notFound();
    return <ServicePageTemplate service={service} />;
  }

  if (frPath.startsWith("/etudes-de-cas/")) {
    const caseStudySlug = frPath.slice("/etudes-de-cas/".length);
    return <CaseStudyMasterPage slug={caseStudySlug} />;
  }

  return <HomePageRoute />;
}
