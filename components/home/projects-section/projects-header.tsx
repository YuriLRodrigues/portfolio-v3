"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

export function ProjectsHeader() {
  const { t } = useTranslation("projects");
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div
          className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
          aria-hidden
        >
          <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">04</span>
        </div>
        <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">{t("kicker")}</p>
      </div>

      <div className="relative mt-8 max-w-4xl sm:mt-10">
        <p
          className="pointer-events-none absolute -left-2 top-1/2 z-0 max-h-[min(32vh,280px)] -translate-y-1/2 select-none overflow-hidden text-ellipsis whitespace-nowrap font-black uppercase leading-none tracking-[-0.04em] text-foreground/[0.055] dark:text-white/[0.07] sm:left-0"
          style={{ fontSize: "clamp(2.25rem, 12vw, 6.5rem)" }}
          aria-hidden
        >
          {t("bgWord")}
        </p>
        <h2 className="relative z-[1] text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.06]">
          {t("titleBefore")} <GradientText variant="primaryBalanced">{t("titleGradient")}</GradientText> {t("titleAfter")}
        </h2>
        <p className="relative z-[1] mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">{t("p")}</p>
      </div>
    </>
  );
}
