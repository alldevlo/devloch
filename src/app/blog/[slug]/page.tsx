import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { articles, getArticleBySlug } from "@/content/blog/articles";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema-builders";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
  });
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const breadcrumbItems = [
    { name: "Accueil", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: article.title.length > 50 ? `${article.title.slice(0, 50)}…` : article.title, path: `/blog/${article.slug}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          buildBreadcrumbSchema(breadcrumbItems),
          buildArticleSchema({
            headline: article.title,
            description: article.description,
            path: `/blog/${article.slug}`,
            datePublished: article.date,
            dateModified: article.date,
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

        <div className="mt-12 rounded-xl border border-neutral-200 bg-[#f7f8fc] p-6">
          <p className="text-sm font-semibold text-[#153a54]">Service associé</p>
          <Link
            href={`/services/${article.relatedServiceSlug}`}
            className="mt-2 inline-flex text-sm font-semibold text-[#0a608e] underline-offset-4 hover:underline"
          >
            Découvrir notre offre →
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-[#0a608e] underline-offset-4 hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </article>
    </>
  );
}
