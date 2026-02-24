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

export function HubspotForm({ portalId, formId, region, targetId }: HubspotFormProps) {
  const initialized = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const render = () => {
      if (!window.hbspt || initialized.current) return;
      initialized.current = true;
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${targetId}`,
      });
      setLoaded(true);
    };

    if (window.hbspt) {
      render();
      return;
    }

    const script = document.createElement("script");
    script.src = "//js-na2.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    script.onload = render;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [portalId, formId, region, targetId]);

  return (
    <div className="relative">
      {!loaded && (
        <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-neutral-50">
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-devlo-600" />
            <span className="text-sm">Chargement du formulaire…</span>
          </div>
        </div>
      )}
      <div id={targetId} className={loaded ? "" : "hidden"} />
    </div>
  );
}
