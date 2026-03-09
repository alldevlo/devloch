import Link from "next/link";

import { caseStudies, type CaseStudy } from "@/lib/case-studies";

type RelatedCaseStudiesProps = {
  currentSlug: string;
};

function findRelated(current: CaseStudy): CaseStudy[] {
  const sectorWords = current.sector.toLowerCase().split(/\s+/);
  const scored = caseStudies
    .filter((s) => s.slug !== current.slug)
    .map((s) => {
      const otherWords = s.sector.toLowerCase().split(/\s+/);
      const overlap = sectorWords.filter((w) => w.length > 3 && otherWords.includes(w)).length;
      return { study: s, score: overlap };
    })
    .sort((a, b) => b.score - a.score);

  const results = scored.filter((s) => s.score > 0).map((s) => s.study);
  if (results.length >= 3) return results.slice(0, 3);

  // Fallback: fill with adjacent case studies
  const idx = caseStudies.findIndex((s) => s.slug === current.slug);
  const fallbacks = [
    caseStudies[(idx + 1) % caseStudies.length],
    caseStudies[(idx + 2) % caseStudies.length],
    caseStudies[(idx + 3) % caseStudies.length],
  ].filter((s) => !results.some((r) => r.slug === s.slug));

  return [...results, ...fallbacks].slice(0, 3);
}

export function RelatedCaseStudies({ currentSlug }: RelatedCaseStudiesProps) {
  const current = caseStudies.find((s) => s.slug === currentSlug);
  if (!current) return null;

  const related = findRelated(current);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-neutral-200 bg-white py-14">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
          Études de cas similaires
        </p>
        <h2 className="mt-3 text-2xl font-bold text-[#153a54] md:text-3xl">
          D&apos;autres résultats concrets
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((study) => (
            <Link
              key={study.slug}
              href={`/etudes-de-cas/${study.slug}`}
              className="rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-[var(--primary)]/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4d6678]">{study.client}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-[#153a54]">
                {study.heroStats[0] ? `${study.heroStats[0].value} ${study.heroStats[0].label}` : study.summary.slice(0, 80)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-500">{study.sector.slice(0, 100)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
