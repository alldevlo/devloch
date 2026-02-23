import Link from "next/link";

import { WistiaLite } from "@/components/ui/wistia-lite";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { buttonClassName } from "@/components/ui/button";
import { heroContent } from "@/content/home.fr";

export function HeroSectionV2() {
  return (
    <section className="bg-white pb-10 pt-24 md:pb-14 md:pt-28 lg:pt-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div>
          <FadeInOnScroll>
            <p className="inline-flex items-center gap-2 rounded-full bg-devlo-100 px-4 py-1.5 text-sm font-medium text-devlo-700">
              <span aria-hidden>🇨🇭</span>
              <span>{heroContent.badgeText}</span>
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <h1 className="h1-hero mt-5 max-w-2xl text-devlo-900">{heroContent.title}</h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <h2 className="mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-devlo-700 md:text-xl">{heroContent.subtitle}</h2>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.25}>
            <p className="body-text mt-4 max-w-xl">{heroContent.body}</p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <p className="mt-4 text-sm font-medium text-neutral-600">{heroContent.microProof}</p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.35}>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link prefetch={false} href={heroContent.cta.href} className={buttonClassName("primary", "px-7 py-4 text-base")}> 
                {heroContent.cta.label}
              </Link>
              <Link
                prefetch={false}
                href={heroContent.secondaryCta.href}
                className={buttonClassName("secondary", "px-7 py-4 text-base")}
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>
          </FadeInOnScroll>
        </div>

        <FadeInOnScroll delay={0.2} direction="right">
          <div className="rounded-2xl ring-1 ring-neutral-200">
            <WistiaLite
              videoId={heroContent.videoId}
              title="Présentation devlo"
              previewSrc="/images/home/academy/web-showcase.jpg"
              previewAlt="Présentation vidéo de l'agence devlo"
              priority
            />
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
