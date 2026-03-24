import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WaveDivider } from "@/components/ui/wave-divider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFaqPageSchema,
} from "@/lib/seo/schema-builders";
import type { SupportedLocale } from "@/lib/i18n/slug-map";
import { getLocalizedColdEmailHub } from "@/lib/i18n/insights-helpers";
import { normalizeLocalizedCopyDeep } from "@/lib/i18n/text-normalization";

import { SEQUENCES } from "@/app/insights/cold-email-templates/sequence-data";
import { SequenceBrowser } from "@/app/insights/cold-email-templates/sequence-browser";

const LOCALE_CONSULTATION_HREFS: Record<SupportedLocale, string> = {
  fr: "/consultation",
  en: "/en/consultation",
  de: "/de/consultation",
  nl: "/nl/consultation",
};

const LOCALE_SERVICES_HREFS: Record<SupportedLocale, string> = {
  fr: "/services/cold-email",
  en: "/en/services/cold-email",
  de: "/de/services/cold-email",
  nl: "/nl/services/cold-email",
};

export function ColdEmailTemplatesMasterPage({ locale }: { locale: SupportedLocale }) {
  const content = getLocalizedColdEmailHub(locale);
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const localizedSequences = normalizeLocalizedCopyDeep(SEQUENCES, locale);

  const totalTouches = localizedSequences.reduce((sum, s) => sum + s.numTouches, 0);
  const sequencesWithResults = localizedSequences.filter(
    (s) => s.metrics.repliedPct !== null
  ).length;
  const avgReplyRate =
    localizedSequences.filter((s) => s.metrics.repliedPct !== null).reduce(
      (sum, s) => sum + (s.metrics.repliedPct ?? 0),
      0
    ) / sequencesWithResults;
  const industries = new Set(
    localizedSequences.map((s) => s.industry.split(" / ")[0].trim())
  );

  const breadcrumbItems = [
    { name: content.breadcrumbs.home, path: prefix || "/" },
    { name: content.breadcrumbs.insights, path: `${prefix}/insights` },
    { name: content.breadcrumbs.coldEmailTemplates, path: `${prefix}/insights/cold-email-templates` },
  ];

  const faqItems = content.faq;

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildArticleSchema({
            headline: content.hero.title,
            description: content.metaDescription,
            path: `${prefix}/insights/cold-email-templates`,
            imagePath: "/images/CharlesPerretProfilePicture2025.webp",
            datePublished: "2026-03-23",
            dateModified: "2026-03-23",
            author: "Charles Perret",
            authorUrl: "https://www.linkedin.com/in/charlesperret-devlo/",
          }),
          buildFaqPageSchema(faqItems),
        ]}
      />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 text-white">
          <Breadcrumb items={breadcrumbItems} variant="dark" />

          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pb-14 pt-10 text-center">
            <div className="space-y-4">
              <h1
                className="font-black tracking-tight text-white"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  lineHeight: 1.1,
                  textWrap: "balance",
                } as React.CSSProperties}
              >
                {content.hero.title}
              </h1>
              <p
                className="mx-auto max-w-xl text-white/80"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.625,
                  textWrap: "pretty",
                } as React.CSSProperties}
              >
                {content.hero.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Image
                src="/images/CharlesPerretProfilePicture2025.webp"
                alt="Charles Perret"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Charles Perret
                </p>
                <p className="text-xs text-white/60">
                  {content.hero.authorRole}{" "}
                  <a
                    href="https://devlo.ch"
                    className="underline transition-colors hover:text-white"
                  >
                    devlo.ch
                  </a>{" "}
                  &middot; {content.hero.dateLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

        {/* Sequence Browser */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <SequenceBrowser sequences={localizedSequences} uiLabels={content.browser} />
        </section>

        {/* Metrics summary */}
        <section className="bg-[#f7f8fc] py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              className="font-black text-[#0D0D0D]"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: 1.15,
              }}
            >
              {content.metrics.titleTemplate
                .replace("{touches}", String(totalTouches))
                .replace("{withResults}", String(sequencesWithResults))}
            </h2>

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <div className="text-3xl font-black" style={{ color: "#074f74" }}>25</div>
                <div className="mt-1 text-sm" style={{ color: "#666d70" }}>{content.metrics.sequences}</div>
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: "#074f74" }}>{totalTouches}</div>
                <div className="mt-1 text-sm" style={{ color: "#666d70" }}>{content.metrics.totalSteps}</div>
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: "#074f74" }}>{Math.round(avgReplyRate)}%</div>
                <div className="mt-1 text-sm" style={{ color: "#666d70" }}>{content.metrics.avgReplyRate}</div>
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: "#074f74" }}>{industries.size}+</div>
                <div className="mt-1 text-sm" style={{ color: "#666d70" }}>{content.metrics.industriesCovered}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2
              className="mb-8 text-center font-black text-[#0D0D0D]"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
            >
              {content.faqSectionTitle}
            </h2>
            <div className="divide-y divide-[#e0e4e6] rounded-xl border border-[#e0e4e6] bg-white">
              {faqItems.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-sm font-semibold" style={{ color: "#0D0D0D" }}>
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
                    <p className="px-5 text-sm leading-relaxed" style={{ color: "#666d70" }}>
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider variant="layered-bottom" fromBg="#FFFFFF" toBg="#074f74" />

        {/* CTA Section */}
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
                textWrap: "balance",
              } as React.CSSProperties}
            >
              {content.cta.heading}
            </h2>
            <p className="text-base text-white/80">{content.cta.body}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={LOCALE_CONSULTATION_HREFS[locale]}
                className="rounded-lg px-7 py-3 text-sm font-bold text-[#074f74] transition-all duration-150 active:scale-[0.97]"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                {content.cta.primaryButton}
              </Link>
              <Link
                href={LOCALE_SERVICES_HREFS[locale]}
                className="rounded-lg border px-7 py-3 text-sm font-bold text-white transition-all duration-150 active:scale-[0.97]"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                {content.cta.secondaryButton}
              </Link>
            </div>
          </div>
        </section>

        <p className="py-8 text-center text-xs" style={{ color: "#666d70" }}>
          {content.lastUpdated}
        </p>
      </main>

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="rounded-xl border border-[#e0e4e6] bg-[#F7F8FC] p-8 text-center">
          <h3 className="text-xl font-semibold text-[#0D0D0D]">
            {content.newsletter.title}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#4A4A4A]">
            {content.newsletter.subtitle}
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
              placeholder={content.newsletter.placeholder}
              className="flex-1 rounded-md border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] placeholder:text-[#8C8C8C] focus:border-[#074f74] focus:outline-none focus:ring-1 focus:ring-[#074f74]"
            />
            <button
              type="submit"
              className="rounded-md bg-[#074f74] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a3a54]"
            >
              {content.newsletter.button}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
