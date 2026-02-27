import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { HomePage } from "@/components/pages/home-page";
import { homeContent, homeSeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildFaqPageSchema } from "@/lib/seo/schema-builders";

const homeTitle = homeSeo.title;

export const metadata: Metadata = buildPageMetadata({
  title: homeTitle,
  description: homeSeo.description,
  path: "/",
  imagePath: "/images/devlo_OG_Banner.webp",
});

export default function Page() {
  return (
    <>
      <JsonLd schema={buildFaqPageSchema(homeContent.faqs)} />
      <HomePage />
    </>
  );
}
