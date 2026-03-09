import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { ServicesHubPage as ServicesHubView } from "@/components/pages/services-hub-page";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema-builders";
import { getLocalizedServicesContent } from "@/lib/i18n/services-content";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Services de prospection B2B : cold email, LinkedIn, calling",
    description:
      "devlo est une agence de prospection B2B basée en Suisse : génération de leads, cold email, LinkedIn outreach, cold calling, intent data et enrichissement Clay.",
    path: "/services",
  }),
  keywords: [
    "services prospection B2B",
    "agence outbound Suisse",
    "cold email LinkedIn calling",
    "intent data",
    "enrichissement Clay",
  ],
};

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesHubRoutePage() {
  const content = getLocalizedServicesContent("fr");
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />
      <ServicesHubView cards={content.SERVICE_HUB_CARDS} copy={content.hubCopy} caseStudies={content.ALL_CASE_STUDIES} />
    </>
  );
}
