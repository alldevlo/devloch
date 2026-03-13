import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

import { ComparisonTable } from "@/components/ai-sales-ops/comparison-table";
import { PersonaCard } from "@/components/ai-sales-ops/persona-card";
import { ProcessStep } from "@/components/ai-sales-ops/process-step";
import { SystemCard } from "@/components/ai-sales-ops/system-card";
import { JsonLd } from "@/components/seo/json-ld";
const CaseStudyCarousel = dynamic(
  () => import("@/components/ai-sales-ops/case-study-carousel").then((m) => m.CaseStudyCarousel),
  { ssr: false },
);
import { FAQSection } from "@/components/shared/faq-section";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { InfiniteLogoRail } from "@/components/shared/logo-rail";
import { ServicesSectionHeader, ServicesSurfaceCard } from "@/components/services/services-ui";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClassName } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { HubspotForm } from "@/components/ui/hubspot-form";
import { WaveDivider } from "@/components/ui/wave-divider";
import { TRUSTED_LOGOS_STRIP } from "@/content/service-brand-assets";
import type { ServiceFaq } from "@/content/services";
import { toAbsoluteUrl } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/lib/site";

const pagePath = "/ai-sales-ops";
const pageTitle = "AI Sales Ops B2B en Suisse";
const socialTitle = `${pageTitle} | devlo`;
const pageDescription =
  "Systèmes AI Sales Ops pour équipes commerciales B2B : inbox, CRM, meeting prep et reporting. Diagnostic gratuit avec devlo, en Suisse.";
const ogImagePath = "/images/devlo_OG_Banner.webp";

/* ── HubSpot Diagnostic Form ─────────────────────────────────── */
const DIAGNOSTIC_FORM_ID = "36da17df-406b-4e19-9774-d96396807187";
const DIAGNOSTIC_PORTAL_ID = "8082524";
const DIAGNOSTIC_REGION = "na2";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "AI Sales Ops",
    "automatisation IA équipe commerciale",
    "automatisation prospection B2B",
    "infrastructure IA commerciale",
    "assistant IA sales",
    "automatisation CRM B2B",
    "gestion inbox IA",
    "meeting prep IA",
    "dashboard performance commerciale",
    "agence IA vente Suisse",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: pagePath,
    languages: {
      fr: pagePath,
      "x-default": pagePath,
    },
  },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: toAbsoluteUrl(pagePath),
    siteName: siteConfig.name,
    type: "website",
    locale: "fr_CH",
    images: [
      {
        url: toAbsoluteUrl(ogImagePath),
        width: 1200,
        height: 630,
        alt: "AI Sales Ops par devlo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: pageDescription,
    images: [toAbsoluteUrl(ogImagePath)],
  },
};

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "AI Sales Ops", path: pagePath },
];

