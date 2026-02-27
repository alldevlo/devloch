import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { LovalingoNextProvider } from "@/components/providers/lovalingo-next-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { buildLanguageAlternates, defaultOgImagePath, toAbsoluteUrl } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

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
        url: defaultOgImagePath,
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
    images: [defaultOgImagePath],
  },
  icons: {
    icon: [
      { url: "/images/devlo_favicon.ico", type: "image/x-icon" },
      { url: "/images/devlo_favicon.svg", type: "image/svg+xml" },
      { url: "/images/devlo_favicon-96x96.webp", type: "image/webp", sizes: "96x96" },
    ],
    apple: [{ url: "/images/devlo_apple-touch-icon.webp", sizes: "180x180", type: "image/webp" }],
    shortcut: ["/images/devlo_favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

/** Organization JSON-LD — injected on every page via root layout */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "devlo",
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/devlo-logo.webp`,
  description:
    "Agence suisse spécialisée en prospection B2B, génération de leads et prise de rendez-vous qualifiés. Plus de 1000 campagnes depuis 2020.",
  foundingDate: "2020",
  sameAs: [
    "https://www.linkedin.com/company/devlo-connects-you-with-more-prospects/",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruelle des Dolles 1",
    addressLocality: "Rivaz",
    postalCode: "1071",
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
      availableLanguage: ["French", "German", "English"],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruelle des Dolles 1",
    addressLocality: "Rivaz",
    postalCode: "1071",
    addressRegion: "Vaud",
    addressCountry: "CH",
  },
  areaServed: ["CH", "BE", "FR", "DE", "LU"],
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
  name: "Prospection commerciale B2B externalisée",
  serviceType: "Génération de leads B2B et prise de rendez-vous qualifiés",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${plusJakartaSans.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}>
        <JsonLd schema={[organizationSchema, swissLocalBusinessSchema, usLocalBusinessSchema, serviceSchema]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-soft focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Aller au contenu
        </a>
        <LovalingoNextProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1 pt-16 md:pt-20 lg:pt-20">
              {children}
            </main>
            <SiteFooter />
          </div>
        </LovalingoNextProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
