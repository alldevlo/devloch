"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Signal = {
  name: string;
  intensity: "tres-forte" | "forte" | "moyenne" | "faible";
  description: string;
  detection: string;
};

type SignalCategory = {
  id: string;
  title: string;
  count: number;
  signals: Signal[];
};

/* ------------------------------------------------------------------ */
/*  Intensity badge config                                             */
/* ------------------------------------------------------------------ */

const INTENSITY_STYLES: Record<
  Signal["intensity"],
  { label: string; bg: string; text: string; dot: string }
> = {
  "tres-forte": {
    label: "Tres forte",
    bg: "#f9e8e8",
    text: "#af2520",
    dot: "#e0342d",
  },
  forte: {
    label: "Forte",
    bg: "#fdeee2",
    text: "#ae5511",
    dot: "#f47a14",
  },
  moyenne: {
    label: "Moyenne",
    bg: "#f8f0d9",
    text: "#6e5a16",
    dot: "#e8b406",
  },
  faible: {
    label: "Faible",
    bg: "#eeeff1",
    text: "#5e6166",
    dot: "#6b6e75",
  },
};

/* ------------------------------------------------------------------ */
/*  Chevron SVG                                                        */
/* ------------------------------------------------------------------ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Search icon SVG                                                    */
/* ------------------------------------------------------------------ */

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666d70]"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SignalBrowser({
  categories,
}: {
  categories: SignalCategory[];
}) {
  const [activeTab, setActiveTab] = useState<string>("tous");
  const [search, setSearch] = useState("");

  // Build flat list with category id for filtering
  const allSignals = useMemo(() => {
    return categories.flatMap((cat) =>
      cat.signals.map((s) => ({ ...s, categoryId: cat.id }))
    );
  }, [categories]);

  const searchLower = search.toLowerCase();

  // Determine visibility per signal
  const visibility = useMemo(() => {
    return allSignals.map((signal) => {
      const matchesTab =
        activeTab === "tous" || signal.categoryId === activeTab;
      const matchesSearch =
        searchLower === "" ||
        signal.name.toLowerCase().includes(searchLower) ||
        signal.description.toLowerCase().includes(searchLower) ||
        signal.detection.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }, [allSignals, activeTab, searchLower]);

  const visibleCount = visibility.filter(Boolean).length;

  return (
    <section
      id="signaux"
      className="mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      {/* Search */}
      <div className="relative mx-auto mb-8 max-w-md">
        <SearchIcon />
        <input
          type="search"
          placeholder="Rechercher un signal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm text-[#0d1a21] placeholder:text-[#666d70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#074f74] focus-visible:ring-offset-2"
          style={{ borderColor: "#e0e4e6" }}
        />
      </div>

      {/* Category tabs */}
      <div
        className="mb-10 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Categories de signaux"
      >
        <button
          role="tab"
          aria-selected={activeTab === "tous"}
          onClick={() => setActiveTab("tous")}
          className="rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.97]"
          style={{
            background: activeTab === "tous" ? "#074f74" : "#eeeff0",
            color: activeTab === "tous" ? "#ffffff" : "#666d70",
          }}
        >
          Tous ({allSignals.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeTab === cat.id}
            onClick={() => setActiveTab(cat.id)}
            className="rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-[0.97]"
            style={{
              background: activeTab === cat.id ? "#074f74" : "#eeeff0",
              color: activeTab === cat.id ? "#ffffff" : "#666d70",
            }}
          >
            {cat.title.replace("Signaux ", "").replace("Signaux d'Intention ", "")} ({cat.count})
          </button>
        ))}
      </div>

      {/* Results counter */}
      <p
        className="mb-4 text-center text-xs text-[#666d70]"
        aria-live="polite"
      >
        {visibleCount} signal{visibleCount !== 1 ? "x" : ""} affiche
        {visibleCount !== 1 ? "s" : ""}
      </p>

      {/* Signal cards grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allSignals.map((signal, idx) => {
          const visible = visibility[idx];
          const intensity = INTENSITY_STYLES[signal.intensity];

          return (
            <details
              key={`${signal.categoryId}-${idx}`}
              className={`group overflow-hidden rounded-xl border bg-white transition-shadow duration-200 hover:shadow-md${
                visible ? "" : " hidden"
              }`}
              style={{
                borderColor: "#e0e4e6",
                boxShadow: "0 1px 3px hsl(200 20% 80% / 0.3)",
              }}
              aria-hidden={!visible}
            >
              <summary className="flex cursor-pointer select-none list-none items-start justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-sm font-semibold leading-snug text-[#0d1a21]">
                    {signal.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{
                      background: intensity.bg,
                      color: intensity.text,
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: intensity.dot }}
                      aria-hidden="true"
                    />
                    {intensity.label}
                  </span>
                </div>
                <ChevronDown className="mt-0.5 shrink-0 text-[#666d70] transition-transform duration-200 group-open:rotate-180" />
              </summary>

              <div className="space-y-3 px-4 pb-4">
                <p
                  className="text-sm leading-relaxed text-[#666d70]"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  {signal.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {signal.detection.split(", ").map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        background: "#eeeff0",
                        color: "#666d70",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
