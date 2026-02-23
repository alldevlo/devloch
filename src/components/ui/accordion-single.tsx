"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Item = {
  question: string;
  answer: string;
};

type AccordionSingleProps = {
  items: Item[];
  defaultOpenIndex?: number;
  className?: string;
};

export function AccordionSingle({ items, defaultOpenIndex = 0, className = "" }: AccordionSingleProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  return (
    <div className={["space-y-3", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <article key={item.question} className="rounded-xl border border-neutral-200 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
              onClick={() => setOpenIndex(open ? -1 : index)}
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-devlo-900 md:text-base">{item.question}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-neutral-600 md:text-base">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
