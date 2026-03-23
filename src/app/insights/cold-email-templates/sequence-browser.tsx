"use client";

import { useState, useMemo } from "react";
import type { Sequence } from "./sequence-data";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

import Link from "next/link";

const SEQUENCE_SLUGS: Record<number, string> = {
  1: "b2b-sales-training",
  2: "cybersecurity-outreach",
  3: "apiary-services",
  4: "employee-engagement",
  5: "learning-development",
  6: "cleaning-management",
  8: "recruiting-platform",
  9: "bike-parking",
  10: "it-integrator",
  11: "merchandise-products",
  12: "corporate-catering",
  13: "devops-engineering",
  14: "market-intelligence",
  17: "property-management",
  18: "it-security-soc",
  19: "clinical-research",
  20: "solar-energy",
  22: "it-risk-compliance",
  23: "healthcare-technology",
  24: "web-technology",
  25: "cybersecurity-risk-management",
  26: "biotech-rwe",
  27: "digital-marketing",
  28: "hr-services",
  29: "supply-chain",
};

/* ------------------------------------------------------------------ */
/*  Channel icons (inline SVGs)                                        */
/* ------------------------------------------------------------------ */

function EmailIcon({ className }: { className?: string }) {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3v1.2a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z" />
    </svg>
  );
}

function ChannelIcon({ channel }: { channel: string }) {
  const lower = channel.toLowerCase();
  if (lower.includes("linkedin"))
    return <LinkedInIcon className="text-[#0a66c2]" />;
  if (lower.includes("call"))
    return <PhoneIcon className="text-orange-500" />;
  return <EmailIcon className="text-[#074f74]" />;
}

/* ------------------------------------------------------------------ */
/*  Channel badge with color                                           */
/* ------------------------------------------------------------------ */

