import type { Metadata } from "next";

import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { academySeo } from "@/content/masterfile.fr";

export const metadata: Metadata = {
  title: academySeo.title,
  description: academySeo.description,
  openGraph: {
    title: academySeo.title,
    description: academySeo.description,
    type: "website",
    locale: "fr_CH",
    url: "https://devlo.ch/academy",
  },
};

export default function Page() {
  return <AcademyMasterPage />;
}
