export type ServiceSlug =
  | "outbound-multicanal"
  | "cold-email"
  | "linkedin-outreach"
  | "cold-calling"
  | "intent-data"
  | "enrichissement-clay"
  | "generation-leads"
  | "qualification-leads"
  | "prise-de-rendez-vous"
  | "crm-delivrabilite";

export type ServiceTag =
  | "outbound"
  | "cold-email"
  | "linkedin-outreach"
  | "cold-calling"
  | "intent-data"
  | "enrichissement-clay"
  | "generation-leads"
  | "qualification-leads"
  | "prise-rdv"
  | "crm-delivrabilite";

export type ServiceConfiguratorField = {
  id: string;
  label: string;
  type: "single" | "multi";
  options: string[];
  optional?: boolean;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceSocialProof = {
  client: string;
  result: string;
  details: string;
};

export type ServicePageData = {
  slug: ServiceSlug;
  path: `/services/${ServiceSlug}`;
  navTitle: string;
  pageTitle: string;
  pageSubtitle: string;
  metadataTitle: string;
  metadataDescription: string;
  metadataKeywords: string[];
  heroParagraphs: string[];
  coverageTitle: string;
  coverageItems: string[];
  processTitle: string;
  processSteps: ServiceProcessStep[];
  editorialTitle: string;
  editorialParagraphs: string[];
  configuratorTitle: string;
  configuratorIntro: string;
  configuratorServiceLabel: string;
  configuratorHeader: string;
  configuratorFields: ServiceConfiguratorField[];
  socialProofTitle: string;
  socialProofItems: ServiceSocialProof[];
  caseStudyTag: ServiceTag;
  faqTitle: string;
  faqItems: ServiceFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
  relatedServices: ServiceSlug[];
  summaryTitle?: string;
  summaryPoints?: string[];
  datePublished?: string;
  dateModified?: string;
  comparisonTable?: {
    caption: string;
    headers: string[];
    rows: Array<{ criterion: string; colA: string; colB: string }>;
  };
};

export type ServiceHubCard = {
  href: `/services/${ServiceSlug}`;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  kpi: string;
  tag: ServiceTag;
};

export type CaseStudyCard = {
  slug: string;
  href: string;
  client: string;
  sector: string;
  region: string;
  headline: string;
  kpis: string[];
  tags: ServiceTag[];
};

export const SERVICE_HUB_CARDS: ServiceHubCard[] = [
  {
    href: "/services/outbound-multicanal",
    icon: "🚀",
    title: "Outbound Multicanal",
    subtitle: "Cold Email + LinkedIn + Cold Calling",
    description:
      "Stratégie complète combinant email, LinkedIn et appels téléphoniques pour maximiser la couverture de votre marché et les taux de réponse.",
    kpi: "120 RDV qualifiés pour Monizze",
    tag: "outbound",
  },
  {
    href: "/services/cold-email",
    icon: "📧",
    title: "Cold Email B2B",
    subtitle: "Séquences email personnalisées",
    description:
      "Campagnes cold email ultra-personnalisées avec taux d'ouverture élevés. Délivrabilité technique, copywriting, A/B testing et optimisation continue.",
    kpi: "71% d'ouverture chez CareerLunch",
    tag: "cold-email",
  },
  {
    href: "/services/linkedin-outreach",
    icon: "💼",
    title: "LinkedIn Outreach",
    subtitle: "Prospection LinkedIn Sales Navigator",
    description:
      "Prospection LinkedIn ciblée via Sales Navigator, séquences de connexion et messages personnalisés pour atteindre les décideurs B2B.",
    kpi: "69% de réponse pour Lemanvisio",
    tag: "linkedin-outreach",
  },
  {
    href: "/services/cold-calling",
    icon: "📞",
    title: "Cold Calling B2B",
    subtitle: "Téléprospection externalisée",
    description:
      "Téléprospection B2B avec scripts personnalisés, gestion des objections et qualification téléphonique pour générer des démos qualifiées.",
    kpi: "+1 000 appels pour IDDI",
    tag: "cold-calling",
  },
  {
    href: "/services/intent-data",
    icon: "📡",
    title: "Intent Data",
    subtitle: "Signal-based selling",
    description:
      "Activation de signaux d'intention : levées de fonds, recrutements, signaux technologiques et comportements d'achat pour prospecter au bon moment.",
    kpi: "4 500 entreprises ciblées pour Saporo",
    tag: "intent-data",
  },
  {
    href: "/services/enrichissement-clay",
    icon: "⚡",
    title: "Enrichissement Clay",
    subtitle: "Data B2B multi-sources",
    description:
      "Construction et enrichissement de listes via Clay, Apollo, ZoomInfo, Cognism et Crunchbase avec scoring, validation et automatisations.",
    kpi: "900 comptes qualifiés pour Horus",
    tag: "enrichissement-clay",
  },
  {
    href: "/services/generation-leads",
    icon: "🎯",
    title: "Génération de leads",
    subtitle: "Lead gen + construction ICP",
    description:
      "Identification des ICPs, construction du TAM, qualification manuelle des comptes et génération de listes prêtes à prospecter.",
    kpi: "1 600 → 300 comptes qualifiés pour Abacus",
    tag: "generation-leads",
  },
  {
    href: "/services/qualification-leads",
    icon: "🔍",
    title: "Qualification de leads",
    subtitle: "SDR externalisé",
    description:
      "Qualification des leads entrants et sortants, appels de découverte et transmission de rendez-vous prêts à convertir.",
    kpi: "20 discovery calls et 15 démos pour Locky",
    tag: "qualification-leads",
  },
  {
    href: "/services/prise-de-rendez-vous",
    icon: "📅",
    title: "Prise de rendez-vous",
    subtitle: "Booking qualifié & inbox management",
    description:
      "Gestion complète de l'inbox, relances proactives et booking direct dans l'agenda de votre équipe commerciale.",
    kpi: "No-show quasi nul sur 120 RDV Monizze",
    tag: "prise-rdv",
  },
  {
    href: "/services/crm-delivrabilite",
    icon: "🛠️",
    title: "CRM & Délivrabilité",
    subtitle: "HubSpot, Salesforce & infra email",
    description:
      "Setup CRM et infrastructure email (SPF, DKIM, DMARC, warm-up) pour sécuriser la délivrabilité et fiabiliser le pipeline.",
    kpi: "96–99% de délivrabilité pour Monizze",
    tag: "crm-delivrabilite",
  },
];

export const ALL_CASE_STUDIES: CaseStudyCard[] = [
  {
    slug: "monizze",
    href: "/etudes-de-cas/monizze-120-rendez-vous",
    client: "Monizze",
    sector: "RH / Avantages salariaux",
    region: "Belgique",
    headline: "120 rendez-vous qualifiés",
    kpis: ["7 000 décideurs ciblés", "96–99% délivrabilité", "No-show quasi nul"],
    tags: ["outbound", "prise-rdv", "cold-email"],
  },
  {
    slug: "horus",
    href: "/etudes-de-cas/logiciel-comptable-200k-ca",
    client: "Horus Software",
    sector: "Logiciel comptable",
    region: "Belgique",
    headline: "200 000 € de CA signé",
    kpis: ["80+ rendez-vous", "45 nouveaux clients", "60% conversion démo→client"],
    tags: ["outbound", "cold-calling", "cold-email", "generation-leads"],
  },
  {
    slug: "careerlunch",
    href: "/etudes-de-cas/hr-54-rendez-vous-dach",
    client: "CareerLunch",
    sector: "HR-tech",
    region: "DACH",
    headline: "54 rendez-vous en région DACH",
    kpis: ["71% d'ouverture", "29% de clic", "516 prospects contactés"],
    tags: ["outbound", "cold-email", "generation-leads", "linkedin-outreach"],
  },
  {
    slug: "saporo",
    href: "/etudes-de-cas/cybersecurite-4500-entreprises",
    client: "Saporo",
    sector: "Cybersécurité",
    region: "Multi-pays",
    headline: "4 500 entreprises ciblées",
    kpis: ["10+ campagnes", "81% d'ouverture", "54% de réponse"],
    tags: ["outbound", "intent-data", "qualification-leads", "generation-leads"],
  },
  {
    slug: "cegos",
    href: "/etudes-de-cas/formation-14-rendez-vous",
    client: "Cegos",
    sector: "Formation professionnelle",
    region: "Suisse alémanique",
    headline: "45% de taux de réponse",
    kpis: ["73% d'ouverture", "14 RDV qualifiés", "Contrats signés"],
    tags: ["outbound", "cold-email", "linkedin-outreach", "generation-leads"],
  },
  {
    slug: "abacus",
    href: "/etudes-de-cas/immobilier-30-prospects",
    client: "Abacus",
    sector: "ERP / Logiciel immobilier",
    region: "Suisse romande",
    headline: "+30 prospects intéressés",
    kpis: ["69% de réponse", "1 600 entreprises analysées", "12 jours avant 1er RDV"],
    tags: ["outbound", "cold-calling", "generation-leads", "qualification-leads", "enrichissement-clay"],
  },
  {
    slug: "apidae",
    href: "/etudes-de-cas/biodiversite-70-rendez-vous",
    client: "APIDAE",
    sector: "Biodiversité / Non-profit",
    region: "Suisse romande",
    headline: "70 rendez-vous qualifiés",
    kpis: ["UEFA, TAG Heuer, Rothschild", "40% de réponse", "13% d'intérêt"],
    tags: ["outbound", "cold-email", "linkedin-outreach", "prise-rdv"],
  },
  {
    slug: "iddi",
    href: "/etudes-de-cas/iddi-generation-leads-biotech-pharma",
    client: "IDDI",
    sector: "Pharma / Biotech / CRO",
    region: "International",
    headline: "Premiers RDV en 3 semaines",
    kpis: ["52,7% d'ouverture", "+1 000 cold calls", "Hausse des démos"],
    tags: ["outbound", "cold-calling", "qualification-leads", "generation-leads"],
  },
  {
    slug: "locky",
    href: "/etudes-de-cas/mobilite-40-prospects",
    client: "Locky",
    sector: "Mobilité / Parking vélo",
    region: "Belgique / France",
    headline: "40 prospects intéressés",
    kpis: ["20 discovery calls", "15 démos planifiées", "14% d'intérêt"],
    tags: ["outbound", "generation-leads", "qualification-leads", "crm-delivrabilite"],
  },
  {
    slug: "squareco",
    href: "/etudes-de-cas/biocarburants-52-rendez-vous",
    client: "SquareCo",
    sector: "Énergie / Biocarburants",
    region: "International",
    headline: "52 prospects intéressés",
    kpis: ["74% d'ouverture", "37% de réponse", "Validation multi-ICP"],
    tags: ["outbound", "intent-data", "generation-leads", "enrichissement-clay"],
  },
  {
    slug: "lemanvisio",
    href: "/etudes-de-cas/audiovisuel-16-rendez-vous",
    client: "Lemanvisio",
    sector: "Audiovisuel",
    region: "Suisse",
    headline: "16 RDV qualifiés",
    kpis: ["89% d'ouverture", "69% de réponse", "6% de meetings"],
    tags: ["outbound", "cold-email", "generation-leads", "qualification-leads"],
  },
  {
    slug: "hiag",
    href: "/etudes-de-cas/immobilier-11-prospects",
    client: "HIAG",
    sector: "Immobilier commercial",
    region: "Suisse",
    headline: "11 locataires qualifiés",
    kpis: ["87% d'ouverture", "73% de réponse", "9 jours avant 1er RDV"],
    tags: ["outbound", "cold-email", "generation-leads", "qualification-leads"],
  },
];

export const RELATED_SERVICES: Record<ServiceSlug, ServiceSlug[]> = {
  "outbound-multicanal": ["cold-email", "linkedin-outreach", "cold-calling"],
  "cold-email": ["outbound-multicanal", "enrichissement-clay", "crm-delivrabilite"],
  "linkedin-outreach": ["outbound-multicanal", "cold-email", "generation-leads"],
  "cold-calling": ["outbound-multicanal", "qualification-leads", "generation-leads"],
  "intent-data": ["enrichissement-clay", "outbound-multicanal", "generation-leads"],
  "enrichissement-clay": ["generation-leads", "intent-data", "crm-delivrabilite"],
  "generation-leads": ["enrichissement-clay", "outbound-multicanal", "qualification-leads"],
  "qualification-leads": ["generation-leads", "prise-de-rendez-vous", "cold-calling"],
  "prise-de-rendez-vous": ["qualification-leads", "outbound-multicanal", "crm-delivrabilite"],
  "crm-delivrabilite": ["cold-email", "enrichissement-clay", "generation-leads"],
};

export const SERVICE_PAGE_DATA: Record<ServiceSlug, ServicePageData> = {
  "outbound-multicanal": {
    slug: "outbound-multicanal",
    path: "/services/outbound-multicanal",
    navTitle: "Outbound Multicanal",
    pageTitle: "Prospection Outbound Multicanal B2B : Cold Email, LinkedIn et Cold Calling",
    pageSubtitle: "Cold Email + LinkedIn + Calling pour générer un pipeline qualifié et prévisible.",
    metadataTitle: "Prospection Outbound Multicanal B2B",
    metadataDescription:
      "Agence de prospection outbound multicanal B2B basée en Suisse : cold email, LinkedIn et calling pour générer des rendez-vous qualifiés.",
    metadataKeywords: [
      "prospection outbound multicanal",
      "agence outbound B2B",
      "cold email LinkedIn calling",
      "génération de rendez-vous B2B",
      "externaliser prospection commerciale",
    ],
    heroParagraphs: [
      "La prospection outbound multicanal consiste à contacter vos prospects idéaux via plusieurs canaux simultanément : cold email personnalisé, messages LinkedIn, appels à froid et relances coordonnées. devlo conçoit et exécute ces campagnes de A à Z — de la définition de l'ICP à la qualification des leads et à la prise de rendez-vous directement dans l'agenda de votre équipe commerciale.",
      "Contrairement à une approche mono-canal, le multicanal augmente significativement les taux de réponse en touchant le prospect au bon moment sur son canal préféré. Nos campagnes combinent lemlist pour les séquences email, LinkedIn Sales Navigator pour le ciblage, et un script téléphonique adapté pour les relances. Le résultat : des rendez-vous qualifiés avec les bons décideurs dans un délai de 1 à 5 semaines.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Définition et validation de l'ICP avec critères firmographiques et comportementaux",
      "Construction de la liste de prospection (TAM → SAM → ICP qualifié)",
      "Rédaction et A/B testing des séquences cold email",
      "Prospection LinkedIn : demandes de connexion, messages directs, InMails",
      "Cold calling : scripts, gestion des objections, prise de note",
      "Séquences multicanales coordonnées (email → LinkedIn → appel → relance)",
      "Gestion inbox et qualification des réponses",
      "Reporting hebdomadaire : ouverture, réponse, intérêt, RDV",
      "Intégration CRM (HubSpot, Salesforce, Pipedrive)",
      "Coaching commercial optionnel",
    ],
    processTitle: "Processus devlo en 5 étapes",
    processSteps: [
      {
        title: "Onboarding & ICP",
        description: "Comprendre votre marché, vos ICPs et vos meilleurs clients actuels.",
      },
      {
        title: "Génération de leads",
        description: "Identifier et qualifier les prospects via Clay, Sales Navigator et Apollo.",
      },
      {
        title: "Séquences & copywriting",
        description: "Rédiger des messages multicanaux qui convertissent.",
      },
      {
        title: "Exécution & suivi",
        description: "Prospecter, relancer, qualifier et booker en continu.",
      },
      {
        title: "Reporting & optimisation",
        description: "Itérer chaque semaine pour améliorer les performances.",
      },
    ],
    editorialTitle: "Pourquoi le multicanal surperforme le mono-canal",
    editorialParagraphs: [
      "Le cold email seul atteint les prospects qui lisent leurs emails. Le LinkedIn outreach atteint ceux qui interagissent davantage sur le réseau. Le cold calling déclenche des conversations avec des décideurs très sollicités qui répondent peu par écrit. En combinant ces canaux, vous augmentez mécaniquement votre surface de contact.",
      "L'important n'est pas le volume brut, mais la coordination. Chez devlo, chaque canal sert un objectif précis dans la séquence : l'email ouvre, LinkedIn crédibilise, l'appel accélère. Cette orchestration réduit la dépendance à un canal unique et améliore la régularité du pipeline.",
    ],
    configuratorTitle: "Configurer votre stratégie outbound multicanal",
    configuratorIntro: "Sélectionnez votre contexte pour recevoir une recommandation opérationnelle adaptée.",
    configuratorServiceLabel: "Outbound multicanal",
    configuratorHeader: "=== OUTBOUND MULTICANAL ===",
    configuratorFields: [
      {
        id: "canaux",
        label: "Canaux souhaités",
        type: "multi",
        options: ["Cold Email", "LinkedIn", "Cold Calling", "Multichannel", "Inbound-Led"],
      },
      {
        id: "stade",
        label: "Stade actuel",
        type: "single",
        options: ["Zéro infrastructure", "Infrastructure en place", "Infrastructure à optimiser"],
      },
      {
        id: "volume",
        label: "Volume cible par mois",
        type: "single",
        options: ["<100", "100-500", "500-2000", ">2000"],
      },
      {
        id: "objectif",
        label: "Objectif principal",
        type: "single",
        options: ["RDV qualifiés", "Pipeline prévisible", "Nouveau marché", "Notoriété"],
      },
      {
        id: "delai",
        label: "Délai",
        type: "single",
        options: ["Urgent (<1 mois)", "Court terme (1-3 mois)", "Exploration"],
      },
      {
        id: "defis",
        label: "Défis principaux",
        type: "multi",
        optional: true,
        options: [
          "Faible taux de réponse",
          "Délivrabilité",
          "Données insuffisantes",
          "Personnalisation",
          "Manque de ressources",
          "Inconsistance commerciale",
        ],
      },
    ],
    socialProofTitle: "Résultats clients observés",
    socialProofItems: [
      { client: "Monizze", result: "120 RDV qualifiés", details: "7 000 décideurs ciblés · Belgique · RH" },
      {
        client: "Horus Software",
        result: "200 000 € de CA signé",
        details: "80+ RDV · 60% conversion démo→client",
      },
      {
        client: "CareerLunch",
        result: "54 RDV DACH",
        details: "71% d'ouverture · 29% de clic · 516 prospects",
      },
      {
        client: "APIDAE",
        result: "70 RDV qualifiés",
        details: "UEFA, TAG Heuer, Rothschild · 40% de réponse",
      },
    ],
    caseStudyTag: "outbound",
    faqTitle: "FAQ outbound multicanal",
    faqItems: [
      {
        question: "Combien de temps avant les premiers rendez-vous ?",
        answer:
          "En général 1 à 5 semaines selon l'ICP et les canaux activés. Les marchés de niche prennent souvent 3 à 4 semaines, tandis que certains segments répondent dès la première semaine.",
      },
      {
        question: "Quelle différence entre outbound multicanal et cold email seul ?",
        answer:
          "Le cold email couvre les prospects réactifs à l'email. Le multicanal ajoute LinkedIn et téléphone pour capter les décideurs qui préfèrent d'autres canaux, ce qui améliore fréquemment les taux de réponse de 30 à 60%.",
      },
      {
        question: "Devlo gère-t-il toute la prospection ?",
        answer:
          "Oui, nous pouvons gérer le cycle complet (lead gen, outreach, qualification, prise de RDV) ou intervenir sur une partie précise de la chaîne selon votre organisation interne.",
      },
      {
        question: "Dans quelles langues prospectez-vous ?",
        answer:
          "Nous opérons en français, allemand, anglais et néerlandais pour la Suisse, la Belgique, la France, la région DACH, le Benelux et les marchés internationaux.",
      },
    ],
    ctaTitle: "Prêt à générer vos premiers rendez-vous qualifiés ?",
    ctaSubtitle:
      "Partagez votre contexte via le configurateur ou réservez un échange avec l'équipe devlo pour lancer votre stratégie.",
    relatedServices: RELATED_SERVICES["outbound-multicanal"],
  },
  "cold-email": {
    slug: "cold-email",
    path: "/services/cold-email",
    navTitle: "Cold Email",
    pageTitle: "Cold Email B2B : séquences personnalisées avec 70%+ de taux d'ouverture",
    pageSubtitle: "Infrastructure, copywriting et exécution orientés réponses qualifiées.",
    metadataTitle: "Cold Email B2B : campagnes personnalisées",
    metadataDescription:
      "Agence cold email B2B en Suisse : séquences personnalisées, délivrabilité technique et A/B testing pour générer des rendez-vous qualifiés.",
    metadataKeywords: [
      "cold email B2B",
      "agence cold email",
      "délivrabilité email B2B",
      "séquence email prospection",
      "lemlist agency",
    ],
    heroParagraphs: [
      "Le cold email B2B consiste à contacter des prospects professionnels qui ne vous connaissent pas encore, avec des messages personnalisés conçus pour déclencher une réponse. Bien exécuté, il produit des taux d'ouverture élevés et des conversations commerciales concrètes.",
      "devlo maîtrise l'ensemble de la chaîne : infrastructure d'envoi (domaines secondaires, SPF/DKIM/DMARC, warm-up progressif), copywriting orienté valeur, séquences de 3 à 5 emails, et A/B testing systématique. Nous utilisons lemlist comme base d'exécution, combiné à Clay pour la personnalisation à l'échelle.",
      "Un cold email performant n'est pas un envoi massif. Chaque message doit sembler écrit pour son destinataire — et c'est ce que nous construisons, à partir de données fiables et d'un angle business pertinent.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Audit de l'infrastructure email existante",
      "Setup domaines secondaires, SPF, DKIM, DMARC",
      "Warm-up progressif des boîtes d'envoi",
      "Définition ICP et génération de listes qualifiées",
      "Rédaction de séquences 3 à 5 emails",
      "Icebreakers personnalisés (manuel ou via Clay)",
      "A/B tests objets, hooks et CTAs",
      "Segmentation par marché, langue et industrie",
      "Gestion des réponses et qualification",
      "Reporting délivrabilité, réponse, intérêt et RDV",
    ],
    processTitle: "Processus cold email en 5 étapes",
    processSteps: [
      { title: "Audit", description: "Vérification de la réputation, DNS et risques de spam." },
      { title: "Setup", description: "Mise en place de l'infrastructure et warm-up contrôlé." },
      { title: "Ciblage", description: "Construction liste ICP et personnalisation des messages." },
      { title: "Lancement", description: "Exécution séquences et A/B tests continus." },
      { title: "Qualification", description: "Traitement inbox, relances et booking de rendez-vous." },
    ],
    editorialTitle: "Délivrabilité et message : les deux leviers critiques",
    editorialParagraphs: [
      "Sans délivrabilité, même un excellent message n'est jamais lu. Sans message pertinent, même une bonne délivrabilité ne convertit pas. Notre méthode traite les deux dimensions ensemble : technique et commerciale.",
      "Nous protégeons systématiquement votre domaine principal en utilisant des domaines secondaires d'envoi. C'est une règle structurante pour éviter les impacts sur vos emails transactionnels et votre réputation globale.",
    ],
    configuratorTitle: "Configurer votre campagne cold email",
    configuratorIntro: "Indiquez votre maturité actuelle pour cadrer la stratégie d'exécution.",
    configuratorServiceLabel: "Cold email B2B",
    configuratorHeader: "=== COLD EMAIL B2B ===",
    configuratorFields: [
      {
        id: "infra",
        label: "Infrastructure email existante",
        type: "single",
        options: ["Oui", "Non", "Partiellement"],
      },
      {
        id: "volume",
        label: "Volume d'envoi mensuel",
        type: "single",
        options: ["<500", "500-2000", "2000-10000", ">10000"],
      },
      {
        id: "outil",
        label: "Outil actuel",
        type: "single",
        options: ["lemlist", "Instantly", "Smartlead", "Autre", "Aucun"],
      },
      {
        id: "personnalisation",
        label: "Niveau de personnalisation",
        type: "single",
        options: ["Aucune", "Prénom + entreprise", "Icebreaker manuel", "Clay"],
      },
      {
        id: "probleme",
        label: "Problème principal",
        type: "single",
        options: ["Délivrabilité", "Ouverture", "Réponse", "Copywriting", "Tout"],
      },
      {
        id: "secteur",
        label: "Secteur cible",
        type: "single",
        options: ["Tech", "SaaS", "Finance", "Santé", "Industrie", "Autre"],
      },
    ],
    socialProofTitle: "Exemples de performances email",
    socialProofItems: [
      {
        client: "Lemanvisio",
        result: "89% d'ouverture",
        details: "69% de réponse · 16 RDV qualifiés",
      },
      {
        client: "CareerLunch",
        result: "71% d'ouverture",
        details: "54 RDV en DACH",
      },
      {
        client: "Cegos",
        result: "45% de réponse",
        details: "73% d'ouverture · Suisse alémanique",
      },
      {
        client: "HIAG",
        result: "87% d'ouverture",
        details: "73% de réponse · immobilier",
      },
    ],
    caseStudyTag: "cold-email",
    faqTitle: "FAQ cold email B2B",
    faqItems: [
      {
        question: "Quelle délivrabilité peut-on viser ?",
        answer:
          "Avec une infrastructure correctement configurée, nous observons généralement 96 à 99% de délivrabilité sur les campagnes actives.",
      },
      {
        question: "Combien d'emails faut-il par séquence ?",
        answer:
          "La majorité des campagnes performantes se situe entre 3 et 5 emails sur deux à trois semaines, avec des angles de relance complémentaires.",
      },
      {
        question: "Peut-on utiliser son domaine principal ?",
        answer:
          "Non, nous recommandons des domaines secondaires dédiés au cold email pour protéger la réputation de votre domaine principal.",
      },
      {
        question: "Quelle différence avec l'email marketing ?",
        answer:
          "L'email marketing cible une base opt-in. Le cold email est une prospection B2B ciblée vers des professionnels non engagés, avec des règles d'exécution très différentes.",
      },
    ],
    ctaTitle: "Accélérez vos réponses dès les prochaines semaines",
    ctaSubtitle:
      "Configurez votre campagne et recevez un plan précis de délivrabilité, ciblage et copywriting.",
    relatedServices: RELATED_SERVICES["cold-email"],
  },
  "linkedin-outreach": {
    slug: "linkedin-outreach",
    path: "/services/linkedin-outreach",
    navTitle: "LinkedIn Outreach",
    pageTitle: "Prospection LinkedIn B2B : atteindre vos décideurs là où ils passent leur temps",
    pageSubtitle: "Sales Navigator, messages personnalisés et séquences multicanales.",
    metadataTitle: "LinkedIn Outreach B2B : prospection Sales Navigator",
    metadataDescription:
      "Agence de prospection LinkedIn B2B en Suisse : ciblage Sales Navigator, messages personnalisés et séquences multicanales.",
    metadataKeywords: [
      "linkedin outreach B2B",
      "prospection LinkedIn",
      "LinkedIn Sales Navigator",
      "agence LinkedIn B2B",
    ],
    heroParagraphs: [
      "LinkedIn est le réseau professionnel où se trouvent vos décideurs B2B. La prospection LinkedIn consiste à activer demandes de connexion, messages directs et InMails de manière structurée, avec une personnalisation crédible orientée business.",
      "devlo exploite LinkedIn Sales Navigator pour cibler précisément les bons profils : poste, séniorité, secteur, région, activité récente et signaux contextuels. Nous intégrons ces actions dans des séquences coordonnées avec l'email et le téléphone pour augmenter le taux de conversation commerciale utile.",
      "Cette approche est particulièrement efficace pour les cibles C-level et les secteurs où l'email seul sature. Elle permet aussi de sécuriser une présence relationnelle plus humaine avant la prise de rendez-vous.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Setup LinkedIn Sales Navigator et filtres ICP",
      "Construction des listes prospects et segmentation",
      "Demandes de connexion avec notes personnalisées",
      "Messages post-connexion en 2 à 4 touches",
      "InMails sur comptes non connectés",
      "Intégration LinkedIn + email + calling",
      "Suivi connexions, réponses et rendez-vous",
      "Reporting taux d'acceptation et taux d'intérêt",
    ],
    processTitle: "Processus LinkedIn outreach",
    processSteps: [
      { title: "Ciblage", description: "Définition ICP et création des listes Sales Navigator." },
      { title: "Connexion", description: "Séquences d'invitation et messages adaptés au segment." },
      { title: "Conversation", description: "Relances orientées valeur et qualification rapide." },
      { title: "Orchestration", description: "Coordination avec email et calling selon engagement." },
      { title: "Optimisation", description: "Analyse des réponses et itérations hebdomadaires." },
    ],
    editorialTitle: "Le bon message au bon décideur",
    editorialParagraphs: [
      "Sur LinkedIn, la pertinence contextuelle prime sur la longueur du message. Nos séquences sont construites pour déclencher une réponse rapide sans friction, avec un angle business clair et un call-to-action simple.",
      "L'objectif n'est pas de maximiser le volume d'invitations, mais de maximiser les conversations qualifiées. Nous calibrons donc les volumes pour préserver la santé du compte et la qualité du ciblage.",
    ],
    configuratorTitle: "Configurer votre stratégie LinkedIn",
    configuratorIntro: "Indiquez votre cible et votre niveau d'équipement Sales Navigator.",
    configuratorServiceLabel: "LinkedIn outreach",
    configuratorHeader: "=== LINKEDIN OUTREACH ===",
    configuratorFields: [
      {
        id: "volume",
        label: "Volume de connexions par mois",
        type: "single",
        options: ["<100", "100-300", "300-500", ">500"],
      },
      {
        id: "profils",
        label: "Profils cibles",
        type: "single",
        options: ["C-Level", "VP", "Directeurs", "Managers", "Tous"],
      },
      {
        id: "secteurs",
        label: "Secteurs visés",
        type: "multi",
        options: ["Tech/SaaS", "Finance", "RH", "Santé", "Industrie", "Autre"],
      },
      {
        id: "salesnav",
        label: "Niveau Sales Navigator",
        type: "single",
        options: ["Complet", "Partiel", "Aucun"],
      },
      {
        id: "approche",
        label: "Approche souhaitée",
        type: "single",
        options: ["LinkedIn seul", "LinkedIn + Email", "LinkedIn + Calling", "Multicanal complet"],
      },
      {
        id: "zone",
        label: "Marché géographique",
        type: "single",
        options: ["Suisse", "France", "Belgique", "DACH", "Europe", "International"],
      },
    ],
    socialProofTitle: "Résultats LinkedIn en contexte multicanal",
    socialProofItems: [
      { client: "CareerLunch", result: "54 RDV en DACH", details: "29% de clic · 71% d'ouverture" },
      { client: "Cegos", result: "14 RDV qualifiés", details: "Campagnes FR + DE + EN" },
      { client: "IDDI", result: "Démos accélérées", details: "LinkedIn + Email + Calling" },
      { client: "Saporo", result: "10+ campagnes", details: "Cibles RSSI/CISO multi-pays" },
    ],
    caseStudyTag: "linkedin-outreach",
    faqTitle: "FAQ LinkedIn outreach",
    faqItems: [
      {
        question: "La prospection LinkedIn est-elle conforme RGPD ?",
        answer:
          "Oui, dans un cadre B2B professionnel et pertinent. Nous appliquons une approche contextualisée, non intrusive et orientée intérêt légitime.",
      },
      {
        question: "Combien de connexions peut-on envoyer ?",
        answer:
          "Selon le niveau de compte et le profil, nous calibrons généralement entre 100 et 200 invitations hebdomadaires en restant dans une zone de sécurité.",
      },
      {
        question: "Faut-il utiliser mon profil personnel ?",
        answer:
          "Pas nécessairement. Selon la stratégie, nous pouvons utiliser un profil dédié ou votre profil existant avec gouvernance partagée.",
      },
      {
        question: "LinkedIn est-il plus efficace que le cold email ?",
        answer:
          "Cela dépend de la cible. Pour de nombreux profils seniors, LinkedIn surperforme ; pour d'autres segments, l'email reste plus fort. Le meilleur rendement reste multicanal.",
      },
    ],
    ctaTitle: "Activez LinkedIn comme levier de pipeline",
    ctaSubtitle: "Partagez votre contexte et obtenez une séquence LinkedIn adaptée à vos ICPs.",
    relatedServices: RELATED_SERVICES["linkedin-outreach"],
  },
  "cold-calling": {
    slug: "cold-calling",
    path: "/services/cold-calling",
    navTitle: "Cold Calling",
    pageTitle: "Cold Calling B2B : téléprospection qualifiée pour générer des démos et rendez-vous",
    pageSubtitle: "Scripts sur-mesure, gestion des objections et booking dans votre agenda.",
    metadataTitle: "Cold Calling B2B : téléprospection externalisée",
    metadataDescription:
      "Agence de téléprospection B2B en Suisse : cold calling, qualification téléphonique et prise de rendez-vous qualifiés en FR/DE/EN/NL.",
    metadataKeywords: [
      "cold calling B2B",
      "téléprospection externalisée",
      "qualification téléphonique",
      "agence télémarketing B2B",
    ],
    heroParagraphs: [
      "Le cold calling B2B reste un canal clé pour atteindre les décideurs qui ignorent les emails et les messages LinkedIn. Un appel préparé, contextualisé et mené avec une bonne gestion des objections peut convertir un prospect froid en rendez-vous qualifié en quelques minutes.",
      "Chez devlo, les appels ne sont jamais faits à l'aveugle. Chaque prospect est enrichi en amont, segmenté selon l'ICP et, selon les séquences, préchauffé par email ou LinkedIn. Cette préparation améliore fortement le taux de conversation utile.",
      "Nous opérons en français, allemand, anglais et néerlandais sur des marchés suisses et européens, avec scripts personnalisés, notation de qualification et reporting complet pour votre équipe commerciale.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Construction des listes d'appels validées",
      "Rédaction de scripts adaptés à chaque ICP",
      "Playbook de gestion des objections",
      "Appels de prospection et relances",
      "Qualification téléphonique des réponses intéressées",
      "Prise de rendez-vous dans votre calendrier",
      "Transmission des notes et signaux de conversion",
      "Reporting détaillé des performances d'appels",
    ],
    processTitle: "Processus cold calling",
    processSteps: [
      { title: "Préparation", description: "Ciblage et priorisation des comptes à contacter." },
      { title: "Script", description: "Construction des accroches et réponses aux objections." },
      { title: "Appels", description: "Exécution des sessions de calling et qualification en direct." },
      { title: "Booking", description: "Planification des rendez-vous qualifiés avec passation claire." },
      { title: "Optimisation", description: "Analyse hebdomadaire des appels et ajustements." },
    ],
    editorialTitle: "Quand le téléphone débloque le pipeline",
    editorialParagraphs: [
      "Sur des marchés saturés par l'email, le téléphone crée une rupture de canal qui augmente les conversations. Utilisé au bon moment dans la séquence, il accélère la prise de décision.",
      "Nous privilégions la qualité conversationnelle et la qualification réelle plutôt que le volume d'appels. L'objectif est de livrer des rendez-vous exploitables, pas des appels artificiels.",
    ],
    configuratorTitle: "Configurer votre dispositif de cold calling",
    configuratorIntro: "Définissez volume, langues et niveau de qualification attendu.",
    configuratorServiceLabel: "Cold calling B2B",
    configuratorHeader: "=== COLD CALLING B2B ===",
    configuratorFields: [
      {
        id: "volume",
        label: "Volume d'appels par mois",
        type: "single",
        options: ["<100", "100-500", "500-1000", ">1000"],
      },
      {
        id: "langues",
        label: "Langues de prospection",
        type: "multi",
        options: ["Français", "Allemand", "Anglais", "Néerlandais"],
      },
      {
        id: "mode",
        label: "Mode d'activation",
        type: "single",
        options: ["Calling seul", "Email + Calling", "LinkedIn + Calling", "Multicanal complet"],
      },
      {
        id: "script",
        label: "Script disponible",
        type: "single",
        options: ["Oui", "À co-construire", "À créer intégralement"],
      },
      {
        id: "qualification",
        label: "Qualification attendue",
        type: "single",
        options: ["Prise de RDV", "Discovery call", "Démo produit", "Qualification avancée"],
      },
      {
        id: "secteur",
        label: "Secteur cible",
        type: "single",
        options: ["Tech/SaaS", "Finance", "Santé/Pharma", "Industrie", "Services", "Autre"],
      },
    ],
    socialProofTitle: "Références cold calling",
    socialProofItems: [
      { client: "IDDI", result: "+1 000 appels", details: "Hausse significative des démos" },
      { client: "Abacus", result: "30 prospects en 12 jours", details: "Téléprospection + email" },
      { client: "Locky", result: "15 démos planifiées", details: "20 discovery calls" },
      { client: "Horus", result: "200 000 € de CA", details: "Calling + email + LinkedIn" },
    ],
    caseStudyTag: "cold-calling",
    faqTitle: "FAQ cold calling",
    faqItems: [
      {
        question: "Le cold calling fonctionne-t-il encore ?",
        answer:
          "Oui, particulièrement en complément des séquences email et LinkedIn. Sur des cibles senior, le téléphone reste souvent le canal le plus direct.",
      },
      {
        question: "Quels créneaux sont les plus performants ?",
        answer:
          "En général mardi à jeudi, en matinée et fin d'après-midi. Nous ajustons selon secteur et géographie.",
      },
      {
        question: "Comment gérez-vous les objections ?",
        answer:
          "Chaque mission démarre avec un playbook d'objections spécifique à votre offre pour harmoniser les réponses et améliorer la conversion.",
      },
      {
        question: "Le cold calling B2B est-il conforme RGPD ?",
        answer:
          "Oui, dans le cadre professionnel et selon les réglementations locales. Nous appliquons des pratiques de prospection responsables.",
      },
    ],
    ctaTitle: "Débloquez vos rendez-vous par téléphone",
    ctaSubtitle: "Recevez un plan calling précis, aligné sur votre ICP et vos objectifs commerciaux.",
    relatedServices: RELATED_SERVICES["cold-calling"],
  },
  "intent-data": {
    slug: "intent-data",
    path: "/services/intent-data",
    navTitle: "Intent Data",
    pageTitle: "Intent Data B2B : prospectez au moment précis où vos cibles sont prêtes à acheter",
    pageSubtitle: "Signal-based selling pour prioriser les comptes chauds et accélérer la conversion.",
    metadataTitle: "Intent Data B2B : signal-based selling",
    metadataDescription:
      "Activation de signaux d'intention B2B : levées de fonds, recrutements, migrations technologiques, signaux G2 et intent data multi-sources.",
    metadataKeywords: [
      "intent data B2B",
      "signal-based selling",
      "prospection par signaux",
      "Bombora",
      "Clay intent signals",
    ],
    heroParagraphs: [
      "L'Intent Data désigne les signaux qui indiquent qu'une entreprise est en phase d'évaluation ou de changement : levée de fonds, recrutement clé, migration d'outil, recherche active de solutions. Prospecter sur ces signaux améliore fortement le timing commercial.",
      "Chez devlo, nous identifions et activons ces signaux via Clay, Bombora, LinkedIn Sales Navigator, Apollo, G2, Crunchbase et d'autres sources pertinentes. Chaque signal est enrichi, scoré et transformé en angle de message contextualisé.",
      "Le signal-based selling ne remplace pas l'outbound classique : il permet de prioriser les efforts sur les comptes les plus susceptibles de convertir maintenant.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Mapping des signaux prioritaires par ICP",
      "Connexion des sources intent (company, person, technographic)",
      "Enrichissement contextuel des comptes détectés",
      "Scoring et priorisation des signaux",
      "Création de séquences contextualisées",
      "Activation multicanale des comptes chauds",
      "Analyse de performance par type de signal",
      "Optimisation continue des triggers et messages",
    ],
    processTitle: "Processus intent data en 5 étapes",
    processSteps: [
      { title: "Signal mapping", description: "Identifier les signaux réellement corrélés à l'achat." },
      { title: "Stack setup", description: "Brancher les bonnes sources dans Clay et outils partenaires." },
      { title: "Enrichissement", description: "Ajouter contexte, contacts et priorisation." },
      { title: "Activation", description: "Lancer des séquences spécifiques aux signaux détectés." },
      { title: "Mesure", description: "Comparer les performances signal vs non-signal." },
    ],
    editorialTitle: "Du volume au timing",
    editorialParagraphs: [
      "La valeur de l'intent data vient du timing : contacter une entreprise au moment d'un changement stratégique génère des réponses plus rapides et des conversations plus qualifiées.",
      "Nous transformons ces signaux en workflow opérationnel : détection, qualification, priorisation, message et exécution. C'est un levier fort pour réduire le cycle de vente.",
    ],
    configuratorTitle: "Configurer votre système intent data",
    configuratorIntro: "Sélectionnez vos signaux cibles et votre niveau de maturité opérationnelle.",
    configuratorServiceLabel: "Intent data",
    configuratorHeader: "=== INTENT DATA ===",
    configuratorFields: [
      {
        id: "signaux",
        label: "Signaux prioritaires",
        type: "multi",
        options: ["Company", "Person", "Tech stack", "Community", "Product usage", "Events", "lemlist"],
      },
      {
        id: "urgence",
        label: "Urgence d'activation",
        type: "single",
        options: ["Immédiat (<2 semaines)", "Court terme (1-3 mois)", "Exploration"],
      },
      {
        id: "stack",
        label: "Stack actuelle",
        type: "multi",
        options: ["Clay", "Sales Navigator", "Apollo/ZoomInfo/Cognism", "lemlist/Instantly", "HubSpot/Salesforce", "Aucun"],
      },
      {
        id: "maturite",
        label: "Maturité signal-based",
        type: "single",
        options: ["Découverte", "Compris mais non activé", "Partiellement activé", "À optimiser"],
      },
      {
        id: "volume",
        label: "Volume de signaux mensuel",
        type: "single",
        options: ["<50", "50-200", "200-1000", ">1000"],
      },
      {
        id: "objectif",
        label: "Objectif principal",
        type: "single",
        options: ["Prioriser comptes chauds", "Personnaliser les messages", "Réduire cycle de vente", "Tout"],
      },
    ],
    socialProofTitle: "Exemples de campagnes signal-based",
    socialProofItems: [
      { client: "Saporo", result: "4 500 entreprises ciblées", details: "10+ campagnes cybersécurité" },
      { client: "SquareCo", result: "52 prospects intéressés", details: "74% ouverture · 37% réponse" },
      { client: "IDDI", result: "12,9% de réponse", details: "Pharma/Biotech · 3 semaines" },
      { client: "Cegos", result: "45% de réponse", details: "Campagnes L&D ciblées" },
    ],
    caseStudyTag: "intent-data",
    faqTitle: "FAQ intent data",
    faqItems: [
      {
        question: "Qu'est-ce que l'intent data concrètement ?",
        answer:
          "Ce sont des indicateurs qu'un compte est en phase de recherche active : signaux web, recrutement, actualité entreprise, adoption d'outils ou activité communautaire.",
      },
      {
        question: "Quels outils faut-il pour démarrer ?",
        answer:
          "Clay est généralement le socle. Selon les signaux visés, nous ajoutons Sales Navigator, Bombora, Apollo, Crunchbase, G2 ou vos données first-party.",
      },
      {
        question: "Est-ce que cela remplace l'outbound classique ?",
        answer:
          "Non, cela le priorise. L'outbound classique couvre le TAM, l'intent data concentre l'effort sur les comptes les plus prêts à engager une conversation.",
      },
      {
        question: "Quel délai pour activer une stratégie intent data ?",
        answer:
          "En général 1 à 2 semaines pour le setup, puis 2 à 3 semaines pour les premières séquences opérationnelles et les premiers retours terrain.",
      },
      {
        question: "Quelle est la différence entre intent data et lead scoring classique ?",
        answer:
          "Le lead scoring classique se base sur des critères statiques (taille d'entreprise, secteur). L'intent data détecte des comportements actifs : recherches en ligne, visites sur des sites de comparaison, recrutement de profils spécifiques. C'est un signal de timing, pas juste de fit.",
      },
      {
        question: "L'intent data fonctionne-t-il pour les petites entreprises cibles ?",
        answer:
          "Les signaux sont plus rares pour les TPE. L'intent data est particulièrement efficace pour cibler des entreprises de 50+ employés dans des secteurs où les décisions d'achat laissent des traces digitales.",
      },
    ],
    ctaTitle: "Activez vos signaux d'achat en pipeline réel",
    ctaSubtitle: "Définissez vos triggers prioritaires et lancez une stratégie signal-based structurée.",
    relatedServices: RELATED_SERVICES["intent-data"],
  },
  "enrichissement-clay": {
    slug: "enrichissement-clay",
    path: "/services/enrichissement-clay",
    navTitle: "Enrichissement Clay",
    pageTitle: "Enrichissement Clay & Data B2B : des listes ultra-qualifiées prêtes à prospecter",
    pageSubtitle: "Data enrichment multi-sources, scoring et automatisations orientées conversion.",
    metadataTitle: "Enrichissement Clay B2B : data multi-sources",
    metadataDescription:
      "Agence Clay B2B : enrichissement de prospects via Clay, Apollo, ZoomInfo, Cognism et Crunchbase pour des listes fiables et actionnables.",
    metadataKeywords: [
      "enrichissement Clay B2B",
      "data enrichment",
      "Apollo ZoomInfo Cognism",
      "construction liste prospection",
    ],
    heroParagraphs: [
      "Clay permet d'agréger, enrichir et scorer des données B2B provenant de nombreuses sources en un seul workflow. C'est aujourd'hui la solution la plus flexible pour produire des listes de prospection réellement exploitables.",
      "devlo conçoit des workflows Clay qui combinent firmographie, technographie, validation de contacts et signaux contextuels. Le résultat : des listes enrichies et priorisées, prêtes à être activées dans vos séquences outbound.",
      "Au-delà de Clay, nous orchestrons une stack multi-sources (Apollo, ZoomInfo, Cognism, Crunchbase, Hunter, BuiltWith) afin de limiter les données obsolètes et améliorer la qualité de targeting.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Audit et nettoyage de votre base existante",
      "Construction du TAM et filtres ICP",
      "Enrichissement multi-sources via Clay",
      "Validation emails et téléphones",
      "Scoring prospects selon vos critères business",
      "Génération d'icebreakers contextualisés",
      "Détection stack technologique",
      "Détection signaux financement et croissance",
      "Export formaté pour lemlist, HubSpot, Salesforce",
    ],
    processTitle: "Processus enrichissement en 5 étapes",
    processSteps: [
      { title: "ICP mapping", description: "Définition des critères de qualification." },
      { title: "Source design", description: "Sélection des sources pertinentes par marché." },
      { title: "Workflow Clay", description: "Tables, enrichissement, scoring et automatisations." },
      { title: "Validation", description: "Contrôle qualité emails, téléphones et doublons." },
      { title: "Activation", description: "Livraison structurée pour vos outils commerciaux." },
    ],
    editorialTitle: "La donnée utile avant la volumétrie",
    editorialParagraphs: [
      "Une base volumineuse mais imprécise détruit la performance outbound. Notre priorité est de réduire le bruit : qualifier mieux, enrichir mieux, et ne pousser en campagne que les comptes à forte probabilité de réponse.",
      "Clay est particulièrement puissant quand il est couplé à une logique commerciale claire. Nous ne livrons pas seulement des colonnes de données, mais un système opérationnel réutilisable par votre équipe.",
    ],
    configuratorTitle: "Configurer votre workflow Clay",
    configuratorIntro: "Précisez vos sources, volumes et données prioritaires pour cadrer l'enrichissement.",
    configuratorServiceLabel: "Enrichissement Clay",
    configuratorHeader: "=== ENRICHISSEMENT CLAY ===",
    configuratorFields: [
      {
        id: "clay",
        label: "Avez-vous déjà Clay ?",
        type: "single",
        options: ["Oui (payant)", "Oui (trial)", "Non mais intéressé", "Non, autre outil"],
      },
      {
        id: "sources",
        label: "Sources actuelles",
        type: "multi",
        options: ["Apollo", "ZoomInfo", "Sales Navigator", "Cognism", "Crunchbase", "Base interne", "Aucune"],
      },
      {
        id: "type-liste",
        label: "Type de liste",
        type: "single",
        options: ["Construire de zéro", "Enrichir une liste existante", "Les deux"],
      },
      {
        id: "volume",
        label: "Volume de prospects",
        type: "single",
        options: ["<500", "500-5000", "5000-50000", ">50000"],
      },
      {
        id: "priorites",
        label: "Données prioritaires",
        type: "multi",
        options: ["Emails validés", "Téléphones", "LinkedIn", "Stack tech", "Signaux", "Tout"],
      },
      {
        id: "usage",
        label: "Usage final",
        type: "single",
        options: ["Cold email", "LinkedIn", "Calling", "CRM", "Analyse marché"],
      },
    ],
    socialProofTitle: "Cas d'usage data enrichment",
    socialProofItems: [
      { client: "Horus", result: "900 cabinets qualifiés", details: "10+ sources agrégées" },
      { client: "Abacus", result: "1 600 → 300 qualifiés", details: "Suisse romande" },
      { client: "SquareCo", result: "Validation multi-ICP", details: "Énergie renouvelable" },
      { client: "Locky", result: "26 données/prospect", details: "Data enrichie + icebreakers" },
    ],
    caseStudyTag: "enrichissement-clay",
    faqTitle: "FAQ enrichissement Clay",
    faqItems: [
      {
        question: "Clay est-il adapté à une PME ?",
        answer:
          "Oui, si vous prospectez régulièrement. Le ROI vient de la qualité de ciblage et de la réduction des envois inutiles. Nous pouvons opérer Clay pour vous ou former votre équipe.",
      },
      {
        question: "Quelle différence entre Clay et Apollo ?",
        answer:
          "Apollo est principalement une base de données et un outil d'engagement. Clay est un orchestrateur d'enrichissement multi-sources qui permet de croiser, scorer et automatiser la donnée.",
      },
      {
        question: "Comment garantissez-vous la qualité des données ?",
        answer:
          "Nous croisons plusieurs sources et validons systématiquement les contacts clés (email, téléphone, profil), avec un protocole de contrôle avant activation.",
      },
      {
        question: "Que faire si une source est obsolète ?",
        answer:
          "Nous utilisons une logique de fallback multi-sources pour remplacer les champs obsolètes et conserver une base exploitable.",
      },
    ],
    ctaTitle: "Passez à une base de prospection fiable",
    ctaSubtitle: "Construisez votre moteur data B2B avec un workflow Clay opérationnel.",
    relatedServices: RELATED_SERVICES["enrichissement-clay"],
  },
  "generation-leads": {
    slug: "generation-leads",
    path: "/services/generation-leads",
    navTitle: "Génération de leads",
    pageTitle: "Génération de Leads B2B : construire un pipeline de prospects qualifiés",
    pageSubtitle: "ICP, TAM et qualification des comptes pour alimenter vos campagnes.",
    metadataTitle: "Génération de leads B2B : ICP et listes qualifiées",
    metadataDescription:
      "Agence de génération de leads B2B en Suisse : définition ICP, mapping TAM, qualification manuelle et listes prêtes à prospecter.",
    metadataKeywords: [
      "génération leads B2B",
      "construction ICP",
      "TAM SAM ICP",
      "qualification prospects",
    ],
    heroParagraphs: [
      "La génération de leads B2B consiste à identifier et qualifier des prospects qui correspondent réellement à votre profil de client idéal. C'est la base de toute prospection performante.",
      "Notre méthode démarre par un cadrage ICP précis, puis une construction du TAM, une qualification compte par compte, et l'identification des bons décideurs. Les listes livrées sont enrichies et directement activables.",
      "La performance vient de la précision, pas du volume brut. Une liste courte mais qualifiée convertit mieux qu'une base massive peu filtrée.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Workshop de définition ICP",
      "Mapping TAM et estimation du potentiel",
      "Identification des entreprises cibles",
      "Qualification des comptes selon critères business",
      "Identification des décideurs par compte",
      "Enrichissement email, téléphone, LinkedIn",
      "Préparation des éléments de personnalisation",
      "Livraison CSV ou intégration CRM",
      "Documentation du framework de qualification",
    ],
    processTitle: "Processus génération de leads en 6 étapes",
    processSteps: [
      { title: "Workshop ICP", description: "Définir qui contacter et pourquoi." },
      { title: "TAM Mapping", description: "Mesurer la taille du marché réellement exploitable." },
      { title: "Sourcing", description: "Identifier comptes et segments prioritaires." },
      { title: "Qualification", description: "Filtrer selon vos critères de valeur." },
      { title: "Décideurs", description: "Trouver les bons interlocuteurs dans chaque compte." },
      { title: "Livraison", description: "Exporter une base propre et actionnable." },
    ],
    editorialTitle: "Un pipeline se construit avant de s'envoyer",
    editorialParagraphs: [
      "Les meilleures séquences outbound échouent avec une mauvaise base. Nous traitons la génération de leads comme une discipline à part entière, avec un standard de qualification clair.",
      "La valeur livrée n'est pas seulement la liste finale : c'est aussi la méthode reproductible qui vous permet d'industrialiser votre acquisition.",
    ],
    configuratorTitle: "Configurer votre besoin de lead generation",
    configuratorIntro: "Partagez vos attentes de volume et de précision pour cadrer la mission.",
    configuratorServiceLabel: "Génération de leads",
    configuratorHeader: "=== GENERATION DE LEADS ===",
    configuratorFields: [
      {
        id: "icp",
        label: "Niveau de définition ICP",
        type: "single",
        options: ["Pas défini", "À l'intuition", "Défini et testé", "Très précis (lookalike)"],
      },
      {
        id: "volume",
        label: "Volume de leads souhaité",
        type: "single",
        options: ["<300", "300-1000", "1000-5000", ">5000"],
      },
      {
        id: "zones",
        label: "Géographies cibles",
        type: "multi",
        options: ["Suisse", "France", "Belgique", "DACH", "Benelux", "UK", "US", "Autre"],
      },
      {
        id: "decideurs",
        label: "Niveaux de décideurs",
        type: "multi",
        options: ["C-Level", "VP", "Directeurs", "Managers", "Tous"],
      },
      {
        id: "sources",
        label: "Sources disponibles",
        type: "multi",
        options: ["Sales Navigator", "Apollo", "ZoomInfo", "Cognism", "Aucune", "Plusieurs"],
      },
      {
        id: "delai",
        label: "Délai de livraison",
        type: "single",
        options: ["Urgent (<1 semaine)", "Normal (2-3 semaines)", "Flexible"],
      },
    ],
    socialProofTitle: "Résultats génération de leads",
    socialProofItems: [
      { client: "Abacus", result: "1 600 → 300 qualifiés", details: "30 prospects en 12 jours" },
      { client: "Saporo", result: "4 500 entreprises ciblées", details: "10+ campagnes" },
      { client: "HIAG", result: "622 comptes qualifiés", details: "87% d'ouverture" },
      { client: "CareerLunch", result: "516 prospects ciblés", details: "54 RDV DACH" },
    ],
    caseStudyTag: "generation-leads",
    faqTitle: "FAQ génération de leads",
    faqItems: [
      {
        question: "Différence entre génération de leads et prospection ?",
        answer:
          "La génération de leads construit la base (qui contacter). La prospection exécute le contact (comment et quand contacter).",
      },
      {
        question: "Délai pour une liste de 500 prospects ?",
        answer:
          "En général 5 à 10 jours ouvrés selon la complexité de l'ICP et les zones ciblées.",
      },
      {
        question: "Formats de livraison disponibles ?",
        answer:
          "CSV/Excel, import lemlist/Instantly, ou intégration directe HubSpot/Salesforce selon votre stack.",
      },
      {
        question: "Proposez-vous du lookalike client ?",
        answer:
          "Oui, nous analysons vos meilleurs clients pour extraire les attributs communs et construire des cibles similaires.",
      },
    ],
    ctaTitle: "Construisez une base qui convertit",
    ctaSubtitle: "Recevez une stratégie ICP/TAM et un plan de production de leads qualifiés.",
    relatedServices: RELATED_SERVICES["generation-leads"],
  },
  "qualification-leads": {
    slug: "qualification-leads",
    path: "/services/qualification-leads",
    navTitle: "Qualification de leads",
    pageTitle: "SDR Externalisé & Qualification de Leads : concentrez-vous sur la clôture",
    pageSubtitle: "Qualification opérationnelle et passation claire vers vos équipes commerciales.",
    metadataTitle: "Qualification de leads B2B : SDR externalisé",
    metadataDescription:
      "Service SDR externalisé B2B : qualification des leads entrants/sortants, discovery calls et planification de démos qualifiées.",
    metadataKeywords: [
      "SDR externalisé",
      "qualification leads B2B",
      "discovery call outsourcing",
      "SDR as a service",
    ],
    heroParagraphs: [
      "Le SDR externalisé permet d'ajouter une couche de qualification commerciale sans recruter en interne. devlo opère cette fonction comme une extension de votre équipe, avec vos critères, vos standards et vos objectifs de conversion.",
      "Nous gérons à la fois les leads sortants issus des campagnes outbound et les leads entrants issus de vos formulaires ou demandes directes. Chaque lead est qualifié selon un framework adapté (BANT, MEDDIC, CHAMP ou modèle custom).",
      "L'objectif est simple : transmettre des rendez-vous réellement exploitables à vos Account Executives, avec une passation documentée pour accélérer le closing.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Définition du framework de qualification",
      "Qualification des leads sortants",
      "Qualification des leads entrants",
      "Discovery calls et qualification avancée",
      "Booking des démos dans l'agenda AE",
      "Mise à jour CRM en continu",
      "Passation des notes de qualification",
      "Reporting de conversion et qualité des leads",
    ],
    processTitle: "Processus SDR externalisé",
    processSteps: [
      { title: "Cadrage", description: "Alignement sur l'ICP et le framework de qualification." },
      { title: "Traitement", description: "Qualification des leads entrants et sortants." },
      { title: "Discovery", description: "Appels de qualification et collecte des signaux clés." },
      { title: "Passation", description: "Transmission structurée vers vos commerciaux." },
      { title: "Pilotage", description: "Suivi hebdomadaire des conversions et ajustements." },
    ],
    editorialTitle: "Moins de bruit, plus de closing",
    editorialParagraphs: [
      "Un lead non qualifié mobilise du temps commercial sans potentiel réel. En externalisant la qualification, vous filtrez mieux et concentrez vos AEs sur les opportunités à haute probabilité.",
      "Le SDR n'est pas un simple relais. C'est un maillon stratégique de votre funnel : il transforme un intérêt brut en opportunité commerciale claire.",
    ],
    configuratorTitle: "Configurer votre modèle SDR",
    configuratorIntro: "Définissez vos flux de leads et le niveau de qualification attendu.",
    configuratorServiceLabel: "Qualification de leads",
    configuratorHeader: "=== QUALIFICATION LEADS ===",
    configuratorFields: [
      {
        id: "flux",
        label: "Flux à qualifier",
        type: "single",
        options: ["Outbound", "Inbound", "Les deux"],
      },
      {
        id: "framework",
        label: "Framework actuel",
        type: "single",
        options: ["BANT", "MEDDIC", "CHAMP", "Aucun", "À définir"],
      },
      {
        id: "volume",
        label: "Volume de leads / mois",
        type: "single",
        options: ["<20", "20-100", "100-500", ">500"],
      },
      {
        id: "objectif",
        label: "Objectif de qualification",
        type: "single",
        options: ["Discovery call", "Démo produit", "RDV AE", "Qualification complète"],
      },
      {
        id: "crm",
        label: "CRM utilisé",
        type: "single",
        options: ["HubSpot", "Salesforce", "Pipedrive", "Notion", "Aucun"],
      },
      {
        id: "delai",
        label: "Délai",
        type: "single",
        options: ["Urgent", "Normal", "Exploration"],
      },
    ],
    socialProofTitle: "Références qualification",
    socialProofItems: [
      { client: "Locky", result: "20 discovery calls", details: "15 démos planifiées" },
      { client: "Saporo", result: "Qualification RSSI/CISO", details: "Cybersécurité multi-pays" },
      { client: "IDDI", result: "Démos en hausse", details: "Qualification pharma/biotech" },
      { client: "Horus", result: "60% conversion démo→client", details: "Qualification structurée" },
    ],
    caseStudyTag: "qualification-leads",
    faqTitle: "FAQ SDR externalisé",
    faqItems: [
      {
        question: "Différence SDR et BDR ?",
        answer:
          "Le SDR qualifie les leads et organise les rendez-vous. Le BDR couvre davantage la prospection sortante. Chez devlo, nous adaptons le périmètre selon votre besoin.",
      },
      {
        question: "Comment s'intègre le SDR externalisé à mon équipe ?",
        answer:
          "Via vos outils (CRM, agenda, templates), avec rituels de pilotage et passation standardisée pour conserver la continuité opérationnelle.",
      },
      {
        question: "Pouvez-vous monter en compétence sur notre produit ?",
        answer:
          "Oui, chaque mission inclut un onboarding produit et un calibrage du discours selon votre marché.",
      },
      {
        question: "Quels résultats attendre ?",
        answer:
          "Une meilleure qualité de pipeline, un cycle commercial plus maîtrisé et une réduction du temps perdu sur des leads non pertinents.",
      },
    ],
    ctaTitle: "Externalisez la qualification sans perdre le contrôle",
    ctaSubtitle: "Cadrez votre modèle SDR et recevez un plan d'exécution opérationnel.",
    relatedServices: RELATED_SERVICES["qualification-leads"],
  },
  "prise-de-rendez-vous": {
    slug: "prise-de-rendez-vous",
    path: "/services/prise-de-rendez-vous",
    navTitle: "Prise de rendez-vous",
    pageTitle: "Prise de Rendez-Vous B2B : booking qualifié et gestion inbox pour remplir votre agenda",
    pageSubtitle: "Réactivité, qualification et réduction des no-shows.",
    metadataTitle: "Prise de rendez-vous B2B : booking qualifié",
    metadataDescription:
      "Service de prise de rendez-vous B2B externalisé : gestion inbox, qualification, booking agenda et réduction du no-show.",
    metadataKeywords: [
      "prise de rendez-vous B2B",
      "booking qualifié",
      "gestion inbox prospection",
      "appointment setting",
    ],
    heroParagraphs: [
      "La prise de rendez-vous est le point critique entre prospection et revenu. Un prospect intéressé peut être perdu si la réponse tarde, si la qualification est trop légère, ou si le suivi est insuffisant.",
      "devlo gère l'inbox de manière proactive et réactive : traitement rapide des réponses, qualification des opportunités, booking direct dans votre agenda et relances de confirmation pour sécuriser la présence aux rendez-vous.",
      "Cette discipline opérationnelle améliore la conversion réelle des campagnes outbound et réduit fortement le taux de no-show.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Monitoring inbox sur vos outils d'envoi",
      "Réponses prospects sous 2h ouvrées",
      "Qualification rapide avant booking",
      "Planification dans Calendly/HubSpot/Google Calendar",
      "Relances de confirmation pré-rendez-vous",
      "Reprogrammation des annulations",
      "Nurturing des prospects non mûrs",
      "Reporting : booking, présence, qualité de passation",
    ],
    processTitle: "Processus appointment setting",
    processSteps: [
      { title: "Surveillance", description: "Veille inbox continue et priorisation des réponses." },
      { title: "Qualification", description: "Validation rapide du besoin et du fit prospect." },
      { title: "Booking", description: "Planification du rendez-vous sur les bons créneaux." },
      { title: "Confirmation", description: "Relances ciblées pour limiter les no-shows." },
      { title: "Passation", description: "Transmission des informations clés à votre équipe." },
    ],
    editorialTitle: "De la réponse au rendez-vous réellement utile",
    editorialParagraphs: [
      "Une inbox mal gérée détruit le ROI outbound. La vitesse de réponse et la qualité de qualification font la différence entre un simple intérêt et un rendez-vous exploitable.",
      "Nous traitons chaque interaction avec une logique de conversion : contextualisation, qualification, planification et suivi jusqu'à la présence effective.",
    ],
    configuratorTitle: "Configurer votre système de prise de rendez-vous",
    configuratorIntro: "Définissez vos outils et votre niveau d'exigence sur la qualification.",
    configuratorServiceLabel: "Prise de rendez-vous",
    configuratorHeader: "=== PRISE DE RENDEZ-VOUS ===",
    configuratorFields: [
      {
        id: "agenda",
        label: "Outil de calendrier",
        type: "single",
        options: ["Calendly", "HubSpot", "Google Calendar", "Autre"],
      },
      {
        id: "reactivite",
        label: "Réactivité cible",
        type: "single",
        options: ["<1h", "<2h", "<4h", "Flexible"],
      },
      {
        id: "qualif",
        label: "Qualification avant booking",
        type: "single",
        options: ["Oui, obligatoire", "Selon le cas", "Booking direct"],
      },
      {
        id: "volume",
        label: "Volume RDV mensuel",
        type: "single",
        options: ["<10", "10-30", "30-100", ">100"],
      },
      {
        id: "outil",
        label: "Outil d'envoi actuel",
        type: "single",
        options: ["lemlist", "Instantly", "Smartlead", "Autre", "Aucun"],
      },
      {
        id: "noshow",
        label: "Stratégie no-show",
        type: "single",
        options: ["Relance manuelle forte", "Rappel standard", "Pas encore défini"],
      },
    ],
    socialProofTitle: "Résultats de booking",
    socialProofItems: [
      { client: "Monizze", result: "120 RDV bookés", details: "No-show quasi nul" },
      { client: "APIDAE", result: "70 RDV qualifiés", details: "Comptes premium en Suisse" },
      { client: "Horus", result: "80+ RDV", details: "60% conversion démo→client" },
      { client: "HIAG", result: "11 locataires qualifiés", details: "9 jours avant 1er RDV" },
    ],
    caseStudyTag: "prise-rdv",
    faqTitle: "FAQ prise de rendez-vous",
    faqItems: [
      {
        question: "Comment gérez-vous les fuseaux horaires ?",
        answer:
          "Nous adaptons les créneaux à chaque marché cible et synchronisons les disponibilités avec vos équipes pour éviter les frictions de planification.",
      },
      {
        question: "Comment réduisez-vous les no-shows ?",
        answer:
          "Qualification avant booking, rappels automatisés, puis relance manuelle contextualisée 24h avant le rendez-vous.",
      },
      {
        question: "Que faire en cas d'annulation tardive ?",
        answer:
          "Nous proposons immédiatement des créneaux alternatifs et relançons de façon structurée pour replanifier rapidement.",
      },
      {
        question: "Pouvez-vous gérer la passation vers plusieurs commerciaux ?",
        answer:
          "Oui, nous définissons des règles de routing selon territoire, segment ou spécialité commerciale.",
      },
    ],
    ctaTitle: "Transformez vos réponses en rendez-vous solides",
    ctaSubtitle: "Recevez un plan de gestion inbox et booking adapté à votre organisation.",
    relatedServices: RELATED_SERVICES["prise-de-rendez-vous"],
  },
  "crm-delivrabilite": {
    slug: "crm-delivrabilite",
    path: "/services/crm-delivrabilite",
    navTitle: "CRM & Délivrabilité",
    pageTitle: "CRM & Délivrabilité Email B2B : l'infrastructure technique qui fait réussir vos campagnes",
    pageSubtitle: "HubSpot/Salesforce, DNS email, warm-up et standardisation du pilotage commercial.",
    metadataTitle: "CRM & Délivrabilité B2B : HubSpot, Salesforce",
    metadataDescription:
      "Setup CRM et infrastructure email B2B : HubSpot/Salesforce, SPF-DKIM-DMARC, domaines secondaires, warm-up et monitoring délivrabilité.",
    metadataKeywords: [
      "setup HubSpot",
      "délivrabilité email B2B",
      "SPF DKIM DMARC",
      "CRM outbound",
      "warm-up email",
    ],
    heroParagraphs: [
      "La délivrabilité email et la qualité de configuration CRM déterminent le rendement réel de votre prospection. Sans infrastructure solide, les emails finissent en spam et les leads se perdent dans le pipeline.",
      "devlo configure les fondations techniques : domaines secondaires d'envoi, authentification SPF/DKIM/DMARC, warm-up progressif, rotation de boîtes, puis structuration CRM (pipelines, propriétés, workflows, intégrations).",
      "Avec une base technique saine, vos campagnes gagnent en fiabilité, vos commerciaux gagnent en visibilité, et le pilotage devient mesurable.",
    ],
    coverageTitle: "Ce que couvre ce service",
    coverageItems: [
      "Audit délivrabilité et réputation domaines",
      "Création/configuration domaines secondaires",
      "Setup SPF, DKIM, DMARC, MX",
      "Warm-up progressif et monitoring",
      "Audit CRM existant ou setup from scratch",
      "Configuration pipelines et champs personnalisés",
      "Intégrations lemlist, Clay, Apollo, HubSpot/Salesforce",
      "Workflows de routage et notifications",
      "Formation équipe et documentation opérationnelle",
    ],
    processTitle: "Processus infrastructure & CRM",
    processSteps: [
      { title: "Audit", description: "Évaluer les risques techniques et les gaps CRM." },
      { title: "Architecture", description: "Définir domaines, boîtes, outils et modèle de données." },
      { title: "Implémentation", description: "Configurer DNS, CRM, intégrations et workflows." },
      { title: "Validation", description: "Tester délivrabilité, tracking et qualité des données." },
      { title: "Adoption", description: "Former l'équipe et installer les rituels de pilotage." },
    ],
    editorialTitle: "Une prospection performante commence par le socle technique",
    editorialParagraphs: [
      "Le copywriting et le ciblage ne suffisent pas si les emails n'arrivent pas en inbox. C'est pourquoi nous traitons la délivrabilité comme un chantier prioritaire avant montée en volume.",
      "Côté CRM, la clé est la discipline des données. Un pipeline propre, des propriétés bien pensées et des intégrations stables améliorent directement la vitesse de traitement commercial.",
    ],
    configuratorTitle: "Configurer votre chantier CRM & délivrabilité",
    configuratorIntro: "Priorisez vos besoins techniques pour construire une base fiable.",
    configuratorServiceLabel: "CRM & délivrabilité",
    configuratorHeader: "=== CRM & DELIVRABILITE ===",
    configuratorFields: [
      {
        id: "crm",
        label: "CRM actuel",
        type: "single",
        options: ["HubSpot", "Salesforce", "Pipedrive", "Notion", "Aucun", "Autre"],
      },
      {
        id: "besoin",
        label: "Besoin principal",
        type: "single",
        options: ["Délivrabilité email", "Setup CRM", "Les deux", "Formation équipe"],
      },
      {
        id: "infra",
        label: "Infrastructure email actuelle",
        type: "single",
        options: ["Aucune", "Domaine principal utilisé", "Domaines secondaires en place"],
      },
      {
        id: "outil",
        label: "Outil d'envoi",
        type: "single",
        options: ["lemlist", "Instantly", "Smartlead", "Autre", "Aucun"],
      },
      {
        id: "equipe",
        label: "Taille équipe commerciale",
        type: "single",
        options: ["1-2", "3-5", "6-15", ">15"],
      },
      {
        id: "delai",
        label: "Délai de mise en place",
        type: "single",
        options: ["Urgent (<2 semaines)", "Normal (3-4 semaines)", "Flexible"],
      },
    ],
    socialProofTitle: "Références infrastructure et CRM",
    socialProofItems: [
      { client: "Monizze", result: "96–99% délivrabilité", details: "6 000+ envois" },
      { client: "Horus", result: "400 000 € pipeline", details: "Stack multi-sources" },
      { client: "Abacus", result: "69% de réponse", details: "Setup robuste Suisse romande" },
      { client: "Locky", result: "Processus CRM structuré", details: "Suivi et coaching commercial" },
    ],
    caseStudyTag: "crm-delivrabilite",
    faqTitle: "FAQ CRM & délivrabilité",
    faqItems: [
      {
        question: "Pourquoi éviter le domaine principal pour le cold email ?",
        answer:
          "Pour protéger la réputation de votre domaine corporate. Les domaines secondaires isolent le risque et sécurisent vos communications critiques.",
      },
      {
        question: "Combien de temps dure le warm-up ?",
        answer:
          "Typiquement 4 à 8 semaines selon le volume cible et l'historique de réputation des boîtes.",
      },
      {
        question: "HubSpot gratuit suffit-il ?",
        answer:
          "Pour un volume limité, oui. Au-delà, une version payante est souvent nécessaire pour les automatisations, le reporting et la collaboration commerciale.",
      },
      {
        question: "Proposez-vous un audit HubSpot existant ?",
        answer:
          "Oui, avec diagnostic des données, pipeline, workflows et intégrations, puis plan d'actions priorisé.",
      },
      {
        question: "Quels sont les protocoles d'authentification email essentiels ?",
        answer:
          "SPF, DKIM et DMARC sont indispensables. Nous configurons les trois pour chaque domaine d'envoi, plus les DNS inversés et les enregistrements MX. Sans ça, vos emails finissent en spam.",
      },
      {
        question: "Peut-on garder Salesforce au lieu de HubSpot ?",
        answer:
          "Absolument. Nous travaillons avec HubSpot, Salesforce, Pipedrive et d'autres CRM. L'important est que le CRM soit correctement configuré pour suivre le pipeline outbound et synchroniser les données avec vos outils de prospection.",
      },
    ],
    ctaTitle: "Fiabilisez votre machine commerciale",
    ctaSubtitle: "Partagez votre stack actuelle et recevez un plan de correction CRM/délivrabilité.",
    relatedServices: RELATED_SERVICES["crm-delivrabilite"],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGE_DATA) as ServiceSlug[];
