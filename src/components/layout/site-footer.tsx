"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";

import { getCaseStudyFooterLabel } from "@/data/case-studies-footer-labels";
import { footerCaseStudies } from "@/data/footer-case-studies";
import { getLocalizedMasterfileContent } from "@/lib/i18n/masterfile-content";
import { resolvePathForLocale, splitLocalePath, type SupportedLocale } from "@/lib/i18n/slug-map";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";

function resolveLocaleFromPathname(pathname: string | null): SupportedLocale {
  return splitLocalePath(pathname ?? "/").locale;
}

const footerLabelsByLocale: Record<
  SupportedLocale,
  {
    navigation: string;
    navHome: string;
    navCaseStudies: string;
    navAcademy: string;
    navConsultation: string;
    services: string;
    caseStudies: string;
    officeSwiss: string;
    officeUs: string;
    servicesHome: string;
  }
> = {
  fr: {
    navigation: "Navigation",
    navHome: "Accueil",
    navCaseStudies: "Études de cas",
    navAcademy: "Outbound Academy",
    navConsultation: "Consultation gratuite",
    services: "Services",
    caseStudies: "Études de cas",
    officeSwiss: "Bureau Suisse:",
    officeUs: "Bureau US:",
    servicesHome: "Services",
  },
  en: {
    navigation: "Navigation",
    navHome: "Home",
    navCaseStudies: "Case studies",
    navAcademy: "Outbound Academy",
    navConsultation: "Free consultation",
    services: "Services",
    caseStudies: "Case studies",
    officeSwiss: "Swiss Office:",
    officeUs: "US Office:",
    servicesHome: "Services",
  },
  de: {
    navigation: "Navigation",
    navHome: "Startseite",
    navCaseStudies: "Fallstudien",
    navAcademy: "Outbound Academy",
    navConsultation: "Kostenlose Beratung",
    services: "Leistungen",
    caseStudies: "Fallstudien",
    officeSwiss: "Schweizer Büro:",
    officeUs: "US-Büro:",
    servicesHome: "Leistungen",
  },
  nl: {
    navigation: "Navigatie",
    navHome: "Home",
    navCaseStudies: "Praktijkvoorbeelden",
    navAcademy: "Outbound Academy",
    navConsultation: "Gratis consultatie",
    services: "Diensten",
    caseStudies: "Praktijkvoorbeelden",
    officeSwiss: "Zwitsers kantoor:",
    officeUs: "VS-kantoor:",
    servicesHome: "Diensten",
  },
};

function FooterList({
  title,
  links,
  columns = 1,
  compactLinks = false,
  scrollable = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  columns?: 1 | 2;
  compactLinks?: boolean;
  scrollable?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-devlo-900">{title}</p>
      <ul
        className={[
          "mt-4",
          columns === 2 ? "grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 sm:gap-x-6" : "space-y-2.5",
          scrollable ? "max-h-[300px] overflow-y-auto pr-2" : "",
        ].join(" ")}
      >
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link
              href={link.href}
            className={[
                compactLinks
                  ? "block whitespace-nowrap overflow-hidden text-ellipsis text-[13px] text-neutral-600 transition hover:text-devlo-900 lg:overflow-visible lg:text-clip xl:text-sm"
                  : "text-sm text-neutral-600 transition hover:text-devlo-900",
              ].join(" ")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const footerContent = getLocalizedMasterfileContent(locale).footerContent as {
    mission: string;
    swissOffice: string[];
    usOffice: string[];
    linkedin: string;
    badges: { src: string; alt: string; width: number; height: number }[];
    navigation: { label: string; href: string }[];
    bottomLink: { label: string; href: string };
    copyright: string;
  };
  const localizedServices = getLocalizedServicesContent(locale).SERVICE_HUB_CARDS;
  const labels = footerLabelsByLocale[locale];
  const toLocaleHref = (frPath: string) => resolvePathForLocale(frPath, locale).path;

  const navigationLinks = [
    { label: labels.navHome, href: toLocaleHref("/") },
    { label: labels.navCaseStudies, href: toLocaleHref("/etudes-de-cas") },
    { label: labels.navAcademy, href: toLocaleHref("/academy") },
    { label: labels.navConsultation, href: toLocaleHref("/consultation") },
    { label: labels.servicesHome, href: toLocaleHref("/services") },
  ];

  const serviceLinks = [
    { label: labels.servicesHome, href: toLocaleHref("/services") },
    ...localizedServices.map((service) => ({ label: service.title, href: toLocaleHref(service.href) })),
  ];

  const caseStudyLinks = footerCaseStudies.map((study) => ({
    label: getCaseStudyFooterLabel(study.slug, locale),
    href: toLocaleHref(study.href),
  }));

  return (
    <footer className="relative border-t border-neutral-200 bg-white pb-20 pt-16 text-devlo-900 md:pt-20">
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 md:mb-10 md:flex-nowrap md:gap-4 lg:mb-12">
          {footerContent.badges.map((badge) => (
            <div
              key={badge.src}
              className="relative flex h-[74px] w-[170px] shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white p-2"
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className="h-full w-full object-contain"
                loading="lazy"
                unoptimized={badge.src.endsWith(".svg")}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-6 md:grid-cols-2 md:px-8 lg:grid-cols-[1.2fr_0.52fr_0.72fr_1.56fr]">
        <div>
          <Image
            src="/images/devlo-logo.webp"
            alt="devlo logo"
            width={200}
            height={66}
            className="h-[56px] w-[170px] object-contain"
            loading="lazy"
          />

          <p className="mt-4 max-w-[620px] text-sm leading-6 text-neutral-600">{footerContent.mission}</p>

          <div className="mt-6 grid gap-5 text-sm text-neutral-600 md:grid-cols-2 md:gap-8">
            <div>
              <p className="font-semibold text-devlo-900">{labels.officeSwiss}</p>
              {footerContent.swissOffice.map((line) => (
                <p key={`swiss-${line}`}>{line}</p>
              ))}
            </div>
            <div>
              <p className="font-semibold text-devlo-900">{labels.officeUs}</p>
              {footerContent.usOffice.map((line) => (
                <p key={`us-${line}`}>{line}</p>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href={footerContent.linkedin}
              target="_blank"
              aria-label="LinkedIn devlo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-devlo-700 transition hover:bg-white hover:text-devlo-900"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:ml-4 lg:border-l lg:border-neutral-200 lg:pl-14">
          <FooterList title={labels.navigation} links={navigationLinks} />
        </div>

        <div className="lg:border-l lg:border-neutral-200 lg:pl-10">
          <FooterList title={labels.services} links={serviceLinks} compactLinks />
        </div>

        <div className="lg:border-l lg:border-neutral-200 lg:pl-10">
          <FooterList title={labels.caseStudies} links={caseStudyLinks} compactLinks columns={2} scrollable />
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1320px] flex-col gap-3 border-t border-neutral-200 px-6 pt-8 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between md:px-8">
        <Link href={footerContent.bottomLink.href} className="transition hover:text-devlo-900">
          {footerContent.bottomLink.label}
        </Link>
        <p>{footerContent.copyright}</p>
      </div>

      <div className="fixed bottom-6 left-5 z-40">
        <button
          type="button"
          aria-label="Chat"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-devlo-700 bg-devlo-800 text-white shadow-[0_8px_18px_rgba(27,58,75,0.35)]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 18l-1 3 3-1h10a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v8a4 4 0 0 0 2 3Z" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
