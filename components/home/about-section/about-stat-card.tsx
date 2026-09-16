"use client";

import { useTranslation } from "react-i18next";

import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";

import { cn } from "@/lib/utils";

import { type AboutStat, type AboutStatId } from "./about-data";

/** Acentos derivados só de tokens do tema (`data-accent`, light/dark). */
const STAT_THEME: Record<
  AboutStatId,
  {
    magic: {
      gradientSize: number;
      gradientFrom: string;
      gradientTo: string;
      gradientColor: string;
      gradientOpacity: number;
      innerClassName: string;
    };
    iconShell: string;
    gridBg: string;
    rail: string;
    footLine: string;
    monoAccent: string;
    numberGlow: string;
  }
> = {
  years: {
    magic: {
      gradientSize: 108,
      gradientFrom: "color-mix(in oklch, var(--primary) 52%, transparent)",
      gradientTo: "color-mix(in oklch, var(--card) 90%, transparent)",
      gradientColor: "color-mix(in oklch, var(--primary) 34%, transparent)",
      gradientOpacity: 0.5,
      innerClassName: "bg-gradient-to-br from-card/96 via-card/80 to-background/35 backdrop-blur-[2px] dark:from-card/78 dark:via-card/55 dark:to-background/28",
    },
    iconShell:
      "border-primary/35 bg-gradient-to-br from-primary/[0.2] via-primary/[0.08] to-transparent shadow-[0_0_28px_-6px_color-mix(in_oklch,var(--color-primary)_32%,_transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary-foreground)_10%,_transparent)]",
    gridBg:
      "[background-image:linear-gradient(color-mix(in_oklch,var(--foreground)_6%,_transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklch,var(--foreground)_6%,_transparent)_1px,transparent_1px)] [background-size:14px_14px]",
    rail: "from-primary via-primary/65 to-transparent shadow-[0_0_18px_color-mix(in_oklch,var(--color-primary)_42%,_transparent)]",
    footLine: "from-transparent via-primary/35 to-transparent",
    monoAccent: "text-primary",
    numberGlow: "drop-shadow-[0_2px_18px_color-mix(in_oklch,var(--color-primary)_36%)]",
  },
  projects: {
    magic: {
      gradientSize: 112,
      gradientFrom: "color-mix(in oklch, var(--ring) 48%, transparent)",
      gradientTo: "color-mix(in oklch, var(--card) 90%, transparent)",
      gradientColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
      gradientOpacity: 0.5,
      innerClassName: "bg-gradient-to-br from-card/96 via-card/78 to-background/38 backdrop-blur-[2px] dark:from-card/76 dark:via-card/52 dark:to-background/26",
    },
    iconShell:
      "border-ring/40 bg-gradient-to-br from-primary/[0.14] via-ring/[0.1] to-transparent shadow-[0_0_28px_-6px_color-mix(in_oklch,var(--color-ring)_28%,_transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary-foreground)_8%,_transparent)]",
    gridBg:
      "[background-image:repeating-linear-gradient(-18deg,transparent,transparent_11px,color-mix(in_oklch,var(--foreground)_5%,_transparent)_11px,color-mix(in_oklch,var(--foreground)_5%,_transparent)_12px)]",
    rail: "from-ring via-primary/55 to-transparent shadow-[0_0_18px_color-mix(in_oklch,var(--color-ring)_35%,_transparent)]",
    footLine: "from-transparent via-ring/40 to-transparent",
    monoAccent: "text-ring",
    numberGlow: "drop-shadow-[0_2px_18px_color-mix(in_oklch,var(--color-primary)_30%),0_0_22px_color-mix(in_oklch,var(--color-ring)_20%,_transparent)]",
  },
  companies: {
    magic: {
      gradientSize: 118,
      gradientFrom: "color-mix(in oklch, var(--primary) 58%, var(--muted-foreground))",
      gradientTo: "color-mix(in oklch, var(--card) 88%, transparent)",
      gradientColor: "color-mix(in oklch, var(--primary) 26%, transparent)",
      gradientOpacity: 0.52,
      innerClassName: "bg-gradient-to-br from-card/97 via-card/76 to-background/40 backdrop-blur-[2px] dark:from-card/80 dark:via-card/54 dark:to-background/28",
    },
    iconShell:
      "border-primary/30 bg-gradient-to-br from-muted/50 via-primary/[0.12] to-transparent shadow-[0_0_30px_-8px_color-mix(in_oklch,var(--color-primary)_28%,_transparent),inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary-foreground)_10%,_transparent)]",
    gridBg:
      "[background-image:radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--foreground)_8%,_transparent)_0,transparent_42%),radial-gradient(circle_at_80%_90%,color-mix(in_oklch,var(--primary)_12%,_transparent)_0,transparent_45%)]",
    rail: "from-primary via-muted-foreground/45 to-primary/25 shadow-[0_0_20px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]",
    footLine: "from-transparent via-primary/32 to-transparent",
    monoAccent: "text-primary/90",
    numberGlow: "drop-shadow-[0_2px_20px_color-mix(in_oklch,var(--color-primary)_26%),0_0_20px_color-mix(in_oklch,var(--color-muted-foreground)_18%,_transparent)]",
  },
};