/* ── 7 Systems ───────────────────────────────────────────────── */
const systems = [
  {
    number: "01",
    title: "Gestion intelligente des réponses commerciales",
    fit: "Équipes 2+ commerciaux",
    shortDescription:
      "L'IA prépare des réponses personnalisées pour vos prospects, sur email et LinkedIn, à partir de vos guidelines internes, de l'historique conversationnel et de votre playbook commercial. Un humain valide chaque message avant envoi.",
    longDescription:
      "Chaque message entrant est classifié par intention, puis enrichi avec vos SOP, vos conversations passées et les règles commerciales propres à votre entreprise. Le système propose une réponse prête à envoyer. Votre équipe corrige si nécessaire, puis cette correction alimente la boucle d'apprentissage. Vous gardez la qualité humaine, sans garder la charge opérationnelle.",
    result: "Jusqu'à 80% du temps inbox récupéré, sans perte de personnalisation.",
    stack: ["n8n", "Claude API", "HubSpot", "Lemlist"],
    links: [
      { label: "Outbound multicanal", href: "/services/outbound-multicanal" },
      { label: "CRM et délivrabilité", href: "/services/crm-delivrabilite" },
    ],
  },
  {
    number: "02",
    title: "Assistant IA pour vos équipes commerciales",
    fit: "Équipes 5 à 20 personnes",
    shortDescription:
      "Un agent IA dans Slack ou Teams répond instantanément aux questions de vos commerciaux, sur les objections, le produit, les process et les bonnes pratiques. Quand le système n'est pas certain, il escalade au manager.",
    longDescription:
      "Le Sales Knowledge Bot centralise vos playbooks, FAQ, SOP et documents produit dans un point d'accès unique. Il répond dans la langue de la question, puis capture les réponses du manager quand une escalade est nécessaire. La base de connaissances s'enrichit sans nouveau projet documentaire. Résultat, l'onboarding s'accélère et les réponses se standardisent.",
    result: "Onboarding commercial 3 fois plus rapide, avec 70% d'escalades en moins après quelques mois.",
    stack: ["Slack", "Teams", "n8n", "Claude API", "Google Docs"],
  },
  {
    number: "03",
    title: "Préparation automatique de rendez-vous et mise à jour CRM",
    fit: "Équipes 3+ commerciaux",
    shortDescription:
      "Avant chaque rendez-vous, l'IA génère un briefing complet. Après le call, elle transforme vos notes en compte-rendu structuré, met à jour le CRM et crée les follow-ups.",
    longDescription:
      "Quand un rendez-vous entre dans le calendrier, le système prépare un dossier prospect : actualités récentes, activité LinkedIn, historique CRM, objections déjà rencontrées, talking points recommandés. Après l'appel, le commercial dicte un mémo vocal ou colle ses notes. L'IA structure le compte-rendu, met à jour le pipeline, crée les tâches et évite les relances oubliées.",
    result: "Jusqu'à 4 heures récupérées par jour et par commercial, avec un CRM enfin à jour.",
    stack: ["n8n", "Claude API", "Google Calendar", "HubSpot", "Salesforce"],
    links: [
      { label: "Prise de rendez-vous", href: "/services/prise-de-rendez-vous" },
      { label: "CRM et délivrabilité", href: "/services/crm-delivrabilite" },
    ],
  },
  {
    number: "04",
    title: "Bibliothèque d'objections et battle cards en temps réel",
    fit: "Équipes 5+ commerciaux",
    shortDescription:
      "Les objections gagnantes et les réponses qui closent sont capturées automatiquement à partir de vos deals. Dès qu'un concurrent revient, une battle card est générée et diffusée à l'équipe.",
    longDescription:
      "Au lieu de laisser le savoir commercial dans la tête de deux seniors, le système collecte les objections remontées en call, les réponses qui ont marché et les signaux concurrentiels. Chaque nouvelle information renforce la bibliothèque. Les juniors accèdent aux meilleurs arguments en quelques secondes, directement dans leur environnement de travail.",
    result: "Le niveau d'argumentation des juniors converge vers celui des seniors, sans dépendre d'une seule personne.",
    stack: ["n8n", "Claude API", "Google Docs", "Slack", "Teams"],
  },
  {
    number: "05",
    title: "Rédaction automatique de propositions et follow-ups commerciaux",
    fit: "Équipes qui envoient 5+ propositions par semaine",
    shortDescription:
      "L'IA génère des drafts de propositions et de follow-ups à partir du contexte réel du deal. Le commercial ajuste quelques lignes et envoie.",
    longDescription:
      "Le système récupère les données CRM, les notes de meeting, le secteur du prospect, les objections soulevées et le ton de votre entreprise. Il produit ensuite un premier draft propre, structuré et cohérent. Vos équipes passent de plusieurs heures de rédaction à quelques minutes de revue, avec des follow-ups plus réguliers et mieux contextualisés.",
    result: "Des propositions prêtes à envoyer en 15 minutes au lieu de 2 ou 3 heures.",
    stack: ["n8n", "Claude API", "HubSpot", "Salesforce", "Google Docs"],
    links: [{ label: "Cold Email B2B", href: "/services/cold-email" }],
  },
  {
    number: "06",
    title: "Dashboard IA de performance commerciale",
    fit: "Managers de 5 à 15 personnes",
    shortDescription:
      "L'IA analyse les feedbacks quotidiens de votre équipe, détecte les patterns récurrents, met en évidence les progrès et propose des plans d'action concrets par commercial.",
    longDescription:
      "Le dashboard transforme des notes dispersées, des feedbacks de coaching et des observations terrain en une vue structurée, par personne et par équipe. Vous obtenez des tendances lisibles, des priorités de coaching, une vision claire des patterns résolus ou persistants, et une base plus objective pour vos décisions RH.",
    result: "Des décisions de management fondées sur des données, avec un onboarding plus propre et moins de turnover caché.",
    stack: ["Supabase", "n8n", "Claude API", "Lovable"],
  },
  {
    number: "07",
    title: "Portail client avec reporting en temps réel",
    fit: "Agences et directions commerciales",
    shortDescription:
      "Un portail sécurisé donne accès aux métriques de campagne, au ROI, au calendrier d'actions et à l'historique de performance, sans passer par des exports manuels.",
    longDescription:
      "Chaque client ou direction consulte ses propres données via un accès contrôlé. Le portail remplace les fichiers Excel et les échanges de reporting récurrents. Vous centralisez les métriques utiles, les tendances, les prochaines actions et un simulateur de ROI. Le reporting devient un produit, pas une charge.",
    result: "Jusqu'à 90% de demandes de reporting ad hoc en moins, avec plus de confiance côté client et direction.",
    stack: ["Lovable", "Supabase", "n8n", "RLS"],
    links: [{ label: "Étude de cas Monizze", href: "/etudes-de-cas/monizze-120-rendez-vous" }],
  },
] as const;

