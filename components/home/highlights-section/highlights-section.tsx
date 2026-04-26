"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { motion } from "motion/react";

import { HighlightCard } from "./highlight-card";
import { HIGHLIGHTS } from "./highlights-data";
import { HighlightsHeader } from "./highlights-header";
import { container } from "./motion-variants";

/**
 * Diferenciais — grid 2× / 3×; `GlowingEffect` themed (inactiveZone baixo para o brilho reagir ao centro do cartão).
 */
export function HighlightsSection() {
  const { t } = useTranslation("highlights");
  return (
    <section
      id="highlights"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 60% 45% at 50% -10%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 48%),
          radial-gradient(ellipse 45% 40% at 100% 100%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 50%)
        `,
      }}
      aria-labelledby="highlights-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.24] dark:opacity-[0.15]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 80px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 81px
          )`,
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <HighlightsHeader />

        <motion.ul
          className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
        >
          {HIGHLIGHTS.map((h) => (
            <HighlightCard
              key={h.id}
              title={t(`items.${h.id}.title` as "items.productFirst.title")}
              description={t(`items.${h.id}.description` as "items.productFirst.description")}
              Icon={h.Icon}
              accent={h.accent}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
