"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonClassName } from "@/components/ui/button";
import { mainNav } from "@/content/masterfile.fr";
import { getCaseStudyNavigationItems } from "@/data/case-study-navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { normalizePath, resolvePathForLocale, splitLocalePath, type SupportedLocale } from "@/lib/i18n/slug-map";

function toCanonicalFrPath(pathname: string) {
  const resolved = normalizePath(resolvePathForLocale(pathname, "fr").path);
  if (resolved === "/resultats-cas-etudes") return "/etudes-de-cas";
  if (resolved.startsWith("/resultats/")) {
    return `/etudes-de-cas/${resolved.slice("/resultats/".length)}`;
  }
  return resolved;
}

const navCopyByLocale: Record<
  SupportedLocale,
  {
    navigationAria: string;
    homeAria: string;
    agency: string;
    caseStudies: string;
    services: string;
    academy: string;
    cta: string;
    allServices: string;
    seeAllServices: string;
    allCaseStudies: string;
    seeAllCaseStudies: string;
    openCaseStudiesMenu: string;
    showCaseStudies: string;
    openServicesMenu: string;
    showServices: string;
    openMenu: string;
    closeMenu: string;
    markets: string;
    marketsCH: string;
    marketsBE: string;
    marketsFR: string;
    openMarketsMenu: string;
    showMarkets: string;
    academySubtitle: string;
    aiSalesOps: string;
    aiSalesOpsSubtitle: string;
    insights: string;
  }
