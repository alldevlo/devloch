import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { WaveDivider } from "@/components/ui/wave-divider";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/lib/site";
import { agencyContent } from "@/content/agency";

export const metadata: Metadata = buildPageMetadata({
  title: agencyContent.metaTitle.replace(/\s*—\s*devlo$/i, ""),
  description: agencyContent.metaDescription,
  path: "/agence",
});

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "L'agence", path: "/agence" },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: agencyContent.h1,
  description: agencyContent.metaDescription,
  url: `${siteConfig.url}/agence`,
  about: {
    "@type": "Organization",
    name: "devlo",
    url: siteConfig.url,
    foundingDate: "2020",
    foundingLocation: "Lausanne, Vaud, Suisse",
    founder: {
      "@type": "Person",
      name: agencyContent.founderName,
      jobTitle: agencyContent.founderRole,
      sameAs: agencyContent.founderLinkedIn,
    },
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 20 },
    areaServed: ["CH", "BE", "FR", "DE", "AT", "NL"],
  },
};

export default function AgencePage() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqPageSchema(agencyContent.faq),
          aboutPageSchema,
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] py-16 text-white md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
            Fondée en 2020 — Lausanne, Suisse
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {agencyContent.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
            {agencyContent.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/consultation"
              className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#074f74] transition hover:bg-white/90"
            >
              Consultation gratuite
            </Link>
            <Link
              href="/etudes-de-cas"
              className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
            >
              Voir les résultats
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
            >
              Voir les services
            </Link>
          </div>
        </div>
      </section>

      <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

      {/* Stats */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {agencyContent.stats.map((stat) => (
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
                Notre histoire
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
                Spécialistes de l&apos;outbound B2B depuis 2020
              </h2>
              <div className="mt-6 space-y-4">
                {agencyContent.story.map((paragraph, i) => (
                  <p key={i} className="text-sm leading-7 text-neutral-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                Fondateur
              </p>
              <div className="mt-3 flex items-start gap-5">
                <Image
                  src="/images/ProfilePicture2025.webp"
                  alt="Charles Perret — Fondateur de devlo"
                  width={96}
                  height={96}
                  className="rounded-2xl object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-[#153a54]">{agencyContent.founderName}</h2>
                  <p className="mt-1 text-sm text-neutral-500">{agencyContent.founderRole}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-neutral-600">
                Entrepreneur B2B basé en Suisse, Charles a fondé devlo après avoir constaté le manque d&apos;agences outbound rigoureuses sur les marchés francophones. Il s&apos;est donné pour mission de créer une agence qui livre des résultats mesurables — pas des rapports PowerPoint.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={agencyContent.founderLinkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-[#074f74] hover:underline"
                >
                  Profil LinkedIn →
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center text-sm font-semibold text-[#074f74] hover:underline"
                >
                  Voir les services →
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
            Marchés
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            {agencyContent.marketsHeading}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {agencyContent.markets.map((market) => (
              <div
                key={market.name}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-[#153a54]">{market.name}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{market.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500">{agencyContent.marketsNote}</p>
        </div>
      </section>

      <WaveDivider fromBg="#FFFFFF" toBg="#f7f8fc" />

      {/* Values */}
      <section className="bg-[#f7f8fc] py-14 md:py-18">
        <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
            Notre approche
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            Ce qui nous différencie
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {agencyContent.values.map((value) => (
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

      <FAQSection title="Questions sur l'agence" items={agencyContent.faq} />

      <CTASection
        title="Travaillons ensemble"
        subtitle="Réservez un appel stratégique gratuit de 30 minutes avec notre équipe."
      />
    </>
  );
}
