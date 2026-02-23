import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AccordionSingle } from "@/components/ui/accordion-single";
import { buttonClassName } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { WistiaPlayer } from "@/components/ui/wistia-player";
import { academyContent, homeContent } from "@/content/masterfile.fr";

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
            sizes="200px"
            quality={72}
          />
        ))}
      </div>
    </div>
  );
}

export function AcademyMasterPage() {
  return (
    <>
      <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
        <FadeInOnScroll>
          <h1 className="text-center text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[56px]">
            {academyContent.h1}
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h2 className="mx-auto mt-5 max-w-[980px] text-center text-2xl font-semibold leading-relaxed text-devlo-700 md:text-3xl">
            {academyContent.h2}
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="mx-auto mt-8 max-w-[980px] overflow-hidden rounded-2xl border border-neutral-200 shadow-soft">
            <WistiaPlayer mediaId={academyContent.video1} className="bg-white" />
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <div className="mt-7 text-center">
            <Link href={academyContent.ctaFreeChapter.href} target="_blank" rel="noreferrer" className={buttonClassName("primary", "px-8 py-4 text-base")}>
              {academyContent.ctaFreeChapter.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.h2Second}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-[940px] text-center text-xl font-semibold leading-relaxed text-devlo-700 md:text-2xl">{academyContent.h3Second}</h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mx-auto mt-8 max-w-[980px] overflow-hidden rounded-2xl border border-neutral-200 shadow-soft">
            <WistiaPlayer mediaId={academyContent.video2} className="bg-white" />
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.h2Third}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-[900px] text-center text-xl font-semibold leading-relaxed text-devlo-700 md:text-2xl">{academyContent.h3Third}</h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mt-7 text-center">
            <Link href={academyContent.ctaPlatform.href} target="_blank" rel="noreferrer" className={buttonClassName("primary", "px-8 py-4 text-base")}>
              {academyContent.ctaPlatform.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.logosTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1} className="mt-10">
          <LogosRail names={homeContent.clientsLogos} />
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.testimonialsTitle}</h2>
        </FadeInOnScroll>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {academyContent.testimonials.map((item, index) => (
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
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.learnTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="mx-auto mt-4 max-w-[960px] text-center text-lg leading-8 text-neutral-600">{academyContent.learnText}</p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <h2 className="mt-10 text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.includedTitle}</h2>
        </FadeInOnScroll>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {academyContent.includedCards.map((card, index) => (
            <FadeInOnScroll key={card.title} delay={(index % 2) * 0.2}>
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <h3 className="text-2xl font-semibold text-devlo-900">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-neutral-600">{card.text}</p>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{academyContent.faqTitle}</h2>
        </FadeInOnScroll>
        <div className="mx-auto mt-10 max-w-[980px]">
          <AccordionSingle items={academyContent.faqs} />
        </div>
      </SectionWrapper>

      <SectionWrapper background="dark" className="py-[80px] text-white md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] md:text-4xl">{academyContent.finalCta.h2}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <h3 className="mx-auto mt-5 max-w-[980px] text-center text-xl font-semibold leading-relaxed text-white/90 md:text-2xl">
            {academyContent.finalCta.h3}
          </h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mt-8 text-center">
            <Link href={academyContent.finalCta.cta.href} target="_blank" rel="noreferrer" className={buttonClassName("secondary", "bg-white px-8 py-4 text-base text-devlo-900 hover:text-devlo-900")}>
              {academyContent.finalCta.cta.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>
    </>
  );
}
