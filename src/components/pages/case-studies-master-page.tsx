import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { caseStudiesCards, caseStudiesSeo } from "@/content/masterfile.fr";

export function CaseStudiesMasterPage() {
  return (
    <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
      <FadeInOnScroll>
        <h1 className="text-center text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[56px]">
          {caseStudiesSeo.h1}
        </h1>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <p className="mx-auto mt-5 max-w-[900px] text-center text-lg leading-8 text-neutral-600">
          {caseStudiesSeo.subtitle}
        </p>
      </FadeInOnScroll>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {caseStudiesCards.map((study, index) => (
          <FadeInOnScroll key={study.slug} delay={(index % 2) * 0.2}>
            <Link
              href={`/etudes-de-cas/${study.slug}`}
              aria-label={`Ouvrir l'étude de cas ${study.client}`}
              className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2"
            >
              <article>
                <div className="relative">
                  <Image
                    src={study.banner}
                    alt={study.client}
                    width={1600}
                    height={900}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                    sizes="(min-width: 768px) 46vw, 100vw"
                    quality={76}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute left-4 top-4">
                    {study.logo ? (
                      <Image
                        src={study.logo}
                        alt={`${study.client} logo`}
                        width={260}
                        height={100}
                        className={[
                          "w-auto rounded-md bg-[#ffffff] object-contain shadow-sm",
                          study.largeLogo ? "h-12 p-2 md:h-14" : "h-9 p-1.5",
                        ].join(" ")}
                        loading="lazy"
                        sizes={study.largeLogo ? "220px" : "160px"}
                        quality={74}
                      />
                    ) : null}
                  </div>
                  <h2 className="absolute bottom-4 left-4 right-4 text-lg font-semibold leading-6 text-white md:text-xl">{study.title}</h2>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {study.metrics.map((metric) => (
                      <span key={`${study.slug}-${metric}`} className="rounded-full bg-devlo-100 px-3 py-1 text-xs font-semibold text-devlo-700">
                        {metric}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-medium text-neutral-600">{study.sector}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-devlo-700 transition group-hover:text-devlo-900">
                    En savoir plus →
                  </span>
                </div>
              </article>
            </Link>
          </FadeInOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