/* ── Process Steps ───────────────────────────────────────────── */
const processSteps = [
  {
    number: "01",
    title: "Diagnostic gratuit, 30 minutes",
    description:
      "Nous analysons votre CRM, vos outils de prospection, vos SOP et les points de friction réels de votre équipe. Vous repartez avec une recommandation claire, sans jargon ni audit de complaisance.",
  },
  {
    number: "02",
    title: "Déploiement personnalisé, 2 à 4 semaines",
    description:
      "Notre équipe configure les systèmes, connecte vos outils et calibre les prompts, les règles et les workflows avec vos données, votre ton et vos standards de qualité.",
  },
  {
    number: "03",
    title: "Optimisation continue",
    description:
      "Chaque validation humaine, chaque correction et chaque nouveau cas enrichissent le système. Nous monitorons les performances, puis nous ajustons mensuellement avec un interlocuteur dédié.",
  },
] as const;

/* ── Proof Stats (sourced) ───────────────────────────────────── */
const proofStats = [
  {
    value: "60%",
    label: "du temps commercial absorbé par des tâches hors vente",
    sourceLabel: "Salesforce, State of Sales",
    sourceHref: "https://www.salesforce.com/resources/research-reports/state-of-sales/",
  },
  {
    value: "2 h",
    label: "de vente active par jour pour un commercial moyen",
    sourceLabel: "HubSpot, Sales Trends Report",
    sourceHref: "https://www.hubspot.com/sales/statistics",
  },
  {
    value: "27%",
    label: "du temps commercial consacré à la vente effective selon Forrester",
    sourceLabel: "Forrester, B2B Sales Benchmark",
    sourceHref: "https://www.forrester.com/research/b2b-sales/",
  },
  {
    value: "1 jour",
    label: "par semaine peut être perdu à chercher de l'information",
    sourceLabel: "McKinsey, Economic potential of generative AI",
    sourceHref:
      "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
  },
] as const;

/* ── Delivery Proof ──────────────────────────────────────────── */
const deliveryProof = [
  { value: "7 ans", label: "d'expérience opérationnelle en prospection B2B" },
  { value: "+1'000", label: "campagnes exécutées par devlo" },
  { value: "80%", label: "de temps inbox récupéré sur les workflows ciblés" },
  { value: "70%+", label: "de taux d'ouverture moyen sur nos campagnes" },
  { value: "3 à 5x", label: "de gain potentiel sur le taux de réponse avec les bons signaux" },
] as const;

