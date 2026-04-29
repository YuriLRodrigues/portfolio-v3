/**
 * "Riscos" em diagonal com brilho de lanterna, usando a cor de destaque e variações.
 */
export function HeroFlashStrokes() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      <div
        className="absolute -right-[12%] top-[2%] h-[1px] w-[min(120vw,80rem)] origin-right rotate-[142deg] opacity-90"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            color-mix(in oklch, var(--color-primary) 8%, transparent) 18%,
            color-mix(in oklch, var(--color-primary) 95%, white) 48%,
            color-mix(in oklch, var(--color-primary) 45%, transparent) 72%,
            transparent 100%)`,
          boxShadow: `0 0 24px 2px color-mix(in oklch, var(--color-primary) 55%, transparent), 0 0 64px 8px color-mix(in oklch, var(--color-primary) 20%, transparent)`,
        }}
      />
      <div
        className="absolute -left-[8%] top-[32%] h-[1px] w-[min(110vw,70rem)] origin-left -rotate-[18deg] opacity-75"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            color-mix(in oklch, var(--color-primary) 55%, var(--color-ring)) 40%,
            color-mix(in oklch, var(--color-primary) 20%, transparent) 88%,
            transparent 100%)`,
          boxShadow: `0 0 16px 1px color-mix(in oklch, var(--color-primary) 40%, transparent), 0 0 40px 6px color-mix(in oklch, var(--color-primary) 15%, transparent)`,
        }}
      />
      <div
        className="absolute left-[4%] bottom-[6%] h-[1px] w-[min(95vw,64rem)] origin-left rotate-[32deg] opacity-60"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            color-mix(in oklch, var(--color-primary) 28%, var(--color-ring)) 28%,
            color-mix(in oklch, var(--color-primary) 72%, var(--color-background)) 58%,
            color-mix(in oklch, var(--color-primary) 18%, transparent) 82%,
            transparent 100%)`,
          boxShadow: `0 0 20px 1px color-mix(in oklch, var(--color-primary) 35%, transparent)`,
        }}
      />
      <div
        className="absolute -right-[4%] top-[55%] h-[1px] w-[min(75vw,48rem)] origin-right -rotate-[52deg] opacity-50"
        style={{
          background: `linear-gradient(90deg,
            transparent 0%,
            color-mix(in oklch, var(--color-primary) 50%, transparent) 48%,
            color-mix(in oklch, var(--color-primary) 38%, var(--color-foreground)) 72%,
            transparent 100%)`,
          boxShadow: `0 0 12px 1px color-mix(in oklch, var(--color-primary) 30%, transparent)`,
        }}
      />
    </div>
  );
}
