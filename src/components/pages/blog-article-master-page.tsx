import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-builders";
import { getLocalizedBlogArticle, getLocalizedBlogHub } from "@/lib/i18n/blog-content";
import { resolvePathForLocale, type SupportedLocale } from "@/lib/i18n/slug-map";
import { SummarySection } from "@/components/shared/summary-section";

type BlogArticleMasterPageProps = {
  frSlug: string;
  locale?: SupportedLocale;
};

const relatedServiceLabelByLocale: Record<SupportedLocale, string> = {
  fr: "Service associé",
  en: "Related service",
  de: "Zugehöriger Service",
  nl: "Gerelateerde dienst",
};

const discoverOfferLabelByLocale: Record<SupportedLocale, string> = {
  fr: "Découvrir notre offre →",
  en: "Discover our offer →",
  de: "Unser Angebot entdecken →",
  nl: "Ons aanbod ontdekken →",
};

const backToBlogLabelByLocale: Record<SupportedLocale, string> = {
  fr: "← Retour au blog",
  en: "← Back to blog",
  de: "← Zurück zum Blog",
  nl: "← Terug naar blog",
};

export function BlogArticleMasterPage({ frSlug, locale = "fr" }: BlogArticleMasterPageProps) {
  const article = getLocalizedBlogArticle(frSlug, locale);
  if (!article) notFound();

  const hub = getLocalizedBlogHub(locale);
  const articlePath = resolvePathForLocale(`/blog/${frSlug}`, locale).path;
  const blogPath = resolvePathForLocale("/blog", locale).path;
  const breadcrumbItems = [
    { name: hub.breadcrumbHome, path: resolvePathForLocale("/", locale).path },
    { name: hub.breadcrumbBlog, path: blogPath },
    { name: article.title.length > 50 ? `${article.title.slice(0, 50)}…` : article.title, path: articlePath },
  ];

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildArticleSchema({
            headline: article.title,
            description: article.description,
            path: articlePath,
            datePublished: article.date,
            dateModified: article.date,
            author: article.author ?? "Charles Perret",
            authorUrl: article.authorUrl ?? "https://www.linkedin.com/in/charlesperret/",
          }),
        ]}
      />
      <Breadcrumb items={breadcrumbItems} />

      <article className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-10">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-md bg-[#074f74] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {article.category}
          </span>
          <time className="text-xs text-neutral-400">{article.date}</time>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-[#153a54] md:text-4xl">{article.title}</h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">{article.description}</p>

        <div className="mt-10 space-y-6">
          {article.body.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 text-xl font-bold text-[#153a54] md:text-2xl">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base leading-7 text-neutral-600">
                {block}
              </p>
            );
          })}
        </div>

        {article.summaryPoints && article.summaryPoints.length > 0 && (
          <div className="mt-10">
            <SummarySection
              title={locale === "fr" ? "Points clés à retenir" : locale === "de" ? "Wichtigste Erkenntnisse" : locale === "nl" ? "Belangrijkste punten" : "Key takeaways"}
              points={article.summaryPoints}
              locale={locale}
            />
          </div>
        )}

        <div className="mt-12 rounded-xl border border-neutral-200 bg-[#f7f8fc] p-6">
          <p className="text-sm font-semibold text-[#153a54]">{relatedServiceLabelByLocale[locale]}</p>
          <Link
            href={resolvePathForLocale(`/services/${article.relatedServiceSlug}`, locale).path}
            className="mt-2 inline-flex text-sm font-semibold text-[#0a608e] underline-offset-4 hover:underline"
          >
            {discoverOfferLabelByLocale[locale]}
          </Link>
        </div>

        <div className="mt-8">
          <Link href={blogPath} className="text-sm font-semibold text-[#0a608e] underline-offset-4 hover:underline">
            {backToBlogLabelByLocale[locale]}
          </Link>
        </div>
      </article>
    </>
  );
}
