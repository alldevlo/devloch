export type NavLink = {
  label: string;
  href: string;
};

export type HomeLogo = {
  src: string;
  alt: string;
};

export type HomeCard = {
  title: string;
  text: string;
};

export type MethodStep = {
  title: string;
  text: string;
  icon: "Target" | "PenTool" | "LayoutTemplate" | "Database" | "Send" | "CalendarCheck";
};

export type WrittenTestimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  photo: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CaseStudyCard = {
  slug: string;
  client: string;
  title: string;
  metrics: string[];
  sector: string;
  banner: string;
  logo?: string;
};

export const mainNav = {
  logo: "/images/devlo_Logo_Name.webp",
  links: [
    { label: "Agence", href: "/" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Outbound Academy", href: "/academy" },
  ] as NavLink[],
  cta: {
    label: "Consultation gratuite",
    href: "/consultation",
  },
};

export const homeSeo = {
  title: "Agence de prospection commerciale B2B en Suisse | Génération de leads | devlo",
  description:
    "devlo est une agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés. Cold email, LinkedIn, téléprospection. +1'000 campagnes réussies. Consultation gratuite.",
  ogTitle: "Agence de prospection B2B Suisse | Génération de leads qualifiés | devlo",
  ogDescription:
    "devlo conçoit et pilote vos campagnes de prospection commerciale B2B multicanal pour générer des rendez-vous qualifiés avec vos prospects idéaux.",
};

export const homeContent = {
  hero: {
    badge: "🇨🇭 Agence suisse · +1'000 campagnes lancées",
    h1: "Boostez votre prospection commerciale B2B avec notre agence de génération de leads et de téléprospection",
    h2: "Nous prenons des rendez-vous qualifiés pour vous : externalisez votre développement commercial B2B à notre agence.",
    paragraph:
      "Plus que des consultants : votre partenaire de confiance n°1 pour la génération de leads, la prospection multicanal et la prise de rendez-vous B2B.",
    ctaPrimary: { label: "Planifier votre consultation gratuite →", href: "/consultation" },
    ctaSecondary: { label: "Voir nos résultats →", href: "/etudes-de-cas" },
    wistiaMediaId: "cr7dgltkvu",
    posterSrc: "/images/home/academy/web-showcase.jpg",
    posterAlt: "Aperçu de la vidéo de présentation de devlo",
    videoTestimonial: {
      client: "Etienne Auvillain",
      role: "Directeur Général",
      company: "Cegos",
      line: "45% de taux de réponse grâce à notre approche multicanal personnalisée →",
      href: "/etudes-de-cas/formation-14-rendez-vous",
    },
    microProof: "⭐ 4.9/5 satisfaction client · 7% taux d'intérêt moyen · +1'000 campagnes",
  },
  rendezVousTitle: "Rendez-vous commerciaux obtenus avec",
  rendezVousLogos: [
    { src: "/images/Logo_ABB.png", alt: "Logo ABB" },
    { src: "/images/Logo_Adecco.png", alt: "Logo Adecco" },
    { src: "/images/Logo_Apple.png", alt: "Logo Apple" },
    { src: "/images/Logo_BCF.png", alt: "Logo BCF" },
    { src: "/images/Logo_BHP.png", alt: "Logo BHP" },
    { src: "/images/Logo_DPD.png", alt: "Logo DPD" },
    { src: "/images/Logo_Hublot.png", alt: "Logo Hublot" },
    { src: "/images/Logo_Implenia.png", alt: "Logo Implenia" },
    { src: "/images/Logo_LafargeHolcim.png", alt: "Logo LafargeHolcim" },
    { src: "/images/Logo_Lombard_Odier.png", alt: "Logo Lombard Odier" },
    { src: "/images/Logo_Longines.png", alt: "Logo Longines" },
    { src: "/images/Logo_Merck.png", alt: "Logo Merck" },
  ] as HomeLogo[],
  videoTestimonials: {
    title: "Ce que disent nos clients",
    items: [
      {
        title: "Témoignage vidéo — Cegos",
        wistiaMediaId: "knadmb8za5",
        posterSrc: "/images/Cegos_banner.webp",
        posterAlt: "Bannière de l'étude de cas Cegos en prospection B2B",
        client: "Etienne Auvillain",
        role: "Directeur Général",
        metric: "45% de taux de réponse grâce à notre approche multicanal personnalisée",
        linkLabel: "→ vers étude de cas Cegos",
        href: "/etudes-de-cas/formation-14-rendez-vous",
      },
      {
        title: "Témoignage vidéo — Abacus",
        wistiaMediaId: "cr7dgltkvu",
        posterSrc: "/images/Abacus_banner.webp",
        posterAlt: "Bannière de l'étude de cas Abacus en génération de leads immobiliers",
        client: "Stephan Nuzzolo",
        role: "Directeur",
        metric: "Plus de 30 prospects intéressés générés pour leur solution",
        linkLabel: "→ vers étude de cas Abacus",
        href: "/etudes-de-cas/immobilier-30-prospects",
      },
      {
        title: "Témoignage vidéo — Apidae",
        wistiaMediaId: "w9ews1v05q",
        posterSrc: "/images/APIDAE_banner.webp",
        posterAlt: "Bannière de l'étude de cas APIDAE sur la biodiversité",
        client: "Tanguy Coustaline",
        role: "Président",
        metric: "70 rendez-vous qualifiés avec des marques prestigieuses",
        linkLabel: "→ vers étude de cas Apidae",
        href: "/etudes-de-cas/biodiversite-70-rendez-vous",
      },
    ],
  },
  clientsTitle: "Nos clients",
  clientsLogos: [
    "Asset-10.webp",
    "Asset-71.webp",
    "Asset-11.webp",
    "Asset-21.webp",
    "Asset-31.webp",
    "Asset-41.webp",
    "Asset-51.webp",
    "Asset-61.webp",
    "Asset-81.webp",
    "Asset-91.webp",
    "Asset-101.webp",
    "Asset-111.webp",
    "Asset-121.webp",
    "Asset-131.webp",
    "Asset-141.webp",
    "Asset-151.webp",
    "Asset-161.webp",
    "Asset-171.webp",
    "Asset-181.webp",
    "Asset-191.webp",
    "Asset-201.webp",
    "Asset-211.webp",
    "Asset-221.webp",
    "Asset-231.webp",
    "Asset-241.webp",
    "Asset-251.webp",
  ],
  noRecruitTitle: "Développez votre chiffre d'affaires sans recruter",
  noRecruitCards: [
    {
      title: "Concentrez votre équipe sur le closing",
      text: "Votre équipe commerciale est précieuse. Si elle cherche des leads, vous perdez de l'argent. Nous prospectons pour que votre équipe puisse faire des démos, négocier et conclure.",
    },
    {
      title: "Maîtrisez vos coûts d'acquisition",
      text: "Recruter des SDR coûte cher et comporte des risques. La formation prend des mois. Le turnover est élevé. Externalisez votre développement commercial et transformez des coûts fixes en investissements prévisibles.",
    },
    {
      title: "Validez de nouveaux marchés rapidement",
      text: "La croissance exige des tests rapides. Nous explorons de nouveaux marchés et testons vos offres pour que vous puissiez valider l'adéquation produit-marché sans risque.",
    },
  ] as HomeCard[],
  methodTitle: "Notre méthodologie de prospection outbound en 6 étapes",
  methodSteps: [
    {
      title: "Ciblage de précision",
      text: "Nous ne devinons jamais. Nous créons un Profil Client Idéal (ICP) précis avec vous. Nous sélectionnons les secteurs, tailles d'entreprise et fonctions qui génèrent votre chiffre d'affaires.",
      icon: "Target",
    },
    {
      title: "Alignement de la proposition de valeur",
      text: "Nous étudions votre marque. Nous extrayons vos arguments commerciaux et vos success stories. Nous construisons un message que les décideurs remarquent.",
      icon: "PenTool",
    },
    {
      title: "Stratégie de campagne",
      text: "Nous concevons des séquences de prospection sur mesure — email, LinkedIn et téléphone — pour maintenir votre marque en top of mind.",
      icon: "LayoutTemplate",
    },
    {
      title: "Sourcing et vérification des données",
      text: "Nous trouvons les prospects qui correspondent à votre ICP. Nous vérifions les informations de contact pour garantir une haute délivrabilité et un faible taux de rebond.",
      icon: "Database",
    },
    {
      title: "Activation multicanal",
      text: "Nous lançons la prospection. Nous gérons les réponses et filtrons les contacts non intéressés pour ne vous transmettre que l'intérêt réel.",
      icon: "Send",
    },
    {
      title: "Qualification et prise de rendez-vous",
      text: "Nous qualifions les leads par budget et autorité décisionnelle. Quand un lead est prêt, nous planifions votre rendez-vous.",
      icon: "CalendarCheck",
    },
  ] as MethodStep[],
  whyTitle: "Pourquoi choisir devlo comme partenaire",
  whyCards: [
    {
      title: "Stack technologique entreprise",
      text: "Les ventes modernes exigent des outils puissants. Nous déployons Clay, Lemlist et Sales Navigator pour que vous bénéficiez d'un stack technologique de niveau entreprise sans frais de licence ni de configuration supplémentaires.",
    },
    {
      title: "Agilité et optimisation",
      text: "Si une campagne perd en efficacité, nous analysons rapidement, ajustons et pivotons si nécessaire. Nous conduisons des tests A/B sur les objets d'email et les propositions de valeur pour améliorer les performances.",
    },
    {
      title: "Culture de la performance",
      text: "Nous sommes plus qu'un prestataire. Nous sommes votre partenaire de croissance. Nous fixons des objectifs clairs et rendons compte en toute transparence. Nous construisons un pipeline régulier pour soutenir votre entreprise sur le long terme.",
    },
    {
      title: "Investissement prévisible",
      text: "Nous transformons les coûts de recrutement fixes en investissements variables prévisibles avec un Coût d'Acquisition Client (CAC) inférieur aux équipes internes. Nos modèles tarifaires incluent des forfaits mensuels, des tarifs par rendez-vous obtenu et des honoraires par projet. Les investissements démarrent généralement à partir de CHF 3'000 par mois. Vous voyez clairement votre coût par lead, avec un ROI généralement visible dès les premières semaines.",
    },
    {
      title: "Lancement rapide",
      text: "Nous configurons tout — technologie et ICP — pour lancer votre campagne en 21 jours. Vous n'avez besoin d'aucune infrastructure ni d'aucun outil existant.",
    },
    {
      title: "Collaboration transparente",
      text: "Nous agissons comme une extension de votre équipe. Nous envoyons des rapports hebdomadaires et mensuels sur les taux d'ouverture, de réponse et le pipeline. Nous intégrons vos retours et ajustons nos stratégies en temps réel.",
    },
    {
      title: "Stratégie globale sur mesure",
      text: "Nous créons des Profils Clients Idéaux stricts et des approches personnalisées par secteur et par langue. Nous maîtrisons le français, l'allemand et l'anglais. Votre message s'adapte à votre audience et à ses réglementations.",
    },
    {
      title: "Fiabilité prouvée",
      text: "Nous livrons des campagnes professionnelles et des leads à forte intention. Nous dépassons systématiquement les benchmarks d'engagement du secteur. Si les résultats baissent, nous corrigeons notre approche pour maintenir votre pipeline plein.",
    },
  ] as HomeCard[],
  writtenTitle: "Ils nous font confiance",
  writtenTestimonials: [
    {
      quote:
        "Travailler avec devlo a été un vrai plaisir. La communication était très fluide et l'équipe toujours réactive. Leur approche personnalisée nous a permis de combiner volume et qualité, même si l'audience cible était difficile à atteindre. Il n'y a eu pratiquement aucun no-show, et les rendez-vous étaient toujours qualifiés et efficaces. Les enseignements tirés des campagnes sont également instructifs et très précieux.",
      author: "Anthony Crémer",
      role: "Revenue Ops Analyst",
      company: "Monizze",
      photo: "/images/Anthony_CREMER.jpg",
    },
    {
      quote:
        "Je suis convaincu que devlo est un partenaire idéal pour les start-ups qui cherchent à valider leur product-market fit et à obtenir un maximum de rendez-vous qualifiés avec très peu de temps et de ressources. Le professionnalisme de son fondateur Charles a rendu tout le processus, de la génération de leads à la structuration de campagne et l'obtention de rendez-vous, une collaboration très agréable et efficace. Pour donner une perspective, notre première campagne avec devlo : 81% de taux d'ouverture, 54% de taux de réponse et 16% des organisations intéressées par un rendez-vous avec Saporo. C'est remarquablement efficace, surtout dans un secteur aussi complexe que la cybersécurité.",
      author: "Olivier Eyries",
      role: "CEO",
      company: "Saporo",
      photo: "/images/Olivier-Eyries.jpg",
    },
    {
      quote:
        "Installer des ruches sur le toit de votre entreprise ne vient pas spontanément à l'esprit ! C'est là que devlo est intervenu ! La connaissance et l'expérience de devlo en développement commercial nous ont permis d'avancer rapidement et de rencontrer des prospects qualifiés. À la fin de notre première campagne, sur 270 leads, nous avons obtenu un taux de réponse de 39% et 13% d'entre eux étaient intéressés à en savoir plus sur notre organisation. C'est maintenant à nous de transformer l'essai et de convaincre de nouveaux partenaires de soutenir la biodiversité avec APIDAE.",
      author: "Tanguy Coustaline",
      role: "Président",
      company: "APIDAE",
      photo: "/images/Tanguy-Coustaline.webp",
    },
    {
      quote:
        "Charles est parmi les experts commerciaux les plus créatifs et enthousiastes que je connaisse. J'ai travaillé avec lui sur plusieurs campagnes. Il nous a aidés à mettre en place des campagnes de prospection hyper-personnalisées, à atteindre des centaines de prospects et finalement à obtenir des rendez-vous commerciaux qualifiés. De plus, il nous a aussi conseillés pour affiner notre processus de vente, ce qui a été très utile pour l'ensemble du département commercial. Je recommande vivement ses compétences et services à toutes les startups et PME qui veulent passer rapidement au niveau supérieur.",
      author: "Raphael Haut",
      role: "Head of Business Development & Marketing",
      company: "CareerLunch",
      photo: "/images/Raphael-haut.jpg",
    },
    {
      quote:
        "Nous avons vraiment apprécié la diligence, la communication claire et le dévouement de devlo. Sur 285 prospects, nous avons reçu 200 réponses, soit plus de 70%. L'un de nos défis était d'améliorer nos méthodes de prospection. Avec devlo, nous avons affiné notre ciblage et notre approche avec lemlist. Nous avons aussi identifié deux types de Profils Clients Idéaux : les établissements d'enseignement privés et publics. Nous avons contacté les deux et validé l'ICP le plus réceptif à notre offre.",
      author: "Xavier Leuthold",
      role: "Fondateur",
      company: "Many Ways SA",
      photo: "/images/Xavier_Leuthold.jpg",
    },
  ] as WrittenTestimonial[],
  ctaMid: {
    title: "Prêt à renforcer votre pipeline ?",
    text: "Réservez votre consultation cette semaine pour discuter de vos objectifs commerciaux. En planifiant un rendez-vous maintenant, nous pouvons élaborer un plan de prospection adapté à vos besoins et vous aider à atteindre vos objectifs efficacement. Passez à l'étape suivante vers des opportunités régulières et qualifiées.",
    h3: "Planifiez votre session stratégique",
    h3Text:
      "Obtenez une consultation gratuite et sans engagement pour découvrir comment nous pouvons vous aider à signer de nouveaux clients et accroître votre présence dans vos secteurs clés.",
    cta: { label: "Planifier ma consultation gratuite →", href: "/consultation" },
  },
  faqTitle: "Questions fréquentes",
  faqs: [
    {
      question: "Qu'est-ce que devlo et que fait cette agence de prospection commerciale B2B ?",
      answer:
        "devlo est une agence de prospection commerciale et de génération de leads B2B basée en Suisse, avec un bureau aux États-Unis. L'agence conçoit et pilote des programmes de développement commercial externalisé pour les entreprises qui vendent à d'autres entreprises. devlo aide ses clients à générer des leads B2B, construire des pipelines qualifiés et obtenir des rendez-vous grâce au cold outreach, au cold email, à la téléprospection et à la prospection multicanal. L'agence se concentre sur la stratégie, la génération de leads, la création de bases de données, la prospection, la qualification et la prise de rendez-vous, pour que les équipes commerciales puissent se concentrer sur les démos et le closing.",
    },
    {
      question: "Qu'est-ce qu'une campagne de prospection multicanal ?",
      answer:
        "Une campagne multicanal combine plusieurs points de contact — emails hyper-personnalisés, messages LinkedIn et téléprospection — pour maximiser la portée et l'engagement. Cette stratégie génère des taux de réponse et de conversion significativement plus élevés que les approches monocanal.",
    },
    {
      question: "devlo est-elle l'une des meilleures agences de prospection B2B en Suisse ?",
      answer:
        "devlo accompagne les entreprises B2B suisses depuis 2020. C'est une agence spécialisée en prospection commerciale et génération de leads B2B travaillant avec des entreprises suisses et internationales. Les clients choisissent devlo quand ils veulent un partenaire capable de concevoir et exécuter des campagnes de cold outreach et de prospection multicanal en leur nom. L'agence a de l'expérience dans des secteurs comme le logiciel, la cybersécurité, l'immobilier, les smart cities, les services professionnels et les organisations à but non lucratif, et a généré des milliers de rendez-vous qualifiés pour ses clients.",
    },
    {
      question: "Quels services propose devlo pour la génération de leads et le cold outreach B2B ?",
      answer:
        "devlo propose une suite complète de services de développement commercial B2B. L'agence aide ses clients à définir leurs Profils Clients Idéaux, créer et nettoyer des bases de données de prospects, et concevoir des stratégies de cold outreach. devlo pilote ensuite des campagnes de prospection multicanal utilisant le cold email, LinkedIn et la téléprospection pour engager la conversation avec les décideurs. L'équipe qualifie également les leads, identifie le budget et l'autorité, et planifie les rendez-vous et démos directement dans le calendrier du client. En complément, devlo peut former les équipes internes (SDR et BDR) pour améliorer leurs propres compétences en prospection B2B.",
    },
    {
      question: "Comment fonctionne concrètement le développement commercial externalisé avec devlo ?",
      answer:
        "Avec devlo, le développement commercial externalisé suit un processus structuré. Premièrement, devlo travaille avec le client pour définir le marché cible, les profils de prospects idéaux, les messages clés et la proposition de valeur. Deuxièmement, l'agence construit ou enrichit la base de données de leads et prépare des séquences de prospection multicanal pour le cold email, LinkedIn et les appels. Troisièmement, devlo lance les campagnes, monitore les performances, gère les réponses et qualifie les leads. Enfin, l'équipe planifie les rendez-vous qualifiés et les démos dans le calendrier du client et partage des rapports réguliers sur les taux d'ouverture, de réponse, d'intérêt et la valeur du pipeline.",
    },
    {
      question: "devlo peut-elle m'aider à générer des leads B2B sans recruter d'équipe SDR interne ?",
      answer:
        "Oui. devlo est conçu pour les entreprises qui veulent générer des leads B2B sans construire une grande équipe SDR ou BDR interne. En externalisant la prospection et la génération de leads à devlo, une entreprise peut rapidement lancer des campagnes de cold outreach, tester de nouveaux marchés et développer son pipeline. L'agence gère la prospection, la qualification des leads et la prise de rendez-vous, pendant que l'équipe commerciale du client se concentre sur les démos, les propositions et le closing.",
    },
    {
      question: "Avec quel type d'entreprises devlo travaille-t-elle habituellement ?",
      answer:
        "devlo travaille exclusivement avec des entreprises B2B, c'est-à-dire des organisations qui vendent des produits ou services à d'autres entreprises. Les clients incluent des éditeurs de logiciels et SaaS, des entreprises de cybersécurité, des sociétés industrielles et immobilières, des prestataires de services professionnels, des organisations de formation et des associations à but non lucratif. La plupart des clients veulent accélérer leur acquisition de clients B2B, générer plus de leads qualifiés et améliorer leur performance outbound en Europe et dans d'autres régions.",
    },
    {
      question: "Que garantissez-vous ?",
      answer:
        "Nous garantissons une exécution professionnelle, des leads à forte intention et des rendez-vous planifiés directement dans votre calendrier. Nos campagnes génèrent un taux d'intérêt positif moyen de 7%, délivrant des métriques d'engagement bien au-dessus des benchmarks du secteur.",
    },
    {
      question: "L'investissement en vaut-il la peine ?",
      answer:
        "Absolument. Le Coût d'Acquisition Client (CAC) de la prospection externalisée est significativement inférieur au développement d'une équipe SDR interne (salaires, charges, stack technologique, formation). De plus, vous obtenez des résultats rapides et basés sur les données, avec un ROI prouvable dès les premières semaines.",
    },
    {
      question: "Nous n'avons aucune infrastructure commerciale existante. Est-ce un problème ?",
      answer:
        "Pas du tout. C'est souvent le scénario idéal. Nous construisons votre moteur de prospection outbound de A à Z : définition de l'ICP, copywriting, création de listes de leads, exécution des campagnes et prise de rendez-vous. Vous n'avez besoin d'aucun stack commercial préexistant pour démarrer.",
    },
    {
      question: "Qu'est-ce qu'un prospect ?",
      answer:
        "Un prospect est un compte ou un décideur qui correspond à votre Profil Client Idéal (ICP) et qui a manifesté un intérêt pour votre proposition de valeur. Chez devlo, nous sourçons, engageons et qualifions ces leads avant de vous les transmettre sous forme de rendez-vous commerciaux qualifiés (SQA).",
    },
    {
      question: "Pourquoi la prospection B2B proactive est-elle essentielle ?",
      answer:
        "La prospection outbound vous permet de contrôler la génération de votre pipeline, de cibler chirurgicalement votre ICP et d'accélérer votre croissance sans dépendre uniquement des leads entrants. C'est la source de revenus la plus directe et la plus prévisible.",
    },
    {
      question: "devlo peut-elle aider à réduire la durée de notre cycle de vente B2B ?",
      answer:
        "devlo ne contrôle pas chaque étape d'un cycle de vente, mais peut aider à le raccourcir de plusieurs façons. Premièrement, l'agence se concentre sur les prospects qui correspondent étroitement aux Profils Clients Idéaux, ce qui améliore la qualité des leads. Deuxièmement, devlo qualifie les leads avant de planifier les rendez-vous, pour que les équipes commerciales passent du temps avec des décideurs qui ont un besoin réel et un budget. Troisièmement, des messages clairs et un suivi structuré facilitent le passage du premier contact à la démo puis à la proposition.",
    },
    {
      question: "devlo propose-t-elle des formations pour les commerciaux B2B, SDR et BDR ?",
      answer:
        "Oui. En plus de piloter des campagnes externalisées, devlo peut former les commerciaux B2B, SDR et BDR aux techniques de prospection modernes. Cette formation couvre des sujets comme la rédaction de cold emails, la téléprospection, la prospection LinkedIn, la prospection multicanal, la qualification des leads et la gestion du pipeline. L'objectif est d'aider les équipes commerciales internes à adopter une méthodologie de développement commercial B2B reproductible et à améliorer leurs résultats.",
    },
    {
      question: "Comment contacter devlo ?",
      answer: "Planifions une consultation pour discuter de vos stratégies de prospection commerciale.",
    },
  ] as FaqItem[],
};

export const caseStudiesSeo = {
  title: "Études de cas prospection B2B | Résultats clients | devlo",
  description:
    "Découvrez comment devlo a aidé ses clients B2B à générer des centaines de rendez-vous qualifiés. Études de cas détaillées avec métriques réelles : taux d'ouverture, taux de réponse, rendez-vous obtenus.",
  h1: "Nos résultats : études de cas en prospection B2B",
  subtitle:
    "Découvrez comment nous aidons nos clients à générer des rendez-vous qualifiés et à développer leur pipeline commercial.",
};

export const caseStudiesCards: CaseStudyCard[] = [
  {
    slug: "careerlunch-54-rendez-vous-dach",
    client: "CareerLunch",
    banner: "/images/CareerLunch_banner1.webp",
    logo: "/images/case-studies/logos/hr-54-rendez-vous-dach-logo.webp",
    title:
      "Comment notre agence de prospection B2B a aidé CareerLunch à obtenir 54 rendez-vous commerciaux dans la région DACH",
    metrics: ["71% ouverture", "29% clic", "19% réponse", "10% intérêt", "54 rendez-vous"],
    sector: "HR-tech",
  },
  {
    slug: "cortexia-71-rendez-vous-decideurs-urbains",
    client: "Client confidentiel",
    banner: "/images/case-studies/heroes/proprete-urbaine-71-rendez-vous-hero.webp",
    logo: "",
    title:
      "Comment une entreprise de gestion de la propreté par IA a obtenu 71 rendez-vous avec les décideurs des grandes villes",
    metrics: ["78% ouverture", "36% réponse", "71 rendez-vous", "24% de villes intéressées"],
    sector: "Smart City / IA",
  },
  {
    slug: "squareco-52-prospects-interesses-biocarburants",
    client: "SquareCo",
    banner: "/images/SquareCo_banner.webp",
    logo: "/images/case-studies/logos/biocarburants-52-rendez-vous-logo.webp",
    title:
      "Comment identifier les meilleurs Profils Clients Idéaux parmi plusieurs buyer personas grâce au cold outreach",
    metrics: ["74% ouverture", "37% réponse", "9% intérêt", "52 prospects intéressés"],
    sector: "Énergie renouvelable",
  },
  {
    slug: "cegos-45-taux-reponse",
    client: "Cegos",
    banner: "/images/Cegos_banner.webp",
    logo: "/images/case-studies/logos/formation-14-rendez-vous-logo.webp",
    title:
      "Succès en prospection B2B : 50% de taux de réponse auprès des responsables Learning & Development en Suisse",
    metrics: ["73% ouverture", "45% réponse", "14 rendez-vous qualifiés"],
    sector: "Formation / L&D",
  },
  {
    slug: "lemanvisio-16-rendez-vous-architectes",
    client: "Lemanvisio",
    banner: "/images/LEMANVISIO_banner.webp",
    logo: "/images/case-studies/logos/audiovisuel-16-rendez-vous-logo.webp",
    title:
      "Comment la prospection B2B a permis à un intégrateur audiovisuel de rencontrer 16 architectes et ingénieurs",
    metrics: ["89% ouverture", "69% réponse", "16 rendez-vous"],
    sector: "Audiovisuel / IT",
  },
  {
    slug: "cybersecurite-4500-entreprises",
    client: "Saporo",
    banner: "/images/Saporo_Banner.webp",
    logo: "/images/home/brands/saporo.webp",
    title:
      "Succès en génération de leads cybersécurité : 180 prospects qualifiés grâce à la téléprospection et au cold outreach B2B",
    metrics: ["79% ouverture", "26% réponse", "4.1% intérêt", "1ère campagne: 81% ouverture, 54% réponse, 16% intérêt"],
    sector: "Cybersécurité",
  },
  {
    slug: "many-ways-70-taux-reponse-merchandising",
    client: "Many Ways",
    banner: "/images/Many-Ways_banner.webp",
    logo: "/images/case-studies/logos/merchandising-23-prospects-logo.webp",
    title:
      "Comment la prospection B2B a permis à une entreprise de merchandising d'obtenir 70% de réponses et 8% de rendez-vous",
    metrics: ["70% réponse", "8% rendez-vous", "Rendez-vous dès le 1er jour"],
    sector: "Merchandising",
  },
  {
    slug: "apidae-70-rendez-vous",
    client: "APIDAE",
    banner: "/images/APIDAE_banner.webp",
    logo: "/images/case-studies/logos/biodiversite-70-rendez-vous-logo.webp",
    title:
      "Comment cette association a externalisé son acquisition client et généré 70 rendez-vous qualifiés avec des entreprises comme UEFA, TAG Heuer et Rothschild",
    metrics: ["40% réponse", "13% intérêt", "Dizaines de rendez-vous qualifiés"],
    sector: "Biodiversité / Non-profit",
  },
  {
    slug: "locky-40-entreprises-interessees",
    client: "Locky",
    banner: "/images/Locky_banner.webp",
    logo: "/images/case-studies/logos/mobilite-40-prospects-logo.webp",
    title: "+40 entreprises intéressées sur 286 contactées dans le secteur de la mobilité",
    metrics: ["286 contactées", "40 intéressées (14%)", "20 discovery calls", "15 démos"],
    sector: "Mobilité",
  },
  {
    slug: "hiag-immeuble-commercial-winterthur",
    client: "HIAG",
    banner: "/images/HIAG_banner.webp",
    logo: "/images/case-studies/logos/immobilier-11-prospects-logo.webp",
    title:
      "Immobilier et prospection B2B : comment trouver des locataires qualifiés pour Fahrwerk Winterthur",
    metrics: ["87% ouverture", "73% réponse", "11 opportunités locataires qualifiées"],
    sector: "Immobilier commercial",
  },
  {
    slug: "iddi-generation-leads-biotech-pharma",
    client: "IDDI",
    banner: "/images/IDDI_banner.jpg",
    title: "IDDI — Services de génération de leads en biotech/pharma pour un CRO international",
    metrics: ["20 MQL et 10 SQL (rendez-vous qualifiés)"],
    sector: "Pharma / Biotech",
  },
  {
    slug: "horus-200k-contrats-belgique",
    client: "Horus",
    banner: "/images/Horus_banner.webp",
    logo: "/images/case-studies/logos/logiciel-comptable-200k-ca-logo.webp",
    title:
      "Comment un éditeur de logiciel comptable a signé €200k de contrats en Belgique grâce au cold outreach multicanal",
    metrics: ["€200k de contrats signés"],
    sector: "Logiciel comptable",
  },
  {
    slug: "abacus-30-prospects-interesses",
    client: "Abacus",
    banner: "/images/Abacus_banner.webp",
    logo: "/images/case-studies/logos/immobilier-30-prospects-logo.webp",
    title:
      "Comment Abacus a utilisé la téléprospection externalisée et la génération de leads pour rencontrer des agences immobilières qualifiées en Suisse romande",
    metrics: ["+30 prospects intéressés"],
    sector: "Immobilier",
  },
  {
    slug: "monizze-120-rendez-vous-qualifies-belgique",
    client: "Monizze",
    banner: "/images/Monizze_banner.webp",
    logo: "/images/Monizze.png",
    title:
      "Comment devlo a obtenu 120 rendez-vous qualifiés pour Monizze en ciblant 7'000 décideurs RH, Finance et Direction en Belgique",
    metrics: ["120 rendez-vous qualifiés", "7'000 décideurs ciblés"],
    sector: "RH / Finance / Avantages salariaux",
  },
];

export const academySeo = {
  title: "Outbound Academy | Formation prospection B2B pour SDR et BDR | devlo",
  description:
    "Formation ultra-complète en prospection commerciale B2B. 50 tutoriels vidéo pour maîtriser le cold email, LinkedIn, la téléprospection et la génération de leads. Accès à vie.",
};

export const academyContent = {
  h1: "Formation pour commerciaux, SDR et BDR",
  h2: "Identifiez, générez et rencontrez vos prospects B2B grâce à des campagnes de prospection multicanal ultra-ciblées et personnalisées",
  video1: "gj1ltuo3tm",
  ctaFreeChapter: {
    label: "Accédez gratuitement au Chapitre 1 →",
    href: "https://academy.devlo.ch/invitation?code=GE7JA6",
  },
  h2Second: "Planifiez plus de démos qualifiées, de rendez-vous et de meetings avec des leads qualifiés",
  h3Second:
    "Une formation pour apprendre chaque étape de la génération de leads B2B de manière ultra-détaillée, complète et concrète",
  video2: "7inn49mdy6",
  h2Third: "Premier chapitre gratuit : contactez vos prospects sur LinkedIn",
  h3Third:
    "Mettez en place votre campagne de prospection automatisée sur LinkedIn sans frais pour jusqu'à 200 invitations par mois",
  ctaPlatform: {
    label: "Accédez gratuitement à la plateforme →",
    href: "https://academy.devlo.ch/invitation?code=GE7JA6",
  },
  logosTitle: "Nos clients ont rencontré ces entreprises",
  testimonialsTitle: "Section témoignages Academy",
  testimonials: [
    {
      quote:
        "Investir dans l'Academy pour la génération de leads B2B et la prise de rendez-vous qualifiés a été l'une des meilleures décisions que j'ai prises en tant que responsable commercial. Les résultats parlent d'eux-mêmes — j'ai pu obtenir 10x plus de rendez-vous qualifiés avec des clients potentiels depuis que j'ai mis en œuvre les stratégies apprises dans l'Academy. L'investissement a été rentabilisé en termes de revenus accrus et m'a donné un avantage concurrentiel sur le marché. Je peux présenter avec confiance notre produit et nos services aux prospects, sachant que j'ai un système solide en place pour générer des leads et planifier des rendez-vous efficaces. Pour tout responsable commercial B2B cherchant à améliorer son jeu et à garder une longueur d'avance sur la concurrence, je recommande vivement l'Academy. Le ROI est tout simplement trop bon pour le laisser passer.",
      author: "Jurica Karlo Welina",
      role: "Business Development Manager",
      company: "InsiderCX",
      photo: "/images/Jurica.jpg",
    },
    {
      quote:
        "J'ai récemment suivi une formation en ligne sur la génération de leads B2B et la prise de rendez-vous qualifiés, et ça a été un véritable game-changer pour moi. La formation m'a fourni des techniques et stratégies pratiques que j'ai pu appliquer immédiatement à mon processus de vente. Ce que j'ai vraiment apprécié, c'est à quel point le contenu était accessible et facile à comprendre. Il n'était pas rempli de jargon complexe ou de scénarios irréalistes. Au contraire, la formation était centrée sur des exemples concrets et des étapes actionnables. Depuis, j'ai constaté une augmentation significative du nombre de rendez-vous qualifiés. Et non seulement ça, mais les rendez-vous ont été beaucoup plus productifs et efficaces pour faire avancer les prospects dans le tunnel de vente.",
      author: "Maxime Dumont",
      role: "Mind-shift Activator",
      company: "Mind-shifters",
      photo: "/images/Maxime_Dumont.jpeg",
    },
    {
      quote:
        "J'ai terminé avec succès la devlo Academy. Elle couvre tout ce qu'il faut pour mettre en place des campagnes outbound entièrement automatisées pour promouvoir nos services. Impressionné par les connaissances et les guidelines fournies, j'ai beaucoup appris des tutoriels approfondis et des études de cas. Notre équipe a économisé un temps et un budget considérables en exploitant les stratégies et outils présentés dans l'Academy. J'ai maintenant un système en place qui nous permet de contacter de nombreux prospects sans recruter de personnel supplémentaire ni passer des heures à envoyer des emails manuellement. Dans l'ensemble, je recommande vivement cette Academy. Le ROI est indéniable, et les connaissances sont inestimables.",
      author: "Fabio Oliva",
      role: "Fondateur",
      company: "Workflowed",
      photo: "/images/Fabio_Oliva.jpeg",
    },
  ],
  learnTitle: "Ce que vous allez apprendre",
  learnText:
    "Maîtrisez le développement commercial B2B, les stratégies de cold outreach et les techniques de prospection pour générer des ventes B2B de manière constante.",
  includedTitle: "Ce qui est inclus",
  includedCards: [
    {
      title: "Tutoriels vidéo",
      text: "Transformez votre développement commercial B2B grâce à 50 tutoriels. 2,5 heures de vidéos pour découvrir toutes les étapes de A à Z et devenir autonome en cold outreach et acquisition client.",
    },
    {
      title: "Plateforme dédiée",
      text: "Suivez votre formation depuis notre plateforme dédiée accessible à tout moment. Depuis votre navigateur web, l'app Mac OS, iOS sur votre iPhone ou depuis votre Android.",
    },
    {
      title: "Ressources",
      text: "Accédez à toutes les ressources prêtes à l'emploi : permutateur d'emails, scripts de cold call, scripts Excel/Google Sheet, templates de séquences cold email, réponses types et templates de services de prospection.",
    },
    {
      title: "Mises à jour",
      text: "Restez constamment à jour avec les nouvelles méthodes, tendances et outils de prospection multicanal. Accès à vie.",
    },
    {
      title: "Experts",
      text: "Trouvez les réponses à vos questions auprès de nos experts en acquisition client B2B. Chaque chapitre a son fil de discussion où vous pouvez poser vos questions, valider vos options et prendre la meilleure décision.",
    },
    {
      title: "Rencontres",
      text: "Rencontrez les autres membres de l'Academy. Ensemble, nous formons une communauté qui s'entraide avec l'objectif de planifier plus de rendez-vous qualifiés et de maîtriser la stratégie de cold outreach.",
    },
    {
      title: "Études de cas",
      text: "Découvrez plusieurs études de cas inspirées par les campagnes de prospection gérées par notre agence. Nos clients opèrent en cybersécurité, RH, développement durable, merchandising, production vidéo, immobilier et formation.",
    },
    {
      title: "Webinaires exclusifs",
      text: "Participez aux webinaires hebdomadaires où les membres de la communauté partagent leurs études de cas pour affiner leur génération de leads, leurs séquences de cold outreach et leurs campagnes d'acquisition outbound.",
    },
  ] as HomeCard[],
  faqTitle: "Section FAQ Academy",
  faqs: [
    {
      question: "Quels outils sont présentés et quels sont leurs coûts ?",
      answer:
        "Il existe des centaines d'outils sur le marché. À travers cette formation, vous apprenez à utiliser précisément les solutions qui apportent le plus de résultats pour la prospection commerciale : Sales Navigator (100$/mois), lemlist (100$/mois), Phantombuster (30$/mois), HubSpot (0$) et Bouncer (30$ pour 5000 crédits), Excel/Google Sheet.",
    },
    {
      question: "Qu'est-ce qu'une campagne de prospection multicanal ?",
      answer:
        "Une campagne de prospection multicanal atteint vos prospects par cold email, téléprospection et LinkedIn. Vous avez une meilleure visibilité auprès de vos prospects. De plus, cette approche vous démarque de vos concurrents et génère régulièrement des leads qualifiés.",
    },
    {
      question: "Pourquoi la prospection commerciale B2B est-elle une bonne approche ?",
      answer:
        "C'est le moyen le plus économique, évolutif et rapide d'établir un contact direct avec des clients potentiels. De plus, vous pouvez cibler très précisément vos prospects pour garantir le succès de votre acquisition outbound.",
    },
    {
      question: "À qui s'adresse cette Academy ?",
      answer:
        "À toutes les personnes qui vendent des produits ou des services à d'autres entreprises. Si vous êtes un Sales Development Representative, Business Development Representative, business developer, directeur d'agence, entrepreneur, ou travaillez avec une agence de téléprospection, et que vous voulez rencontrer davantage de prospects B2B qualifiés, vous allez être impressionné.",
    },
    {
      question: "Cet investissement en vaut-il la peine ?",
      answer:
        "Vous allez booster votre activité et couvrir typiquement votre investissement avec une seule vente. De plus, vous allez approfondir vos connaissances et compétences en prospection commerciale B2B et génération de leads. Vous allez améliorer vos taux de conversion : taux d'ouverture, taux de clic, taux de réponse et nombre de leads qualifiés rencontrés.",
    },
    {
      question: "Pourquoi choisir l'Academy de devlo ?",
      answer:
        "Depuis 2020, notre agence de développement commercial a aidé des dizaines de clients différents avec de la prospection externalisée et de l'acquisition client B2B. Nous sommes spécialistes en génération de leads, prospection commerciale et qualification de prospects B2B. Cette Academy est le fruit de centaines d'heures de recherche, de réflexion et d'itération de nouvelles stratégies de cold outreach.",
    },
    {
      question: "Nous n'avons rien en place pour le moment, est-ce un problème ?",
      answer:
        "Aucun problème, vous découvrirez toutes les étapes nécessaires pour mettre en place vos propres campagnes de prospection commerciale ou décider d'externaliser votre développement commercial.",
    },
  ] as FaqItem[],
  finalCta: {
    h2: "Découvrez étape par étape notre méthodologie ultra-complète qui a fait ses preuves",
    h3: "Si vous êtes SDR, BDR, business developer, directeur d'agence ou entrepreneur, et que vous voulez accélérer votre développement commercial et rencontrer plus de prospects B2B qualifiés, profitez de notre offre spéciale : Adhésion à vie",
    cta: {
      label: "Profiter de l'offre spéciale →",
      href: "https://academy.devlo.ch/invitation?code=GE7JA6",
    },
  },
};

export const consultationSeo = {
  title: "Consultation gratuite | Stratégie de prospection B2B sur mesure | devlo",
  description:
    "Obtenez votre stratégie de prospection outbound gratuite et personnalisée. Partagez votre ICP et recevez un plan d'action complet sous 24h. Agence B2B suisse.",
};

export const consultationContent = {
  h1: "Obtenez votre stratégie outbound gratuite et ultra-ciblée pour vos meilleurs clients B2B",
  text: [
    "Partagez quelques détails sur votre Profil Client Idéal et nous construirons un plan de prospection personnalisé pour vous, avant même notre premier échange.",
    "Sur la base de ce que vous indiquez ci-dessous, notre équipe préparera :",
  ],
  bullets: [
    "Un résumé ICP clair avec vos meilleurs comptes cibles et intitulés de poste",
    "1 à 2 flux de prospection multicanal (email, LinkedIn, téléphone) adaptés à votre marché",
    "Des idées concrètes pour des objets d'email, accroches et call-to-actions qui génèrent des réponses",
  ],
  closing: [
    "devlo est classée parmi les meilleures agences outbound sur Outbound-experts.com et nos campagnes atteignent en moyenne 7% de prospects intéressés pour nos clients en 2025.",
    "Remplissez le formulaire, et nous vous recontacterons sous 24 heures avec votre stratégie outbound gratuite et sans engagement, puis nous vous la présenterons lors d'un appel.",
  ],
  hubspot: {
    portalId: "8082524",
    formId: "54090bd3-970d-4ad1-b3b3-1c81d54c291e",
    region: "na2",
  },
};

export const conditionsSeo = {
  title: "Conditions générales d'utilisation | devlo",
  description:
    "Conditions générales d'utilisation du site devlo.ch. Licence, limitations de responsabilité et droit applicable.",
};

export const conditionsContent = {
  title: "Conditions générales d'utilisation",
  sections: [
    {
      heading: "1. Conditions",
      body: "En accédant au site web https://www.devlo.ch/, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et vous êtes responsable du respect de toute loi locale applicable. Si vous n'acceptez pas l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site. Les documents contenus dans ce site sont protégés par le droit d'auteur et la législation sur les marques.",
    },
    {
      heading: "2. Licence d'utilisation",
      body: "2.1 L'autorisation est accordée de télécharger temporairement un exemplaire des documents (informations ou logiciels) du site de devlo pour un usage personnel, non commercial et temporaire uniquement. Il s'agit de l'octroi d'une licence, et non d'un transfert de titre. Dans le cadre de cette licence, vous ne pouvez pas : 1. modifier ou copier les documents ; 2. utiliser les documents à des fins commerciales ou pour tout affichage public ; 3. tenter de décompiler ou de procéder à l'ingénierie inverse de tout logiciel contenu sur le site de devlo ; 4. supprimer toute mention de droit d'auteur ou de propriété des documents ; 5. transférer les documents à une autre personne ou les « miroir » sur tout autre serveur. 2.2 Cette licence sera automatiquement résiliée si vous violez l'une de ces restrictions et peut être résiliée par devlo à tout moment.",
    },
    {
      heading: "3. Limitation de responsabilité",
      body: "Les documents sur le site de devlo sont fournis « en l'état ». devlo ne donne aucune garantie, expresse ou implicite.",
    },
    {
      heading: "4. Droit applicable",
      body: "Ces conditions sont régies et interprétées conformément aux lois de la Suisse et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de ce pays.",
    },
  ],
};

export const footerContent = {
  badge: "/images/service_badge_lemlist-1024x443.webp",
  linkedin: "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Outbound Academy", href: "/academy" },
    { label: "Consultation gratuite", href: "/consultation" },
  ] as NavLink[],
  caseLinks: [
    { label: "Étude de cas : CareerLunch (HR-tech)", href: "/etudes-de-cas/hr-54-rendez-vous-dach" },
    { label: "Étude de cas : Propreté urbaine (client confidentiel)", href: "/etudes-de-cas/proprete-urbaine-71-rendez-vous" },
    { label: "Étude de cas : SquareCo (Biocarburants)", href: "/etudes-de-cas/biocarburants-52-rendez-vous" },
    { label: "Étude de cas : Cegos (Formation)", href: "/etudes-de-cas/formation-14-rendez-vous" },
    { label: "Étude de cas : Lemanvisio (Audiovisuel)", href: "/etudes-de-cas/audiovisuel-16-rendez-vous" },
    { label: "Étude de cas : Saporo (Cybersécurité)", href: "/etudes-de-cas/cybersecurite-4500-entreprises" },
    { label: "Étude de cas : Many Ways (Merchandising)", href: "/etudes-de-cas/merchandising-23-prospects" },
    { label: "Étude de cas : APIDAE (Biodiversité)", href: "/etudes-de-cas/biodiversite-70-rendez-vous" },
    { label: "Étude de cas : Locky (Mobilité)", href: "/etudes-de-cas/mobilite-40-prospects" },
    { label: "Étude de cas : HIAG (Immobilier)", href: "/etudes-de-cas/immobilier-11-prospects" },
    { label: "Étude de cas : IDDI (Pharma/Biotech)", href: "/etudes-de-cas/iddi-generation-leads-biotech-pharma" },
    { label: "Étude de cas : Horus (Logiciel comptable)", href: "/etudes-de-cas/logiciel-comptable-200k-ca" },
    { label: "Étude de cas : Abacus (Immobilier)", href: "/etudes-de-cas/immobilier-30-prospects" },
    { label: "Étude de cas : Monizze (RH/Finance)", href: "/etudes-de-cas/monizze-120-rendez-vous-qualifies-belgique" },
  ] as NavLink[],
  mission:
    "Notre mission : permettre aux entreprises B2B de rencontrer leurs prospects grâce à des campagnes de prospection commerciale ultra-ciblées et personnalisées, et une téléprospection digitale innovante.",
  swissOffice: [
    "Ruelle des Dolles 1",
    "CH-1071 Rivaz",
    "Suisse",
    "+41 79 758 64 03",
    "emea@devlo.ch",
  ],
  usOffice: [
    "devlo LLC",
    "500 4TH ST NW SUITE 102 #1591",
    "Albuquerque NM 87102",
    "USA",
    "+1 (234) 201-8019",
    "americas@devlo.ch",
  ],
  bottomLink: { label: "Conditions générales", href: "/conditions" },
  copyright: "© 2026 devlo. Tous droits réservés.",
};
