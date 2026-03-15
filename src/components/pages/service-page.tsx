import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { WaveDivider } from "@/components/ui/wave-divider";
import { AuthorByline } from "@/components/shared/author-byline";
import { CaseStudyBadge } from "@/components/shared/case-study-badge";
import { ComparisonTable } from "@/components/shared/comparison-table";
import { CaseStudyGrid } from "@/components/shared/case-study-grid";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { RelatedServices } from "@/components/shared/related-services";
import { ServiceBenefits } from "@/components/shared/service-benefits";
import { ServiceHero } from "@/components/shared/service-hero";
import { ServiceLeadPanel } from "@/components/shared/service-lead-panel";
import { ServiceProcess } from "@/components/shared/service-process";
import { SummarySection } from "@/components/shared/summary-section";
import { ServicesSectionHeader, ServicesSurfaceCard } from "@/components/services/services-ui";
import { buttonClassName } from "@/components/ui/button";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import { type ServicePageData } from "@/content/services";
import { articles } from "@/content/blog/articles";
import { localizeGeoTermsInObject } from "@/lib/i18n/geo-terms";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { toAbsoluteUrl } from "@/lib/seo/metadata";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo/schema-builders";
import { RichParagraph } from "@/lib/utils/rich-text";

function buildServiceSchema(service: ServicePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    description: service.metadataDescription,
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: "https://devlo.ch",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CH",
      },
    },
    areaServed: ["CH", "BE", "FR", "DE", "AT", "NL"],
    url: toAbsoluteUrl(service.path),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "47",
    },
  };
}

function resolveCaseStudyHrefFromList(client: string, caseStudies: ReturnType<typeof getLocalizedServicesContent>["ALL_CASE_STUDIES"]): string | undefined {
  const clientLower = client.toLowerCase();
  const match = caseStudies.find((item) => {
    const current = item.client.toLowerCase();
    return current.includes(clientLower) || clientLower.includes(current);
  });

  return match?.href;
}

type ServicePageProps = {
  service: ServicePageData;
  locale?: SupportedLocale;
};

const copyByLocale: Record<
  SupportedLocale,
  {
    steps: string;
    levers: string;
    caseStudiesRelated: string;
    faqQuestions: string;
    home: string;
    services: string;
    caseStudiesEyebrow: string;
    caseStudiesTitle: string;
    caseStudiesDescription: string;
    blogEyebrow: string;
    blogTitle: string;
    blogReadMore: string;
  }
> = {
  fr: {
    steps: "étapes",
    levers: "leviers à configurer",
    caseStudiesRelated: "études de cas liées",
    faqQuestions: "questions fréquentes",
    home: "Accueil",
    services: "Services",
    caseStudiesEyebrow: "Études de cas",
    caseStudiesTitle: "Preuves terrain sur ce service",
    caseStudiesDescription:
      "Découvrez des campagnes réelles menées par devlo en Suisse, Belgique, France et DACH. Chaque étude de cas montre les résultats obtenus, la méthode utilisée et les enseignements opérationnels.",
    blogEyebrow: "Ressources",
    blogTitle: "Pour aller plus loin",
    blogReadMore: "Lire l'article →",
  },
  en: {
    steps: "steps",
    levers: "configuration levers",
    caseStudiesRelated: "related case studies",
    faqQuestions: "frequently asked questions",
    home: "Home",
    services: "Services",
    caseStudiesEyebrow: "Case studies",
    caseStudiesTitle: "Field proof for this service",
    caseStudiesDescription:
      "Discover real campaigns delivered by devlo in Switzerland, Belgium, France and DACH. Each case study shows results, the method used, and operational learnings.",
    blogEyebrow: "Resources",
    blogTitle: "Go further",
    blogReadMore: "Read article →",
  },
  de: {
    steps: "Schritte",
    levers: "konfigurierbare Hebel",
    caseStudiesRelated: "verwandte Fallstudien",
    faqQuestions: "häufige Fragen",
    home: "Startseite",
    services: "Leistungen",
    caseStudiesEyebrow: "Fallstudien",
    caseStudiesTitle: "Praxisnachweise für diese Leistung",
    caseStudiesDescription:
      "Entdecken Sie echte Kampagnen von devlo in der Schweiz, Belgien, Frankreich und DACH. Jede Fallstudie zeigt Ergebnisse, Methode und operative Learnings.",
    blogEyebrow: "Ressourcen",
    blogTitle: "Weiterführende Inhalte",
    blogReadMore: "Artikel lesen →",
  },
  nl: {
    steps: "stappen",
    levers: "te configureren hefbomen",
    caseStudiesRelated: "gerelateerde praktijkvoorbeelden",
    faqQuestions: "veelgestelde vragen",
    home: "Home",
    services: "Diensten",
    caseStudiesEyebrow: "Praktijkvoorbeelden",
    caseStudiesTitle: "Praktijkbewijs voor deze dienst",
    caseStudiesDescription:
      "Ontdek echte campagnes van devlo in Zwitserland, België, Frankrijk en DACH. Elke case toont resultaten, de methode en operationele learnings.",
    blogEyebrow: "Bronnen",
    blogTitle: "Meer weten",
    blogReadMore: "Artikel lezen →",
  },
};

