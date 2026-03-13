"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { resolvePathForLocale, splitLocalePath, type SupportedLocale } from "@/lib/i18n/slug-map";

const localeOptions: Array<{ locale: SupportedLocale; flag: string; label: string }> = [
  { locale: "fr", flag: "🇫🇷", label: "Français" },
  { locale: "en", flag: "🇬🇧", label: "English" },
  { locale: "de", flag: "🇩🇪", label: "Deutsch" },
  { locale: "nl", flag: "🇳🇱", label: "Nederlands" },
];

type LanguageSwitcherProps = {
  mobile?: boolean;
};

export function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentLocale = splitLocalePath(pathname).locale;

  const items = useMemo(() => {
    return localeOptions
      .map((option) => {
        const resolved = resolvePathForLocale(pathname, option.locale);
        return {
          ...option,
          href: resolved.path,
          found: resolved.found,
          pageId: resolved.pageId,
        };
      })
      .filter((item) => item.locale === currentLocale || item.found);
  }, [pathname, currentLocale]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    items.forEach((item) => {
      if (!item.found && item.locale !== currentLocale) {
        // eslint-disable-next-line no-console
        console.warn(
          `[LanguageSwitcher] slug map missing target locale path (from ${pathname} to ${item.locale}) for pageId=${item.pageId ?? "unknown"}. Falling back to locale home.`,
        );
      }
    });
  }, [items, currentLocale, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  const active = items.find((item) => item.locale === currentLocale) ?? items[0];

  return (
    <div ref={rootRef} className={["relative", mobile ? "w-full" : ""].join(" ")}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={[
          "inline-flex min-h-[40px] items-center justify-between gap-2 rounded-full border border-neutral-200 bg-white px-3 text-sm font-semibold text-devlo-900 transition hover:border-devlo-700/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
          mobile ? "w-full" : "",
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-2">
          <span aria-hidden>{active.flag}</span>
          <span>{active.label}</span>
        </span>
        <ChevronDown className={["h-4 w-4 text-devlo-700 transition-transform", isOpen ? "rotate-180" : ""].join(" ")} />
      </button>

      <div
        role="listbox"
        className={[
          "z-[75] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-panel",
          mobile ? "mt-2" : "absolute right-0 top-full mt-2 min-w-[190px]",
          isOpen ? "block" : "hidden",
        ].join(" ")}
      >
        <ul className="p-1.5">
          {items.map((item) => {
            const isCurrent = item.locale === currentLocale;
            return (
              <li key={item.locale}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "flex min-h-[42px] items-center gap-2 rounded-xl px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-devlo-700 focus-visible:ring-offset-2",
                    isCurrent
                      ? "bg-devlo-700 text-white"
                      : "text-devlo-900 hover:bg-devlo-50",
                  ].join(" ")}
                >
                  <span aria-hidden>{item.flag}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
