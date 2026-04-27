"use client";

import { useTranslation } from "react-i18next";

import { Sparkles } from "lucide-react";

export function StackOverviewAside({ totalTechs, stackPct }: { totalTechs: number; stackPct: number }) {
  const { t } = useTranslation("technologies");
  return (
    <aside className="relative my-auto overflow-hidden rounded-2xl border border-border/55 bg-gradient-to-br from-card/80 via-card/50 to-background/40 p-5 shadow-[0_20px_56px_-28px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_28px_72px_-32px_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] motion-reduce:transition-[border-color,box-shadow,transform] motion-reduce:duration-[420ms] motion-reduce:ease-out motion-reduce:hover:-translate-y-0.5 dark:from-card/45 dark:via-card/28 dark:to-background/25 dark:shadow-black/50">
      <div className="pointer-events-none absolute -right-14 -top-24 size-52 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-36 rounded-tr-[100%] bg-foreground/[0.04] blur-2xl dark:bg-white/[0.06]" aria-hidden />
      <div className="relative flex items-center gap-2 text-primary">
        <Sparkles className="size-5 shrink-0" aria-hidden />
        <span className="text-sm font-semibold tracking-tight text-foreground">{t("overview.title")}</span>
      </div>
      <div className="relative mt-5 space-y-3 border-t border-border/35 pt-4 dark:border-white/[0.06]">
        <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">{t("overview.sub")}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
            <span>{t("overview.countLabel")}</span>
            <span className="tabular-nums text-foreground">{totalTechs}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted/50 ring-1 ring-inset ring-black/[0.04] dark:bg-muted/25 dark:ring-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_12px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] transition-[width] duration-700 ease-out"
              style={{ width: `${stackPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
            <span>{t("overview.barLabel")}</span>
            <span className="tabular-nums text-foreground">3</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted/50 ring-1 ring-inset ring-black/[0.04] dark:bg-muted/25 dark:ring-white/[0.06]">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-muted-foreground/35 via-primary/40 to-primary/70 opacity-90" />
          </div>
        </div>
      </div>
    </aside>
  );
}
