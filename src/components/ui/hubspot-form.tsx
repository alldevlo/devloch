"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
          onFormSubmitted?: () => void;
        }) => void;
      };
    };
  }
}

type HubspotFormProps = {
  portalId: string;
  formId: string;
  region: string;
  targetId: string;
};

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
    script.src = "https://js-na2.hsforms.net/forms/embed/v2.js";
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

export function HubspotForm({ portalId, formId, region, targetId }: HubspotFormProps) {
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${targetId}`,
        onFormSubmitted: () => {
          setSubmitted(true);
        },
      });
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
  }, [formId, isNearViewport, portalId, region, targetId]);

  return (
    <div ref={containerRef} className="relative">
      {!loaded && !submitted && (
        <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-neutral-50">
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-devlo-600" />
            <span className="text-sm">
              {loadError ? "Impossible de charger le formulaire." : "Chargement du formulaire…"}
            </span>
          </div>
        </div>
      )}
      <div id={targetId} className={loaded && !submitted ? "" : "hidden"} />
      <div className={submitted ? "" : "hidden"}>
        <div className="flex min-h-[320px] items-center rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-medium leading-6 text-emerald-900">
            Merci pour votre prise de contact. Nous reviendrons vers vous sous 24 heures.
          </p>
        </div>
      </div>
    </div>
  );
}
