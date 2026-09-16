"use client";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

type MonogramSize = "header" | "splash";

const layout: Record<
  MonogramSize,
  {
    frame: string;
    textSize: string;
  }
> = {
  header: {
    frame: "h-10 w-[3.1rem] sm:h-11 sm:w-[3.5rem]",
    textSize: "text-[1.2rem] sm:text-[1.4rem]",
  },
  splash: {
    frame: "h-[clamp(4rem,12.5vw,5.75rem)] w-[clamp(6.05rem,17vw,4.65rem)] sm:h-[clamp(6.35rem,11.5vw,6.1rem)] sm:w-[clamp(6.25rem,15vw,4.95rem)]",
    textSize: "text-[clamp(1.7rem,6.5vw,2.6rem)]",
  },
};

function useInitials() {
  const { t } = useTranslation("common");
  const raw = t("siteHeader.logoInitials").replace(/\s/g, "");
  const pair = raw.slice(0, 2);
  const left = pair.charAt(0) || "Y";
  const right = pair.charAt(1) || "R";
  return { left, right };
}

function PortfolioMonogramInner({ size, className }: { size: MonogramSize; className?: string }) {
  const { left, right } = useInitials();
  const L = layout[size];

  return (
    <div className={cn("relative isolate flex shrink-0 items-center justify-center overflow-hidden rounded-[0.65rem] sm:rounded-xl", L.frame, className)} aria-hidden>
      {/* Fundo */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit]",
          "bg-gradient-to-br from-muted/70 via-background/92 to-muted/40",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(0,0,0,0.04)]",
          "ring-1 ring-border/55 dark:from-muted/25 dark:via-background/88 dark:to-muted/18",
          "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.35)]",
          "dark:ring-white/[0.08]",
        )}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-70 blur-[1px]"
        style={{
          background: `radial-gradient(120% 80% at 30% 0%, color-mix(in oklch, var(--color-primary) 22%, transparent), transparent 62%)`,
        }}
      />

      {/* Letras.
          A rotação do R (origem no canto inferior direito) e a margem negativa jogam o
          conjunto para a direita e para baixo; o translate devolve o bloco ao centro
          óptico do quadrado. Em `em` para acompanhar os dois tamanhos do monograma. */}
      <div className={cn("absolute inset-0 flex -translate-x-[0.19em] -translate-y-[0.05em] items-center justify-center", L.textSize)}>
        {/* Y */}
        <span className={cn("font-brand-mono leading-none font-bold tracking-[-0.08em] text-foreground/90", L.textSize)}>{left}</span>

        {/* R ajustado */}
        <span
          className={cn(
            "font-brand-mono leading-none font-bold tracking-[-0.08em] text-primary",
            L.textSize,
            "-ml-[0.20em]", // bem mais próximo
            "translate-y-[0.1em]", // levemente mais baixo
            "rotate-[15deg]", // mais tombado
            "origin-bottom-right",
            "drop-shadow-[0_0_18px_color-mix(in_oklch,var(--color-primary)_26%,_transparent)]",
          )}
        >
          {right}
        </span>
      </div>
    </div>
  );
}

/** Monograma YR — header */
export function PortfolioMonogram({ className }: { className?: string }) {
  return <PortfolioMonogramInner size="header" className={className} />;
}

/** Monograma + nome — hero */
export function PortfolioMarkHero({ className }: { className?: string }) {
  const { t } = useTranslation("common");

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <PortfolioMonogramInner size="splash" />

      <p
        className={cn(
          "font-brand-wordmark mt-5 max-w-[min(90vw,28rem)] text-center text-[clamp(0.7rem,2.4vw,0.85rem)] leading-snug font-semibold tracking-[0.38em] text-muted-foreground uppercase",
          "sm:mt-6 sm:tracking-[0.42em]",
        )}
      >
        {t("siteHeader.brand")}
      </p>
    </div>
  );
}
