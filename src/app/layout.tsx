import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Script from "next/script";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLanguageAlternates, defaultOgImagePath, toAbsoluteUrl } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const plusJakartaSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-plus-jakarta",
  weight: "100 900",
  display: "swap",
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-9CKZL9V2VN";

type LayoutLocale = "fr" | "en" | "de" | "nl";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Agence de prospection commerciale B2B en Suisse",
    template: "%s | devlo",
  },
  description:
    "Agence B2B en Suisse spécialisée en génération de leads et rendez-vous qualifiés. Campagnes cold email, LinkedIn et téléprospection orientées résultats.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    languages: buildLanguageAlternates("/"),
  },
  openGraph: {
    title: "Agence de prospection commerciale B2B en Suisse",
    description:
      "Agence B2B en Suisse spécialisée en génération de leads et rendez-vous qualifiés. Campagnes cold email, LinkedIn et téléprospection orientées résultats.",
    siteName: "devlo",
    locale: "fr_CH",
    type: "website",
    url: toAbsoluteUrl("/"),
    images: [
      {
        url: toAbsoluteUrl(defaultOgImagePath),
        width: 1200,
        height: 630,
        alt: "devlo — Agence B2B de Prospection Commerciale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence de prospection commerciale B2B en Suisse",
    description:
      "Agence B2B en Suisse spécialisée en génération de leads et rendez-vous qualifiés. Campagnes cold email, LinkedIn et téléprospection orientées résultats.",
    images: [toAbsoluteUrl(defaultOgImagePath)],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/images/devlo_favicon-96x96.webp", type: "image/webp", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  manifest: "/site.webmanifest",
};

const schemaCopyByLocale: Record<
  LayoutLocale,
  {
    organizationDescription: string;
    serviceName: string;
    serviceType: string;
    reviewBodies: [string, string];
  }
> = {
  fr: {
    organizationDescription:
      "Agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés. Plus de 1000 campagnes depuis 2020.",
    serviceName: "Prospection commerciale B2B externalisée",
    serviceType: "Génération de leads B2B et prise de rendez-vous qualifiés",
    reviewBodies: [
      "devlo a complètement révolutionné notre approche commerciale. 80 rendez-vous qualifiés et 200 000 € de contrats signés.",
      "Charles est l'un des experts en vente les plus créatifs que je connaisse. Il nous a aidés à obtenir des rendez-vous commerciaux qualifiés dans la région DACH.",
    ],
  },
  en: {
    organizationDescription:
      "Swiss B2B outbound agency focused on lead generation and qualified meetings. More than 1,000 campaigns launched since 2020.",
    serviceName: "Outsourced B2B outbound prospecting",
    serviceType: "B2B lead generation and qualified meeting booking",
    reviewBodies: [
      "devlo completely transformed our commercial approach. We generated 80 qualified meetings and €200,000 in signed business.",
      "Charles is one of the most creative sales experts I know. He helped us secure qualified meetings across the DACH region.",
    ],
  },
  de: {
    organizationDescription:
      "Schweizer B2B-Outbound-Agentur für Leadgenerierung und qualifizierte Termine. Seit 2020 wurden mehr als 1.000 Kampagnen gestartet.",
    serviceName: "Ausgelagerte B2B-Vertriebsakquise",
    serviceType: "B2B-Leadgenerierung und Vereinbarung qualifizierter Termine",
    reviewBodies: [
      "devlo hat unseren Vertriebsansatz komplett verändert. Wir haben 80 qualifizierte Termine und 200.000 € an Neuumsatz erzielt.",
      "Charles ist einer der kreativsten Vertriebsexperten, die ich kenne. Er hat uns geholfen, qualifizierte Termine in der DACH-Region zu gewinnen.",
    ],
  },
  nl: {
    organizationDescription:
      "Zwitsers B2B-outboundbureau voor leadgeneratie en gekwalificeerde afspraken. Sinds 2020 werden meer dan 1.000 campagnes gelanceerd.",
    serviceName: "Uitbestede B2B outbound prospectie",
    serviceType: "B2B-leadgeneratie en het boeken van gekwalificeerde afspraken",
    reviewBodies: [
      "devlo heeft onze commerciële aanpak volledig veranderd. We genereerden 80 gekwalificeerde afspraken en 200.000 euro aan nieuwe omzet.",
      "Charles is een van de meest creatieve verkoopexperts die ik ken. Hij hielp ons om gekwalificeerde afspraken te verkrijgen in de DACH-regio.",
    ],
  },
};

function buildLayoutSchemas(locale: LayoutLocale) {
  const copy = schemaCopyByLocale[locale];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "devlo",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/devlo-logo.webp`,
    description: copy.organizationDescription,
    foundingDate: "2020",
    sameAs: [
      "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lausanne",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+41-79-758-64-03",
        email: "emea@devlo.ch",
        contactType: "customer service",
        areaServed: ["CH", "BE", "FR", "DE", "LU"],
        availableLanguage: ["French", "German", "English", "Dutch"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-234-201-8019",
        email: "americas@devlo.ch",
        contactType: "customer service",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"],
      },
    ],
  };

  const swissLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "devlo",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/devlo-logo.webp`,
    telephone: "+41-79-758-64-03",
    email: "emea@devlo.ch",
    description: copy.organizationDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lausanne",
      addressRegion: "Vaud",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.5197,
      longitude: 6.6323,
    },
    areaServed: [
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Luxembourg" },
    ],
    sameAs: [
      "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
    ],
  };

  const usLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "devlo LLC",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/devlo-logo.webp`,
    description: copy.organizationDescription,
    telephone: "+1-234-201-8019",
    email: "americas@devlo.ch",
    address: {
      "@type": "PostalAddress",
      streetAddress: "500 4TH ST NW SUITE 102 #1591",
      addressLocality: "Albuquerque",
      addressRegion: "NM",
      postalCode: "87102",
      addressCountry: "US",
    },
    areaServed: ["US", "CA"],
    parentOrganization: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.serviceName,
    serviceType: copy.serviceType,
    provider: {
      "@type": "Organization",
      name: "devlo",
      url: siteConfig.url,
    },
    areaServed: ["CH", "BE", "FR", "DE", "LU", "US", "CA"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteConfig.url}/consultation`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "14",
      reviewCount: "14",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jérôme Tailleur" },
        reviewBody: copy.reviewBodies[0],
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Raphael Haut" },
        reviewBody: copy.reviewBodies[1],
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    ],
  };

  return [organizationSchema, swissLocalBusinessSchema, usLocalBusinessSchema, serviceSchema];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = headers().get("x-devlo-locale");
  const htmlLang: LayoutLocale = localeHeader === "en" || localeHeader === "de" || localeHeader === "nl" ? localeHeader : "fr";
  const skipToContentText =
    htmlLang === "en"
      ? "Skip to content"
      : htmlLang === "de"
        ? "Zum Inhalt springen"
        : htmlLang === "nl"
          ? "Naar de inhoud springen"
          : "Aller au contenu";

  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${plusJakartaSans.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        <JsonLd schema={buildLayoutSchemas(htmlLang)} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-soft focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          {skipToContentText}
        </a>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1 pt-16 md:pt-20 lg:pt-20">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
