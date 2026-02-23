import Image from "next/image";
import { Star } from "lucide-react";

import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { WistiaLite } from "@/components/ui/wistia-lite";
import { proofVideoId, testimonials } from "@/content/home.fr";

export function TestimonialsCarousel() {
  return (
    <SectionWrapper background="white" className="pt-10 md:pt-16">
      <FadeInOnScroll>
        <WistiaLite
          videoId={proofVideoId}
          title="Étude de cas vidéo"
          previewSrc="/images/home/academy/careerlunch-banner.jpg"
          previewAlt="Capture vidéo d'étude de cas"
        />
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.15}>
        <h2 className="h2-section mt-14 text-center text-devlo-900">Ce que disent nos clients</h2>
      </FadeInOnScroll>

      <div className="mt-8 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex snap-x snap-mandatory gap-5">
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.image}-${index}`}
              className="min-w-[90%] snap-start rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-panel md:min-w-[48%] lg:min-w-[32%]"
            >
              <div className="flex items-center gap-1 text-accent-gold">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral-700 md:text-base">{testimonial.content}</p>

              <div className="my-5 h-px w-12 bg-devlo-100" />

              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.imageAlt}
                  width={72}
                  height={72}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                  sizes="48px"
                  quality={74}
                />
                <div>
                  <p className="text-sm font-semibold text-devlo-900">{testimonial.imageAlt}</p>
                  {testimonial.author ? <p className="text-xs text-neutral-600">{testimonial.author}</p> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
