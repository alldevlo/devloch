import type { Metadata } from "next";

import { CaseStudiesMasterPage } from "@/components/pages/case-studies-master-page";
import { caseStudiesSeo } from "@/content/masterfile.fr";

export const metadata: Metadata = {
  title: caseStudiesSeo.title,
  description: caseStudiesSeo.description,
  openGraph: {
    title: caseStudiesSeo.title,
    description: caseStudiesSeo.description,
    type: "website",
    locale: "fr_CH",
    url: "https://devlo.ch/etudes-de-cas",
  },
};

export default function Page() {
  return <CaseStudiesMasterPage />;
}
