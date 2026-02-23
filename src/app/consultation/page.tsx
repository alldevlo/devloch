import type { Metadata } from "next";

import { ConsultationMasterPage } from "@/components/pages/consultation-master-page";
import { consultationSeo } from "@/content/masterfile.fr";

export const metadata: Metadata = {
  title: consultationSeo.title,
  description: consultationSeo.description,
  openGraph: {
    title: consultationSeo.title,
    description: consultationSeo.description,
    type: "website",
    locale: "fr_CH",
    url: "https://devlo.ch/consultation",
  },
};

export default function Page() {
  return <ConsultationMasterPage />;
}
