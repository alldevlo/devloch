"use client";

import { useState } from "react";

import type { ServicePageData } from "@/content/services";
import { HubSpotForm } from "@/components/shared/HubSpotForm";
import { ServiceConfigurator } from "@/components/shared/service-configurator";

type ServiceLeadPanelProps = {
  service: ServicePageData;
};

export function ServiceLeadPanel({ service }: ServiceLeadPanelProps) {
  const [configuratorData, setConfiguratorData] = useState(service.configuratorHeader);

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <ServiceConfigurator
        title={service.configuratorTitle}
        intro={service.configuratorIntro}
        header={service.configuratorHeader}
        fields={service.configuratorFields}
        onSummaryChange={setConfiguratorData}
      />

      <section className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6">
        <h2 className="font-service-display text-2xl font-bold text-[var(--text-primary)]">Parlez à un stratège devlo</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Recevez un plan d&apos;action concret basé sur votre configuration.
        </p>
        <div className="mt-5">
          <HubSpotForm
            serviceInterest={service.configuratorServiceLabel}
            configuratorData={configuratorData}
            ctaLabel="Recevoir mon plan stratégique →"
          />
        </div>
      </section>
    </div>
  );
}
