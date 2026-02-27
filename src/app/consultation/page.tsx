import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ConsultationMasterPage } from "@/components/pages/consultation-master-page";
import { consultationSeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

const consultationTitle = consultationSeo.title.replace(/\s*\|\s*devlo$/i, "");

export const metadata: Metadata = buildPageMetadata({
  title: consultationTitle,
  description: consultationSeo.description,
  path: "/consultation",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Consultation gratuite", path: "/consultation" },
        ])}
      />
      <ConsultationMasterPage />
    </>
  );
}
