"use client";

import { useEffect, useMemo, useState } from "react";

import type { ServiceConfiguratorField } from "@/content/services";

type SelectionValue = string | string[];

type ServiceConfiguratorProps = {
  title: string;
  intro: string;
  header: string;
  fields: ServiceConfiguratorField[];
  onSummaryChange: (summary: string) => void;
};

function defaultSelectionForField(field: ServiceConfiguratorField): SelectionValue {
  if (field.type === "multi") return [];
  return field.options[0] ?? "";
}

function buildSummaryLine(field: ServiceConfiguratorField, selection: SelectionValue): string {
  if (field.type === "multi") {
    const values = Array.isArray(selection) ? selection : [];
    return `${field.label} : ${values.length ? values.join(", ") : "Aucune sélection"}`;
  }
  const value = typeof selection === "string" ? selection : "";
  return `${field.label} : ${value || "Non défini"}`;
}

export function ServiceConfigurator({ title, intro, header, fields, onSummaryChange }: ServiceConfiguratorProps) {
  const [selections, setSelections] = useState<Record<string, SelectionValue>>(() =>
    Object.fromEntries(fields.map((field) => [field.id, defaultSelectionForField(field)])),
  );

  useEffect(() => {
    const lines = fields.map((field) => buildSummaryLine(field, selections[field.id]));
    onSummaryChange([header, ...lines].join("\n"));
  }, [fields, header, onSummaryChange, selections]);

  const preview = useMemo(() => {
    return fields.map((field) => buildSummaryLine(field, selections[field.id]));
  }, [fields, selections]);

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-5 md:p-6">
      <h2 className="font-service-display text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{intro}</p>

      <div className="mt-5 space-y-5">
        {fields.map((field) => (
          <div key={field.id}>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{field.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {field.options.map((option) => {
                const isSelected =
                  field.type === "multi"
                    ? Array.isArray(selections[field.id]) && selections[field.id].includes(option)
                    : selections[field.id] === option;

                return (
                  <button
                    key={`${field.id}-${option}`}
                    type="button"
                    onClick={() => {
                      setSelections((prev) => {
                        if (field.type === "multi") {
                          const selected = prev[field.id];
                          const current = Array.isArray(selected) ? selected.slice() : [];
                          const exists = current.includes(option);
                          const next = exists ? current.filter((item) => item !== option) : [...current, option];
                          return { ...prev, [field.id]: next };
                        }
                        return { ...prev, [field.id]: option };
                      });
                    }}
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border-strong)] bg-white text-[var(--text-secondary)] hover:border-[var(--primary)]/40",
                    ].join(" ")}
                    aria-pressed={isSelected}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
        <p className="font-service-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
          Aperçu de votre configuration
        </p>
        <div className="mt-2 space-y-1">
          {preview.map((line) => (
            <p key={line} className="text-xs leading-5 text-[var(--text-secondary)]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
