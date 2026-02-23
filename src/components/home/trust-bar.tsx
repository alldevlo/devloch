import Image from "next/image";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { enterpriseLogos, enterpriseTitle, trustLogos, trustMetrics, trustTitle } from "@/content/home.fr";

type LogoItem = {
  name: string;
  src: string;
  alt: string;
};

function LogoRail({ logos }: { logos: LogoItem[] }) {
  const doubled = [...logos, ...logos];

  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-devlo-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-devlo-50 to-transparent" />
      <div className="flex min-w-max items-center gap-10 py-3 animate-logo-scroll group-hover:[animation-play-state:paused]">
        {doubled.map((logo, index) => (
          <Image
            key={`${logo.name}-${index}`}
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={52}
            className="h-8 w-auto shrink-0 object-contain opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0 md:h-10"
            loading="lazy"
            sizes="160px"
            quality={68}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <SectionWrapper background="light" className="py-14 md:py-20 lg:py-24">
      <FadeInOnScroll>
        <p className="text-center text-xl font-semibold text-devlo-700">{trustTitle}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1} className="mt-8">
        <LogoRail logos={trustLogos} />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.16} className="mt-10">
        <p className="text-center text-base font-semibold uppercase tracking-[0.08em] text-devlo-700">{enterpriseTitle}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2} className="mt-5">
        <LogoRail logos={enterpriseLogos} />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-neutral-200 pt-10 md:grid-cols-3 md:divide-x md:divide-neutral-200">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="md:px-4">
              <AnimatedCounter
                target={metric.target}
                prefix={metric.prefix}
                suffix={metric.suffix}
                label={metric.label}
                compactK={metric.compactK}
              />
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
