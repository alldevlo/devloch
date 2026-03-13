"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { caseStudiesCards, type CaseStudyCard } from "@/content/masterfile.fr";
import { resolvePathForLocale } from "@/lib/i18n/slug-map";

const SELECTED_SLUGS = [
  "monizze-120-rendez-vous",
  "cegos-45-taux-reponse",
  "horus-200k-contrats-belgique",
  "careerlunch-54-rendez-vous-dach",
  "apidae-70-rendez-vous",
  "cybersecurite-4500-entreprises",
  "cortexia-71-rendez-vous-decideurs-urbains",
  "squareco-52-prospects-interesses-biocarburants",
];

function getCarouselCards(): CaseStudyCard[] {
  const slugSet = new Set(SELECTED_SLUGS);
  const matched = caseStudiesCards.filter((c) => slugSet.has(c.slug));
  return matched.length >= 4 ? matched : caseStudiesCards.slice(0, 8);
}

export function CaseStudyCarousel() {
  const cards = getCarouselCards();
  const [offset, setOffset] = useState(0);

  const next = useCallback(() => {
    setOffset((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  // Build visible list: show 4 on desktop, scroll wraps infinitely
  const visible = Array.from({ length: Math.min(4, cards.length) }, (_, i) =>
    cards[(offset + i) % cards.length],
  );

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4 overflow-hidden">
        {visible.map((card, i) => (
          <Link
            key={`${card.slug}-${offset}-${i}`}
            href={resolvePathForLocale(`/etudes-de-cas/${card.slug}`, "fr").path}
            className="group w-full min-w-0 flex-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-devlo-50">
              <Image
                src={card.banner}
                alt={card.client}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-devlo-600">
                {card.sector}
              </p>
              <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-devlo-900">
                {card.client}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {card.metrics.slice(0, 2).map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-devlo-50 px-2 py-0.5 text-[11px] font-medium text-devlo-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Voir plus d'études de cas"
        className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-soft transition hover:border-devlo-600 hover:text-devlo-600"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-4 text-center">
        <Link
          href="/etudes-de-cas"
          className="text-sm font-semibold text-devlo-700 underline decoration-devlo-200 underline-offset-4 transition hover:text-devlo-900 hover:decoration-devlo-400"
        >
          Voir toutes les études de cas →
        </Link>
      </div>
    </div>
  );
}
