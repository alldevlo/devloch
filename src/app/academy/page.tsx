import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { academyContent, academySeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";

const academyTitle = academySeo.title.replace(/\s*\|\s*devlo$/i, "");

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Outbound Academy", path: "/academy" },
];

export const metadata: Metadata = buildPageMetadata({
  title: academyTitle,
  description: academySeo.description,
  path: "/academy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqPageSchema(academyContent.faqs),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />
      <AcademyMasterPage />
    </>
  );
}
