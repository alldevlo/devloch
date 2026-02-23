import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "devlo — Agence B2B de Prospection Commerciale en Suisse",
  description:
    "Agence B2B spécialisée en prospection commerciale, télémarketing et génération de rendez-vous qualifiés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${plusJakartaSans.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-soft focus:bg-paper focus:px-4 focus:py-2 focus:text-sm"
        >
          Aller au contenu
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
