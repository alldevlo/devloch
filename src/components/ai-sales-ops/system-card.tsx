import Link from "next/link";

import { ServicesSurfaceCard } from "@/components/services/services-ui";

type SystemCardLink = {
  label: string;
  href: string;
};

type SystemCardProps = {
  number: string;
  title: string;
  fit: string;
  shortDescription: string;
  longDescription: string;
  result: string;
  stack: readonly string[];
  links?: readonly SystemCardLink[];
};

export function SystemCard({
  number,
  title,
  fit,
  shortDescription,
  longDescription,
  result,
  stack,
  links = [],
}: SystemCardProps) {
  return (
    <ServicesSurfaceCard className="h-full p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-devlo-800 text-sm font-bold text-white">
          {number}
        </span>
        <span className="inline-flex rounded-full bg-devlo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-devlo-700">
          {fit}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight text-devlo-900">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base">{shortDescription}</p>

      <div className="mt-5 rounded-2xl bg-devlo-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-devlo-700">Résultat attendu</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-devlo-900 md:text-base">{result}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={`${title}-${item}`}
            className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
          >
            {item}
          </span>
        ))}
      </div>

      {links.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={`${title}-${link.href}`}
              href={link.href}
              className="inline-flex rounded-full border border-devlo-200 bg-devlo-50 px-3 py-1.5 text-xs font-semibold text-devlo-700 transition hover:border-devlo-400 hover:bg-devlo-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}

      <details className="group mt-6 border-t border-neutral-200 pt-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-devlo-800">
          En savoir plus
        </summary>
        <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">{longDescription}</p>
      </details>
    </ServicesSurfaceCard>
  );
}