export function AboutStatCard({ stat, index }: { stat: AboutStat; index: number }) {
  const { t } = useTranslation("about");
  const theme = STAT_THEME[stat.id];
  const Icon = stat.icon;
  const slot = String(index + 1).padStart(2, "0");

  return (
    <MagicCard
      mode="gradient"
      gradientSize={theme.magic.gradientSize}
      gradientFrom={theme.magic.gradientFrom}
      gradientTo={theme.magic.gradientTo}
      gradientColor={theme.magic.gradientColor}
      gradientOpacity={theme.magic.gradientOpacity}
      innerClassName={theme.magic.innerClassName}
      className={cn(
        "relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border/45 p-0 shadow-md ring-1 ring-white/[0.04] transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ring-inset hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_22px_50px_-28px_color-mix(in_oklch,var(--color-primary)_28%,_transparent)] motion-reduce:transition-[border-color,box-shadow] motion-reduce:duration-[420ms] motion-reduce:ease-out motion-reduce:hover:-translate-y-0.5 motion-reduce:hover:scale-[1.01] dark:border-border/40 dark:ring-white/[0.05]",
      )}
    >
      <div className="relative z-40 flex h-full min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className={cn("pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]", theme.gridBg)} aria-hidden />

        <div className="pointer-events-none absolute -top-10 -right-8 size-28 rounded-full bg-primary/[0.07] blur-2xl dark:bg-primary/[0.12]" aria-hidden />

        <div className="relative flex items-start justify-between gap-5">
          <div className="flex min-w-0 flex-1 gap-3">
            <div className={cn("mt-1 h-[3.25rem] w-1 shrink-0 rounded-full bg-gradient-to-b", theme.rail)} aria-hidden />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-center gap-2">
                <span className={cn("font-mono text-[9px] font-bold tracking-[0.2em] tabular-nums sm:text-[10px]", theme.monoAccent)}>{slot}</span>
                <span className="h-px max-w-[3rem] min-w-[1.25rem] flex-1 bg-gradient-to-r from-border/60 to-transparent" aria-hidden />
              </div>
              <p className="mt-2.5 font-mono text-[10px] leading-snug font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.18em]">
                {t(`stats.${stat.id}` as "stats.years")}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "relative grid size-11 shrink-0 place-items-center rounded-2xl border p-2.5 sm:size-12 sm:p-3",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:before:opacity-100 motion-reduce:before:duration-300 motion-reduce:before:ease-out",
              "before:bg-[conic-gradient(from_200deg_at_50%_50%,transparent,color-mix(in_oklch,var(--primary)_35%,_transparent),transparent)]",
              theme.iconShell,
            )}
          >
            <Icon className="relative z-[1] size-[1.05rem] text-foreground/90 sm:size-[1.15rem]" aria-hidden />
          </div>
        </div>

        <div className="relative mt-auto flex flex-1 items-end pt-4 sm:pt-5">
          <div className="flex w-full items-baseline gap-1">
            {typeof stat.ticker === "number" ? (
              <>
                <NumberTicker
                  value={stat.ticker}
                  delay={index * 0.12}
                  className={cn(
                    "font-black tracking-[-0.04em] text-foreground tabular-nums dark:text-foreground",
                    theme.numberGlow,
                    "text-[clamp(1.85rem,4.5vw,2.35rem)] leading-[0.95]",
                  )}
                />
                {stat.suffix ? (
                  <span className="bg-gradient-to-br from-primary via-primary/85 to-primary/60 bg-clip-text pb-0.5 text-2xl font-black text-transparent tabular-nums sm:text-[1.85rem]">
                    {stat.suffix}
                  </span>
                ) : null}
              </>
            ) : (
              <span
                className={cn(
                  "bg-gradient-to-br from-primary via-ring to-primary/75 bg-clip-text font-black tracking-tight text-transparent tabular-nums",
                  "animate-[pulse_3.2s_ease-in-out_infinite]",
                  theme.numberGlow,
                )}
                style={{ fontSize: "clamp(2rem,5vw,2.6rem)", lineHeight: 1 }}
              >
                {stat.display}
              </span>
            )}
          </div>
        </div>

        <div className={cn("pointer-events-none mt-4 h-px w-full bg-gradient-to-r opacity-90", theme.footLine)} aria-hidden />
      </div>
    </MagicCard>
  );
}
