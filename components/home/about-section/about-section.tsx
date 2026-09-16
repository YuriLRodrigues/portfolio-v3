"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { motion } from "motion/react";

import { SectionBackground } from "../section-background";
import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";
import { AboutEditorialColumn } from "./about-editorial-column";
import { AboutStackAside } from "./about-stack-aside";

/**
 * Sobre — layout próprio (coluna editorial + métricas em cartões + stack em destaque),
 * sem copiar a hierarquia visual da referência (marca d’água gigante, INTRO/NO., lista tabular).
 */
export function AboutSection() {
  const { t } = useTranslation("about");
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28">
      <SectionBackground variant="mesh" anchor="topRight" />

      <Container className="relative z-10">
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
            <span className="font-mono text-[11px] font-bold text-primary tabular-nums sm:text-xs">01</span>
          </motion.div>
          <div className="h-px max-w-[6rem] min-w-[2.5rem] flex-1 bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-primary uppercase sm:text-[11px]">{t("sectionKicker")}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.65, delay: 0.12, ease: sectionEase }}
          className="mt-6 max-w-xl font-mono text-[11px] leading-relaxed font-medium tracking-[0.18em] text-muted-foreground uppercase sm:text-xs"
        >
          {t("sectionSubtitle")}
        </motion.p>

        <div className="mt-8 grid gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionMotionViewport}
            transition={{ duration: 0.72, delay: 0.06, ease: sectionEase }}
            className="min-w-0"
          >
            <AboutEditorialColumn />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionMotionViewport}
            transition={{ duration: 0.74, delay: 0.22, ease: sectionEase }}
            className="min-w-0"
          >
            <AboutStackAside />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
