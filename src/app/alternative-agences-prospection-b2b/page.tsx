import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AlternativePage } from "@/components/pages/alternative-page";
import { ALTERNATIVE_PAGES } from "@/content/alternatives";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";

const data = ALTERNATIVE_PAGES["alternative-agences-prospection-b2b"];

export const metadata: Metadata = buildPageMetadata({
  title: data.metaTitle.replace(/\s*\|\s*devlo$/, ""),
  description: data.metaDescription,
  path: `/${data.slug}`,
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Comparatif agences B2B", path: `/${data.slug}` },
          ]),
          buildFaqPageSchema(data.faqs),
        ]}
      />
      <AlternativePage data={data} />
    </>
  );
}
