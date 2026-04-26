"use client";

import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

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
    <section
      id="technologies"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-24 sm:py-32"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 72% at 100% -8%, color-mix(in oklch, var(--primary) 17%, transparent), transparent 54%),
          radial-gradient(ellipse 68% 56% at 0% 102%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 50%),
          radial-gradient(ellipse 55% 48% at 48% 38%, color-mix(in oklch, var(--foreground) 3.2%, transparent), transparent 58%)
        `,
      }}
      aria-labelledby="technologies-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.34] dark:opacity-[0.2]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            118deg,
            transparent,
            transparent 76px,
            color-mix(in oklch, var(--foreground) 2.9%, transparent) 76px,
            color-mix(in oklch, var(--foreground) 2.9%, transparent) 77px
          )`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute -right-8 bottom-12 select-none font-mono text-[clamp(4.5rem,14vw,10rem)] font-black leading-none tracking-[-0.06em] text-foreground/[0.035] dark:text-white/[0.045] sm:right-4 sm:bottom-16"
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
