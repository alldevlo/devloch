import type { SupportedLocale } from "@/lib/i18n/slug-map";

type FooterLabelByLocale = Record<SupportedLocale, string>;

export const caseStudiesFooterLabels: Record<string, FooterLabelByLocale> = {
  "logiciel-comptable-200k-ca": {
    fr: "Horus (Logiciel comptable — Belgique)",
    en: "Horus (Accounting Software — Belgium)",
    de: "Horus (Buchhaltungssoftware — Belgien)",
    nl: "Horus (Boekhoudingssoftware — België)",
  },
  "hr-54-rendez-vous-dach": {
    fr: "CareerLunch (HR-Tech — DACH)",
    en: "CareerLunch (HR-Tech — DACH)",
    de: "CareerLunch (HR-Tech — DACH)",
    nl: "CareerLunch (HR-Tech — DACH)",
  },
  "proprete-urbaine-71-rendez-vous": {
    fr: "Client confidentiel (Nettoyage urbain — IA)",
    en: "Confidential Client (Urban Cleaning — AI)",
    de: "Vertraulicher Kunde (Stadtreinigung — KI)",
    nl: "Vertrouwelijke klant (Stadsreiniging — AI)",
  },
  "biocarburants-52-rendez-vous": {
    fr: "Square Co (Biocarburants — Market Intel)",
    en: "Square Co (Biofuels — Market Intelligence)",
    de: "Square Co (Biokraftstoffe — Market Intel)",
    nl: "Square Co (Biobrandstoffen — Market Intel)",
  },
  "formation-14-rendez-vous": {
    fr: "Cegos (Formation L&D — Suisse allemande)",
    en: "Cegos (L&D Training — German Switzerland)",
    de: "Cegos (L&D-Schulung — Deutschschweiz)",
    nl: "Cegos (L&D-training — Duitstalig Zwitserland)",
  },
  "audiovisuel-16-rendez-vous": {
    fr: "LEMANVISIO (Audiovisuel — Intégrateurs)",
    en: "LEMANVISIO (Audiovisual — AV Integrators)",
    de: "LEMANVISIO (Audiovisuell — AV-Integratoren)",
    nl: "LEMANVISIO (Audiovisueel — AV-integrators)",
  },
  "cybersecurite-4500-entreprises": {
    fr: "Saporo (Cybersécurité — CISO)",
    en: "Saporo (Cybersecurity — CISO)",
    de: "Saporo (Cybersicherheit — CISO)",
    nl: "Saporo (Cyberbeveiliging — CISO)",
  },
  "biodiversite-70-rendez-vous": {
    fr: "Apidae (Biodiversité — Ruches)",
    en: "Apidae (Biodiversity — Beehives)",
    de: "Apidae (Biodiversität — Bienenstöcke)",
    nl: "Apidae (Biodiversiteit — Bijenkasten)",
  },
  "mobilite-40-prospects": {
    fr: "Locky (Mobilité — Parking vélos)",
    en: "Locky (Mobility — Bike Parking)",
    de: "Locky (Mobilität — Fahrradparkplätze)",
    nl: "Locky (Mobiliteit — Fietsenparkeerplaatsen)",
  },
  "merchandising-23-prospects": {
    fr: "Many Ways (Merchandising — Universités)",
    en: "Many Ways (Merchandising — Universities)",
    de: "Many Ways (Merchandising — Universitäten)",
    nl: "Many Ways (Merchandising — Universiteiten)",
  },
  "immobilier-11-prospects": {
    fr: "HIAG (Immobilier commercial — Winterthur)",
    en: "HIAG (Commercial Real Estate — Winterthur)",
    de: "HIAG (Gewerbeimmobilien — Winterthur)",
    nl: "HIAG (Commercieel vastgoed — Winterthur)",
  },
  "immobilier-30-prospects": {
    fr: "Abacus (ERP Immobilier — Suisse romande)",
    en: "Abacus (Real Estate ERP — French Switzerland)",
    de: "Abacus (Immobilien-ERP — Westschweiz)",
    nl: "Abacus (Vastgoed-ERP — Franstalig Zwitserland)",
  },
  "monizze-120-rendez-vous": {
    fr: "Monizze (Employee Benefits — Belgique)",
    en: "Monizze (Employee Benefits — Belgium)",
    de: "Monizze (Employee Benefits — Belgien)",
    nl: "Monizze (Employee Benefits — België)",
  },
  "iddi-generation-leads-biotech-pharma": {
    fr: "IDDI (Biotech/Pharma — CRO)",
    en: "IDDI (Biotech/Pharma — CRO)",
    de: "IDDI (Biotech/Pharma — CRO)",
    nl: "IDDI (Biotech/Farma — CRO)",
  },
};

export function getCaseStudyFooterLabel(slug: string, locale: SupportedLocale): string {
  const labels = caseStudiesFooterLabels[slug];
  if (!labels) {
    return slug;
  }
  return labels[locale] ?? slug;
}
