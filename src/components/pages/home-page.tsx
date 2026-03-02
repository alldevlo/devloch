import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  Database,
  Gauge,
  Globe,
  Handshake,
  Languages,
  LayoutTemplate,
  PenTool,
  PiggyBank,
  Rocket,
  Send,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

import { CaseStudiesCarousel } from "@/components/home/case-studies-carousel";
import { WrittenTestimonialsCarousel } from "@/components/home/written-testimonials-carousel";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AccordionSingle } from "@/components/ui/accordion-single";
import { buttonClassName } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { WaveDivider } from "@/components/ui/wave-divider";
import { WistiaThumbnailTrigger } from "@/components/ui/wistia-thumbnail-trigger";
import { caseStudiesCards, homeContent } from "@/content/masterfile.fr";

const noRecruitIcons = [Target, PiggyBank, Rocket] as const;
const whyIcons = [
  LayoutTemplate,
  Zap,
  Gauge,
  PiggyBank,
  Rocket,
  Handshake,
  Languages,
  ShieldCheck,
] as const;
const methodIconMap = {
  Target,
  PenTool,
  LayoutTemplate,
  Database,
  Send,
  CalendarCheck,
} as const;

const logoScaleClassByAlt: Record<string, string> = {
  Apple: "scale-[0.82]",
  BCF: "scale-[0.82]",
  BHP: "scale-[0.82]",
  ADM: "scale-[1.12]",
};

const railLogoSizesByAlt: Record<string, string> = {
  Apple: "(max-width: 768px) 72px, 80px",
  BCF: "(max-width: 768px) 72px, 80px",
  BHP: "(max-width: 768px) 72px, 80px",
  ADM: "(max-width: 768px) 88px, 96px",
  UEFA: "(max-width: 768px) 72px, 80px",
};

const defaultRailLogoSizes = "(max-width: 768px) 120px, 160px";

