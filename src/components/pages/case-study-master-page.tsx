import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CaseStudyStickySubnav } from "@/components/case-studies/case-study-sticky-subnav";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { buttonClassName } from "@/components/ui/button";
import { HubspotForm } from "@/components/ui/hubspot-form";
import { WistiaThumbnailTrigger } from "@/components/ui/wistia-thumbnail-trigger";
import { caseStudiesCards, consultationContent } from "@/content/masterfile.fr";
import { type CaseStudy, type CaseStudySection, caseStudyBySlug } from "@/lib/case-studies";
import { resolveCaseStudyCanonicalSlug } from "@/lib/case-study-slug-redirects";

const anchorIds = {
  about: "a-propos",
  icp: "icp",
  context: "contexte",
  challenge: "defi",
  solutions: "solutions",
  results: "resultats",
  learnings: "enseignements",
  testimonial: "temoignage",
  contact: "contact",
  contactForm: "contact-form",
} as const;

const unifiedCtaLabel = "Obtenir un plan outbound similaire lors d’une rencontre";

function normalizeHeading(value: string) {
  return value.toLowerCase();
}

function normalizeLoose(value: string) {
  return normalizeHeading(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

type CaseStudySectionKind =
  | "about"
  | "icp"
  | "challenge"
  | "solutions"
  | "results"
  | "learnings"
  | "testimonial"
  | "note"
  | "finalCta"
  | "methodStep"
  | "sourceCta"
  | "other";

function classifySectionHeading(heading: string): CaseStudySectionKind {
  const normalized = normalizeLoose(heading);
  if (/^\d+\)\s/.test(heading.trim())) return "methodStep";
  if (normalized.includes("cta present sur la page source")) return "sourceCta";
  if (normalized.includes("note d'integrite") || normalized.includes("note methodologique")) return "note";
  if (normalized.includes("vous voulez obtenir plus de rendez-vous")) return "finalCta";
  if (normalized.includes("temoignage")) return "testimonial";
  if (normalized.includes("pourquoi cette campagne a fonctionne") || normalized.includes("principaux enseignements")) return "learnings";
  if (normalized.includes("resultat")) return "results";
  if (
    normalized.includes("approche mise en place") ||
    normalized.includes("les solutions") ||
    normalized.includes("nos solutions") ||
    normalized === "la mission"
  ) {
    return "solutions";
  }
  if (normalized.includes("defi")) return "challenge";
  if (normalized.includes("ideal customer profile") || normalized.includes("icp cible")) return "icp";
  if (normalized.includes("a propos")) return "about";
  return "other";
}

function isSourceCtaSection(section: CaseStudySection) {
  return normalizeHeading(section.heading).includes("cta présent sur la page source");
}

function isNoteSection(section: CaseStudySection) {
  const heading = normalizeHeading(section.heading);
  return heading.includes("note d’intégrité") || heading.includes("note méthodologique");
}

function isFinalCtaSection(section: CaseStudySection) {
  return normalizeHeading(section.heading).includes("vous voulez obtenir plus de rendez-vous qualifiés");
}

function isCaseStudySection(value: CaseStudySection | undefined): value is CaseStudySection {
  return Boolean(value);
}

function parseBulletDisplay(
  bullet: string,
  sectionKind: CaseStudySectionKind,
): { title: string; body: string } | null {
  const explicit = bullet.match(/^\*\*(.+?)\*\*\s*\n+([\s\S]+)$/);
  if (explicit) {
    return {
      title: explicit[1].trim(),
      body: explicit[2].trim(),
    };
  }

  if (!(sectionKind === "solutions" || sectionKind === "learnings")) {
    return null;
  }

  const colonIndex = bullet.indexOf(":");
  if (colonIndex > 0 && colonIndex <= 90) {
    const title = bullet.slice(0, colonIndex).trim();
    const body = bullet.slice(colonIndex + 1).trim();
    if (title && body) {
      return { title, body };
    }
  }

  return null;
}

function uniqueAndTrim(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function deriveOutcomes(study: CaseStudy): string[] {
  if (study.resultHighlights.length > 0) {
    return uniqueAndTrim(study.resultHighlights).slice(0, 5);
  }

  if (study.heroStats.length > 0) {
    return uniqueAndTrim(study.heroStats.map((item) => `${item.value} ${item.label}`)).slice(0, 5);
  }

  return ["Campagne activée avec suivi des KPIs de prospection."];
}

function SectionContent({
  section,
  sectionKind = "other",
}: {
  section: CaseStudySection;
  sectionKind?: CaseStudySectionKind;
}) {
  return (
    <>
      {section.paragraphs.length > 0 ? (
        <div className="space-y-4 text-[15px] leading-8 text-neutral-700 md:text-base">
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${section.heading}-paragraph-${paragraphIndex}`}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {section.bullets.length > 0 ? (
        <ul className="mt-5 space-y-3 text-[15px] leading-8 text-neutral-700 md:text-base">
          {section.bullets.map((bullet, bulletIndex) => (
            <li key={`${section.heading}-bullet-${bulletIndex}`} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-devlo-700" />
              <span>
                {(() => {
                  const parsed = parseBulletDisplay(bullet, sectionKind);
                  if (!parsed) {
                    return bullet;
                  }

                  return (
                    <>
                      <strong className="font-semibold text-devlo-900">{parsed.title}</strong>
                      <br />
                      <span>{parsed.body}</span>
                    </>
                  );
                })()}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function NarrativeCard({
  section,
  id,
  compact = false,
  sectionKind,
}: {
  section: CaseStudySection;
  id?: string;
  compact?: boolean;
  sectionKind?: CaseStudySectionKind;
}) {
  return (
    <article
      id={id}
      className={[
        "scroll-mt-[170px] rounded-panel border border-neutral-200 bg-white shadow-soft",
        compact ? "p-6 md:p-7" : "p-7 md:p-9",
      ].join(" ")}
    >
      <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">{section.heading}</h2>
      <div className="mt-4">
        <SectionContent section={section} sectionKind={sectionKind} />
      </div>
    </article>
  );
}

export function CaseStudyMasterPage({ slug }: { slug: string }) {
  const canonicalSlug = resolveCaseStudyCanonicalSlug(slug);
  const detailedStudy = caseStudyBySlug[canonicalSlug] ?? caseStudyBySlug[slug];
  const cardStudy = caseStudiesCards.find((item) => item.slug === slug) ?? caseStudiesCards.find((item) => item.slug === canonicalSlug);
  const study =
    cardStudy ??
    (detailedStudy
      ? {
          slug: detailedStudy.slug,
          client: detailedStudy.client,
          banner: detailedStudy.heroImageUrl,
          logo: detailedStudy.clientLogoUrl,
          title: detailedStudy.title,
          metrics:
            detailedStudy.resultHighlights.length > 0
              ? detailedStudy.resultHighlights
              : detailedStudy.heroStats.map((stat) => `${stat.value} ${stat.label}`),
          sector: detailedStudy.sector,
        }
      : null);
  if (!study) {
    notFound();
  }

  const pageTitle = detailedStudy?.title ?? study.title;

  if (!detailedStudy) {
    return (
      <SectionWrapper background="white" className="pt-[100px]">
        <h1 className="text-3xl font-extrabold text-devlo-900 md:text-5xl">{pageTitle}</h1>
        <div className="mt-8 overflow-hidden rounded-panel border border-neutral-200 shadow-soft">
          <Image
            src={study.banner}
            alt={study.client}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            quality={74}
          />
        </div>
      </SectionWrapper>
    );
  }

  const outcomeItems =
    detailedStudy.outcomes && detailedStudy.outcomes.length > 0
      ? uniqueAndTrim(detailedStudy.outcomes).slice(0, 5)
      : deriveOutcomes(detailedStudy);

  const visibleSections = detailedStudy.sections.filter((section) => !isSourceCtaSection(section));
  const noteSection = visibleSections.find(isNoteSection);
  const finalCtaSection = visibleSections.find(isFinalCtaSection);
  const methodSteps = visibleSections.filter((section) => classifySectionHeading(section.heading) === "methodStep");

  const aboutSection = visibleSections.find((section) => classifySectionHeading(section.heading) === "about");
  const contextSection = visibleSections.find((section) => normalizeLoose(section.heading) === "contexte client");
  const challengeSection = visibleSections.find((section) => classifySectionHeading(section.heading) === "challenge");
  const icpSection = visibleSections.find((section) => classifySectionHeading(section.heading) === "icp");
  const approachIntroSection = visibleSections.find(
    (section) => normalizeLoose(section.heading) === "approche mise en place par devlo",
  );
  const solutionsSection = visibleSections.find(
    (section) =>
      classifySectionHeading(section.heading) === "solutions" &&
      section.heading !== approachIntroSection?.heading,
  );
  const primarySolutionsSection = approachIntroSection ?? solutionsSection;
  const resultSection = visibleSections.find((section) => classifySectionHeading(section.heading) === "results");
  const whyItWorkedSection = visibleSections.find(
    (section) => normalizeLoose(section.heading).includes("pourquoi cette campagne a fonctionne"),
  );
  const learningsSection = visibleSections.find(
    (section) =>
      classifySectionHeading(section.heading) === "learnings" &&
      section.heading !== whyItWorkedSection?.heading,
  );
  const primaryLearningsSection = whyItWorkedSection ?? learningsSection;
  const testimonialSection = visibleSections.find((section) => classifySectionHeading(section.heading) === "testimonial");

  const consumedHeadings = new Set<string>(
    [
      noteSection,
      finalCtaSection,
      testimonialSection,
      whyItWorkedSection,
      learningsSection,
      aboutSection,
      contextSection,
      challengeSection,
      icpSection,
      approachIntroSection,
      solutionsSection,
      resultSection,
      ...methodSteps,
    ]
      .filter(isCaseStudySection)
      .map((section) => section.heading),
  );

  const remainingNarrativeSections = visibleSections.filter((section) => !consumedHeadings.has(section.heading));

  const subnavItems = [
    (aboutSection || contextSection) ? { id: aboutSection ? anchorIds.about : anchorIds.context, label: "À propos" } : null,
    icpSection ? { id: anchorIds.icp, label: "ICP" } : null,
    challengeSection ? { id: anchorIds.challenge, label: "Défis du client" } : null,
    (primarySolutionsSection || methodSteps.length) ? { id: anchorIds.solutions, label: "Nos solutions" } : null,
    resultSection ? { id: anchorIds.results, label: "Résultats" } : null,
    primaryLearningsSection ? { id: anchorIds.learnings, label: "Principaux enseignements" } : null,
    testimonialSection ? { id: anchorIds.testimonial, label: "Témoignage" } : null,
    { id: anchorIds.contact, label: "Contact" },
  ].filter(Boolean) as { id: string; label: string }[];

  const heroImage = detailedStudy.heroImageUrl || study.banner;
  const isIddiStudy = detailedStudy.slug === "iddi-generation-leads-biotech-pharma";
  const testimonialAvatarSrc = detailedStudy.testimonialPhotoUrl;
  const testimonialAvatarAlt = detailedStudy.testimonialPhotoAlt ?? `Photo de profil de ${detailedStudy.client}`;
  const introParagraphs = [detailedStudy.summary];
  if (detailedStudy.heroSubtitle && detailedStudy.heroSubtitle !== detailedStudy.summary) {
    const subtitleChunks = detailedStudy.heroSubtitle
      .split(/\n{2,}/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
    if (subtitleChunks.length) {
      introParagraphs.push(...subtitleChunks);
    } else {
      introParagraphs.push(detailedStudy.heroSubtitle);
    }
  }

  return (
    <>
      <SectionWrapper background="white" className="py-[56px] pt-[94px] md:py-[72px] md:pt-[118px] lg:py-[88px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <FadeInOnScroll eager>
              <Link href="/etudes-de-cas" className="inline-flex items-center rounded-full border border-devlo-100 bg-devlo-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-devlo-700 hover:text-devlo-900">
                Études de cas
              </Link>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.08} eager>
              <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-devlo-900 md:text-4xl lg:text-5xl">
                {pageTitle}
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.14} eager>
              <div className="mt-5 space-y-3">
                {introParagraphs.map((paragraph, index) => (
                  <p key={`${detailedStudy.slug}-intro-${index}`} className={index === 0 ? "max-w-2xl text-base leading-8 text-neutral-700 md:text-lg" : "max-w-2xl text-[15px] leading-7 text-neutral-600 md:text-base"}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2} eager>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={`#${anchorIds.contactForm}`}
                  data-case-study-cta=""
                  data-case-study-cta-variant="hero"
                  className={buttonClassName("primary", "px-5 py-3 text-sm")}
                >
                  {unifiedCtaLabel}
                </Link>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.24} eager>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {study.metrics.map((metric) => (
                  <span
                    key={`${study.slug}-${metric}`}
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-[0_4px_12px_rgba(15,43,60,0.04)]"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </FadeInOnScroll>
          </div>

          <FadeInOnScroll delay={0.12} direction="right" eager>
            <div className="overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-panel">
              <div className="flex items-center justify-between border-b border-neutral-200/80 bg-gradient-to-r from-white to-devlo-50 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  {detailedStudy.clientLogoUrl ? (
                    <div className="relative h-9 w-20 overflow-hidden rounded-md bg-white ring-1 ring-neutral-200">
                      <Image src={detailedStudy.clientLogoUrl} alt={`${detailedStudy.client} logo`} fill className="object-contain p-1.5" sizes="80px" />
                    </div>
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-devlo-900">{detailedStudy.client}</p>
                    <p className="truncate text-xs text-neutral-500">{detailedStudy.sector}</p>
                  </div>
                </div>
                <span className="rounded-full bg-devlo-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Étude de cas</span>
              </div>
              <div className="relative aspect-[16/10] bg-devlo-50">
                <Image
                  src={heroImage}
                  alt={study.client}
                  fill
                  className={isIddiStudy ? "object-contain bg-white p-3 md:p-4" : "object-cover"}
                  priority
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, (max-width: 1280px) 42vw, 520px"
                  quality={74}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        <FadeInOnScroll delay={0.28}>
          <section className="mt-8 rounded-[22px] border border-neutral-200 bg-gradient-to-b from-white to-devlo-50/60 p-5 shadow-soft md:mt-10 md:p-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
              <article className="rounded-panel border border-neutral-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,43,60,0.05)]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-devlo-700">Détails de campagne</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {detailedStudy.campaignDetails.map((detail) => (
                    <div key={`${detail.label}-${detail.value}`} className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">{detail.label}</p>
                      <p className="mt-1 text-sm leading-6 text-devlo-900">{detail.value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className={["rounded-panel border border-neutral-200 bg-white shadow-[0_10px_24px_rgba(15,43,60,0.05)]", isIddiStudy ? "p-4 md:p-5" : "p-5"].join(" ")}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-devlo-700">Résultats clés</h2>
                  <span className="hidden rounded-full border border-devlo-100 bg-devlo-50 px-3 py-1 text-[11px] font-semibold text-devlo-700 md:inline-flex">
                    KPIs observés
                  </span>
                </div>
                <div className={["mt-4 grid sm:grid-cols-2", isIddiStudy ? "gap-2.5" : "gap-3"].join(" ")}>
                  {detailedStudy.resultHighlights.map((line, index) => (
                    <div key={`${study.slug}-highlight-${index}`} className={["rounded-xl border border-neutral-200 bg-white", isIddiStudy ? "px-3.5 py-2.5" : "px-4 py-3"].join(" ")}>
                      <p className="text-sm font-medium leading-6 text-neutral-800">{line}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>
        </FadeInOnScroll>

        {detailedStudy.heroStats.length ? (
          <FadeInOnScroll delay={0.34}>
            <section className="mt-8 md:mt-10">
              <div className="grid gap-4 md:grid-cols-3">
                {detailedStudy.heroStats.map((item, index) => (
                  <article
                    key={`${item.value}-${item.label}`}
                    className={[
                      "rounded-[18px] border p-5 md:p-6",
                      index === 0 ? "border-devlo-200 bg-white shadow-panel" : "border-neutral-200 bg-white shadow-soft",
                    ].join(" ")}
                  >
                    <p className="text-3xl font-extrabold tracking-tight text-devlo-900 md:text-4xl">{item.value}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">{item.label}</p>
                  </article>
                ))}
              </div>
            </section>
          </FadeInOnScroll>
        ) : null}
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[72px] md:py-[96px]">
        <div className="space-y-6 md:space-y-8">
          <CaseStudyStickySubnav
            items={subnavItems}
            ctaHref={`#${anchorIds.contactForm}`}
            ctaLabel={unifiedCtaLabel}
          />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
          <div className="min-w-0 space-y-7">
            {aboutSection ? (
              <FadeInOnScroll>
                <NarrativeCard section={aboutSection} id={anchorIds.about} />
              </FadeInOnScroll>
            ) : null}

            {!aboutSection && contextSection ? (
              <FadeInOnScroll>
                <NarrativeCard section={contextSection} id={anchorIds.context} />
              </FadeInOnScroll>
            ) : null}

            {challengeSection ? (
              <FadeInOnScroll delay={0.04}>
                <NarrativeCard section={challengeSection} id={anchorIds.challenge} sectionKind="challenge" />
              </FadeInOnScroll>
            ) : null}

            {icpSection ? (
              <FadeInOnScroll delay={0.08}>
                <NarrativeCard section={icpSection} id={anchorIds.icp} compact sectionKind="icp" />
              </FadeInOnScroll>
            ) : null}

            {(primarySolutionsSection || methodSteps.length) ? (
              <FadeInOnScroll delay={0.12}>
                <section id={anchorIds.solutions} className="scroll-mt-[170px] rounded-panel border border-neutral-200 bg-white p-7 shadow-soft md:p-9">
                  {primarySolutionsSection ? (
                    <>
                      <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">{primarySolutionsSection.heading}</h2>
                      <div className="mt-4">
                        <SectionContent section={primarySolutionsSection} sectionKind="solutions" />
                      </div>
                    </>
                  ) : (
                    <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">Nos solutions</h2>
                  )}

                  {methodSteps.length ? (
                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                      {methodSteps.map((stepSection, index) => (
                        <article key={stepSection.heading} className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-devlo-50/60 p-5">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-devlo-900 text-sm font-bold text-white">
                              {index + 1}
                            </span>
                            <h3 className="text-base font-semibold leading-6 text-devlo-900">{stepSection.heading}</h3>
                          </div>
                          <div className="mt-4">
                            <SectionContent section={stepSection} sectionKind="solutions" />
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              </FadeInOnScroll>
            ) : null}

            {resultSection ? (
              <FadeInOnScroll delay={0.16}>
                <section id={anchorIds.results} className="scroll-mt-[170px] rounded-panel border border-neutral-200 bg-white p-7 shadow-soft md:p-9">
                  <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">{resultSection.heading}</h2>
                  <div className="mt-4">
                    <SectionContent section={resultSection} sectionKind="results" />
                  </div>
                </section>
              </FadeInOnScroll>
            ) : null}

            {primaryLearningsSection ? (
              <FadeInOnScroll delay={0.2}>
                <section id={anchorIds.learnings} className="scroll-mt-[170px] rounded-panel border border-neutral-200 bg-white p-7 shadow-soft md:p-9">
                  <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">{primaryLearningsSection.heading}</h2>
                  {primaryLearningsSection.paragraphs.length ? (
                    <div className="mt-4 space-y-4 text-[15px] leading-8 text-neutral-700 md:text-base">
                      {primaryLearningsSection.paragraphs.map((paragraph, index) => (
                        <p key={`${primaryLearningsSection.heading}-paragraph-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}

                  {primaryLearningsSection.bullets.length ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {primaryLearningsSection.bullets.map((bullet, index) => (
                        <article key={`${primaryLearningsSection.heading}-insight-${index}`} className="rounded-2xl border border-neutral-200 bg-devlo-50/70 p-5">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-devlo-800 ring-1 ring-neutral-200">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-6 text-neutral-800">
                              {(() => {
                                const parsed = parseBulletDisplay(bullet, "learnings");
                                if (!parsed) {
                                  return <span className="font-medium">{bullet}</span>;
                                }
                                return (
                                  <>
                                    <strong className="font-semibold text-devlo-900">{parsed.title}</strong>
                                    <br />
                                    <span>{parsed.body}</span>
                                  </>
                                );
                              })()}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              </FadeInOnScroll>
            ) : null}

            {testimonialSection ? (
              <FadeInOnScroll delay={0.24}>
                <section id={anchorIds.testimonial} className="scroll-mt-[170px] rounded-[22px] border border-devlo-100 bg-white p-7 shadow-panel md:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold tracking-tight text-devlo-900 md:text-2xl">{testimonialSection.heading}</h2>
                    {detailedStudy.clientLogoUrl ? (
                      <div className="relative hidden h-10 w-24 shrink-0 overflow-hidden rounded-md bg-white ring-1 ring-neutral-200 md:block">
                        <Image src={detailedStudy.clientLogoUrl} alt={`${detailedStudy.client} logo`} fill className="object-contain p-1.5" sizes="96px" />
                      </div>
                    ) : null}
                  </div>

                  {detailedStudy.testimonialVideo ? (
                    <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                      <WistiaThumbnailTrigger
                        videoId={detailedStudy.testimonialVideo.wistiaMediaId}
                        title={detailedStudy.testimonialVideo.title ?? `Témoignage vidéo ${detailedStudy.client}`}
                        previewSrc={detailedStudy.testimonialVideo.previewSrc}
                        previewAlt={detailedStudy.testimonialVideo.previewAlt}
                        sizes="(min-width: 1280px) 640px, (min-width: 768px) 80vw, 94vw"
                        className="bg-white"
                      />
                    </div>
                  ) : null}

                  {testimonialSection.paragraphs[0] ? (
                    <blockquote className="mt-5 rounded-2xl border border-devlo-100 bg-devlo-50/80 p-6 text-lg leading-8 text-neutral-800 md:text-xl">
                      {testimonialSection.paragraphs[0]}
                    </blockquote>
                  ) : null}

                  {testimonialSection.paragraphs[1] ? (
                    <div className="mt-4 border-t border-neutral-200 pt-4">
                      <div className="flex items-center gap-3">
                        {testimonialAvatarSrc ? (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-devlo-100">
                            <Image
                              src={testimonialAvatarSrc}
                              alt={testimonialAvatarAlt}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        ) : null}
                        <p className="text-sm font-semibold tracking-wide text-devlo-900">
                          {testimonialSection.paragraphs[1]}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </section>
              </FadeInOnScroll>
            ) : null}

            {remainingNarrativeSections.map((section, index) => (
              <FadeInOnScroll key={`${detailedStudy.slug}-extra-${section.heading}`} delay={Math.min(0.12 + index * 0.04, 0.28)}>
                <NarrativeCard section={section} compact sectionKind={classifySectionHeading(section.heading)} />
              </FadeInOnScroll>
            ))}

          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-[154px] space-y-4">
              <div className="rounded-panel border border-neutral-200 bg-white p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">Conversion</p>
                <p className="mt-2 text-sm leading-6 text-neutral-700">
                  Planifiez une rencontre pour obtenir un plan outbound adapté à votre marché et vos objectifs commerciaux.
                </p>
                <div className="mt-4 space-y-2">
                  <Link
                    href={`#${anchorIds.contactForm}`}
                    data-case-study-cta=""
                    data-case-study-cta-variant="sidebar"
                    className={buttonClassName("primary", "w-full justify-center px-4 py-2.5 text-xs")}
                  >
                    {unifiedCtaLabel}
                  </Link>
                </div>
              </div>

              <div className="rounded-panel border border-neutral-200 bg-white p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">KPIs</p>
                <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                  {detailedStudy.resultHighlights.slice(0, 4).map((line, index) => (
                    <li key={`${detailedStudy.slug}-sidebar-kpi-${index}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-devlo-700" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[110px]" id={anchorIds.contact}>
        <FadeInOnScroll>
          <div className="mx-auto max-w-[980px] rounded-[22px] border border-neutral-200 bg-white p-6 shadow-panel md:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-devlo-700">Contact</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-devlo-900 md:text-3xl">
                  Comment obtenir plus de rendez-vous : parlons-en
                </h2>
                <p className="mt-4 text-sm leading-7 text-neutral-600 md:text-base md:leading-8">
                  Partagez vos objectifs et recevez un plan outbound concret, priorisé pour votre marché.
                </p>

                <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 md:p-5">
                  <article className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-devlo-700">Résultats</h3>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-neutral-700">
                      {outcomeItems.map((outcome, index) => (
                        <li key={`${detailedStudy.slug}-outcome-${index}`} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-devlo-700" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`#${anchorIds.contactForm}`}
                    data-case-study-cta=""
                    data-case-study-cta-variant="final"
                    className={buttonClassName("primary", "px-5 py-3 text-sm")}
                  >
                    {unifiedCtaLabel}
                  </Link>
                </div>
              </div>

              <div id={anchorIds.contactForm} className="scroll-mt-[170px] rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4 md:p-5">
                <HubspotForm
                  portalId={consultationContent.hubspot.portalId}
                  formId={consultationContent.hubspot.formId}
                  region={consultationContent.hubspot.region}
                  targetId={`hubspot-case-${study.slug}`}
                />
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>
    </>
  );
}
