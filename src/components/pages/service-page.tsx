import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyBadge } from "@/components/shared/case-study-badge";
import { CaseStudyGrid } from "@/components/shared/case-study-grid";
import { CTASection } from "@/components/shared/cta-section";
import { FAQSection } from "@/components/shared/faq-section";
import { RelatedServices } from "@/components/shared/related-services";
import { ServiceBenefits } from "@/components/shared/service-benefits";
import { ServiceHero } from "@/components/shared/service-hero";
import { ServiceLeadPanel } from "@/components/shared/service-lead-panel";
import { ServiceProcess } from "@/components/shared/service-process";
import { ALL_CASE_STUDIES, type ServicePageData } from "@/content/services";
import { toAbsoluteUrl } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";

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

function resolveCaseStudyHref(client: string): string | undefined {
  const clientLower = client.toLowerCase();
  const match = ALL_CASE_STUDIES.find((item) => {
    const current = item.client.toLowerCase();
    return current.includes(clientLower) || clientLower.includes(current);
  });

  return match?.href;
}

type ServicePageProps = {
  service: ServicePageData;
};

export function ServicePageTemplate({ service }: ServicePageProps) {
  const schemas = [
    buildServiceSchema(service),
    buildFaqPageSchema(service.faqItems),
    buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.navTitle, path: service.path },
    ]),
  ];

  return (
    <>
      <JsonLd schema={schemas} />
      <main className="font-service-body text-[var(--text-primary)]">
        <ServiceHero
          title={service.pageTitle}
          subtitle={service.pageSubtitle}
          breadcrumbLabel={service.navTitle}
          paragraphs={service.heroParagraphs}
        />

        <section className="bg-[var(--bg-white)] py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
            <div className="space-y-6">
              <ServiceBenefits title={service.coverageTitle} items={service.coverageItems} />
              <ServiceProcess title={service.processTitle} steps={service.processSteps} />

              <section className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
                <h2 className="font-service-display text-3xl font-bold leading-tight text-[var(--text-primary)]">
                  {service.editorialTitle}
                </h2>
                <div className="mt-5 space-y-4 text-[var(--text-secondary)]">
                  {service.editorialParagraphs.map((paragraph, index) => (
                    <p key={`${service.slug}-editorial-${index}`} className="text-base leading-8 md:text-lg md:leading-9">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 md:p-8">
                <h2 className="font-service-display text-3xl font-bold text-[var(--text-primary)]">{service.socialProofTitle}</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {service.socialProofItems.map((item) => (
                    <CaseStudyBadge
                      key={`${service.slug}-${item.client}`}
                      client={item.client}
                      result={item.result}
                      details={item.details}
                      href={resolveCaseStudyHref(item.client)}
                    />
                  ))}
                </div>
              </section>
            </div>

            <ServiceLeadPanel service={service} />
          </div>
        </section>

        <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-service-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
              Études de cas
            </p>
            <h2 className="mt-3 font-service-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Preuves terrain sur ce service
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              Découvrez des campagnes réelles menées par devlo en Suisse, Belgique, France et DACH. Chaque étude de cas montre
              les résultats obtenus, la méthode utilisée et les enseignements opérationnels.
            </p>
            <div className="mt-8">
              <CaseStudyGrid filterTag={service.caseStudyTag} />
            </div>
          </div>
        </section>

        <FAQSection title={service.faqTitle} items={service.faqItems} />
        <RelatedServices currentSlug={service.slug} relatedSlugs={service.relatedServices} />
        <CTASection title={service.ctaTitle} subtitle={service.ctaSubtitle} />
      </main>
    </>
  );
}
