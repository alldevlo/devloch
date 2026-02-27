import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ConditionsMasterPage } from "@/components/pages/conditions-master-page";
import { conditionsSeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

const conditionsTitle = conditionsSeo.title.replace(/\s*\|\s*devlo$/i, "");

export const metadata: Metadata = buildPageMetadata({
  title: conditionsTitle,
  description: conditionsSeo.description,
  path: "/conditions",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Conditions générales", path: "/conditions" },
        ])}
      />
      <ConditionsMasterPage />
    </>
  );
}
