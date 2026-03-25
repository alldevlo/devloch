import dynamic from "next/dynamic";
import Link from "next/link";

import { ComparisonTable } from "@/components/ai-sales-ops/comparison-table";
import { PersonaCard } from "@/components/ai-sales-ops/persona-card";
import { ProcessStep } from "@/components/ai-sales-ops/process-step";
import { SystemCard } from "@/components/ai-sales-ops/system-card";
import { JsonLd } from "@/components/seo/json-ld";
import { AuthorByline } from "@/components/shared/author-byline";
import { FAQSection } from "@/components/shared/faq-section";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SummarySection } from "@/components/shared/summary-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { ServicesSectionHeader, ServicesSurfaceCard } from "@/components/services/services-ui";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { HubspotForm } from "@/components/ui/hubspot-form";
import { WaveDivider } from "@/components/ui/wave-divider";
import type { CaseStudyCard } from "@/content/masterfile.fr";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import type { ServiceFaq } from "@/content/services";
import { getLocalizedAiSalesOpsContent } from "@/lib/i18n/ai-sales-ops-content";
import { getLocalizedMasterfileContent } from "@/lib/i18n/masterfile-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { RichParagraph } from "@/lib/utils/rich-text";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/lib/site";

const CaseStudyCarousel = dynamic(
  () => import("@/components/ai-sales-ops/case-study-carousel").then((mod) => mod.CaseStudyCarousel),
  { ssr: false },
);

const DIAGNOSTIC_FORM_ID = "36da17df-406b-4e19-9774-d96396807187";
const DIAGNOSTIC_PORTAL_ID = "8082524";
const DIAGNOSTIC_REGION = "na2";

const copyByLocale: Record<
  SupportedLocale,
  {
    home: string;
    pageLabel: string;
  }
> = {
  fr: {
    home: "Accueil",
    pageLabel: "AI Sales Ops",
  },
  en: {
    home: "Home",
    pageLabel: "AI Sales Ops",
  },
  de: {
    home: "Startseite",
    pageLabel: "AI Sales Ops",
  },
  nl: {
    home: "Home",
    pageLabel: "AI Sales Ops",
  },
};

type AiSalesOpsMasterPageProps = {
  locale?: SupportedLocale;
};

