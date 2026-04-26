import type { RefObject } from "react";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import type { Entry, TimelineKind } from "./journey-types";
import { TimelineRow } from "./timeline-row";

export function AlternatingTimeline({ listRef, entries, kind }: { listRef: RefObject<HTMLUListElement | null>; entries: Entry[]; kind: TimelineKind }) {
  const reduceMotion = useReducedMotion();
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
    <div className="relative md:px-2">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-0 -translate-x-1/2 md:block" aria-hidden>
        <div className={cn("absolute inset-y-3 left-1/2 w-1 -translate-x-1/2", railClass)} />
        <div className="absolute inset-y-3 left-1/2 w-1 -translate-x-1/2 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_45%,_transparent),inset_0_-12px_16px_-8px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      <div className="absolute left-[1.05rem] top-3 bottom-3 w-1 md:hidden" aria-hidden>
        <div className={cn("absolute inset-0", railClass)} />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_22px_color-mix(in_oklch,var(--color-primary)_40%,_transparent),inset_0_-10px_14px_-6px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      <ul ref={listRef} className="relative z-[1] space-y-0 pl-10 md:space-y-0 md:pl-0">
        {entries.map((entry, index) => (
          <TimelineRow key={entry.title + entry.period} entry={entry} index={index} total={entries.length} kind={kind} />
        ))}
      </ul>
    </div>
  );
}
