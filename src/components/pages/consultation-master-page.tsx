import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { HubspotForm } from "@/components/ui/hubspot-form";
import { consultationContent } from "@/content/masterfile.fr";

export function ConsultationMasterPage() {
  return (
    <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
      <FadeInOnScroll>
        <h1 className="text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[56px]">
          {consultationContent.h1}
        </h1>
      </FadeInOnScroll>

      <div className="mt-8 max-w-[980px] space-y-4 text-lg leading-8 text-neutral-600">
        {consultationContent.text.map((line) => (
          <FadeInOnScroll key={line}>
            <p>{line}</p>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll delay={0.1}>
        <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-8 text-neutral-600 marker:text-devlo-700">
          {consultationContent.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </FadeInOnScroll>

      <div className="mt-6 max-w-[980px] space-y-4 text-lg leading-8 text-neutral-600">
        {consultationContent.closing.map((line, index) => (
          <FadeInOnScroll key={line} delay={0.2 + index * 0.1}>
            <p>{line}</p>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll delay={0.4}>
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft md:p-8">
          <HubspotForm
            portalId={consultationContent.hubspot.portalId}
            formId={consultationContent.hubspot.formId}
            region={consultationContent.hubspot.region}
            targetId="hubspot-consultation"
          />
        </div>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
