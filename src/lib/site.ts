const PRODUCTION_SITE_URL = "https://devlo.ch";

function normalizePublicUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return PRODUCTION_SITE_URL;

  try {
    const parsed = new URL(trimmed);
    return parsed.origin;
  } catch {
    return PRODUCTION_SITE_URL;
  }
}

function resolveSiteUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizePublicUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  return PRODUCTION_SITE_URL;
}

export const siteConfig = {
  name: "devlo",
  description:
    "Agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés.",
  url: resolveSiteUrl(),
  locale: "fr-CH",
  nav: [
    { label: "Accueil", href: "/" },
    { label: "Agence", href: "/" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Outbound Academy", href: "/academy" },
    { label: "Consultation gratuite", href: "/consultation" },
  ],
  footer: {
    legal: [
      { label: "Conditions générales", href: "/conditions" },
    ],
    contact: [
      { label: "+41 79 758 64 03", href: "tel:+41797586403" },
      { label: "emea@devlo.ch", href: "mailto:emea@devlo.ch" },
    ],
  },
} as const;
