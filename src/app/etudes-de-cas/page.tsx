import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudiesMasterPage } from "@/components/pages/case-studies-master-page";
import { caseStudiesSeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

const caseStudiesTitle = caseStudiesSeo.title.replace(/\s*\|\s*devlo$/i, "");

export const metadata: Metadata = buildPageMetadata({
  title: caseStudiesTitle,
  description: caseStudiesSeo.description,
  path: "/etudes-de-cas",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Études de cas", path: "/etudes-de-cas" },
        ])}
      />
      <CaseStudiesMasterPage />
    </>
  );
}
