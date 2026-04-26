"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { motion } from "motion/react";

import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";

export function HighlightsHeader() {
  const { t } = useTranslation("highlights");
  return (
    <div className="max-w-2xl">
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
          <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">03</span>
        </motion.div>
        <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">{t("kicker")}</p>
      </motion.div>
      <motion.h2
        id="highlights-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.72, delay: 0.14, ease: sectionEase }}
        className="mt-5 text-balance text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
      >
        {t("titleBefore")} <GradientText variant="primaryBalanced">{t("titleGradient")}</GradientText>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.64, delay: 0.26, ease: sectionEase }}
        className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        {t("p")}
      </motion.p>
    </div>
  );
}
