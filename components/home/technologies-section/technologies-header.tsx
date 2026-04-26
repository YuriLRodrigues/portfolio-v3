"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { StackOverviewAside } from "./stack-overview-aside";

export function TechnologiesHeader({ stackPct, totalTechs }: { stackPct: number; totalTechs: number }) {
  const { t } = useTranslation("technologies");
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_minmax(0,0.55fr)] lg:items-end lg:gap-16">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.16] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_24%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">02</span>
          </div>
          <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">{t("sectionKicker")}</p>
        </div>

        <p className="mt-6 max-w-xl font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:text-xs">{t("sectionSubtitle")}</p>
        <h2
          id="technologies-heading"
          className="mt-3 text-balance font-black tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.15rem)", lineHeight: 1.06 }}
        >
          {t("titleLine1")}
          <GradientText variant="primarySoft">{t("titleGradient")}</GradientText> {t("titleLine2")}
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-[1.02rem]">{t("p")}</p>
      </div>

      <StackOverviewAside stackPct={stackPct} totalTechs={totalTechs} />
    </div>
  );
}
