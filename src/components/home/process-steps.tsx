import { CalendarCheck2, PenTool, Rocket, Target } from "lucide-react";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { processMacroSteps } from "@/content/home.fr";

const iconMap = {
  target: Target,
  pen: PenTool,
  rocket: Rocket,
  calendar: CalendarCheck2,
};

export function ProcessSteps() {
  return (
    <SectionWrapper id="Processus" background="white">
      <FadeInOnScroll>
        <h2 className="h2-section text-center text-devlo-900">Comment nous générons vos rendez-vous</h2>
      </FadeInOnScroll>
      <FadeInOnScroll delay={0.1}>
        <p className="body-text mx-auto mt-4 max-w-3xl text-center">
          Un processus éprouvé en 4 étapes pour remplir vos calendriers.
        </p>
      </FadeInOnScroll>

      <div className="relative mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden border-t-2 border-dashed border-neutral-200 lg:block" />
        {processMacroSteps.map((step, index) => {
          const Icon = iconMap[step.icon];

          return (
            <FadeInOnScroll key={step.title} delay={index * 0.1}>
              <article className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-panel">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-devlo-800 text-lg font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <Icon className="mt-4 h-8 w-8 text-devlo-600" aria-hidden />
                <h3 className="h3-card mt-4 text-devlo-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{step.content}</p>
              </article>
            </FadeInOnScroll>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
