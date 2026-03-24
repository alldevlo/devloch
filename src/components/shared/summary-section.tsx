import { renderRichText } from "@/lib/utils/rich-text";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

type SummarySectionProps = {
  title: string;
  points: string[];
  locale?: SupportedLocale;
};

const copyByLocale: Record<SupportedLocale, { eyebrow: string; ariaLabel: string }> = {
  fr: { eyebrow: "En résumé :", ariaLabel: "Résumé" },
  en: { eyebrow: "In summary:", ariaLabel: "Key takeaways" },
  de: { eyebrow: "Zusammenfassung:", ariaLabel: "Zusammenfassung" },
  nl: { eyebrow: "Samengevat:", ariaLabel: "Belangrijkste punten" },
};

export function SummarySection({ title, points, locale = "fr" }: SummarySectionProps) {
  if (points.length === 0) return null;
  const copy = copyByLocale[locale];

  return (
    <section className="rounded-2xl border border-devlo-200 bg-devlo-50/50 p-6 md:p-8" role="doc-conclusion" aria-label={copy.ariaLabel}>
      <p className="text-xs font-semibold uppercase tracking-widest text-devlo-500">{copy.eyebrow}</p>
      <h3 className="mt-1 text-xl font-bold text-devlo-900">{title}</h3>
      <ul className="mt-4 space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-7 text-neutral-700 md:text-base">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-devlo-600" aria-hidden="true" />
            <span>{renderRichText(point)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
