import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { conditionsContent } from "@/content/masterfile.fr";

export function ConditionsMasterPage() {
  return (
    <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
      <FadeInOnScroll>
        <h1 className="text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[56px]">
          {conditionsContent.title}
        </h1>
      </FadeInOnScroll>

      <div className="mt-10 space-y-10">
        {conditionsContent.sections.map((section, index) => (
          <FadeInOnScroll key={section.heading} delay={index * 0.1}>
            <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft md:p-8">
              <h2 className="text-2xl font-bold text-devlo-900 md:text-3xl">{section.heading}</h2>
              <p className="mt-4 text-base leading-8 text-neutral-600 md:text-lg">{section.body}</p>
            </article>
          </FadeInOnScroll>
        ))}
      </div>
    </SectionWrapper>
  );
}
