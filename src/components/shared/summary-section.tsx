import { renderRichText } from "@/lib/utils/rich-text";

type SummarySectionProps = {
  title: string;
  points: string[];
};

export function SummarySection({ title, points }: SummarySectionProps) {
  if (points.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-devlo-200 bg-devlo-50/50 p-6 md:p-8">
      <h3 className="text-xl font-bold text-devlo-900">{title}</h3>
      <ul className="mt-4 space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-7 text-neutral-700 md:text-base">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-devlo-600" aria-hidden="true" />
            <span>{renderRichText(point)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
