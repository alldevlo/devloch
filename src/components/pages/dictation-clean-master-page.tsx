import Image from "next/image";
import Link from "next/link";

import { NewsletterSection } from "@/components/sections/newsletter-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WaveDivider } from "@/components/ui/wave-divider";
import { getLocalizedDictationCleanContent } from "@/lib/i18n/dictation-clean-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildHowToSchema,
} from "@/lib/seo/schema-builders";

export function DictationCleanMasterPage({ locale = "fr" }: { locale?: SupportedLocale }) {
  const content = getLocalizedDictationCleanContent(locale);
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const pagePath = `${prefix}/insights/dictation-clean`;
  const consultationPath = resolvePathForLocale("/consultation", locale).path;
  const coldEmailPath = resolvePathForLocale("/services/cold-email", locale).path;
  const linkedinPath = resolvePathForLocale("/services/linkedin-outreach", locale).path;
  const leadGenPath = resolvePathForLocale("/services/generation-leads", locale).path;
  const homePath = resolvePathForLocale("/", locale).path;

  const breadcrumbItems = [
    { name: content.breadcrumbHome, path: homePath },
    { name: content.breadcrumbInsights, path: `${prefix}/insights` },
    { name: content.heroTitle, path: pagePath },
  ];

  const howToSteps = content.howToSteps.map((step) => ({
    title: step.title,
    description: step.description,
  }));

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildArticleSchema({
            headline: content.heroTitle,
            description: content.metaDescription,
            path: pagePath,
            imagePath: "/images/CharlesPerretProfilePicture2025.webp",
            datePublished: "2026-03-20",
            dateModified: "2026-03-20",
            author: "Charles Perret",
            authorUrl: "https://www.linkedin.com/in/charlesperret-devlo/",
          }),
          buildHowToSchema(content.setupTitle, howToSteps),
        ]}
      />

      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 text-white">
        <Breadcrumb items={breadcrumbItems} variant="dark" />

        <div className="mx-auto w-full max-w-3xl px-6 pb-14 pt-10 text-center lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            {content.heroEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
            {content.heroTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white/85">
            {content.heroSubtitle}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Image
              src="/images/CharlesPerretProfilePicture2025.webp"
              alt="Charles Perret"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="text-left text-sm">
              <p className="font-medium text-white">{content.authorLine}</p>
              <p className="text-white/50">{content.readingTime}</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

      <article className="mx-auto w-full max-w-3xl px-6 py-14 lg:px-10">
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.problemTitle}</h2>
          {content.problemParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[#2a4c63]/80">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="mt-14 space-y-5">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.solutionTitle}</h2>
          {content.solutionParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-[#2a4c63]/80">
              {paragraph}
            </p>
          ))}
          {content.tools.map((tool) => (
            <div key={tool.number} className="flex items-center gap-4 rounded-lg border border-[#074f74]/10 bg-[#074f74]/5 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#074f74] text-sm font-bold text-white">
                {tool.number}
              </div>
              <div>
                <p className="font-semibold text-[#153a54]">{tool.title}</p>
                <p className="mt-0.5 text-sm text-[#2a4c63]/80">{tool.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 space-y-5">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.beforeAfterTitle}</h2>
          <p className="text-base leading-relaxed text-[#2a4c63]/80">{content.beforeAfterIntro}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600">{content.beforeLabel}</p>
              <p className="mt-3 text-sm italic leading-relaxed text-[#2a4c63]/80">{content.beforeText}</p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">{content.afterLabel}</p>
              <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#2a4c63]/80">
                <p className="font-semibold text-[#153a54]">{content.afterTitle}</p>
                <p>{content.afterParagraph}</p>
                <p className="font-medium text-[#153a54]">{content.nextStepsLabel}</p>
                <ul className="list-inside list-disc space-y-1">
                  {content.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-6">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.setupTitle}</h2>
          <p className="text-base leading-relaxed text-[#2a4c63]/80">{content.setupIntro}</p>
          {content.howToSteps.map((step, index) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#074f74] text-sm font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#153a54]">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#2a4c63]/80">{step.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 space-y-5">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.useCasesTitle}</h2>
          <p className="text-base leading-relaxed text-[#2a4c63]/80">{content.useCasesIntro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.useCases.map((item) => (
              <div key={item.label} className="rounded-lg border border-[#074f74]/10 bg-[#074f74]/5 p-4">
                <p className="text-sm font-semibold text-[#153a54]">{item.label}</p>
                <p className="mt-1 text-xs text-[#2a4c63]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="rounded-xl bg-gradient-to-b from-[#074f74] to-[#0a3a54] p-8 text-center text-white md:p-12">
            <h2 className="text-2xl font-bold">{content.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">{content.ctaBody}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={consultationPath}
                className="inline-flex h-11 items-center rounded-lg bg-white px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#074f74] transition hover:bg-white/90"
              >
                {content.ctaPrimary}
              </Link>
              <Link
                href={coldEmailPath}
                className="inline-flex h-11 items-center rounded-lg border border-white/30 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:border-white/50 hover:bg-white/10"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-3">
          <h2 className="text-2xl font-semibold text-[#153a54]">{content.furtherTitle}</h2>
          <p className="text-base leading-relaxed text-[#2a4c63]/80">
            {content.furtherParagraphParts[0]}
            <Link href={homePath} className="font-medium text-[#074f74] underline hover:text-[#0a3a54]">
              {content.furtherParagraphParts[1]}
            </Link>
            {content.furtherParagraphParts[2]}
            <Link href={coldEmailPath} className="font-medium text-[#074f74] underline hover:text-[#0a3a54]">
              {content.furtherParagraphParts[3]}
            </Link>
            {content.furtherParagraphParts[4]}
            <Link href={linkedinPath} className="font-medium text-[#074f74] underline hover:text-[#0a3a54]">
              {content.furtherParagraphParts[5]}
            </Link>
            {content.furtherParagraphParts[6]}
            <Link href={leadGenPath} className="font-medium text-[#074f74] underline hover:text-[#0a3a54]">
              {content.furtherParagraphParts[7]}
            </Link>
          </p>
        </section>

        <p className="mt-10 text-xs text-[#2a4c63]/50">{content.updatedLabel}</p>
      </article>

      <NewsletterSection locale={locale} />
    </>
  );
}
