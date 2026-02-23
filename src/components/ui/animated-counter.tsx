"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedCounterProps = {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  compactK?: boolean;
};

function formatValue(value: number, compactK: boolean) {
  if (!compactK) {
    return Math.round(value).toLocaleString("fr-CH");
  }

  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`;
  }

  return Math.round(value).toString();
}

export function AnimatedCounter({
  target,
  label,
  prefix = "",
  suffix = "",
  duration = 1.8,
  compactK = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let current = 0;
    const step = target / (duration * 60);
    const timer = window.setInterval(() => {
      current += step;

      if (current >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => window.clearInterval(timer);
  }, [duration, isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-extrabold text-devlo-800 md:text-4xl">
        {prefix}
        {formatValue(count, compactK)}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-neutral-600">{label}</p>
    </div>
  );
}
