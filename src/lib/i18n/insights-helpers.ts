import insightsContent from "@/lib/i18n/insights-content.json";
import coldEmailHubContent from "@/lib/i18n/cold-email-hub-content.json";
import coldEmailSequencesContent from "@/lib/i18n/cold-email-sequences-content.json";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

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

// FR categories are the source of truth for structure (ids, counts, intensities, detection tools)
const FR_CONTENT = insightsContent.buyingSignals.fr;

/**
 * Build a CATEGORIES array for the given locale by overlaying translated
 * signal names and descriptions onto the FR category structure.
 */
export function getLocalizedCategories(locale: SupportedLocale): SignalCategory[] {
  if (locale === "fr") {
    // Build from FR content directly
    return buildCategoriesFromContent(FR_CONTENT);
  }

  const localeContent = insightsContent.buyingSignals[locale];
  const frCategories = buildCategoriesFromContent(FR_CONTENT);

  // Overlay translated names, descriptions, and category titles
  let signalIndex = 0;
  return frCategories.map((cat, catIdx) => ({
    ...cat,
    title: localeContent.categoryTitles[catIdx] ?? cat.title,
    signals: cat.signals.map((signal) => {
      const translated = {
        ...signal,
        name: localeContent.signalNames[signalIndex] ?? signal.name,
        description: localeContent.signalDescriptions[signalIndex] ?? signal.description,
      };
      signalIndex++;
      return translated;
    }),
  }));
}

/**
 * Build categories from the FR content (used as base structure).
 * This mirrors the hardcoded CATEGORIES in the FR page.
 */
function buildCategoriesFromContent(content: typeof FR_CONTENT): SignalCategory[] {
  // Signal distribution per category (matches the FR page exactly)
  const categoryDefs: Array<{ id: string; count: number }> = [
    { id: "entreprise", count: 28 },
    { id: "personne", count: 10 },
    { id: "tech-stack", count: 10 },
    { id: "usage-produit", count: 14 },
    { id: "communaute", count: 14 },
    { id: "evenements", count: 5 },
    { id: "lemlist-intent", count: 15 },
  ];

  // Detection tools per signal (same order as signalNames)
  const detectionTools = [
    // Entreprise (28)
    "lemlist, Sales Navigator, ZoomInfo, Lonescale",
    "lemlist, Crunchbase, ZoomInfo",
    "Dealfront",
    "interne (outil emailing)",
    "Google Alerts",
    "interne",
    "Owler",
    "LinkedIn",
    "G2",
    "Default, Chilipiper",
    "Intercom, Zendesk",
    "Clay",
    "HubSpot, Salesforce",
    "Claap",
    "Luma",
    "PitchBook, Crunchbase",
    "Owler",
    "interne",
    "Sales Navigator",
    "interne",
    "interne",
    "LinkedIn",
    "Clay",
    "manuel",
    "Claap",
    "Claap",
    "manuel",
    "Bombora",
    // Personne (10)
    "lemlist, Lonescale, Cognism, Clay",
    "Sales Navigator, lemlist, Clay",
    "lemlist, Clay, Sales Navigator",
    "lemlist, Lonescale, Clay",
    "Clay, Sales Navigator, lemlist",
    "Clay, Sales Navigator, lemlist",
    "Google Alerts",
    "Clay",
    "manuel",
    "Clay, Jungler",
    // Tech Stack (10)
    "BuiltWith",
    "G2",
    "interne",
    "BuiltWith",
    "BuiltWith, SimilarWeb",
    "BuiltWith, SimilarWeb",
    "manuel",
    "manuel",
    "Semrush, SimilarWeb",
    "SensorTower",
    // Usage Produit (14)
    "interne",
    "interne",
    "interne",
    "interne",
    "Claap",
    "interne",
    "HubSpot, Salesforce",
    "snitcher, Bombora",
    "interne",
    "interne",
    "interne",
    "Albacross, Shopify",
    "interne",
    "Default, Chilipiper",
    // Communauté (14)
    "manuel",
    "Trigify",
    "Trigify",
    "interne",
    "Common Room",
    "Brandwatch",
    "G2",
    "manuel",
    "FollowersAnalysis",
    "manuel",
    "Sales Navigator, Pronto",
    "manuel",
    "manuel",
    "Mention",
    // Événements (5)
    "Octoparse, webscraper",
    "manuel",
    "Octoparse, webscraper",
    "Luma",
    "Octoparse, webscraper",
    // Lemlist Intent (15)
    "lemlist, snitcher, Bombora",
    "lemlist, snitcher, Bombora",
    "lemlist, snitcher, Bombora",
    "lemlist, snitcher, Bombora",
    "lemlist, snitcher, Bombora",
    "lemlist, snitcher, Bombora",
    "lemlist, Clay",
    "snitcher, Bombora",
    "Default, Chilipiper",
    "HubSpot, Salesforce",
    "manuel",
    "PhantomBuster",
    "PhantomBuster",
    "snitcher, Bombora",
    "lemlist, snitcher, Bombora",
  ];

  // Intensity per signal (same order as signalNames)
  const intensities: Signal["intensity"][] = [
    // Entreprise (28)
    "forte", "forte", "tres-forte", "tres-forte", "tres-forte", "tres-forte", "tres-forte",
    "forte", "forte", "forte", "forte", "forte", "moyenne", "moyenne", "moyenne", "moyenne",
    "moyenne", "moyenne", "moyenne", "moyenne", "moyenne", "faible", "moyenne", "moyenne",
    "forte", "forte", "forte", "moyenne",
    // Personne (10)
    "forte", "moyenne", "moyenne", "moyenne", "forte", "moyenne", "moyenne", "moyenne", "moyenne", "faible",
    // Tech Stack (10)
    "moyenne", "tres-forte", "forte", "moyenne", "moyenne", "moyenne", "moyenne", "moyenne", "moyenne", "moyenne",
    // Usage Produit (14)
    "tres-forte", "tres-forte", "forte", "tres-forte", "forte", "forte", "moyenne", "forte",
    "forte", "moyenne", "forte", "forte", "tres-forte", "tres-forte",
    // Communauté (14)
    "moyenne", "forte", "forte", "moyenne", "moyenne", "moyenne", "forte", "moyenne",
    "moyenne", "moyenne", "moyenne", "moyenne", "forte", "moyenne",
    // Événements (5)
    "moyenne", "moyenne", "moyenne", "moyenne", "moyenne",
    // Lemlist Intent (15)
    "forte", "forte", "moyenne", "moyenne", "forte", "moyenne", "moyenne", "forte",
    "tres-forte", "moyenne", "moyenne", "moyenne", "moyenne", "forte", "moyenne",
  ];

  let signalIndex = 0;
  return categoryDefs.map((def, catIdx) => ({
    id: def.id,
    title: content.categoryTitles[catIdx],
    count: def.count,
    signals: Array.from({ length: def.count }, () => {
      const idx = signalIndex++;
      return {
        name: content.signalNames[idx],
        intensity: intensities[idx],
        description: content.signalDescriptions[idx],
        detection: detectionTools[idx],
      };
    }),
  }));
}

