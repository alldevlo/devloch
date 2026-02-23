import type { Metadata } from "next";

import { ConditionsMasterPage } from "@/components/pages/conditions-master-page";
import { conditionsSeo } from "@/content/masterfile.fr";

export const metadata: Metadata = {
  title: conditionsSeo.title,
  description: conditionsSeo.description,
  openGraph: {
    title: conditionsSeo.title,
    description: conditionsSeo.description,
    type: "website",
    locale: "fr_CH",
    url: "https://devlo.ch/conditions",
  },
};

export default function Page() {
  return <ConditionsMasterPage />;
}
