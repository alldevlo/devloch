import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import { type GeoPageData } from "@/content/geo-pages";
import { caseStudyBySlug } from "@/lib/case-studies";

export function GeoLandingPage({ data }: { data: GeoPageData }) {
  const studies = data.caseStudySlugs
    .map((slug) => caseStudyBySlug[slug])
    .filter(Boolean);

  const breadcrumbItems = [
    { name: "Accueil", path: "/" },
    { name: data.h1, path: `/${data.slug}` },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] py-16 text-white md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-6 text-center lg:px-10">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {data.h1}
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4">
            {data.intro.map((p, i) => (
              <p key={i} className="text-base leading-7 text-white/85 md:text-lg">
                {p}
              </p>
            ))}
          </div>
          <Link
            href="/consultation"
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#074f74] transition hover:bg-white/90"
          >
            Consultation gratuite
          </Link>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white py-10">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
            <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} duration="slow" pauseOnHover />
          </div>
        </div>
      </section>

      {studies.length > 0 && (
        <section className="bg-[#f7f8fc] py-14 md:py-18">
          <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
              Études de cas
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
              Résultats concrets sur ce marché
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/etudes-de-cas/${study.slug}`}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition hover:border-[var(--primary)]/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4d6678]">
                    {study.client}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-[#153a54]">
                    {study.heroStats[0]
                      ? `${study.heroStats[0].value} ${study.heroStats[0].label}`
                      : study.summary.slice(0, 80)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {study.sector.length > 100 ? `${study.sector.slice(0, 100)}…` : study.sector}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection
        title="Questions fréquentes"
        items={data.faqs}
      />

      <CTASection
        title="Prêt à développer votre pipeline commercial ?"
        subtitle="Réservez un appel stratégique gratuit de 30 minutes avec notre équipe."
      />
    </>
  );
}
