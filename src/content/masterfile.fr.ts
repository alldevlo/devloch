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
  largeLogo?: boolean;
};

export const mainNav = {
  logo: "/images/devlo-logo.webp",
  links: [
    { label: "Agence", href: "/" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Services", href: "/services" },
    { label: "Outbound Academy", href: "/academy" },
  ] as NavLink[],
  cta: {
    label: "Consultation gratuite",
    href: "/consultation",
  },
};

export const homeSeo = {
  title: "Agence de prospection B2B en Suisse | Génération de leads",
  description:
    "Agence suisse de prospection B2B: génération de leads et rendez-vous qualifiés via cold email, LinkedIn et téléprospection. Plus de 1'000 campagnes lancées.",
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
    ctaServices: { label: "Voir nos services →", href: "/services" },
    wistiaMediaId: "cr7dgltkvu",
    posterSrc: "/images/video-thumb-abacus.webp",
    posterAlt: "Aperçu de la vidéo témoignage Abacus",
    videoTestimonial: {
      client: "Stephan Nuzzolo",
      role: "Directeur",
      company: "Abacus",
      line: "Plus de 30 prospects intéressés générés pour leur solution",
      href: "/etudes-de-cas/immobilier-30-prospects",
    },
    microProof: "⭐ 4.9/5 satisfaction client · 7% taux d'intérêt moyen · +1'000 campagnes",
  },
  rendezVousTitle: "Rendez-vous commerciaux obtenus avec",
  rendezVousLogos: [
    // Row 1
    { src: "/images/Logo_ABB.webp", alt: "ABB" },
    { src: "/images/Logo_Adecco.webp", alt: "Adecco" },
    { src: "/images/Logo_Apple.webp", alt: "Apple" },
    { src: "/images/Logo_BCF.webp", alt: "BCF" },
    { src: "/images/Logo_BHP.webp", alt: "BHP" },
    { src: "/images/Logo_DPD.webp", alt: "DPD" },
    { src: "/images/Logo_Hublot.webp", alt: "Hublot" },
    { src: "/images/Logo_Implenia.webp", alt: "Implenia" },
    { src: "/images/Logo_LafargeHolcim.webp", alt: "LafargeHolcim" },
    { src: "/images/Logo_Lombard_Odier.webp", alt: "Lombard Odier" },
    { src: "/images/Logo_Longines.webp", alt: "Longines" },
    { src: "/images/Logo_Merck.webp", alt: "Merck" },
    // Row 2
    { src: "/images/DENTSPLY_SIRONA.webp", alt: "DENTSPLY SIRONA" },
    { src: "/images/Academic_Work.webp", alt: "Academic Work" },
    { src: "/images/Accor_logo.webp", alt: "Accor" },
    { src: "/images/Accuray.webp", alt: "Accuray" },
    { src: "/images/ADM_logo.webp", alt: "ADM" },
    { src: "/images/Albinati_Aeronautics.webp", alt: "Albinati Aeronautics" },
    { src: "/images/Assura.webp", alt: "Assura" },
    { src: "/images/Banque_Heritage.webp", alt: "Banque Heritage" },
    { src: "/images/Bechtle.webp", alt: "Bechtle" },
    { src: "/images/Bedrock_Group.webp", alt: "Bedrock Group" },
    { src: "/images/Bio-Rad_Laboratories.webp", alt: "Bio-Rad Laboratories" },
    { src: "/images/BNP_Paribas_Switzerland.webp", alt: "BNP Paribas Switzerland" },
    { src: "/images/CBRE.webp", alt: "CBRE" },
    { src: "/images/CHH_Microtechnique.webp", alt: "CHH Microtechnique" },
    { src: "/images/CSC_Costruzioni.webp", alt: "CSC Costruzioni" },
    { src: "/images/CSS.webp", alt: "CSS" },
    // Row 3
    { src: "/images/Duracell_Inc..webp", alt: "Duracell" },
    { src: "/images/Edmond_de_Rothschild.webp", alt: "Edmond de Rothschild" },
    { src: "/images/Engelhart_Commodities_Trading_Partners.webp", alt: "Engelhart" },
    { src: "/images/Four_Seasons_Hotels_and_Resorts.webp", alt: "Four Seasons" },
    { src: "/images/Franke_Group.webp", alt: "Franke Group" },
    { src: "/images/Graduate_Institute_of_International_and_Development_Studies.webp", alt: "Graduate Institute" },
    { src: "/images/Groupe_Gerofinance-Dunand.webp", alt: "Groupe Gerofinance-Dunand" },
    { src: "/images/Gucci.webp", alt: "Gucci" },
    { src: "/images/Helvetia_Environnement.webp", alt: "Helvetia Environnement" },
    { src: "/images/HID_Global.webp", alt: "HID Global" },
    { src: "/images/HR_Campus_AG.webp", alt: "HR Campus AG" },
    { src: "/images/HSBC.webp", alt: "HSBC" },
    { src: "/images/International_SOS.webp", alt: "International SOS" },
    { src: "/images/JLL.webp", alt: "JLL" },
    { src: "/images/Liip.webp", alt: "Liip" },
    { src: "/images/LunaJets.webp", alt: "LunaJets" },
    { src: "/images/Lunaphore_Technologies.webp", alt: "Lunaphore Technologies" },
    { src: "/images/Meggitt.webp", alt: "Meggitt" },
    { src: "/images/Merkle_DACH.webp", alt: "Merkle DACH" },
    // Row 4
    { src: "/images/MSC_Cruises.webp", alt: "MSC Cruises" },
    { src: "/images/Officine_Panerai.webp", alt: "Officine Panerai" },
    { src: "/images/Orange_Business_Services.webp", alt: "Orange Business Services" },
    { src: "/images/Oryx_Energies.webp", alt: "Oryx Energies" },
    { src: "/images/PHIDA_Groupe.webp", alt: "PHIDA Groupe" },
    { src: "/images/PROTECTAS_SA.webp", alt: "PROTECTAS SA" },
    { src: "/images/Rothschild_&_Co.webp", alt: "Rothschild & Co" },
    { src: "/images/Siegfried_Holding_AG.webp", alt: "Siegfried Holding AG" },
    { src: "/images/SITA.webp", alt: "SITA" },
    { src: "/images/Sommet_Education.webp", alt: "Sommet Education" },
    { src: "/images/Sonceboz.webp", alt: "Sonceboz" },
    { src: "/images/SUNSTAR_GLOBAL.webp", alt: "SUNSTAR GLOBAL" },
    { src: "/images/Swatch_Group.webp", alt: "Swatch Group" },
    { src: "/images/TAG_Heuer.webp", alt: "TAG Heuer" },
    { src: "/images/The_Adecco_Group.webp", alt: "The Adecco Group" },
    { src: "/images/Trelleborg_Sealing_Solutions.webp", alt: "Trelleborg" },
    { src: "/images/UEFA.webp", alt: "UEFA" },
    { src: "/images/Vale.webp", alt: "Vale" },
  ] as HomeLogo[],
  videoTestimonials: {
    title: "Ce que disent nos clients",
    items: [
      {
        title: "Témoignage vidéo — Cegos",
        wistiaMediaId: "knadmb8za5",
        posterSrc: "/images/video-thumb-cegos.webp",
        posterAlt: "Bannière de l'étude de cas Cegos en prospection B2B",
        client: "Etienne Auvillain",
        role: "Directeur Général",
        photo: "/images/Etienne_Auvillain.webp",
        metric: "45% de taux de réponse grâce à notre approche multicanal personnalisée",
        linkLabel: "→ vers étude de cas Cegos",
        href: "/etudes-de-cas/formation-14-rendez-vous",
      },
      {
        title: "Témoignage vidéo — Abacus",
        wistiaMediaId: "cr7dgltkvu",
        posterSrc: "/images/video-thumb-abacus.webp",
        posterAlt: "Bannière de l'étude de cas Abacus en génération de leads immobiliers",
        client: "Stephan Nuzzolo",
        role: "Directeur",
        photo: "/images/Stephan_Nuzzolo.webp",
        metric: "Plus de 30 prospects intéressés générés pour leur solution",
        linkLabel: "→ vers étude de cas Abacus",
        href: "/etudes-de-cas/immobilier-30-prospects",
      },
      {
        title: "Témoignage vidéo — Apidae",
        wistiaMediaId: "w9ews1v05q",
        posterSrc: "/images/video-thumb-apidae.webp",
        posterAlt: "Bannière de l'étude de cas APIDAE sur la biodiversité",
        client: "Tanguy Coustaline",
        role: "Président",
        photo: "/images/Tanguy_Coustaline.webp",
        metric: "70 rendez-vous qualifiés avec des marques prestigieuses",
        linkLabel: "→ vers étude de cas Apidae",
        href: "/etudes-de-cas/biodiversite-70-rendez-vous",
      },
    ],
  },
  clientsTitle: "Nos clients",
  clientsLogos: [
    "StrongNetwork_logo.webp",
    "Abacus_logo.webp",
    "FusionOne_logo.webp",
    "CareerLunch_logo.webp",
    "Urbantz_logo.webp",
    "Cegos_Logo.webp",
    "Lane_logo.webp",
    "Saporo_logo.webp",
    "Swiss_Digital_Network_logo.webp",
    "HIAG_logo.webp",
    "Referwell_logo.webp",
    "Tune_Insight_logo.webp",
    "Lemanvisio_Logo.webp",
    "Webforce_logo.webp",
    "Monizze_Logo.webp",
    "Redguard_logo.webp",
    "Locky_Logo.webp",
    "Many_ways_logo.webp",
    "Undu_du_logo.webp",
    "IDDI_logo.webp",
    "Horus_logo.webp",
    "Apidae_log.webp",
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
      photo: "/images/Anthony_CREMER.webp",
    },
    {
      quote:
        "Investir dans l'Academy pour la génération de leads B2B et la prise de rendez-vous qualifiés a été l'une des meilleures décisions que j'ai prises en tant que leader commercial. Les résultats parlent d'eux-mêmes – j'ai pu réserver 10 fois plus de rendez-vous qualifiés avec des clients potentiels depuis la mise en œuvre des stratégies apprises dans l'Academy. L'investissement a été rentable en termes de revenus accrus et m'a donné un avantage concurrentiel sur le marché.",
      author: "Jurica Karlo Welina",
      role: "Business Development Manager",
      company: "InsiderCX",
      photo: "/images/jurica-karlo.webp",
    },
    {
      quote:
        "Je suis convaincu que devlo est un partenaire idéal pour les start-ups qui cherchent à valider leur product-market fit et à obtenir un maximum de rendez-vous qualifiés avec très peu de temps et de ressources. Le professionnalisme de son fondateur Charles a rendu tout le processus, de la génération de leads à la structuration de campagne et l'obtention de rendez-vous, une collaboration très agréable et efficace. Pour donner une perspective, notre première campagne avec devlo : 81% de taux d'ouverture, 54% de taux de réponse et 16% des organisations intéressées par un rendez-vous avec Saporo. C'est remarquablement efficace, surtout dans un secteur aussi complexe que la cybersécurité.",
      author: "Olivier Eyries",
      role: "CEO",
      company: "Saporo",
      photo: "/images/Olivier-Eyries.webp",
    },
    {
      quote:
        "Installer des ruches sur le toit de votre entreprise ne vient pas spontanément à l'esprit ! C'est là que devlo est intervenu ! La connaissance et l'expérience de devlo en développement commercial nous ont permis d'avancer rapidement et de rencontrer des prospects qualifiés. À la fin de notre première campagne, sur 270 leads, nous avons obtenu un taux de réponse de 39% et 13% d'entre eux étaient intéressés à en savoir plus sur notre organisation. C'est maintenant à nous de transformer l'essai et de convaincre de nouveaux partenaires de soutenir la biodiversité avec APIDAE.",
      author: "Tanguy Coustaline",
      role: "Président",
      company: "APIDAE",
      photo: "/images/Tanguy_Coustaline.webp",
    },
    {
      quote:
        "J'ai été initialement très séduit par l'approche centrée client, notamment la possibilité de proposer des packages avec des services et un périmètre clairement définis. Cela m'a permis de structurer clairement ma campagne avec un budget défini. Nous avions des dashboards qui montraient l'avancement de la prospection en temps réel. Nous avons ensuite tenu une réunion pour analyser pleinement les chiffres, comprendre ce qui s'est bien passé et ce qui ne s'est pas bien passé, et cela nous a permis d'évaluer la campagne dans son ensemble. J'étais très satisfait.",
      author: "Stephan Nuzzolo",
      role: "Directeur",
      company: "Abacus",
      photo: "/images/Stephan_Nuzzolo.webp",
    },
    {
      quote:
        "Avant devlo, la génération de leads était chronophage avec de mauvais résultats, nous empêchant de conclure des affaires. devlo a révolutionné notre approche en construisant une base de données ciblée et en déployant une stratégie multicanal ultra-personnalisée. Les résultats ont été immédiats : en 5 mois, nous avons obtenu 80 réunions de qualité, signé 45 nouveaux clients et généré plus de 200 000 € de chiffre d'affaires, réduisant notre cycle de vente de 30%. Si vous souhaitez accélérer vos ventes avec des résultats concrets, je recommande vivement devlo. Leur expertise fait toute la différence.",
      author: "Jérôme Tailleur",
      role: "Directeur Commercial",
      company: "Horus Software",
      photo: "/images/Jerome_Tailleur.webp",
    },
    {
      quote:
        "J'ai récemment suivi un cours en ligne sur la génération de leads B2B et la prise de rendez-vous qualifiés avec des clients potentiels, et cela a été un véritable changement de jeu pour moi en tant que leader commercial. Le cours m'a fourni des techniques et des stratégies pratiques que j'ai pu immédiatement appliquer à mon processus de vente. Depuis, j'ai constaté une augmentation significative du nombre de rendez-vous qualifiés que j'ai pu réserver.",
      author: "Maxime Dumont",
      role: "Mind-shift activator",
      company: "Mind-shifters",
      photo: "/images/Maxime_Dumont.webp",
    },
    {
      quote:
        "Charles est parmi les experts commerciaux les plus créatifs et enthousiastes que je connaisse. J'ai travaillé avec lui sur plusieurs campagnes. Il nous a aidés à mettre en place des campagnes de prospection hyper-personnalisées, à atteindre des centaines de prospects et finalement à obtenir des rendez-vous commerciaux qualifiés. De plus, il nous a aussi conseillés pour affiner notre processus de vente, ce qui a été très utile pour l'ensemble du département commercial. Je recommande vivement ses compétences et services à toutes les startups et PME qui veulent passer rapidement au niveau supérieur.",
      author: "Raphael Haut",
      role: "Head of Business Development & Marketing",
      company: "CareerLunch",
      photo: "/images/Raphael-haut.webp",
    },
    {
      quote:
        "Nous avons vraiment apprécié la diligence, la communication claire et le dévouement de devlo. Sur 285 prospects, nous avons reçu 200 réponses, soit plus de 70%. L'un de nos défis était d'améliorer nos méthodes de prospection. Avec devlo, nous avons affiné notre ciblage et notre approche avec lemlist. Nous avons aussi identifié deux types de Profils Clients Idéaux : les établissements d'enseignement privés et publics. Nous avons contacté les deux et validé l'ICP le plus réceptif à notre offre.",
      author: "Xavier Leuthold",
      role: "Fondateur",
      company: "Many Ways SA",
      photo: "/images/Xavier_Leuthold_Many_Ways.webp",
    },
    {
      quote:
        "J'ai terminé avec succès la devlo Academy. Elle couvre tout ce qui est nécessaire pour mettre en œuvre des campagnes outbound entièrement automatisées pour promouvoir nos services. Époustouflé par les connaissances et les directives fournies, j'ai beaucoup appris des tutoriels approfondis et des études de cas. Notre équipe a pu économiser beaucoup de temps et d'argent en tirant parti des stratégies et outils présentés dans l'Academy. Je recommande vivement cette Academy.",
      author: "Fabio Oliva",
      role: "Founder",
      company: "Workflowed",
      photo: "/images/Fabio_Oliva.webp",
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
  faqCtaText: "Planifions une consultation pour discuter de vos stratégies de prospection commerciale.",
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
  ] as FaqItem[],
};

