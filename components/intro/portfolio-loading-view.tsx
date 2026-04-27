"use client";

import { useTranslation } from "react-i18next";

import { PortfolioMarkHero } from "@/components/brand/portfolio-mark";
import { cn } from "@/lib/utils";

type PortfolioLoadingViewProps = {
  className?: string;
};

/**
 * Visual compartilhado: `app/loading` e splash inicial (logo YR + riscos).
 */
export function PortfolioLoadingView({ className }: PortfolioLoadingViewProps) {
  const { t } = useTranslation("common");
  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] flex-col items-center justify-center gap-10 overflow-hidden bg-background bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,color-mix(in_oklch,var(--color-primary)_18%,transparent),transparent_55%)] px-6",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -right-[20%] top-[18%] h-px w-[min(140vw,90rem)] rotate-[142deg] opacity-90"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in oklch, var(--color-primary) 85%, white), transparent)`,
            boxShadow: `0 0 32px 2px color-mix(in oklch, var(--color-primary) 45%, transparent)`,
          }}
        />
        <div
          className="absolute -left-[12%] top-[48%] h-px w-[min(120vw,75rem)] -rotate-[22deg] opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in oklch, var(--color-primary) 60%, cyan), transparent)`,
            boxShadow: `0 0 24px 1px color-mix(in oklch, var(--color-primary) 30%, transparent)`,
          }}
        />
        <div
          className="absolute bottom-[22%] left-[8%] h-px w-[min(90vw,56rem)] rotate-[28deg] opacity-55"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in oklch, var(--color-primary) 75%, transparent), transparent)`,
          }}
        />
      </div>

      <PortfolioMarkHero className="relative z-[1]" />

      <div className="relative z-[1] flex flex-col items-center gap-3">
        <div className="h-1 w-36 max-w-full overflow-hidden rounded-full bg-border/80" role="progressbar" aria-label={t("splash.progress")} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full w-1/3 min-w-[22%] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-primary shadow-[0_0_20px_color-mix(in_oklch,var(--color-primary)_50%,_transparent)]" />
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">{t("splash.loading")}</p>
      </div>
    </div>
  );
}
