"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { PortfolioMonogram } from "@/components/brand/portfolio-mark";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type PortfolioLoadingViewProps = {
  className?: string;
  /** Quanto tempo o contador leva até 100. Deve casar com o auto-hide do splash. */
  durationMs?: number;
};

const BOOT_STEPS = ["theme", "journey", "projects", "covers"] as const;

/**
 * Boot em terminal: as linhas vão sendo marcadas enquanto o contador sobe até 100%.
 * Visual compartilhado por `app/loading` e pelo splash inicial.
 */
export function PortfolioLoadingView({ className, durationMs = 2400 }: PortfolioLoadingViewProps) {
  const { t } = useTranslation("common");
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(reducedMotion ? 100 : 0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const start = performance.now();
    const tick = (now: number) => {
      const linear = Math.min(1, (now - start) / durationMs);
      // Sobe rápido e desacelera no fim — parece carregamento real, não régua.
      const eased = 1 - (1 - linear) ** 2.4;
      setProgress(Math.round(eased * 100));
      if (linear < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [durationMs, reducedMotion]);

  // Uma linha do boot é marcada a cada 25% do progresso.
  const doneSteps = Math.floor((progress / 100) * BOOT_STEPS.length);

  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] flex-col items-center justify-center gap-9 overflow-hidden bg-background px-6",
        "bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent_55%)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative z-[1] flex flex-col items-center gap-3.5">
        <PortfolioMonogram className="shadow-[0_24px_60px_-30px_color-mix(in_oklch,var(--color-primary)_55%,_transparent)]" />
        <p className="font-mono text-[10px] font-semibold tracking-[0.36em] text-muted-foreground uppercase">{t("siteHeader.brand")}</p>
      </div>

      <div className="relative z-[1] w-full max-w-[32rem] overflow-hidden rounded-2xl border border-border/55 bg-card/70 shadow-[0_28px_80px_-40px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:bg-card/55">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/35 px-4 py-2.5 dark:bg-muted/15">
          <span className="size-2.5 rounded-full bg-destructive/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-yellow-500/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-green-500/80" aria-hidden />
          <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">{t("splash.window")}</span>
        </div>

        <ul className="flex flex-col gap-1 px-4 py-4 font-mono text-[11.5px] leading-relaxed sm:text-xs">
          {BOOT_STEPS.map((step, index) => {
            const done = index < doneSteps;
            return (
              <li key={step} className={cn("flex items-baseline gap-2.5 transition-opacity duration-300", index <= doneSteps ? "opacity-100" : "opacity-35")}>
                <span className="shrink-0 font-bold text-primary" aria-hidden>
                  ›
                </span>
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{t(`splash.steps.${step}` as never) as string}</span>
                <span className={cn("shrink-0 font-bold tabular-nums", done ? "text-green-500 dark:text-green-400" : "text-primary")} aria-hidden>
                  {done ? "ok" : "…"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative z-[1] flex w-full max-w-[32rem] flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase">{t("splash.loading")}</p>
          <p className="font-mono text-2xl font-black tracking-[-0.03em] text-primary tabular-nums sm:text-[1.75rem]">
            {progress}
            <span className="text-base font-bold sm:text-lg">%</span>
          </p>
        </div>

        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-border/70"
          role="progressbar"
          aria-label={t("splash.progress")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_20px_color-mix(in_oklch,var(--color-primary)_55%,_transparent)] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
