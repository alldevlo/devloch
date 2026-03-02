import type { ServiceFaq } from "@/content/services";

type FAQSectionProps = {
  title: string;
  items: ServiceFaq[];
};

export function FAQSection({ title, items }: FAQSectionProps) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg-subtle)] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-service-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{title}</h2>
        <div className="mt-8 space-y-3">
          {items.map((item, index) => (
            <details key={`${item.question}-${index}`} className="group rounded-2xl border border-[var(--border)] bg-white p-5">
              <summary className="cursor-pointer list-none pr-6 font-service-display text-lg font-semibold text-[var(--text-primary)]">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
