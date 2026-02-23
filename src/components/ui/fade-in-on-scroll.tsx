"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
};

export function FadeInOnScroll({ children, delay = 0, direction = "up", className }: FadeInOnScrollProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
