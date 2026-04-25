"use client";

import { usePortfolioAccent } from "@/hooks/use-portfolio-accent";
import { setPortfolioAccentOnDocument } from "@/lib/theme/accent-events";
import { ACCENTS, type AccentId } from "@/lib/theme/accents";
import { cn } from "@/lib/utils";

export function AccentPicker() {
  const active = usePortfolioAccent();

  const select = (id: AccentId) => {
    setPortfolioAccentOnDocument(id);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Cor de destaque">
      {ACCENTS.map(({ id, label, className }) => (
        <button
          key={id}
          type="button"
          title={label}
          aria-label={label}
          aria-pressed={active === id}
          onClick={() => select(id)}
          className={cn(
            "relative flex size-7 items-center justify-center rounded-full border border-border/60 bg-background/80 shadow-sm backdrop-blur-sm transition hover:scale-105 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
            active === id && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          )}
        >
          <span className={cn("size-3.5 rounded-full", id === "neutral" ? "bg-gradient-to-br from-zinc-400 to-zinc-600" : className)} />
        </button>
      ))}
    </div>
  );
}
