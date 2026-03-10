"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { splitLocalePath, type SupportedLocale } from "@/lib/i18n/slug-map";

const CASE_STUDIES = [
  {
    slug: "hr-54-rendez-vous-dach", name: "CareerLunch",
    paths: { fr: "/etudes-de-cas/hr-54-rendez-vous-dach", en: "/en/casestudy/hr-54-meetings-dach", de: "/de/fallstudien/hr-54-termine-dach", nl: "/nl/casestudy/hr-54-meetings-dach" },
    subtitles: { fr: "HR-Tech — DACH", en: "HR Tech — DACH", de: "HR-Tech — DACH", nl: "HR-Tech — DACH" },
  },
  {
    slug: "proprete-urbaine-71-rendez-vous", name: "Client confidentiel",
    paths: { fr: "/etudes-de-cas/proprete-urbaine-71-rendez-vous", en: "/en/casestudy/urban-cleanliness-71-meetings", de: "/de/fallstudien/stadtreinigung-71-termine", nl: "/nl/casestudy/urban-cleanliness-71-meetings" },
    subtitles: { fr: "Smart City / IA", en: "Smart City / AI", de: "Smart City / KI", nl: "Smart City / AI" },
  },
  {
    slug: "biocarburants-52-rendez-vous", name: "Square Co",
    paths: { fr: "/etudes-de-cas/biocarburants-52-rendez-vous", en: "/en/casestudy/biofuels-52-sales-meetings", de: "/de/fallstudien/biokraftstoffe-52-termine", nl: "/nl/casestudy/biofuels-52-sales-meetings" },
    subtitles: { fr: "Biocarburants", en: "Biofuels", de: "Biokraftstoffe", nl: "Biobrandstoffen" },
  },
  {
    slug: "formation-14-rendez-vous", name: "Cegos",
    paths: { fr: "/etudes-de-cas/formation-14-rendez-vous", en: "/en/casestudy/learning-development-14-meetings", de: "/de/fallstudien/training-14-termine", nl: "/nl/casestudy/learning-development-14-meetings" },
    subtitles: { fr: "Formation L&D", en: "L&D Training", de: "L&D-Training", nl: "L&D-Training" },
  },
  {
    slug: "audiovisuel-16-rendez-vous", name: "Lemanvisio",
    paths: { fr: "/etudes-de-cas/audiovisuel-16-rendez-vous", en: "/en/casestudy/audiovisual-16-meetings", de: "/de/fallstudien/av-integration-16-termine", nl: "/nl/casestudy/audiovisual-16-meetings" },
    subtitles: { fr: "Audiovisuel", en: "Audiovisual", de: "Audiovisuell", nl: "Audiovisueel" },
  },
  {
    slug: "cybersecurite-4500-entreprises", name: "Saporo",
    paths: { fr: "/etudes-de-cas/cybersecurite-4500-entreprises", en: "/en/casestudy/cybersecurity-4500-companies", de: "/de/fallstudien/cybersicherheit-4500-unternehmen", nl: "/nl/casestudy/cybersecurity-4500-companies" },
    subtitles: { fr: "Cybersécurité", en: "Cybersecurity", de: "Cybersicherheit", nl: "Cyberbeveiliging" },
  },
  {
    slug: "merchandising-23-prospects", name: "Many Ways",
    paths: { fr: "/etudes-de-cas/merchandising-23-prospects", en: "/en/casestudy/merchandising-23-prospects", de: "/de/fallstudien/merchandising-23-interessenten", nl: "/nl/casestudy/merchandising-23-prospects" },
    subtitles: { fr: "Merchandising", en: "Merchandising", de: "Merchandising", nl: "Merchandising" },
  },
  {
    slug: "biodiversite-70-rendez-vous", name: "Apidae",
    paths: { fr: "/etudes-de-cas/biodiversite-70-rendez-vous", en: "/en/casestudy/biodiversity-70-meetings", de: "/de/fallstudien/biodiversitat-70-termine", nl: "/nl/casestudy/biodiversity-70-meetings" },
    subtitles: { fr: "Biodiversité", en: "Biodiversity", de: "Biodiversität", nl: "Biodiversiteit" },
  },
  {
    slug: "logiciel-comptable-200k-ca", name: "Horus",
    paths: { fr: "/etudes-de-cas/logiciel-comptable-200k-ca", en: "/en/casestudy/accounting-200k-revenue", de: "/de/fallstudien/buchhaltungssoftware-200k-umsatz", nl: "/nl/casestudy/accounting-200k-revenue" },
    subtitles: { fr: "Logiciel comptable — Belgique", en: "Accounting Software — Belgium", de: "Buchhaltungssoftware — Belgien", nl: "Boekhoudsoftware — België" },
  },
  {
    slug: "monizze-120-rendez-vous", name: "Monizze",
    paths: { fr: "/etudes-de-cas/monizze-120-rendez-vous", en: "/en/casestudy/monizze-120-appointments", de: "/de/fallstudien/monizze-120-termine", nl: "/nl/casestudy/monizze-120-appointments" },
    subtitles: { fr: "Avantages extralégaux — Belgique", en: "Employee Benefits — Belgium", de: "Sozialleistungen — Belgien", nl: "Extralegale voordelen — België" },
  },
  {
    slug: "mobilite-40-prospects", name: "Locky",
    paths: { fr: "/etudes-de-cas/mobilite-40-prospects", en: "/en/casestudy/mobility-40-prospects", de: "/de/fallstudien/mobilitat-40-interessenten", nl: "/nl/casestudy/mobility-40-prospects" },
    subtitles: { fr: "Mobilité — Belgique", en: "Mobility — Belgium", de: "Mobilität — Belgien", nl: "Mobiliteit — België" },
  },
  {
    slug: "immobilier-11-prospects", name: "HIAG",
    paths: { fr: "/etudes-de-cas/immobilier-11-prospects", en: "/en/casestudy/commercial-real-estate-11-prospects", de: "/de/fallstudien/gewerbeimmobilien-11-interessenten", nl: "/nl/casestudy/commercial-real-estate-11-prospects" },
    subtitles: { fr: "Immobilier commercial", en: "Commercial Real Estate", de: "Gewerbeimmobilien", nl: "Commercieel vastgoed" },
  },
  {
    slug: "immobilier-30-prospects", name: "Abacus",
    paths: { fr: "/etudes-de-cas/immobilier-30-prospects", en: "/en/casestudy/real-estate-30-prospects", de: "/de/fallstudien/immobilien-30-interessenten", nl: "/nl/casestudy/real-estate-30-prospects" },
    subtitles: { fr: "ERP immobilier — Suisse", en: "Real Estate ERP — Switzerland", de: "Immobilien-ERP — Schweiz", nl: "Vastgoed ERP — Zwitserland" },
  },
  {
    slug: "iddi-generation-leads-biotech-pharma", name: "IDDI",
    paths: { fr: "/etudes-de-cas/iddi-generation-leads-biotech-pharma", en: "/en/casestudy/iddi-lead-generation-biotech-pharma", de: "/de/fallstudien/iddi-leadgenerierung-biotech-pharma", nl: "/nl/casestudy/iddi-lead-generation-biotech-pharma" },
    subtitles: { fr: "Pharma / Biotech", en: "Pharma / Biotech", de: "Pharma / Biotech", nl: "Pharma / Biotech" },
  },
];

