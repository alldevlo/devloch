import type { Metadata } from "next";

import { DictationCleanMasterPage } from "@/components/pages/dictation-clean-master-page";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getLocalizedDictationCleanContent } from "@/lib/i18n/dictation-clean-content";

const content = getLocalizedDictationCleanContent("fr");
export const metadata: Metadata = buildPageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: "/insights/dictation-clean",
  type: "article",
  datePublished: "2026-03-20",
  dateModified: "2026-03-20",
  author: "Charles Perret",
});

export default function DictationCleanPage() {
  return <DictationCleanMasterPage locale="fr" />;
}
