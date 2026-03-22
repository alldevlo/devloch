import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WaveDivider } from "@/components/ui/wave-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFaqPageSchema,
} from "@/lib/seo/schema-builders";

import { AnimatedCounter } from "./animated-counter";
import { SignalBrowser } from "./signal-browser";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = buildPageMetadata({
  title:
    "94 Signaux d'Intention d'Achat B2B — Le Guide Complet pour Identifier vos Prospects",
  description:
    "Decouvrez 94 signaux d'achat B2B classes par categorie (entreprise, personne, tech stack, usage produit, communaute, evenements). Detectez les prospects prets a acheter avant vos concurrents.",
  path: "/insights/buying-signals",
  type: "article",
  datePublished: "2026-03-22",
  dateModified: "2026-03-22",
  author: "Charles Perret",
});

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                        */
/* ------------------------------------------------------------------ */

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Insights", path: "/insights" },
  { name: "94 Signaux d'Achat B2B", path: "/insights/buying-signals" },
];

/* ------------------------------------------------------------------ */
/*  FAQ (SEO schema)                                                  */
/* ------------------------------------------------------------------ */

const faqItems = [
  {
    question:
      "Qu'est-ce qu'un signal d'intention d'achat B2B ?",
    answer:
      "Un signal d'intention d'achat est un événement observable dans la vie d'une entreprise ou d'un contact qui indique une probabilité élevée de besoin pour votre solution. Par exemple : une levée de fonds, un recrutement massif, ou un changement de tech stack.",
  },
  {
    question: "Combien de signaux d'achat existe-t-il ?",
    answer:
      "Ce guide recense 94 signaux répartis en 7 catégories : signaux entreprise (26), signaux personne (10), tech stack (10), usage produit (14), communauté (14), événements (5), et signaux d'intention lemlist (15). Plus 5 signaux high-impact bonus.",
  },
  {
    question:
      "Comment détecter les signaux d'achat automatiquement ?",
    answer:
      "Les outils les plus utilisés incluent Clay, lemlist, Sales Navigator, ZoomInfo, Lonescale, BuiltWith, Bombora, et G2. Chaque signal a un ou plusieurs outils de détection recommandés. L'automatisation passe par des enrichissements de données et des alertes configurées sur ces plateformes.",
  },
  {
    question:
      "Quels sont les signaux d'achat les plus forts ?",
    answer:
      "Les signaux à très forte intensité incluent : demande de démo ou essai, score NPS négatif, identification IT/compliance, pic d'utilisation produit, opportunité commerciale en sommeil, fermeture d'un concurrent, et changement de législation. Ces signaux indiquent un besoin immédiat.",
  },
  {
    question:
      "Comment utiliser les signaux d'achat dans un email de prospection ?",
    answer:
      "Le framework en 5 parties : mentionnez le signal détecté, identifiez le problème qu'il implique, proposez votre solution, ajoutez un CTA simple, et terminez par un proof point. Contactez dans les 24-48h suivant la détection du signal pour un impact maximal.",
  },
];

/* ------------------------------------------------------------------ */
/*  Signal data                                                       */
/* ------------------------------------------------------------------ */

type Signal = {
  name: string;
  intensity: "tres-forte" | "forte" | "moyenne" | "faible";
  description: string;
  detection: string;
};

type SignalCategory = {
  id: string;
  title: string;
  count: number;
  signals: Signal[];
};

