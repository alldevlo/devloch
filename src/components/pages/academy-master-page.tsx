import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { buttonClassName } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { WistiaPlayer } from "@/components/ui/wistia-player";
import { academyContent, homeContent } from "@/content/masterfile.fr";

const DeferredAccordionSingle = dynamic(
  () => import("@/components/ui/accordion-single").then((module) => module.AccordionSingle),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <div className="h-16 rounded-xl border border-neutral-200 bg-white/80" />
        <div className="h-16 rounded-xl border border-neutral-200 bg-white/80" />
        <div className="h-16 rounded-xl border border-neutral-200 bg-white/80" />
      </div>
    ),
  },
);

function LogosRail({ names }: { names: string[] }) {
  const doubled = [...names, ...names];
  return (
    <div className="group relative overflow-hidden py-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-devlo-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-devlo-50 to-transparent" />
      <div className="flex min-w-max items-center gap-10 animate-logo-scroll group-hover:[animation-play-state:paused]">
        {doubled.map((name, index) => (
          <Image
            key={`${name}-${index}`}
            src={`/images/${name}`}
            alt={name.replace(/\.[a-z0-9]+$/i, "")}
            width={200}
            height={60}
            className="h-10 w-auto shrink-0 object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
            loading="lazy"
            sizes="(max-width: 768px) 120px, 160px"
            quality={72}
          />
        ))}
      </div>
    </div>
  );
}

type AcademyMasterPageProps = {
  content?: typeof academyContent;
  sharedHomeContent?: typeof homeContent;
};

export function AcademyMasterPage({
  content = academyContent,
  sharedHomeContent = homeContent,
}: AcademyMasterPageProps) {
  return (
    <>
      <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
        <FadeInOnScroll>
          <h1 className="text-center text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[56px]">
            {content.h1}
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h2 className="mx-auto mt-5 max-w-[980px] text-center text-2xl font-semibold leading-relaxed text-devlo-700 md:text-3xl">
            {content.h2}
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="mx-auto mt-8 max-w-[980px] overflow-hidden rounded-2xl border border-neutral-200 shadow-soft">
            <WistiaPlayer mediaId={content.video1} className="bg-white" />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <div className="mt-7 text-center">
            <Link href={content.ctaFreeChapter.href} target="_blank" rel="noreferrer" className={buttonClassName("primary", "px-8 py-4 text-base")}>
              {content.ctaFreeChapter.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[100px]">
        <div className="mx-auto max-w-[720px] text-center">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.whyTraining.title}</h2>
          </FadeInOnScroll>
          <div className="mt-6 space-y-5">
            {content.whyTraining.paragraphs.map((p, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <p className="text-lg leading-8 text-neutral-600">{p}</p>
              </FadeInOnScroll>
            ))}
          </div>
          <FadeInOnScroll delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={content.whyTraining.cta1.href} target="_blank" rel="noreferrer" className={buttonClassName("primary", "px-8 py-4 text-base")}>
                {content.whyTraining.cta1.label}
              </Link>
              <Link href={content.whyTraining.cta2.href} className={buttonClassName("outline", "px-8 py-4 text-base")}>
                {content.whyTraining.cta2.label}
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.h2Second}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-[940px] text-center text-xl font-semibold leading-relaxed text-devlo-700 md:text-2xl">{content.h3Second}</h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mx-auto mt-8 max-w-[980px] overflow-hidden rounded-2xl border border-neutral-200 shadow-soft">
            <WistiaPlayer mediaId={content.video2} className="bg-white" />
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.h2Third}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-[900px] text-center text-xl font-semibold leading-relaxed text-devlo-700 md:text-2xl">{content.h3Third}</h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mt-7 text-center">
            <Link href={content.ctaPlatform.href} target="_blank" rel="noreferrer" className={buttonClassName("primary", "px-8 py-4 text-base")}>
              {content.ctaPlatform.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.logosTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1} className="mt-10">
          <LogosRail names={sharedHomeContent.clientsLogos} />
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.testimonialsTitle}</h2>
        </FadeInOnScroll>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.testimonials.map((item, index) => (
            <FadeInOnScroll key={`${item.author}-${index}`} delay={index * 0.2}>
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
                <p className="text-base italic leading-8 text-neutral-600">“{item.quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={item.photo}
                    alt={item.author}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                    loading="lazy"
                    sizes="64px"
                    quality={74}
                  />
                  <div>
                    <p className="text-base font-semibold text-devlo-900">{item.author}</p>
                    <p className="text-sm text-neutral-600">{item.role}</p>
                    <p className="text-sm font-semibold text-devlo-700">{item.company}</p>
                  </div>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.chaptersTitle}</h2>
        </FadeInOnScroll>
        <div className="mx-auto mt-10 max-w-[860px] space-y-4">
          {content.chapters.map((chapter, index) => (
            <FadeInOnScroll key={chapter.number} delay={index * 0.07}>
              <article className="flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-devlo-700 text-sm font-bold text-white">
                  {chapter.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-devlo-900">{chapter.title}</h3>
                  <p className="mt-1.5 text-base leading-7 text-neutral-600">{chapter.description}</p>
                  <Link href={chapter.link.href} className="mt-3 inline-flex text-sm font-semibold text-devlo-700 hover:underline">
                    {chapter.link.label} →
                  </Link>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.learnTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="mx-auto mt-4 max-w-[960px] text-center text-lg leading-8 text-neutral-600">{content.learnText}</p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <h2 className="mt-10 text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.includedTitle}</h2>
        </FadeInOnScroll>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {content.includedCards.map((card, index) => (
            <FadeInOnScroll key={card.title} delay={(index % 2) * 0.2}>
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <h3 className="text-2xl font-semibold text-devlo-900">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-neutral-600">{card.text}</p>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.personas.title}</h2>
        </FadeInOnScroll>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {content.personas.items.map((persona, index) => (
            <FadeInOnScroll key={persona.title} delay={(index % 2) * 0.15}>
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <span className="text-3xl">{persona.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-devlo-900">{persona.title}</h3>
                <p className="mt-2 text-base leading-7 text-neutral-600">{persona.description}</p>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
        <FadeInOnScroll delay={0.3}>
          <p className="mt-6 text-center text-sm text-neutral-500">{content.personas.note}</p>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="dark" className="py-[80px] text-white md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] md:text-4xl">{content.finalCta.h2}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-5 max-w-[980px] text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl">
            {content.finalCta.h3}
          </h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mt-8 text-center">
            <Link href={content.finalCta.cta.href} target="_blank" rel="noreferrer" className={buttonClassName("secondary", "bg-white px-8 py-4 text-base text-devlo-900 hover:text-devlo-900")}>
              {content.finalCta.cta.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{content.faqTitle}</h2>
        </FadeInOnScroll>
        <div className="mx-auto mt-10 max-w-[980px]">
          <DeferredAccordionSingle items={content.faqs} />
        </div>
      </SectionWrapper>
    </>
  );
}
