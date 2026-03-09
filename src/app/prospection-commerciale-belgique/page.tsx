import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { GeoLandingPage } from "@/components/pages/geo-landing-page";
import { GEO_PAGES } from "@/content/geo-pages";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo/schema-builders";
import { siteConfig } from "@/lib/site";

const data = GEO_PAGES["prospection-commerciale-belgique"];

export const metadata: Metadata = buildPageMetadata({
  title: data.metaTitle.replace(/\s*—\s*devlo$/, ""),
  description: data.metaDescription,
  path: `/${data.slug}`,
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: data.localBusiness.name,
  url: siteConfig.url,
  telephone: data.localBusiness.telephone,
  email: data.localBusiness.email,
  address: { "@type": "PostalAddress", ...data.localBusiness.address },
  areaServed: "BE",
};

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: data.h1, path: `/${data.slug}` },
          ]),
          buildFaqPageSchema(data.faqs),
          localBusinessSchema,
        ]}
      />
      <GeoLandingPage data={data} />
    </>
  );
}
