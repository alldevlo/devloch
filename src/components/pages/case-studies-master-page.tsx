import Image from "next/image";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WaveDivider } from "@/components/ui/wave-divider";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { caseStudiesCards, caseStudiesSeo } from "@/content/masterfile.fr";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";

type CaseStudiesMasterPageProps = {
  seo?: typeof caseStudiesSeo;
  cards?: typeof caseStudiesCards;
  locale?: SupportedLocale;
};

const copyByLocale: Record<
  SupportedLocale,
  {
    home: string;
    caseStudies: string;
    openCase: (client: string) => string;
    learnMore: string;
  }
> = {
  fr: {
    home: "Accueil",
    caseStudies: "Études de cas",
    openCase: (client) => `Ouvrir l'étude de cas ${client}`,
    learnMore: "En savoir plus →",
  },
  en: {
    home: "Home",
    caseStudies: "Case studies",
    openCase: (client) => `Open case study ${client}`,
    learnMore: "Learn more →",
  },
  de: {
    home: "Startseite",
    caseStudies: "Fallstudien",
    openCase: (client) => `Fallstudie ${client} öffnen`,
    learnMore: "Mehr erfahren →",
  },
  nl: {
    home: "Home",
    caseStudies: "Praktijkvoorbeelden",
    openCase: (client) => `Open praktijkvoorbeeld ${client}`,
    learnMore: "Meer informatie →",
  },
};

export function CaseStudiesMasterPage({
  seo = caseStudiesSeo,
  cards = caseStudiesCards,
  locale = "fr",
}: CaseStudiesMasterPageProps) {
  const copy = copyByLocale[locale];
  const breadcrumbItems = [
    { name: copy.home, path: resolvePathForLocale("/", locale).path },
    { name: copy.caseStudies, path: resolvePathForLocale("/etudes-de-cas", locale).path },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-[#074f74] to-[#0a3a54] pt-2 pb-16 text-white md:pb-20">
        <Breadcrumb items={breadcrumbItems} variant="dark" />
        <div className="mx-auto w-full max-w-screen-xl px-6 pt-8 text-center lg:px-10">
          <FadeInOnScroll>
            <h1 className="text-4xl font-extrabold leading-[1.1] md:text-5xl lg:text-[56px]">
              {seo.h1}
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <p className="mx-auto mt-5 max-w-[900px] text-lg leading-8 text-white/80">
              {seo.subtitle}
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      <WaveDivider variant="layered-bottom" fromBg="#0a3a54" toBg="#FFFFFF" />

      <SectionWrapper background="white" className="pt-12 md:pt-16">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((study, index) => (
            <FadeInOnScroll key={study.slug} delay={(index % 2) * 0.2}>
              <Link
                href={resolvePathForLocale(`/etudes-de-cas/${study.slug}`, locale).path}
                aria-label={copy.openCase(study.client)}
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
                        <div
                          className={[
                            "inline-flex items-center justify-center rounded-md shadow-sm",
                            study.largeLogo ? "h-12 px-2 md:h-14" : "h-9 px-1.5",
                          ].join(" ")}
                          style={{ backgroundColor: "#ffffff", opacity: 1 }}
                        >
                          <Image
                            src={study.logo}
                            alt={`${study.client} logo`}
                            width={260}
                            height={100}
                            className={[
                              "w-auto bg-transparent object-contain",
                              study.largeLogo ? "h-10 md:h-11" : "h-6",
                            ].join(" ")}
                            loading="lazy"
                            sizes={study.largeLogo ? "220px" : "160px"}
                            quality={74}
                          />
                        </div>
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
                      {copy.learnMore}
                    </span>
                  </div>
                </article>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
