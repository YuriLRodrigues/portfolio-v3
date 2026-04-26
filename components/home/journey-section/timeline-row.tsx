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
    <li ref={rowRef} className="relative py-10 sm:py-12 md:py-14">
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 z-[3] hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background shadow-md transition-[background-color,box-shadow] duration-700 ease-out md:block",
          milestoneHighlighted
            ? "bg-primary shadow-[0_0_0_6px_color-mix(in_oklch,var(--color-primary)_22%,_transparent),0_0_28px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)]"
            : "bg-muted-foreground/35",
        )}
        aria-hidden
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: index * 0.06 }}
      >
        <div className="flex justify-center md:hidden">
          <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} compact />
        </div>
        <div className="md:hidden">
          <ExperienceCard {...entry} kind={kind} />
        </div>

        <div className="hidden md:flex md:justify-end md:pr-4 lg:pr-8">
          {even ? <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} /> : <ExperienceCard {...entry} kind={kind} />}
        </div>
        <div className="hidden md:flex md:justify-start md:pl-4 lg:pl-8">
          {even ? <ExperienceCard {...entry} kind={kind} /> : <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} />}
        </div>
      </motion.div>
    </li>
  );
}
