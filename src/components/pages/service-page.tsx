import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyBadge } from "@/components/shared/case-study-badge";
import { CaseStudyGrid } from "@/components/shared/case-study-grid";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { RelatedServices } from "@/components/shared/related-services";
import { ServiceBenefits } from "@/components/shared/service-benefits";
import { ServiceHero } from "@/components/shared/service-hero";
import { ServiceLeadPanel } from "@/components/shared/service-lead-panel";
import { ServiceProcess } from "@/components/shared/service-process";
import { ServicesSectionHeader, ServicesSurfaceCard } from "@/components/services/services-ui";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import { type ServicePageData } from "@/content/services";
import { localizeGeoTermsInObject } from "@/lib/i18n/geo-terms";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { toAbsoluteUrl } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo/schema-builders";

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
  },
};

export function ServicePageTemplate({ service, locale = "fr" }: ServicePageProps) {
  const localizedService = localizeGeoTermsInObject(service, locale);
  const localizedServicesContent = getLocalizedServicesContent(locale);
  const localizedCaseStudies = localizeGeoTermsInObject(localizedServicesContent.ALL_CASE_STUDIES, locale);
  const copy = copyByLocale[locale];
  const caseStudiesForService = localizedCaseStudies.filter((study) => study.tags.includes(localizedService.caseStudyTag));
  const quickFacts = [
    `${localizedService.processSteps.length} ${copy.steps}`,
    `${localizedService.configuratorFields.length} ${copy.levers}`,
    `${caseStudiesForService.length} ${copy.caseStudiesRelated}`,
    `${localizedService.faqItems.length} ${copy.faqQuestions}`,
  ];

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
  ];

  return (
    <>
      <JsonLd schema={schemas} />
      <main>
        <Breadcrumb items={breadcrumbItems} />
        <ServiceHero
          currentSlug={localizedService.slug}
          locale={locale}
          title={localizedService.pageTitle}
          subtitle={localizedService.pageSubtitle}
          paragraphs={localizedService.heroParagraphs}
          quickFacts={quickFacts}
        />

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
                <h2 className="text-2xl font-extrabold leading-[1.2] tracking-tight text-devlo-900 md:text-3xl">{localizedService.editorialTitle}</h2>
                <div className="mt-5 space-y-4 text-neutral-600">
                  {localizedService.editorialParagraphs.map((paragraph, index) => (
                    <p key={`${localizedService.slug}-editorial-${index}`} className="text-sm leading-7 md:text-base md:leading-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
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
        <RelatedServices currentSlug={localizedService.slug} relatedSlugs={localizedService.relatedServices} locale={locale} />
        <CTASection title={localizedService.ctaTitle} subtitle={localizedService.ctaSubtitle} locale={locale} />
      </main>
    </>
  );
}
