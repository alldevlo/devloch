import { caseStudySlugRedirects } from "./src/lib/case-study-slug-redirects.shared.mjs";

const RSC_QUERY_BYPASS = { type: "query", key: "_rsc" };
const RSC_HEADER_BYPASS = { type: "header", key: "rsc" };

function excludeRscRequests(redirects) {
  return redirects.map((redirect) => ({
    ...redirect,
    missing: [...(redirect.missing ?? []), RSC_QUERY_BYPASS, RSC_HEADER_BYPASS],
  }));
}

function withStatusCode301(redirects) {
  return redirects.map((redirect) => {
    const { permanent: _permanent, ...rest } = redirect;
    return {
      ...rest,
      statusCode: 301,
    };
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add finer-grained responsive widths so small logos don't jump to 256/384px.
    imageSizes: [16, 24, 32, 40, 48, 64, 72, 80, 96, 120, 128, 160, 192, 240, 256, 320, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source:
          "/:asset(favicon\\.ico|favicon-16x16\\.png|favicon-32x32\\.png|apple-touch-icon\\.png|android-chrome-192x192\\.png|android-chrome-512x512\\.png|site\\.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    // ─── Case study legacy slug redirects ──────────────────────────────────────
    const caseStudyRedirects = Object.entries(caseStudySlugRedirects).map(
      ([legacySlug, canonicalSlug]) => ({
        source: `/etudes-de-cas/${legacySlug}`,
        destination: `/etudes-de-cas/${canonicalSlug}`,
        permanent: true,
      }),
    );

    // ─── Specific WP /resultats/[long-slug] → canonical /etudes-de-cas/[slug] ──
    // WordPress used long descriptive permalinks; without these, the wildcard below
    // would create 404s (long WP slug ≠ short canonical slug).
    // Must come BEFORE the wildcard resultatRedirects.
    // TODO: Run `node scripts/crawl-seo.mjs` on devlo.ch (WordPress) and add any
    //       additional /resultats/ URLs found in seo-crawl-exports/sf-3xx.csv.
    const wpResultatRedirects = [
      {
        source:
          "/resultats/solution-de-cybersecurite-180-prospects-interesses-generation-de-prospects-b2b-et-prospection-a-froid",
        destination: "/resultats/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source:
          "/resultats/solution-de-cybersecurite-180-prospects-interesses-generation-de-prospects-b2b-et-prospection-a-froid/",
        destination: "/resultats/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source:
          "/resultats/limmobilier-et-la-prospection-commerciale-b2b-comment-cibler-et-demarcher-des-prospects-pour-la-location-de-surfaces-commerciales",
        destination: "/resultats/immobilier-11-prospects",
        permanent: true,
      },
      {
        source:
          "/resultats/limmobilier-et-la-prospection-commerciale-b2b-comment-cibler-et-demarcher-des-prospects-pour-la-location-de-surfaces-commerciales/",
        destination: "/resultats/immobilier-11-prospects",
        permanent: true,
      },
      {
        source:
          "/resultats/telemarketing-b2b-dans-limmobilier-commercial-30-prospects-interesses-pour-des-surfaces-de-bureaux",
        destination: "/resultats/immobilier-30-prospects",
        permanent: true,
      },
      {
        source:
          "/resultats/telemarketing-b2b-dans-limmobilier-commercial-30-prospects-interesses-pour-des-surfaces-de-bureaux/",
        destination: "/resultats/immobilier-30-prospects",
        permanent: true,
      },
    ];

    // ─── Legacy /resultats/* → /etudes-de-cas/* ───────────────────────────────
    // The old Next.js site used /resultats/[slug]; keep for backlink preservation.
    // Specific WP long-slug overrides are handled above (wpResultatRedirects).
    const resultatRedirects = [
      {
        source: "/resultats-cas-etudes/page/:num",
        destination: "/resultats-cas-etudes",
        permanent: true,
      },
      {
        source: "/resultats-cas-etudes/page/:num/",
        destination: "/resultats-cas-etudes",
        permanent: true,
      },
      {
        source: "/resultats_cas_etudes",
        destination: "/resultats-cas-etudes",
        permanent: true,
      },
      {
        source: "/resultats_cas_etudes/page/:num",
        destination: "/resultats-cas-etudes",
        permanent: true,
      },
    ];

    // ─── App Router alias pages (redirect-only) → explicit HTTP redirects ────
    // Some App Router `permanentRedirect()` pages may render a 308 payload without a
    // Location header in certain crawlers/clients. Keep critical aliases here so
    // crawlers get a standard redirect response.
    const appAliasRedirects = [
      { source: "/contact", destination: "/consultation", permanent: true },
      { source: "/contact/", destination: "/consultation", permanent: true },
      { source: "/academy-notre-appel", destination: "/consultation", permanent: true },
      { source: "/academy-notre-appel/", destination: "/consultation", permanent: true },
      { source: "/merci", destination: "/consultation", permanent: true },
      { source: "/merci/", destination: "/consultation", permanent: true },
      { source: "/merci-prise-de-contact", destination: "/consultation", permanent: true },
      { source: "/merci-prise-de-contact/", destination: "/consultation", permanent: true },
      { source: "/modele", destination: "/", permanent: true },
      { source: "/modele/", destination: "/", permanent: true },
      { source: "/blog-list", destination: "/blog", permanent: true },
      { source: "/blog-list/", destination: "/blog", permanent: true },
      { source: "/terms", destination: "/conditions", permanent: true },
      { source: "/terms/", destination: "/conditions", permanent: true },
    ];

    // ─── WordPress legacy URL patterns ────────────────────────────────────────
    // These cover common WP URL structures that may be indexed on devlo.ch.
    // TODO: Crawl the live devlo.ch (WordPress) site and verify/extend this list.
    const wordpressRedirects = [
      // WP system paths
      { source: "/wp-admin", destination: "/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/wp-content/:path*", destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/et_body_layout/:path*", destination: "/", permanent: true },
      // WP taxonomy / archive patterns
      { source: "/category/:slug*", destination: "/", permanent: true },
      { source: "/tag/:slug*", destination: "/", permanent: true },
      { source: "/author/:slug*", destination: "/", permanent: true },
      { source: "/page/:num", destination: "/", permanent: true },
      // WP feed
      { source: "/feed", destination: "/", permanent: true },
      { source: "/feed/:type", destination: "/", permanent: true },
    ];

    // ─── EN language pages (/en/*) ────────────────────────────────────────────
    // The WP devlo.ch was multilingual (FR root, /en/, /de/).
    // The new Next.js site is FR-only. Redirect all indexed EN URLs to FR equivalents.
    // Specific case study mappings come first; catch-all /en/:path* at the end.
    const enRedirects = [
      // EN case studies → canonical FR slugs (single-hop, no chain)
      {
        source: "/en/casestudy/cybersecurity-4500-companies",
        destination: "/etudes-de-cas/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source: "/en/casestudy/cybersecurity-4500-companies/",
        destination: "/etudes-de-cas/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source: "/en/casestudy/hr-54-meetings-dach",
        destination: "/etudes-de-cas/hr-54-rendez-vous-dach",
        permanent: true,
      },
      {
        source: "/en/casestudy/hr-54-meetings-dach/",
        destination: "/etudes-de-cas/hr-54-rendez-vous-dach",
        permanent: true,
      },
      {
        source: "/en/casestudy/accounting-200k-revenue",
        destination: "/etudes-de-cas/logiciel-comptable-200k-ca",
        permanent: true,
      },
      {
        source: "/en/casestudy/accounting-200k-revenue/",
        destination: "/etudes-de-cas/logiciel-comptable-200k-ca",
        permanent: true,
      },
      {
        source: "/en/casestudy/urban-cleaning-71-appointments",
        destination: "/etudes-de-cas/proprete-urbaine-71-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/urban-cleaning-71-appointments/",
        destination: "/etudes-de-cas/proprete-urbaine-71-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/biofuels-52-appointments",
        destination: "/etudes-de-cas/biocarburants-52-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/biofuels-52-appointments/",
        destination: "/etudes-de-cas/biocarburants-52-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/training-14-appointments",
        destination: "/etudes-de-cas/formation-14-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/training-14-appointments/",
        destination: "/etudes-de-cas/formation-14-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/audiovisual-16-appointments",
        destination: "/etudes-de-cas/audiovisuel-16-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/audiovisual-16-appointments/",
        destination: "/etudes-de-cas/audiovisuel-16-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/biodiversity-70-appointments",
        destination: "/etudes-de-cas/biodiversite-70-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/biodiversity-70-appointments/",
        destination: "/etudes-de-cas/biodiversite-70-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/mobility-40-prospects",
        destination: "/etudes-de-cas/mobilite-40-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/mobility-40-prospects/",
        destination: "/etudes-de-cas/mobilite-40-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/merchandising-23-prospects",
        destination: "/etudes-de-cas/merchandising-23-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/merchandising-23-prospects/",
        destination: "/etudes-de-cas/merchandising-23-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/real-estate-11-prospects",
        destination: "/etudes-de-cas/immobilier-11-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/real-estate-11-prospects/",
        destination: "/etudes-de-cas/immobilier-11-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/real-estate-30-prospects",
        destination: "/etudes-de-cas/immobilier-30-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/real-estate-30-prospects/",
        destination: "/etudes-de-cas/immobilier-30-prospects",
        permanent: true,
      },
      {
        source: "/en/casestudy/monizze-120-appointments-belgium",
        destination: "/en/casestudy/monizze-120-appointments",
        permanent: true,
      },
      {
        source: "/en/casestudy/monizze-120-appointments-belgium/",
        destination: "/en/casestudy/monizze-120-appointments",
        permanent: true,
      },
      // Legacy untranslated Monizze/IDDI URLs → correct locale paths
      {
        source: "/en/etudes-de-cas/monizze-120-rendez-vous",
        destination: "/en/casestudy/monizze-120-appointments",
        permanent: true,
      },
      {
        source: "/de/etudes-de-cas/monizze-120-rendez-vous",
        destination: "/de/fallstudien/monizze-120-termine",
        permanent: true,
      },
      {
        source: "/nl/etudes-de-cas/monizze-120-rendez-vous",
        destination: "/nl/casestudy/monizze-120-appointments",
        permanent: true,
      },
      {
        source: "/en/etudes-de-cas/iddi-generation-leads-biotech-pharma",
        destination: "/en/casestudy/iddi-lead-generation-biotech-pharma",
        permanent: true,
      },
      {
        source: "/de/etudes-de-cas/iddi-generation-leads-biotech-pharma",
        destination: "/de/fallstudien/iddi-leadgenerierung-biotech-pharma",
        permanent: true,
      },
      {
        source: "/nl/etudes-de-cas/iddi-generation-leads-biotech-pharma",
        destination: "/nl/casestudy/iddi-lead-generation-biotech-pharma",
        permanent: true,
      },
      // EN casestudy fallback → listing page
      {
        source: "/en/casestudy/:slug*",
        destination: "/etudes-de-cas",
        permanent: true,
      },
      // EN key pages
      {
        source: "/en/b2b-sales-training-academy",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/en/b2b-sales-training-academy/",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/en/ultimate-sales-training-course",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/en/ultimate-sales-training-course/",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/en/free-consultation",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/en/free-consultation/",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/en/contact",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/en/contact/",
        destination: "/consultation",
        permanent: true,
      },
    ];

    // ─── DE language pages (/de/*) ────────────────────────────────────────────
    const deRedirects = [
      // DE case studies → canonical FR slugs (single-hop)
      {
        source: "/de/fallstudien/cybersicherheit-4500-unternehmen",
        destination: "/etudes-de-cas/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source: "/de/fallstudien/cybersicherheit-4500-unternehmen/",
        destination: "/etudes-de-cas/cybersecurite-4500-entreprises",
        permanent: true,
      },
      {
        source: "/de/fallstudien/hr-54-termine-dach",
        destination: "/etudes-de-cas/hr-54-rendez-vous-dach",
        permanent: true,
      },
      {
        source: "/de/fallstudien/hr-54-termine-dach/",
        destination: "/etudes-de-cas/hr-54-rendez-vous-dach",
        permanent: true,
      },
      {
        source: "/de/fallstudien/buchhaltungssoftware-200k-umsatz",
        destination: "/etudes-de-cas/logiciel-comptable-200k-ca",
        permanent: true,
      },
      {
        source: "/de/fallstudien/buchhaltungssoftware-200k-umsatz/",
        destination: "/etudes-de-cas/logiciel-comptable-200k-ca",
        permanent: true,
      },
      {
        source: "/de/fallstudien/stadtreinigung-71-termine",
        destination: "/etudes-de-cas/proprete-urbaine-71-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/stadtreinigung-71-termine/",
        destination: "/etudes-de-cas/proprete-urbaine-71-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/biokraftstoffe-52-termine",
        destination: "/etudes-de-cas/biocarburants-52-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/biokraftstoffe-52-termine/",
        destination: "/etudes-de-cas/biocarburants-52-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/weiterbildung-14-termine",
        destination: "/etudes-de-cas/formation-14-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/weiterbildung-14-termine/",
        destination: "/etudes-de-cas/formation-14-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/monizze-120-termine-belgien",
        destination: "/de/fallstudien/monizze-120-termine",
        permanent: true,
      },
      {
        source: "/de/fallstudien/monizze-120-termine-belgien/",
        destination: "/de/fallstudien/monizze-120-termine",
        permanent: true,
      },
      // DE key pages
      {
        source: "/de/ausbildung-prospektion-b2b",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/de/ausbildung-prospektion-b2b/",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/de/ultimativer-verkaufstrainingskurs",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/de/ultimativer-verkaufstrainingskurs/",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/de/kostenlose-beratung",
        destination: "/consultation",
        permanent: true,
      },
      {
        source: "/de/kostenlose-beratung/",
        destination: "/consultation",
        permanent: true,
      },
    ];

    // ─── Legacy WordPress blog posts & content pages ──────────────────────
    // These old WP articles have no equivalent in the new site.
    // Redirect to homepage or most relevant section.
    const frBlogRedirects = [
      // Old FR blog posts → homepage
      { source: "/2020-b2b-sales-leaders-teams", destination: "/", permanent: true },
      { source: "/5-raisons-pour-lesquelles-la-prospection-commerciale-b2b-est-cruciale", destination: "/blog", permanent: true },
      { source: "/5-reasons-why-b2b-sales-prospecting-is-essential", destination: "/blog", permanent: true },
      { source: "/courriel-quelquun-vendre-quelque-chose", destination: "/blog", permanent: true },
      { source: "/developpement-ventes-peche-au-harpon", destination: "/blog", permanent: true },
      { source: "/devlo-b2b-lead-generation-partner", destination: "/", permanent: true },
      { source: "/eliminated-kpis-in-2020", destination: "/", permanent: true },
      { source: "/externaliser-le-developpement-des-ventes-b2b-comment-eviter-les-depenses-excessives", destination: "/blog/externaliser-prospection-commerciale", permanent: true },
      { source: "/indicateurs-de-performance-elimines-2020", destination: "/", permanent: true },
      { source: "/lancement-devlo-partenaire-de-confiance-generation-de-prospects", destination: "/", permanent: true },
      { source: "/mark-roberge-predictions-prescriptions-2021", destination: "/", permanent: true },
      { source: "/oui-a-reduction-friction-commerciale", destination: "/blog", permanent: true },
      { source: "/outsourcing-b2b-sales-development-avoid-overspending", destination: "/blog/externaliser-prospection-commerciale", permanent: true },
      { source: "/personalisation-digitalisation-are-so-important", destination: "/blog", permanent: true },
      { source: "/personalized-b2b-sales-sequences", destination: "/blog/cold-email-b2b-guide-complet", permanent: true },
      { source: "/personnalisation-digitalisation-sont-si-importantes", destination: "/blog", permanent: true },
      { source: "/sales-development-is-like-spearfishing", destination: "/blog", permanent: true },
      { source: "/yes-to-reducing-sales-friction", destination: "/blog", permanent: true },
      // Old DE/misc URL variants at FR root
      { source: "/akademie-unser-ruf", destination: "/academy", permanent: true },
      { source: "/ausbildung-prospektion-b2b", destination: "/academy", permanent: true },
      { source: "/academy-our-call", destination: "/consultation", permanent: true },
      { source: "/academy-terms-conditions", destination: "/conditions", permanent: true },
      { source: "/privacy-policy", destination: "/politique-confidentialite", permanent: true },
      { source: "/telefonanruf", destination: "/telephone", permanent: true },
      { source: "/ultimativer-verkaufstrainingskurs", destination: "/formation-prospection-b2b", permanent: true },
      { source: "/unser-termin", destination: "/consultation", permanent: true },
      { source: "/prospection-commerciale-b2b", destination: "/prospection-commerciale-suisse", permanent: true },
      // Old case study hub variants
      { source: "/casestudy", destination: "/etudes-de-cas", permanent: true },
      { source: "/casestudy/:slug*", destination: "/etudes-de-cas", permanent: true },
      { source: "/fallstudien", destination: "/etudes-de-cas", permanent: true },
      { source: "/fallstudien/:slug*", destination: "/etudes-de-cas", permanent: true },
      { source: "/results_cas_studies", destination: "/etudes-de-cas", permanent: true },
      { source: "/results_cas_studies/:slug*", destination: "/etudes-de-cas", permanent: true },
      { source: "/ergebnisse_fall_studien", destination: "/etudes-de-cas", permanent: true },
      { source: "/ergebnisse_fall_studien/:slug*", destination: "/etudes-de-cas", permanent: true },
      { source: "/resultats-cas-etudes", destination: "/etudes-de-cas", permanent: true },
      { source: "/resultats-cas-etudes/:slug*", destination: "/etudes-de-cas", permanent: true },
    ];

    // ─── Probable old devlo.ch page URL variants ──────────────────────────────
    // Best guesses based on typical WP site naming conventions.
    // TODO: Verify against the actual WordPress URL inventory (see docs/SEO_DATA_NEEDED.md).
    const oldPageRedirects = [
      // Consultation page variants
      { source: "/consultation-gratuite", destination: "/consultation", permanent: true },
      { source: "/strategie-gratuite", destination: "/consultation", permanent: true },
      // Case studies variants
      { source: "/cas-clients", destination: "/etudes-de-cas", permanent: true },
      { source: "/nos-cas-clients", destination: "/etudes-de-cas", permanent: true },
      { source: "/nos-resultats", destination: "/etudes-de-cas", permanent: true },
      { source: "/resultats-clients", destination: "/etudes-de-cas", permanent: true },
      { source: "/etudes-de-cas-clients", destination: "/etudes-de-cas", permanent: true },
      // Academy variants
      { source: "/formation", destination: "/academy", permanent: true },
      { source: "/outbound-academy", destination: "/academy", permanent: true },
      { source: "/formation-outbound", destination: "/academy", permanent: true },
      // Home / generic
      { source: "/a-propos", destination: "/", permanent: true },
      { source: "/prospection-b2b", destination: "/", permanent: true },
    ];

    // ─── Slug fix redirects: old FR slugs copied to EN/DE/NL → correct translations ──
    // These were set up with copy-pasted FR slugs in EN/DE/NL routes.
    // Must come BEFORE enRedirects/deRedirects to avoid redirect chains.
    const slugFixRedirects = [
      // Case studies hub
      { source: "/en/etudes-de-cas", destination: "/en/case-studies", permanent: true },
      { source: "/en/etudes-de-cas/", destination: "/en/case-studies", permanent: true },
      { source: "/de/etudes-de-cas", destination: "/de/fallstudien", permanent: true },
      { source: "/de/etudes-de-cas/", destination: "/de/fallstudien", permanent: true },
      { source: "/nl/etudes-de-cas", destination: "/nl/case-studies", permanent: true },
      { source: "/nl/etudes-de-cas/", destination: "/nl/case-studies", permanent: true },
      // EN services
      { source: "/en/services/crm-delivrabilite", destination: "/en/services/crm-deliverability", permanent: true },
      { source: "/en/services/crm-delivrabilite/", destination: "/en/services/crm-deliverability", permanent: true },
      { source: "/en/services/enrichissement-clay", destination: "/en/services/clay-enrichment", permanent: true },
      { source: "/en/services/enrichissement-clay/", destination: "/en/services/clay-enrichment", permanent: true },
      { source: "/en/services/generation-leads", destination: "/en/services/lead-generation", permanent: true },
      { source: "/en/services/generation-leads/", destination: "/en/services/lead-generation", permanent: true },
      { source: "/en/services/outbound-multicanal", destination: "/en/services/outbound-multichannel", permanent: true },
      { source: "/en/services/outbound-multicanal/", destination: "/en/services/outbound-multichannel", permanent: true },
      { source: "/en/services/prise-de-rendez-vous", destination: "/en/services/appointment-setting", permanent: true },
      { source: "/en/services/prise-de-rendez-vous/", destination: "/en/services/appointment-setting", permanent: true },
      { source: "/en/services/qualification-leads", destination: "/en/services/lead-qualification", permanent: true },
      { source: "/en/services/qualification-leads/", destination: "/en/services/lead-qualification", permanent: true },
      // DE services
      { source: "/de/services/crm-delivrabilite", destination: "/de/services/crm-zustellbarkeit", permanent: true },
      { source: "/de/services/crm-delivrabilite/", destination: "/de/services/crm-zustellbarkeit", permanent: true },
      { source: "/de/services/enrichissement-clay", destination: "/de/services/datenanreicherung-clay", permanent: true },
      { source: "/de/services/enrichissement-clay/", destination: "/de/services/datenanreicherung-clay", permanent: true },
      { source: "/de/services/generation-leads", destination: "/de/services/leadgenerierung", permanent: true },
      { source: "/de/services/generation-leads/", destination: "/de/services/leadgenerierung", permanent: true },
      { source: "/de/services/outbound-multicanal", destination: "/de/services/outbound-multikanal", permanent: true },
      { source: "/de/services/outbound-multicanal/", destination: "/de/services/outbound-multikanal", permanent: true },
      { source: "/de/services/prise-de-rendez-vous", destination: "/de/services/terminvereinbarung", permanent: true },
      { source: "/de/services/prise-de-rendez-vous/", destination: "/de/services/terminvereinbarung", permanent: true },
      { source: "/de/services/qualification-leads", destination: "/de/services/lead-qualifizierung", permanent: true },
      { source: "/de/services/qualification-leads/", destination: "/de/services/lead-qualifizierung", permanent: true },
      // NL services
      { source: "/nl/services/crm-delivrabilite", destination: "/nl/services/crm-afleverbaarheid", permanent: true },
      { source: "/nl/services/crm-delivrabilite/", destination: "/nl/services/crm-afleverbaarheid", permanent: true },
      { source: "/nl/services/enrichissement-clay", destination: "/nl/services/data-verrijking-clay", permanent: true },
      { source: "/nl/services/enrichissement-clay/", destination: "/nl/services/data-verrijking-clay", permanent: true },
      { source: "/nl/services/generation-leads", destination: "/nl/services/leadgeneratie", permanent: true },
      { source: "/nl/services/generation-leads/", destination: "/nl/services/leadgeneratie", permanent: true },
      { source: "/nl/services/outbound-multicanal", destination: "/nl/services/outbound-multichannel", permanent: true },
      { source: "/nl/services/outbound-multicanal/", destination: "/nl/services/outbound-multichannel", permanent: true },
      { source: "/nl/services/prise-de-rendez-vous", destination: "/nl/services/afspraak-boeken", permanent: true },
      { source: "/nl/services/prise-de-rendez-vous/", destination: "/nl/services/afspraak-boeken", permanent: true },
      { source: "/nl/services/qualification-leads", destination: "/nl/services/lead-kwalificatie", permanent: true },
      { source: "/nl/services/qualification-leads/", destination: "/nl/services/lead-kwalificatie", permanent: true },
      // Conditions (untranslated slugs)
      { source: "/en/conditions", destination: "/en/terms", permanent: true },
      { source: "/en/conditions/", destination: "/en/terms", permanent: true },
      { source: "/de/conditions", destination: "/de/agb", permanent: true },
      { source: "/de/conditions/", destination: "/de/agb", permanent: true },
      { source: "/nl/conditions", destination: "/nl/voorwaarden", permanent: true },
      { source: "/nl/conditions/", destination: "/nl/voorwaarden", permanent: true },
      // Consultation (untranslated slugs)
      { source: "/de/consultation", destination: "/de/beratung", permanent: true },
      { source: "/de/consultation/", destination: "/de/beratung", permanent: true },
      { source: "/nl/consultation", destination: "/nl/adviesgesprek", permanent: true },
      { source: "/nl/consultation/", destination: "/nl/adviesgesprek", permanent: true },
      // NL case study slugs (were copies of EN, now translated)
      { source: "/nl/casestudy/audiovisual-16-meetings", destination: "/nl/casestudy/audiovisueel-16-afspraken", permanent: true },
      { source: "/nl/casestudy/biofuels-52-sales-meetings", destination: "/nl/casestudy/biobrandstoffen-52-afspraken", permanent: true },
      { source: "/nl/casestudy/biodiversity-70-meetings", destination: "/nl/casestudy/biodiversiteit-70-afspraken", permanent: true },
      { source: "/nl/casestudy/cybersecurity-4500-companies", destination: "/nl/casestudy/cybersecurity-4500-bedrijven", permanent: true },
      { source: "/nl/casestudy/learning-development-14-meetings", destination: "/nl/casestudy/opleiding-14-afspraken", permanent: true },
      { source: "/nl/casestudy/hr-54-meetings-dach", destination: "/nl/casestudy/hr-54-afspraken-dach", permanent: true },
      { source: "/nl/casestudy/iddi-lead-generation-biotech-pharma", destination: "/nl/casestudy/iddi-leadgeneratie-biotech-pharma", permanent: true },
      { source: "/nl/casestudy/commercial-real-estate-11-prospects", destination: "/nl/casestudy/commercieel-vastgoed-11-prospects", permanent: true },
      { source: "/nl/casestudy/real-estate-30-prospects", destination: "/nl/casestudy/vastgoed-30-prospects", permanent: true },
      { source: "/nl/casestudy/accounting-200k-revenue", destination: "/nl/casestudy/boekhouding-200k-omzet", permanent: true },
      { source: "/nl/casestudy/mobility-40-prospects", destination: "/nl/casestudy/mobiliteit-40-prospects", permanent: true },
      { source: "/nl/casestudy/monizze-120-appointments", destination: "/nl/casestudy/monizze-120-afspraken", permanent: true },
      { source: "/nl/casestudy/urban-cleanliness-71-meetings", destination: "/nl/casestudy/stedelijke-reiniging-71-afspraken", permanent: true },
    ];

    return excludeRscRequests(
      withStatusCode301([
        ...slugFixRedirects, // must be first to avoid redirect chains
        ...caseStudyRedirects,
        ...wpResultatRedirects, // specific WP long slugs — must be before wildcard
        ...resultatRedirects,
        ...appAliasRedirects,
        ...frBlogRedirects,
        ...wordpressRedirects,
        ...oldPageRedirects,
      ]),
    );
  },
};

export default nextConfig;