/* ── Personas ────────────────────────────────────────────────── */
const personas = [
  {
    icon: "📈",
    title: "Le directeur commercial qui veut scaler sans recruter",
    profile:
      "Il pilote 5 à 15 commerciaux, a des objectifs de croissance forts et ne veut pas transformer son budget en machine à embauche.",
    pain: "Mes commerciaux passent plus de temps à administrer qu'à vendre.",
    systems: ["Inbox Manager", "Meeting Prep", "Sales Writer"],
    result: "L'équivalent de 2 commerciaux supplémentaires, sans ouvrir 2 postes de plus.",
  },
  {
    icon: "🏗️",
    title: "Le CEO de PME qui veut structurer ses ventes",
    profile:
      "L'équipe commerciale existe, mais le process n'est pas encore formalisé. Le savoir est concentré sur quelques personnes clés.",
    pain: "Tout le savoir commercial est dans la tête de 2 personnes.",
    systems: ["Knowledge Bot", "Objection Library", "Team Performance"],
    result: "Vos juniors argumentent comme vos seniors en quelques mois, avec des process enfin documentés.",
  },
  {
    icon: "🧾",
    title: "L'agence B2B qui veut impressionner ses clients",
    profile:
      "Elle gère des campagnes pour ses clients, doit prouver sa valeur en continu et veut réduire le temps passé à produire du reporting.",
    pain: "Mes clients veulent de la visibilité en temps réel, avec des chiffres clairs.",
    systems: ["Reporting Portal", "Inbox Manager"],
    result: "Transparence totale, zéro reporting manuel et un argument commercial que peu d'agences peuvent montrer.",
  },
] as const;

/* ── Comparison Rows ─────────────────────────────────────────── */
const comparisonRows = [
  {
    criterion: "Temps de réponse aux prospects",
    withoutDevlo: "2 à 24 heures, avec beaucoup de réponses rédigées à la main.",
    withDevlo: "Moins de 15 minutes, avec proposition IA et validation humaine.",
  },
  {
    criterion: "Mise à jour CRM après un call",
    withoutDevlo: "Souvent oubliée ou faite plusieurs heures plus tard.",
    withDevlo: "Automatique, structurée et poussée en temps réel.",
  },
  {
    criterion: "Préparation d'un rendez-vous",
    withoutDevlo: "30 minutes de recherche manuelle, parfois plus.",
    withDevlo: "Briefing généré automatiquement, prêt avant le call.",
  },
  {
    criterion: "Onboarding d'un nouveau commercial",
    withoutDevlo: "3 à 6 mois avant autonomie réelle.",
    withDevlo: "4 à 6 semaines avec bot de connaissance et battle cards.",
  },
  {
    criterion: "Propositions commerciales",
    withoutDevlo: "2 à 3 heures de rédaction par proposition.",
    withDevlo: "15 minutes avec draft IA, puis revue humaine.",
  },
  {
    criterion: "Visibilité pour la direction",
    withoutDevlo: "Reporting hebdomadaire sur Excel ou Slides.",
    withDevlo: "Dashboard live, consultable 24 heures sur 24.",
  },
  {
    criterion: "Savoir commercial quand un senior part",
    withoutDevlo: "Une partie du savoir part avec lui.",
    withDevlo: "Les objections, réponses et learnings sont capturés dans le système.",
  },
] as const;

/* ── FAQ ─────────────────────────────────────────────────────── */
const faqItems: ServiceFaq[] = [
  {
    question: "Combien coûtent les systèmes AI Sales Ops ?",
    answer:
      "Le pricing dépend du système choisi et de la taille de votre équipe. Le diagnostic initial est gratuit. Les systèmes individuels démarrent à CHF 2'000 par mois. La plupart de nos clients investissent entre CHF 3'000 et CHF 6'000 par mois pour un ou deux systèmes combinés.",
  },
  {
    question: "Faut-il changer de CRM ou d'outils pour utiliser vos systèmes ?",
    answer:
      "Non. Nos systèmes s'intègrent à vos outils existants : HubSpot, Salesforce, Pipedrive, Lemlist, LinkedIn Sales Navigator, Slack, Teams, et d'autres. Nous nous adaptons à votre stack, pas l'inverse.",
  },
  {
    question: "Est-ce que l'IA remplace mes commerciaux ?",
    answer:
      "Non. L'IA prend en charge les tâches répétitives (rédaction d'emails, mise à jour CRM, recherche de prospects, reporting) pour que vos commerciaux se concentrent sur la vente, la relation client et la négociation. Un humain reste dans la boucle à chaque étape critique.",
  },
  {
    question: "Combien de temps faut-il pour déployer un système ?",
    answer:
      "Entre 2 et 4 semaines selon la complexité. Le diagnostic prend 30 minutes. La configuration technique prend 1 à 2 semaines. La phase de calibration et de test prend 1 à 2 semaines supplémentaires.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Oui. Nous utilisons des infrastructures hébergées en Europe (notamment Supabase et n8n Cloud), conformes au RGPD et à la nLPD suisse. Vos données clients ne sont jamais partagées entre clients. Chaque système est isolé.",
  },
  {
    question: "Peut-on commencer par un seul système et en ajouter d'autres ensuite ?",
    answer:
      "Oui. C'est d'ailleurs la trajectoire la plus saine. La plupart de nos clients démarrent avec l'Inbox Manager ou le Meeting Prep, puis ajoutent d'autres briques quand le premier workflow est stabilisé.",
  },
  {
    question: "Quelle est la différence entre devlo et une agence IA généraliste ?",
    answer:
      "Les agences IA généralistes automatisent souvent des sujets administratifs (factures, support ou back-office). devlo se concentre uniquement sur les équipes commerciales B2B. Nous partons du process commercial, puis nous ajoutons l'IA là où elle crée un vrai gain de temps ou de taux de conversion.",
  },
  {
    question: "Proposez-vous ces systèmes en complément de vos services de prospection externalisée ?",
    answer:
      "Oui. Nos clients en prospection externalisée peuvent ajouter ces systèmes comme extension naturelle. Les systèmes AI Sales Ops existent aussi en standalone pour les équipes commerciales internes qui veulent accélérer sans recruter immédiatement.",
  },
];