function ChannelBadge({ type, callLabel = "Appel" }: { type: string; callLabel?: string }) {
  const lower = type.toLowerCase();

  if (lower.includes("linkedin")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-semibold text-[#0a66c2]">
        <LinkedInIcon />
        LinkedIn
      </span>
    );
  }

  if (lower.includes("call")) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
        <PhoneIcon />
        {callLabel}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4f8] px-3 py-1 text-xs font-semibold text-[#074f74]">
      <EmailIcon />
      Email
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Metric badge with color thresholds                                 */
/* ------------------------------------------------------------------ */

function MetricBadge({
  label,
  value,
  pct,
  thresholds,
}: {
  label: string;
  value: number | null;
  pct: number | null;
  thresholds?: { green: number; yellow: number };
}) {
  if (value === null && pct === null) {
    return (
      <div className="rounded-lg bg-gray-50 px-3 py-2 text-center">
        <div className="text-xs font-medium text-gray-400">{label}</div>
        <div className="mt-0.5 text-sm font-bold text-gray-300">N/A</div>
      </div>
    );
  }

  let badgeBg = "#f3f4f6";
  let badgeText = "#666d70";

  if (pct !== null && thresholds) {
    if (pct >= thresholds.green) {
      badgeBg = "#dcfce7";
      badgeText = "#16a34a";
    } else if (pct >= thresholds.yellow) {
      badgeBg = "#fef9c3";
      badgeText = "#ca8a04";
    }
  }

  return (
    <div
      className="rounded-lg px-3 py-2 text-center"
      style={{ background: badgeBg }}
    >
      <div className="text-xs font-medium" style={{ color: badgeText }}>
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold" style={{ color: badgeText }}>
        {value !== null ? value.toLocaleString("fr-CH") : ""}
        {pct !== null && (
          <span className="ml-1 text-xs font-semibold">({pct}%)</span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chevron                                                            */
/* ------------------------------------------------------------------ */

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
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
/*  Language badge                                                     */
/* ------------------------------------------------------------------ */

function LanguageBadge({ lang }: { lang: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    EN: { bg: "#eef4f8", text: "#074f74" },
    FR: { bg: "#f0e8f9", text: "#6b21a8" },
    DE: { bg: "#fef3c7", text: "#92400e" },
    "DE/FR": { bg: "#fef3c7", text: "#92400e" },
  };
  const style = colors[lang] || colors.EN;

  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold"
      style={{ background: style.bg, color: style.text }}
    >
      {lang}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline dot color by channel                                      */
/* ------------------------------------------------------------------ */

function getTimelineDotColor(type: string): string {
  const lower = type.toLowerCase();
  if (lower.includes("linkedin")) return "#0a66c2";
  if (lower.includes("call")) return "#ea580c";
  return "#074f74";
}

/* ------------------------------------------------------------------ */
/*  Format touch content: render paragraphs properly                   */
/* ------------------------------------------------------------------ */

function FormattedContent({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#333" }}>
      {paragraphs.map((para, i) => {
        const lines = para.split("\n");
        return (
          <p key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getUniqueIndustries(sequences: Sequence[]): string[] {
  const counts = new Map<string, number>();
  for (const s of sequences) {
    const industry = s.industry.split(" / ")[0].trim();
    counts.set(industry, (counts.get(industry) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

function getChannelType(seq: Sequence): "email-only" | "multichannel" {
  if (seq.channels.length <= 1) return "email-only";
  return "multichannel";
}

/** Full-text search across all sequence fields */
function matchesSearch(seq: Sequence, query: string): boolean {
  if (query.trim() === "") return true;
  const q = query.toLowerCase();
  const searchableFields = [
    seq.industry,
    seq.icp,
    seq.language,
    seq.abTesting ?? "",
    ...seq.channels,
    ...seq.touches.map((t) => [t.content, t.subject ?? "", t.type, t.timing].join(" ")),
  ];
  const fullText = searchableFields.join(" ").toLowerCase();
  return fullText.includes(q);
}

/* ------------------------------------------------------------------ */
/*  Main browser component                                             */
/* ------------------------------------------------------------------ */

export type SequenceBrowserLabels = {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  industryLabel: string;
  channelLabel: string;
  allFilter: string;
  emailOnly: string;
  multichannel: string;
  noResults: string;
  resultsCounter: string;
  sequenceOf: string;
  sentLabel: string;
  openedLabel: string;
  repliesLabel: string;
  interestedLabel: string;
  stepsLabel: string;
  daysLabel: string;
  targetIcp: string;
  abTest: string;
  fullSequence: string;
  duration: string;
  viewFullSequence: string;
  subjectLabel: string;
  callLabel: string;
};

const DEFAULT_LABELS: SequenceBrowserLabels = {
  title: "25 Séquences Cold Email B2B",
  subtitle: "Inspiration et résultats réels",
  searchPlaceholder: "Rechercher une séquence...",
  industryLabel: "Industrie",
  channelLabel: "Canal",
  allFilter: "Tous",
  emailOnly: "Email seul",
  multichannel: "Multicanal",
  noResults: "Aucune séquence ne correspond à ces filtres. Voici toutes les {count} séquences disponibles :",
  resultsCounter: "{count} séquence{plural} affichée{plural}",
  sequenceOf: "Séquence de",
  sentLabel: "Envoyés",
  openedLabel: "Ouverts",
  repliesLabel: "Réponses",
  interestedLabel: "Intéressés",
  stepsLabel: "étapes",
  daysLabel: "jours",
  targetIcp: "Cible (ICP)",
  abTest: "Test A/B",
  fullSequence: "Séquence complète",
  duration: "Durée",
  viewFullSequence: "Voir la séquence complète",
  subjectLabel: "Objet",
  callLabel: "Appel",
};

export function SequenceBrowser({
  sequences,
  uiLabels,
}: {
  sequences: Sequence[];
  uiLabels?: SequenceBrowserLabels;
}) {
  const L = uiLabels ?? DEFAULT_LABELS;
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState(L.allFilter);
  const [channelFilter, setChannelFilter] = useState(L.allFilter);

  const industries = useMemo(
    () => getUniqueIndustries(sequences),
    [sequences]
  );

  const filtered = useMemo(() => {
    return sequences.map((seq) => {
      const industryFirst = seq.industry.split(" / ")[0].trim();
      const matchesIndustry =
        industryFilter === L.allFilter || industryFirst === industryFilter;
      const isAllChannel = channelFilter === L.allFilter;
      const matchesCh =
        isAllChannel ||
        (channelFilter === "email-only"
          ? getChannelType(seq) === "email-only"
          : getChannelType(seq) === "multichannel");
      const matchesQ = matchesSearch(seq, search);

      return {
        seq,
        visible: matchesIndustry && matchesCh && matchesQ,
      };
    });
  }, [sequences, industryFilter, channelFilter, search]);

  const visibleCount = filtered.filter((f) => f.visible).length;
  const showFallback = visibleCount === 0;

  return (
    <div>
      {/* Section title */}
      <h2
        className="mb-2 text-center font-black text-[#0D0D0D]"
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
          lineHeight: 1.2,
        }}
      >
        {L.title}
      </h2>
      <p
        className="mb-10 text-center text-sm"
        style={{ color: "#666d70" }}
      >
        {L.subtitle}
      </p>

      {/* ── Filter bar ── */}
      <div className="mb-8 space-y-5">
        {/* Search */}
        <div className="relative">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8c8c8c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder={L.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#e0e4e6] bg-white py-3 pl-11 pr-4 text-sm text-[#0D0D0D] placeholder:text-[#8c8c8c] focus:border-[#074f74] focus:outline-none focus:ring-1 focus:ring-[#074f74]"
          />
        </div>

        {/* Filter groups */}
        <div className="flex flex-wrap gap-8">
          {/* Industry */}
          <div className="space-y-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#8c8c8c" }}
            >
              {L.industryLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {[L.allFilter, ...industries.slice(0, 8)].map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(ind)}
                  className="rounded-full px-4 py-2 text-xs font-medium transition-colors"
                  style={{
                    background:
                      industryFilter === ind ? "#074f74" : "#f3f4f6",
                    color: industryFilter === ind ? "#ffffff" : "#4a4a4a",
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Channel */}
          <div className="space-y-2">
            <label
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#8c8c8c" }}
            >
              {L.channelLabel}
            </label>
            <div className="flex gap-2">
              {[
                { key: L.allFilter, label: L.allFilter },
                { key: "email-only", label: L.emailOnly },
                { key: "multichannel", label: L.multichannel },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setChannelFilter(key)}
                  className="rounded-full px-4 py-2 text-xs font-medium transition-colors"
                  style={{
                    background:
                      channelFilter === key ? "#074f74" : "#f3f4f6",
                    color: channelFilter === key ? "#ffffff" : "#4a4a4a",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm" style={{ color: "#666d70" }}>
          {showFallback
            ? L.noResults.replace("{count}", String(sequences.length))
            : L.resultsCounter
                .replace("{count}", String(visibleCount))
                .replace(/{plural}/g, visibleCount !== 1 ? "s" : "")}
        </p>
      </div>

      {/* ── Sequence cards ── */}
      <div className="space-y-5">
        {filtered.map(({ seq, visible }) => (
          <details
            key={seq.id}
            className={`group rounded-xl border border-[#e0e4e6] bg-white transition-shadow hover:shadow-md ${
              !showFallback && !visible ? "hidden" : ""
            }`}
          >
            <summary className="cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#0D0D0D]">
                      {L.sequenceOf} {seq.industry.toLowerCase()}
                    </h3>
                    <LanguageBadge lang={seq.language} />
                  </div>

                  {/* Info row */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Metrics as colored badges */}
                    <MetricBadge
                      label={L.sentLabel}
                      value={seq.metrics.sent}
                      pct={null}
                    />
                    <MetricBadge
                      label={L.openedLabel}
                      value={null}
                      pct={null}
                    />
                    <MetricBadge
                      label={L.repliesLabel}
                      value={seq.metrics.replied}
                      pct={seq.metrics.repliedPct}
                      thresholds={{ green: 20, yellow: 10 }}
                    />
                    <MetricBadge
                      label={L.interestedLabel}
                      value={seq.metrics.interested}
                      pct={seq.metrics.interestedPct}
                      thresholds={{ green: 20, yellow: 10 }}
                    />

                    <div className="mx-1 hidden h-8 w-px bg-[#e0e4e6] sm:block" />

                    {/* Channels + info */}
                    <div className="flex items-center gap-2">
                      {seq.channels.map((ch) => (
                        <ChannelIcon key={ch} channel={ch} />
                      ))}
                      <span
                        className="text-xs"
                        style={{ color: "#8c8c8c" }}
                      >
                        {seq.numTouches} {L.stepsLabel} &middot; {seq.durationDays} {L.daysLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronDown className="mt-1 shrink-0 text-[#666d70] transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            {/* Expanded content */}
            <div className="border-t border-[#e0e4e6] px-6 py-6">
              {/* ICP + A/B row */}
              <div className="mb-6 grid gap-6 sm:grid-cols-2">
                {seq.icp && seq.icp !== "N/A" && (
                  <div>
                    <h4
                      className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#8c8c8c" }}
                    >
                      {L.targetIcp}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#4a4a4a" }}
                    >
                      {seq.icp}
                    </p>
                  </div>
                )}

                {seq.abTesting &&
                  seq.abTesting !== "TBC" &&
                  seq.abTesting !== "No" &&
                  seq.abTesting !== "no" && (
                    <div>
                      <h4
                        className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#8c8c8c" }}
                      >
                        {L.abTest}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "#4a4a4a" }}
                      >
                        {seq.abTesting}
                      </p>
                    </div>
                  )}
              </div>

              {/* Sequence info */}
              <div className="mb-4 flex items-center gap-4">
                <h4
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#8c8c8c" }}
                >
                  {L.fullSequence} ({seq.touches.length} {L.stepsLabel})
                </h4>
                <span className="text-xs" style={{ color: "#b0b0b0" }}>
                  {L.duration} : {seq.durationDays} {L.daysLabel}
                </span>
              </div>

              {/* Vertical timeline */}
              <div className="relative ml-3">
                {/* Timeline line */}
                <div
                  className="absolute left-[7px] top-0 h-full w-0.5"
                  style={{ background: "#e0e4e6" }}
                />

                <div className="space-y-0">
                  {seq.touches.map((touch, idx) => {
                    const dotColor = getTimelineDotColor(touch.type);
                    const isLast = idx === seq.touches.length - 1;

                    return (
                      <div key={touch.number} className="relative flex gap-5 pb-6">
                        {/* Timeline dot */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div
                            className="mt-1 h-4 w-4 rounded-full border-2 border-white"
                            style={{
                              background: dotColor,
                              boxShadow: `0 0 0 2px ${dotColor}30`,
                            }}
                          />
                          {isLast && (
                            <div
                              className="absolute left-[7px] top-5 h-full w-0.5"
                              style={{ background: "#ffffff" }}
                            />
                          )}
                        </div>

                        {/* Touch content */}
                        <div className="flex-1 rounded-xl border border-[#f0f0f0] bg-[#fafbfc] p-5">
                          <div className="mb-3 flex flex-wrap items-center gap-3">
                            <span
                              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                              style={{ background: dotColor }}
                            >
                              {touch.number}
                            </span>
                            <ChannelBadge type={touch.type} callLabel={L.callLabel} />
                            <span
                              className="text-xs"
                              style={{ color: "#8c8c8c" }}
                            >
                              {touch.timing}
                            </span>
                          </div>
                          {touch.subject && (
                            <p
                              className="mb-3 text-xs font-semibold"
                              style={{ color: "#4a4a4a" }}
                            >
                              {L.subjectLabel} : {touch.subject}
                            </p>
                          )}
                          <FormattedContent text={touch.content} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Link to full sequence page */}
                {SEQUENCE_SLUGS[seq.id] && (
                  <div className="mt-6 border-t border-[#e0e4e6] pt-5">
                    <Link
                      href={`/insights/cold-email-templates/${SEQUENCE_SLUGS[seq.id]}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#074f74] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a3a54]"
                    >
                      {L.viewFullSequence}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
