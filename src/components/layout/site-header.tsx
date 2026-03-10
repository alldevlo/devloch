"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonClassName } from "@/components/ui/button";
import { mainNav } from "@/content/masterfile.fr";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";
import { resolvePathForLocale, splitLocalePath, type SupportedLocale } from "@/lib/i18n/slug-map";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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
    allServices: "Tous les services",
    seeAllServices: "Voir tous les services →",
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
    academySubtitle: "{navCopy.academySubtitle}",
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
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const safePathname = pathname ?? "/";
  const { locale: currentLocale, path: localePath } = splitLocalePath(safePathname);
  const navCopy = navCopyByLocale[currentLocale];

  const toCurrentLocalePath = (frPath: string) => resolvePathForLocale(frPath, currentLocale).path;
  const navItems = [
    { key: "agency", href: toCurrentLocalePath("/agence") as string, label: navCopy.agency },
    { key: "caseStudies", href: toCurrentLocalePath("/etudes-de-cas") as string, label: navCopy.caseStudies },
    { key: "services", href: toCurrentLocalePath("/services") as string, label: navCopy.services },
    { key: "markets", href: toCurrentLocalePath("/prospection-commerciale-suisse") as string, label: navCopy.markets },
  ] as const;

  const geoLinks = [
    { href: "/prospection-commerciale-suisse", label: navCopy.marketsCH, flag: "🇨🇭" },
    { href: "/prospection-commerciale-belgique", label: navCopy.marketsBE, flag: "🇧🇪" },
    { href: "/prospection-commerciale-france", label: navCopy.marketsFR, flag: "🇫🇷" },
  ];
  const consultationHref = toCurrentLocalePath("/consultation");
  const localizedServicesCards = getLocalizedServicesContent(currentLocale).SERVICE_HUB_CARDS.map((service) => ({
    ...service,
    href: toCurrentLocalePath(service.href),
  }));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileStickyCta, setShowMobileStickyCta] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isMarketsMenuOpen, setIsMarketsMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileMarketsOpen, setIsMobileMarketsOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const marketsMenuRef = useRef<HTMLDivElement | null>(null);
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
    setIsServicesMenuOpen(false);
    setIsMarketsMenuOpen(false);
    setIsMobileServicesOpen(localePath.startsWith("/services"));
    setIsMobileMarketsOpen(localePath.startsWith("/prospection-commerciale-"));
  }, [safePathname, localePath]);

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
  const servicesActive = localePath === "/services" || localePath.startsWith("/services/");

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
        <div className="mx-auto flex h-16 w-full max-w-[1260px] items-center justify-between px-6 md:h-20 md:px-10">
          <Link href={toCurrentLocalePath("/")} className="mr-4 inline-flex min-h-[44px] items-center" aria-label={navCopy.homeAria}>
            <Image src={mainNav.logo} alt="devlo logo" width={240} height={80} className="h-14 w-auto md:h-16" />
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label={navCopy.navigationAria}>
            {navItems.map((item) => {
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
                    <div
                      className={[
                        "group flex items-center gap-0 rounded-full border px-2 py-0.5 transition-colors",
                        isServicesMenuOpen
                          ? "border-devlo-700 bg-devlo-700 text-white"
                          : "border-transparent bg-transparent text-devlo-900 hover:border-devlo-700 hover:bg-devlo-700",
                      ].join(" ")}
                    >
                      <Link
                        href={item.href}
                        className={[
                          "inline-flex min-h-[44px] items-center rounded-full px-2 text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                          servicesActive
                            ? (isServicesMenuOpen ? "text-white" : "text-devlo-700")
                            : isServicesMenuOpen
                              ? "text-white"
                              : "text-devlo-900 hover:text-white group-hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={navCopy.openServicesMenu}
                        aria-expanded={isServicesMenuOpen}
                        onClick={() => setIsServicesMenuOpen((prev) => !prev)}
                        className={[
                          "inline-flex h-6 w-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                          isServicesMenuOpen
                            ? "text-white hover:bg-white/15"
                            : "text-devlo-700 group-hover:text-white hover:bg-white/15",
                        ].join(" ")}
                      >
                        <ChevronDown className={["h-4 w-4 transition-transform", isServicesMenuOpen ? "rotate-180" : ""].join(" ")} />
                      </button>
                    </div>

                    {isServicesMenuOpen ? (
                      <div className="absolute left-1/2 top-[calc(100%+4px)] z-[70] w-[760px] -translate-x-1/2 overflow-hidden rounded-2xl border border-devlo-700 bg-devlo-700 p-4 text-white shadow-panel motion-safe:animate-fade-in-up">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80">
                            {navCopy.allServices}
                          </p>
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
                              className="flex rounded-xl border border-white/20 bg-white/10 px-3 py-2 transition hover:border-white/40 hover:bg-white/15"
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

              if (item.key === "markets") {
                const marketsActive = localePath.startsWith("/prospection-commerciale-");
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
                    <div
                      className={[
                        "group flex items-center gap-0 rounded-full border px-2 py-0.5 transition-colors",
                        isMarketsMenuOpen
                          ? "border-devlo-700 bg-devlo-700 text-white"
                          : "border-transparent bg-transparent text-devlo-900 hover:border-devlo-700 hover:bg-devlo-700",
                      ].join(" ")}
                    >
                      <Link
                        href={item.href}
                        className={[
                          "inline-flex min-h-[44px] items-center rounded-full px-2 text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                          marketsActive
                            ? (isMarketsMenuOpen ? "text-white" : "text-devlo-700")
                            : isMarketsMenuOpen
                              ? "text-white"
                              : "text-devlo-900 hover:text-white group-hover:text-white",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={navCopy.openMarketsMenu}
                        aria-expanded={isMarketsMenuOpen}
                        onClick={() => setIsMarketsMenuOpen((prev) => !prev)}
                        className={[
                          "inline-flex h-6 w-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                          isMarketsMenuOpen
                            ? "text-white hover:bg-white/15"
                            : "text-devlo-700 group-hover:text-white hover:bg-white/15",
                        ].join(" ")}
                      >
                        <ChevronDown className={["h-4 w-4 transition-transform", isMarketsMenuOpen ? "rotate-180" : ""].join(" ")} />
                      </button>
                    </div>

                    {isMarketsMenuOpen ? (
                      <div className="absolute left-0 top-[calc(100%+4px)] z-[70] w-56 overflow-hidden rounded-2xl border border-devlo-700 bg-devlo-700 p-3 text-white shadow-panel motion-safe:animate-fade-in-up">
                        <div className="flex flex-col gap-1">
                          {geoLinks.map((geo) => (
                            <Link
                              key={geo.href}
                              href={geo.href}
                              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-semibold transition hover:border-white/40 hover:bg-white/15"
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

              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "inline-flex min-h-[44px] items-center whitespace-nowrap border-b-2 text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors",
                    active ? "border-devlo-600 text-devlo-700" : "border-transparent text-devlo-900 hover:text-devlo-600",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link href={consultationHref} className={buttonClassName("outline", "whitespace-nowrap px-5 py-2.5 text-sm")}>
                {navCopy.cta}
              </Link>
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
                if (item.key === "services") {
                  return (
                    <div key={`mobile-${item.key}`} className="rounded-xl border border-neutral-200 p-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          className={[
                            "flex min-h-[44px] flex-1 items-center rounded-lg px-3 py-2 text-xl font-semibold",
                            servicesActive ? "bg-devlo-50 text-devlo-700" : "text-devlo-900",
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

                if (item.key === "markets") {
                  const marketsActive = localePath.startsWith("/prospection-commerciale-");
                  return (
                    <div key={`mobile-${item.key}`} className="rounded-xl border border-neutral-200 p-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          className={[
                            "flex min-h-[44px] flex-1 items-center rounded-lg px-3 py-2 text-xl font-semibold",
                            marketsActive ? "bg-devlo-50 text-devlo-700" : "text-devlo-900",
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

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "flex min-h-[44px] items-center rounded-lg px-4 py-3 text-xl font-semibold",
                      isActive(pathname, item.href) ? "bg-devlo-50 text-devlo-700" : "text-devlo-900",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
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
