import { useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";

import { ExperienceCard } from "./experience-card";
import { easeOut } from "./journey-motion";
import type { Entry, TimelineKind } from "./journey-types";
import { NumberMilestone } from "./number-milestone";

export function TimelineRow({ entry, index, total, kind }: { entry: Entry; index: number; total: number; kind: TimelineKind }) {
  const rowRef = useRef<HTMLLIElement>(null);
  /** Só colore o marco quando boa parte da linha já está na viewport (evita primary “cedo demais”). */
  const milestoneHighlighted = useInView(rowRef, {
    amount: 0.58,
    margin: "0px 0px -18% 0px",
  });
  const even = index % 2 === 0;

  return (
    <li ref={rowRef} className="relative py-5 @min-[64rem]/timeline:py-14">
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 z-[3] hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background shadow-md transition-[background-color,box-shadow] duration-700 ease-out @min-[64rem]/timeline:block",
          milestoneHighlighted
            ? "bg-primary shadow-[0_0_0_6px_color-mix(in_oklch,var(--color-primary)_22%,_transparent),0_0_28px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)]"
            : "bg-muted-foreground/35",
        )}
        aria-hidden
      />

      {/* Estreito: marcador no trilho da esquerda, alinhado ao topo do card. */}
      <div
        className={cn(
          "pointer-events-none absolute top-[2.35rem] -left-[2.075rem] z-[3] size-4 rounded-full border-[3px] border-background shadow-md transition-[background-color,box-shadow] duration-700 ease-out @min-[64rem]/timeline:hidden",
          milestoneHighlighted ? "bg-primary shadow-[0_0_0_5px_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]" : "bg-muted-foreground/35",
        )}
        aria-hidden
      />

      <motion.div
        className="grid gap-3 @min-[64rem]/timeline:grid-cols-2 @min-[64rem]/timeline:items-center @min-[64rem]/timeline:gap-14"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: index * 0.06 }}
      >
        <div className="@min-[64rem]/timeline:hidden">
          <p
            className={cn(
              "mb-2 font-mono text-[10px] font-bold tracking-[0.2em] tabular-nums transition-colors duration-500",
              milestoneHighlighted ? "text-primary" : "text-muted-foreground/80",
            )}
          >
            {String(index + 1).padStart(2, "0")}
            <span className="text-muted-foreground/50"> / {String(total).padStart(2, "0")}</span>
          </p>
          <ExperienceCard {...entry} kind={kind} />
        </div>

        <div className="hidden @min-[64rem]/timeline:flex @min-[64rem]/timeline:justify-end @min-[64rem]/timeline:pr-8">
          {even ? <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} /> : <ExperienceCard {...entry} kind={kind} />}
        </div>
        <div className="hidden @min-[64rem]/timeline:flex @min-[64rem]/timeline:justify-start @min-[64rem]/timeline:pl-8">
          {even ? <ExperienceCard {...entry} kind={kind} /> : <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} />}
        </div>
      </motion.div>
    </li>
  );
}
