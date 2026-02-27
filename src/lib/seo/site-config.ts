/**
 * Central SEO & structured data configuration for devlo.ch
 *
 * This file holds all site-level constants used for JSON-LD schemas,
 * Open Graph defaults, and metadata base values.
 *
 * TODO: Fill in every field marked "TODO" before go-live on devlo.ch
 */

export const seoConfig = {
  siteName: "devlo",
  /** Canonical production domain — do NOT change to staging URL */
  siteUrl: "https://devlo.ch",
  locale: "fr_CH",

  /**
   * Default Open Graph / Twitter card image.
   * Must be exactly 1200×630 px.
   * TODO: Replace with a properly designed editorial OG image.
   */
  defaultOgImage: "/images/devlo_OG_Banner.webp",

  organization: {
    name: "devlo",
    /** TODO: Confirm exact legal entity name (Sàrl, SA, GmbH?) */
    legalName: "devlo",
    url: "https://devlo.ch",
    logo: "https://devlo.ch/images/devlo-logo.webp",
    /** TODO: Confirm exact founding year */
    foundingDate: "2020",
    description:
      "devlo est une agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés. Plus de 1000 campagnes depuis 2020.",
    /** TODO: Add other active social profiles (X/Twitter, YouTube, etc.) */
    sameAs: [
      "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
    ],

    /** Swiss headquarters */
    addressCH: {
      streetAddress: "Ruelle des Dolles 1",
      addressLocality: "Rivaz",
      postalCode: "1071",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },

    /** US office */
    addressUS: {
      streetAddress: "500 4TH ST NW SUITE 102 #1591",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      postalCode: "87102",
      addressCountry: "US",
    },

    contactPoints: [
      {
        contactType: "customer service",
        telephone: "+41-79-758-64-03",
        email: "emea@devlo.ch",
        areaServed: ["CH", "BE", "FR", "DE", "LU"],
        availableLanguage: ["French", "German", "English"],
      },
      {
        contactType: "customer service",
        telephone: "+1-234-201-8019",
        email: "americas@devlo.ch",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"],
      },
    ],
  },
} as const;
