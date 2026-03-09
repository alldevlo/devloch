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
        destination: "/etudes-de-cas/monizze-120-rendez-vous",
        permanent: true,
      },
      {
        source: "/en/casestudy/monizze-120-appointments-belgium/",
        destination: "/etudes-de-cas/monizze-120-rendez-vous",
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
        source: "/en/case-studies",
        destination: "/etudes-de-cas",
        permanent: true,
      },
      {
        source: "/en/case-studies/",
        destination: "/etudes-de-cas",
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
        destination: "/etudes-de-cas/monizze-120-rendez-vous",
        permanent: true,
      },
      {
        source: "/de/fallstudien/monizze-120-termine-belgien/",
        destination: "/etudes-de-cas/monizze-120-rendez-vous",
        permanent: true,
      },
      // DE fallstudien fallback → listing page
      {
        source: "/de/fallstudien/:slug*",
        destination: "/etudes-de-cas",
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
      {
        source: "/de/fallstudien",
        destination: "/etudes-de-cas",
        permanent: true,
      },
      {
        source: "/de/fallstudien/",
        destination: "/etudes-de-cas",
        permanent: true,
      },
    ];

    // Blog is now active — old WordPress blog slugs redirect to new blog hub
    const frBlogRedirects = [];

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
      { source: "/agence", destination: "/", permanent: true },
      { source: "/a-propos", destination: "/", permanent: true },
      { source: "/prospection-b2b", destination: "/", permanent: true },
    ];

    return excludeRscRequests(
      withStatusCode301([
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
