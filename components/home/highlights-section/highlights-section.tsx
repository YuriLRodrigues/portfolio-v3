"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { motion } from "motion/react";

import { SectionBackground } from "../section-background";
import { sectionMotionViewport } from "../section-motion";
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
    <section id="highlights" className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28" aria-labelledby="highlights-heading">
      <SectionBackground variant="aurora" anchor="topRight" />

      <Container className="relative z-10">
        <HighlightsHeader />

        <motion.ul
          className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={sectionMotionViewport}
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