export function getLocalizedInsightsHub(locale: SupportedLocale) {
  return insightsContent.insightsHub[locale];
}

export function getLocalizedBuyingSignals(locale: SupportedLocale) {
  return insightsContent.buyingSignals[locale];
}

export function getLocalizedColdEmailHub(locale: SupportedLocale) {
  return coldEmailHubContent[locale];
}

export function getLocalizedColdEmailSequence(slug: string, locale: SupportedLocale) {
  const sequences = coldEmailSequencesContent.sequences as Record<string, Record<string, unknown>>;
  const sequenceData = sequences[slug];
  if (!sequenceData) return null;
  const localeData = sequenceData[locale];
  if (!localeData) return null;
  return localeData as {
    metaTitle: string;
    metaDescription: string;
    lastBreadcrumb: string;
    heroTitle: string;
    heroSubtitle: string;
    sequenceHeading: string;
    sequenceSubtitle: string;
    tags: string[];
    metrics: Array<{ value: string; label: string }>;
    touches: Array<{
      number: number;
      channel: "email" | "call" | "linkedin";
      label: string;
      timing: string;
      subject: string | null;
      content: string;
    }>;
    whyItWorks: { heading: string; paragraphs: string[] };
    learnings: { heading: string; items: Array<{ title: string; desc: string }> };
    whenToUse: { heading: string; items: Array<{ title: string; desc: string }> };
    whoCanUse: { heading: string; items: Array<{ title: string; desc: string }> };
    faq: Array<{ question: string; answer: string }>;
  };
}

export function getLocalizedColdEmailSequenceShared(locale: SupportedLocale) {
  const shared = coldEmailSequencesContent.shared as Record<string, unknown>;
  return shared[locale] as {
    breadcrumbs: { home: string; insights: string; templates: string };
    channelLabels: { email: string; call: string; linkedin: string };
    subjectLabel: string;
    faqSectionTitle: string;
    backLinkText: string;
    lastUpdated: string;
    authorRole: string;
    authorAlt: string;
    dateLabel: string;
    cta: {
      heading: string;
      body: string;
      primaryButton: string;
      secondaryButton: string;
    };
  };
}

export function getColdEmailSequenceSlugs(): string[] {
  return coldEmailSequencesContent._meta.slugs;
}
