"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { motion } from "motion/react";

import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";
import { StackOverviewAside } from "./stack-overview-aside";

export function TechnologiesHeader({ stackPct, totalTechs }: { stackPct: number; totalTechs: number }) {
  const { t } = useTranslation("technologies");
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_minmax(0,0.55fr)] lg:items-end lg:gap-16">
      <div className="min-w-0">
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
            className="grid size-11 shrink-0 cursor-default place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.16] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_24%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">02</span>
          </motion.div>
          <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">{t("sectionKicker")}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.65, delay: 0.12, ease: sectionEase }}
          className="mt-6 max-w-xl font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:text-xs"
        >
          {t("sectionSubtitle")}
        </motion.p>
        <motion.h2
          id="technologies-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.72, delay: 0.2, ease: sectionEase }}
          className="mt-3 text-balance font-black tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.15rem)", lineHeight: 1.06 }}
        >
          {t("titleLine1")}
          <GradientText variant="primarySoft">{t("titleGradient")}</GradientText> {t("titleLine2")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.66, delay: 0.32, ease: sectionEase }}
          className="mt-5 max-w-2xl text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-[1.02rem]"
        >
          {t("p")}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.74, delay: 0.18, ease: sectionEase }}
        className="min-w-0"
      >
        <StackOverviewAside stackPct={stackPct} totalTechs={totalTechs} />
      </motion.div>
    </div>
  );
}