const copyByLocale: Record<SupportedLocale, { label: string; placeholder: string }> = {
  fr: { label: "Changer d'étude de cas", placeholder: "Sélectionner une étude de cas" },
  en: { label: "Switch case study", placeholder: "Select a case study" },
  de: { label: "Fallstudie wechseln", placeholder: "Fallstudie auswählen" },
  nl: { label: "Casestudy wisselen", placeholder: "Selecteer een casestudy" },
};

type CaseStudySwitcherProps = {
  currentSlug: string;
  locale?: SupportedLocale;
};

export function CaseStudySwitcher({ currentSlug, locale }: CaseStudySwitcherProps) {
  const pathname = usePathname();
  const resolvedLocale: SupportedLocale = locale ?? splitLocalePath(pathname ?? "/").locale;
  const copy = copyByLocale[resolvedLocale];

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStudy = CASE_STUDIES.find((s) => s.slug === currentSlug);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout]);

  const closeMenu = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(false);
  }, [clearCloseTimeout]);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 130);
  }, [clearCloseTimeout]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      clearCloseTimeout();
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [closeMenu, clearCloseTimeout]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(event) => {
        const nextFocused = event.relatedTarget as Node | null;
        if (nextFocused && rootRef.current?.contains(nextFocused)) return;
        scheduleClose();
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeMenu() : openMenu())}
        className="flex w-full min-h-[52px] items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-left shadow-soft transition hover:border-devlo-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-devlo-700">{copy.label}</span>
          <span className="block text-sm font-semibold text-devlo-900">{currentStudy?.name ?? copy.placeholder}</span>
        </span>
        <ChevronDown className={["h-4 w-4 text-devlo-700 transition-transform", isOpen ? "rotate-180" : ""].join(" ")} />
      </button>

      {isOpen ? <span aria-hidden className="pointer-events-auto absolute left-0 right-0 top-full hidden h-3 md:block" /> : null}

      <div
        className={[
          "z-40 w-full md:absolute md:left-0 md:top-full md:mt-0 md:pt-2",
          isOpen ? "block" : "hidden",
          "mt-2",
        ].join(" ")}
        role="listbox"
      >
        <div className="grid gap-1.5 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-panel md:max-h-[420px] md:overflow-y-auto">
          {CASE_STUDIES.map((study) => {
            const selected = study.slug === currentSlug;
            return (
              <Link
                key={study.slug}
                href={study.paths[resolvedLocale]}
                onClick={closeMenu}
                className={[
                  "rounded-xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                  selected
                    ? "border-devlo-700 bg-devlo-700 text-white"
                    : "border-neutral-200 bg-white text-devlo-900 hover:border-devlo-700/35 hover:bg-white",
                ].join(" ")}
              >
                <span className="font-semibold">{study.name}</span>
                <span className={["mt-0.5 block text-xs", selected ? "text-white/85" : "text-neutral-500"].join(" ")}>
                  {study.subtitles[resolvedLocale]}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
