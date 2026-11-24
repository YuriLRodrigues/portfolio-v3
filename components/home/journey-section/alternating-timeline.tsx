import type { RefObject } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import type { Entry, TimelineKind } from "./journey-types";
import { TimelineRow } from "./timeline-row";

/**
 * Linha do tempo. Container largo (64rem+): alternada, com o trilho no meio e o número grande do lado oposto.
 * Container estreito: coluna única, trilho à esquerda, marcador por item e o card ocupando a largura toda.
 */
export function AlternatingTimeline({ listRef, entries, kind }: { listRef: RefObject<HTMLUListElement | null>; entries: Entry[]; kind: TimelineKind }) {
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.72", "end 0.38"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 10000 : 220,
    damping: reduceMotion ? 100 : 32,
    mass: reduceMotion ? 0.05 : 0.22,
  });
  const lineScale = useTransform(lineProgress, (p) => Math.min(1, Math.max(0, p * 1.15 + 0.12)));

  const railClass =
    "rounded-full bg-muted/55 ring-1 ring-border/70 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,_transparent)] dark:bg-muted/25 dark:ring-border/50";

  return (
    <div className="@container/timeline relative @min-[64rem]/timeline:px-2">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-0 -translate-x-1/2 @min-[64rem]/timeline:block" aria-hidden>
        <div className={cn("absolute inset-y-3 left-1/2 w-1 -translate-x-1/2", railClass)} />
        <div className="absolute inset-y-3 left-1/2 w-1 -translate-x-1/2 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_45%,_transparent),inset_0_-12px_16px_-8px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      <div className="absolute top-3 bottom-3 left-[1.05rem] w-1 @min-[64rem]/timeline:hidden" aria-hidden>
        <div className={cn("absolute inset-0", railClass)} />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_22px_color-mix(in_oklch,var(--color-primary)_40%,_transparent),inset_0_-10px_14px_-6px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      <ul ref={listRef} className="relative z-[1] space-y-0 pl-11 @min-[64rem]/timeline:pl-0">
        {entries.map((entry, index) => (
          <TimelineRow key={entry.title + entry.period} entry={entry} index={index} total={entries.length} kind={kind} />
        ))}
      </ul>
    </div>
  );
}
