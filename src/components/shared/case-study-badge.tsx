import Link from "next/link";

type CaseStudyBadgeProps = {
  client: string;
  result: string;
  details: string;
  href?: string;
};

export function CaseStudyBadge({ client, result, details, href }: CaseStudyBadgeProps) {
  const content = (
    <article className="rounded-2xl border border-[var(--border)] bg-white p-4 transition hover:border-[var(--primary)]/40 hover:shadow-soft">
      <p className="font-service-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">{client}</p>
      <h3 className="mt-2 font-service-display text-lg font-semibold leading-snug text-[var(--text-primary)]">{result}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{details}</p>
    </article>
  );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}
