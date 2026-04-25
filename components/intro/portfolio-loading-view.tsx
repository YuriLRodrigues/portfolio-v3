import { cn } from "@/lib/utils";

type PortfolioLoadingViewProps = {
  className?: string;
};

/**
 * Visual compartilhado: `app/loading` e splash inicial (logo YR + riscos).
 */
export function PortfolioLoadingView({ className }: PortfolioLoadingViewProps) {
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

      <div className="arizonia-regular relative z-[1] flex items-end gap-2 sm:gap-3">
        {(["Y", "R"] as const).map((ch) => (
          <span
            key={ch}
            className="relative block text-[clamp(3.75rem,17vw,8rem)] leading-[0.82] text-primary [text-shadow:0_0_60px_color-mix(in_oklch,var(--color-primary)_45%,_transparent)]"
          >
            {ch}
            <span className="absolute -bottom-1 left-0 h-1.5 w-full origin-left rounded-sm bg-primary/80 sm:-bottom-0.5 sm:h-2" />
          </span>
        ))}
      </div>

      <div className="relative z-[1] flex flex-col items-center gap-3">
        <div
          className="h-1 w-36 max-w-full overflow-hidden rounded-full bg-border/80"
          role="progressbar"
          aria-label="Progresso de carregamento"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full w-1/3 min-w-[22%] animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-primary shadow-[0_0_20px_color-mix(in_oklch,var(--color-primary)_50%,_transparent)]" />
        </div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">Carregando portfólio</p>
      </div>
    </div>
  );
}
