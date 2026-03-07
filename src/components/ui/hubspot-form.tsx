"use client";

import { useEffect, useRef, useState } from "react";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

type HubspotFormApi = {
  setFieldValue?: (fieldName: string, value: string) => void;
};

type HubspotCreateConfig = {
  portalId: string;
  formId: string;
  region: string;
  target: string;
  properties?: Record<string, string>;
  onFormReady?: (form: unknown) => void;
  onBeforeFormSubmit?: (submissionValues: unknown, form: unknown) => void;
  onFormSubmit?: (form: unknown) => void;
  onFormSubmitted?: () => void;
};

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: HubspotCreateConfig) => HubspotFormApi;
      };
    };
  }
}

type HubspotFormProps = {
  portalId: string;
  formId: string;
  region: string;
  targetId: string;
  locale?: SupportedLocale;
  hiddenFields?: Record<string, string>;
  onSubmitted?: () => void;
};

const copyByLocale: Record<
  SupportedLocale,
  {
    loading: string;
    loadError: string;
    submissionError: string;
    successMessage: string;
  }
> = {
  fr: {
    loading: "Chargement du formulaire…",
    loadError: "Impossible de charger le formulaire.",
    submissionError: "La soumission HubSpot a échoué. Merci de vérifier les champs requis.",
    successMessage: "Merci pour votre prise de contact. Nous reviendrons vers vous sous 24 heures.",
  },
  en: {
    loading: "Loading form…",
    loadError: "Unable to load the form.",
    submissionError: "HubSpot submission failed. Please verify the required fields.",
    successMessage: "Thank you for reaching out. We will get back to you within 24 hours.",
  },
  de: {
    loading: "Formular wird geladen…",
    loadError: "Das Formular konnte nicht geladen werden.",
    submissionError: "Die HubSpot-Übermittlung ist fehlgeschlagen. Bitte prüfen Sie die Pflichtfelder.",
    successMessage: "Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  },
  nl: {
    loading: "Formulier wordt geladen…",
    loadError: "Het formulier kon niet worden geladen.",
    submissionError: "HubSpot-verzending is mislukt. Controleer de verplichte velden.",
    successMessage: "Bedankt voor je aanvraag. We nemen binnen 24 uur contact met je op.",
  },
};

const RESERVED_FORM_HEIGHT_CLASS = "min-h-[560px] md:min-h-[640px]";

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubspotScript(): Promise<void> {
  if (typeof window === "undefined" || window.hbspt) {
    return Promise.resolve();
  }

  if (hubspotScriptPromise) {
    return hubspotScriptPromise;
  }

  hubspotScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-hubspot-forms="true"]');
    if (existingScript) {
      if (window.hbspt) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("HubSpot script failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.dataset.hubspotForms = "true";
    script.onload = () => resolve();
    script.onerror = () => {
      hubspotScriptPromise = null;
      reject(new Error("HubSpot script failed to load"));
    };

    document.body.appendChild(script);
  });

  return hubspotScriptPromise;
}

function resolveFormElement(formRef: unknown, targetId: string): HTMLFormElement | null {
  if (formRef instanceof HTMLFormElement) return formRef;
  if (Array.isArray(formRef) && formRef[0] instanceof HTMLFormElement) return formRef[0];

  if (typeof formRef === "object" && formRef && "get" in formRef) {
    const get = (formRef as { get?: (index: number) => unknown }).get;
    const maybe = typeof get === "function" ? get(0) : null;
    if (maybe instanceof HTMLFormElement) return maybe;
  }

  const container = document.getElementById(targetId);
  return container?.querySelector("form") ?? null;
}

