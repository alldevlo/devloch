import Image from "next/image";

import type { SupportedLocale } from "@/lib/i18n/slug-map";

type AuthorBylineProps = {
  name?: string;
  role?: string;
  avatarSrc?: string;
  datePublished?: string;
  dateModified?: string;
  locale?: SupportedLocale;
};

const labelsByLocale: Record<SupportedLocale, { by: string; published: string; updated: string }> = {
  fr: { by: "Par", published: "Publié le", updated: "Mis à jour le" },
  en: { by: "By", published: "Published on", updated: "Updated on" },
  de: { by: "Von", published: "Veröffentlicht am", updated: "Aktualisiert am" },
  nl: { by: "Door", published: "Gepubliceerd op", updated: "Bijgewerkt op" },
};

function formatDate(iso: string, locale: SupportedLocale): string {
  const localeMap: Record<SupportedLocale, string> = { fr: "fr-CH", en: "en-GB", de: "de-CH", nl: "nl-BE" };
  try {
    return new Date(iso).toLocaleDateString(localeMap[locale], { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

export function AuthorByline({
  name = "Charles Perret",
  role = "Founder, devlo",
  avatarSrc = "/images/CharlesPerretProfilePicture2025.webp",
  datePublished,
  dateModified,
  locale = "fr",
}: AuthorBylineProps) {
  const labels = labelsByLocale[locale];

  return (
    <div
      className="flex flex-wrap items-center gap-3 text-sm text-neutral-500"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="flex items-center gap-2">
        <Image
          src={avatarSrc}
          alt={name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
          loading="lazy"
          sizes="32px"
          quality={74}
          itemProp="image"
        />
        <span>
          {labels.by}{" "}
          <span className="font-semibold text-[var(--text-primary)]" itemProp="name">{name}</span>
          <span className="hidden sm:inline" itemProp="jobTitle">, {role}</span>
        </span>
      </div>
      {datePublished && (
        <span className="before:mr-3 before:content-['·']">
          {labels.published}{" "}
          <time dateTime={datePublished} itemProp="datePublished">{formatDate(datePublished, locale)}</time>
        </span>
      )}
      {dateModified && dateModified !== datePublished && (
        <span className="before:mr-3 before:content-['·']">
          {labels.updated}{" "}
          <time dateTime={dateModified} itemProp="dateModified">{formatDate(dateModified, locale)}</time>
        </span>
      )}
    </div>
  );
}
