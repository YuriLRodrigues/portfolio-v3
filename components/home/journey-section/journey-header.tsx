"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { motion } from "motion/react";

import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";

export function JourneyHeader() {
  const { t } = useTranslation("journey");
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.68, ease: sectionEase }}
        className="flex flex-wrap items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          transition={sectionHoverTransition}
          className="grid size-11 shrink-0 cursor-default place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
          aria-hidden
        >
          <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">05</span>
        </motion.div>
        <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">{t("kicker")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.72, delay: 0.12, ease: sectionEase }}
        className="mt-5 sm:mt-6"
      >
        <h2 id="journey-heading" className="text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.55rem] lg:leading-[1.08]">
          {t("titleBefore")} <GradientText variant="primaryBalanced">{t("titleGradient")}</GradientText>
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">{t("intro")}</p>
      </motion.div>
    </div>
  );
}
