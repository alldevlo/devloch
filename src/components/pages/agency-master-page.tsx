import Image from "next/image";
import Link from "next/link";

import { AuthorByline } from "@/components/shared/author-byline";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { WaveDivider } from "@/components/ui/wave-divider";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { SummarySection } from "@/components/shared/summary-section";
import { RichParagraph } from "@/lib/utils/rich-text";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/lib/site";
import { agencyContent } from "@/content/agency";
import { getLocalizedAgencyContent } from "@/lib/i18n/agency-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";

type AgencyMasterPageProps = {
  locale?: SupportedLocale;
};

const copyByLocale: Record<
  SupportedLocale,
  {
    home: string;
    agencyLabel: string;
    foundedEyebrow: string;
    ctaConsultation: string;
    ctaResults: string;
    ctaServices: string;
    storyEyebrow: string;
    storyHeading: string;
    founderEyebrow: string;
    founderBio: string;
    linkedIn: string;
    viewServices: string;
    marketsEyebrow: string;
    approachEyebrow: string;
    approachHeading: string;
    faqTitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
  }
> = {
  fr: {
    home: "Accueil",
    agencyLabel: "L'agence",
    foundedEyebrow: "Fondée en 2020 — Lausanne, Suisse",
    ctaConsultation: "Consultation gratuite",
    ctaResults: "Voir les résultats",
    ctaServices: "Voir les services",
    storyEyebrow: "Notre histoire",
    storyHeading: "Spécialistes de l'outbound B2B depuis 2020",
    founderEyebrow: "Fondateur",
    founderBio:
      "Entrepreneur B2B basé en Suisse, Charles a fondé devlo après avoir constaté le manque d'agences outbound rigoureuses sur les marchés francophones. Il s'est donné pour mission de créer une agence qui livre des résultats mesurables — pas des rapports PowerPoint.",
    linkedIn: "Profil LinkedIn →",
    viewServices: "Voir les services →",
    marketsEyebrow: "Marchés",
    approachEyebrow: "Notre approche",
    approachHeading: "Ce qui nous différencie",
    faqTitle: "Questions sur l'agence",
    ctaTitle: "Travaillons ensemble",
    ctaSubtitle: "Réservez un appel stratégique gratuit de 30 minutes avec notre équipe.",
  },
  en: {
    home: "Home",
    agencyLabel: "Agency",
    foundedEyebrow: "Founded in 2020 — Lausanne, Switzerland",
    ctaConsultation: "Free consultation",
    ctaResults: "View results",
    ctaServices: "View services",
    storyEyebrow: "Our story",
    storyHeading: "B2B outbound specialists since 2020",
    founderEyebrow: "Founder",
    founderBio:
      "B2B entrepreneur based in Switzerland, Charles founded devlo after noticing the lack of rigorous outbound agencies in French-speaking markets. He set himself the mission of creating an agency that delivers measurable results — not PowerPoint reports.",
    linkedIn: "LinkedIn profile →",
    viewServices: "View services →",
    marketsEyebrow: "Markets",
    approachEyebrow: "Our approach",
    approachHeading: "What sets us apart",
    faqTitle: "Questions about the agency",
    ctaTitle: "Let's work together",
    ctaSubtitle: "Book a free 30-minute strategic call with our team.",
  },
  de: {
    home: "Startseite",
    agencyLabel: "Über uns",
    foundedEyebrow: "Gegründet 2020 — Lausanne, Schweiz",
    ctaConsultation: "Kostenlose Beratung",
    ctaResults: "Ergebnisse ansehen",
    ctaServices: "Leistungen ansehen",
    storyEyebrow: "Unsere Geschichte",
    storyHeading: "B2B-Outbound-Spezialisten seit 2020",
    founderEyebrow: "Gründer",
    founderBio:
      "B2B-Unternehmer mit Sitz in der Schweiz, gründete Charles devlo, nachdem er das Fehlen rigoroser Outbound-Agenturen in frankophonen Märkten festgestellt hatte. Er hat sich die Mission gegeben, eine Agentur zu schaffen, die messbare Ergebnisse liefert — keine PowerPoint-Berichte.",
    linkedIn: "LinkedIn-Profil →",
    viewServices: "Leistungen ansehen →",
    marketsEyebrow: "Märkte",
    approachEyebrow: "Unser Ansatz",
    approachHeading: "Was uns auszeichnet",
    faqTitle: "Fragen zur Agentur",
    ctaTitle: "Lass uns zusammenarbeiten",
    ctaSubtitle: "Buchen Sie einen kostenlosen 30-minütigen Strategiegespräch mit unserem Team.",
  },
  nl: {
    home: "Home",
    agencyLabel: "Over ons",
    foundedEyebrow: "Opgericht in 2020 — Lausanne, Zwitserland",
    ctaConsultation: "Gratis consultatie",
    ctaResults: "Resultaten bekijken",
    ctaServices: "Diensten bekijken",
    storyEyebrow: "Ons verhaal",
    storyHeading: "B2B outbound specialisten sinds 2020",
    founderEyebrow: "Oprichter",
    founderBio:
      "B2B-ondernemer gevestigd in Zwitserland, Charles richtte devlo op nadat hij het gebrek aan rigoureuze outbound bureaus in Franstalige markten constateerde. Hij heeft zichzelf de missie gegeven een bureau te creëren dat meetbare resultaten levert — geen PowerPoint-rapporten.",
    linkedIn: "LinkedIn-profiel →",
    viewServices: "Diensten bekijken →",
    marketsEyebrow: "Markten",
    approachEyebrow: "Onze aanpak",
    approachHeading: "Wat ons onderscheidt",
    faqTitle: "Vragen over het bureau",
    ctaTitle: "Laten we samenwerken",
    ctaSubtitle: "Boek een gratis strategiegesprek van 30 minuten met ons team.",
  },
};