const CATEGORIES: SignalCategory[] = [
  {
    id: "entreprise",
    title: "Signaux Entreprise",
    count: 28,
    signals: [
      {
        name: "Recrutement massif",
        intensity: "forte",
        description:
          "Quand une entreprise recrute massivement, elle a besoin de nouveaux outils pour équiper ses équipes. 50 nouveaux commerciaux ? Il leur faut un CRM, des outils d'engagement, de la formation. Chaque poste ouvert est un budget débloqué.",
        detection: "lemlist, Sales Navigator, ZoomInfo, Lonescale",
      },
      {
        name: "Levée de fonds récente",
        intensity: "forte",
        description:
          "Après une levée, les entreprises dépensent pendant environ 6 mois. Le moment idéal se situe entre 30 et 90 jours après l'annonce : elles recrutent, construisent leur stack technologique et planifient leur croissance.",
        detection: "lemlist, Crunchbase, ZoomInfo",
      },
      {
        name: "Opportunité commerciale en sommeil",
        intensity: "tres-forte",
        description:
          "Un deal perdu n'est jamais vraiment mort. Budget libéré ? Nouveau décideur ? Concurrent qui a déçu ? Ces opportunités ont un taux de conversion 3 fois supérieur au cold outreach car la relation existe déjà.",
        detection: "Dealfront",
      },
      {
        name: "Pic d'ouvertures d'emails",
        intensity: "tres-forte",
        description:
          "Un email ouvert 8 fois par la même personne, ce n'est pas de l'obsession — c'est votre champion qui le transmet en interne. Plusieurs ouvertures = plusieurs parties prenantes = comité d'achat actif.",
        detection: "interne (outil emailing)",
      },
      {
        name: "Changement de législation",
        intensity: "tres-forte",
        description:
          "Les nouvelles réglementations créent de l'urgence comme rien d'autre. Le RGPD a fait dépenser des millions aux entreprises du jour au lendemain. Nouvelles lois = budgets obligatoires + attention de la direction + cycles de vente raccourcis.",
        detection: "Google Alerts",
      },
      {
        name: "Changement de politique d'une plateforme",
        intensity: "tres-forte",
        description:
          "Quand Gmail change ses exigences pour les expéditeurs, les outils d'emailing font fortune en quelques semaines. Les changements de plateforme créent une douleur immédiate. Votre fenêtre de tir : 30 à 90 jours maximum.",
        detection: "interne",
      },
      {
        name: "Fermeture ou rachat d'un concurrent",
        intensity: "tres-forte",
        description:
          "Quand un concurrent ferme ou se fait racheter, des milliers d'utilisateurs cherchent une alternative. Pas besoin de prospection froide — ils viennent à vous. Préparez vos pages de comparaison et vos offres de migration.",
        detection: "Owler",
      },
      {
        name: "Vague de licenciements",
        intensity: "forte",
        description:
          "Les licenciements signalent un mode efficacité. Les budgets se resserrent, mais les outils qui promettent un ROI immédiat ou de l'automatisation attirent encore plus l'attention. Vendez de la consolidation et de la productivité.",
        detection: "LinkedIn",
      },
      {
        name: "Avis négatif sur un produit concurrent",
        intensity: "forte",
        description:
          "Les critiques sur G2 ou Reddit sont des signaux d'achat déguisés. Quelqu'un de suffisamment frustré pour écrire un avis est suffisamment frustré pour changer de solution.",
        detection: "G2",
      },
      {
        name: "Abandon de formulaire ou chat",
        intensity: "forte",
        description:
          "Ils ont rempli 80% du formulaire de démo et ont abandonné. Ce n'est pas un rejet — c'est de l'hésitation. Un simple email de relance convertit 20 à 30% de ces abandons en rendez-vous.",
        detection: "Default, Chilipiper",
      },
      {
        name: "Ticket support chez un concurrent",
        intensity: "forte",
        description:
          "Les tickets support = des douleurs identifiées = des budgets qui se débloquent. Quelqu'un qui galère avec son outil actuel est mentalement en train de chercher une alternative.",
        detection: "Intercom, Zendesk",
      },
      {
        name: "Couverture médiatique négative",
        intensity: "forte",
        description:
          "Une fuite de données rend les outils de sécurité indispensables. De mauvais résultats ? Les outils de réduction des coûts sont approuvés plus vite. Approchez avec empathie, pas opportunisme.",
        detection: "Clay",
      },
      {
        name: "Consommation de contenu",
        intensity: "moyenne",
        description:
          "Clics sur vos emails, inscriptions aux webinaires, téléchargement de guides — ce sont des signaux d'intention. Le contenu à forte intention (pages prix, comparatifs) vaut 10 fois plus que les articles de blog.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Rapport trimestriel / Publication 10-K",
        intensity: "moyenne",
        description:
          "Les appels aux analystes révèlent les priorités. Le CEO mentionne 'expansion internationale' ? Les outils de localisation, de paiement, de conformité deviennent urgents.",
        detection: "Claap",
      },
      {
        name: "Participation à un webinaire",
        intensity: "moyenne",
        description:
          "Les participants qui restent plus de 30 minutes comparent des solutions, prennent des notes, construisent un business case. Relancez dans les 24 heures pendant que votre marque est fraîche.",
        detection: "Luma",
      },
      {
        name: "Fusion-acquisition",
        intensity: "moyenne",
        description:
          "Les M&A créent le chaos : outils en doublon, systèmes incompatibles, équipes déboussolées. La consolidation est obligatoire et quelqu'un va se faire remplacer.",
        detection: "PitchBook, Crunchbase",
      },
      {
        name: "Prix ou distinction reçue",
        intensity: "moyenne",
        description:
          "Les récompenses = validation + attention des parties prenantes + budgets pour maintenir l'élan. Félicitez et enchaînez avec une proposition pertinente.",
        detection: "Owler",
      },
      {
        name: "Étude de cas client publiée",
        intensity: "moyenne",
        description:
          "Quand un client vous donne un témoignage, il est au maximum de sa satisfaction. C'est le moment d'élargir la relation et d'explorer des fonctionnalités avancées.",
        detection: "interne",
      },
      {
        name: "Expansion géographique",
        intensity: "moyenne",
        description:
          "Nouveaux marchés = nouvelles contraintes réglementaires, nouveaux moyens de paiement, nouveaux besoins de support. Soyez l'expert local qui facilite l'expansion.",
        detection: "Sales Navigator",
      },
      {
        name: "Expiration d'offre",
        intensity: "moyenne",
        description:
          "Fin de période d'essai ? Remise qui expire ? L'expiration crée de l'urgence, mais seulement si le prospect a vu la valeur. Peignez la douleur du retour en arrière.",
        detection: "interne",
      },
      {
        name: "Bounce d'email prospect ou client",
        intensity: "moyenne",
        description:
          "Un email qui rebondit = changement de poste, licenciement, migration d'inbox. Si c'est un champion qui est parti, retrouvez-le dans sa nouvelle entreprise.",
        detection: "interne",
      },
      {
        name: "Jalon professionnel",
        intensity: "faible",
        description:
          "Anniversaire de travail, promotion, certification — ce sont des occasions de créer du lien. Les promotions signifient aussi de nouveaux budgets.",
        detection: "LinkedIn",
      },
      {
        name: "Couverture médiatique positive",
        intensity: "moyenne",
        description:
          "Un article dans la presse = mode croissance. Ils recrutent, lèvent des fonds, ou lancent quelque chose d'important. Surfez sur l'élan positif.",
        detection: "Clay",
      },
      {
        name: "Publication d'une étude de cas par un concurrent",
        intensity: "moyenne",
        description:
          "Quand vos concurrents publient des études de cas, ils affichent leur liste de clients — et leurs lacunes. Lisez entre les lignes et contactez des entreprises similaires.",
        detection: "manuel",
      },
      {
        name: "Renouvellement de contrat concurrent",
        intensity: "forte",
        description:
          "Quand un contrat arrive à échéance, le prospect est en mode évaluation, les budgets sont révisés. C'est le moment idéal pour proposer une alternative.",
        detection: "Claap",
      },
      {
        name: "Dirigeant qui mentionne un problème en interview",
        intensity: "forte",
        description:
          "Quand un dirigeant parle publiquement de ses défis, il diffuse un signal d'achat. Il dit essentiellement : je cherche des solutions pour ce problème.",
        detection: "Claap",
      },
      {
        name: "Revue trimestrielle planifiée (QBR)",
        intensity: "forte",
        description:
          "Les QBR sont des moments de décision. Arriver avec des données pertinentes juste avant une QBR permet d'influencer les priorités et les budgets.",
        detection: "manuel",
      },
      {
        name: "Déménagement ou expansion de bureaux",
        intensity: "moyenne",
        description:
          "L'expansion physique signifie de nouveaux besoins technologiques — nouvelles licences, nouvelle infrastructure, nouvelles mesures de sécurité.",
        detection: "Bombora",
      },
    ],
  },
  {
    id: "personne",
    title: "Signaux Personne",
    count: 10,
    signals: [
      {
        name: "Changement de poste d'un champion",
        intensity: "forte",
        description:
          "Vos meilleurs clients restent vos meilleurs vendeurs, même après leur départ. Un champion qui aimait votre produit le poussera dans sa nouvelle entreprise. La fenêtre de 90 jours est critique.",
        detection: "lemlist, Lonescale, Cognism, Clay",
      },
      {
        name: "Recrutement d'un profil ICP",
        intensity: "moyenne",
        description:
          "Un nouveau Head of Sales, CMO ou VP Engineering construit sa stack de zéro. Il n'est pas fidèle à l'ancien fournisseur — il est fidèle à ce qui marche. Les 60 premiers jours sont votre fenêtre.",
        detection: "Sales Navigator, lemlist, Clay",
      },
      {
        name: "Nouveau dirigeant (CEO, C-level, board)",
        intensity: "moyenne",
        description:
          "Nouveaux dirigeants = nouveaux budgets, nouveaux fournisseurs, mandat de faire ses preuves. Les 100 premiers jours, ils repensent le stack et challengent les contrats existants.",
        detection: "lemlist, Clay, Sales Navigator",
      },
      {
        name: "Offre d'emploi",
        intensity: "moyenne",
        description:
          "Les offres d'emploi sont des approbations de budget déguisées. Un Head of Sales Ops ? Ils ont besoin de CRM et d'analytics. Contactez-les AVANT que la personne ne commence.",
        detection: "lemlist, Lonescale, Clay",
      },
      {
        name: "Changement de poste chez un concurrent",
        intensity: "forte",
        description:
          "Les ex-employés de vos concurrents connaissent les faiblesses du produit, la roadmap, les raisons de churn. Ne les pitchez pas — apprenez d'eux.",
        detection: "Clay, Sales Navigator, lemlist",
      },
      {
        name: "Promotion d'un client ou prospect",
        intensity: "moyenne",
        description:
          "Promotion = nouvelles responsabilités + nouveaux budgets + pression de quick wins. Félicitez et proposez de résoudre leur nouveau problème.",
        detection: "Clay, Sales Navigator, lemlist",
      },
      {
        name: "Passage dans un podcast",
        intensity: "moyenne",
        description:
          "Les invités de podcast sont des thought leaders qui cherchent à construire leur autorité. Engagez authentiquement en citant un point précis de leur intervention.",
        detection: "Google Alerts",
      },
      {
        name: "Post sur les réseaux sociaux",
        intensity: "moyenne",
        description:
          "Un post LinkedIn qui exprime une douleur est une invitation à aider. Commentez avec de la valeur (pas un pitch), puis glissez en DM.",
        detection: "Clay",
      },
      {
        name: "Article ou thought leadership publié",
        intensity: "moyenne",
        description:
          "Quand un prospect publie du contenu, il signale ses priorités. S'y engager authentiquement montre que vous avez fait vos devoirs.",
        detection: "manuel",
      },
      {
        name: "Anniversaire ou événement personnel",
        intensity: "faible",
        description:
          "Marathons, naissances — les jalons personnels rendent les gens humains. Un rapide félicitations sans rien demander construit la relation pour le long terme.",
        detection: "Clay, Jungler",
      },
    ],
  },
  {
    id: "tech-stack",
    title: "Signaux Tech Stack",
    count: 10,
    signals: [
      {
        name: "Adjacence tech stack",
        intensity: "moyenne",
        description:
          "Connaître le stack technologique d'une entreprise permet de personnaliser votre approche et de montrer de l'empathie avec leurs pain points spécifiques.",
        detection: "BuiltWith",
      },
      {
        name: "Dépréciation d'une fonctionnalité concurrente",
        intensity: "tres-forte",
        description:
          "Quand un concurrent abandonne une fonctionnalité, tous ses utilisateurs qui en dépendaient sont soudain sur le marché. Migration forcée = votre opportunité.",
        detection: "G2",
      },
      {
        name: "Suppression d'une intégration",
        intensity: "forte",
        description:
          "Retirer une intégration du stack signale que l'outil ne donnait pas satisfaction. L'entreprise cherche une meilleure alternative.",
        detection: "interne",
      },
      {
        name: "Changement technologique du site web",
        intensity: "moyenne",
        description:
          "Les changements de stack web signalent des initiatives stratégiques plus larges ou des douleurs de croissance. Migration vers Shopify ? Ils modernisent.",
        detection: "BuiltWith",
      },
      {
        name: "Ajout d'un tag analytics",
        intensity: "moyenne",
        description:
          "L'ajout d'un outil d'analytics montre une volonté de comprendre les comportements utilisateurs. Souvent lié à l'arrivée d'un nouveau responsable marketing ou growth.",
        detection: "BuiltWith, SimilarWeb",
      },
      {
        name: "Ajout d'un tag publicitaire",
        intensity: "moyenne",
        description:
          "L'installation d'un pixel ou tag publicitaire révèle une montée en puissance du budget pub et une volonté de mesurer le ROI des dépenses.",
        detection: "BuiltWith, SimilarWeb",
      },
      {
        name: "Refonte de site web",
        intensity: "moyenne",
        description:
          "Un nouveau site web signale un changement stratégique ou une nouvelle direction go-to-market. Ce niveau d'investissement suggère de l'ambition et des budgets.",
        detection: "manuel",
      },
      {
        name: "Lancement d'un produit ou fonctionnalité",
        intensity: "moyenne",
        description:
          "Le lancement d'un nouveau produit peut signifier un changement de stratégie, une nouvelle ligne de business, ou un nouveau segment client à équiper.",
        detection: "manuel",
      },
      {
        name: "Pic ou chute de trafic web",
        intensity: "moyenne",
        description:
          "Un trafic web qui double signale une croissance rapide (besoin de scaler). S'il chute, c'est un risque de churn. Dans les deux cas, proposez de l'aide.",
        detection: "Semrush, SimilarWeb",
      },
      {
        name: "Lancement d'une application mobile",
        intensity: "moyenne",
        description:
          "Le lancement d'une app signale un investissement mobile-first et crée de nouveaux besoins techniques (analytics mobile, tests, infrastructure).",
        detection: "SensorTower",
      },
    ],
  },
  {
    id: "usage-produit",
    title: "Signaux Usage Produit",
    count: 14,
    signals: [
      {
        name: "Pic d'utilisation du produit",
        intensity: "tres-forte",
        description:
          "Plus d'utilisateurs, plus de fonctionnalités, plus de sessions = ils retirent de la valeur. Frappez quand la satisfaction est haute, pas à l'approche du renouvellement.",
        detection: "interne",
      },
      {
        name: "Identification IT ou compliance",
        intensity: "tres-forte",
        description:
          "Quand l'IT ou la compliance se connecte, ce n'est pas pour naviguer — c'est pour évaluer. Questionnaires de sécurité, demandes SSO = deal en cours. Fournissez proactivement vos docs de conformité.",
        detection: "interne",
      },
      {
        name: "Pic puis chute d'utilisation",
        intensity: "forte",
        description:
          "Un usage qui monte en flèche puis s'effondre = activation ratée ou attentes non satisfaites. C'est le stade presque churné. Réagissez vite pour comprendre ce qui n'a pas fonctionné.",
        detection: "interne",
      },
      {
        name: "Workspaces multiples dans une même entreprise",
        intensity: "tres-forte",
        description:
          "Plusieurs workspaces = confusion ou expansion. Consolidez-les ou upsell vers un plan entreprise. Dans les deux cas : plusieurs points de contact = deal plus gros.",
        detection: "interne",
      },
      {
        name: "Demande de fonctionnalité",
        intensity: "forte",
        description:
          "Les feature requests montrent ce qui bloque l'adoption ou empêche l'expansion. Ce sont des opportunités en or pour montrer votre roadmap.",
        detection: "Claap",
      },
      {
        name: "Demande d'extension de période d'essai",
        intensity: "forte",
        description:
          "Une extension de trial indique un intérêt réel mais aussi des blockers potentiels — budget, buy-in interne, ou questions techniques. Le deal est là, aidez à lever les obstacles.",
        detection: "interne",
      },
      {
        name: "Vidéo produit visionnée",
        intensity: "moyenne",
        description:
          "Le taux de complétion des vidéos montre l'intérêt réel et aide à identifier les fonctionnalités qui comptent le plus pour le prospect.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Utilisation du calculateur ROI",
        intensity: "forte",
        description:
          "Quelqu'un qui utilise votre calculateur ROI est en train de construire un business case pour sa hiérarchie. Il est proche de la décision.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Partage de compte avec un collègue",
        intensity: "forte",
        description:
          "Le partage d'accès montre une recherche de buy-in interne et un élargissement de l'évaluation. Chaque nouveau membre ajouté est un signal d'expansion.",
        detection: "interne",
      },
      {
        name: "Export de données",
        intensity: "moyenne",
        description:
          "L'export peut signaler une adoption (intégration avec d'autres outils) ou un risque de churn (migration en cours). Contactez proactivement pour clarifier.",
        detection: "interne",
      },
      {
        name: "Génération de clé API",
        intensity: "forte",
        description:
          "La création d'une clé API montre une intention d'intégration technique sérieuse. Un développeur est impliqué — la phase d'implémentation a commencé.",
        detection: "interne",
      },
      {
        name: "Abandon de panier",
        intensity: "forte",
        description:
          "En B2B, l'abandon de panier signale une sensibilité au prix ou un besoin d'approbation hiérarchique. C'est le moment de négocier ou d'aider à convaincre en interne.",
        detection: "Albacross, Shopify",
      },
      {
        name: "Score NPS négatif",
        intensity: "tres-forte",
        description:
          "Un NPS bas est un risque de churn qui nécessite une intervention immédiate. Traitez chaque score négatif comme une urgence et planifiez un call de résolution.",
        detection: "interne",
      },
      {
        name: "Demande de démo ou essai gratuit",
        intensity: "tres-forte",
        description:
          "Le signal d'intention le plus fort — ils évaluent activement et comparent des solutions. Qualifiez leurs besoins pour personnaliser la présentation.",
        detection: "Default, Chilipiper",
      },
    ],
  },
  {
    id: "communaute",
    title: "Signaux Communautaires",
    count: 14,
    signals: [
      {
        name: "Actif dans une communauté en ligne",
        intensity: "moyenne",
        description:
          "L'engagement communautaire montre du thought leadership et une volonté d'aider les autres — profil parfait de champion interne.",
        detection: "manuel",
      },
      {
        name: "Question posée dans une communauté",
        intensity: "forte",
        description:
          "Les questions dans les communautés sont des demandes d'aide explicites. C'est littéralement une recherche de fournisseur. Répondez avec de la valeur, pas un pitch.",
        detection: "Trigify",
      },
      {
        name: "Douleur mentionnée dans un forum",
        intensity: "forte",
        description:
          "Les plaintes publiques et frustrations sont des signaux d'achat déguisés. Un post Reddit qui critique un outil concurrent ? C'est un acheteur frustré.",
        detection: "Trigify",
      },
      {
        name: "Feature request upvotée",
        intensity: "moyenne",
        description:
          "L'upvote de fonctionnalités montre ce dont le prospect a besoin mais ne trouve pas dans ses outils actuels. Si votre produit l'a, c'est un pitch tout trouvé.",
        detection: "interne",
      },
      {
        name: "Membre de la communauté d'un concurrent",
        intensity: "moyenne",
        description:
          "Rejoindre la communauté d'un concurrent indique une utilisation active ou une évaluation en cours, avec potentiellement des frustrations exploitables.",
        detection: "Common Room",
      },
      {
        name: "Commentaire sur un blog de l'industrie",
        intensity: "moyenne",
        description:
          "Les commentaires de blog montrent une recherche active et un processus de réflexion sur des sujets pertinents pour votre solution.",
        detection: "Brandwatch",
      },
      {
        name: "Avis laissé sur un concurrent (G2)",
        intensity: "forte",
        description:
          "Les avis montrent une expérience directe et révèlent souvent les manques du produit concurrent. Identifiez les fonctionnalités souhaitées que vous avez déjà.",
        detection: "G2",
      },
      {
        name: "Participation à une conférence concurrente",
        intensity: "moyenne",
        description:
          "La participation montre un investissement significatif dans la catégorie et des besoins potentiels d'expansion. Opportunité de positionnement complémentaire.",
        detection: "manuel",
      },
      {
        name: "Partage de contenu d'un influenceur",
        intensity: "moyenne",
        description:
          "Les patterns d'engagement social révèlent les intérêts, priorités et influences du prospect. Partager du contenu SaaS = acheteur d'outils SaaS potentiel.",
        detection: "FollowersAnalysis",
      },
      {
        name: "Abonnement à une newsletter concurrente",
        intensity: "moyenne",
        description:
          "L'abonnement à la newsletter d'un concurrent montre un intérêt continu pour la catégorie et une veille concurrentielle active.",
        detection: "manuel",
      },
      {
        name: "Follow d'un concurrent sur les réseaux",
        intensity: "moyenne",
        description:
          "Suivre un concurrent indique une awareness de la catégorie et une évaluation potentielle des alternatives. Trois concurrents suivis = recherche active.",
        detection: "Sales Navigator, Pronto",
      },
      {
        name: "Téléchargement de contenu concurrent",
        intensity: "moyenne",
        description:
          "Télécharger du contenu d'un concurrent montre une recherche active de solutions. Proposez votre perspective différente.",
        detection: "manuel",
      },
      {
        name: "Participation à un webinaire concurrent",
        intensity: "forte",
        description:
          "La participation à un webinaire concurrent montre un engagement élevé et une évaluation active de solutions. Ces personnes investissent du temps.",
        detection: "manuel",
      },
      {
        name: "Mention dans une discussion en ligne",
        intensity: "moyenne",
        description:
          "Être mentionné ou tagué dans une discussion montre une pertinence pour le réseau du prospect et ses défis actuels. Signal inbound déguisé.",
        detection: "Mention",
      },
    ],
  },
  {
    id: "evenements",
    title: "Signaux Événements",
    count: 5,
    signals: [
      {
        name: "Prise de parole à une conférence",
        intensity: "moyenne",
        description:
          "Quand votre cible parle à un événement, c'est un brise-glace parfait qui montre que vous suivez son thought leadership. Référencez un point précis de leur talk.",
        detection: "Octoparse, webscraper",
      },
      {
        name: "Inscription à un événement de l'industrie",
        intensity: "moyenne",
        description:
          "L'inscription à un événement montre un engagement actif dans l'industrie et une ouverture aux conversations. Proposez un café sur place.",
        detection: "manuel",
      },
      {
        name: "Sponsoring d'un événement",
        intensity: "moyenne",
        description:
          "Le sponsoring montre des budgets marketing disponibles, des initiatives de branding, et une volonté de visibilité. Ce niveau d'investissement signale des ambitions sérieuses.",
        detection: "Octoparse, webscraper",
      },
      {
        name: "Organisation d'un événement ou webinaire",
        intensity: "moyenne",
        description:
          "Organiser des événements signale un positionnement de thought leader et des initiatives de croissance. Les entreprises qui scalent leurs événements ont souvent besoin d'outils tech.",
        detection: "Luma",
      },
      {
        name: "Stand à un salon professionnel",
        intensity: "moyenne",
        description:
          "La présence à un salon indique une démarche de vente active, un développement de partenariats, ou une expansion de marché. L'occasion d'une rencontre en personne.",
        detection: "Octoparse, webscraper",
      },
    ],
  },
  {
    id: "lemlist-intent",
    title: "Signaux d'Intention Lemlist",
    count: 15,
    signals: [
      {
        name: "Activité sur la page pricing",
        intensity: "forte",
        description:
          "Visiter la page pricing, c'est demander 'C'est combien ?' Le prospect est passé de la curiosité à l'évaluation. Si 3+ visites sans conversion, quelque chose bloque.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Consultation de la documentation",
        intensity: "forte",
        description:
          "Un usage intensif de la documentation montre une évaluation technique et une planification d'implémentation. 2 heures dans vos docs API = acheteur technique en phase active.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de page étude de cas",
        intensity: "moyenne",
        description:
          "Les visites de case studies indiquent une recherche de preuve et de validation auprès d'entreprises similaires. Le prospect construit son business case interne.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de la page intégrations",
        intensity: "moyenne",
        description:
          "La recherche d'intégrations montre une réflexion sur la compatibilité avec le stack existant. La question n'est plus 'c'est bien ?' mais 'ça s'intègre ?'",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de la page sécurité",
        intensity: "forte",
        description:
          "Les visites de page sécurité indiquent une évaluation enterprise et des exigences de conformité. Le prospect est probablement en phase de validation IT/procurement.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Lecture répétée d'un article support",
        intensity: "moyenne",
        description:
          "Revenir plusieurs fois sur le même article support signale une douleur persistante ou une confusion qui nécessite une intervention directe.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Partage de contenu concurrent",
        intensity: "moyenne",
        description:
          "Le partage de contenu concurrent montre une awareness de la catégorie et un comportement de recherche. Assurez-vous d'être dans le comparatif.",
        detection: "lemlist, Clay",
      },
      {
        name: "Visite de page de comparaison",
        intensity: "forte",
        description:
          "Visiter une page 'vs competitor' est un signal d'évaluation active. Le prospect est en train de comparer — donnez-lui les 3 différences clés pour son cas d'usage.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Demande de démo ou d'essai",
        intensity: "tres-forte",
        description:
          "Le signal d'intention le plus fort. Ils évaluent activement et comparent des solutions. Qualifiez et personnalisez la présentation.",
        detection: "Default, Chilipiper",
      },
      {
        name: "Téléchargement de contenu gaté",
        intensity: "moyenne",
        description:
          "Les téléchargements de contenu signalent une recherche active. Un guide de prix vaut 10 fois plus qu'un ebook générique — routez en conséquence.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Changement de description de profil",
        intensity: "moyenne",
        description:
          "Les mises à jour de profil LinkedIn signalent des changements de rôle, de nouvelles priorités, ou des virages stratégiques qui créent des opportunités.",
        detection: "manuel",
      },
      {
        name: "Adhésion à un groupe professionnel",
        intensity: "moyenne",
        description:
          "Rejoindre un groupe professionnel signale un engagement actif et une initiation potentielle de cycle d'achat. L'influence des pairs y est puissante.",
        detection: "PhantomBuster",
      },
      {
        name: "Certification ou formation terminée",
        intensity: "moyenne",
        description:
          "Les signaux d'apprentissage montrent que quelqu'un développe des compétences pour de nouvelles initiatives. Certification AWS ? Initiative infrastructure cloud en cours.",
        detection: "PhantomBuster",
      },
      {
        name: "Page comparaison concurrent visitée",
        intensity: "forte",
        description:
          "Visiter une page de comparaison montre une évaluation active et une considération d'alternatives. Le prospect cherche des différences concrètes.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Article support consulté plusieurs fois",
        intensity: "moyenne",
        description:
          "Les vues répétées de contenu support spécifique révèlent une douleur ou confusion persistante. Proposez de clarifier ou de montrer une meilleure approche.",
        detection: "lemlist, snitcher, Bombora",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Email framework steps                                              */
/* ------------------------------------------------------------------ */

const EMAIL_STEPS = [
  {
    step: "Signal",
    desc: "L'événement observable que vous avez détecté",
  },
  {
    step: "Problème",
    desc: "Le défi que ce signal implique pour le prospect",
  },
  {
    step: "Solution",
    desc: "Comment vous aidez à résoudre ce problème",
  },
  {
    step: "CTA",
    desc: "Une question simple et non-engageante",
  },
  {
    step: "P.S.",
    desc: "Un proof point concret (résultat client, chiffre)",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function BuyingSignalsPage() {
  const totalSignals = CATEGORIES.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildArticleSchema({
            headline:
              "94 Signaux d'Intention d'Achat B2B — Le Guide Complet",
            description:
              "Découvrez 94 signaux d'achat B2B classés par catégorie pour détecter les prospects prêts à acheter avant vos concurrents.",
            path: "/insights/buying-signals",
            imagePath: "/images/CharlesPerretProfilePicture2025.webp",
            datePublished: "2026-03-22",
            dateModified: "2026-03-22",
            author: "Charles Perret",
            authorUrl:
              "https://www.linkedin.com/in/charlesperret-devlo/",
          }),
          buildFaqPageSchema(faqItems),
        ]}
      />

      <main>
        {/* ============================================================ */}
        {/*  Hero Section — blue gradient                                 */}
        {/* ============================================================ */}
        <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 text-white">
          <Breadcrumb items={breadcrumbItems} variant="dark" />

          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pb-14 pt-10 text-center">
            {/* Animated counter */}
            <AnimatedCounter target={totalSignals} />

            {/* Headline + subtitle */}
            <div className="space-y-4">
              <h1
                className="font-black tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  lineHeight: 1.1,
                  textWrap: "balance",
                } as React.CSSProperties}
              >
                Liste des Signaux d&apos;Intention d&apos;Achat B2B
              </h1>
              <p
                className="mx-auto max-w-xl text-white/80"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.625,
                  textWrap: "pretty",
                } as React.CSSProperties}
              >
                La liste la plus complète pour identifier vos prospects prêts à
                acheter — avant vos concurrents. {totalSignals} signaux classés
                par catégorie, intensité et outil de détection.
              </p>
            </div>

            {/* Author card */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/CharlesPerretProfilePicture2025.webp"
                alt="Charles Perret, fondateur de devlo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Charles Perret
                </p>
                <p className="text-xs text-white/60">
                  Fondateur de{" "}
                  <a
                    href="https://devlo.ch"
                    className="underline transition-colors hover:text-white"
                  >
                    devlo.ch
                  </a>{" "}
                  &middot; Mars 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wave transition from hero to white body */}
        <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

        {/* ============================================================ */}
        {/*  Newsletter FR (between hero and signal browser)              */}
        {/* ============================================================ */}
        <section className="mx-auto w-full max-w-3xl px-6 py-12">
          <div className="rounded-xl border border-[#e0e4e6] bg-[#F7F8FC] p-8 text-center">
            <h3 className="text-xl font-semibold text-[#0D0D0D]">
              Recevez nos insights B2B chaque semaine
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[#4A4A4A]">
              Stratégies outbound concrètes, automatisation IA et intelligence
              du marché suisse. Pas de blabla — uniquement ce qui fonctionne.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="mx-auto mt-6 flex max-w-md gap-2"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="votre@email.com"
                className="flex-1 rounded-md border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] placeholder:text-[#8C8C8C] focus:border-[#074f74] focus:outline-none focus:ring-1 focus:ring-[#074f74]"
              />
              <button
                type="submit"
                className="rounded-md bg-[#074f74] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a3a54]"
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  Signal Browser (Client Component)                            */}
        {/* ============================================================ */}
        <SignalBrowser categories={CATEGORIES} />

        {/* ============================================================ */}
        {/*  Email Framework                                              */}
        {/* ============================================================ */}
        <section style={{ background: "hsl(200 25% 97%)" }}>
          <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <h2
                className="font-black tracking-tight"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  lineHeight: 1.15,
                  textWrap: "balance",
                  color: "#0d1a21",
                } as React.CSSProperties}
              >
                Comment utiliser ces signaux dans vos emails de prospection
              </h2>
              <p
                className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
                style={{ color: "#666d70" }}
              >
                Chaque email de prospection basé sur un signal suit un framework
                en 5 parties. Contactez dans les 24-48h suivant la détection
                pour un impact maximal.
              </p>
            </div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute bottom-0 left-6 top-0 hidden w-px sm:block md:left-8"
                style={{
                  background:
                    "linear-gradient(180deg, #e0e4e6, rgba(7,79,116,0.3), #e0e4e6)",
                }}
                aria-hidden="true"
              />

              <div className="space-y-6">
                {EMAIL_STEPS.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-5 sm:gap-6"
                  >
                    <div
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-black text-lg text-white transition-transform duration-200 group-hover:scale-105 md:h-16 md:w-16 md:text-xl"
                      style={{
                        background: "#074f74",
                        boxShadow: "0 4px 12px rgba(7,79,116,0.25)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="pt-1 md:pt-3">
                      <p
                        className="text-base font-bold md:text-lg"
                        style={{ color: "#0d1a21" }}
                      >
                        {item.step}
                      </p>
                      <p
                        className="mt-1 text-sm leading-relaxed"
                        style={{ color: "#666d70" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FAQ Section                                                  */}
        {/* ============================================================ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <h2
            className="mb-12 text-center font-black tracking-tight"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: 1.15,
              textWrap: "balance",
              color: "#0d1a21",
            } as React.CSSProperties}
          >
            Questions fréquentes
          </h2>

          <div
            className="overflow-hidden rounded-xl border bg-white p-2 md:p-4"
            style={{
              borderColor: "#e0e4e6",
              boxShadow: "0 1px 3px hsl(200 20% 80% / 0.3)",
            }}
          >
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group border-b last:border-b-0"
                style={{ borderColor: "#e0e4e6" }}
              >
                <summary className="flex cursor-pointer select-none list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                  <h3
                    className="pr-4 text-sm font-semibold md:text-base"
                    style={{ color: "#0d1a21" }}
                  >
                    {item.question}
                  </h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-[#666d70] transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="pb-5 pr-8">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#666d70" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Wave transition into CTA */}
        <WaveDivider variant="layered-bottom" fromBg="#FFFFFF" toBg="#074f74" />

        {/* ============================================================ */}
        {/*  CTA Section                                                  */}
        {/* ============================================================ */}
        <section
          style={{
            background:
              "linear-gradient(165deg, #074f74 0%, #0a3a54 100%)",
          }}
        >
          <div className="mx-auto max-w-2xl space-y-8 px-6 py-20 text-center md:py-28">
            <h2
              className="font-black text-white"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
                textWrap: "balance",
              } as React.CSSProperties}
            >
              Vous voulez détecter ces signaux automatiquement ?
            </h2>
            <p className="text-base text-white/80">
              devlo configure et automatise la détection de signaux
              d&apos;achat pour vos campagnes de prospection B2B. On transforme
              les signaux en rendez-vous qualifiés.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/consultation"
                className="rounded-lg px-7 py-3 text-sm font-bold text-[#074f74] transition-all duration-150 active:scale-[0.97]"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                Réserver une consultation
              </Link>
              <Link
                href="/services/cold-email"
                className="rounded-lg border px-7 py-3 text-sm font-bold text-white transition-all duration-150 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                Voir nos services
              </Link>
            </div>
          </div>
        </section>

        {/* Freshness signal */}
        <p className="py-8 text-center text-xs" style={{ color: "#666d70" }}>
          Dernière mise à jour : mars 2026
        </p>
      </main>

      {/* Bottom newsletter — same French version */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="rounded-xl border border-[#e0e4e6] bg-[#F7F8FC] p-8 text-center">
          <h3 className="text-xl font-semibold text-[#0D0D0D]">
            Recevez nos insights B2B chaque semaine
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#4A4A4A]">
            Stratégies outbound concrètes, automatisation IA et intelligence
            du marché suisse. Pas de blabla — uniquement ce qui fonctionne.
          </p>
          <form
            action="/api/newsletter"
            method="POST"
            className="mx-auto mt-6 flex max-w-md gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              className="flex-1 rounded-md border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] placeholder:text-[#8C8C8C] focus:border-[#074f74] focus:outline-none focus:ring-1 focus:ring-[#074f74]"
            />
            <button
              type="submit"
              className="rounded-md bg-[#074f74] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a3a54]"
            >
              S&apos;abonner
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
