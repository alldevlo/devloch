import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyMasterPage } from "@/components/pages/case-study-master-page";
import { caseStudiesCards, caseStudiesSeo } from "@/content/masterfile.fr";
import { resolveCaseStudyCanonicalSlug } from "@/lib/case-study-slug-redirects";
import { caseStudies } from "@/lib/case-studies";
import { buildPageMetadata, resolveOgImagePath } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

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

  const title = cardStudy?.title ?? detailedStudy?.title ?? caseStudiesSeo.title.replace(/\s*\|\s*devlo$/i, "");
  const descriptionSource =
    detailedStudy?.summary ??
    (cardStudy
      ? `${cardStudy.client} — ${cardStudy.sector}. ${cardStudy.metrics.slice(0, 3).join(" · ")}.`
      : caseStudiesSeo.description);
  const description = descriptionSource.length > 160 ? `${descriptionSource.slice(0, 157).trimEnd()}...` : descriptionSource;
  const imagePath = resolveOgImagePath(cardStudy?.banner ?? detailedStudy?.heroImageUrl);

  return buildPageMetadata({
    title,
    description,
    path: `/etudes-de-cas/${canonicalSlug}`,
    type: "article",
    imagePath,
  });
}

export default function Page({ params }: Params) {
  const canonicalSlug = resolveCaseStudyCanonicalSlug(params.slug);
  const cardStudy = caseStudiesCards.find((item) => item.slug === params.slug) ?? caseStudiesCards.find((item) => item.slug === canonicalSlug);
  const detailedStudy = caseStudies.find((item) => item.slug === params.slug) ?? caseStudies.find((item) => item.slug === canonicalSlug);
  const breadcrumbLabel = cardStudy?.title ?? detailedStudy?.title ?? "Étude de cas";

  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Études de cas", path: "/etudes-de-cas" },
          { name: breadcrumbLabel, path: `/etudes-de-cas/${canonicalSlug}` },
        ])}
      />
      <CaseStudyMasterPage slug={params.slug} />
    </>
  );
}
