"use client";

import { type FormEvent, useState } from "react";

import { isProEmail, submitToHubSpot } from "@/lib/hubspot";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type HubSpotFormProps = {
  serviceInterest: string;
  configuratorData?: string;
  ctaLabel?: string;
  onSuccess?: () => void;
};

export function HubSpotForm({
  serviceInterest,
  configuratorData,
  ctaLabel = "Réserver mon call stratégique →",
  onSuccess,
}: HubSpotFormProps) {
  const [form, setForm] = useState({ firstname: "", email: "", company: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fieldIdPrefix = serviceInterest.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "service";

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.firstname.trim()) nextErrors.firstname = "Votre prénom est requis.";

    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedEmail) {
      nextErrors.email = "Votre email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Merci d'indiquer un email valide.";
    } else if (!isProEmail(normalizedEmail)) {
      nextErrors.email = "Merci d'utiliser votre email professionnel (pas Gmail, Hotmail, etc.).";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const ok = await submitToHubSpot({
      firstname: form.firstname,
      email: form.email,
      company: form.company,
      service_interest: serviceInterest,
      configurator_data: configuratorData,
      page_url: typeof window !== "undefined" ? window.location.href : "",
      page_name: typeof document !== "undefined" ? document.title : "",
    });

    setLoading(false);

    if (ok) {
      setSuccess(true);
      window.dataLayer?.push({ event: "lead_form_submit", service: serviceInterest });
      onSuccess?.();
      return;
    }

    setErrors({ submit: "Une erreur est survenue. Veuillez réessayer." });
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="text-3xl">🎯</div>
        <h3 className="mt-3 font-service-display text-xl font-bold text-emerald-900">Parfait, on vous a bien reçu.</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          Votre équipe devlo prépare votre stratégie et vous contacte sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={`firstname-${fieldIdPrefix}`} className="sr-only">
          Votre prénom
        </label>
        <input
          id={`firstname-${fieldIdPrefix}`}
          type="text"
          placeholder="Votre prénom *"
          value={form.firstname}
          onChange={(event) => setForm((previous) => ({ ...previous, firstname: event.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          autoComplete="given-name"
        />
        {errors.firstname ? <p className="mt-1 text-xs text-red-500">{errors.firstname}</p> : null}
      </div>

      <div>
        <label htmlFor={`email-${fieldIdPrefix}`} className="sr-only">
          Email professionnel
        </label>
        <input
          id={`email-${fieldIdPrefix}`}
          type="email"
          placeholder="Email professionnel *"
          value={form.email}
          onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          autoComplete="email"
        />
        {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email}</p> : null}
        <p className="mt-1 text-xs text-gray-400">Email pro uniquement — pas de Gmail ou Hotmail.</p>
      </div>

      <div>
        <label htmlFor={`company-${fieldIdPrefix}`} className="sr-only">
          Entreprise
        </label>
        <input
          id={`company-${fieldIdPrefix}`}
          type="text"
          placeholder="Entreprise (optionnel)"
          value={form.company}
          onChange={(event) => setForm((previous) => ({ ...previous, company: event.target.value }))}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none"
          autoComplete="organization"
        />
      </div>

      {errors.submit ? <p className="text-sm text-red-500">{errors.submit}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Envoi en cours…
          </>
        ) : (
          ctaLabel
        )}
      </button>

      <p className="text-center text-xs text-gray-400">Pas de spam. Votre équipe devlo vous contacte sous 24h.</p>
    </form>
  );
}
