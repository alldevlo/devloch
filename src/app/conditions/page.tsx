import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
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

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Conditions générales", path: "/conditions" },
];

export default function Page() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />
      <ConditionsMasterPage />
    </>
  );
}