/* ── Schemas ─────────────────────────────────────────────────── */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Sales Ops",
  provider: {
    "@type": "Organization",
    name: "devlo",
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vevey",
      addressCountry: "CH",
    },
  },
  areaServed: ["CH", "FR", "BE", "DE", "AT"],
  description:
    "Systèmes d'automatisation et d'intelligence artificielle conçus pour les équipes commerciales B2B : gestion intelligente des réponses, assistant commercial IA, meeting prep, battle cards, dashboards de performance et portails client.",
  url: toAbsoluteUrl(pagePath),
  serviceType: "AI automation for B2B sales teams",
  offers: {
    "@type": "Offer",
    price: "2000",
    priceCurrency: "CHF",
    description: "À partir de CHF 2'000 par mois par système.",
    eligibleRegion: ["CH", "FR", "BE", "DE", "AT"],
  },
};

/* ── Page ────────────────────────────────────────────────────── */
export default function AiSalesOpsPage() {
  return (
    <>
      <JsonLd
        schema={[
          serviceSchema,
          buildFaqPageSchema(faqItems),
          buildHowToSchema(
            "Comment déployer des systèmes IA pour votre équipe commerciale B2B",
            processSteps.map((step) => ({ title: step.title, description: step.description })),
          ),
          buildBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <div data-dark className="overflow-x-clip">
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-devlo-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(42,111,151,0.35),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_32%)]" />
          <div className="relative">
            <Breadcrumb items={breadcrumbItems} variant="dark" />
            <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-8 md:px-8 md:pb-28">
              <FadeInOnScroll className="mx-auto max-w-4xl text-center">
                <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
                  AI Sales Ops pour équipes commerciales B2B
                </p>
                <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                  {"Vos commerciaux closent plus de deals sans recruter, grâce à l'IA"}
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
                  {"devlo conçoit et déploie des systèmes d'automatisation alimentés par l'IA qui libèrent vos commerciaux des tâches répétitives, accélèrent vos cycles de vente et transforment vos données en avantage concurrentiel."}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link href="#diagnostic" className={buttonClassName("outline", "px-6 py-3 text-sm")}>
                    Réserver un diagnostic gratuit →
                  </Link>
                  <Link
                    href="#systemes"
                    className={buttonClassName(
                      "secondary",
                      "border-white/25 bg-white/5 px-6 py-3 text-sm text-white hover:border-white/40 hover:text-white",
                    )}
                  >
                    Découvrir les 7 systèmes ↓
                  </Link>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/70">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    7 ans de terrain commercial
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    {"+1'000 campagnes exécutées"}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                    Diagnostic gratuit, zéro engagement
                  </span>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
        <WaveDivider variant="layered-bottom" fromBg="#0F2B3C" toBg="#FFFFFF" />

        {/* ── LE PROBLÈME ─────────────────────────────────────── */}
        <SectionWrapper background="white" id="probleme">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Le problème"
              title="Pourquoi vos commerciaux passent-ils plus de temps à administrer qu'à vendre ?"
              description="Les équipes B2B performantes ne gagnent pas en ajoutant plus d'outils. Elles gagnent en supprimant le travail répétitif qui ralentit les deals."
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {proofStats.map((stat, index) => (
              <FadeInOnScroll key={stat.value + stat.label} delay={index * 0.05}>
                <ServicesSurfaceCard className="h-full p-5 md:p-6">
                  <p className="text-4xl font-black tracking-tight text-devlo-900">{stat.value}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-devlo-900">{stat.label}</p>
                  <a
                    href={stat.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-xs font-medium text-devlo-700 underline decoration-devlo-200 underline-offset-4 hover:text-devlo-900"
                  >
                    {stat.sourceLabel}
                  </a>
                </ServicesSurfaceCard>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.15} className="mx-auto mt-10 max-w-4xl">
            <div className="space-y-5 text-base leading-8 text-neutral-600">
              <p>
                {"Selon Salesforce, les commerciaux consacrent environ 60% de leur temps à des tâches non commerciales. Sur une équipe de 5 personnes, cela représente l'équivalent de 3 postes à temps plein absorbés par l'administration, la mise à jour CRM, la gestion inbox et la préparation des rendez-vous. L'enjeu n'est pas de remplacer vos commerciaux. L'enjeu est de leur rendre leur temps de vente."}
              </p>
              <p>
                {"Les PME et ETI en Suisse romande font face à un double blocage. Le recrutement commercial coûte plus cher, l'onboarding prend plus de temps, et les cycles de vente se tendent. Si vos réponses arrivent tard, si le CRM est incomplet ou si les follow-ups partent mal, vous perdez déjà du terrain."}
              </p>
              <p>
                {"devlo construit des systèmes de prospection B2B depuis 7 ans. Chaque workflow présenté ici a été testé en production, d'abord pour nos propres campagnes, puis pour des clients en Suisse, en France, en Belgique et en DACH."}
              </p>
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        {/* ── LES 7 SYSTÈMES ──────────────────────────────────── */}
        <SectionWrapper background="light" id="systemes">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Les 7 systèmes"
              title="Quels systèmes AI Sales Ops déployer pour votre équipe commerciale ?"
              description="Chaque système se déploie en 2 à 4 semaines. Il est configuré pour votre entreprise, puis gardé sous contrôle humain à chaque étape clé."
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {systems.map((system, index) => (
              <FadeInOnScroll key={system.title} delay={index * 0.05}>
                <SystemCard {...system} />
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.2} className="mt-10">
            <div className="rounded-[28px] border border-devlo-200 bg-white p-6 shadow-soft md:flex md:items-center md:justify-between md:gap-8 md:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">Par où commencer</p>
                <h3 className="mt-3 text-2xl font-bold text-devlo-900">
                  {"Commencez par le workflow qui fait déjà perdre du temps aujourd'hui"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600 md:text-base">
                  {"Dans la majorité des cas, nous commençons par l'inbox, la préparation de rendez-vous ou le CRM. Ensuite, nous ajoutons les briques qui font monter la qualité de pilotage : knowledge bot, battle cards, reporting ou sales writer."}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:justify-end">
                <Link href="#diagnostic" className={buttonClassName("primary", "px-6 py-3 text-sm")}>
                  Réserver un diagnostic gratuit →
                </Link>
                <Link href="/services" className={buttonClassName("secondary", "px-6 py-3 text-sm")}>
                  Voir les services outbound
                </Link>
              </div>
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        {/* ── COMMENT ÇA MARCHE ───────────────────────────────── */}
        <SectionWrapper background="white" id="processus">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Comment ça marche"
              title="Comment déployer des systèmes AI Sales Ops en 3 semaines ?"
              description="Un diagnostic franc, un déploiement encadré, puis une amélioration continue. Vous savez ce qui est branché, pourquoi, et avec quel impact attendu."
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <FadeInOnScroll key={step.title} delay={index * 0.08}>
                <ProcessStep {...step} />
              </FadeInOnScroll>
            ))}
          </div>
        </SectionWrapper>

        {/* ── PREUVES / SOCIAL PROOF ──────────────────────────── */}
        <SectionWrapper background="light" id="preuves">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Preuves"
              title="Quelles preuves montrent que ces systèmes fonctionnent ?"
              description="devlo ne vend pas un concept IA. Nous déployons des systèmes bâtis sur des campagnes réelles, avec des clients qui veulent du pipeline, du suivi et du ROI."
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06} className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2">
            <InfiniteLogoRail logos={TRUSTED_LOGOS_STRIP} duration="slow" pauseOnHover />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {deliveryProof.map((item, index) => (
              <FadeInOnScroll key={item.value + item.label} delay={index * 0.05}>
                <ServicesSurfaceCard className="h-full p-5">
                  <p className="text-3xl font-black tracking-tight text-devlo-900">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.label}</p>
                </ServicesSurfaceCard>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll delay={0.12} className="mt-10">
            <CaseStudyCarousel />
          </FadeInOnScroll>
        </SectionWrapper>

        {/* ── POUR QUI ────────────────────────────────────────── */}
        <SectionWrapper background="white" id="personas">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Pour qui"
              title="Pour quelles entreprises ces systèmes sont-ils conçus ?"
              description="Le bon système dépend moins de votre taille que du point de friction à éliminer : trop de reporting, trop de handoff manuel, trop de savoir tacite, ou pas assez de rigueur dans le follow-up."
              align="center"
              className="max-w-4xl"
            />
          </FadeInOnScroll>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {personas.map((persona, index) => (
              <FadeInOnScroll key={persona.title} delay={index * 0.08}>
                <PersonaCard {...persona} />
              </FadeInOnScroll>
            ))}
          </div>
        </SectionWrapper>

        {/* ── COMPARAISON ─────────────────────────────────────── */}
        <SectionWrapper background="light" id="comparaison">
          <FadeInOnScroll>
            <ServicesSectionHeader
              eyebrow="Comparaison"
              title="Que se passe-t-il quand vous gardez le statu quo ?"
              description="Pendant que vous hésitez, vos concurrents répondent plus vite, préparent mieux leurs rendez-vous et capitalisent déjà leur savoir commercial."
            />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06} className="mt-8">
            <ComparisonTable rows={comparisonRows} />
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.12} className="mt-8">
            <div className="rounded-[28px] border border-devlo-200 bg-white p-6 shadow-soft md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">La différence devlo</p>
              <h3 className="mt-3 text-2xl font-bold text-devlo-900">
                Les agences IA généralistes automatisent vos opérations. devlo automatise votre machine commerciale.
              </h3>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-neutral-600 md:text-base">
                {"Nous ne partons pas d'un outil, ni d'un prompt. Nous partons du process commercial, des objections, des handoffs, du CRM, des follow-ups et du rythme réel de votre équipe. C'est cette lecture métier qui fait la différence entre une automatisation impressionnante en démo, et un système utile en production."}
              </p>
            </div>
          </FadeInOnScroll>
        </SectionWrapper>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <FAQSection id="faq" title="Questions fréquentes sur nos systèmes AI Sales Ops" items={faqItems} />

        {/* ── CTA FINAL + HUBSPOT FORM ────────────────────────── */}
        <section id="diagnostic" data-dark className="scroll-mt-24 bg-devlo-900 py-16 text-white md:py-24">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
              <FadeInOnScroll>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">Diagnostic gratuit</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                  Prêt à libérer du temps pour vos commerciaux ?
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                  Réservez un diagnostic gratuit de 30 minutes. Nous analysons votre situation et vous recommandons les
                  systèmes les plus pertinents pour votre équipe.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Quels workflows automatiser en priorité",
                    "Quels systèmes déployer dans les 30 prochains jours",
                    "Quel ROI attendre, avec quels garde-fous",
                    "Zéro engagement, zéro jargon",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 text-sm text-emerald-400">✓</span>
                      <p className="text-sm leading-6 text-white/80">{item}</p>
                    </div>
                  ))}
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.1}>
                <div className="rounded-2xl border border-white/15 bg-white p-5 shadow-panel md:p-7">
                  <h3 className="mb-1 text-xl font-bold text-devlo-900">Réserver un diagnostic gratuit</h3>
                  <p className="mb-5 text-sm text-neutral-600">30 minutes, sans engagement.</p>
                  <HubspotForm
                    portalId={DIAGNOSTIC_PORTAL_ID}
                    formId={DIAGNOSTIC_FORM_ID}
                    region={DIAGNOSTIC_REGION}
                    targetId="hubspot-ai-sales-ops-diagnostic"
                    locale="fr"
                  />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