const aiSalesOpsBridgeCopyByLocale: Record<
  SupportedLocale,
  {
    eyebrow: string;
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  fr: {
    eyebrow: "Nouveau chez devlo",
    title: "Découvrez aussi AI Sales Ops, notre couche d'automatisation IA pour équipes commerciales B2B",
    description:
      "Si vous voulez compléter ce service avec des workflows IA pour l'inbox, le CRM, la préparation de rendez-vous, le reporting ou les battle cards, nous pouvons les déployer en complément de votre machine outbound.",
    ctaPrimary: "Voir AI Sales Ops →",
    ctaSecondary: "Réserver un diagnostic",
  },
  en: {
    eyebrow: "New at devlo",
    title: "Also discover AI Sales Ops, our AI automation layer for B2B sales teams",
    description:
      "If you want to complement this service with AI workflows for inbox management, CRM updates, meeting preparation, reporting or battle cards, we can deploy them alongside your outbound engine.",
    ctaPrimary: "View AI Sales Ops →",
    ctaSecondary: "Book a diagnostic",
  },
  de: {
    eyebrow: "Neu bei devlo",
    title: "Entdecken Sie auch AI Sales Ops, unsere KI-Automatisierungsschicht für B2B-Vertriebsteams",
    description:
      "Wenn Sie diese Leistung mit KI-Workflows für Inbox-Management, CRM-Updates, Meeting-Vorbereitung, Reporting oder Battle Cards ergänzen möchten, können wir diese zusätzlich zu Ihrer Outbound-Maschine implementieren.",
    ctaPrimary: "AI Sales Ops ansehen →",
    ctaSecondary: "Diagnose buchen",
  },
  nl: {
    eyebrow: "Nieuw bij devlo",
    title: "Ontdek ook AI Sales Ops, onze AI-automatiseringslaag voor B2B-salesteams",
    description:
      "Als je deze dienst wilt aanvullen met AI-workflows voor inboxbeheer, CRM-updates, meetingvoorbereiding, reporting of battle cards, kunnen we die boven op je outboundmachine uitrollen.",
    ctaPrimary: "Bekijk AI Sales Ops →",
    ctaSecondary: "Plan een diagnose",
  },
};

