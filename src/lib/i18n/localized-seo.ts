import { localizedPageByIdQuery } from "@/lib/sanity/queries";
import { sanityClient } from "@/lib/sanity/client";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

type LocalizedValue = Partial<Record<SupportedLocale, string>>;

type SanityLocalizedDoc = {
  seoTitle?: LocalizedValue;
  seoDescription?: LocalizedValue;
  title?: LocalizedValue;
  description?: LocalizedValue;
  ogImage?: Partial<Record<SupportedLocale, string>> | string;
};

function pickLocalized(value: LocalizedValue | undefined, locale: SupportedLocale, fallback: string): string {
  if (!value) return fallback;
  return value[locale] || value.fr || fallback;
}

export async function getSanityLocalizedSeo(
  pageId: string,
  locale: SupportedLocale,
): Promise<{ title?: string; description?: string; ogImage?: string } | null> {
  if (!sanityClient) return null;

  const doc = await sanityClient.fetch<SanityLocalizedDoc | null>(localizedPageByIdQuery, { pageId }).catch(() => null);
  if (!doc) return null;

  const title = pickLocalized(doc.seoTitle || doc.title, locale, "");
  const description = pickLocalized(doc.seoDescription || doc.description, locale, "");

  let ogImage: string | undefined;
  if (typeof doc.ogImage === "string") {
    ogImage = doc.ogImage;
  } else if (doc.ogImage) {
    ogImage = doc.ogImage[locale] || doc.ogImage.fr;
  }

  return {
    title: title || undefined,
    description: description || undefined,
    ogImage,
  };
}
