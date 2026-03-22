import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WaveDivider } from "@/components/ui/wave-divider";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights — Ressources et guides pour la prospection B2B",
  description:
    "Guides pratiques, listes de reference et ressources pour ameliorer votre prospection B2B. Signaux d'achat, automatisation IA, et strategies outbound.",
  path: "/insights",
  type: "website",
});

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Insights", path: "/insights" },
];

const insights = [
  {
    title: "94 Signaux d\u2019Intention d\u2019Achat B2B",
    description:
      "La liste la plus compl\u00e8te de signaux d\u2019achat B2B. 7 cat\u00e9gories, outils de d\u00e9tection, et niveaux d\u2019intensit\u00e9 pour chaque signal.",
    href: "/insights/buying-signals",
    tag: "Liste",
    date: "Mars 2026",
  },
  {
    title: "Dictation-Clean",
    description:
      "Transformez vos dict\u00e9es vocales en contenus structur\u00e9s avec Wispr Flow et Claude Code. Guide \u00e9tape par \u00e9tape.",
    href: "/insights/dictation-clean",
    tag: "Guide",
    date: "Mars 2026",
  },
];

export default function InsightsPage() {
  return (
    <>
      <JsonLd schema={[buildBreadcrumbSchema(breadcrumbItems)]} />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 text-white">
          <Breadcrumb items={breadcrumbItems} variant="dark" />

          <div className="mx-auto w-full max-w-3xl px-6 pb-14 pt-10 text-center lg:px-10">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Insights
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white/85">
              Guides pratiques, listes de r&eacute;f&eacute;rence et ressources
              pour am&eacute;liorer votre prospection B2B.
            </p>
          </div>
        </section>

        <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

        {/* Insight cards */}
        <section className="mx-auto w-full max-w-4xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {insights.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-[#e0e4e6] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[#074f74] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                    {item.tag}
                  </span>
                  <span className="text-xs text-[#666d70]">{item.date}</span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-[#0d1a21] group-hover:text-[#074f74] transition-colors">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#666d70]">
                  {item.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#074f74]">
                  Lire &rarr;
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <WaveDivider variant="layered-bottom" fromBg="#FFFFFF" toBg="#074f74" />

        <section
          style={{
            background: "linear-gradient(165deg, #074f74 0%, #0a3a54 100%)",
          }}
        >
          <div className="mx-auto max-w-2xl space-y-8 px-6 py-20 text-center md:py-28">
            <h2
              className="font-black text-white"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
                lineHeight: 1.1,
              }}
            >
              Vous cherchez des r&eacute;sultats concrets ?
            </h2>
            <p className="text-base text-white/80">
              devlo aide les entreprises B2B &agrave; g&eacute;n&eacute;rer des
              rendez-vous qualifi&eacute;s gr&acirc;ce &agrave; la prospection
              outbound automatis&eacute;e.
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
                R&eacute;server une consultation
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

        <p className="py-8 text-center text-xs" style={{ color: "#666d70" }}>
          Derni&egrave;re mise &agrave; jour : mars 2026
        </p>
      </main>
    </>
  );
}
