export const siteConfig = {
  name: "devlo",
  description:
    "Agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés.",
  url: "https://devlo.ch",
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