export const caseStudiesSeo = {
  title: "Études de cas prospection B2B | Résultats clients | devlo",
  description:
    "Découvrez les résultats concrets de nos campagnes B2B: taux d'ouverture, taux de réponse et rendez-vous qualifiés obtenus sur des cas clients réels.",
  h1: "Nos résultats : études de cas en prospection B2B",
  subtitle:
    "Découvrez comment nous aidons nos clients à générer des rendez-vous qualifiés et à développer leur pipeline commercial.",
};

export const caseStudiesCards: CaseStudyCard[] = [
  {
    slug: "careerlunch-54-rendez-vous-dach",
    client: "CareerLunch",
    banner: "/images/CareerLunch_banner1.webp",
    logo: "/images/CareerLunch_logo.webp",
    title:
      "Comment notre agence de prospection B2B a aidé CareerLunch à obtenir 54 rendez-vous commerciaux dans la région DACH",
    metrics: ["71% ouverture", "29% clic", "19% réponse", "10% intérêt", "54 rendez-vous"],
    sector: "HR-tech",
  },
  {
    slug: "cortexia-71-rendez-vous-decideurs-urbains",
    client: "Client confidentiel",
    banner: "/images/Cortexia_banner.webp",
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
    logo: "/images/squareco.webp",
    title:
      "Comment identifier les meilleurs Profils Clients Idéaux parmi plusieurs buyer personas grâce au cold outreach",
    metrics: ["74% ouverture", "37% réponse", "9% intérêt", "52 prospects intéressés"],
    sector: "Énergie renouvelable",
  },
  {
    slug: "cegos-45-taux-reponse",
    client: "Cegos",
    banner: "/images/Cegos_banner.webp",
    logo: "/images/Cegos_Logo.webp",
    title:
      "Succès en prospection B2B : 50% de taux de réponse auprès des responsables Learning & Development en Suisse",
    metrics: ["73% ouverture", "45% réponse", "14 rendez-vous qualifiés"],
    sector: "Formation / L&D",
  },
  {
    slug: "lemanvisio-16-rendez-vous-architectes",
    client: "Lemanvisio",
    banner: "/images/LEMANVISIO_banner.webp",
    logo: "/images/Lemanvisio_Logo.webp",
    largeLogo: true,
    title:
      "Comment la prospection B2B a permis à un intégrateur audiovisuel de rencontrer 16 architectes et ingénieurs",
    metrics: ["89% ouverture", "69% réponse", "16 rendez-vous"],
    sector: "Audiovisuel / IT",
  },
  {
    slug: "cybersecurite-4500-entreprises",
    client: "Saporo",
    banner: "/images/Saporo_Banner.webp",
    logo: "/images/Saporo_logo.webp",
    largeLogo: true,
    title:
      "Succès en génération de leads cybersécurité : 180 prospects qualifiés grâce à la téléprospection et au cold outreach B2B",
    metrics: ["79% ouverture", "26% réponse", "4.1% intérêt", "1ère campagne: 81% ouverture, 54% réponse, 16% intérêt"],
    sector: "Cybersécurité",
  },
  {
    slug: "many-ways-70-taux-reponse-merchandising",
    client: "Many Ways",
    banner: "/images/Many-Ways_banner.webp",
    logo: "/images/Many_ways_logo.webp",
    largeLogo: true,
    title:
      "Comment la prospection B2B a permis à une entreprise de merchandising d'obtenir 70% de réponses et 8% de rendez-vous",
    metrics: ["70% réponse", "8% rendez-vous", "Rendez-vous dès le 1er jour"],
    sector: "Merchandising",
  },
  {
    slug: "apidae-70-rendez-vous",
    client: "APIDAE",
    banner: "/images/APIDAE_banner.webp",
    logo: "/images/Apidae_log.webp",
    largeLogo: true,
    title:
      "Comment cette association a externalisé son acquisition client et généré 70 rendez-vous qualifiés avec des entreprises comme UEFA, TAG Heuer et Rothschild",
    metrics: ["40% réponse", "13% intérêt", "Dizaines de rendez-vous qualifiés"],
    sector: "Biodiversité / Non-profit",
  },
  {
    slug: "locky-40-entreprises-interessees",
    client: "Locky",
    banner: "/images/Locky_banner.webp",
    logo: "/images/Locky_Logo.webp",
    largeLogo: true,
    title: "+40 entreprises intéressées sur 286 contactées dans le secteur de la mobilité",
    metrics: ["286 contactées", "40 intéressées (14%)", "20 discovery calls", "15 démos"],
    sector: "Mobilité",
  },
  {
    slug: "hiag-immeuble-commercial-winterthur",
    client: "HIAG",
    banner: "/images/HIAG_banner.webp",
    logo: "/images/HIAG_logo.webp",
    largeLogo: true,
    title:
      "Immobilier et prospection B2B : comment trouver des locataires qualifiés pour Fahrwerk Winterthur",
    metrics: ["87% ouverture", "73% réponse", "11 opportunités locataires qualifiées"],
    sector: "Immobilier commercial",
  },
  {
    slug: "iddi-generation-leads-biotech-pharma",
    client: "IDDI",
    banner: "/images/IDDI_banner.webp",
    logo: "/images/IDDI_logo.webp",
    largeLogo: true,
    title: "IDDI — Services de génération de leads en biotech/pharma pour un CRO international",
    metrics: ["52,7% ouverture", "12,9% réponse", "3 semaines avant les premiers rendez-vous"],
    sector: "Pharma / Biotech",
  },
  {
    slug: "horus-200k-contrats-belgique",
    client: "Horus",
    banner: "/images/Horus.webp",
    logo: "/images/Horus_logo.webp",
    largeLogo: true,
    title:
      "Comment un éditeur de logiciel comptable a signé €200k de contrats en Belgique grâce au cold outreach multicanal",
    metrics: ["€200k de contrats signés"],
    sector: "Logiciel comptable",
  },
  {
    slug: "abacus-30-prospects-interesses",
    client: "Abacus",
    banner: "/images/Abacus_banner.webp",
    logo: "/images/Abacus_logo.webp",
    largeLogo: true,
    title:
      "Comment Abacus a utilisé la téléprospection externalisée et la génération de leads pour rencontrer des agences immobilières qualifiées en Suisse romande",
    metrics: ["+30 prospects intéressés"],
    sector: "Immobilier",
  },
  {
    slug: "monizze-120-rendez-vous-qualifies-belgique",
    client: "Monizze",
    banner: "/images/Monizze_banner.webp",
    logo: "/images/Monizze_Logo.webp",
    largeLogo: true,
    title:
      "Comment devlo a obtenu 120 rendez-vous qualifiés pour Monizze en ciblant 7'000 décideurs RH, Finance et Direction en Belgique",
    metrics: ["120 rendez-vous qualifiés", "7'000 décideurs ciblés"],
    sector: "RH / Finance / Avantages salariaux",
  },
];

