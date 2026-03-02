import Link from "next/link";

import { SERVICE_PAGE_DATA, type ServiceSlug } from "@/content/services";

type RelatedServicesProps = {
  currentSlug: ServiceSlug;
  relatedSlugs: ServiceSlug[];
};

export function RelatedServices({ currentSlug, relatedSlugs }: RelatedServicesProps) {
  const current = SERVICE_PAGE_DATA[currentSlug];

  return (
    <section className="border-t border-[var(--border)] bg-white py-18">
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-service-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
          Services liés
        </p>
        <h2 className="mt-3 font-service-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          Étendre {current.navTitle.toLowerCase()} avec des leviers complémentaires
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {relatedSlugs.map((slug) => {
            const related = SERVICE_PAGE_DATA[slug];
            return (
              <Link
                key={slug}
                href={related.path}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5 transition hover:border-[var(--primary)]/40 hover:bg-white"
              >
                <h3 className="font-service-display text-xl font-semibold text-[var(--text-primary)]">{related.navTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{related.pageSubtitle}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
