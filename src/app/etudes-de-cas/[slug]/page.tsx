import type { Metadata } from "next";

import { CaseStudyMasterPage } from "@/components/pages/case-study-master-page";
import { caseStudiesCards, caseStudiesSeo } from "@/content/masterfile.fr";
import { resolveCaseStudyCanonicalSlug } from "@/lib/case-study-slug-redirects";
import { caseStudies } from "@/lib/case-studies";

type Params = {
  params: { slug: string };
};

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const study of caseStudiesCards) slugs.add(study.slug);
  for (const study of caseStudies) slugs.add(study.slug);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const canonicalSlug = resolveCaseStudyCanonicalSlug(params.slug);
  const cardStudy = caseStudiesCards.find((item) => item.slug === params.slug) ?? caseStudiesCards.find((item) => item.slug === canonicalSlug);
  const detailedStudy = caseStudies.find((item) => item.slug === params.slug) ?? caseStudies.find((item) => item.slug === canonicalSlug);
  const study =
    cardStudy ??
    (detailedStudy
      ? {
          title: detailedStudy.title,
          metrics:
            detailedStudy.resultHighlights.length > 0
              ? detailedStudy.resultHighlights
              : detailedStudy.heroStats.map((stat) => `${stat.value} ${stat.label}`),
        }
      : null);
  if (!study) {
    return {
      title: caseStudiesSeo.title,
      description: caseStudiesSeo.description,
    };
  }

  return {
    title: study.title,
    description: study.metrics.join(" · "),
    openGraph: {
      title: study.title,
      description: study.metrics.join(" · "),
      type: "article",
      locale: "fr_CH",
      url: `https://devlo.ch/etudes-de-cas/${canonicalSlug}`,
    },
  };
}

export default function Page({ params }: Params) {
  return <CaseStudyMasterPage slug={params.slug} />;
}
