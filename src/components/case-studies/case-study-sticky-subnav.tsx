"use client";

import { useEffect, useMemo, useState } from "react";

import { buttonClassName } from "@/components/ui/button";

type StickySubnavItem = {
  id: string;
  label: string;
};

type CaseStudyStickySubnavProps = {
  items: StickySubnavItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

export function CaseStudyStickySubnav({
  items,
  ctaHref = "#contact",
  ctaLabel = "Planifier une consultation stratégique",
}: CaseStudyStickySubnavProps) {
  const validItems = useMemo(() => items.filter((item) => item.id && item.label), [items]);
  const [activeId, setActiveId] = useState<string>(validItems[0]?.id ?? "");

  useEffect(() => {
    if (!validItems.length) {
      return;
    }

    const sections = validItems
      .map((item) => ({ item, element: document.getElementById(item.id) }))
      .filter((entry): entry is { item: StickySubnavItem; element: HTMLElement } => Boolean(entry.element));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.15, 0.3, 0.6],
      },
    );

    sections.forEach(({ element }) => observer.observe(element));

    return () => observer.disconnect();
  }, [validItems]);

  if (!validItems.length) {
    return null;
  }

  return (
    <div data-case-study-sticky-subnav="" className="sticky top-[86px] z-30 hidden md:block">
      <div className="rounded-2xl border border-neutral-200/90 bg-white/90 px-4 py-3 shadow-soft backdrop-blur-md">
        <div className="flex items-center gap-4">
          <nav aria-label="Navigation de l’étude de cas" className="min-w-0 flex-1">
            <ul className="flex flex-wrap items-center gap-2">
              {validItems.map((item) => {
                const isActive = activeId === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={[
                        "inline-flex min-h-[36px] items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors",
                        isActive ? "bg-devlo-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-devlo-100 hover:text-devlo-800",
                      ].join(" ")}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href={ctaHref}
            data-case-study-cta=""
            data-case-study-cta-variant="subnav"
            className={buttonClassName("primary", "min-h-[38px] whitespace-nowrap px-4 py-2 text-xs")}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
