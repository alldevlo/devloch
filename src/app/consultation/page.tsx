import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { ConsultationMasterPage } from "@/components/pages/consultation-master-page";
import { consultationContent, consultationSeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";

const consultationTitle = consultationSeo.title.replace(/\s*\|\s*devlo$/i, "");

export const metadata: Metadata = buildPageMetadata({
  title: consultationTitle,
  description: consultationSeo.description,
  path: "/consultation",
});

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Consultation gratuite", path: "/consultation" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildFaqPageSchema(consultationContent.faqs),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />
      <ConsultationMasterPage />
    </>
  );
}
