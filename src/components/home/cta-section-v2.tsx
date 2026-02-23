import Link from "next/link";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { buttonClassName } from "@/components/ui/button";
import { finalCtas } from "@/content/home.fr";

export function CtaSectionV2() {
  return (
    <SectionWrapper background="dark" className="py-14 md:py-20">
      <FadeInOnScroll>
        <h2 className="h2-section text-center text-white">{finalCtas.firstTitle}</h2>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.1}>
        <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-8 text-white/85 md:text-lg">{finalCtas.firstBody}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <h3 className="mt-8 text-center text-2xl font-bold text-white md:text-3xl">{finalCtas.secondTitle}</h3>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.25}>
        <p className="mt-2 text-center text-base font-medium text-white/85 md:text-lg">{finalCtas.secondSubtitle}</p>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3}>
        <div className="mt-6 text-center">
          <Link
            prefetch={false}
            href={finalCtas.secondButton.href}
            className={buttonClassName("secondary", "bg-white px-7 py-4 text-base text-devlo-900 hover:text-devlo-900")}
          >
            {finalCtas.secondButton.label}
          </Link>
        </div>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
