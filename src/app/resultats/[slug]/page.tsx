import { permanentRedirect } from "next/navigation";

import { caseStudiesCards } from "@/content/masterfile.fr";
import { caseStudies } from "@/lib/case-studies";
import { caseStudySlugRedirects, resolveCaseStudyCanonicalSlug } from "@/lib/case-study-slug-redirects";

type Params = {
  params: { slug: string };
};

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const slug of Object.keys(caseStudySlugRedirects)) slugs.add(slug);
  for (const study of caseStudiesCards) slugs.add(study.slug);
  for (const study of caseStudies) slugs.add(study.slug);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default function Page({ params }: Params) {
  const canonicalSlug = resolveCaseStudyCanonicalSlug(params.slug);
  const exists = caseStudiesCards.some((study) => study.slug === canonicalSlug) || caseStudies.some((study) => study.slug === canonicalSlug);

  if (!exists) {
    permanentRedirect("/etudes-de-cas");
  }

  permanentRedirect(`/etudes-de-cas/${canonicalSlug}`);
}
