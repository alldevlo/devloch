import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { buttonClassName } from "@/components/ui/button";
import { agencyMethodsCta, objectifOffre, objectifOffreToggles } from "@/content/home.fr";

function ToggleList({ items }: { items: { title: string; content: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.title} className="group rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-devlo-900 md:text-base">
            <span>{item.title}</span>
            <span className="text-lg leading-none text-neutral-500 transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm leading-7 text-neutral-600">{item.content}</p>
        </details>
      ))}
    </div>
  );
}

export function ServicesCards() {
  return (
    <SectionWrapper id="Objectif" background="white" className="pt-14 md:pt-20">
      <div className="grid gap-6 md:grid-cols-2">
        <FadeInOnScroll>
          <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
            <p className="label text-devlo-700">Notre objectif</p>
            <h2 className="h3-card mt-3 text-devlo-900">{objectifOffre.objectifTitle}</h2>
            <p className="body-text mt-4">{objectifOffre.objectifBody}</p>
            <p className="body-text mt-3">{objectifOffre.objectifBodyTwo}</p>
          </article>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
            <p className="label text-devlo-700">Notre offre</p>
            <h2 className="h3-card mt-3 text-devlo-900">{objectifOffre.offreTitle}</h2>
            <p className="body-text mt-4">{objectifOffre.offreBody}</p>
          </article>
        </FadeInOnScroll>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <FadeInOnScroll>
          <ToggleList items={objectifOffreToggles.slice(0, 4)} />
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <ToggleList items={objectifOffreToggles.slice(4)} />
        </FadeInOnScroll>
      </div>

      <FadeInOnScroll delay={0.2}>
        <article className="mt-10 rounded-2xl bg-devlo-800 px-6 py-10 text-center text-white md:px-10">
          <h3 className="h3-card text-white">{agencyMethodsCta.title}</h3>
          <p className="mt-3 text-base text-white/90 md:text-lg">{agencyMethodsCta.subtitle}</p>
          <Link prefetch={false} href={agencyMethodsCta.cta.href} className={buttonClassName("secondary", "mt-6 bg-white px-7 text-devlo-900 hover:text-devlo-900")}> 
            {agencyMethodsCta.cta.label}
          </Link>
        </article>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
