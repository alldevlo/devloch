"use client";

import { useEffect, useRef } from "react";

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

  return <div id={targetId} />;
}
