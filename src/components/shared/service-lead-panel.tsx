"use client";

import { useMemo, useState } from "react";

import { ServicesSurfaceCard } from "@/components/services/services-ui";
import type { ServicePageData } from "@/content/services";
import { HubSpotForm } from "@/components/shared/HubSpotForm";
import { type ConfiguratorLine, ServiceConfigurator } from "@/components/shared/service-configurator";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

type ServiceLeadPanelProps = {
  service: ServicePageData;
  locale?: SupportedLocale;
};

function buildDefaultLines(service: ServicePageData, undefinedValue: string): ConfiguratorLine[] {
  return service.configuratorFields.map((field) => ({
    id: field.id,
    label: field.label,
    value: undefinedValue,
  }));
}

const copyByLocale: Record<
  SupportedLocale,
  {
    undefinedValue: string;
    step2Title: string;
    coordinates: string;
    back: string;
    checkConfig: string;
    selectedSummary: string;
  }
> = {
  fr: {
    undefinedValue: "Non défini",
    step2Title: "Étape 2 — Recevez le plan",
    coordinates: "Étape 2/2 — Coordonnées",
    back: "Retour",
    checkConfig: "Vérifiez votre configuration puis envoyez vos coordonnées.",
    selectedSummary: "Résumé sélectionné",
  },
  en: {
    undefinedValue: "Not defined",
    step2Title: "Step 2 — Get the plan",
    coordinates: "Step 2/2 — Contact details",
    back: "Back",
    checkConfig: "Review your configuration then submit your contact details.",
    selectedSummary: "Selected summary",
  },
  de: {
    undefinedValue: "Nicht definiert",
    step2Title: "Schritt 2 — Plan erhalten",
    coordinates: "Schritt 2/2 — Kontaktdaten",
    back: "Zurück",
    checkConfig: "Überprüfen Sie Ihre Konfiguration und senden Sie dann Ihre Kontaktdaten.",
    selectedSummary: "Ausgewählte Zusammenfassung",
  },
  nl: {
    undefinedValue: "Niet gedefinieerd",
    step2Title: "Stap 2 — Ontvang het plan",
    coordinates: "Stap 2/2 — Contactgegevens",
    back: "Terug",
    checkConfig: "Controleer je configuratie en verstuur daarna je contactgegevens.",
    selectedSummary: "Geselecteerde samenvatting",
  },
};

export function ServiceLeadPanel({ service, locale = "fr" }: ServiceLeadPanelProps) {
  const copy = copyByLocale[locale];
  const [step, setStep] = useState<1 | 2>(1);
  const [configuratorData, setConfiguratorData] = useState(service.configuratorHeader);
  const [previewLines, setPreviewLines] = useState<ConfiguratorLine[]>(() => buildDefaultLines(service, copy.undefinedValue));

  const summaryTitle = useMemo(() => copy.step2Title, [copy.step2Title]);

  return (
    <div className="min-w-0 w-full space-y-5 lg:sticky lg:top-28">
      <div className={step === 1 ? "block" : "hidden"}>
        <ServiceConfigurator
          locale={locale}
          title={service.configuratorTitle}
          intro={service.configuratorIntro}
          header={service.configuratorHeader}
          fields={service.configuratorFields}
          onSummaryChange={setConfiguratorData}
          onPreviewChange={setPreviewLines}
          onContinue={() => setStep(2)}
        />
      </div>

      <div className={step === 2 ? "space-y-5" : "hidden"}>
        <ServicesSurfaceCard className="p-5 md:p-6">
          <div className="rounded-xl border border-devlo-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-devlo-700">{copy.coordinates}</p>
              <p className="text-xs font-semibold text-devlo-700">100%</p>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-devlo-100">
              <div className="h-full w-full rounded-full bg-devlo-700" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-devlo-900">{summaryTitle}</h2>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700 transition hover:border-devlo-700 hover:text-devlo-700"
            >
              {copy.back}
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{copy.checkConfig}</p>

          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-devlo-700">{copy.selectedSummary}</p>
            <div className="mt-2 space-y-1.5">
              {previewLines.map((line) => (
                <p key={line.id} className="text-xs leading-5 text-neutral-600">
                  <span className="font-semibold text-devlo-900">{line.label}:</span> {line.value}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <HubSpotForm
              serviceInterest={service.configuratorServiceLabel}
              configuratorData={configuratorData}
              locale={locale}
              onSuccess={() => setStep(2)}
            />
          </div>
        </ServicesSurfaceCard>
      </div>
    </div>
  );
}
