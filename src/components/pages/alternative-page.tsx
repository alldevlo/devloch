import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import { type AlternativePageData } from "@/content/alternatives";
import { caseStudyBySlug } from "@/lib/case-studies";

export function AlternativePage({ data }: { data: AlternativePageData }) {
  const studies = data.caseStudySlugs
    .map((slug) => caseStudyBySlug[slug])
    .filter(Boolean);

  const breadcrumbItems = [
    { name: "Accueil", path: "/" },
    { name: "Comparatif", path: "/alternative-agences-prospection-b2b" },
    ...(data.slug !== "alternative-agences-prospection-b2b"
      ? [{ name: `vs ${data.competitorName}`, path: `/${data.slug}` }]
      : []),
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] py-16 text-white md:py-24">
        <div className="mx-auto w-full max-w-screen-xl px-6 text-center lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            Comparatif agences B2B
          </p>
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
            Comparaison
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
                {data.comparisonTable.map((row, i) => (
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
            Pourquoi devlo
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
            Ce que devlo apporte de différent
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {data.whyDevlo.map((point, i) => (
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
              Résultats clients
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
              Ce que nos clients ont obtenu
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/etudes-de-cas/${study.slug}`}
                  className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:border-[var(--primary)]/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
                    {study.sector}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-[#153a54]">{study.title}</h3>
                  <span className="mt-4 inline-flex text-xs font-semibold text-[#074f74]">
                    {"Voir l'étude de cas →"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection title="Questions fréquentes" items={data.faqs} />

      {/* CTA */}
      <CTASection
        title="Prêt à générer plus de rendez-vous B2B ?"
        subtitle="Obtenez votre stratégie de prospection personnalisée en 30 minutes. Premiers résultats dès la 3e semaine."
      />
    </>
  );
}
