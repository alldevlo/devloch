import type { ServiceFaq } from "@/content/services";

export type GeoPageData = {
  country: "ch" | "be" | "fr";
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  caseStudySlugs: string[];
  faqs: ServiceFaq[];
  localBusiness: {
    name: string;
    telephone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
};

export const GEO_PAGES: Record<string, GeoPageData> = {
  "prospection-commerciale-suisse": {
    country: "ch",
    slug: "prospection-commerciale-suisse",
    metaTitle: "Prospection commerciale B2B en Suisse — devlo",
    metaDescription:
      "Agence de prospection commerciale B2B basée en Suisse. Générez des leads qualifiés et des rendez-vous avec des décideurs suisses via cold email, LinkedIn et calling.",
    h1: "Prospection commerciale B2B en Suisse",
    intro: [
      "Basée à Rivaz dans le canton de Vaud, devlo accompagne les entreprises suisses et internationales dans leur développement commercial B2B sur le marché helvétique.",
      "Notre connaissance du tissu économique suisse — romand, alémanique et tessinois — nous permet de construire des campagnes outbound multicanales adaptées aux spécificités locales.",
      "Plus de 500 campagnes déployées en Suisse depuis 2020, avec un taux de réponse moyen de 12 % sur les décideurs contactés.",
    ],
    caseStudySlugs: [
      "hr-54-rendez-vous-dach",
      "proprete-urbaine-71-rendez-vous",
      "mobilite-40-prospects",
      "immobilier-30-prospects",
      "immobilier-11-prospects",
    ],
    faqs: [
      {
        question: "Quels secteurs prospectez-vous en Suisse ?",
        answer:
          "Nous intervenons dans tous les secteurs B2B : IT, finance, industrie, services professionnels, santé, immobilier et plus. Notre approche est adaptée au marché suisse multilingue.",
      },
      {
        question: "Prospectez-vous en Suisse alémanique ?",
        answer:
          "Oui, notre équipe maîtrise le français, l'allemand et l'anglais. Nous déployons des campagnes en Romandie, en Suisse alémanique et au Tessin avec des messages natifs.",
      },
      {
        question: "Quel est le coût d'une campagne de prospection en Suisse ?",
        answer:
          "Nos forfaits démarrent à CHF 2'500/mois. Le tarif dépend du volume de prospects ciblés, du nombre de canaux activés et de la complexité de votre ICP.",
      },
    ],
    localBusiness: {
      name: "devlo",
      telephone: "+41-79-758-64-03",
      email: "emea@devlo.ch",
      address: {
        streetAddress: "Ruelle des Dolles 1",
        addressLocality: "Rivaz",
        postalCode: "1071",
        addressRegion: "Vaud",
        addressCountry: "CH",
      },
    },
  },
  "prospection-commerciale-belgique": {
    country: "be",
    slug: "prospection-commerciale-belgique",
    metaTitle: "Prospection commerciale B2B en Belgique — devlo",
    metaDescription:
      "Agence spécialisée en prospection B2B en Belgique. Générez des leads qualifiés auprès de décideurs belges via cold email, LinkedIn et téléprospection.",
    h1: "Prospection commerciale B2B en Belgique",
    intro: [
      "La Belgique est l'un de nos marchés historiques. Depuis 2020, nous avons déployé plus de 200 campagnes ciblant des décideurs belges francophones et néerlandophones.",
      "Notre expertise couvre Bruxelles, la Wallonie et la Flandre avec des campagnes adaptées linguistiquement et culturellement à chaque région.",
      "Résultats concrets : 200 000 € de contrats signés pour Horus Software et 120 rendez-vous qualifiés pour Monizze, deux succès belges emblématiques.",
    ],
    caseStudySlugs: [
      "logiciel-comptable-200k-ca",
      "monizze-120-rendez-vous",
    ],
    faqs: [
      {
        question: "Prospectez-vous en néerlandais en Belgique ?",
        answer:
          "Oui, nous déployons des campagnes en français et en néerlandais. Notre équipe rédige des messages natifs adaptés à la Flandre et à Bruxelles.",
      },
      {
        question: "Quels résultats avez-vous obtenus en Belgique ?",
        answer:
          "Parmi nos succès : 80 rendez-vous qualifiés et 200K€ de contrats pour Horus Software, 120 rendez-vous pour Monizze. Taux de conversion moyen de 8-12 %.",
      },
      {
        question: "Ciblez-vous les PME ou les grandes entreprises en Belgique ?",
        answer:
          "Les deux. Nous adaptons la stratégie selon votre ICP : ABM pour les grands comptes, volume pour les PME. La Belgique est un marché idéal pour les deux approches.",
      },
    ],
    localBusiness: {
      name: "devlo",
      telephone: "+41-79-758-64-03",
      email: "emea@devlo.ch",
      address: {
        streetAddress: "Ruelle des Dolles 1",
        addressLocality: "Rivaz",
        postalCode: "1071",
        addressRegion: "Vaud",
        addressCountry: "CH",
      },
    },
  },
  "prospection-commerciale-france": {
    country: "fr",
    slug: "prospection-commerciale-france",
    metaTitle: "Prospection commerciale B2B en France — devlo",
    metaDescription:
      "Agence suisse de prospection commerciale B2B active en France. Campagnes cold email, LinkedIn et calling pour générer des leads qualifiés auprès de décideurs français.",
    h1: "Prospection commerciale B2B en France",
    intro: [
      "Depuis notre base suisse, nous accompagnons des entreprises qui souhaitent pénétrer ou accélérer leur développement sur le marché français.",
      "La France est notre deuxième marché par volume de campagnes. Nous ciblons principalement l'Île-de-France, Lyon, Marseille et les pôles économiques régionaux.",
      "Notre approche combine la rigueur suisse avec une parfaite maîtrise des codes commerciaux français pour des campagnes outbound performantes.",
    ],
    caseStudySlugs: [
      "biodiversite-70-rendez-vous",
      "biocarburants-52-rendez-vous",
      "formation-14-rendez-vous",
      "audiovisuel-16-rendez-vous",
    ],
    faqs: [
      {
        question: "Pourquoi choisir une agence suisse pour prospecter en France ?",
        answer:
          "Notre positionnement suisse apporte une image de sérieux et de qualité. Nous combinons méthodologie rigoureuse et connaissance du marché français pour des résultats supérieurs.",
      },
      {
        question: "Quels secteurs ciblez-vous en France ?",
        answer:
          "Tous les secteurs B2B : tech, industrie, services, environnement, formation. Nous avons des succès dans la biodiversité (70 RDV), les biocarburants (52 RDV) et la formation (14 RDV).",
      },
      {
        question: "Comment gérez-vous la conformité RGPD pour la France ?",
        answer:
          "Toutes nos campagnes sont conformes au RGPD. Nous utilisons uniquement des données B2B professionnelles, avec opt-out systématique et traçabilité complète.",
      },
    ],
    localBusiness: {
      name: "devlo",
      telephone: "+41-79-758-64-03",
      email: "emea@devlo.ch",
      address: {
        streetAddress: "Ruelle des Dolles 1",
        addressLocality: "Rivaz",
        postalCode: "1071",
        addressRegion: "Vaud",
        addressCountry: "CH",
      },
    },
  },
};
