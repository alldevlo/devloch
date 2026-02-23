import Image from "next/image";
import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { caseStudyButton, caseStudySlides, caseStudiesTitle } from "@/content/home.fr";
import { caseStudyBySlug } from "@/lib/case-studies";

function getSlugFromHref(href: string) {
  const parts = href.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function CaseStudiesGridV2() {
  return (
    <SectionWrapper background="white" className="pt-10 md:pt-14">
      <FadeInOnScroll>
        <h2 className="h2-section text-center text-devlo-900">{caseStudiesTitle}</h2>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <p className="body-text mx-auto mt-4 max-w-3xl text-center">
          Découvrez comment nos clients développent leur pipeline commercial grâce à des campagnes outbound ciblées.
        </p>
      </FadeInOnScroll>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {caseStudySlides.slice(0, 4).map((study) => {
          const details = caseStudyBySlug[getSlugFromHref(study.href)];
          const primaryStat = details?.heroStats[0];
          const secondaryStat = details?.heroStats[1];
          const businessBenefit = details?.resultHighlights[0] ?? details?.summary;

          return (
            <FadeInOnScroll key={study.href}>
              <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <Image
                  src={study.hero}
                  alt={study.heroAlt}
                  width={1440}
                  height={860}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 92vw"
                  quality={72}
                />

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Image
                      src={study.logo}
                      alt={study.logoAlt}
                      width={180}
                      height={52}
                      className="h-7 w-auto object-contain"
                      loading="lazy"
                      sizes="140px"
                      quality={70}
                    />
                    {details?.sector ? (
                      <span className="rounded-full bg-devlo-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-devlo-700">
                        {details.sector}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-6 text-devlo-900">{study.title}</h3>

                  {(primaryStat || secondaryStat) && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {primaryStat ? (
                        <div>
                          <p className="text-2xl font-extrabold text-devlo-800">{primaryStat.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">{primaryStat.label}</p>
                        </div>
                      ) : null}
                      {secondaryStat ? (
                        <div>
                          <p className="text-2xl font-extrabold text-devlo-800">{secondaryStat.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">{secondaryStat.label}</p>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {businessBenefit ? <p className="mt-4 text-sm leading-6 text-neutral-600">{businessBenefit}</p> : null}

                  <Link
                    prefetch={false}
                    href={study.href}
                    className="mt-5 inline-flex items-center text-sm font-semibold text-devlo-700 transition group-hover:translate-x-1"
                  >
                    Lire le cas →
                  </Link>
                </div>
              </article>
            </FadeInOnScroll>
          );
        })}
      </div>

      <FadeInOnScroll delay={0.2}>
        <div className="mt-10 text-center">
          <Link
            prefetch={false}
            href={caseStudyButton.href}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-devlo-900 transition hover:border-devlo-700 hover:text-devlo-700"
          >
            {caseStudyButton.label}
          </Link>
        </div>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
