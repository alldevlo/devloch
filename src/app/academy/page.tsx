import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { academyContent, academySeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";

const academyTitle = academySeo.title.replace(/\s*\|\s*devlo$/i, "");

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
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Outbound Academy", path: "/academy" },
          ]),
          buildFaqPageSchema(academyContent.faqs),
        ]}
      />
      <AcademyMasterPage />
    </>
  );
}