export function ServicePageTemplate({ service, locale = "fr" }: ServicePageProps) {
  const localizedService = localizeGeoTermsInObject(service, locale);
  const localizedServicesContent = getLocalizedServicesContent(locale);
  const localizedCaseStudies = localizeGeoTermsInObject(localizedServicesContent.ALL_CASE_STUDIES, locale);
  const copy = copyByLocale[locale];
  const caseStudiesForService = localizedCaseStudies.filter((study) => study.tags.includes(localizedService.caseStudyTag));
  const relatedArticles = locale === "fr" ? articles.filter((a) => a.relatedServiceSlug === localizedService.slug).slice(0, 2) : [];
  const quickFacts = [
    `${localizedService.processSteps.length} ${copy.steps}`,
    `${localizedService.configuratorFields.length} ${copy.levers}`,
    `${caseStudiesForService.length} ${copy.caseStudiesRelated}`,
    `${localizedService.faqItems.length} ${copy.faqQuestions}`,
  ];
  const aiSalesOpsEligibleServices = new Set(["outbound-multicanal", "cold-email", "enrichissement-clay"]);
  const showAiSalesOpsBridge = aiSalesOpsEligibleServices.has(localizedService.slug);
  const aiSalesOpsBridgeCopy = aiSalesOpsBridgeCopyByLocale[locale];

  const breadcrumbItems = [
    { name: copy.home, path: resolvePathForLocale("/", locale).path },
    { name: copy.services, path: resolvePathForLocale("/services", locale).path },
    { name: localizedService.navTitle, path: resolvePathForLocale(localizedService.path, locale).path },
  ];

  const schemas = [
    buildServiceSchema(localizedService),
    buildFaqPageSchema(localizedService.faqItems),
    buildHowToSchema(localizedService.processTitle, localizedService.processSteps),
    buildBreadcrumbSchema(breadcrumbItems),
    buildArticleSchema({
      headline: localizedService.pageTitle,
      description: localizedService.metadataDescription,
      path: resolvePathForLocale(localizedService.path, locale).path,
      datePublished: localizedService.datePublished ?? "2024-06-15",
      dateModified: localizedService.dateModified ?? "2026-03-01",
      author: "Charles Perret",
      authorUrl: "https://www.linkedin.com/in/charlesperret/",
    }),
  ];

  return (
    <>
      <JsonLd schema={schemas} />
      <main>
        <ServiceHero
          currentSlug={localizedService.slug}
          locale={locale}
          title={localizedService.pageTitle}
          subtitle={localizedService.pageSubtitle}
          paragraphs={localizedService.heroParagraphs}
          quickFacts={quickFacts}
          breadcrumbItems={breadcrumbItems}
        />

        <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

        <section className="bg-white py-10 md:py-14">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 sm:px-5 md:px-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:items-start lg:gap-10">
            <div className="min-w-0 space-y-6">
              <div id="ce-que-couvre" className="scroll-mt-32 space-y-5">
                <ServiceBenefits title={localizedService.coverageTitle} items={localizedService.coverageItems} />
                <div className="relative my-[2cm] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
                  <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} duration="slow" pauseOnHover />
                </div>
              </div>
              <div id="processus" className="scroll-mt-32">
                <ServiceProcess title={localizedService.processTitle} steps={localizedService.processSteps} />
              </div>

              <ServicesSurfaceCard className="p-6 md:p-8">
                <AuthorByline
                  datePublished={localizedService.datePublished}
                  dateModified={localizedService.dateModified}
                  locale={locale}
                />
                <h2 className="mt-4 text-2xl font-extrabold leading-[1.2] tracking-tight text-devlo-900 md:text-3xl">{localizedService.editorialTitle}</h2>
                <div className="mt-5 space-y-4 text-neutral-600">
                  {localizedService.editorialParagraphs.map((paragraph, index) => (
                    <RichParagraph key={`${localizedService.slug}-editorial-${index}`} className="text-sm leading-7 md:text-base md:leading-8">
                      {paragraph}
                    </RichParagraph>
                  ))}
                </div>
                {localizedService.summaryPoints && localizedService.summaryPoints.length > 0 && (
                  <div className="mt-6">
                    <SummarySection
                      title={localizedService.summaryTitle ?? (locale === "fr" ? "En résumé" : locale === "de" ? "Zusammenfassung" : locale === "nl" ? "Samenvatting" : "Key takeaways")}
                      points={localizedService.summaryPoints}
                    />
                  </div>
                )}
                {localizedService.comparisonTable && (
                  <div className="mt-6">
                    <ComparisonTable
                      caption={localizedService.comparisonTable.caption}
                      headers={localizedService.comparisonTable.headers}
                      rows={localizedService.comparisonTable.rows}
                    />
                  </div>
                )}
              </ServicesSurfaceCard>

              <ServicesSurfaceCard id="resultats" className="scroll-mt-32 p-6 md:p-8">
                <ServicesSectionHeader title={localizedService.socialProofTitle} />
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {localizedService.socialProofItems.map((item) => (
                    <CaseStudyBadge
                      key={`${localizedService.slug}-${item.client}`}
                      client={item.client}
                      result={item.result}
                      details={item.details}
                      href={resolveCaseStudyHrefFromList(item.client, localizedCaseStudies)}
                      locale={locale}
                    />
                  ))}
                </div>
              </ServicesSurfaceCard>
            </div>

            <ServiceLeadPanel service={localizedService} locale={locale} />
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white py-14 md:py-16">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-5 md:px-8">
            <div className="space-y-8">
              <ServicesSectionHeader
                eyebrow={copy.caseStudiesEyebrow}
                title={copy.caseStudiesTitle}
                description={copy.caseStudiesDescription}
              />
              <CaseStudyGrid filterTag={localizedService.caseStudyTag} caseStudies={localizedCaseStudies} locale={locale} />
            </div>
          </div>
        </section>

        <FAQSection id="faq" title={localizedService.faqTitle} items={localizedService.faqItems} />

        {showAiSalesOpsBridge ? (
          <section className="border-t border-neutral-200 bg-white py-14">
            <div className="mx-auto max-w-7xl px-6">
              <ServicesSurfaceCard className="overflow-hidden border-devlo-200 bg-devlo-900 p-6 text-white shadow-panel md:p-8">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">{aiSalesOpsBridgeCopy.eyebrow}</p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight md:text-3xl">
                      {aiSalesOpsBridgeCopy.title}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75 md:text-base">
                      {aiSalesOpsBridgeCopy.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href={resolvePathForLocale("/ai-sales-ops", locale).path} className={buttonClassName("outline", "px-6 py-3 text-sm")}>
                      {aiSalesOpsBridgeCopy.ctaPrimary}
                    </Link>
                    <Link href={resolvePathForLocale("/consultation", locale).path} className={buttonClassName("secondary", "border-white/20 bg-white/5 px-6 py-3 text-sm text-white hover:border-white/35 hover:text-white")}>
                      {aiSalesOpsBridgeCopy.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </ServicesSurfaceCard>
            </div>
          </section>
        ) : null}

        {relatedArticles.length > 0 && (
          <section className="border-t border-neutral-200 bg-[#f7f8fc] py-14">
            <div className="mx-auto max-w-7xl px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                {copy.blogEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
                {copy.blogTitle}
              </h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {relatedArticles.map((article) => (
                  <a
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition hover:border-[var(--primary)]/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                      {article.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--text-primary)]">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{article.description}</p>
                    <span className="mt-4 inline-flex text-xs font-semibold text-[var(--primary)]">
                      {copy.blogReadMore}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <RelatedServices currentSlug={localizedService.slug} relatedSlugs={localizedService.relatedServices} locale={locale} />
        <CTASection title={localizedService.ctaTitle} subtitle={localizedService.ctaSubtitle} locale={locale} />
      </main>
    </>
  );
}
