import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyGrid } from "@/components/shared/case-study-grid";
import { SERVICE_HUB_CARDS } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Services de prospection B2B : cold email, LinkedIn, calling",
    description:
      "devlo est une agence de prospection B2B basée en Suisse : génération de leads, cold email, LinkedIn outreach, cold calling, intent data et enrichissement Clay.",
    path: "/services",
  }),
  keywords: [
    "services prospection B2B",
    "agence outbound Suisse",
    "cold email LinkedIn calling",
    "intent data",
    "enrichissement Clay",
  ],
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <main className="font-service-body text-[var(--text-primary)]">
        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="font-service-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)]">
            DEVLO.CH — AGENCE B2B SUISSE
          </p>
          <h1 className="mt-4 font-service-display text-5xl font-bold leading-[1.05] text-[var(--text-primary)] lg:text-6xl">
            Services de prospection et génération de leads B2B
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            devlo aide startups, PMEs et scale-ups européennes à générer des rendez-vous qualifiés via des campagnes
            outbound multicanales, l&apos;activation des signaux d&apos;intention et une data commerciale exploitable.
          </p>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Chaque service ci-dessous inclut un configurateur et un formulaire pour cadrer votre stratégie avant votre call.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_HUB_CARDS.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-[var(--primary)]/30 hover:shadow-lg"
              >
                <div className="text-3xl">{service.icon}</div>
                <h2 className="mt-4 font-service-display text-2xl font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--primary)]">
                  {service.title}
                </h2>
                <p className="mt-1 text-xs font-semibold text-[var(--primary)]">{service.subtitle}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                <div className="mt-4 border-t border-gray-50 pt-4">
                  <p className="text-xs font-semibold text-[var(--service-accent)]">✓ {service.kpi}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-service-display text-3xl font-bold text-[var(--text-primary)]">Ils nous ont fait confiance</h2>
            <p className="mb-10 mt-2 text-sm text-[var(--text-muted)]">
              Résultats obtenus en Suisse, Belgique, France et DACH sur des environnements B2B exigeants.
            </p>
            <CaseStudyGrid />
          </div>
        </section>
      </main>
    </>
  );
}
