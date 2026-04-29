import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

import { easeOut } from "./journey-motion";

export function NumberMilestone({ index, total, highlighted, compact }: { index: number; total: number; highlighted: boolean; compact?: boolean }) {
  const n = String(index + 1).padStart(2, "0");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("group/index flex flex-col items-center", compact ? "py-1" : "py-2")}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: compact ? 6 : 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.48, ease: easeOut, delay: index * 0.04 }}
    >
      <motion.div
        className={cn(
          "relative grid cursor-default place-items-center rounded-2xl border-2 bg-gradient-to-br font-mono font-black tabular-nums tracking-tighter shadow-lg",
          "transition-[border-color,color,box-shadow,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact ? "size-16 text-lg" : "size-[4.25rem] text-xl sm:size-24 sm:text-3xl",
          "from-background via-card to-background/80",
          highlighted
            ? "border-primary text-primary shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-primary)_40%,_transparent),0_16px_48px_-16px_color-mix(in_oklch,var(--color-primary)_45%,_transparent)]"
            : "border-border/55 text-muted-foreground shadow-black/[0.06] dark:shadow-black/25",
          "group-hover/index:border-primary/50 group-hover/index:shadow-[0_14px_44px_-20px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]",
        )}
        style={{ transformOrigin: "50% 50%" }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -4,
                scale: 1.045,
                transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.72 },
              }
        }
        whileTap={reduceMotion ? undefined : { scale: 0.97, transition: { duration: 0.1, ease: easeOut } }}
      >
        <span className="relative z-[1] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/index:scale-105">{n}</span>
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 ease-out",
            highlighted && "opacity-100 [background:radial-gradient(circle_at_28%_18%,color-mix(in_oklch,var(--primary)_28%,_transparent),transparent_62%)]",
            "group-hover/index:opacity-100 group-hover/index:[background:radial-gradient(circle_at_32%_22%,color-mix(in_oklch,var(--primary)_20%,_transparent),transparent_58%)]",
          )}
          aria-hidden
        />
      </motion.div>
      <span className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/75 transition-[color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/index:text-primary group-hover/index:opacity-100">
        {n}/{String(total).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
