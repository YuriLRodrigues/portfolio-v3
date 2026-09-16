"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { SectionBackground } from "../section-background";
import { PipelineDecor } from "./pipeline-decor";
import { STACK_DENSITY_REF, totalTechs } from "./stack-data";
import { StackPanels } from "./stack-panels";
import { TechnologiesHeader } from "./technologies-header";

/**
 * Stack por domínio (front, back, ferramentas) — painéis com marca d’água, trilho de cor, tiles e pipeline visual.
 */
export function TechnologiesSection() {
  const { t } = useTranslation("technologies");
  const stackPct = Math.min(100, Math.round((totalTechs / STACK_DENSITY_REF) * 100));

  return (
    <section id="technologies" className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-24 sm:py-32" aria-labelledby="technologies-heading">
      <SectionBackground variant="mesh" anchor="bottomLeft" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute -right-8 bottom-12 font-mono text-[clamp(4.5rem,14vw,10rem)] leading-none font-black tracking-[-0.06em] text-foreground/[0.035] select-none sm:right-4 sm:bottom-16 dark:text-white/[0.045]"
        aria-hidden
      >
        {t("stackWatermark")}
      </div>

      <Container className="relative z-10">
        <TechnologiesHeader stackPct={stackPct} totalTechs={totalTechs} />
        <PipelineDecor className="mt-14 sm:mt-16" />
        <StackPanels />
      </Container>
    </section>
  );
}