function dispatchValueChange(element: HTMLInputElement | HTMLTextAreaElement) {
  element.dispatchEvent(new Event("input", { bubbles: true }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

function syncHiddenFields(form: HTMLFormElement, hiddenFields?: Record<string, string>) {
  if (!hiddenFields) return;

  Object.entries(hiddenFields).forEach(([name, value]) => {
    const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
    if (input) {
      input.value = value;
      dispatchValueChange(input);
      return;
    }

    const textarea = form.querySelector<HTMLTextAreaElement>(`textarea[name="${name}"]`);
    if (textarea) {
      textarea.value = value;
      dispatchValueChange(textarea);
      return;
    }

    const hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = name;
    hidden.value = value;
    form.appendChild(hidden);
  });
}

function syncFormInstanceValues(formInstance: HubspotFormApi | null, hiddenFields?: Record<string, string>) {
  if (!formInstance || typeof formInstance.setFieldValue !== "function" || !hiddenFields) return;

  Object.entries(hiddenFields).forEach(([name, value]) => {
    try {
      formInstance.setFieldValue?.(name, value);
    } catch {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`[HubSpot] Unable to set field value for "${name}"`);
      }
    }
  });
}

export function HubspotForm({
  portalId,
  formId,
  region,
  targetId,
  locale = "fr",
  hiddenFields,
  onSubmitted,
}: HubspotFormProps) {
  const copy = copyByLocale[locale];
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formInstanceRef = useRef<HubspotFormApi | null>(null);
  const hiddenFieldsRef = useRef<Record<string, string> | undefined>(hiddenFields);
  const [loaded, setLoaded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    hiddenFieldsRef.current = hiddenFields;
  }, [hiddenFields]);

  useEffect(() => {
    initialized.current = false;
    formInstanceRef.current = null;
    setLoaded(false);
    setSubmitted(false);
    setLoadError(false);
    setSubmissionError(null);
  }, [formId, portalId, region, targetId]);

  useEffect(() => {
    if (isNearViewport) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isNearViewport]);

  useEffect(() => {
    if (!isNearViewport) return;

    let cancelled = false;

    const render = () => {
      if (cancelled || !window.hbspt || initialized.current) return;
      initialized.current = true;
      const instance = window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${targetId}`,
        properties: hiddenFieldsRef.current,
        onFormReady: (formRef: unknown) => {
          const form = resolveFormElement(formRef, targetId);
          if (form) {
            syncHiddenFields(form, hiddenFieldsRef.current);
          }
          syncFormInstanceValues(formInstanceRef.current, hiddenFieldsRef.current);
        },
        onBeforeFormSubmit: (_submissionValues: unknown, formRef: unknown) => {
          const form = resolveFormElement(formRef, targetId);
          if (form) {
            syncHiddenFields(form, hiddenFieldsRef.current);
          }
          syncFormInstanceValues(formInstanceRef.current, hiddenFieldsRef.current);
        },
        onFormSubmit: (formRef: unknown) => {
          const form = resolveFormElement(formRef, targetId);
          if (form) {
            syncHiddenFields(form, hiddenFieldsRef.current);
          }
          syncFormInstanceValues(formInstanceRef.current, hiddenFieldsRef.current);
          setSubmissionError(null);
        },
        onFormSubmitted: () => {
          setSubmitted(true);
          onSubmitted?.();
        },
      });
      formInstanceRef.current = instance;
      syncFormInstanceValues(formInstanceRef.current, hiddenFieldsRef.current);
      setLoaded(true);
      setLoadError(false);
    };

    if (window.hbspt) {
      render();
      return;
    }

    loadHubspotScript()
      .then(render)
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [formId, isNearViewport, onSubmitted, portalId, region, targetId]);

  useEffect(() => {
    if (!loaded || submitted) return;

    const container = document.getElementById(targetId);
    const form = container?.querySelector("form");
    if (form instanceof HTMLFormElement) {
      syncHiddenFields(form, hiddenFields);
    }
    syncFormInstanceValues(formInstanceRef.current, hiddenFields);
  }, [hiddenFields, loaded, submitted, targetId]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object" || !event.data) return;

      const payload = event.data as { type?: string; eventName?: string; data?: unknown };
      if (payload.type !== "hsFormCallback") return;

      if (payload.eventName === "onFormSubmitFailed" || payload.eventName === "onFormError") {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.error("[HubSpot] Form submission failed", payload.data);
        }
        setSubmissionError(copy.submissionError);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [copy.submissionError]);

  return (
    <div ref={containerRef} className="relative">
      {!loaded && !submitted && (
        <div className={`flex ${RESERVED_FORM_HEIGHT_CLASS} items-center justify-center rounded-xl bg-neutral-50`}>
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-devlo-600" />
            <span className="text-sm">{loadError ? copy.loadError : copy.loading}</span>
          </div>
        </div>
      )}
      <div id={targetId} className={loaded && !submitted ? RESERVED_FORM_HEIGHT_CLASS : "hidden"} />
      {submissionError ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{submissionError}</p>
      ) : null}
      <div className={submitted ? "" : "hidden"}>
        <div className={`flex ${RESERVED_FORM_HEIGHT_CLASS} items-center rounded-xl border border-emerald-200 bg-emerald-50 p-6`}>
          <p className="text-sm font-medium leading-6 text-emerald-900">
            {copy.successMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
