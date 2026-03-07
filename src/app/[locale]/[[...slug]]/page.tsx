import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateMetadata as generateCaseStudyFrMetadata } from "@/app/etudes-de-cas/[slug]/page";
import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { CaseStudiesMasterPage } from "@/components/pages/case-studies-master-page";
import { CaseStudyMasterPage } from "@/components/pages/case-study-master-page";
import { ConditionsMasterPage } from "@/components/pages/conditions-master-page";
import { ConsultationMasterPage } from "@/components/pages/consultation-master-page";
import { HomePage } from "@/components/pages/home-page";
import { ServicesHubPage as ServicesHubView } from "@/components/pages/services-hub-page";
import { ServicePageTemplate } from "@/components/pages/service-page";
import { LocalizedPage as LocalizedContentPage } from "@/components/pages/localized-page";
import { SERVICE_PAGE_DATA, type ServiceSlug } from "@/content/services";
import { academySeo, caseStudiesSeo, conditionsSeo, consultationSeo, homeSeo } from "@/content/masterfile.fr";
import { getLocalizedCaseStudyBySlug } from "@/lib/i18n/case-studies-content";
import { getLocalizedMasterfileContent } from "@/lib/i18n/masterfile-content";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { getSanityLocalizedPageData, getSanityLocalizedSeo } from "@/lib/i18n/localized-seo";
import {
  findEntryByFrPath,
  findEntryByLocalePath,
  normalizePath,
  type SupportedLocale,
} from "@/lib/i18n/slug-map";
import { defaultOgImagePath, resolveOgImagePath, stripDevloSuffix, toAbsoluteUrl } from "@/lib/seo/metadata";

type Params = {
  params: {
    locale: string;
    slug?: string[];
  };
};

export const dynamic = "force-dynamic";

const consultationAliases = new Set([
  "/contact",
  "/telephone",
  "/notrerendez-vous",
  "/academy-notre-appel",
  "/merci",
  "/merci-prise-de-contact",
]);

