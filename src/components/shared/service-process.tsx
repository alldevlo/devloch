import type { ServiceProcessStep } from "@/content/services";

type ServiceProcessProps = {
  title: string;
  steps: ServiceProcessStep[];
};

export function ServiceProcess({ title, steps }: ServiceProcessProps) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 md:p-8">
      <h2 className="font-service-display text-3xl font-bold leading-tight text-[var(--text-primary)]">{title}</h2>
      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <p className="font-service-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
              Étape {index + 1}
            </p>
            <h3 className="mt-1 font-service-display text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)] md:text-base md:leading-7">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
