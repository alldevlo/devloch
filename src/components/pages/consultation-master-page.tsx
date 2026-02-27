import { SectionWrapper } from "@/components/shared/section-wrapper";
import { FadeInOnScroll } from "@/components/ui/fade-in-on-scroll";
import { HubspotForm } from "@/components/ui/hubspot-form";
import { consultationContent } from "@/content/masterfile.fr";

export function ConsultationMasterPage() {
  const c = consultationContent;

  return (
    <SectionWrapper background="white" className="pt-[80px] md:pt-[120px]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:items-start">
        <div className="min-w-0">
          {/* ── H1 ──────────────────────────────────────────────────────── */}
          <FadeInOnScroll>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] text-devlo-900 md:text-5xl lg:text-[52px]">
              {c.h1}
            </h1>
          </FadeInOnScroll>

          {/* ── Reassurance badges ─────────────────────────────────────── */}
          <FadeInOnScroll delay={0.05}>
            <div className="mt-6 flex flex-wrap gap-3">
              {c.reassurance.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-700"
                >
                  <span className="text-green-600">✓</span>
                  {badge}
                </span>
              ))}
            </div>
          </FadeInOnScroll>

          {/* ── Intro paragraph ────────────────────────────────────────── */}
          <FadeInOnScroll delay={0.1}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
              {c.intro}
            </p>
          </FadeInOnScroll>
        </div>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <FadeInOnScroll delay={0.15}>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft md:p-7">
            <h2 className="mb-1 text-2xl font-bold text-devlo-900">
              {c.formTitle}
            </h2>
            <p className="mb-6 text-neutral-600">{c.formSubtitle}</p>
            <HubspotForm
              portalId={c.hubspot.portalId}
              formId={c.hubspot.formId}
              region={c.hubspot.region}
              targetId="hubspot-consultation"
            />
            <p className="mt-4 text-center text-sm text-neutral-500">
              {c.postForm}
            </p>
          </div>
        </FadeInOnScroll>
      </div>

      {/* ── Deliverables ───────────────────────────────────────────────── */}
      <FadeInOnScroll delay={0.2}>
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-bold text-devlo-900">
            {c.deliverablesTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {c.deliverables.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-devlo-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeInOnScroll>

      {/* ── Proof stat ─────────────────────────────────────────────────── */}
      <FadeInOnScroll delay={0.25}>
        <div className="mt-10 rounded-xl bg-slate-900 px-6 py-5 text-white">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
            <span className="text-4xl font-extrabold text-blue-400">
              {c.proof.stat}
            </span>
            <div>
              <p className="font-semibold">{c.proof.label}</p>
              <p className="text-sm text-slate-400">{c.proof.source}</p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* ── For who ────────────────────────────────────────────────────── */}
      <FadeInOnScroll delay={0.3}>
        <div className="mt-10">
          <h2 className="mb-2 text-xl font-bold text-devlo-900">
            {c.forWhoTitle}
          </h2>
          <p className="mb-4 text-neutral-600">{c.forWhoIntro}</p>
          <ul className="space-y-2">
            {c.forWho.map((item) => (
              <li key={item} className="flex items-start gap-2 text-neutral-700">
                <span className="mt-0.5 text-blue-500">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeInOnScroll>
    </SectionWrapper>
  );
}
