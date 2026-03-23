import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateMetadata as generateCaseStudyFrMetadata } from "@/app/etudes-de-cas/[slug]/page";
import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { AiSalesOpsMasterPage } from "@/components/pages/ai-sales-ops-master-page";
import { AgencyMasterPage } from "@/components/pages/agency-master-page";
import { BlogHubMasterPage } from "@/components/pages/blog-hub-master-page";
import { BlogArticleMasterPage } from "@/components/pages/blog-article-master-page";
import { CaseStudiesMasterPage } from "@/components/pages/case-studies-master-page";
import { CaseStudyMasterPage } from "@/components/pages/case-study-master-page";
import { ConditionsMasterPage } from "@/components/pages/conditions-master-page";
import { ConsultationMasterPage } from "@/components/pages/consultation-master-page";
import { GeoLandingPage } from "@/components/pages/geo-landing-page";
import { AlternativePage } from "@/components/pages/alternative-page";
import { HomePage } from "@/components/pages/home-page";
import { ServicesHubPage as ServicesHubView } from "@/components/pages/services-hub-page";
import { ServicePageTemplate } from "@/components/pages/service-page";
import { InsightsHubMasterPage } from "@/components/pages/insights-hub-master-page";
import { BuyingSignalsMasterPage } from "@/components/pages/buying-signals-master-page";
import { ColdEmailTemplatesMasterPage } from "@/components/pages/cold-email-templates-master-page";
import { LocalizedPage as LocalizedContentPage } from "@/components/pages/localized-page";
import { GEO_PAGES } from "@/content/geo-pages";
import { ALTERNATIVE_PAGES } from "@/content/alternatives";
import { agencyContent } from "@/content/agency";
import { SERVICE_PAGE_DATA, type ServiceSlug } from "@/content/services";
import { academySeo, caseStudiesSeo, conditionsSeo, consultationSeo, homeSeo } from "@/content/masterfile.fr";
import { getLocalizedInsightsHub, getLocalizedBuyingSignals, getLocalizedColdEmailHub } from "@/lib/i18n/insights-helpers";
import { getLocalizedBlogArticle } from "@/lib/i18n/blog-content";
import { getLocalizedGeoContent } from "@/lib/i18n/geo-content";
import { getLocalizedAlternativeContent } from "@/lib/i18n/alternatives-content";
import { getLocalizedAiSalesOpsContent } from "@/lib/i18n/ai-sales-ops-content";
import { getLocalizedCaseStudyBySlug } from "@/lib/i18n/case-studies-content";
import { getLocalizedMasterfileContent } from "@/lib/i18n/masterfile-content";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { getSanityLocalizedPageData, getSanityLocalizedSeo } from "@/lib/i18n/localized-seo";
import {
  entriesByPageId,
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

export const revalidate = 3600;

export function generateStaticParams() {
  const params: Array<{ locale: string; slug?: string[] }> = [];

  for (const [, entry] of entriesByPageId()) {
    for (const locale of ["en", "de", "nl"] as const) {
      const path = entry[locale];
      if (!path) continue;
      const withoutPrefix = path.replace(new RegExp(`^/${locale}/?`), "");
      params.push({
        locale,
        slug: withoutPrefix ? withoutPrefix.split("/") : undefined,
      });
    }

    if (entry.fr && entry.fr !== "/") {
      const frSegments = entry.fr.replace(/^\//, "").split("/");
      params.push({
        locale: frSegments[0],
        slug: frSegments.length > 1 ? frSegments.slice(1) : undefined,
      });
    }
  }

  return params;
}

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

const openGraphImageAltByLanguage: Record<SupportedLocale, string> = {
  fr: "devlo - agence suisse de prospection B2B",
  en: "devlo - Swiss B2B outreach agency",
  de: "devlo - Schweizer B2B Akquise Agentur",
  nl: "devlo - Zwitsers B2B prospectiebureau",
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

  if (path === "/agence") {
    return {
      title: agencyContent.metaTitle.replace(/\s*—\s*devlo$/i, ""),
      description: agencyContent.metaDescription,
    };
  }

  if (path === "/ai-sales-ops") {
    const content = getLocalizedAiSalesOpsContent("fr");
    return {
      title: content.metaTitle,
      description: content.metaDescription,
    };
  }

  if (path === "/insights") {
    return {
      title: "Insights — Ressources et guides pour la prospection B2B",
      description:
        "Guides pratiques, listes de reference et ressources pour ameliorer votre prospection B2B. Signaux d'achat, automatisation IA, et strategies outbound.",
    };
  }

  if (path === "/insights/buying-signals") {
    return {
      title: "94 Signaux d'Intention d'Achat B2B — Le Guide Complet pour Identifier vos Prospects",
      description:
        "Decouvrez 94 signaux d'achat B2B classes par categorie (entreprise, personne, tech stack, usage produit, communaute, evenements). Detectez les prospects prets a acheter avant vos concurrents.",
      type: "article" as const,
    };
  }

  if (path === "/insights/cold-email-templates") {
    return {
      title: "25 Séquences Cold Email B2B avec Résultats — Templates Gratuits",
      description:
        "Découvrez 25 séquences cold email testées avec résultats réels. Industrie, métriques, emails complets.",
    };
  }

  if (path.startsWith("/insights/cold-email-templates/")) {
    return {
      title: "Séquence Cold Email B2B — Template avec Résultats",
      description:
        "Séquence cold email complète avec métriques, emails, et analyse.",
      type: "article" as const,
    };
  }

  if (path === "/blog") {
    return {
      title: "Blog — Prospection B2B, cold email et outbound",
      description:
        "Articles et guides pratiques sur la prospection commerciale B2B : cold email, LinkedIn outreach, intent data et stratégies outbound.",
    };
  }

  if (path.startsWith("/blog/")) {
    const frSlug = path.slice("/blog/".length);
    const article = getLocalizedBlogArticle(frSlug, "fr");
    if (article) {
      return { title: article.title, description: article.description, type: "article" as const };
    }
  }

  if (path.startsWith("/prospection-commerciale-")) {
    const geoSlug = path.slice(1);
    const geoContent = getLocalizedGeoContent(geoSlug, "fr");
    if (geoContent) {
      return { title: geoContent.metaTitle, description: geoContent.metaDescription };
    }
  }

  if (path.startsWith("/alternative-")) {
    const altSlug = path.slice(1);
    const altContent = getLocalizedAlternativeContent(altSlug, "fr");
    if (altContent) {
      return { title: altContent.metaTitle, description: altContent.metaDescription };
    }
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

  const localizedGeoSeo = resolved.frPath.startsWith("/prospection-commerciale-")
    ? getLocalizedGeoContent(resolved.frPath.slice(1), resolved.locale)
    : null;
  const localizedAlternativeSeo = resolved.frPath.startsWith("/alternative-")
    ? getLocalizedAlternativeContent(resolved.frPath.slice(1), resolved.locale)
    : null;
  const localizedInsightsHubSeo = resolved.frPath === "/insights"
    ? getLocalizedInsightsHub(resolved.locale)
    : null;
  const localizedBuyingSignalsSeo = resolved.frPath === "/insights/buying-signals"
    ? getLocalizedBuyingSignals(resolved.locale)
    : null;
  const localizedColdEmailHubSeo = resolved.frPath === "/insights/cold-email-templates"
    ? getLocalizedColdEmailHub(resolved.locale)
    : null;
  const baseSeo = resolved.frPath === "/ai-sales-ops"
    ? {
        title: getLocalizedAiSalesOpsContent(resolved.locale).metaTitle,
        description: getLocalizedAiSalesOpsContent(resolved.locale).metaDescription,
      }
    : localizedInsightsHubSeo
      ? {
          title: localizedInsightsHubSeo.metaTitle,
          description: localizedInsightsHubSeo.metaDescription,
        }
      : localizedBuyingSignalsSeo
        ? {
            title: localizedBuyingSignalsSeo.metaTitle,
            description: localizedBuyingSignalsSeo.metaDescription,
            type: "article" as const,
          }
        : localizedColdEmailHubSeo
          ? {
              title: localizedColdEmailHubSeo.metaTitle,
              description: localizedColdEmailHubSeo.metaDescription,
              type: "article" as const,
            }
          : localizedGeoSeo
          ? {
              title: localizedGeoSeo.metaTitle,
              description: localizedGeoSeo.metaDescription,
            }
          : localizedAlternativeSeo
            ? {
                title: localizedAlternativeSeo.metaTitle,
                description: localizedAlternativeSeo.metaDescription,
              }
            : resolveFrSeo(resolved.frPath);
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
          alt: openGraphImageAltByLanguage[resolved.locale],
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
        serviceCards={getLocalizedServicesContent(resolved.locale).SERVICE_HUB_CARDS}
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

  if (frPath === "/agence") {
    return <AgencyMasterPage locale={resolved.locale} />;
  }

  if (frPath === "/ai-sales-ops") {
    return <AiSalesOpsMasterPage locale={resolved.locale} />;
  }

  if (frPath === "/insights") {
    return <InsightsHubMasterPage locale={resolved.locale} />;
  }

  if (frPath === "/insights/buying-signals") {
    return <BuyingSignalsMasterPage locale={resolved.locale} />;
  }

  if (frPath === "/insights/cold-email-templates") {
    return <ColdEmailTemplatesMasterPage locale={resolved.locale} />;
  }

  if (frPath.startsWith("/insights/cold-email-templates/")) {
    const slug = frPath.slice("/insights/cold-email-templates/".length);
    try {
      const { default: SequencePage } = await import(`@/app/insights/cold-email-templates/${slug}/page`);
      return <SequencePage />;
    } catch {
      notFound();
    }
  }

  if (frPath === "/blog") {
    return <BlogHubMasterPage locale={resolved.locale} />;
  }

  if (frPath.startsWith("/blog/")) {
    const frSlug = frPath.slice("/blog/".length);
    return <BlogArticleMasterPage frSlug={frSlug} locale={resolved.locale} />;
  }

  if (frPath.startsWith("/prospection-commerciale-")) {
    const geoSlug = frPath.slice(1);
    const geoData = GEO_PAGES[geoSlug];
    if (!geoData) notFound();
    return <GeoLandingPage data={geoData} locale={resolved.locale} />;
  }

  if (frPath.startsWith("/alternative-")) {
    const altSlug = frPath.slice(1);
    const altData = ALTERNATIVE_PAGES[altSlug];
    if (!altData) notFound();
    return <AlternativePage data={altData} locale={resolved.locale} />;
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
