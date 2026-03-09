import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { AcademyMasterPage } from "@/components/pages/academy-master-page";
import { academyContent, academySeo } from "@/content/masterfile.fr";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildCourseSchema, buildFaqPageSchema, buildVideoObjectSchema } from "@/lib/seo/schema-builders";

const academyTitle = academySeo.title.replace(/\s*\|\s*devlo$/i, "");

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Outbound Academy", path: "/academy" },
];

export const metadata: Metadata = buildPageMetadata({
  title: academyTitle,
  description: academySeo.description,
  path: "/academy",
});

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildCourseSchema(),
          buildFaqPageSchema(academyContent.faqs),
          buildVideoObjectSchema({
            name: "Formation prospection B2B — Outbound Academy devlo",
            description:
              "Formation complète prospection B2B : cold email, LinkedIn outreach, cold calling. 50 tutoriels vidéo, méthodologie complète, accès à vie.",
            thumbnailUrl: "/images/devlo_OG_Banner.webp",
            uploadDate: "2024-01-01",
            embedUrl: "https://fast.wistia.net/embed/iframe/gj1ltuo3tm",
            duration: "PT3M",
          }),
          buildVideoObjectSchema({
            name: "Planifier des démos qualifiées — Outbound Academy devlo",
            description:
              "Comment planifier plus de démos qualifiées et rendez-vous avec des leads B2B qualifiés. Méthodes et techniques de prospection multicanale.",
            thumbnailUrl: "/images/devlo_OG_Banner.webp",
            uploadDate: "2024-01-01",
            embedUrl: "https://fast.wistia.net/embed/iframe/7inn49mdy6",
            duration: "PT3M",
          }),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />
      <AcademyMasterPage />
    </>
  );
}
