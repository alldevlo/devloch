type ServiceBenefitsProps = {
  title: string;
  items: string[];
};

export function ServiceBenefits({ title, items }: ServiceBenefitsProps) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-6 md:p-8">
      <h2 className="font-service-display text-3xl font-bold leading-tight text-[var(--text-primary)]">{title}</h2>
      <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--service-accent)]/20 text-sm font-bold text-[var(--primary)]">
              ✓
            </span>
            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
