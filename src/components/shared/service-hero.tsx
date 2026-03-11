import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ServiceSwitcher } from "@/components/shared/service-switcher";
import type { ServiceSlug } from "@/content/services";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

type BreadcrumbItem = { name: string; path: string };

type ServiceHeroProps = {
  currentSlug: ServiceSlug;
  locale?: SupportedLocale;
  title: string;
  subtitle: string;
  paragraphs: string[];
  quickFacts: string[];
  breadcrumbItems?: BreadcrumbItem[];
};

const sectionAnchorsByLocale: Record<SupportedLocale, { id: string; label: string }[]> = {
  fr: [
    { id: "ce-que-couvre", label: "Ce que couvre" },
    { id: "processus", label: "Processus" },
    { id: "resultats", label: "Résultats" },
    { id: "faq", label: "FAQ" },
  ],
  en: [
    { id: "ce-que-couvre", label: "Coverage" },
    { id: "processus", label: "Process" },
    { id: "resultats", label: "Results" },
    { id: "faq", label: "FAQ" },
  ],
  de: [
    { id: "ce-que-couvre", label: "Leistungsumfang" },
    { id: "processus", label: "Prozess" },
    { id: "resultats", label: "Ergebnisse" },
    { id: "faq", label: "FAQ" },
  ],
  nl: [
    { id: "ce-que-couvre", label: "Wat het omvat" },
    { id: "processus", label: "Proces" },
    { id: "resultats", label: "Resultaten" },
    { id: "faq", label: "FAQ" },
  ],
};

const badgeByLocale: Record<SupportedLocale, string> = {
  fr: "DEVLO.CH — AGENCE B2B SUISSE",
  en: "DEVLO.CH — SWISS B2B AGENCY",
  de: "DEVLO.CH — SCHWEIZER B2B AGENTUR",
  nl: "DEVLO.CH — ZWITSERS B2B-BUREAU",
};

const sectionNavAriaByLocale: Record<SupportedLocale, string> = {
  fr: "Navigation de section",
  en: "Section navigation",
  de: "Abschnittsnavigation",
  nl: "Sectienavigatie",
};

export function ServiceHero({ currentSlug, locale = "fr", title, subtitle, paragraphs, quickFacts, breadcrumbItems }: ServiceHeroProps) {
  const sectionAnchors = sectionAnchorsByLocale[locale];
  return (
    <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 pb-10 text-white md:pb-12">
      {breadcrumbItems && <Breadcrumb items={breadcrumbItems} variant="dark" />}

      <div className="mx-auto w-full max-w-[1400px] px-6 pt-6 md:px-8 md:pt-8">
        <div className="max-w-md">
          <ServiceSwitcher currentSlug={currentSlug} locale={locale} />
        </div>

        <p className="mt-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.09em] text-white/80">
          {badgeByLocale[locale]}
        </p>

        <h1 className="mt-3 max-w-5xl text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-[44px]">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-white/85 md:text-lg md:leading-8">{subtitle}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
            >
              {fact}
            </span>
          ))}
        </div>

        <div className="mt-4 max-w-4xl space-y-3 text-sm leading-7 text-white/75 md:text-base md:leading-8">
          {paragraphs.map((paragraph, index) => (
            <p key={`${title}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        <nav aria-label={sectionNavAriaByLocale[locale]} className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {sectionAnchors.map((anchor) => (
              <li key={anchor.id}>
                <a
                  href={`#${anchor.id}`}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-white/80 transition hover:border-white/40 hover:bg-white/20"
                >
                  {anchor.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
