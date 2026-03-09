import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RelatedCaseStudies } from "@/components/shared/related-case-studies";
import { caseStudies, caseStudyBySlug } from "@/lib/case-studies";

export function CaseStudyPage({ slug }: { slug: string }) {
  const study = caseStudyBySlug[slug];
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((item) => item.slug === slug);
  const prev = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Accueil", path: "/" },
          { name: "Études de cas", path: "/etudes-de-cas" },
          { name: study.client, path: `/etudes-de-cas/${slug}` },
        ]}
      />
      <section className="mx-auto w-full max-w-screen-xl px-6 py-12 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4d6678]">Etude de cas</p>
        <h1 className="mt-3 max-w-5xl text-3xl font-semibold leading-tight text-[#153a54] md:text-4xl">{study.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-[#2b4c64]/85 md:text-base">{study.summary}</p>

        {study.heroSubtitle && study.heroSubtitle !== study.summary ? (
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#2b4c64]/80">{study.heroSubtitle}</p>
        ) : null}

        {study.heroImageUrl ? (
          <figure className="mt-7 overflow-hidden rounded-xl border border-stroke bg-white shadow-soft">
            <Image src={study.heroImageUrl} alt={`${study.client} study visual`} width={1440} height={860} className="h-auto w-full object-cover" />
          </figure>
        ) : null}

        {study.heroStats.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {study.heroStats.map((result) => (
              <article key={`${result.value}-${result.label}`} className="rounded-xl border border-stroke bg-white p-5 shadow-soft">
                <p className="text-3xl font-semibold text-[#153a54]">{result.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.13em] text-[#5e798d]">{result.label}</p>
              </article>
            ))}
          </div>
        ) : (
          <ul className="mt-8 space-y-2 text-sm text-[#2b4c64]/85">
            {study.resultHighlights.slice(0, 3).map((line, index) => (
              <li key={`${study.slug}-hero-highlight-${index}`} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a608e]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mx-auto w-full max-w-screen-xl px-6 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-xl border border-stroke bg-white p-7 shadow-soft">
            <h2 className="text-xl font-semibold text-[#173a54]">Contexte client</h2>

            {study.clientLogoUrl ? (
              <div className="mt-4">
                <Image src={study.clientLogoUrl} alt={`${study.client} logo`} width={300} height={90} className="h-10 w-auto object-contain" />
              </div>
            ) : null}

            <dl className="mt-4 grid gap-3 text-sm text-[#274a62]/85">
              <div>
                <dt className="font-semibold text-[#173a54]">Client</dt>
                <dd>{study.client}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#173a54]">Secteur</dt>
                <dd>{study.sector}</dd>
              </div>
            </dl>

            {study.campaignDetails.length > 0 ? (
              <>
                <h3 className="mt-7 text-lg font-semibold text-[#173a54]">Details de campagne</h3>
                <dl className="mt-3 grid gap-3 text-sm text-[#274a62]/85">
                  {study.campaignDetails.map((detail) => (
                    <div key={`${detail.label}-${detail.value}`}>
                      <dt className="font-semibold text-[#173a54]">{detail.label}</dt>
                      <dd>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {study.sourceUrl ? (
              <a
                href={study.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex text-sm font-semibold text-[#0a608e] underline-offset-4 hover:underline"
              >
                Source originale
              </a>
            ) : null}
          </article>

          <aside className="rounded-xl border border-stroke bg-[#f6fafc] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4d6678]">Resultats cles</p>
            <ul className="mt-4 space-y-3 text-sm text-[#2c4d65]/85">
              {study.resultHighlights.map((line, index) => (
                <li key={`${study.slug}-result-highlight-${index}`} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a608e]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <Link
              prefetch={false}
              href="/notrerendez-vous"
              className="mt-8 inline-flex h-10 items-center rounded-md bg-[#0a608e] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              Discuter du projet
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-xl px-6 pb-12 lg:px-10">
        <div className="space-y-5">
          {study.sections.map((section) => (
            <article key={section.heading} className="rounded-xl border border-stroke bg-white p-7 shadow-soft">
              <h2 className="text-xl font-semibold text-[#173a54]">{section.heading}</h2>

              {section.paragraphs.length > 0 ? (
                <div className="mt-4 space-y-3 text-sm leading-6 text-[#2b4c64]/85">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${study.slug}-${section.heading}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>
              ) : null}

              {section.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-[#2b4c64]/85">
                  {section.bullets.map((item, index) => (
                    <li key={`${study.slug}-${section.heading}-bullet-${index}`} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a608e]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <RelatedCaseStudies currentSlug={slug} />

      <section className="mx-auto w-full max-w-screen-xl px-6 pb-14 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Link prefetch={false} href={`/etudes-de-cas/${prev.slug}`} className="rounded-xl border border-stroke bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.12em] text-[#4d6678]">Cas precedent</p>
            <p className="mt-2 text-lg font-semibold text-[#173a54]">{prev.title}</p>
          </Link>
          <Link prefetch={false} href={`/etudes-de-cas/${next.slug}`} className="rounded-xl border border-stroke bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-[0.12em] text-[#4d6678]">Cas suivant</p>
            <p className="mt-2 text-lg font-semibold text-[#173a54]">{next.title}</p>
          </Link>
        </div>
      </section>
    </>
  );
}
