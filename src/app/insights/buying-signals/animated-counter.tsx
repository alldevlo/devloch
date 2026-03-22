"use client";

import { useState, useEffect } from "react";

export function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const totalSteps = 60;
    const intervalMs = 30; // 60 * 30 = 1800ms total
    let step = 0;

    const id = setInterval(() => {
      step++;
      setCount(Math.round((step / totalSteps) * target));
      if (step >= totalSteps) {
        clearInterval(id);
        setCount(target);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Subtle radial glow behind the number */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "-2rem",
          zIndex: 0,
          background:
            "radial-gradient(circle, #074f74 0%, transparent 70%)",
          opacity: 0.07,
        }}
        aria-hidden="true"
      />
      <span
        className="relative font-black tabular-nums"
        style={{
          fontSize: "clamp(5rem, 12vw, 10rem)",
          lineHeight: 0.9,
          color: "#074f74",
        }}
      >
        {count}
      </span>
    </div>
  );
}
