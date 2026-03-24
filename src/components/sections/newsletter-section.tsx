"use client";

import { useState, type FormEvent } from "react";
import type { SupportedLocale } from "@/lib/i18n/slug-map";

const copyByLocale: Record<
  SupportedLocale,
  {
    heading: string;
    body: string;
    placeholder: string;
    subscribe: string;
    success: string;
    error: string;
  }
> = {
  fr: {
    heading: "Recevez des insights B2B chaque semaine",
    body: "Stratégies outbound concrètes, automatisations IA et analyses de marché. Pas de blabla, uniquement ce qui fonctionne.",
    placeholder: "vous@email.com",
    subscribe: "S’abonner",
    success: "C’est bon. Vérifiez votre boîte mail.",
    error: "Une erreur est survenue. Réessayez.",
  },
  en: {
    heading: "Get weekly B2B insights",
    body: "Practical outbound strategies, AI automation breakdowns, and Swiss market intelligence. No fluff, only what works.",
    placeholder: "your@email.com",
    subscribe: "Subscribe",
    success: "You're in. Check your inbox.",
    error: "Something went wrong. Try again.",
  },
  de: {
    heading: "Wöchentliche B2B-Insights erhalten",
    body: "Praktische Outbound-Strategien, KI-Automatisierungen und Markt-Insights. Kein Ballast, nur das, was funktioniert.",
    placeholder: "sie@email.com",
    subscribe: "Abonnieren",
    success: "Sie sind dabei. Bitte prüfen Sie Ihr Postfach.",
    error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
  },
  nl: {
    heading: "Ontvang wekelijkse B2B-inzichten",
    body: "Praktische outbound-strategieën, AI-automatisering en marktinzichten. Geen ruis, alleen wat werkt.",
    placeholder: "jij@email.com",
    subscribe: "Inschrijven",
    success: "Gelukt. Check je inbox.",
    error: "Er ging iets mis. Probeer opnieuw.",
  },
};

export function NewsletterSection({ variant = "inline", locale = "en" }: { variant?: "inline" | "footer"; locale?: SupportedLocale }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const copy = copyByLocale[locale];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          className="flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#08080F] transition hover:bg-white/90 disabled:opacity-50"
        >
          {status === "loading" ? "..." : copy.subscribe}
        </button>
        {status === "success" && <p className="mt-1 text-xs text-green-400">{copy.success}</p>}
        {status === "error" && <p className="mt-1 text-xs text-red-400">{copy.error}</p>}
      </form>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="rounded-xl border border-stroke bg-[#F7F8FC] p-8 text-center">
        <h3 className="text-xl font-semibold text-[#0D0D0D]">
          {copy.heading}
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-[#4A4A4A]">
          {copy.body}
        </p>
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.placeholder}
            className="flex-1 rounded-md border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0D0D0D] placeholder:text-[#8C8C8C] focus:border-[#0F4EFF] focus:outline-none focus:ring-1 focus:ring-[#0F4EFF]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-[#0F4EFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A38CC] disabled:opacity-50"
          >
            {status === "loading" ? "..." : copy.subscribe}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-3 text-sm text-green-600">{copy.success}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{copy.error}</p>
        )}
      </div>
    </section>
  );
}
