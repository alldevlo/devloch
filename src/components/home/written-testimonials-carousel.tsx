import Image from "next/image";

import type { WrittenTestimonial } from "@/content/masterfile.fr";

const ratingLabelByLocale = {
  fr: "5 étoiles",
  en: "5 stars",
  de: "5 Sterne",
  nl: "5 sterren",
} as const;

function TestimonialCard({
  t,
  locale,
}: {
  t: WrittenTestimonial;
  locale: "fr" | "en" | "de" | "nl";
}) {
  return (
    <article className="w-[340px] shrink-0 rounded-2xl border border-devlo-100 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-1 text-accent-gold" aria-label={ratingLabelByLocale[locale]}>
        {"★★★★★".split("").map((star, i) => (
          <span key={i}>{star}</span>
        ))}
      </div>
      <blockquote className="mt-4">
        <p className="line-clamp-5 text-sm italic leading-7 text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
        <footer className="mt-5 flex items-center gap-3">
          <Image
            src={t.photo}
            alt={t.author}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
            loading="lazy"
            sizes="44px"
            quality={74}
          />
          <cite className="not-italic">
            <p className="text-sm font-semibold text-devlo-900">{t.author}</p>
            <p className="text-xs text-neutral-600">{t.role}</p>
            <p className="text-xs font-semibold text-devlo-700">{t.company}</p>
          </cite>
        </footer>
      </blockquote>
    </article>
  );
}

export function WrittenTestimonialsCarousel({
  testimonials,
  locale = "fr",
}: {
  testimonials: WrittenTestimonial[];
  locale?: "fr" | "en" | "de" | "nl";
}) {
  const mixTestimonials = (items: WrittenTestimonial[]) => {
    if (items.length <= 2) return [...items];

    const mixed: WrittenTestimonial[] = [];
    const used = new Array(items.length).fill(false);
    const step = 3;
    let cursor = 0;

    for (let i = 0; i < items.length; i += 1) {
      while (used[cursor]) {
        cursor = (cursor + 1) % items.length;
      }

      mixed.push(items[cursor]);
      used[cursor] = true;
      cursor = (cursor + step) % items.length;
    }

    return mixed;
  };

  const groupA = mixTestimonials(testimonials).filter((_, index) => index % 2 === 0);
  const groupB = mixTestimonials(testimonials).filter((_, index) => index % 2 === 1);

  const ensureMinItems = (items: WrittenTestimonial[], minItems = 6) => {
    if (items.length === 0) return [];
    const filled = [...items];
    let cursor = 0;

    while (filled.length < minItems) {
      let attempts = 0;
      let candidate = items[cursor % items.length];

      while (
        attempts < items.length &&
        (candidate.author === filled[filled.length - 1]?.author ||
          (filled.length + 1 === minItems && candidate.author === filled[0]?.author && items.length > 1))
      ) {
        cursor += 1;
        candidate = items[cursor % items.length];
        attempts += 1;
      }

      filled.push(candidate);
      cursor += 1;
    }

    return filled;
  };

  const baseRow1 = ensureMinItems(groupA);
  const baseRow2 = ensureMinItems(groupB.length > 0 ? groupB : groupA);
  const row1 = [...baseRow1, ...baseRow1];
  const row2 = [...baseRow2, ...baseRow2];

  return (
    <div className="relative mt-10 -mx-6 overflow-hidden md:-mx-8 lg:-mx-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div className="space-y-4 py-2">
        <div className="flex min-w-max animate-testimonial-scroll items-stretch gap-4 will-change-transform">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} locale={locale} />
          ))}
        </div>
        <div className="flex min-w-max animate-testimonial-scroll-reverse items-stretch gap-4 will-change-transform">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
