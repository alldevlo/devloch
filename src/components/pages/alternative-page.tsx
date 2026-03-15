import Link from "next/link";

import { AuthorByline } from "@/components/shared/author-byline";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { SummarySection } from "@/components/shared/summary-section";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import { type AlternativePageData } from "@/content/alternatives";
import { caseStudyBySlug } from "@/lib/case-studies";
import { getLocalizedAlternativeContent } from "@/lib/i18n/alternatives-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";
import { RichParagraph } from "@/lib/utils/rich-text";

const copyByLocale: Record<
  SupportedLocale,
  {
    home: string;
    comparatif: string;
    ctaConsultation: string;
    comparatifEyebrow: string;
    comparisonEyebrow: string;
    whyDevloEyebrow: string;
    whyDevloHeading: string;
    caseStudiesEyebrow: string;
    caseStudiesHeading: string;
    viewCaseStudy: string;
    faqTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  }
> = {
  fr: {
    home: "Accueil",
    comparatif: "Comparatif",
    ctaConsultation: "Consultation gratuite",
    comparatifEyebrow: "Comparatif agences B2B",
    comparisonEyebrow: "Comparaison",
    whyDevloEyebrow: "Pourquoi devlo",
    whyDevloHeading: "Ce que devlo apporte de différent",
    caseStudiesEyebrow: "Résultats clients",
    caseStudiesHeading: "Ce que nos clients ont obtenu",
    viewCaseStudy: "Voir l'étude de cas →",
    faqTitle: "Questions fréquentes",
    ctaTitle: "Prêt à générer plus de rendez-vous B2B ?",
    ctaSubtitle: "Obtenez votre stratégie de prospection personnalisée en 30 minutes. Premiers résultats dès la 3e semaine.",
  },
  en: {
    home: "Home",
    comparatif: "Comparison",
    ctaConsultation: "Free consultation",
    comparatifEyebrow: "B2B agency comparison",
    comparisonEyebrow: "Comparison",
    whyDevloEyebrow: "Why devlo",
    whyDevloHeading: "What devlo brings differently",
    caseStudiesEyebrow: "Client results",
    caseStudiesHeading: "What our clients achieved",
    viewCaseStudy: "View case study →",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Ready to generate more B2B meetings?",
    ctaSubtitle: "Get your personalised prospecting strategy in 30 minutes. First results from week 3.",
  },
  de: {
    home: "Startseite",
    comparatif: "Vergleich",
    ctaConsultation: "Kostenlose Beratung",
    comparatifEyebrow: "B2B-Agenturvergleich",
    comparisonEyebrow: "Vergleich",
    whyDevloEyebrow: "Warum devlo",
    whyDevloHeading: "Was devlo anders macht",
    caseStudiesEyebrow: "Kundenergebnisse",
    caseStudiesHeading: "Was unsere Kunden erreicht haben",
    viewCaseStudy: "Fallstudie ansehen →",
    faqTitle: "Häufig gestellte Fragen",
    ctaTitle: "Bereit, mehr B2B-Meetings zu generieren?",
    ctaSubtitle: "Erhalten Sie Ihre personalisierte Akquisestrategie in 30 Minuten. Erste Ergebnisse ab Woche 3.",
  },
  nl: {
    home: "Home",
    comparatif: "Vergelijking",
    ctaConsultation: "Gratis consultatie",
    comparatifEyebrow: "B2B bureau vergelijking",
    comparisonEyebrow: "Vergelijking",
    whyDevloEyebrow: "Waarom devlo",
    whyDevloHeading: "Wat devlo anders doet",
    caseStudiesEyebrow: "Klantresultaten",
    caseStudiesHeading: "Wat onze klanten hebben bereikt",
    viewCaseStudy: "Praktijkvoorbeeld bekijken →",
    faqTitle: "Veelgestelde vragen",
    ctaTitle: "Klaar om meer B2B-afspraken te genereren?",
    ctaSubtitle: "Ontvang uw gepersonaliseerde prospectie-strategie in 30 minuten. Eerste resultaten vanaf week 3.",
  },
};

