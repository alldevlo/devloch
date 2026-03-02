import Link from "next/link";

import { ALL_CASE_STUDIES, type ServiceTag } from "@/content/services";

type CaseStudyGridProps = {
  filterTag?: ServiceTag;
  limit?: number;
};

const tagColors: Record<ServiceTag, string> = {
  outbound: "bg-blue-50 text-blue-700 border-blue-100",
  "intent-data": "bg-violet-50 text-violet-700 border-violet-100",
  "enrichissement-clay": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "generation-leads": "bg-amber-50 text-amber-700 border-amber-100",
  "qualification-leads": "bg-orange-50 text-orange-700 border-orange-100",
  "prise-rdv": "bg-pink-50 text-pink-700 border-pink-100",
  "cold-email": "bg-sky-50 text-sky-700 border-sky-100",
  "cold-calling": "bg-red-50 text-red-700 border-red-100",
  "linkedin-outreach": "bg-indigo-50 text-indigo-700 border-indigo-100",
  "crm-delivrabilite": "bg-gray-50 text-gray-700 border-gray-200",
};

export function CaseStudyGrid({ filterTag, limit }: CaseStudyGridProps) {
  const filtered = filterTag
    ? ALL_CASE_STUDIES.filter((caseStudy) => caseStudy.tags.includes(filterTag))
    : ALL_CASE_STUDIES;

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayed.map((caseStudy) => (
        <Link
          key={caseStudy.slug}
          href={caseStudy.href}
          className="rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-200 hover:border-[var(--primary)]/35 hover:shadow-md"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold ${tagColors[caseStudy.tags[0]]}`}
            >
              {caseStudy.sector.split("/")[0].trim()}
            </span>
            <span className="text-xs text-gray-400">{caseStudy.region}</span>
          </div>
          <h3 className="font-service-display text-lg font-bold leading-snug text-gray-900">{caseStudy.headline}</h3>
          <div className="mt-3 space-y-1">
            {caseStudy.kpis.map((kpi) => (
              <p key={`${caseStudy.slug}-${kpi}`} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="font-bold text-[var(--primary)]">·</span>
                {kpi}
              </p>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-50 pt-3">
            <p className="text-sm font-semibold text-gray-800">{caseStudy.client}</p>
            <p className="mt-0.5 text-xs text-gray-400">{caseStudy.sector}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
