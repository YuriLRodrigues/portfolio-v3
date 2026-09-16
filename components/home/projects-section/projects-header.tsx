"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { motion } from "motion/react";

import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";

export function ProjectsHeader() {
  const { t } = useTranslation("projects");
  return (
    <>
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
          <span className="font-mono text-[11px] font-bold text-primary tabular-nums sm:text-xs">04</span>
        </motion.div>
        <div className="h-px max-w-[6rem] min-w-[2.5rem] flex-1 bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
        <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-[11px]">{t("kicker")}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.72, delay: 0.12, ease: sectionEase }}
        className="relative mt-8 max-w-4xl sm:mt-10"
      >
        <p
          className="pointer-events-none absolute top-1/2 -left-2 z-0 max-h-[min(32vh,280px)] -translate-y-1/2 overflow-hidden leading-none font-black tracking-[-0.04em] text-ellipsis whitespace-nowrap text-foreground/[0.055] uppercase select-none sm:left-0 dark:text-white/[0.07]"
          style={{ fontSize: "clamp(2.25rem, 12vw, 6.5rem)" }}
          aria-hidden
        >
          {t("bgWord")}
        </p>
        <h2 className="relative z-[1] text-3xl font-black tracking-[-0.035em] text-balance text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.06]">
          {t("titleBefore")} <GradientText variant="primaryBalanced">{t("titleGradient")}</GradientText> {t("titleAfter")}
        </h2>
        <p className="relative z-[1] mt-4 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:mt-5 sm:text-base">{t("p")}</p>
      </motion.div>
    </>
  );
}