export function AiSalesOpsMasterPage({ locale = "fr" }: AiSalesOpsMasterPageProps) {
  const content = getLocalizedAiSalesOpsContent(locale);
  const copy = copyByLocale[locale];
  const pagePath = resolvePathForLocale("/ai-sales-ops", locale).path;
  const breadcrumbItems = [
    { name: copy.home, path: resolvePathForLocale("/", locale).path },
    { name: copy.pageLabel, path: pagePath },
  ];
  const faqItems = content.faqItems as ServiceFaq[];
  const localizedCaseStudyCards = getLocalizedMasterfileContent(locale).caseStudiesCards as CaseStudyCard[];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Sales Ops",
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lausanne",
        addressCountry: "CH",
      },
    },
    areaServed: ["CH", "FR", "BE", "DE", "AT", "NL"],
    description: content.metaDescription,
    url: `${siteConfig.url}${pagePath}`,
    serviceType: "AI automation for B2B sales teams",
    offers: {
      "@type": "Offer",
      price: "2000",
      priceCurrency: "CHF",
      description: "From CHF 2'000 per month per system.",
      eligibleRegion: ["CH", "FR", "BE", "DE", "AT", "NL"],
    },
  };

  return (
    <>
      <JsonLd
        schema={[
          serviceSchema,
          buildFaqPageSchema(faqItems),
          buildHowToSchema(
            content.processSection.title,
            content.processSteps.map((step) => ({ title: step.title, description: step.description })),
          ),
          buildArticleSchema({
            headline: content.hero.h1,
            description: content.hero.subtitle,
            path: "/ai-sales-ops",
            datePublished: content.datePublished ?? "2024-06-15",
            dateModified: content.dateModified ?? "2026-03-01",
            author: "Charles Perret",
            authorUrl: "https://www.linkedin.com/in/charlesperret/",
          }),
          buildBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <div data-dark className="overflow-x-clip">
        <section className="relative overflow-hidden bg-devlo-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(42,111,151,0.35),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />
          <div className="relative">
            <Breadcrumb items={breadcrumbItems} variant="dark" />
            <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-8 md:px-8 md:pb-28">
              <FadeInOnScroll className="mx-auto max-w-4xl text-center">
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
                  {content.hero.badge}
                </p>
                <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                  {content.hero.h1}
                </h1>
                <div className="mt-4 flex justify-center opacity-80">
                  <AuthorByline datePublished={content.datePublished ?? "2024-06-15"} dateModified={content.dateModified ?? "2026-03-01"} locale={locale} />
                </div>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
                  {content.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link href="#diagnostic" className={buttonClassName("outline", "px-6 py-3 text-sm")}>
                    {content.hero.ctaPrimary}
                  </Link>
                  <Link
                    href="#systemes"
                    className={buttonClassName(
                      "secondary",
                      "border-white/25 bg-white/5 px-6 py-3 text-sm text-white hover:border-white/40 hover:text-white",
                    )}
                  >
                    {content.hero.ctaSecondary}
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/70">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    {content.hero.badge1}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    {content.hero.badge2}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    {content.hero.badge3}
                  </span>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        <WaveDivider variant="layered-bottom" fromBg="#0F2B3C" toBg="#FFFFFF" />

        <SectionWrapper background="white" id="probleme">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.problemSection.eyebrow}
              title={content.problemSection.title}
              description={content.problemSection.description}
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.proofStats.map((stat, index) => (
              <FadeInOnScroll key={stat.value + stat.label} delay={index * 0.05}>
                <ServicesSurfaceCard className="h-full p-5 md:p-6">
                  <p className="text-4xl font-black tracking-tight text-devlo-900">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-devlo-900">{stat.label}</p>
                  <a
                    href={stat.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-xs font-medium text-devlo-700 underline decoration-devlo-200 underline-offset-4 hover:text-devlo-900"
                  >
                    {stat.sourceLabel}
                  </a>
                </ServicesSurfaceCard>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.15} className="mx-auto mt-10 max-w-4xl">
            <div className="space-y-5 text-base leading-8 text-neutral-600">
              {content.problemSection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        <SectionWrapper background="light" id="systemes">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.systemsSection.eyebrow}
              title={content.systemsSection.title}
              description={content.systemsSection.description}
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {content.systems.map((system, index) => (
              <FadeInOnScroll key={system.title} delay={index * 0.05}>
                <SystemCard
                  {...system}
                  locale={locale}
                  links={system.links?.map((link) => ({
                    ...link,
                    href: resolvePathForLocale(link.href, locale).path,
                  }))}
                />
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.2} className="mt-10">
            <div className="rounded-[28px] border border-devlo-200 bg-white p-6 shadow-soft md:flex md:items-center md:justify-between md:gap-8 md:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">
                  {content.startSection.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-devlo-900">
                  {content.startSection.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">
                  {content.startSection.description}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
                <Link href="#diagnostic" className={buttonClassName("primary", "px-6 py-3 text-sm")}>
                  {content.startCta.primary}
                </Link>
                <Link
                  href={resolvePathForLocale("/services", locale).path}
                  className={buttonClassName("secondary", "px-6 py-3 text-sm")}
                >
                  {content.startCta.secondary}
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        <SectionWrapper background="white" id="processus">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.processSection.eyebrow}
              title={content.processSection.title}
              description={content.processSection.description}
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.processSteps.map((step, index) => (
              <FadeInOnScroll key={step.title} delay={index * 0.08}>
                <ProcessStep {...step} />
              </FadeInOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper background="light" id="preuves">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.proofSection.eyebrow}
              title={content.proofSection.title}
              description={content.proofSection.description}
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06} className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2">
            <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} duration="slow" pauseOnHover />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {content.deliveryProof.map((item, index) => (
              <FadeInOnScroll key={item.value + item.label} delay={index * 0.05}>
                <ServicesSurfaceCard className="h-full p-5">
                  <p className="text-3xl font-black tracking-tight text-devlo-900">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.label}</p>
                </ServicesSurfaceCard>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.12} className="mt-10">
            <CaseStudyCarousel locale={locale} cards={localizedCaseStudyCards} />
          </FadeInOnScroll>
        </SectionWrapper>

        <SectionWrapper background="white" id="personas">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.personasSection.eyebrow}
              title={content.personasSection.title}
              description={content.personasSection.description}
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.personas.map((persona, index) => (
              <FadeInOnScroll key={persona.title} delay={index * 0.08}>
                <PersonaCard
                  icon={persona.icon}
                  title={persona.title}
                  profile={persona.profile}
                  pain={persona.pain}
                  systems={persona.systemTags}
                  result={persona.result}
                  locale={locale}
                />
              </FadeInOnScroll>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper background="light" id="comparaison">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow={content.comparisonSection.eyebrow}
              title={content.comparisonSection.title}
              description={content.comparisonSection.description}
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06} className="mt-8">
            <ComparisonTable rows={content.comparisonRows} locale={locale} />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.12} className="mt-8">
            <div className="rounded-[28px] border border-devlo-200 bg-white p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">
                {content.differenceCard.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-devlo-900">
                {content.differenceCard.title}
              </h3>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-600 md:text-base">
                {content.differenceCard.description}
              </p>
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        {content.editorialTitle && (
          <SectionWrapper background="white">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-10">
              <h2 className="text-2xl font-extrabold leading-[1.2] tracking-tight text-[#153a54] md:text-3xl">
                {content.editorialTitle}
              </h2>
              {(content.editorialParagraphs ?? []).length > 0 && (
                <div className="mt-5 space-y-4 text-neutral-600">
                  {(content.editorialParagraphs ?? []).map((p: string, i: number) => (
                    <RichParagraph key={i} className="text-sm leading-7 md:text-base md:leading-8">{p}</RichParagraph>
                  ))}
                </div>
              )}
              {(content.summaryPoints ?? []).length > 0 && (
                <div className="mt-6">
                  <SummarySection
                    title={content.summaryTitle ?? "En résumé"}
                    points={content.summaryPoints ?? []}
                    locale={locale}
                  />
                </div>
              )}
            </div>
          </SectionWrapper>
        )}

        <FAQSection id="faq" title={content.faqSection.title} items={faqItems} />

        <section id="diagnostic" data-dark className="scroll-mt-24 bg-devlo-900 py-16 text-white md:py-24">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <FadeInOnScroll>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
                  {content.ctaSection.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  {content.ctaSection.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                  {content.ctaSection.description}
                </p>
                <div className="mt-8 space-y-4">
                  {content.ctaSection.checklist.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-sm text-emerald-400">✓</span>
                      <p className="text-sm leading-6 text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.1}>
                <div className="rounded-2xl border border-white/15 bg-white p-5 shadow-panel md:p-7">
                  <h3 className="mb-1 text-xl font-bold text-devlo-900">{content.ctaSection.formTitle}</h3>
                  <p className="mb-5 text-sm text-neutral-600">{content.ctaSection.formSubtitle}</p>
                  <HubspotForm
                    portalId={DIAGNOSTIC_PORTAL_ID}
                    formId={DIAGNOSTIC_FORM_ID}
                    region={DIAGNOSTIC_REGION}
                    targetId={`hubspot-ai-sales-ops-diagnostic-${locale}`}
                    locale={locale}
                  />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