function InfiniteLogoRail({
  logos,
  pauseOnHover = false,
  reverse = false,
  duration = "normal",
}: {
  logos: { src: string; alt: string }[];
  pauseOnHover?: boolean;
  reverse?: boolean;
  duration?: "normal" | "slow";
}) {
  const doubled = [...logos, ...logos];
  const animClass = duration === "slow"
    ? (reverse ? "animate-logo-scroll-slow-reverse" : "animate-logo-scroll-slow")
    : (reverse ? "animate-logo-scroll-reverse" : "animate-logo-scroll");

  return (
    <div className="group py-1">
      <div
        className={[
          "flex min-w-max items-center will-change-transform",
          animClass,
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {doubled.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex h-11 w-[170px] shrink-0 items-center justify-center px-5"
          >
            <div
              className={["relative h-10 w-full overflow-hidden", logoScaleClassByAlt[logo.alt] ?? ""].join(" ").trim()}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain opacity-70 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
                sizes={railLogoSizesByAlt[logo.alt] ?? defaultRailLogoSizes}
                quality={72}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientsRailRow({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const logos = names.map((name) => ({ src: `/images/${name}`, alt: name.replace(/\.[a-z0-9]+$/i, "") }));
  return <InfiniteLogoRail logos={logos} pauseOnHover reverse={reverse} duration="slow" />;
}

export function HomePage() {
  const noRecruitCards = homeContent.noRecruitCards;
  const methodSteps = homeContent.methodSteps;
  const whyCards = homeContent.whyCards;
  const writtenTestimonials = homeContent.writtenTestimonials;
  const rendezVousRowCount = 3;
  const rendezVousPerRow = Math.ceil(homeContent.rendezVousLogos.length / rendezVousRowCount);
  const rendezVousRows = Array.from({ length: rendezVousRowCount }, (_, index) =>
    homeContent.rendezVousLogos.slice(index * rendezVousPerRow, (index + 1) * rendezVousPerRow),
  ).filter((row) => row.length > 0);

  return (
    <>
      <section className="bg-white pb-10 pt-12 md:pt-20 lg:pt-24">
        <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-12">
          <div>
            <FadeInOnScroll eager>
              <p className="inline-flex items-center gap-2 rounded-full bg-devlo-100 px-4 py-1.5 text-sm font-semibold text-devlo-700">
                {homeContent.hero.badge}
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1} eager>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-devlo-900 md:text-5xl lg:text-[56px]">
                {homeContent.hero.h1}
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2} eager>
              <h2 className="mt-5 text-xl font-semibold leading-relaxed text-devlo-700 md:text-2xl">{homeContent.hero.h2}</h2>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3} eager>
              <p className="mt-4 text-lg leading-relaxed text-neutral-600">{homeContent.hero.paragraph}</p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.4} eager>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href={homeContent.hero.ctaPrimary.href} className={buttonClassName("primary", "px-8 py-4 text-base")}> 
                  {homeContent.hero.ctaPrimary.label}
                </Link>
                <Link href={homeContent.hero.ctaSecondary.href} className={buttonClassName("secondary", "px-8 py-4 text-base")}>
                  {homeContent.hero.ctaSecondary.label}
                </Link>
                <Link href={homeContent.hero.ctaServices.href} className={buttonClassName("secondary", "px-8 py-4 text-base")}>
                  {homeContent.hero.ctaServices.label}
                </Link>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.5} eager>
              <p className="mt-5 text-sm font-semibold text-neutral-600">{homeContent.hero.microProof}</p>
            </FadeInOnScroll>
          </div>

          <FadeInOnScroll delay={0.2} direction="right" eager>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-panel">
              <WistiaThumbnailTrigger
                videoId={homeContent.hero.wistiaMediaId}
                title={homeContent.hero.h1}
                previewSrc={homeContent.hero.posterSrc}
                previewAlt={homeContent.hero.posterAlt}
                priority
                sizes="(min-width: 1024px) 46vw, (min-width: 768px) 88vw, 100vw"
                className="bg-white"
              />
            </div>
            <Link
              href={homeContent.hero.videoTestimonial.href}
              className="mt-4 block rounded-xl border border-neutral-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-panel"
            >
              <p className="text-sm font-semibold text-devlo-900">{homeContent.hero.videoTestimonial.line}</p>
              <p className="mt-2 text-sm font-semibold text-devlo-900">{homeContent.hero.videoTestimonial.client}</p>
              <p className="mt-1 text-sm text-neutral-600">
                {homeContent.hero.videoTestimonial.role}, {homeContent.hero.videoTestimonial.company}
              </p>
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.rendezVousTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <div className="relative mt-10 -mx-6 space-y-4 overflow-hidden md:-mx-12 lg:-mx-16">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
            {rendezVousRows.map((logos, index) => (
              <InfiniteLogoRail key={`rendez-vous-row-${index}`} logos={logos} reverse={index % 2 === 1} duration="slow" />
            ))}
          </div>
        </FadeInOnScroll>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.videoTestimonials.title}</h2>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homeContent.videoTestimonials.items.map((item, index) => (
            <FadeInOnScroll key={item.title} delay={index * 0.2}>
              <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <WistiaThumbnailTrigger
                  videoId={item.wistiaMediaId}
                  title={item.title}
                  previewSrc={item.posterSrc}
                  previewAlt={item.posterAlt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  className="bg-white"
                />
                <div className="space-y-2 p-5">
                  <h3 className="text-xl font-semibold text-devlo-900">{item.title}</h3>
                  <div className="flex items-center gap-3">
                    {item.photo ? (
                      <Image
                        src={item.photo}
                        alt={item.client}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                        loading="lazy"
                        sizes="40px"
                      />
                    ) : null}
                    <div>
                      <p className="text-sm font-semibold text-devlo-900">{item.client}</p>
                      <p className="text-xs text-neutral-600">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-neutral-600">{item.metric}</p>
                  <Link href={item.href} className="inline-flex text-sm font-semibold text-devlo-700 hover:text-devlo-900">
                    {item.linkLabel}
                  </Link>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.clientsTitle}</h2>
        </FadeInOnScroll>

        <div className="relative mt-10 -mx-6 space-y-4 overflow-hidden md:-mx-12 lg:-mx-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8vw] bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8vw] bg-gradient-to-l from-white to-transparent" />
          <ClientsRailRow names={homeContent.clientsLogos.slice(0, 8)} />
          <ClientsRailRow names={homeContent.clientsLogos.slice(8, 15)} reverse />
          <ClientsRailRow names={homeContent.clientsLogos.slice(15)} />
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.noRecruitTitle}</h2>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {noRecruitCards.map((card, index) => {
            const Icon = noRecruitIcons[index] ?? Target;
            return (
              <FadeInOnScroll key={card.title} delay={index * 0.2}>
                <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                  <Icon className="h-8 w-8 text-devlo-700" aria-hidden />
                  <h3 className="mt-4 text-2xl font-semibold text-devlo-900">{card.title}</h3>
                  <p className="mt-3 text-base leading-7 text-neutral-600">{card.text}</p>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">Nos études de cas</h2>
        </FadeInOnScroll>
        <CaseStudiesCarousel cards={caseStudiesCards} />
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.methodTitle}</h2>
        </FadeInOnScroll>

        <div className="mx-auto mt-10 max-w-[980px] space-y-3">
          {methodSteps.map((step, index) => {
            const Icon = methodIconMap[step.icon];
            return (
              <FadeInOnScroll key={step.title} delay={index * 0.1}>
                <article className="relative rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-soft">
                  {index < methodSteps.length - 1 ? (
                    <div className="absolute left-[23px] top-[46px] h-[calc(100%+12px)] border-l-2 border-dashed border-devlo-100" />
                  ) : null}
                  <div className="flex items-start gap-4">
                    <div className="relative z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-devlo-800 text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-devlo-700" aria-hidden />
                        <h3 className="text-xl font-semibold text-devlo-900">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{step.text}</p>
                    </div>
                  </div>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper background="light" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.whyTitle}</h2>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {whyCards.map((card, index) => {
            const Icon = whyIcons[index] ?? Globe;
            return (
              <FadeInOnScroll key={card.title} delay={(index % 4) * 0.15}>
                <article className="h-full rounded-2xl border border-devlo-100 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                  <Icon className="h-6 w-6 text-devlo-700" aria-hidden />
                  <h3 className="mt-3 text-xl font-semibold text-devlo-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{card.text}</p>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.writtenTitle}</h2>
        </FadeInOnScroll>
        <WrittenTestimonialsCarousel testimonials={writtenTestimonials} />
      </SectionWrapper>

      <WaveDivider variant="layered-top" />
      <SectionWrapper background="dark" className="py-[80px] text-white md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] md:text-4xl">{homeContent.ctaMid.title}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <p className="mx-auto mt-4 max-w-[920px] text-center text-lg leading-8 text-white/90">{homeContent.ctaMid.text}</p>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.3}>
          <h3 className="mt-8 text-center text-2xl font-semibold md:text-3xl">{homeContent.ctaMid.h3}</h3>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.4}>
          <p className="mx-auto mt-3 max-w-[900px] text-center text-base leading-7 text-white/90 md:text-lg">{homeContent.ctaMid.h3Text}</p>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.5}>
          <div className="mt-8 text-center">
            <Link href={homeContent.ctaMid.cta.href} className={buttonClassName("secondary", "bg-white px-8 py-4 text-base text-devlo-900 hover:text-devlo-900")}>
              {homeContent.ctaMid.cta.label}
            </Link>
          </div>
        </FadeInOnScroll>
      </SectionWrapper>
      <WaveDivider variant="layered-bottom" />

      <SectionWrapper background="white" className="py-[80px] md:py-[120px]">
        <FadeInOnScroll>
          <h2 className="text-center text-3xl font-bold leading-[1.2] text-devlo-900 md:text-4xl">{homeContent.faqTitle}</h2>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.15}>
          <p className="mx-auto mt-4 max-w-[820px] text-center text-base leading-7 text-neutral-600 md:text-lg">
            {homeContent.faqCtaText}
          </p>
        </FadeInOnScroll>
        <div className="mx-auto mt-10 max-w-[980px]">
          <AccordionSingle items={homeContent.faqs} defaultOpenIndex={-1} />
        </div>
      </SectionWrapper>
    </>
  );
}
