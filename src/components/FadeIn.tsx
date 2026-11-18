"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const offset = {
    up: { x: 0, y: 100 },
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}