export type ComparisonRow = {
  feature: string;
  devlo: string;
  competitor: string;
};

export type AlternativePageData = {
  slug: string;
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  comparisonTable: ComparisonRow[];
  whyDevlo: string[];
  faqs: { question: string; answer: string }[];
  caseStudySlugs: string[];
};

export const ALTERNATIVE_PAGES: Record<string, AlternativePageData> = {
  "alternative-undersales": {
    slug: "alternative-undersales",
    competitorName: "Undersales",
    metaTitle: "Alternative à Undersales | Agence prospection B2B Suisse | devlo",
    metaDescription:
      "Vous comparez devlo et Undersales pour externaliser votre prospection B2B ? Découvrez la différence : multicanal natif FR/DE/EN, 1000+ campagnes, résultats dès J+15.",
    h1: "devlo : l'alternative à Undersales pour votre prospection B2B",
    intro: [
      "Vous évaluez des agences de prospection B2B et comparez devlo à Undersales ? Cette page vous aide à prendre la bonne décision en fonction de vos besoins spécifiques.",
      "Les deux agences opèrent sur le marché B2B francophone. Les différences se trouvent dans l'approche multicanale, la couverture linguistique, et l'expérience sur les marchés suisse et DACH.",
      "Chez devlo, nous combinons cold email, LinkedIn outreach et cold calling dans une séquence coordonnée — avec une équipe native FR/DE/EN basée en Suisse depuis 2020.",
    ],
    comparisonTable: [
      { feature: "Approche", devlo: "Multicanale (cold email + LinkedIn + calling)", competitor: "Principalement cold email" },
      { feature: "Langues", devlo: "FR / DE / EN / NL natif", competitor: "FR principalement" },
      { feature: "Marché Suisse", devlo: "Spécialiste — 500+ campagnes CH", competitor: "Couverture limitée" },
      { feature: "Marché DACH", devlo: "Oui — équipe germanophone native", competitor: "Couverture limitée" },
      { feature: "Démarrage", devlo: "Résultats dès la 3e semaine", competitor: "4-6 semaines" },
      { feature: "Expérience", devlo: "1000+ campagnes depuis 2020", competitor: "Données non publiques" },
      { feature: "Reporting", devlo: "Dashboard en temps réel + weekly call", competitor: "Rapport mensuel" },
    ],
    whyDevlo: [
      "Expertise Suisse & DACH : devlo est basée en Suisse et opère en français, allemand et anglais natif — indispensable pour les marchés helvétique et germanophone.",
      "Multicanal coordonné : nous combinons cold email, LinkedIn et cold calling dans une même séquence pour maximiser les points de contact avec vos décideurs cibles.",
      "Résultats chiffrés et vérifiables : 14 cas clients publics avec des métriques précises — 120 RDV pour Monizze, 71 RDV pour Cortexia, 52 RDV pour Square Co.",
      "Infrastructure complète : domaines dédiés, warm-up, délivrabilité, Sales Navigator, Clay — tout est inclus dans nos forfaits.",
    ],
    faqs: [
      {
        question: "Quelle est la principale différence entre devlo et Undersales ?",
        answer:
          "La différence clé est l'approche multicanale et la couverture linguistique. devlo opère en FR/DE/EN natif avec une expertise reconnue sur les marchés suisse et DACH, et combine trois canaux d'outreach coordonnés.",
      },
      {
        question: "devlo est-elle plus chère qu'Undersales ?",
        answer:
          "Nos forfaits démarrent à CHF 2'500/mois et incluent l'infrastructure complète (domaines, outils, délivrabilité). Le ROI est mesuré sur les rendez-vous qualifiés générés, pas sur le prix brut.",
      },
      {
        question: "Comment migrer d'Undersales vers devlo ?",
        answer:
          "La transition prend 2 semaines : workshop ICP, transfert des listes de prospects, setup de l'infrastructure, validation des séquences. Nos premiers résultats arrivent dès la 3e semaine de campagne.",
      },
    ],
    caseStudySlugs: ["monizze-120-rendez-vous", "proprete-urbaine-71-rendez-vous", "biocarburants-52-rendez-vous"],
  },
  "alternative-lalaleads": {
    slug: "alternative-lalaleads",
    competitorName: "LalaLeads",
    metaTitle: "Alternative à LalaLeads | Agence prospection B2B Suisse | devlo",
    metaDescription:
      "Vous comparez devlo et LalaLeads pour votre prospection B2B ? devlo apporte une approche multicanale, une expertise Suisse/DACH et des résultats mesurables dès J+15.",
    h1: "devlo : l'alternative à LalaLeads pour votre prospection B2B",
    intro: [
      "LalaLeads et devlo sont deux agences spécialisées dans la génération de leads B2B. Si vous hésitez entre les deux, voici une comparaison objective pour guider votre décision.",
      "devlo se distingue par son approche outbound multicanale intégrée — cold email, LinkedIn et calling coordonnés — et par sa présence historique sur les marchés suisse et DACH.",
      "Avec plus de 1000 campagnes depuis 2020 et 14 cas clients publics, nous privilégions la transparence et les résultats mesurables.",
    ],
    comparisonTable: [
      { feature: "Approche", devlo: "Multicanale (cold email + LinkedIn + calling)", competitor: "Cold email & LinkedIn" },
      { feature: "Cold calling", devlo: "Oui — équipe native FR/DE/EN", competitor: "Non inclus" },
      { feature: "Marché Suisse", devlo: "Spécialiste — basé en Suisse depuis 2020", competitor: "Marché secondaire" },
      { feature: "Intent data", devlo: "Service dédié (signaux Bombora, G2, recrutements)", competitor: "Non proposé" },
      { feature: "Enrichissement", devlo: "Clay + Apollo + Cognism intégré", competitor: "Outils standards" },
      { feature: "Cas clients publics", devlo: "14 cas clients avec métriques", competitor: "Données limitées" },
      { feature: "Langues", devlo: "FR / DE / EN / NL", competitor: "FR / EN" },
    ],
    whyDevlo: [
      "Prospection multicanale réelle : certaines agences se limitent au cold email. Chez devlo, cold email, LinkedIn et calling sont coordonnés dans une même séquence pour 2-3x plus de réponses.",
      "Intent data inclus : nous identifions les entreprises qui montrent des signaux d'achat actifs — levées de fonds, recrutements, signaux G2 — avant de les prospecter.",
      "Suisse & DACH : notre équipe est native FR/DE/EN. Nous parlons la langue de vos prospects — pas seulement au sens littéral, mais culturellement.",
      "Transparence totale : 14 cas clients publics avec des résultats chiffrés. Pas de promesses vagues, des exemples concrets vérifiables.",
    ],
    faqs: [
      {
        question: "Quelle est la différence clé entre devlo et LalaLeads ?",
        answer:
          "devlo propose une approche outbound multicanale complète (cold email + LinkedIn + calling) avec une expertise reconnue en Suisse et en DACH. Nous ajoutons également l'intent data et l'enrichissement Clay en standard.",
      },
      {
        question: "devlo peut-elle prospecter en Allemagne et en Autriche comme LalaLeads ?",
        answer:
          "Oui. Notre équipe germanophone native opère en Allemagne, Autriche et Suisse alémanique depuis 2020. Exemple : 54 rendez-vous qualifiés pour CareerLunch sur le marché DACH.",
      },
      {
        question: "Quels résultats puis-je attendre avec devlo ?",
        answer:
          "Taux de réponse moyen de 8-15 % selon le canal et le secteur, premiers rendez-vous qualifiés dès la 3e semaine. Nos 14 cas clients publics donnent une idée précise des résultats possibles dans votre secteur.",
      },
    ],
    caseStudySlugs: ["hr-54-rendez-vous-dach", "biocarburants-52-rendez-vous", "linkedin-outreach-b2b-methode-resultats"].filter(
      (s) => !s.includes("blog"),
    ) as string[],
  },
  "alternative-agences-prospection-b2b": {
    slug: "alternative-agences-prospection-b2b",
    competitorName: "les autres agences",
    metaTitle: "Meilleure agence prospection B2B Suisse | Comparatif 2026 | devlo",
    metaDescription:
      "Comparez les agences de prospection B2B en Suisse et en France. devlo vs Undersales, LalaLeads, Sortlist agencies : critères, résultats et méthode pour bien choisir.",
    h1: "Choisir son agence de prospection B2B : comparatif 2026",
    intro: [
      "Le marché des agences de prospection B2B s'est considérablement développé depuis 2020. Entre les agences spécialisées outbound, les plateformes de mise en relation et les freelances, il est difficile de s'y retrouver.",
      "Cette page vous aide à comparer les options et à identifier les critères qui comptent vraiment : approche multicanale, couverture linguistique, transparence sur les résultats, et expérience sur votre marché cible.",
      "devlo est une agence suisse spécialisée en prospection B2B multicanale depuis 2020. Nous avons accompagné plus de 200 clients en Suisse, Belgique, France et DACH.",
    ],
    comparisonTable: [
      { feature: "Approche", devlo: "Multicanale (cold email + LinkedIn + calling)", competitor: "Variable selon l'agence" },
      { feature: "Marché Suisse", devlo: "Spécialiste — basé en Suisse", competitor: "Souvent secondaire" },
      { feature: "Langues", devlo: "FR / DE / EN / NL natif", competitor: "FR principalement" },
      { feature: "Transparence résultats", devlo: "14 cas clients publics chiffrés", competitor: "Variable" },
      { feature: "Intent data", devlo: "Inclus dans les forfaits", competitor: "Rarement proposé" },
      { feature: "Cold calling", devlo: "Oui — équipe native multilingue", competitor: "Souvent absent" },
      { feature: "Démarrage", devlo: "Premiers RDV dès la 3e semaine", competitor: "4-8 semaines en général" },
    ],
    whyDevlo: [
      "Les 5 critères pour choisir une agence de prospection : (1) expertise multicanale, (2) références vérifiables dans votre secteur, (3) couverture linguistique sur votre marché, (4) transparence sur la méthodologie, (5) reporting en temps réel.",
      "devlo coche ces 5 cases : 1000+ campagnes, 14 cas clients publics, équipe FR/DE/EN/NL, méthodologie documentée, dashboard en temps réel.",
      "Notre différence vs les agences génériques : nous sommes exclusivement spécialisés en outbound B2B. Pas de SEO, pas d'inbound, pas de social media — seulement de la prospection commerciale B2B.",
    ],
    faqs: [
      {
        question: "Comment comparer les agences de prospection B2B ?",
        answer:
          "Demandez des références dans votre secteur, examinez les cas clients publiés avec des métriques précises, vérifiez la couverture linguistique sur votre marché cible, et assurez-vous que l'approche est vraiment multicanale.",
      },
      {
        question: "devlo est-elle adaptée aux PME ou seulement aux grandes entreprises ?",
        answer:
          "Nous accompagnons des PME (dès 10 employés) comme de grandes entreprises. Nos forfaits s'adaptent au budget et aux objectifs. Le critère principal est la qualité de votre offre B2B, pas la taille de votre entreprise.",
      },
      {
        question: "Quels sont les tarifs des agences de prospection B2B en Suisse ?",
        answer:
          "Les tarifs varient de CHF 1'500 à CHF 10'000+/mois selon le volume, les canaux et l'expertise. devlo démarre à CHF 2'500/mois avec une approche multicanale complète. Les agences moins chères fonctionnent souvent sur un seul canal avec des résultats plus aléatoires.",
      },
      {
        question: "Combien de temps pour voir des résultats avec une agence B2B ?",
        answer:
          "Chez devlo, les premiers rendez-vous qualifiés arrivent dès la 3e semaine. La phase de rampe (optimisation du messaging et de la délivrabilité) dure 2-4 semaines. À 8 semaines, la campagne est en régime de croisière.",
      },
    ],
    caseStudySlugs: ["monizze-120-rendez-vous", "logiciel-comptable-200k-ca", "hr-54-rendez-vous-dach", "biodiversite-70-rendez-vous"],
  },
};