export function AgencyMasterPage({ locale = "fr" }: AgencyMasterPageProps) {
  const copy = copyByLocale[locale];
  const content = getLocalizedAgencyContent(locale);

  const agencyPath = resolvePathForLocale("/agence", locale).path;
  const breadcrumbItems = [
    { name: copy.home, path: resolvePathForLocale("/", locale).path },
    { name: copy.agencyLabel, path: agencyPath },
  ];

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: content.h1,
    description: content.metaDescription,
    url: `${siteConfig.url}${agencyPath}`,
    about: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
      foundingDate: "2020",
      foundingLocation: "Lausanne, Vaud, Suisse",
      founder: {
        "@type": "Person",
        name: agencyContent.founderName,
        jobTitle: content.founderRole,
        sameAs: agencyContent.founderLinkedIn,
      },
      numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 20 },
      areaServed: ["CH", "BE", "FR", "DE", "AT", "NL"],
    },
  };

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqPageSchema(content.faq),
          aboutPageSchema,
          buildArticleSchema({
            headline: content.h1,
            description: content.metaDescription,
            path: agencyPath,
            datePublished: content.datePublished ?? "2024-06-15",
            dateModified: content.dateModified ?? "2026-03-01",
            author: "Charles Perret",
            authorUrl: "https://www.linkedin.com/in/charlesperret/",
          }),
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 pb-16 text-white md:pb-24">
        <Breadcrumb items={breadcrumbItems} variant="dark" />
        <div className="mx-auto w-full max-w-screen-xl px-6 pt-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
            {copy.foundedEyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {content.h1}
          </h1>
          <div className="mt-3">
            <AuthorByline datePublished={content.datePublished ?? "2024-06-15"} dateModified={content.dateModified ?? "2026-03-01"} locale={locale} />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
            {content.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={resolvePathForLocale("/consultation", locale).path}
              className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#074f74] transition hover:bg-white/90"
            >
              {copy.ctaConsultation}
            </Link>
            <Link
              href={resolvePathForLocale("/etudes-de-cas", locale).path}
              className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
            >
              {copy.ctaResults}
            </Link>
            <Link
              href={resolvePathForLocale("/services", locale).path}
              className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
            >
              {copy.ctaServices}
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

      {/* Stats */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {content.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-neutral-200 bg-[#f7f8fc] p-6 text-center">
                <p className="text-3xl font-bold text-[#074f74]">{stat.value}</p>
                <p className="mt-2 text-sm text-neutral-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fromBg="#FFFFFF" toBg="#f7f8fc" />

      {/* Story */}
      <section className="bg-[#f7f8fc] py-14 md:py-18">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                {copy.storyEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
                {copy.storyHeading}
              </h2>
              <div className="mt-6 space-y-4">
                {content.story.map((paragraph: string, i: number) => (
                  <p key={i} className="text-sm leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                {copy.founderEyebrow}
              </p>
              <div className="mt-3 flex items-start gap-5">
                <Image
                  src="/images/ProfilePicture2025.webp"
                  alt="Charles Perret — Founder of devlo"
                  width={96}
                  height={96}
                  className="rounded-2xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#153a54]">{agencyContent.founderName}</h2>
                  <p className="mt-1 text-sm text-neutral-500">{content.founderRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-neutral-600">{copy.founderBio}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={agencyContent.founderLinkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-[#074f74] hover:underline"
                >
                  {copy.linkedIn}
                </a>
                <Link
                  href={resolvePathForLocale("/services", locale).path}
                  className="inline-flex items-center text-sm font-semibold text-[#074f74] hover:underline"
                >
                  {copy.viewServices}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fromBg="#f7f8fc" toBg="#FFFFFF" />

      {/* Markets */}
      <section className="bg-white py-14 md:py-18">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
            {copy.marketsEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            {content.marketsHeading}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.markets.map((market: { name: string; description: string }) => (
              <div
                key={market.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-[#153a54]">{market.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{market.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500">{content.marketsNote}</p>
        </div>
      </section>

      <WaveDivider fromBg="#FFFFFF" toBg="#f7f8fc" />

      {/* Values */}
      <section className="bg-[#f7f8fc] py-14 md:py-18">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
            {copy.approachEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            {copy.approachHeading}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.values.map((value: { title: string; description: string }) => (
              <div
                key={value.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-[#153a54]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.editorialTitle && (
        <section className="bg-[#f7f8fc] py-12 md:py-16">
          <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-10">
              <AuthorByline
                datePublished={content.datePublished ?? "2024-06-15"}
                dateModified={content.dateModified ?? "2026-03-01"}
                locale={locale}
              />
              <h2 className="mt-4 text-2xl font-extrabold leading-[1.2] tracking-tight text-[#153a54] md:text-3xl">
                {content.editorialTitle}
              </h2>
              {(content.editorialParagraphs ?? []).length > 0 && (
                <div className="mt-5 space-y-4 text-neutral-600">
                  {(content.editorialParagraphs ?? []).map((p: string, i: number) => (
                    <RichParagraph key={i} className="text-sm leading-7 md:text-base md:leading-8">
                      {p}
                    </RichParagraph>
                  ))}
                </div>
              )}
              {(content.summaryPoints ?? []).length > 0 && (
                <div className="mt-6">
                  <SummarySection
                    title={content.summaryTitle ?? (locale === "fr" ? "En résumé" : locale === "de" ? "Zusammenfassung" : locale === "nl" ? "Samenvatting" : "Key takeaways")}
                    points={content.summaryPoints ?? []}
                    locale={locale}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <FAQSection title={copy.faqTitle} items={content.faq} />

      <CTASection title={copy.ctaTitle} subtitle={copy.ctaSubtitle} locale={locale} />
    </>
  );
}
