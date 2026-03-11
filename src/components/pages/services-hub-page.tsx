import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { WaveDivider } from "@/components/ui/wave-divider";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { ServicesSectionHeader, ServicesSurfaceCard } from "@/components/services/services-ui";
import { CaseStudyGrid } from "@/components/shared/case-study-grid";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import type { CaseStudyCard, ServiceHubCard } from "@/content/services";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";
import { toAbsoluteUrl } from "@/lib/seo/metadata";

type ServicesHubCopy = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  ctaDiscover: string;
  ctaConsultation: string;
  ctaResults: string;
  trustedTitle: string;
  trustedDescription: string;
};

type ServicesHubPageProps = {
  cards: ServiceHubCard[];
  copy: ServicesHubCopy;
  caseStudies: CaseStudyCard[];
  locale?: SupportedLocale;
};

const breadcrumbLabelsByLocale: Record<SupportedLocale, { home: string; services: string }> = {
  fr: { home: "Accueil", services: "Services" },
  en: { home: "Home", services: "Services" },
  de: { home: "Startseite", services: "Leistungen" },
  nl: { home: "Home", services: "Diensten" },
};

export function ServicesHubPage({ cards, copy, caseStudies, locale = "fr" }: ServicesHubPageProps) {
  const labels = breadcrumbLabelsByLocale[locale];
  const toLocalePath = (frPath: string) => resolvePathForLocale(frPath, locale).path;
  const servicesHubPath = toLocalePath("/services");
  const breadcrumbItems = [
    { name: labels.home, path: toLocalePath("/") },
    { name: labels.services, path: servicesHubPath },
  ];
  const serviceHubSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.description,
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: "https://devlo.ch",
    },
    areaServed: ["CH", "BE", "FR", "DE", "AT", "NL"],
    url: toAbsoluteUrl(servicesHubPath),
  };

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          serviceHubSchema,
        ]}
      />

      <main>
        <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 pb-16 text-white md:pb-20">
          <Breadcrumb items={breadcrumbItems} variant="dark" />
          <div className="mx-auto w-full max-w-screen-xl px-6 pt-8 lg:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
              {copy.description}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">{copy.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#nos-services"
                className="inline-flex h-12 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.1em] text-[#074f74] transition hover:bg-white/90"
              >
                {copy.ctaDiscover}
              </a>
              <Link
                href={toLocalePath("/consultation")}
                className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
              >
                {copy.ctaConsultation}
              </Link>
              <Link
                href={toLocalePath("/etudes-de-cas")}
                className="inline-flex h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-white/60"
              >
                {copy.ctaResults}
              </Link>
            </div>
          </div>
        </section>

        <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

        <section className="bg-white py-10">
          <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
              <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} duration="slow" pauseOnHover />
            </div>
          </div>
        </section>

        <SectionWrapper id="nos-services" background="white" className="!pt-0">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((service) => (
              <Link key={service.href} href={toLocalePath(service.href)} className="group">
                <ServicesSurfaceCard className="h-full p-6 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-devlo-600/35 group-hover:shadow-panel">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl" aria-hidden>
                      {service.icon}
                    </span>
                    <span className="text-sm font-semibold text-devlo-700 transition group-hover:translate-x-0.5">→</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold leading-tight text-devlo-900">{service.title}</h2>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">{service.subtitle}</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{service.description}</p>

                  <div className="mt-5 border-t border-neutral-100 pt-4">
                    <p className="text-xs font-semibold text-devlo-700">✓ {service.kpi}</p>
                  </div>
                </ServicesSurfaceCard>
              </Link>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper background="white" className="border-t border-neutral-200">
          <div className="space-y-8">
            <ServicesSectionHeader title={copy.trustedTitle} description={copy.trustedDescription} />

            <CaseStudyGrid caseStudies={caseStudies} locale={locale} />
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}
