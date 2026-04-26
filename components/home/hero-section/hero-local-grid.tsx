import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

import { cn } from "@/lib/utils";

type HeroLocalGridProps = {
  className?: string;
};

/**
 * Grade de fundo da hero (SVG reativo ao hover na seção e ao tema) —
 * [Interactive Grid Pattern](https://magicui.design/docs/components/interactive-grid-pattern).
 */
export function HeroLocalGrid({ className }: HeroLocalGridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        // Máscara suave: mesmo conceito do demo Magic UI
        "[mask-image:radial-gradient(ellipse_100%_75%_at_50%_12%,#000_22%,transparent_68%)]",
        "dark:[mask-image:radial-gradient(ellipse_100%_80%_at_50%_10%,#000_18%,transparent_70%)]",
        className,
      )}
      aria-hidden
    >
      <div className={cn("absolute inset-x-0 -top-[8%] h-[120%] w-full -skew-y-2 opacity-90 sm:-top-[6%] sm:h-[115%] dark:opacity-[0.88]")}>
        <InteractiveGridPattern width={28} height={28} squares={[40, 28]} className="text-foreground/5 dark:opacity-95" />
      </div>
    </div>
  );
}
