export type CountryCode = string;

export type CaseStudyBrandAsset = {
  logo?: string;
  countries: CountryCode[];
  showMoreCountries?: boolean;
};

export const TRUSTED_LOGOS_STRIP: Array<{ src: string; alt: string }> = [
  { src: "/images/Monizze_Logo.webp", alt: "Monizze logo" },
  { src: "/images/Horus_logo.webp", alt: "Horus Software logo" },
  { src: "/images/CareerLunch_logo.webp", alt: "CareerLunch logo" },
  { src: "/images/Saporo_logo.webp", alt: "Saporo logo" },
  { src: "/images/Cegos_Logo.webp", alt: "Cegos logo" },
  { src: "/images/Abacus_logo.webp", alt: "Abacus logo" },
  { src: "/images/Apidae_log.webp", alt: "APIDAE logo" },
  { src: "/images/IDDI_logo.webp", alt: "IDDI logo" },
  { src: "/images/Locky_Logo.webp", alt: "Locky logo" },
  { src: "/images/HIAG_logo.webp", alt: "HIAG logo" },
];

export const CASE_STUDY_BRAND_ASSETS: Record<string, CaseStudyBrandAsset> = {
  monizze: { logo: "/images/Monizze_Logo.webp", countries: ["BE"] },
  horus: { logo: "/images/Horus_logo.webp", countries: ["BE"] },
  careerlunch: { logo: "/images/CareerLunch_logo.webp", countries: ["DE", "AT", "CH"] },
  saporo: { logo: "/images/Saporo_logo.webp", countries: ["CH", "FR", "DE", "AT", "BE"], showMoreCountries: true },
  cegos: { logo: "/images/Cegos_Logo.webp", countries: ["CH"] },
  abacus: { logo: "/images/Abacus_logo.webp", countries: ["CH"] },
  apidae: { logo: "/images/Apidae_log.webp", countries: ["CH"] },
  iddi: { logo: "/images/IDDI_logo.webp", countries: ["CH", "BE", "FR", "DE"], showMoreCountries: true },
  locky: { logo: "/images/Locky_Logo.webp", countries: ["BE", "FR"] },
  squareco: { logo: "/images/squareco.webp", countries: ["EU"], showMoreCountries: true },
  lemanvisio: { logo: "/images/Lemanvisio_Logo.webp", countries: ["CH"] },
  hiag: { logo: "/images/HIAG_logo.webp", countries: ["CH"] },
};

const CLIENT_TO_SLUG: Record<string, string> = {
  monizze: "monizze",
  horus: "horus",
  "horus software": "horus",
  careerlunch: "careerlunch",
  saporo: "saporo",
  cegos: "cegos",
  abacus: "abacus",
  apidae: "apidae",
  iddi: "iddi",
  locky: "locky",
  squareco: "squareco",
  lemanvisio: "lemanvisio",
  hiag: "hiag",
};

export function getCaseStudyBrandAsset(slug: string): CaseStudyBrandAsset | undefined {
  return CASE_STUDY_BRAND_ASSETS[slug];
}

export function getCaseStudyBrandAssetByClient(client: string): CaseStudyBrandAsset | undefined {
  const normalized = client.trim().toLowerCase();
  const slug = CLIENT_TO_SLUG[normalized];
  if (!slug) return undefined;
  return CASE_STUDY_BRAND_ASSETS[slug];
}

export function buildClientMonogram(client: string): string {
  const words = client
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return "DV";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}
