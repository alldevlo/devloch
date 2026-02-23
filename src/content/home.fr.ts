export type NavItem = {
  label: string;
  href: string;
  target?: "_blank";
};

export type ToggleItem = {
  title: string;
  content: string;
};

export type ProcessStep = {
  title: string;
  content: string;
  icon: string;
  iconAlt: string;
};

export type MetricItem = {
  value: string;
  label: string;
};

export type TrustMetric = {
  target: number;
  prefix?: string;
  suffix?: string;
  compactK?: boolean;
  label: string;
};

export type LogoItem = {
  name: string;
  src: string;
  alt: string;
};

export type TestimonialItem = {
  image: string;
  imageAlt: string;
  content: string;
  author?: string;
};

export type CaseStudySlide = {
  title: string;
  href: string;
  hero: string;
  heroAlt: string;
  logo: string;
  logoAlt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProcessMacroStep = {
  title: string;
  content: string;
  icon: "target" | "pen" | "rocket" | "calendar";
};

export const topHeaderAcademyLinks: NavItem[] = [
  { label: "Votre cible", href: "https://devlo.ch/telephone", target: "_blank" },
  { label: "Notre rendez-vous", href: "/academy-notre-appel" },
  { label: "Atteignez vos KPIs", href: "/formation-prospection-b2b#atteignez-vos-kpis" },
  { label: "Ce que vous allez apprendre", href: "/formation-prospection-b2b#Table" },
  { label: "Ce qui est inclus", href: "/formation-prospection-b2b#Included" },
  { label: "Des résultats", href: "/formation-prospection-b2b#results" },
  { label: "FAQ", href: "/formation-prospection-b2b#Faq" },
];

export const mainHeader = {
  languages: [
    { label: "Français", href: "https://devlo.ch/" },
    { label: "English", href: "https://devlo.ch/en/" },
    { label: "German", href: "https://devlo.ch/de/" },
  ],
  links: [
    { label: "Agence", href: "/" },
    { label: "Académie", href: "/formation-prospection-b2b" },
    { label: "Résultats", href: "/resultats-cas-etudes" },
    { label: "Blog", href: "/blog-list" },
  ],
  cta: { label: "Planifier votre Consultation", href: "/telephone" },
};

export const heroContent = {
  badgeText: "Agence suisse",
  title: "Votre Agence B2B de prospection commerciale pour vos ventes: Télémarketing & Lead Generation",
  subtitle:
    "Prises de contact en continu avec vos prospects qualifiés et ce, directement dans vos calendriers",
  body: "Plus que des consultants: votre Agence de confiance #1 pour votre développement commercial.",
  microProof: "⭐ 81% taux d'ouverture · 54% taux de réponse · 16% prospects intéressés (exemple campagne Saporo)",
  cta: { label: "Planifier votre Consultation", href: "/telephone" },
  secondaryCta: { label: "Voir nos résultats →", href: "/resultats-cas-etudes" },
  videoId: "knadmb8za5",
};

export const trustTitle = "Ils nous font confiance";

export const trustLogos: LogoItem[] = [
  { name: "CareerLunch", src: "/images/home/brands/careerlunch.png", alt: "CareerLunch logo" },
  { name: "Cegos", src: "/images/home/brands/cegos.png", alt: "Cegos logo" },
  { name: "Abacus", src: "/images/home/brands/abacus.png", alt: "Abacus logo" },
  { name: "Many Ways", src: "/images/home/brands/many-ways.png", alt: "Many Ways logo" },
  { name: "SquareCo", src: "/images/home/brands/squareco.png", alt: "SquareCo logo" },
  { name: "Locky", src: "/images/home/brands/locky.png", alt: "Locky logo" },
  { name: "Lemanvisio", src: "/images/home/brands/lemanvisio.png", alt: "Lemanvisio logo" },
  { name: "APIDAE", src: "/images/home/brands/apidae.png", alt: "APIDAE logo" },
  { name: "HIAG", src: "/images/home/brands/hiag.png", alt: "HIAG logo" },
  { name: "Saporo", src: "/images/home/brands/saporo.png", alt: "Saporo logo" },
];

export const trustMetrics: TrustMetric[] = [
  { target: 3000, prefix: "+", compactK: true, label: "rendez-vous pris avec succès" },
  { target: 12000, prefix: "+", compactK: true, label: "prospects activés" },
  { target: 50000, prefix: "+", compactK: true, label: "prospects contactés" },
];

export const objectifOffre = {
  objectifTitle: "Notre objectif",
  objectifBody:
    "Prospecter au nom de votre entreprise dans le but de vous faire rencontrer davantage de leads/prospects qualifiés et signer de nouveaux clients.",
  objectifBodyTwo: "Essentiel pour vous, vos commerciaux et votre entreprise.",
  offreTitle: "Notre offre",
  offreBody:
    "Nos clients se tournent vers notre agence de prospection commercial afin d’externaliser toutes les étapes de leur développement B2B: stratégie télémarketing, génération de prospects et création de base de données, démarchage, qualification jusqu’à la prise de contact.",
};

export const objectifOffreToggles: ToggleItem[] = [
  {
    title: "signeZ plus, stresSeZ moins",
    content:
      "Déléguez le développement commercial afin d’augmentez la cadence de vos rendez-vous et signer plus de contrats. Par la même occasion, enlevez-vous le stress de débusquer de nouveaux prospects.",
  },
  {
    title: "Faites ce que vous aimez",
    content:
      "Vous présentez la valeur ajoutée de votre produit ou service mieux que personne. En déléguant votre prospection commerciale, vous pouvez focalisez-vous où votre passion est déterminante.",
  },
  {
    title: "Devenez encore meilleuR",
    content:
      "Prenez le temps de peaufiner les rencontres avec vos prospects, vos présentations et les négociations afin d’améliorer vos taux de conversion et ainsi diminuer la durée de votre cycle de vente.",
  },
  {
    title: "Contrôlez plus facilement vos coûts",
    content:
      "Anticipez plus facilement votre budget lié au développement commercial et soyez plus précis dans vos prévisions.",
  },
  {
    title: "Augmentez votre présence dans vos secteurs cléS",
    content:
      "Nous débloquons le potentiel inexploité de vos secteurs favoris en vous connectant avec de nouvelles opportunités.",
  },
  {
    title: "EXPLOREZ DE NOUVEAUX TERRITOIRES",
    content: "Le monde est à votre portée pour cibler de nouveaux horizons stratégiques.",
  },
  {
    title: "TESTEZ AVANT DE VOUS LANCER",
    content:
      "Validez vos nouvelles offres lors de prélancements en rencontrant de potentiels nouveaux clients.",
  },
  {
    title: "INVITEZ VOS prospects à vos événements",
    content:
      "Informez vos futurs clients de votre présence lors de showrooms, salons, congrès, etc.",
  },
];

export const agencyMethodsCta = {
  title: "En savoir plus sur les méthodes de notre Agence de prospection commerciale B2B?",
  subtitle: "Explorons vos stratégies de prospection - Gratuit et sans engagement",
  cta: { label: "Fixer un appel", href: "/telephone" },
};

export const processTitle = "Processus en 6 étapes";

export const processSteps: ProcessStep[] = [
  {
    title: "Définition de votre cible",
    content:
      "Ensemble, définissons le profil du prospect idéal: industrie, situation géographique, taille d'entreprise, intitulé de poste, etc.",
    icon: "/images/home/process/1-target.png",
    iconAlt: "target icon",
  },
  {
    title: "Étude du profil de votre entreprise",
    content:
      "Ensemble, établissons ce que votre entreprise représente: proposition de valeur, exemples de réussite, arguments clés, etc.",
    icon: "/images/home/process/2-profile.png",
    iconAlt: "profile icon",
  },
  {
    title: "Mise en place DE L'APPROCHE",
    content:
      "devlo conceptualise votre campagne de prospection commerciale en fonction de vos attentes et pour susciter l’intérêt des prospects ciblés.",
    icon: "/images/home/process/3-write.png",
    iconAlt: "write icon",
  },
  {
    title: "Recherche et identification des prospects",
    content:
      "devlo recherche les prospects, identifie leurs coordonnées et les recense dans une base de données.",
    icon: "/images/home/process/4-lens.png",
    iconAlt: "lens icon",
  },
  {
    title: "Lancement de la prospection et qualification",
    content:
      "devlo débute la conversation avec les prospects, identifie leur budget, autorité, besoins, etc.",
    icon: "/images/home/process/5-email.png",
    iconAlt: "email icon",
  },
  {
    title: "Prise de rendez-vous",
    content:
      "devlo agende directement dans votre calendrier des prises de contact et réunions avec des propsects qualifiés.",
    icon: "/images/home/process/6-meeting.png",
    iconAlt: "meeting icon",
  },
];

export const processMacroSteps: ProcessMacroStep[] = [
  {
    icon: "target",
    title: "Ciblage",
    content:
      "Nous définissons votre profil de prospect idéal et les secteurs à forte priorité commerciale.",
  },
  {
    icon: "pen",
    title: "Rédaction",
    content:
      "Nous établissons votre proposition de valeur et vos séquences de prospection multicanales.",
  },
  {
    icon: "rocket",
    title: "Exécution",
    content:
      "Nous identifions, contactons et qualifions vos prospects via une approche continue et mesurable.",
  },
  {
    icon: "calendar",
    title: "Rendez-vous",
    content:
      "Nous planifions directement des prises de contact avec des prospects qualifiés dans vos calendriers.",
  },
];

export const kpiMetrics: MetricItem[] = [
  { value: "+7", label: "années d'expérience" },
  { value: "+3k", label: "rendez-vous pris avec succès" },
  { value: "+12K", label: "prospects activés" },
  { value: "+50K", label: "prospects contactés" },
];

export const enterpriseTitle = "Certaines sociétés rencontrées avec succès";

export const enterpriseLogos: LogoItem[] = [
  { name: "LafargeHolcim", src: "/images/home/logos/lafargeholcim.png", alt: "LafargeHolcim" },
  { name: "ABB", src: "/images/home/logos/abb.png", alt: "ABB logo" },
  { name: "Hublot", src: "/images/home/logos/hublot.png", alt: "Hublot" },
  { name: "Longines", src: "/images/home/logos/longines.png", alt: "Longines" },
  { name: "Lombard Odier", src: "/images/home/logos/lombard-odier.png", alt: "Lombard Odier" },
  { name: "BHP", src: "/images/home/logos/bhp.png", alt: "BHP" },
  { name: "Adecco", src: "/images/home/logos/adecco.png", alt: "Adecco" },
  { name: "Banque Cantonale de Fribourg", src: "/images/home/logos/bcf.png", alt: "Banque Cantonale de Fribourg" },
  { name: "Merck", src: "/images/home/logos/merck.png", alt: "Merck" },
  { name: "Apple", src: "/images/home/logos/apple.png", alt: "Apple" },
  { name: "Implenia", src: "/images/home/logos/implenia.png", alt: "Implenia" },
];

export const proofVideoId = "cr7dgltkvu";

export const testimonials: TestimonialItem[] = [
  {
    image: "/images/home/testimonials/contact-1633100946280.jpg",
    imageAlt: "Olivier",
    content:
      "Je pense que devlo est une organisation partenaire de rêve pour les start-ups qui cherchent à valider leur product-market fit et à obtenir le plus grand nombre possible de rendez-vous qualifiés avec très peu de temps et de ressources. En particulier, le professionnalisme de son fondateur Charles a fait que l’ensemble du processus, de la génération de prospects, à la structuration d’une campagne, jusqu’à l’obtention de rendez-vous, soit une collaboration très agréable et efficace. Pour donner un aperçu, notre première campagne avec devlo: 81% de taux d’ouverture, 54% de taux de réponse et 16% de prospects intéressés par une rencontre avec Saporo. C’est très efficace, surtout dans un secteur aussi complexe que la cybersécurité. Olivier Eyries – CEO – Saporo",
  },
  {
    image: "/images/home/testimonials/tanguy-coustaline.jpg",
    imageAlt: "Tanguy",
    content:
      "Installer des ruches sur le toit de son entreprise ne vient pas spontanément à l’esprit ! C’est là que devlo est venu à notre rescousse ! Les connaissances et l’expérience de devlo en matière de développement des ventes sont ce dont nous avions besoin pour avancer rapidement et rencontrer des prospects qualifiés. A l’issue de notre première campagne, nous avons obtenu un taux de réponse de 39% et 13% des prospects contactés sont intéressés pour en savoir plus sur notre association. Il ne tient maintenant qu’à nous de transformer l’essai et de convaincre de nouveaux partenaires de soutenir la biodiversité avec APIDAE! Tanguy – Président – APIDAE",
  },
  {
    image: "/images/home/testimonials/contact-1517028435372.jpeg",
    imageAlt: "Raphael",
    content:
      "Charles est l’un des experts en vente les plus créatifs et les plus enthousiastes que je connaisse. J’ai travaillé avec lui sur plusieurs campagnes. Il nous a aidés à mettre en place des campagnes de vente hyper-personnalisées, à atteindre des centaines de prospects et, finalement, à obtenir des rendez-vous commerciaux qualifiés. En outre, il nous a également conseillé afin d’affiner notre processus de vente, ce qui a été très utile pour l’ensemble du département des ventes. Je recommande vivement ses compétences et ses services à toutes les startups et PMEs qui souhaitent passer rapidement à la vitesse supérieure.",
    author: "Raphael - Head of Business Development & Marketing - CareerLunch",
  },
  {
    image: "/images/home/testimonials/contact-1674375368600.jpeg",
    imageAlt: "Xavier Leuthold",
    content:
      "Nous avons vraiment apprécié l’assiduité, la clarté de la communication et le dévouement de devlo. Sur 285 prospects, nous avons reçu 200 réponses, soit plus de 70%. L’un de nos défis était d’améliorer nos méthodes de prospection. Avec devlo, nous avons affiné notre ciblage et notre approche avec lemlist. Nous avons également identifié deux types d’Ideal Customer Profiles, des établissements d’enseignement privés et publics. Nous avons contacté les deux et validé l’ICP qui est le plus réceptif à notre offre.",
    author: "Xavier Leuthold - Fondateur - Many Ways SA",
  },
];

export const caseStudiesTitle = "ÉTUDES DE CAS";

export const caseStudySlides: CaseStudySlide[] = [
  {
    title:
      "Comment identifier les meilleurs prospects parmi plusieurs Ideal Customer Profiles (ICP) grâce à des campagnes de prospection commerciale?",
    href: "/resultats/biocarburants-52-rendez-vous",
    hero: "/images/case-studies/heroes/biocarburants-52-rendez-vous-hero.webp",
    heroAlt: "SquareCo_banner",
    logo: "/images/case-studies/logos/biocarburants-52-rendez-vous-logo.png",
    logoAlt: "SquareCo_logo",
  },
  {
    title:
      "Comment cette société de gestion du nettoyage a obtenu 71 rendez-vous qualifiés avec des décideurs B2B dans les plus grandes villes de Suisse, France et Belgique.",
    href: "/resultats/proprete-urbaine-71-rendez-vous",
    hero: "/images/case-studies/heroes/proprete-urbaine-71-rendez-vous-hero.webp",
    heroAlt: "Bannière étude de cas propreté urbaine",
    logo: "",
    logoAlt: "Logo client confidentiel",
  },
  {
    title: "+40 prospects intéressés sur 286 entreprises prospectées par e-mail, appels téléphoniques et prospection LinkedIn",
    href: "/resultats/mobilite-40-prospects",
    hero: "/images/case-studies/heroes/mobilite-40-prospects-hero.webp",
    heroAlt: "Locky_banner",
    logo: "/images/case-studies/logos/mobilite-40-prospects-logo.png",
    logoAlt: "Locky logo",
  },
  {
    title:
      "Comment cette association a externalisé son acquisition de clients et obtenu 70 rendez-vous qualifiés avec des entreprises comme l’UEFA, TAG Heuer, Rothschild, etc.",
    href: "/resultats/biodiversite-70-rendez-vous",
    hero: "/images/case-studies/heroes/biodiversite-70-rendez-vous-hero.webp",
    heroAlt: "APIDAE_banner",
    logo: "/images/case-studies/logos/biodiversite-70-rendez-vous-logo.png",
    logoAlt: "Apidae logo",
  },
  {
    title: "Cybersécurité B2B: Agence de prospection commerciale email et téléphonique",
    href: "/resultats/cybersecurite-4500-entreprises",
    hero: "/images/case-studies/heroes/cybersecurite-4500-entreprises-hero.webp",
    heroAlt: "Saporo_Banner",
    logo: "/images/case-studies/logos/cybersecurite-4500-entreprises-logo.png",
    logoAlt: "Saporo logo",
  },
  {
    title:
      "Comment cet intégrateur audiovisuel a obtenu 16 rendez-vous qualifiés grâce à notre agence de prospection commerciale B2B",
    href: "/resultats/audiovisuel-16-rendez-vous",
    hero: "/images/case-studies/heroes/audiovisuel-16-rendez-vous-hero.webp",
    heroAlt: "LEMANVISIO",
    logo: "/images/case-studies/logos/audiovisuel-16-rendez-vous-logo.png",
    logoAlt: "Lemanvisio logo",
  },
  {
    title:
      "L’immobilier et la prospection commerciale B2B: comment cibler et démarcher des prospects pour la location de surfaces commerciales",
    href: "/resultats/immobilier-11-prospects",
    hero: "/images/case-studies/heroes/immobilier-11-prospects-hero.webp",
    heroAlt: "HIAG_banner",
    logo: "/images/case-studies/logos/immobilier-11-prospects-logo.png",
    logoAlt: "HIAG logo",
  },
  {
    title:
      "Planification de Rendez-vous B2B avec Décideurs “formation & développement des compétences” (L&D): 45% des prospects répondent [Agence de Prospection Commerciale B2B]",
    href: "/resultats/formation-14-rendez-vous",
    hero: "/images/case-studies/heroes/formation-14-rendez-vous-hero.webp",
    heroAlt: "Cegos_banner",
    logo: "/images/case-studies/logos/formation-14-rendez-vous-logo.png",
    logoAlt: "Cegos logo",
  },
  {
    title:
      "Stratégie unique de génération de prospects B2B : Comment CareerLunch a obtenu 54 rendez-vous dans la région DACH alors que la plupart des entreprises avaient déjà été contactées",
    href: "/resultats/hr-54-rendez-vous-dach",
    hero: "/images/case-studies/heroes/hr-54-rendez-vous-dach-hero.webp",
    heroAlt: "CareerLunch_banner",
    logo: "/images/case-studies/logos/hr-54-rendez-vous-dach-logo.jpg",
    logoAlt: "CareerLunch",
  },
  {
    title:
      "Comment cette société de merchandising a obtenu 70% de réponses et 8% de meetings avec leurs prospects grâce à cette séquence de prospection commerciale B2B",
    href: "/resultats/merchandising-23-prospects",
    hero: "/images/case-studies/heroes/merchandising-23-prospects-hero.webp",
    heroAlt: "Ways_banner",
    logo: "/images/case-studies/logos/merchandising-23-prospects-logo.png",
    logoAlt: "Many-Ways_logo",
  },
  {
    title: "Télémarketing B2B dans l’immobilier Suisse:+30 prospects intéressés pour un rendez-vous",
    href: "/resultats/immobilier-30-prospects",
    hero: "/images/case-studies/heroes/immobilier-30-prospects-hero.png",
    heroAlt: "Abacus",
    logo: "/images/case-studies/logos/immobilier-30-prospects-logo.png",
    logoAlt: "Abacus_logo",
  },
  {
    title:
      "Comment nous avons aidé un éditeur de logiciel comptable à conclure 200’000 € de contrats en Belgique grâce à une stratégie outbound multicanale ciblée",
    href: "/resultats/logiciel-comptable-200k-ca",
    hero: "/images/case-studies/heroes/logiciel-comptable-200k-ca-hero.jpg",
    heroAlt: "Horus",
    logo: "/images/case-studies/logos/logiciel-comptable-200k-ca-logo.png",
    logoAlt: "horus_logo",
  },
];

export const caseStudyButton = {
  label: "Explorez les études de cas",
  href: "/resultats-cas-etudes",
};

export const pourquoiTitle = "Pourquoi faire équipe ensemble";

export const pourquoiToggles: ToggleItem[] = [
  {
    title: "Démarche digitale à la pointE",
    content:
      "Nous travaillons avec plusieurs outils informatiques synchronisés ensemble. Ces instruments sont les solutions les plus performantes et novatrices disponibles sur le marché.",
  },
  {
    title: "Approches qui ont fait leurs preuves",
    content:
      "Des centaines de campagnes ont été testées et validées par nos soins dans le passé. Nous nous adaptons toujours aux nouveaux scénarios (régions, industries, profils ciblés, etc.).",
  },
  {
    title: "Experts dans le domaine",
    content:
      "Nous sommes experts et passionnés par la prospection commerciale B2B et les méthodes de télémarketing. Nous avons développé de nombreuses bonnes pratiques au fil des années, de manière à atteindre les prospects de nos clients de manière intelligente et engageante.",
  },
  {
    title: "communication entre vous et nous",
    content:
      "Nous sommes continuellement en contact avec vous. Nous vous tenons informé de l’évolution de vos compagnes de prospection.",
  },
  {
    title: "Notre agilité",
    content:
      "Nous sommes en mesure de nous remettre en question, de nous challenger, de nous adapter à l’environnement et de changer notre mode opératoire s’il le faut.",
  },
  {
    title: "VOTRE SATISFACTION",
    content:
      "Nous prônons une culture de la performance en fixant des objectifs et en produisant des résultats. Un client satisfait est un partenaire sur le long terme.",
  },
];

export const finalCtas = {
  firstTitle: "Démarchage commercial et prise de contacts en continu dans votre calendrier.",
  firstBody:
    "Nous faisons équipe avec vous sur le long terme afin de promouvoir votre savoir-faire, augmenter vos ventes et pérenniser votre organisation.",
  secondTitle: "Rencontrons-nous pour prospecter pour vos futurs clients?",
  secondSubtitle: "Gratuit et Sans engagement",
  secondButton: { label: "Notre rendez-vous", href: "/notrerendez-vous" },
};

export const faqTitle = "FAQ";

export const faqs: FaqItem[] = [
  {
    question: "Qu'est-ce qu'un prospect?",
    answer: "Un prospect (ou un lead en anglais) est un potentiel client.",
  },
  {
    question: "Qu'est-ce qu'une campagne de prospection multicanaL?",
    answer:
      "Une campagne de prospection multicanal touche vos prospects par e-mail, appel téléphonique et LinkedIn. Vous avez une meilleure visibilité auprès de vos prospects. De plus, cette approche se démarque de vos concurrents.",
  },
  {
    question: "Pourquoi la prospection commerciale b2b est une bonne approche?",
    answer:
      "Il s’agit de l’approche la plus économique, reproductible et rapide à mettre en place pour avoir un contact direct avec de potentiels clients. De plus, vous êtes en mesure de cibler très précisément qui vous démarchez.",
  },
  {
    question: "Que garantissez-vous?",
    answer:
      "Avant le lancement de votre campagne, vous validez la génération de prospects. Vous savez donc précisément qui nous allons contacter. Vous validez aussi votre séquence de prospection, donc vous savez ce que vos prospects vont recevoir. Ainsi, nous limitons l’incertitude et maximisons nos chances de recevoir des réponses positives.",
  },
  {
    question: "Cet investissement en vaut-il la peine?",
    answer:
      "En fonction du montant de votre contrat moyen, une seule vente devrait vous permettre de couvrir cet investissement. De plus, vous pouvez aussi voir cette campagne de prospection comme une campagne de communication où un nombre important de potentiels clients découvriront votre offre, et prendront contact avec vous dans le moyen et long terme.",
  },
  {
    question: "Pourquoi choisir devlo?",
    answer:
      "Depuis 2020, notre agence de développement commercial a aidé des dizaines de clients différents. Nous sommes spécialistes dans la génération de prospects, le démarchage et la qualification de prospects B2B. Nos taux de conversion sont nettement au-dessus de la moyenne, et nos clients apprécient la très haute qualité de nos services.",
  },
  {
    question: "NOUS N'AVONS RIEN EN PLACE POUR LE MOMENT, EST-CE UN PROBLÈME?",
    answer:
      "Aucun problème, vous serez accompagnés de A à Z pour mettre en place votre première campagne. Vous n’aurez qu’à ouvrir votre calendrier pour y trouver des rendez-vous planifiés avec vos prospects qualifiés.",
  },
];

export const footerContent = {
  mission:
    "Notre mission est de permettre aux entreprises B2B de rencontrer leurs prospects au travers de campagnes de prospection commerciale ultra-ciblées et personnalisées, et d'un démarchage télémarketing innovant et digital.",
  switzerlandOffice: ["SWITZERLAND OFFICE", "Ruelle des Dolles 1", "CH-1071 Rivaz", "Suisse", "+41 79 758 64 03", "emea@devlo.ch"],
  usaOffice: [
    "USA OFFICE",
    "devlo LLC",
    "500 4TH ST NW",
    "SUITE 102 #1591",
    "ALBUQUERQUE",
    "NM 87102",
    "USA",
    "+1 (234) 201-8019",
    "americas@devlo.ch",
  ],
  agencyMenuTitle: "Agence",
  agencyMenu: [
    { label: "Notre appel", href: "/telephone" },
    { label: "Notre rendez-vous", href: "/notrerendez-vous" },
    { label: "Objectif", href: "/#Objectif" },
    { label: "Processus", href: "/#Processus" },
    { label: "Pourquoi devlo", href: "/#Pourquoi" },
    { label: "Blog", href: "/blog-list" },
    { label: "FAQs", href: "/#Faq" },
  ],
  academyMenuTitle: "Académie",
  academyMenu: topHeaderAcademyLinks,
  termsLabel: "Terms of Service",
  termsHref: "/terms",
  copyright: "© 2026 devlo. All Rights Reserved",
};

export const academyPopupContent = {
  title: "Inscrivez-vous gratuitement",
  body: "Inscrivez simplement votre adresse e-mail et obtenez immédiatement accès au premier chapitre de l'Académie.",
  emailPlaceholder: "Votre e-mail",
  buttonLabel: "C'est parti!",
  successLabel: "Vous vous êtes inscrit avec succès !",
};
