import type { SupportedLocale } from "@/lib/i18n/slug-map";

export const HUBSPOT_PORTAL_ID = "8082524";
export const HUBSPOT_FORM_ID = "54090bd3-970d-4ad1-b3b3-1c81d54c291e";
export const HUBSPOT_FORMS_SCRIPT_SRC = "https://js.hsforms.net/forms/v2.js";

type SummaryPayload = {
  serviceInterest: string;
  configuratorData?: string;
  pageUrl?: string;
  locale?: SupportedLocale;
};

const copyByLocale: Record<
  SupportedLocale,
  {
    undefinedValue: string;
    configurationLabel: string;
    serviceInterestLabel: string;
    pageLabel: string;
    dateLocale: string;
  }
> = {
  fr: {
    undefinedValue: "Non défini",
    configurationLabel: "Configuration",
    serviceInterestLabel: "Service d'intérêt",
    pageLabel: "Page",
    dateLocale: "fr-CH",
  },
  en: {
    undefinedValue: "Not defined",
    configurationLabel: "Configuration",
    serviceInterestLabel: "Service interest",
    pageLabel: "Page",
    dateLocale: "en-US",
  },
  de: {
    undefinedValue: "Nicht definiert",
    configurationLabel: "Konfiguration",
    serviceInterestLabel: "Dienstinteresse",
    pageLabel: "Seite",
    dateLocale: "de-DE",
  },
  nl: {
    undefinedValue: "Niet gedefinieerd",
    configurationLabel: "Configuratie",
    serviceInterestLabel: "Interesse in dienst",
    pageLabel: "Pagina",
    dateLocale: "nl-NL",
  },
};

export function buildStrategySelections({
  serviceInterest,
  configuratorData,
  pageUrl,
  locale = "fr",
}: SummaryPayload): string {
  const copy = copyByLocale[locale];
  const service = serviceInterest.trim() || copy.undefinedValue;
  const configuration = configuratorData?.trim() || `${copy.configurationLabel}: ${copy.undefinedValue}`;

  const cleanedConfiguration = configuration.startsWith("===")
    ? configuration.split("\n").slice(1).join("\n").trim()
    : configuration;

  return [
    `=== SERVICE: ${service.toUpperCase()} ===`,
    cleanedConfiguration || `${copy.configurationLabel}: ${copy.undefinedValue}`,
    `${copy.serviceInterestLabel}: ${service}`,
    `${copy.pageLabel}: ${pageUrl?.trim() || copy.undefinedValue}`,
    `Date: ${new Date().toLocaleDateString(copy.dateLocale)}`,
  ].join("\n");
}
