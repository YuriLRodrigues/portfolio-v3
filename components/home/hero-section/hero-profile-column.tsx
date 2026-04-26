"use client";

import { motion } from "motion/react";

import { CoderProfileCard } from "./coder-profile-card";

export function HeroProfileColumn() {
  return (
    <motion.div
      className="relative min-h-[220px] w-full"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl border border-primary/30 shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-primary)_20%,_transparent),inset_0_0_60px_color-mix(in_oklch,var(--color-primary)_8%,_transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -inset-3 -z-20 rounded-3xl opacity-50 [background:radial-gradient(ellipse_at_50%_30%,color-mix(in_oklch,var(--color-primary)_22%,_transparent),transparent_65%)]"
        aria-hidden
      />
      <CoderProfileCard />
    </motion.div>
  );
}