const academyAliases = new Set([
  "/formation-prospection-b2b",
  "/prospection-commerciale-b2b",
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

function isPrefixedLocale(value: string): value is Exclude<SupportedLocale, "fr"> {
  return value === "en" || value === "de" || value === "nl";
}

function normalizeTextForCompare(value: string | undefined): string {
  return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function mapFrPathToRenderable(path: string): string {
  const normalized = normalizePath(path);
  if (consultationAliases.has(normalized)) return "/consultation";
  if (academyAliases.has(normalized)) return "/academy";
  if (conditionsAliases.has(normalized)) return "/conditions";

  if (normalized === "/resultats" || normalized === "/resultats-cas-etudes") return "/etudes-de-cas";
  if (normalized.startsWith("/resultats/")) {
    return `/etudes-de-cas/${normalized.slice("/resultats/".length)}`;
  }

  return normalized;
}

function resolveRoute(locale: string, slug: string[] | undefined) {
  if (isPrefixedLocale(locale)) {
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

  const frCandidatePath = normalizePath(`/${[locale, ...(slug ?? [])].join("/")}`);
  const frMatch = findEntryByFrPath(frCandidatePath);
  if (!frMatch || !frMatch.entry.fr) return null;

  return {
    locale: "fr" as const,
    localePath: normalizePath(frMatch.entry.fr),
    pageId: frMatch.pageId,
    entry: frMatch.entry,
    frPath: mapFrPathToRenderable(frMatch.entry.fr),
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

function resolveLocalizedServiceFromPath(
  frPath: string,
  locale: SupportedLocale,
) {
  if (frPath === "/services") {
    const content = getLocalizedServicesContent(locale);
    return {
      kind: "hub" as const,
      cards: content.SERVICE_HUB_CARDS,
      copy: content.hubCopy,
      caseStudies: content.ALL_CASE_STUDIES,
    };
  }

  if (frPath.startsWith("/services/")) {
    const serviceSlug = frPath.slice("/services/".length) as ServiceSlug;
    const content = getLocalizedServicesContent(locale);
    const localizedService = content.SERVICE_PAGE_DATA[serviceSlug];
    if (localizedService) {
      return {
        kind: "detail" as const,
        service: localizedService,
      };
    }
  }

  return null;
}

function resolveLocalizedTemplateFromPath(
  frPath: string,
  locale: SupportedLocale,
) {
  const content = getLocalizedMasterfileContent(locale);

  if (frPath === "/") {
    return {
      kind: "home" as const,
      content,
    };
  }

  if (frPath === "/consultation") {
    return {
      kind: "consultation" as const,
      content,
    };
  }

  if (frPath === "/academy") {
    return {
      kind: "academy" as const,
      content,
    };
  }

  if (frPath === "/conditions") {
    return {
      kind: "conditions" as const,
      content,
    };
  }

  if (frPath === "/etudes-de-cas") {
    return {
      kind: "case-studies" as const,
      content,
    };
  }

  if (frPath.startsWith("/etudes-de-cas/")) {
    const caseStudySlug = frPath.slice("/etudes-de-cas/".length);
    return {
      kind: "case-study" as const,
      content,
      slug: caseStudySlug,
      bySlug: getLocalizedCaseStudyBySlug(locale),
    };
  }

  return null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const resolved = resolveRoute(params.locale, params.slug);
  if (!resolved) {
    return {};
  }

  const baseSeo = resolveFrSeo(resolved.frPath);
  const sanitySeo = await getSanityLocalizedSeo(resolved.pageId, resolved.locale);
  const title = stripDevloSuffix(sanitySeo?.title ?? baseSeo.title);
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

export default async function LocalizedRoutePage({ params }: Params) {
  const resolved = resolveRoute(params.locale, params.slug);
  if (!resolved) {
    notFound();
  }

  const frPath = resolved.frPath;
  const localizedServiceView = resolveLocalizedServiceFromPath(frPath, resolved.locale);
  if (localizedServiceView?.kind === "hub") {
    return (
      <ServicesHubView
        cards={localizedServiceView.cards}
        copy={localizedServiceView.copy}
        caseStudies={localizedServiceView.caseStudies}
        locale={resolved.locale}
      />
    );
  }
  if (localizedServiceView?.kind === "detail") {
    return <ServicePageTemplate service={localizedServiceView.service} locale={resolved.locale} />;
  }

  const localizedTemplate = resolveLocalizedTemplateFromPath(frPath, resolved.locale);
  if (localizedTemplate?.kind === "home") {
    return (
      <HomePage
        content={localizedTemplate.content.homeContent as Parameters<typeof HomePage>[0]["content"]}
        studies={localizedTemplate.content.caseStudiesCards as Parameters<typeof HomePage>[0]["studies"]}
        locale={resolved.locale}
      />
    );
  }
  if (localizedTemplate?.kind === "consultation") {
    return (
      <ConsultationMasterPage
        content={
          localizedTemplate.content.consultationContent as Parameters<typeof ConsultationMasterPage>[0]["content"]
        }
        locale={resolved.locale}
      />
    );
  }
  if (localizedTemplate?.kind === "academy") {
    return (
      <AcademyMasterPage
        content={localizedTemplate.content.academyContent as Parameters<typeof AcademyMasterPage>[0]["content"]}
        sharedHomeContent={
          localizedTemplate.content.homeContent as Parameters<typeof AcademyMasterPage>[0]["sharedHomeContent"]
        }
      />
    );
  }
  if (localizedTemplate?.kind === "conditions") {
    return (
      <ConditionsMasterPage
        content={localizedTemplate.content.conditionsContent as Parameters<typeof ConditionsMasterPage>[0]["content"]}
      />
    );
  }
  if (localizedTemplate?.kind === "case-studies") {
    return (
      <CaseStudiesMasterPage
        seo={localizedTemplate.content.caseStudiesSeo as Parameters<typeof CaseStudiesMasterPage>[0]["seo"]}
        cards={localizedTemplate.content.caseStudiesCards as Parameters<typeof CaseStudiesMasterPage>[0]["cards"]}
        locale={resolved.locale}
      />
    );
  }
  if (localizedTemplate?.kind === "case-study") {
    return (
      <CaseStudyMasterPage
        slug={localizedTemplate.slug}
        caseStudiesCardsData={
          localizedTemplate.content.caseStudiesCards as Parameters<typeof CaseStudyMasterPage>[0]["caseStudiesCardsData"]
        }
        caseStudyBySlugData={localizedTemplate.bySlug}
        consultationData={
          localizedTemplate.content.consultationContent as Parameters<typeof CaseStudyMasterPage>[0]["consultationData"]
        }
        locale={resolved.locale}
      />
    );
  }

  const pageData = await getSanityLocalizedPageData(resolved.pageId, resolved.locale);

  const baseSeo = resolveFrSeo(frPath);
  let localizedData = pageData;

  if (frPath.startsWith("/etudes-de-cas/")) {
    const caseStudySlug = frPath.slice("/etudes-de-cas/".length);
    const caseStudyFallback = await getSanityLocalizedPageData(`case-study:${caseStudySlug}`, resolved.locale);
    if (
      caseStudyFallback &&
      (!localizedData?.title || normalizeTextForCompare(localizedData.title) === normalizeTextForCompare(baseSeo.title))
    ) {
      localizedData = caseStudyFallback;
    }
  }

  const localizedTitle = localizedData?.title ?? baseSeo.title;
  const localizedDescription = localizedData?.description ?? baseSeo.description;
  const localizedBody = localizedData?.body ?? [localizedDescription].filter(Boolean).join("\n\n");

  return (
    <LocalizedContentPage
      title={localizedTitle}
      description={localizedDescription}
      body={localizedBody}
    />
  );
}
