import type { Metadata } from "next";

import { ServicePageTemplate } from "@/components/pages/service-page";
import { SERVICE_PAGE_DATA } from "@/content/services";
import { buildPageMetadata } from "@/lib/seo/metadata";

const service = SERVICE_PAGE_DATA["crm-delivrabilite"];

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: service.metadataTitle,
    description: service.metadataDescription,
    path: service.path,
  }),
  keywords: service.metadataKeywords,
};

export default function CrmDelivrabilitePage() {
  return <ServicePageTemplate service={service} />;
}
