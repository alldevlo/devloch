"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import type { ServiceHubCard } from "@/content/services";
import { buttonClassName } from "@/components/ui/button";
import { resolvePathForLocale, splitLocalePath } from "@/lib/i18n/slug-map";

const VISIBLE = 8;

type ServicesCarouselProps = {
  cards: ServiceHubCard[];
  locale?: "fr" | "en" | "de" | "nl";
};

const copyByLocale = {
  fr: {
    prev: "Services précédents",
    next: "Services suivants",
    all: "Voir tous les services",
  },
  en: {
    prev: "Previous services",
    next: "Next services",
    all: "View all services",
  },
  de: {
    prev: "Vorherige Leistungen",
    next: "Nächste Leistungen",
    all: "Alle Leistungen ansehen",
  },
  nl: {
    prev: "Vorige diensten",
    next: "Volgende diensten",
    all: "Alle diensten bekijken",
  },
} as const;

export function ServicesCarousel({ cards, locale }: ServicesCarouselProps) {
  const pathname = usePathname() ?? "/";
  const currentLocale = locale ?? splitLocalePath(pathname).locale;
  const copy = copyByLocale[currentLocale];

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(cards.length / VISIBLE);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const start = page * VISIBLE;
  const visible = cards.slice(start, start + VISIBLE);

  return (
    <div className="mt-10">
      <div className="relative">
        {totalPages > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label={copy.prev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-soft transition hover:border-devlo-600 hover:text-devlo-600 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {visible.map((card) => (
            <Link
              key={card.href}
              href={resolvePathForLocale(card.href, currentLocale).path}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
            >
              <span className="text-2xl" aria-hidden>{card.icon}</span>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-devlo-900">{card.title}</h3>
              <p className="mt-1 text-xs text-neutral-500 line-clamp-1">{card.subtitle}</p>
              <p className="mt-2 text-xs leading-5 text-neutral-600 line-clamp-2">{card.description}</p>
              <span className="mt-3 inline-block rounded-full bg-devlo-50 px-2.5 py-0.5 text-[11px] font-medium text-devlo-700 line-clamp-1">
                {card.kpi}
              </span>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label={copy.next}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-5 items-center justify-center rounded-full border border-neutral-200 bg-white p-2 shadow-soft transition hover:border-devlo-600 hover:text-devlo-600 lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Mobile pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 lg:hidden">
          <button
            type="button"
            onClick={prev}
            aria-label={copy.prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-soft"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-neutral-500">{page + 1}/{totalPages}</span>
          <button
            type="button"
            onClick={next}
            aria-label={copy.next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-soft"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* All services link */}
      <div className="mt-8 text-center">
        <Link href={resolvePathForLocale("/services", currentLocale).path} className={buttonClassName("outline", "px-8 py-3 text-sm")}>
          {copy.all}
        </Link>
      </div>
    </div>
  );
}
