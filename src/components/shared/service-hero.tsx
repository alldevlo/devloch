import Link from "next/link";

type ServiceHeroProps = {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  paragraphs: string[];
};

export function ServiceHero({ title, subtitle, breadcrumbLabel, paragraphs }: ServiceHeroProps) {
  return (
    <section className="border-b border-[var(--border)] bg-[var(--bg-white)]">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link href="/" className="transition hover:text-[var(--primary)]">
                devlo.ch
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/services" className="transition hover:text-[var(--primary)]">
                Services
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-[var(--text-primary)]">{breadcrumbLabel}</li>
          </ol>
        </nav>

        <p className="font-service-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">
          DEVLO.CH — AGENCE B2B SUISSE
        </p>
        <h1 className="mt-4 max-w-5xl font-service-display text-4xl font-bold leading-[1.05] text-[var(--text-primary)] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">{subtitle}</p>
        <div className="mt-7 max-w-4xl space-y-4 text-base leading-8 text-[var(--text-secondary)] md:text-lg md:leading-9">
          {paragraphs.map((paragraph, index) => (
            <p key={`${title}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
