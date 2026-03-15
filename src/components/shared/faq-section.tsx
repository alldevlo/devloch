import type { ServiceFaq } from "@/content/services";
import { renderRichText } from "@/lib/utils/rich-text";

type FAQSectionProps = {
  id?: string;
  title: string;
  items: ServiceFaq[];
};

function extractCapsule(answer: string): string {
  const firstSentence = answer.match(/^[^.!?]+[.!?]/);
  return firstSentence ? firstSentence[0] : answer.slice(0, 160);
}

export function FAQSection({ id, title, items }: FAQSectionProps) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-[var(--border)] bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{title}</h2>
        <div className="mt-8 space-y-3">
          {items.map((item, index) => (
            <details key={`${item.question}-${index}`} open={index === 0} className="group rounded-2xl border border-[var(--border)] bg-white p-5">
              <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-[var(--text-primary)]">
                {item.question}
              </summary>
              <p className="mt-2 text-sm font-semibold leading-6 text-[var(--text-primary)]">
                {extractCapsule(item.answer)}
              </p>
              <p className="mt-1 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                {renderRichText(item.answer)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