export function AlternativePage({ data, locale = "fr" }: { data: AlternativePageData; locale?: SupportedLocale }) {
  const copy = copyByLocale[locale];
  const localizedContent = getLocalizedAlternativeContent(data.slug, locale);
  const h1 = localizedContent?.h1 ?? data.h1;
  const intro = localizedContent?.intro ?? data.intro;
  const comparisonTable = localizedContent?.comparisonTable ?? data.comparisonTable;
  const whyDevlo = localizedContent?.whyDevlo ?? data.whyDevlo;
  const faqs = localizedContent?.faqs ?? data.faqs;
  const editorialTitle = localizedContent?.editorialTitle;
  const editorialParagraphs = localizedContent?.editorialParagraphs ?? [];
  const summaryTitle = localizedContent?.summaryTitle;
  const summaryPoints = localizedContent?.summaryPoints ?? [];
  const datePublished = localizedContent?.datePublished ?? "2024-06-15";
  const dateModified = localizedContent?.dateModified ?? "2026-03-01";

  const studies = data.caseStudySlugs
    .map((slug) => caseStudyBySlug[slug])
    .filter(Boolean);

  const homePath = resolvePathForLocale("/", locale).path;
  const comparatifPath = resolvePathForLocale("/alternative-agences-prospection-b2b", locale).path;
  const altPath = resolvePathForLocale(`/${data.slug}`, locale).path;
  const consultationPath = resolvePathForLocale("/consultation", locale).path;

  const breadcrumbItems = [
    { name: copy.home, path: homePath },
    { name: copy.comparatif, path: comparatifPath },
    ...(data.slug !== "alternative-agences-prospection-b2b"
      ? [{ name: `vs ${data.competitorName}`, path: altPath }]
      : []),
  ];

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqPageSchema(faqs),
          buildArticleSchema({
            headline: h1,
            description: intro[0] ?? h1,
            path: altPath,
            datePublished,
            dateModified,
            author: "Charles Perret",
            authorUrl: "https://www.linkedin.com/in/charlesperret/",
          }),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] py-16 text-white md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-6 text-center lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            {copy.comparatifEyebrow}
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <div className="mt-4 flex justify-center">
            <AuthorByline datePublished={datePublished} dateModified={dateModified} locale={locale} />
          </div>
          <div className="mx-auto mt-6 max-w-3xl space-y-4">
            {intro.map((p, i) => (
              <p key={i} className="text-base leading-7 text-white/85 md:text-lg">
                {p}
              </p>
            ))}
          </div>
          <Link
            href={consultationPath}
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#074f74] transition hover:bg-white/90"
          >
            {copy.ctaConsultation}
          </Link>
        </div>
      </section>

      {/* Logo rail */}
      <section className="border-b border-neutral-200 bg-white py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
            <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} />
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
            {copy.comparisonEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            devlo vs {data.competitorName}
          </h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-[#f7f8fc]">
                  <th className="px-6 py-4 text-left font-semibold text-[#153a54]">Critère</th>
                  <th className="px-6 py-4 text-left font-semibold text-[#074f74]">devlo</th>
                  <th className="px-6 py-4 text-left font-semibold text-neutral-500">{data.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50"
                  >
                    <td className="px-6 py-4 font-medium text-[#153a54]">{row.feature}</td>
                    <td className="px-6 py-4 text-[#074f74]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-green-500">✓</span>
                        {row.devlo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why devlo */}
      <section className="bg-[#f7f8fc] py-16">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
            {copy.whyDevloEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            {copy.whyDevloHeading}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {whyDevlo.map((point, i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
              >
                <p className="text-sm leading-7 text-neutral-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      {studies.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
              {copy.caseStudiesEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
              {copy.caseStudiesHeading}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={resolvePathForLocale(`/etudes-de-cas/${study.slug}`, locale).path}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:border-[var(--primary)]/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                    {study.sector}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-[#153a54]">{study.title}</h3>
                  <span className="mt-4 inline-flex text-xs font-semibold text-[#074f74]">
                    {copy.viewCaseStudy}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial / GEO section */}
      {editorialTitle && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-10">
              <h2 className="text-2xl font-extrabold leading-[1.2] tracking-tight text-[#153a54] md:text-3xl">
                {editorialTitle}
              </h2>
              {editorialParagraphs.length > 0 && (
                <div className="mt-5 space-y-4 text-neutral-600">
                  {editorialParagraphs.map((p, i) => (
                    <RichParagraph key={i} className="text-sm leading-7 md:text-base md:leading-8">
                      {p}
                    </RichParagraph>
                  ))}
                </div>
              )}
              {summaryPoints.length > 0 && (
                <div className="mt-6">
                  <SummarySection
                    title={summaryTitle ?? (locale === "fr" ? "En résumé" : locale === "de" ? "Zusammenfassung" : locale === "nl" ? "Samenvatting" : "Key takeaways")}
                    points={summaryPoints}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection title={copy.faqTitle} items={faqs} />

      {/* CTA */}
      <CTASection
        locale={locale}
        title={copy.ctaTitle}
        subtitle={copy.ctaSubtitle}
      />
    </>
  );
}
