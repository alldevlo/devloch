export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  relatedServiceSlug: string;
  body: string[];
};

export const articles: BlogArticle[] = [
  {
    slug: "cold-email-b2b-guide-complet",
    title: "Cold email B2B : le guide complet pour 2026",
    description:
      "Découvrez comment structurer, rédiger et déployer des campagnes de cold email B2B performantes. Méthode éprouvée sur 1000+ campagnes.",
    date: "2026-03-01",
    category: "Cold Email",
    relatedServiceSlug: "cold-email",
    body: [
      "Le cold email reste en 2026 l'un des canaux les plus rentables pour la prospection B2B. Avec un coût par lead 5 à 10 fois inférieur au paid advertising, il offre un ROI difficilement égalable — à condition de maîtriser les fondamentaux.",

      "## 1. Construire une liste de prospects qualifiés",
      "Tout commence par la qualité de votre liste. Utilisez des outils comme Apollo, LinkedIn Sales Navigator ou Clay pour identifier des décideurs correspondant à votre ICP (Ideal Customer Profile). Chaque contact doit être vérifié : email valide, poste actuel, entreprise correspondant à vos critères.",

      "## 2. Rédiger des emails qui convertissent",
      "Un bon cold email fait moins de 120 mots. Il commence par une accroche personnalisée (pas \"Cher Monsieur\"), expose un problème que le prospect reconnaît, et propose une action simple (un appel de 15 minutes). Évitez les pièces jointes, les liens multiples et le jargon marketing.",

      "## 3. Séquencer intelligemment",
      "Une séquence optimale comporte 4 à 6 emails sur 14 à 21 jours. Le premier email est le plus important — c'est lui qui ouvre la conversation. Les relances doivent apporter de la valeur (étude de cas, statistique, insight) et non simplement \"relancer\".",

      "## 4. Optimiser la délivrabilité",
      "En 2026, la délivrabilité est devenue le facteur n°1 de succès. Configurez SPF, DKIM et DMARC sur vos domaines d'envoi. Utilisez des domaines dédiés (pas votre domaine principal). Chauffez vos boîtes pendant 2 à 3 semaines avant d'envoyer. Maintenez un volume d'envoi stable.",

      "## 5. Mesurer et itérer",
      "Les KPI à suivre : taux d'ouverture (objectif > 60 %), taux de réponse (objectif > 5 %), taux de rendez-vous (objectif > 2 %). Testez systématiquement vos objets, accroches et CTA. Une campagne performante se construit par itérations successives.",

      "## Conclusion",
      "Le cold email B2B n'est pas du spam — c'est une conversation initiée de manière professionnelle avec un décideur qui a un problème que vous pouvez résoudre. Chez devlo, nous avons déployé plus de 1000 campagnes avec cette méthodologie. Le résultat : des milliers de rendez-vous qualifiés pour nos clients en Suisse, Belgique, France et au-delà.",
    ],
  },
  {
    slug: "externaliser-prospection-commerciale",
    title: "Externaliser sa prospection commerciale : guide décisionnel",
    description:
      "Quand et comment externaliser sa prospection B2B ? Critères de décision, avantages, risques et méthode pour choisir le bon partenaire.",
    date: "2026-03-05",
    category: "Stratégie",
    relatedServiceSlug: "outbound-multicanal",
    body: [
      "Externaliser sa prospection commerciale est une décision stratégique majeure. Bien exécutée, elle accélère votre pipeline de 3 à 6 mois. Mal gérée, elle brûle du budget sans résultat. Voici comment prendre la bonne décision.",

      "## Quand externaliser ?",
      "L'externalisation fait sens dans trois situations : (1) votre équipe commerciale est saturée et ne peut pas prospecter, (2) vous entrez sur un nouveau marché sans réseau local, (3) vous voulez tester un canal (cold email, LinkedIn, calling) avant d'investir en interne.",

      "## Les avantages concrets",
      "Une agence spécialisée apporte l'infrastructure (outils, domaines, données), l'expertise (copywriting, séquençage, délivrabilité) et le volume (capacité à contacter des centaines de décideurs par semaine). Le temps de mise en production est de 2 à 4 semaines, contre 3 à 6 mois pour monter une équipe interne.",

      "## Les risques à anticiper",
      "Le principal risque est le désalignement sur l'ICP et le messaging. Si l'agence ne comprend pas votre proposition de valeur, les rendez-vous seront de mauvaise qualité. Solution : investissez du temps dans le brief initial et validez les séquences avant envoi.",

      "## Comment choisir son partenaire",
      "Cinq critères essentiels : (1) expérience dans votre secteur ou marché, (2) transparence sur la méthodologie et les outils, (3) références vérifiables avec des résultats chiffrés, (4) modèle de pricing aligné sur la performance, (5) reporting régulier et accès aux données.",

      "## Le modèle devlo",
      "Chez devlo, nous combinons trois canaux (cold email, LinkedIn, cold calling) dans une approche multicanale coordonnée. Chaque campagne démarre par un workshop ICP, suivi d'un phase de test de 2 semaines, puis un déploiement à l'échelle. Plus de 1000 campagnes déployées depuis 2020 en Suisse, Belgique, France, DACH et Amérique du Nord.",

      "## Conclusion",
      "L'externalisation de la prospection est un accélérateur, pas un substitut à votre stratégie commerciale. Elle fonctionne mieux quand votre offre est claire, votre marché identifié, et votre équipe prête à convertir les rendez-vous en clients.",
    ],
  },
  {
    slug: "intent-data-prospects-prets-acheter",
    title: "Intent data : identifier les prospects prêts à acheter",
    description:
      "Comment utiliser les signaux d'intention d'achat pour cibler les bons prospects au bon moment. Guide pratique pour les équipes B2B.",
    date: "2026-03-08",
    category: "Intent Data",
    relatedServiceSlug: "intent-data",
    body: [
      "En prospection B2B, le timing est aussi important que le ciblage. L'intent data — les signaux d'intention d'achat — permet d'identifier les entreprises qui recherchent activement des solutions comme la vôtre. Résultat : des taux de conversion 2 à 5 fois supérieurs.",

      "## Qu'est-ce que l'intent data ?",
      "L'intent data regroupe les signaux comportementaux indiquant qu'une entreprise ou un décideur s'intéresse à un sujet spécifique. Ces signaux proviennent de trois sources : la consommation de contenu en ligne (articles, webinaires, livres blancs), les recherches sur des sites de comparaison (G2, Capterra), et les changements organisationnels (recrutements, levées de fonds, changements de direction).",

      "## Les types de signaux à surveiller",
      "Signaux forts : visite répétée de pages produit/pricing, téléchargement de comparatifs, recherche de mots-clés transactionnels. Signaux modérés : consommation de contenu éducatif, participation à des webinaires sectoriels. Signaux contextuels : recrutement sur des postes liés à votre solution, levée de fonds récente, changement de CTO/CMO.",

      "## Comment intégrer l'intent data dans votre prospection",
      "Étape 1 : Définissez vos \"intent topics\" — les sujets que vos prospects recherchent avant d'acheter. Étape 2 : Connectez une source d'intent data (Bombora, G2, 6sense) à votre CRM. Étape 3 : Créez des scores de priorité combinant intent + ICP fit. Étape 4 : Déclenchez des séquences outbound personnalisées sur les comptes à score élevé.",

      "## L'intent data chez devlo",
      "Notre service Intent Data combine plusieurs sources de signaux pour créer des listes de prospection ultra-ciblées. Pour chaque campagne, nous identifions les entreprises qui montrent des signes d'intérêt actif pour votre catégorie de solution. Le résultat : des taux de réponse 2 à 3 fois supérieurs aux campagnes \"cold\" classiques.",

      "## Conclusion",
      "L'intent data transforme la prospection \"à froid\" en prospection \"tiède\". Au lieu de contacter des centaines de prospects au hasard, vous concentrez vos efforts sur les entreprises qui ont déjà commencé leur parcours d'achat. C'est la différence entre frapper à toutes les portes et ouvrir celles qui sont déjà entrouvertes.",
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
