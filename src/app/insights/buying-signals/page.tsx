import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/json-ld";
import { NewsletterSection } from "@/components/sections/newsletter-section";
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
      "Un signal d'intention d'achat est un evenement observable dans la vie d'une entreprise ou d'un contact qui indique une probabilite elevee de besoin pour votre solution. Par exemple : une levee de fonds, un recrutement massif, ou un changement de tech stack.",
  },
  {
    question: "Combien de signaux d'achat existe-t-il ?",
    answer:
      "Ce guide recense 94 signaux repartis en 7 categories : signaux entreprise (26), signaux personne (10), tech stack (10), usage produit (14), communaute (14), evenements (5), et signaux d'intention lemlist (15). Plus 5 signaux high-impact bonus.",
  },
  {
    question:
      "Comment detecter les signaux d'achat automatiquement ?",
    answer:
      "Les outils les plus utilises incluent Clay, lemlist, Sales Navigator, ZoomInfo, Lonescale, BuiltWith, Bombora, et G2. Chaque signal a un ou plusieurs outils de detection recommandes. L'automatisation passe par des enrichissements de donnees et des alertes configurees sur ces plateformes.",
  },
  {
    question:
      "Quels sont les signaux d'achat les plus forts ?",
    answer:
      "Les signaux a tres forte intensite incluent : demande de demo ou essai, score NPS negatif, identification IT/compliance, pic d'utilisation produit, opportunite commerciale en sommeil, fermeture d'un concurrent, et changement de legislation. Ces signaux indiquent un besoin immediat.",
  },
  {
    question:
      "Comment utiliser les signaux d'achat dans un email de prospection ?",
    answer:
      "Le framework en 5 parties : mentionnez le signal detecte, identifiez le probleme qu'il implique, proposez votre solution, ajoutez un CTA simple, et terminez par un proof point. Contactez dans les 24-48h suivant la detection du signal pour un impact maximal.",
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
          "Quand une entreprise recrute massivement, elle a besoin de nouveaux outils pour equiper ses equipes. 50 nouveaux commerciaux ? Il leur faut un CRM, des outils d'engagement, de la formation. Chaque poste ouvert est un budget debloque.",
        detection: "lemlist, Sales Navigator, ZoomInfo, Lonescale",
      },
      {
        name: "Levee de fonds recente",
        intensity: "forte",
        description:
          "Apres une levee, les entreprises depensent pendant environ 6 mois. Le moment ideal se situe entre 30 et 90 jours apres l'annonce : elles recrutent, construisent leur stack technologique et planifient leur croissance.",
        detection: "lemlist, Crunchbase, ZoomInfo",
      },
      {
        name: "Opportunite commerciale en sommeil",
        intensity: "tres-forte",
        description:
          "Un deal perdu n'est jamais vraiment mort. Budget libere ? Nouveau decideur ? Concurrent qui a decu ? Ces opportunites ont un taux de conversion 3 fois superieur au cold outreach car la relation existe deja.",
        detection: "Dealfront",
      },
      {
        name: "Pic d'ouvertures d'emails",
        intensity: "tres-forte",
        description:
          "Un email ouvert 8 fois par la meme personne, ce n'est pas de l'obsession — c'est votre champion qui le transmet en interne. Plusieurs ouvertures = plusieurs parties prenantes = comite d'achat actif.",
        detection: "interne (outil emailing)",
      },
      {
        name: "Changement de legislation",
        intensity: "tres-forte",
        description:
          "Les nouvelles reglementations creent de l'urgence comme rien d'autre. Le RGPD a fait depenser des millions aux entreprises du jour au lendemain. Nouvelles lois = budgets obligatoires + attention de la direction + cycles de vente raccourcis.",
        detection: "Google Alerts",
      },
      {
        name: "Changement de politique d'une plateforme",
        intensity: "tres-forte",
        description:
          "Quand Gmail change ses exigences pour les expediteurs, les outils d'emailing font fortune en quelques semaines. Les changements de plateforme creent une douleur immediate. Votre fenetre de tir : 30 a 90 jours maximum.",
        detection: "interne",
      },
      {
        name: "Fermeture ou rachat d'un concurrent",
        intensity: "tres-forte",
        description:
          "Quand un concurrent ferme ou se fait racheter, des milliers d'utilisateurs cherchent une alternative. Pas besoin de prospection froide — ils viennent a vous. Preparez vos pages de comparaison et vos offres de migration.",
        detection: "Owler",
      },
      {
        name: "Vague de licenciements",
        intensity: "forte",
        description:
          "Les licenciements signalent un mode efficacite. Les budgets se resserrent, mais les outils qui promettent un ROI immediat ou de l'automatisation attirent encore plus l'attention. Vendez de la consolidation et de la productivite.",
        detection: "LinkedIn",
      },
      {
        name: "Avis negatif sur un produit concurrent",
        intensity: "forte",
        description:
          "Les critiques sur G2 ou Reddit sont des signaux d'achat deguises. Quelqu'un de suffisamment frustre pour ecrire un avis est suffisamment frustre pour changer de solution.",
        detection: "G2",
      },
      {
        name: "Abandon de formulaire ou chat",
        intensity: "forte",
        description:
          "Ils ont rempli 80% du formulaire de demo et ont abandonne. Ce n'est pas un rejet — c'est de l'hesitation. Un simple email de relance convertit 20 a 30% de ces abandons en rendez-vous.",
        detection: "Default, Chilipiper",
      },
      {
        name: "Ticket support chez un concurrent",
        intensity: "forte",
        description:
          "Les tickets support = des douleurs identifiees = des budgets qui se debloquent. Quelqu'un qui galere avec son outil actuel est mentalement en train de chercher une alternative.",
        detection: "Intercom, Zendesk",
      },
      {
        name: "Couverture mediatique negative",
        intensity: "forte",
        description:
          "Une fuite de donnees rend les outils de securite indispensables. De mauvais resultats ? Les outils de reduction des couts sont approuves plus vite. Approchez avec empathie, pas opportunisme.",
        detection: "Clay",
      },
      {
        name: "Consommation de contenu",
        intensity: "moyenne",
        description:
          "Clics sur vos emails, inscriptions aux webinaires, telechargement de guides — ce sont des signaux d'intention. Le contenu a forte intention (pages prix, comparatifs) vaut 10 fois plus que les articles de blog.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Rapport trimestriel / Publication 10-K",
        intensity: "moyenne",
        description:
          "Les appels aux analystes revelent les priorites. Le CEO mentionne 'expansion internationale' ? Les outils de localisation, de paiement, de conformite deviennent urgents.",
        detection: "Claap",
      },
      {
        name: "Participation a un webinaire",
        intensity: "moyenne",
        description:
          "Les participants qui restent plus de 30 minutes comparent des solutions, prennent des notes, construisent un business case. Relancez dans les 24 heures pendant que votre marque est fraiche.",
        detection: "Luma",
      },
      {
        name: "Fusion-acquisition",
        intensity: "moyenne",
        description:
          "Les M&A creent le chaos : outils en doublon, systemes incompatibles, equipes deboussolees. La consolidation est obligatoire et quelqu'un va se faire remplacer.",
        detection: "PitchBook, Crunchbase",
      },
      {
        name: "Prix ou distinction recue",
        intensity: "moyenne",
        description:
          "Les recompenses = validation + attention des parties prenantes + budgets pour maintenir l'elan. Felicitez et enchainez avec une proposition pertinente.",
        detection: "Owler",
      },
      {
        name: "Etude de cas client publiee",
        intensity: "moyenne",
        description:
          "Quand un client vous donne un temoignage, il est au maximum de sa satisfaction. C'est le moment d'elargir la relation et d'explorer des fonctionnalites avancees.",
        detection: "interne",
      },
      {
        name: "Expansion geographique",
        intensity: "moyenne",
        description:
          "Nouveaux marches = nouvelles contraintes reglementaires, nouveaux moyens de paiement, nouveaux besoins de support. Soyez l'expert local qui facilite l'expansion.",
        detection: "Sales Navigator",
      },
      {
        name: "Expiration d'offre",
        intensity: "moyenne",
        description:
          "Fin de periode d'essai ? Remise qui expire ? L'expiration cree de l'urgence, mais seulement si le prospect a vu la valeur. Peignez la douleur du retour en arriere.",
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
          "Anniversaire de travail, promotion, certification — ce sont des occasions de creer du lien. Les promotions signifient aussi de nouveaux budgets.",
        detection: "LinkedIn",
      },
      {
        name: "Couverture mediatique positive",
        intensity: "moyenne",
        description:
          "Un article dans la presse = mode croissance. Ils recrutent, levent des fonds, ou lancent quelque chose d'important. Surfez sur l'elan positif.",
        detection: "Clay",
      },
      {
        name: "Publication d'une etude de cas par un concurrent",
        intensity: "moyenne",
        description:
          "Quand vos concurrents publient des etudes de cas, ils affichent leur liste de clients — et leurs lacunes. Lisez entre les lignes et contactez des entreprises similaires.",
        detection: "manuel",
      },
      {
        name: "Renouvellement de contrat concurrent",
        intensity: "forte",
        description:
          "Quand un contrat arrive a echeance, le prospect est en mode evaluation, les budgets sont revises. C'est le moment ideal pour proposer une alternative.",
        detection: "Claap",
      },
      {
        name: "Dirigeant qui mentionne un probleme en interview",
        intensity: "forte",
        description:
          "Quand un dirigeant parle publiquement de ses defis, il diffuse un signal d'achat. Il dit essentiellement : je cherche des solutions pour ce probleme.",
        detection: "Claap",
      },
      {
        name: "Revue trimestrielle planifiee (QBR)",
        intensity: "forte",
        description:
          "Les QBR sont des moments de decision. Arriver avec des donnees pertinentes juste avant une QBR permet d'influencer les priorites et les budgets.",
        detection: "manuel",
      },
      {
        name: "Demenagement ou expansion de bureaux",
        intensity: "moyenne",
        description:
          "L'expansion physique signifie de nouveaux besoins technologiques — nouvelles licences, nouvelle infrastructure, nouvelles mesures de securite.",
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
          "Vos meilleurs clients restent vos meilleurs vendeurs, meme apres leur depart. Un champion qui aimait votre produit le poussera dans sa nouvelle entreprise. La fenetre de 90 jours est critique.",
        detection: "lemlist, Lonescale, Cognism, Clay",
      },
      {
        name: "Recrutement d'un profil ICP",
        intensity: "moyenne",
        description:
          "Un nouveau Head of Sales, CMO ou VP Engineering construit sa stack de zero. Il n'est pas fidele a l'ancien fournisseur — il est fidele a ce qui marche. Les 60 premiers jours sont votre fenetre.",
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
          "Les offres d'emploi sont des approbations de budget deguisees. Un Head of Sales Ops ? Ils ont besoin de CRM et d'analytics. Contactez-les AVANT que la personne ne commence.",
        detection: "lemlist, Lonescale, Clay",
      },
      {
        name: "Changement de poste chez un concurrent",
        intensity: "forte",
        description:
          "Les ex-employes de vos concurrents connaissent les faiblesses du produit, la roadmap, les raisons de churn. Ne les pitchez pas — apprenez d'eux.",
        detection: "Clay, Sales Navigator, lemlist",
      },
      {
        name: "Promotion d'un client ou prospect",
        intensity: "moyenne",
        description:
          "Promotion = nouvelles responsabilites + nouveaux budgets + pression de quick wins. Felicitez et proposez de resoudre leur nouveau probleme.",
        detection: "Clay, Sales Navigator, lemlist",
      },
      {
        name: "Passage dans un podcast",
        intensity: "moyenne",
        description:
          "Les invites de podcast sont des thought leaders qui cherchent a construire leur autorite. Engagez authentiquement en citant un point precis de leur intervention.",
        detection: "Google Alerts",
      },
      {
        name: "Post sur les reseaux sociaux",
        intensity: "moyenne",
        description:
          "Un post LinkedIn qui exprime une douleur est une invitation a aider. Commentez avec de la valeur (pas un pitch), puis glissez en DM.",
        detection: "Clay",
      },
      {
        name: "Article ou thought leadership publie",
        intensity: "moyenne",
        description:
          "Quand un prospect publie du contenu, il signale ses priorites. S'y engager authentiquement montre que vous avez fait vos devoirs.",
        detection: "manuel",
      },
      {
        name: "Anniversaire ou evenement personnel",
        intensity: "faible",
        description:
          "Marathons, naissances — les jalons personnels rendent les gens humains. Un rapide felicitations sans rien demander construit la relation pour le long terme.",
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
          "Connaitre le stack technologique d'une entreprise permet de personnaliser votre approche et de montrer de l'empathie avec leurs pain points specifiques.",
        detection: "BuiltWith",
      },
      {
        name: "Depreciation d'une fonctionnalite concurrente",
        intensity: "tres-forte",
        description:
          "Quand un concurrent abandonne une fonctionnalite, tous ses utilisateurs qui en dependaient sont soudain sur le marche. Migration forcee = votre opportunite.",
        detection: "G2",
      },
      {
        name: "Suppression d'une integration",
        intensity: "forte",
        description:
          "Retirer une integration du stack signale que l'outil ne donnait pas satisfaction. L'entreprise cherche une meilleure alternative.",
        detection: "interne",
      },
      {
        name: "Changement technologique du site web",
        intensity: "moyenne",
        description:
          "Les changements de stack web signalent des initiatives strategiques plus larges ou des douleurs de croissance. Migration vers Shopify ? Ils modernisent.",
        detection: "BuiltWith",
      },
      {
        name: "Ajout d'un tag analytics",
        intensity: "moyenne",
        description:
          "L'ajout d'un outil d'analytics montre une volonte de comprendre les comportements utilisateurs. Souvent lie a l'arrivee d'un nouveau responsable marketing ou growth.",
        detection: "BuiltWith, SimilarWeb",
      },
      {
        name: "Ajout d'un tag publicitaire",
        intensity: "moyenne",
        description:
          "L'installation d'un pixel ou tag publicitaire revele une montee en puissance du budget pub et une volonte de mesurer le ROI des depenses.",
        detection: "BuiltWith, SimilarWeb",
      },
      {
        name: "Refonte de site web",
        intensity: "moyenne",
        description:
          "Un nouveau site web signale un changement strategique ou une nouvelle direction go-to-market. Ce niveau d'investissement suggere de l'ambition et des budgets.",
        detection: "manuel",
      },
      {
        name: "Lancement d'un produit ou fonctionnalite",
        intensity: "moyenne",
        description:
          "Le lancement d'un nouveau produit peut signifier un changement de strategie, une nouvelle ligne de business, ou un nouveau segment client a equiper.",
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
          "Le lancement d'une app signale un investissement mobile-first et cree de nouveaux besoins techniques (analytics mobile, tests, infrastructure).",
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
          "Plus d'utilisateurs, plus de fonctionnalites, plus de sessions = ils retirent de la valeur. Frappez quand la satisfaction est haute, pas a l'approche du renouvellement.",
        detection: "interne",
      },
      {
        name: "Identification IT ou compliance",
        intensity: "tres-forte",
        description:
          "Quand l'IT ou la compliance se connecte, ce n'est pas pour naviguer — c'est pour evaluer. Questionnaires de securite, demandes SSO = deal en cours. Fournissez proactivement vos docs de conformite.",
        detection: "interne",
      },
      {
        name: "Pic puis chute d'utilisation",
        intensity: "forte",
        description:
          "Un usage qui monte en fleche puis s'effondre = activation ratee ou attentes non satisfaites. C'est le stade presque churne. Reagissez vite pour comprendre ce qui n'a pas fonctionne.",
        detection: "interne",
      },
      {
        name: "Workspaces multiples dans une meme entreprise",
        intensity: "tres-forte",
        description:
          "Plusieurs workspaces = confusion ou expansion. Consolidez-les ou upsell vers un plan entreprise. Dans les deux cas : plusieurs points de contact = deal plus gros.",
        detection: "interne",
      },
      {
        name: "Demande de fonctionnalite",
        intensity: "forte",
        description:
          "Les feature requests montrent ce qui bloque l'adoption ou empeche l'expansion. Ce sont des opportunites en or pour montrer votre roadmap.",
        detection: "Claap",
      },
      {
        name: "Demande d'extension de periode d'essai",
        intensity: "forte",
        description:
          "Une extension de trial indique un interet reel mais aussi des blockers potentiels — budget, buy-in interne, ou questions techniques. Le deal est la, aidez a lever les obstacles.",
        detection: "interne",
      },
      {
        name: "Video produit visionnee",
        intensity: "moyenne",
        description:
          "Le taux de completion des videos montre l'interet reel et aide a identifier les fonctionnalites qui comptent le plus pour le prospect.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Utilisation du calculateur ROI",
        intensity: "forte",
        description:
          "Quelqu'un qui utilise votre calculateur ROI est en train de construire un business case pour sa hierarchie. Il est proche de la decision.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Partage de compte avec un collegue",
        intensity: "forte",
        description:
          "Le partage d'acces montre une recherche de buy-in interne et un elargissement de l'evaluation. Chaque nouveau membre ajoute est un signal d'expansion.",
        detection: "interne",
      },
      {
        name: "Export de donnees",
        intensity: "moyenne",
        description:
          "L'export peut signaler une adoption (integration avec d'autres outils) ou un risque de churn (migration en cours). Contactez proactivement pour clarifier.",
        detection: "interne",
      },
      {
        name: "Generation de cle API",
        intensity: "forte",
        description:
          "La creation d'une cle API montre une intention d'integration technique serieuse. Un developpeur est implique — la phase d'implementation a commence.",
        detection: "interne",
      },
      {
        name: "Abandon de panier",
        intensity: "forte",
        description:
          "En B2B, l'abandon de panier signale une sensibilite au prix ou un besoin d'approbation hierarchique. C'est le moment de negocier ou d'aider a convaincre en interne.",
        detection: "Albacross, Shopify",
      },
      {
        name: "Score NPS negatif",
        intensity: "tres-forte",
        description:
          "Un NPS bas est un risque de churn qui necessite une intervention immediate. Traitez chaque score negatif comme une urgence et planifiez un call de resolution.",
        detection: "interne",
      },
      {
        name: "Demande de demo ou essai gratuit",
        intensity: "tres-forte",
        description:
          "Le signal d'intention le plus fort — ils evaluent activement et comparent des solutions. Qualifiez leurs besoins pour personnaliser la presentation.",
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
        name: "Actif dans une communaute en ligne",
        intensity: "moyenne",
        description:
          "L'engagement communautaire montre du thought leadership et une volonte d'aider les autres — profil parfait de champion interne.",
        detection: "manuel",
      },
      {
        name: "Question posee dans une communaute",
        intensity: "forte",
        description:
          "Les questions dans les communautes sont des demandes d'aide explicites. C'est litteralement une recherche de fournisseur. Repondez avec de la valeur, pas un pitch.",
        detection: "Trigify",
      },
      {
        name: "Douleur mentionnee dans un forum",
        intensity: "forte",
        description:
          "Les plaintes publiques et frustrations sont des signaux d'achat deguises. Un post Reddit qui critique un outil concurrent ? C'est un acheteur frustre.",
        detection: "Trigify",
      },
      {
        name: "Feature request upvotee",
        intensity: "moyenne",
        description:
          "L'upvote de fonctionnalites montre ce dont le prospect a besoin mais ne trouve pas dans ses outils actuels. Si votre produit l'a, c'est un pitch tout trouve.",
        detection: "interne",
      },
      {
        name: "Membre de la communaute d'un concurrent",
        intensity: "moyenne",
        description:
          "Rejoindre la communaute d'un concurrent indique une utilisation active ou une evaluation en cours, avec potentiellement des frustrations exploitables.",
        detection: "Common Room",
      },
      {
        name: "Commentaire sur un blog de l'industrie",
        intensity: "moyenne",
        description:
          "Les commentaires de blog montrent une recherche active et un processus de reflexion sur des sujets pertinents pour votre solution.",
        detection: "Brandwatch",
      },
      {
        name: "Avis laisse sur un concurrent (G2)",
        intensity: "forte",
        description:
          "Les avis montrent une experience directe et revelent souvent les manques du produit concurrent. Identifiez les fonctionnalites souhaitees que vous avez deja.",
        detection: "G2",
      },
      {
        name: "Participation a une conference concurrente",
        intensity: "moyenne",
        description:
          "La participation montre un investissement significatif dans la categorie et des besoins potentiels d'expansion. Opportunite de positionnement complementaire.",
        detection: "manuel",
      },
      {
        name: "Partage de contenu d'un influenceur",
        intensity: "moyenne",
        description:
          "Les patterns d'engagement social revelent les interets, priorites et influences du prospect. Partager du contenu SaaS = acheteur d'outils SaaS potentiel.",
        detection: "FollowersAnalysis",
      },
      {
        name: "Abonnement a une newsletter concurrente",
        intensity: "moyenne",
        description:
          "L'abonnement a la newsletter d'un concurrent montre un interet continu pour la categorie et une veille concurrentielle active.",
        detection: "manuel",
      },
      {
        name: "Follow d'un concurrent sur les reseaux",
        intensity: "moyenne",
        description:
          "Suivre un concurrent indique une awareness de la categorie et une evaluation potentielle des alternatives. Trois concurrents suivis = recherche active.",
        detection: "Sales Navigator, Pronto",
      },
      {
        name: "Telechargement de contenu concurrent",
        intensity: "moyenne",
        description:
          "Telecharger du contenu d'un concurrent montre une recherche active de solutions. Proposez votre perspective differente.",
        detection: "manuel",
      },
      {
        name: "Participation a un webinaire concurrent",
        intensity: "forte",
        description:
          "La participation a un webinaire concurrent montre un engagement eleve et une evaluation active de solutions. Ces personnes investissent du temps.",
        detection: "manuel",
      },
      {
        name: "Mention dans une discussion en ligne",
        intensity: "moyenne",
        description:
          "Etre mentionne ou tague dans une discussion montre une pertinence pour le reseau du prospect et ses defis actuels. Signal inbound deguise.",
        detection: "Mention",
      },
    ],
  },
  {
    id: "evenements",
    title: "Signaux Evenements",
    count: 5,
    signals: [
      {
        name: "Prise de parole a une conference",
        intensity: "moyenne",
        description:
          "Quand votre cible parle a un evenement, c'est un brise-glace parfait qui montre que vous suivez son thought leadership. Reference un point precis de leur talk.",
        detection: "Octoparse, webscraper",
      },
      {
        name: "Inscription a un evenement de l'industrie",
        intensity: "moyenne",
        description:
          "L'inscription a un evenement montre un engagement actif dans l'industrie et une ouverture aux conversations. Proposez un cafe sur place.",
        detection: "manuel",
      },
      {
        name: "Sponsoring d'un evenement",
        intensity: "moyenne",
        description:
          "Le sponsoring montre des budgets marketing disponibles, des initiatives de branding, et une volonte de visibilite. Ce niveau d'investissement signale des ambitions serieuses.",
        detection: "Octoparse, webscraper",
      },
      {
        name: "Organisation d'un evenement ou webinaire",
        intensity: "moyenne",
        description:
          "Organiser des evenements signale un positionnement de thought leader et des initiatives de croissance. Les entreprises qui scalent leurs evenements ont souvent besoin d'outils tech.",
        detection: "Luma",
      },
      {
        name: "Stand a un salon professionnel",
        intensity: "moyenne",
        description:
          "La presence a un salon indique une demarche de vente active, un developpement de partenariats, ou une expansion de marche. L'occasion d'une rencontre en personne.",
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
        name: "Activite sur la page pricing",
        intensity: "forte",
        description:
          "Visiter la page pricing, c'est demander 'C'est combien ?' Le prospect est passe de la curiosite a l'evaluation. Si 3+ visites sans conversion, quelque chose bloque.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Consultation de la documentation",
        intensity: "forte",
        description:
          "Un usage intensif de la documentation montre une evaluation technique et une planification d'implementation. 2 heures dans vos docs API = acheteur technique en phase active.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de page etude de cas",
        intensity: "moyenne",
        description:
          "Les visites de case studies indiquent une recherche de preuve et de validation aupres d'entreprises similaires. Le prospect construit son business case interne.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de la page integrations",
        intensity: "moyenne",
        description:
          "La recherche d'integrations montre une reflexion sur la compatibilite avec le stack existant. La question n'est plus 'c'est bien ?' mais 'ca s'integre ?'",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Visite de la page securite",
        intensity: "forte",
        description:
          "Les visites de page securite indiquent une evaluation enterprise et des exigences de conformite. Le prospect est probablement en phase de validation IT/procurement.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Lecture repetee d'un article support",
        intensity: "moyenne",
        description:
          "Revenir plusieurs fois sur le meme article support signale une douleur persistante ou une confusion qui necessite une intervention directe.",
        detection: "lemlist, snitcher, Bombora",
      },
      {
        name: "Partage de contenu concurrent",
        intensity: "moyenne",
        description:
          "Le partage de contenu concurrent montre une awareness de la categorie et un comportement de recherche. Assurez-vous d'etre dans le comparatif.",
        detection: "lemlist, Clay",
      },
      {
        name: "Visite de page de comparaison",
        intensity: "forte",
        description:
          "Visiter une page 'vs competitor' est un signal d'evaluation active. Le prospect est en train de comparer — donnez-lui les 3 differences cles pour son cas d'usage.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Demande de demo ou d'essai",
        intensity: "tres-forte",
        description:
          "Le signal d'intention le plus fort. Ils evaluent activement et comparent des solutions. Qualifiez et personnalisez la presentation.",
        detection: "Default, Chilipiper",
      },
      {
        name: "Telechargement de contenu gate",
        intensity: "moyenne",
        description:
          "Les telechargements de contenu signalent une recherche active. Un guide de prix vaut 10 fois plus qu'un ebook generique — routez en consequence.",
        detection: "HubSpot, Salesforce",
      },
      {
        name: "Changement de description de profil",
        intensity: "moyenne",
        description:
          "Les mises a jour de profil LinkedIn signalent des changements de role, de nouvelles priorites, ou des virages strategiques qui creent des opportunites.",
        detection: "manuel",
      },
      {
        name: "Adhesion a un groupe professionnel",
        intensity: "moyenne",
        description:
          "Rejoindre un groupe professionnel signale un engagement actif et une initiation potentielle de cycle d'achat. L'influence des pairs y est puissante.",
        detection: "PhantomBuster",
      },
      {
        name: "Certification ou formation terminee",
        intensity: "moyenne",
        description:
          "Les signaux d'apprentissage montrent que quelqu'un developpe des competences pour de nouvelles initiatives. Certification AWS ? Initiative infrastructure cloud en cours.",
        detection: "PhantomBuster",
      },
      {
        name: "Page comparaison concurrent visitee",
        intensity: "forte",
        description:
          "Visiter une page de comparaison montre une evaluation active et une consideration d'alternatives. Le prospect cherche des differences concretes.",
        detection: "snitcher, Bombora",
      },
      {
        name: "Article support consulte plusieurs fois",
        intensity: "moyenne",
        description:
          "Les vues repetees de contenu support specifique revelent une douleur ou confusion persistante. Proposez de clarifier ou de montrer une meilleure approche.",
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
    desc: "L'evenement observable que vous avez detecte",
  },
  {
    step: "Probleme",
    desc: "Le defi que ce signal implique pour le prospect",
  },
  {
    step: "Solution",
    desc: "Comment vous aidez a resoudre ce probleme",
  },
  {
    step: "CTA",
    desc: "Une question simple et non-engageante",
  },
  {
    step: "P.S.",
    desc: "Un proof point concret (resultat client, chiffre)",
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
              "Decouvrez 94 signaux d'achat B2B classes par categorie pour detecter les prospects prets a acheter avant vos concurrents.",
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
        {/*  Hero Section                                                 */}
        {/* ============================================================ */}
        <section
          style={{
            background:
              "linear-gradient(165deg, hsl(200 30% 97%) 0%, hsl(200 40% 93%) 100%)",
          }}
        >
          {/* Bottom decorative line */}
          <div className="relative">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
              {/* Animated counter */}
              <AnimatedCounter target={totalSignals} />

              {/* Headline + subtitle */}
              <div className="space-y-5">
                <h1
                  className="font-black tracking-tight"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    lineHeight: 1.1,
                    textWrap: "balance",
                    color: "#0d1a21",
                  } as React.CSSProperties}
                >
                  Signaux d&apos;Intention d&apos;Achat B2B
                </h1>
                <p
                  className="mx-auto max-w-xl"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    lineHeight: 1.625,
                    textWrap: "pretty",
                    color: "#666d70",
                  } as React.CSSProperties}
                >
                  Le guide complet pour identifier vos prospects prets a acheter
                  — avant vos concurrents. {totalSignals} signaux classes par
                  categorie, intensite et outil de detection.
                </p>
              </div>

              {/* Author card */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "#074f74" }}
                >
                  CP
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold" style={{ color: "#0d1a21" }}>
                    Charles Perret
                  </p>
                  <p className="text-xs" style={{ color: "#666d70" }}>
                    Fondateur de{" "}
                    <a
                      href="https://devlo.ch"
                      className="underline transition-colors hover:text-[#0d1a21]"
                    >
                      devlo.ch
                    </a>{" "}
                    &middot; Mars 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom gradient line */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #e0e4e6, transparent)",
              }}
              aria-hidden="true"
            />
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
                Comment utiliser ces signaux dans un email
              </h2>
              <p
                className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
                style={{ color: "#666d70" }}
              >
                Chaque email de prospection base sur un signal suit un framework
                en 5 parties. Contactez dans les 24-48h suivant la detection
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
            Questions frequentes
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
              Vous voulez detecter ces signaux automatiquement ?
            </h2>
            <p className="text-base text-white/80">
              devlo configure et automatise la detection de signaux
              d&apos;achat pour vos campagnes de prospection B2B. On transforme
              les signaux en rendez-vous qualifies.
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
                Reserver une consultation
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

        {/* ============================================================ */}
        {/*  Footer line                                                  */}
        {/* ============================================================ */}
        <footer
          className="border-t px-6 py-12"
          style={{ borderColor: "#e0e4e6" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-xs md:flex-row"
            style={{ color: "#666d70" }}
          >
            <span>Derniere mise a jour : mars 2026</span>
            <nav className="flex flex-wrap gap-6">
              <Link
                href="/services/cold-email"
                className="transition-colors hover:text-[#0d1a21]"
              >
                Cold email
              </Link>
              <Link
                href="/services/linkedin-outreach"
                className="transition-colors hover:text-[#0d1a21]"
              >
                LinkedIn outreach
              </Link>
              <Link
                href="/services/generation-leads"
                className="transition-colors hover:text-[#0d1a21]"
              >
                Generation de leads
              </Link>
            </nav>
            <span>
              &copy; 2026{" "}
              <a
                href="https://devlo.ch"
                className="underline transition-colors hover:text-[#0d1a21]"
              >
                devlo.ch
              </a>
            </span>
          </div>
        </footer>
      </main>

      <NewsletterSection />
    </>
  );
}