export const academySeo = {
  title: "Formation prospection B2B gratuite | Outbound Academy devlo",
  description:
    "Formation prospection commerciale B2B gratuite : 50 tutoriels, cold email, LinkedIn, téléprospection. Accès à vie + communauté + études de cas.",
};

export const academyContent = {
  h1: "Formation prospection commerciale B2B : maîtrisez le cold outreach en 2,5 heures",
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
  logosTitle: "Ces entreprises nous font confiance",
  testimonialsTitle: "Ils ont transformé leur prospection B2B",
  testimonials: [
    {
      quote:
        "Investir dans l'Academy pour la génération de leads B2B et la prise de rendez-vous qualifiés a été l'une des meilleures décisions que j'ai prises en tant que responsable commercial. Les résultats parlent d'eux-mêmes — j'ai pu obtenir 10x plus de rendez-vous qualifiés avec des clients potentiels depuis que j'ai mis en œuvre les stratégies apprises dans l'Academy. L'investissement a été rentabilisé en termes de revenus accrus et m'a donné un avantage concurrentiel sur le marché. Je peux présenter avec confiance notre produit et nos services aux prospects, sachant que j'ai un système solide en place pour générer des leads et planifier des rendez-vous efficaces. Pour tout responsable commercial B2B cherchant à améliorer son jeu et à garder une longueur d'avance sur la concurrence, je recommande vivement l'Academy. Le ROI est tout simplement trop bon pour le laisser passer.",
      author: "Jurica Karlo Welina",
      role: "Business Development Manager",
      company: "InsiderCX",
      photo: "/images/jurica-karlo.webp",
    },
    {
      quote:
        "J'ai récemment suivi une formation en ligne sur la génération de leads B2B et la prise de rendez-vous qualifiés, et ça a été un véritable game-changer pour moi. La formation m'a fourni des techniques et stratégies pratiques que j'ai pu appliquer immédiatement à mon processus de vente. Ce que j'ai vraiment apprécié, c'est à quel point le contenu était accessible et facile à comprendre. Il n'était pas rempli de jargon complexe ou de scénarios irréalistes. Au contraire, la formation était centrée sur des exemples concrets et des étapes actionnables. Depuis, j'ai constaté une augmentation significative du nombre de rendez-vous qualifiés. Et non seulement ça, mais les rendez-vous ont été beaucoup plus productifs et efficaces pour faire avancer les prospects dans le tunnel de vente.",
      author: "Maxime Dumont",
      role: "Mind-shift Activator",
      company: "Mind-shifters",
      photo: "/images/Maxime_Dumont.webp",
    },
    {
      quote:
        "J'ai terminé avec succès la devlo Academy. Elle couvre tout ce qu'il faut pour mettre en place des campagnes outbound entièrement automatisées pour promouvoir nos services. Impressionné par les connaissances et les guidelines fournies, j'ai beaucoup appris des tutoriels approfondis et des études de cas. Notre équipe a économisé un temps et un budget considérables en exploitant les stratégies et outils présentés dans l'Academy. J'ai maintenant un système en place qui nous permet de contacter de nombreux prospects sans recruter de personnel supplémentaire ni passer des heures à envoyer des emails manuellement. Dans l'ensemble, je recommande vivement cette Academy. Le ROI est indéniable, et les connaissances sont inestimables.",
      author: "Fabio Oliva",
      role: "Fondateur",
      company: "Workflowed",
      photo: "/images/Fabio_Oliva.webp",
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
  faqTitle: "FAQ Academy",
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
    {
      question: "Combien de temps faut-il pour obtenir des résultats ?",
      answer:
        "Les premiers rendez-vous qualifiés arrivent généralement entre 1 et 5 semaines après le lancement de la campagne, selon le marché cible et les canaux utilisés. L'Academy vous apprend à optimiser chaque étape pour accélérer ce délai.",
    },
    {
      question: "L'Academy est-elle adaptée au marché francophone et DACH ?",
      answer:
        "Oui, nos stratégies sont testées et optimisées pour les marchés francophones (Suisse, Belgique, France) et germanophones (DACH). Nous partageons des études de cas réelles dans ces régions, y compris les bonnes pratiques linguistiques et culturelles.",
    },
    {
      question: "Puis-je combiner l'Academy avec les services de devlo ?",
      answer:
        "Absolument. Beaucoup de nos clients utilisent l'Academy pour former leur équipe interne, puis font appel à nos services pour externaliser l'exécution. C'est la combinaison idéale pour scaler rapidement votre prospection.",
    },
    {
      question: "Quelle est la différence entre faire soi-même et externaliser avec devlo ?",
      answer:
        "L'Academy vous donne les compétences pour lancer vos propres campagnes. Externaliser avec devlo vous fait gagner du temps : notre équipe gère la génération de leads, la qualification et la prise de rendez-vous, pendant que vous vous concentrez sur la vente.",
    },
    {
      question: "Quels taux de conversion puis-je espérer ?",
      answer:
        "Nos clients obtiennent en moyenne 50-70% de taux d'ouverture email, 5-20% de taux de réponse, et 5-10% de taux d'intérêt (prospects qui acceptent un rendez-vous). Ces métriques varient selon le secteur et la qualité du ciblage.",
    },
  ] as FaqItem[],
  finalCta: {
    h2: "Découvrez étape par étape notre méthodologie ultra complète",
    h3: "Si vous êtes SDR, BDR, business developer, directeur d'agence ou entrepreneur, et que vous voulez accélérer votre développement commercial et rencontrer plus de prospects B2B qualifiés, profitez de notre offre spéciale : Adhésion à vie",
    cta: {
      label: "Profiter de l'offre spéciale →",
      href: "https://academy.devlo.ch/invitation?code=GE7JA6",
    },
  },
  whyTraining: {
    title: "Pourquoi une formation prospection commerciale B2B ?",
    paragraphs: [
      "Les formations classiques en prospection B2B coûtent entre 1'000€ et 2'000€ et s'étalent sur plusieurs semaines. Elles sont souvent théoriques et déconnectées des outils que vous utilisez au quotidien.",
      "L'Outbound Academy de devlo est différente : 50 tutoriels vidéo ultra-concrets, basés sur +1'000 campagnes réelles lancées depuis 2020. Chaque chapitre vous montre exactement quoi faire, avec quels outils, et avec quels résultats attendre.",
      "Accès à vie. Pas de limite de durée. Mises à jour régulières. Et si vous voulez aller plus loin, notre équipe peut prendre le relais et exécuter pour vous.",
    ],
    cta1: { label: "Commencer gratuitement →", href: "https://academy.devlo.ch/invitation?code=GE7JA6" },
    cta2: { label: "Parler à un expert", href: "/consultation" },
  },
  chaptersTitle: "Formation prospection commerciale : structure complète",
  chapters: [
    { number: "01", title: "Ciblage de précision et ICP", description: "Définissez votre Profil Client Idéal. Sélectionnez les secteurs, tailles d'entreprise et décideurs qui génèrent le plus de rendez-vous.", link: { label: "Voir comment nos experts ciblent pour vous", href: "/services" } },
    { number: "02", title: "Extraction de données B2B", description: "Construisez des listes de prospects qualifiés avec Sales Navigator, Apollo et les bases de données B2B.", link: { label: "Générer des leads qualifiés", href: "/services/generation-leads" } },
    { number: "03", title: "Enrichissement et vérification", description: "Enrichissez vos données avec Clay, vérifiez les emails, et préparez des campagnes à haute délivrabilité.", link: { label: "Enrichir vos données", href: "/services/enrichissement-clay" } },
    { number: "04", title: "Cold email B2B", description: "Rédigez des séquences email qui obtiennent 45%+ de taux d'ouverture. Templates, copywriting et délivrabilité.", link: { label: "Externaliser votre cold email", href: "/services/cold-email" } },
    { number: "05", title: "Prospection LinkedIn", description: "Automatisez votre prospection LinkedIn : invitations personnalisées, messages et suivi multicanal.", link: { label: "Laisser nos experts gérer LinkedIn", href: "/services/linkedin-outreach" } },
    { number: "06", title: "Téléprospection B2B", description: "Techniques d'appel à froid : scripts, objection handling, et qualification de rendez-vous.", link: { label: "Téléprospection externalisée", href: "/services/cold-calling" } },
    { number: "07", title: "Séquences multicanales", description: "Combinez email, LinkedIn et téléphone dans des séquences automatisées pour maximiser votre taux de réponse.", link: { label: "Discutez de votre stratégie multicanale", href: "/consultation" } },
  ],
  personas: {
    title: "Qui devrait suivre cette formation ?",
    items: [
      { icon: "🎯", title: "SDR — Sales Development Representatives", description: "Vous démarrez en prospection B2B ? Apprenez les fondamentaux du cold outreach et de la qualification de leads." },
      { icon: "🚀", title: "BDR — Business Development Representatives", description: "Vous cherchez à scaler votre génération de leads ? Maîtrisez les outils et techniques avancées." },
      { icon: "💼", title: "Entrepreneurs B2B", description: "Vous lancez un nouveau produit ou marché ? Construisez votre machine de prospection de zéro, sans recruter." },
      { icon: "📊", title: "Directeurs commerciaux", description: "Vous encadrez une équipe de vente ? Formez vos équipes avec une méthodologie éprouvée sur +1'000 campagnes." },
    ],
    note: "Aucun prérequis nécessaire.",
  },
};

export const consultationSeo = {
  title: "Consultation gratuite | Stratégie de prospection B2B sur mesure",
  description:
    "Obtenez votre stratégie de prospection outbound gratuite et personnalisée. Partagez votre ICP et recevez un plan d'action complet sous 24h. Agence B2B suisse.",
};

export const consultationContent = {
  h1: "Obtenez votre stratégie outbound gratuite et ultra-ciblée pour vos meilleurs clients B2B",

  reassurance: [
    "Gratuit et sans engagement",
    "Réponse sous 24h",
    "Top agence sur Outbound-experts.com",
  ],

  intro:
    "Partagez quelques détails sur votre Profil Client Idéal et nous construirons un plan de prospection personnalisé pour vous, avant même notre premier échange.",

  deliverablesTitle: "Ce que vous recevez",
  deliverables: [
    {
      icon: "🎯",
      title: "Résumé ICP",
      desc: "Vos meilleurs comptes cibles et intitulés de poste clairement définis pour cibler les bons prospects",
    },
    {
      icon: "📨",
      title: "Plan multicanal",
      desc: "1 à 2 flux de prospection email, LinkedIn et téléphone entièrement adaptés à votre marché",
    },
    {
      icon: "✍️",
      title: "Accroches & CTA",
      desc: "Idées concrètes d'objets d'emails, accroches et call-to-actions qui génèrent des réponses",
    },
  ],

  proof: {
    stat: "7%",
    label: "de prospects intéressés en moyenne",
    source: "Outbound-experts.com · 2025",
  },

  forWhoTitle: "Pour qui ?",
  forWhoIntro: "Notre agence travaille exclusivement avec des entreprises B2B :",
  forWho: [
    "Éditeurs de logiciels et SaaS",
    "Sociétés de cybersécurité",
    "Prestataires de services professionnels et formation",
    "Industriels, immobilier et associations B2B",
  ],

  formTitle: "Planifiez votre consultation gratuite",
  formSubtitle:
    "Notre équipe prépare votre stratégie outbound avant même notre premier appel.",

  hubspot: {
    portalId: "8082524",
    formId: "54090bd3-970d-4ad1-b3b3-1c81d54c291e",
    region: "na2",
  },

  postForm:
    "En soumettant ce formulaire, notre équipe vous contacte sous 24h avec votre stratégie outbound personnalisée.",

  faqs: [
    {
      question: "Est-ce vraiment gratuit ?",
      answer:
        "Oui, la consultation est 100% gratuite et sans engagement. Vous recevez un plan de prospection personnalisé basé sur votre ICP, sans aucune obligation de travailler avec nous.",
    },
    {
      question: "Combien de temps dure la consultation ?",
      answer:
        "La consultation dure environ 30 minutes. Avant l'appel, notre équipe prépare déjà votre stratégie outbound. Pendant l'appel, nous affinons ensemble les priorités et vous repartez avec un plan d'action concret.",
    },
    {
      question: "Quels résultats puis-je attendre ?",
      answer:
        "Nos clients obtiennent en moyenne 50-70% de taux d'ouverture, 5-20% de taux de réponse et entre 10 et 120 rendez-vous qualifiés par campagne. Les premiers rendez-vous arrivent généralement en 1 à 5 semaines.",
    },
    {
      question: "Est-ce adapté à mon secteur ?",
      answer:
        "Nous travaillons avec des entreprises B2B de tous secteurs : SaaS, cybersécurité, fintech, formation, immobilier, industrie, services professionnels. Plus de 1000 campagnes déployées depuis 2020.",
    },
    {
      question: "Que se passe-t-il après la consultation ?",
      answer:
        "Vous recevez votre stratégie outbound complète (résumé ICP, plan multicanal, accroches et CTA). Vous pouvez l'exécuter vous-même ou nous confier l'implémentation. Aucune pression commerciale.",
    },
    {
      question: "Travaillez-vous avec des entreprises hors de Suisse ?",
      answer:
        "Oui, nous servons des clients en Suisse, Belgique, France, Allemagne, Luxembourg, aux États-Unis et au Canada. Nos campagnes sont déployées en français, anglais, allemand et néerlandais.",
    },
  ] as FaqItem[],
};

export const conditionsSeo = {
  title: "Conditions générales d'utilisation | devlo",
  description:
    "Consultez les conditions générales d'utilisation de devlo.ch: licence, responsabilité, propriété intellectuelle et droit applicable.",
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
  badges: [
    {
      src: "/images/service_badge_lemlist_2024.webp",
      alt: "Badge Lemlist 2024",
      width: 899,
      height: 391,
    },
    {
      src: "/images/service_badge_lemlist_2025.webp",
      alt: "Badge Lemlist 2025",
      width: 1024,
      height: 443,
    },
    {
      src: "/images/service_badge_lemlist_2026.webp",
      alt: "Badge Lemlist 2026",
      width: 300,
      height: 115,
    },
  ],
  linkedin: "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Outbound Academy", href: "/academy" },
    { label: "Consultation gratuite", href: "/consultation" },
  ] as NavLink[],
  caseLinks: [
    { label: "Étude de cas : CareerLunch (HR-tech)", href: "/etudes-de-cas/hr-54-rendez-vous-dach" },
    { label: "Étude de cas : Propreté urbaine", href: "/etudes-de-cas/proprete-urbaine-71-rendez-vous" },
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
    { label: "Étude de cas : Monizze (RH/Finance)", href: "/etudes-de-cas/monizze-120-rendez-vous" },
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