> = {
  fr: {
    navigationAria: "Navigation principale",
    homeAria: "Accueil devlo",
    agency: "Agence",
    caseStudies: "Études de cas",
    services: "Services",
    academy: "Outbound Academy",
    cta: "Consultation gratuite",
    insights: "Insights",
    allServices: "Tous les services",
    seeAllServices: "Voir tous les services →",
    allCaseStudies: "Toutes les études de cas",
    seeAllCaseStudies: "Voir toutes les études de cas →",
    openCaseStudiesMenu: "Ouvrir le menu études de cas",
    showCaseStudies: "Afficher les études de cas",
    openServicesMenu: "Ouvrir le menu services",
    showServices: "Afficher les services",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    markets: "Présence",
    marketsCH: "Suisse",
    marketsBE: "Belgique",
    marketsFR: "France",
    openMarketsMenu: "Ouvrir le menu présence",
    showMarkets: "Afficher la présence",
    academySubtitle: "Formation prospection B2B gratuite",
    aiSalesOps: "AI Sales Ops",
    aiSalesOpsSubtitle: "Systèmes IA pour équipes commerciales B2B",
  },
  en: {
    navigationAria: "Main navigation",
    homeAria: "devlo homepage",
    agency: "Agency",
    caseStudies: "Case studies",
    services: "Services",
    academy: "Outbound Academy",
    cta: "Free consultation",
    allServices: "All services",
    seeAllServices: "See all services →",
    allCaseStudies: "All case studies",
    seeAllCaseStudies: "See all case studies →",
    openCaseStudiesMenu: "Open case studies menu",
    showCaseStudies: "Show case studies",
    openServicesMenu: "Open services menu",
    showServices: "Show services",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    markets: "Coverage",
    marketsCH: "Switzerland",
    marketsBE: "Belgium",
    marketsFR: "France",
    openMarketsMenu: "Open coverage menu",
    showMarkets: "Show coverage",
    academySubtitle: "Free B2B outbound training",
    aiSalesOps: "AI Sales Ops",
    aiSalesOpsSubtitle: "AI systems for B2B sales teams",
    insights: "Insights",
  },
  de: {
    navigationAria: "Hauptnavigation",
    homeAria: "devlo Startseite",
    agency: "Agentur",
    caseStudies: "Fallstudien",
    services: "Dienstleistungen",
    academy: "Outbound Academy",
    cta: "Kostenlose Beratung",
    allServices: "Alle Leistungen",
    seeAllServices: "Alle Leistungen ansehen →",
    allCaseStudies: "Alle Fallstudien",
    seeAllCaseStudies: "Alle Fallstudien ansehen →",
    openCaseStudiesMenu: "Fallstudien-Menü öffnen",
    showCaseStudies: "Fallstudien anzeigen",
    openServicesMenu: "Service-Menü öffnen",
    showServices: "Leistungen anzeigen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    markets: "Präsenz",
    marketsCH: "Schweiz",
    marketsBE: "Belgien",
    marketsFR: "Frankreich",
    openMarketsMenu: "Präsenz-Menü öffnen",
    showMarkets: "Präsenz anzeigen",
    academySubtitle: "Kostenlose B2B-Akquise-Schulung",
    aiSalesOps: "AI Sales Ops",
    aiSalesOpsSubtitle: "KI-Systeme für B2B-Vertriebsteams",
    insights: "Insights",
  },
  nl: {
    navigationAria: "Hoofdnavigatie",
    homeAria: "devlo homepage",
    agency: "Agentschap",
    caseStudies: "Praktijkvoorbeelden",
    services: "Diensten",
    academy: "Outbound Academy",
    cta: "Gratis consultatie",
    allServices: "Alle diensten",
    seeAllServices: "Alle diensten bekijken →",
    allCaseStudies: "Alle praktijkvoorbeelden",
    seeAllCaseStudies: "Alle praktijkvoorbeelden bekijken →",
    openCaseStudiesMenu: "Casestudy-menu openen",
    showCaseStudies: "Casestudy's tonen",
    openServicesMenu: "Servicemenu openen",
    showServices: "Diensten tonen",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    markets: "Aanwezigheid",
    marketsCH: "Zwitserland",
    marketsBE: "België",
    marketsFR: "Frankrijk",
    openMarketsMenu: "Aanwezigheid menu openen",
    showMarkets: "Aanwezigheid tonen",
    academySubtitle: "Gratis B2B outbound training",
    aiSalesOps: "AI Sales Ops",
    aiSalesOpsSubtitle: "AI-systemen voor B2B salesteams",
    insights: "Insights",
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname ?? "/";
  const { locale: currentLocale } = splitLocalePath(safePathname);
  const navCopy = navCopyByLocale[currentLocale];
  const canonicalFrPath = toCanonicalFrPath(safePathname);

  const toCurrentLocalePath = (frPath: string) => resolvePathForLocale(frPath, currentLocale).path;
  const caseStudiesHref = toCurrentLocalePath("/etudes-de-cas");
  const aiSalesOpsHref = toCurrentLocalePath("/ai-sales-ops");
  const navItems = [
    { key: "agency", href: toCurrentLocalePath("/agence") as string, label: navCopy.agency },
    { key: "caseStudies", href: caseStudiesHref as string, label: navCopy.caseStudies },
    { key: "aiSalesOps", href: aiSalesOpsHref as string, label: navCopy.aiSalesOps },
    { key: "services", href: toCurrentLocalePath("/services") as string, label: navCopy.services },
    { key: "insights", href: "/insights" as string, label: navCopy.insights },
  ] as const;

  const geoLinks = [
    { href: toCurrentLocalePath("/prospection-commerciale-suisse"), label: navCopy.marketsCH, flag: "🇨🇭" },
    { href: toCurrentLocalePath("/prospection-commerciale-belgique"), label: navCopy.marketsBE, flag: "🇧🇪" },
    { href: toCurrentLocalePath("/prospection-commerciale-france"), label: navCopy.marketsFR, flag: "🇫🇷" },
  ];
  const consultationHref = toCurrentLocalePath("/consultation");
  const caseStudyMenuItems = getCaseStudyNavigationItems(currentLocale);
  const localizedServicesCards = getLocalizedServicesContent(currentLocale).SERVICE_HUB_CARDS.map((service) => ({
    ...service,
    href: toCurrentLocalePath(service.href),
  }));
  const agencyActive = canonicalFrPath === "/agence";
  const caseStudiesActive = canonicalFrPath === "/etudes-de-cas" || canonicalFrPath.startsWith("/etudes-de-cas/");
  const aiSalesOpsActive = canonicalFrPath === "/ai-sales-ops" || canonicalFrPath.startsWith("/ai-sales-ops/");
  const servicesActive = canonicalFrPath === "/services" || canonicalFrPath.startsWith("/services/");
  const marketsActive = canonicalFrPath.startsWith("/prospection-commerciale-");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileStickyCta, setShowMobileStickyCta] = useState(false);
  const [isCaseStudiesMenuOpen, setIsCaseStudiesMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMarketsMenuOpen, setIsMarketsMenuOpen] = useState(false);
  const [isMobileCaseStudiesOpen, setIsMobileCaseStudiesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileMarketsOpen, setIsMobileMarketsOpen] = useState(false);
  const caseStudiesMenuRef = useRef<HTMLDivElement | null>(null);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const marketsMenuRef = useRef<HTMLDivElement | null>(null);
  const caseStudiesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const marketsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY;
        const nextScrolled = y > 50;
        const nextSticky = y > 300;
        setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        setShowMobileStickyCta((prev) => (prev === nextSticky ? prev : nextSticky));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCaseStudiesMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsMarketsMenuOpen(false);
    setIsMobileCaseStudiesOpen(caseStudiesActive);
    setIsMobileServicesOpen(servicesActive);
    setIsMobileMarketsOpen(marketsActive);
  }, [safePathname, caseStudiesActive, servicesActive, marketsActive]);

  useEffect(() => {
    if (!isCaseStudiesMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!caseStudiesMenuRef.current?.contains(event.target as Node)) {
        setIsCaseStudiesMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCaseStudiesMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isCaseStudiesMenuOpen]);

  useEffect(() => {
    if (!isServicesMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsServicesMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isServicesMenuOpen]);

  useEffect(() => {
    if (!isMarketsMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!marketsMenuRef.current?.contains(event.target as Node)) {
        setIsMarketsMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMarketsMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isMarketsMenuOpen]);

  const transparentMode = safePathname === "/" && !isScrolled;
  const desktopDirectLinkClass = (active: boolean) =>
    [
      "inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full border px-4 py-0.5 text-[14px] font-semibold uppercase tracking-[0.08em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
      active
        ? "border-devlo-800 bg-devlo-800 text-white shadow-soft"
        : "border-transparent text-devlo-900 hover:border-devlo-100 hover:bg-devlo-50 hover:text-devlo-700",
    ].join(" ");
  const mobileDirectLinkClass = (active: boolean) =>
    [
      "flex items-center justify-between rounded-xl border px-4 py-3",
      active
        ? "border-devlo-700 bg-devlo-700 text-white"
        : "border-neutral-200 bg-white text-devlo-900 hover:border-devlo-700/30 hover:bg-devlo-50",
    ].join(" ");
  const desktopDropdownShellClass = (active: boolean, open: boolean) =>
    [
      "group flex items-center gap-0 rounded-full border px-2 py-0.5 transition-colors",
      active || open
        ? "border-devlo-800 bg-devlo-800 text-white shadow-soft"
        : "border-transparent bg-transparent text-devlo-900 hover:border-devlo-700 hover:bg-devlo-700",
    ].join(" ");
  const desktopDropdownLinkClass = (active: boolean, open: boolean) =>
    [
      "inline-flex min-h-[44px] items-center rounded-full px-2 text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
      active || open ? "text-white" : "text-devlo-900 hover:text-white group-hover:text-white",
    ].join(" ");
  const desktopDropdownButtonClass = (open: boolean) =>
    [
      "inline-flex h-6 w-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
      open ? "text-white hover:bg-white/15" : "text-devlo-700 group-hover:text-white hover:bg-white/15",
    ].join(" ");

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-200",
          transparentMode
            ? "border-b border-white/20 bg-transparent"
            : "border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-md",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:h-20 md:px-6 xl:px-8">
          <Link
            href={toCurrentLocalePath("/")}
            className="mr-3 inline-flex min-h-[44px] shrink-0 items-center lg:mr-4"
            aria-label={navCopy.homeAria}
          >
            <Image src={mainNav.logo} alt="devlo logo" width={240} height={80} className="h-14 w-auto shrink-0 md:h-16" />
          </Link>

          <nav className="hidden items-center gap-3 lg:gap-4 xl:gap-5 md:flex" aria-label={navCopy.navigationAria}>
            {navItems.map((item) => {
              if (item.key === "caseStudies") {
                return (
                  <div
                    key={item.key}
                    ref={caseStudiesMenuRef}
                    className="relative"
                    onMouseEnter={() => {
                      if (caseStudiesCloseTimer.current) clearTimeout(caseStudiesCloseTimer.current);
                      setIsCaseStudiesMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      caseStudiesCloseTimer.current = setTimeout(() => setIsCaseStudiesMenuOpen(false), 120);
                    }}
                    onFocusCapture={() => setIsCaseStudiesMenuOpen(true)}
                  >
                    <div className={desktopDropdownShellClass(caseStudiesActive, isCaseStudiesMenuOpen)}>
                      <Link href={item.href} className={desktopDropdownLinkClass(caseStudiesActive, isCaseStudiesMenuOpen)}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={navCopy.openCaseStudiesMenu}
                        aria-expanded={isCaseStudiesMenuOpen}
                        onClick={() => setIsCaseStudiesMenuOpen((prev) => !prev)}
                        className={desktopDropdownButtonClass(isCaseStudiesMenuOpen)}
                      >
                        <ChevronDown
                          className={["h-4 w-4 transition-transform", isCaseStudiesMenuOpen ? "rotate-180" : ""].join(" ")}
                        />
                      </button>
                    </div>

                    {isCaseStudiesMenuOpen ? (
                      <span
                        aria-hidden
                        className="pointer-events-auto absolute left-0 right-0 top-full hidden h-3 md:block"
                      />
                    ) : null}

                    {isCaseStudiesMenuOpen ? (
                      <div className="absolute left-1/2 top-[calc(100%+4px)] z-[70] w-[780px] -translate-x-1/2 overflow-hidden rounded-2xl border border-devlo-700 bg-devlo-700 p-4 text-white shadow-panel motion-safe:animate-fade-in-up">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                            {navCopy.allCaseStudies}
                          </p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {caseStudyMenuItems.map((study) => {
                              const selected = canonicalFrPath === `/etudes-de-cas/${study.slug}`;
                              return (
                                <Link
                                  key={`desktop-case-study-${study.slug}`}
                                  href={study.href}
                                  className={[
                                    "rounded-xl border px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-devlo-700",
                                    selected
                                      ? "border-white/40 bg-white text-devlo-800"
                                      : "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
                                  ].join(" ")}
                                >
                                  <span className="font-semibold">{study.name}</span>
                                  <span
                                    className={[
                                      "mt-0.5 block text-xs",
                                      selected ? "text-devlo-700/80" : "text-white/75",
                                    ].join(" ")}
                                  >
                                    {study.subtitle}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-3 border-t border-white/20 pt-3">
                            <Link
                              href={caseStudiesHref}
                              className="inline-flex rounded-full border border-white/30 bg-white px-3 py-1.5 text-xs font-semibold text-devlo-700 transition hover:bg-devlo-50"
                            >
                              {navCopy.seeAllCaseStudies}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }

              if (item.key === "services") {
                return (
                  <div
                    key={item.key}
                    ref={servicesMenuRef}
                    className="relative"
                    onMouseEnter={() => {
                      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
                      setIsServicesMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      servicesCloseTimer.current = setTimeout(() => setIsServicesMenuOpen(false), 120);
                    }}
                    onFocusCapture={() => setIsServicesMenuOpen(true)}
                  >
                    <div className={desktopDropdownShellClass(servicesActive, isServicesMenuOpen)}>
                      <Link href={item.href} className={desktopDropdownLinkClass(servicesActive, isServicesMenuOpen)}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={navCopy.openServicesMenu}
                        aria-expanded={isServicesMenuOpen}
                        onClick={() => setIsServicesMenuOpen((prev) => !prev)}
                        className={desktopDropdownButtonClass(isServicesMenuOpen)}
                      >
                        <ChevronDown className={["h-4 w-4 transition-transform", isServicesMenuOpen ? "rotate-180" : ""].join(" ")} />
                      </button>
                    </div>

                    {isServicesMenuOpen ? (
                      <span
                        aria-hidden
                        className="pointer-events-auto absolute left-0 right-0 top-full hidden h-3 md:block"
                      />
                    ) : null}

                    {isServicesMenuOpen ? (
                      <div className="absolute left-1/2 top-[calc(100%+4px)] z-[70] w-[760px] -translate-x-1/2 overflow-hidden rounded-2xl border border-devlo-700 bg-devlo-700 p-4 text-white shadow-panel motion-safe:animate-fade-in-up">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                            {navCopy.allServices}
                          </p>
                          <div className="mt-3 rounded-2xl border border-white/20 bg-white/10 p-3">
                            <Link
                              href={aiSalesOpsHref}
                              className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-white/35 hover:bg-white/10"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="whitespace-nowrap text-sm font-semibold text-white">{navCopy.aiSalesOps}</p>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-white/75">{navCopy.aiSalesOpsSubtitle}</p>
                              </div>
                              <span className="text-sm font-semibold text-white">→</span>
                            </Link>
                          </div>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {localizedServicesCards.map((service) => (
                              <Link
                                key={`desktop-menu-${service.href}`}
                                href={service.href}
                                className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 transition hover:border-white/40 hover:bg-white/15"
                              >
                                <p className="text-sm font-semibold text-white">{service.title}</p>
                                <p className="mt-1 text-xs leading-5 text-white/75">{service.subtitle}</p>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 border-t border-white/20 pt-2">
                            <Link
                              href={toCurrentLocalePath("/academy")}
                              className="flex flex-col rounded-xl border border-white/20 bg-white/10 px-3 py-2 transition hover:border-white/40 hover:bg-white/15"
                            >
                              <p className="text-sm font-semibold text-white">{navCopy.academy}</p>
                              <p className="mt-0.5 text-xs text-white/75">{navCopy.academySubtitle}</p>
                            </Link>
                          </div>
                          <div className="mt-3 border-t border-white/20 pt-3">
                            <Link
                              href={toCurrentLocalePath("/services")}
                              className="inline-flex rounded-full border border-white/30 bg-white px-3 py-1.5 text-xs font-semibold text-devlo-700 transition hover:bg-devlo-50"
                            >
                              {navCopy.seeAllServices}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }

              if (item.key === "aiSalesOps") {
                return (
                  <Link key={item.href} href={item.href} className={desktopDirectLinkClass(aiSalesOpsActive)}>
                    <span>{item.label}</span>
                  </Link>
                );
              }

              if (item.key === "agency") {
                const agencyOrMarketsActive = agencyActive || marketsActive;
                return (
                  <div
                    key={item.key}
                    ref={marketsMenuRef}
                    className="relative"
                    onMouseEnter={() => {
                      if (marketsCloseTimer.current) clearTimeout(marketsCloseTimer.current);
                      setIsMarketsMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      marketsCloseTimer.current = setTimeout(() => setIsMarketsMenuOpen(false), 120);
                    }}
                    onFocusCapture={() => setIsMarketsMenuOpen(true)}
                  >
                    <div className={desktopDropdownShellClass(agencyOrMarketsActive, isMarketsMenuOpen)}>
                      <Link href={item.href} className={desktopDropdownLinkClass(agencyOrMarketsActive, isMarketsMenuOpen)}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={navCopy.openMarketsMenu}
                        aria-expanded={isMarketsMenuOpen}
                        onClick={() => setIsMarketsMenuOpen((prev) => !prev)}
                        className={desktopDropdownButtonClass(isMarketsMenuOpen)}
                      >
                        <ChevronDown className={["h-4 w-4 transition-transform", isMarketsMenuOpen ? "rotate-180" : ""].join(" ")} />
                      </button>
                    </div>

                    {isMarketsMenuOpen ? (
                      <span
                        aria-hidden
                        className="pointer-events-auto absolute left-0 right-0 top-full hidden h-3 md:block"
                      />
                    ) : null}

                    {isMarketsMenuOpen ? (
                      <div className="absolute left-0 top-[calc(100%+4px)] z-[70] w-56 overflow-hidden rounded-2xl border border-devlo-700 bg-devlo-700 p-3 text-white shadow-panel motion-safe:animate-fade-in-up">
                        <div className="flex flex-col gap-1">
                          <Link
                            href={item.href}
                            className={[
                              "rounded-lg px-3 py-2 text-sm font-semibold transition",
                              agencyActive ? "bg-white/20" : "hover:bg-white/10",
                            ].join(" ")}
                          >
                            {navCopy.agency}
                          </Link>
                          <div className="my-1 border-t border-white/20" />
                          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">
                            {navCopy.markets}
                          </p>
                          {geoLinks.map((geo) => (
                            <Link
                              key={geo.href as string}
                              href={geo.href}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-white/10"
                            >
                              <span>{geo.flag}</span>
                              <span>{geo.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }

              if (item.key === "insights") {
                const insightsActive = canonicalFrPath.startsWith("/insights");
                return (
                  <Link key={item.href} href={item.href} className={desktopDirectLinkClass(insightsActive)}>
                    {item.label}
                  </Link>
                );
              }

              return null;
            })}

            <div className="flex items-center gap-3">
              <Link href={consultationHref} className={buttonClassName("outline", "whitespace-nowrap px-4 py-2.5 text-sm lg:px-5")}>
                {navCopy.cta}
              </Link>
              <LanguageSwitcher />
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? navCopy.closeMenu : navCopy.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 bg-white text-devlo-900 md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <aside className="fixed inset-0 z-[60] overflow-y-auto bg-white p-6 motion-safe:animate-fade-in-right">
            <div className="flex items-center justify-between">
              <Image src={mainNav.logo} alt="devlo logo" width={120} height={40} className="h-7 w-auto" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200"
                aria-label={navCopy.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 space-y-2">
              <LanguageSwitcher mobile />
              {navItems.map((item) => {
                if (item.key === "caseStudies") {
                  return (
                    <div key={`mobile-${item.key}`} className="rounded-xl border border-neutral-200 p-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          className={[
                            "flex min-h-[44px] flex-1 items-center rounded-lg px-3 py-2 text-xl font-semibold",
                            caseStudiesActive ? "bg-devlo-700 text-white" : "text-devlo-900",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileCaseStudiesOpen((prev) => !prev)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-devlo-700"
                          aria-label={navCopy.showCaseStudies}
                        >
                          <ChevronDown
                            className={["h-4 w-4 transition-transform", isMobileCaseStudiesOpen ? "rotate-180" : ""].join(" ")}
                          />
                        </button>
                      </div>

                      {isMobileCaseStudiesOpen ? (
                        <div className="mt-2 overflow-hidden motion-safe:animate-fade-in-up">
                          <div className="grid gap-1.5">
                            {caseStudyMenuItems.map((study) => {
                              const selected = canonicalFrPath === `/etudes-de-cas/${study.slug}`;
                              return (
                                <Link
                                  key={`mobile-case-study-${study.slug}`}
                                  href={study.href}
                                  className={[
                                    "rounded-lg border px-3 py-2 transition",
                                    selected
                                      ? "border-devlo-700 bg-devlo-700 text-white"
                                      : "border-neutral-200 bg-neutral-50 text-devlo-900 hover:border-devlo-700/30",
                                  ].join(" ")}
                                >
                                  <p className="text-sm font-semibold">{study.name}</p>
                                  <p className={["text-xs", selected ? "text-white/75" : "text-neutral-500"].join(" ")}>
                                    {study.subtitle}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="mt-2 border-t border-neutral-200 pt-2">
                            <Link
                              href={caseStudiesHref}
                              className="inline-flex min-h-[40px] items-center rounded-lg border border-neutral-200 bg-white px-3 text-sm font-semibold text-devlo-700"
                            >
                              {navCopy.seeAllCaseStudies}
                            </Link>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (item.key === "services") {
                  return (
                    <div key={`mobile-${item.key}`} className="rounded-xl border border-neutral-200 p-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          className={[
                            "flex min-h-[44px] flex-1 items-center rounded-lg px-3 py-2 text-xl font-semibold",
                            servicesActive ? "bg-devlo-700 text-white" : "text-devlo-900",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-devlo-700"
                          aria-label={navCopy.showServices}
                        >
                          <ChevronDown className={["h-4 w-4 transition-transform", isMobileServicesOpen ? "rotate-180" : ""].join(" ")} />
                        </button>
                      </div>

                      {isMobileServicesOpen ? (
                        <div className="mt-2 overflow-hidden motion-safe:animate-fade-in-up">
                          <Link
                            href={aiSalesOpsHref}
                            className="mb-2 block rounded-xl border border-devlo-200 bg-devlo-50 px-3 py-3 transition hover:border-devlo-400"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="whitespace-nowrap text-sm font-semibold text-devlo-900">{navCopy.aiSalesOps}</p>
                                </div>
                                <p className="mt-1 text-xs text-neutral-600">{navCopy.aiSalesOpsSubtitle}</p>
                              </div>
                              <span className="text-sm font-semibold text-devlo-700">→</span>
                            </div>
                          </Link>
                          <div className="grid gap-1.5">
                            {localizedServicesCards.map((service) => (
                              <Link
                                key={`mobile-service-${service.href}`}
                                href={service.href}
                                className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 transition hover:border-devlo-700/30"
                              >
                                <p className="text-sm font-semibold text-devlo-900">{service.title}</p>
                                <p className="text-xs text-neutral-500">{service.subtitle}</p>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-1.5">
                            <Link
                              href={toCurrentLocalePath("/academy")}
                              className="block rounded-lg border border-devlo-100 bg-devlo-50 px-3 py-2 transition hover:border-devlo-700/30"
                            >
                              <p className="text-sm font-semibold text-devlo-900">{navCopy.academy}</p>
                              <p className="text-xs text-neutral-500">{navCopy.academySubtitle}</p>
                            </Link>
                          </div>
                          <div className="mt-2 border-t border-neutral-200 pt-2">
                            <Link
                              href={toCurrentLocalePath("/services")}
                              className="inline-flex min-h-[40px] items-center rounded-lg border border-neutral-200 bg-white px-3 text-sm font-semibold text-devlo-700"
                            >
                              {navCopy.seeAllServices}
                            </Link>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (item.key === "aiSalesOps") {
                  return (
                    <Link key={`mobile-${item.href}`} href={item.href} className={mobileDirectLinkClass(aiSalesOpsActive)}>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="whitespace-nowrap text-base font-semibold">{item.label}</p>
                        </div>
                        <p className={["mt-1 text-xs", aiSalesOpsActive ? "text-white/75" : "text-neutral-600"].join(" ")}>
                          {navCopy.aiSalesOpsSubtitle}
                        </p>
                      </div>
                      <span className={["text-sm font-semibold", aiSalesOpsActive ? "text-white" : "text-devlo-700"].join(" ")}>
                        →
                      </span>
                    </Link>
                  );
                }

                if (item.key === "agency") {
                  const agencyOrMarketsActive = agencyActive || marketsActive;
                  return (
                    <div key={`mobile-${item.key}`} className="rounded-xl border border-neutral-200 p-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          className={[
                            "flex min-h-[44px] flex-1 items-center rounded-lg px-3 py-2 text-xl font-semibold",
                            agencyOrMarketsActive ? "bg-devlo-700 text-white" : "text-devlo-900",
                          ].join(" ")}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileMarketsOpen((prev) => !prev)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-devlo-700"
                          aria-label={navCopy.showMarkets}
                        >
                          <ChevronDown className={["h-4 w-4 transition-transform", isMobileMarketsOpen ? "rotate-180" : ""].join(" ")} />
                        </button>
                      </div>

                      {isMobileMarketsOpen ? (
                        <div className="mt-2 overflow-hidden motion-safe:animate-fade-in-up">
                          <div className="grid gap-1.5">
                            <p className="px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">{navCopy.markets}</p>
                            {geoLinks.map((geo) => (
                              <Link
                                key={`mobile-geo-${geo.href}`}
                                href={geo.href}
                                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 transition hover:border-devlo-700/30"
                              >
                                <span>{geo.flag}</span>
                                <span className="text-sm font-semibold text-devlo-900">{geo.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                }

                if (item.key === "insights") {
                  const insightsActive = canonicalFrPath.startsWith("/insights");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex min-h-[44px] items-center rounded-xl border px-4 py-3 text-xl font-semibold",
                        insightsActive
                          ? "border-devlo-700 bg-devlo-700 text-white"
                          : "border-neutral-200 bg-white text-devlo-900",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return null;
              })}
            </div>

            <Link href={consultationHref} className={buttonClassName("primary", "mt-8 w-full py-4 text-base")}>
              {navCopy.cta}
            </Link>
          </aside>
      ) : null}

      {showMobileStickyCta ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden motion-safe:animate-fade-in-up">
            <Link href={consultationHref} className={buttonClassName("primary", "w-full py-4 text-base")}>
              {navCopy.cta}
            </Link>
          </div>
      ) : null}
    </>
  );
}
