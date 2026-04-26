"use client";

import { useTranslation } from "react-i18next";

import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";

import { ABOUT_STATS } from "./about-data";

export function AboutStatsGrid() {
  const { t } = useTranslation("about");
  return (
    <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
      {ABOUT_STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <MagicCard
            key={stat.id}
            gradientSize={75}
            className="flex flex-col rounded-2xl border border-border/50 bg-card/50 p-4 shadow-sm ring-1 ring-foreground/[0.02] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/25 hover:ring-primary/10 dark:bg-card/35 dark:ring-white/[0.03] sm:p-5"
            innerClassName="bg-card/50 dark:bg-card/35"
          >
            <Icon className="size-4 text-primary/80" aria-hidden />
            <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">{t(`stats.${stat.id}` as "stats.years")}</p>
            <p className="mt-1 flex min-h-[2.5rem] items-baseline gap-0.5 text-2xl font-black tabular-nums tracking-tight text-foreground sm:min-h-[2.75rem] sm:text-3xl">
              {"ticker" in stat ? (
                <>
                  <NumberTicker value={stat.ticker} delay={index * 0.12} className="font-black tracking-tight text-foreground" />
                  <span className="text-primary/90">{stat.suffix}</span>
                </>
              ) : (
                <span className="text-primary/90">{stat.display}</span>
              )}
            </p>
          </MagicCard>
        );
      })}
    </div>
  );
}
