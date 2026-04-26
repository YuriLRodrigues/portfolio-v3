"use client";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { container, panel } from "./motion-variants";
import { PANEL_META } from "./stack-data";
import { StackSpotlight } from "./stack-spotlight";
import { TechTile } from "./tech-tile";

export function StackPanels() {
  const { t } = useTranslation("technologies");
  return (
    <StackSpotlight>
      <motion.div className="space-y-8" variants={container} initial="hidden" whileInView="show">
        {PANEL_META.map(({ id, items, icon: PanelIcon, span, accent, rail, panelRing }, index) => {
          const title = t(`panels.${id}.title` as "panels.frontend.title");
          const kicker = t(`panels.${id}.kicker` as "panels.frontend.kicker");
          const blurb = t(`panels.${id}.blurb` as "panels.frontend.blurb");
          const wm = t(`panels.${id}.watermark` as "panels.frontend.watermark");
          return (
            <motion.article
              key={id}
              variants={panel}
              className={cn("relative flex flex-col overflow-hidden rounded-3xl border border-border/55 bg-card/55 p-1 backdrop-blur-md dark:bg-card/38", panelRing, span)}
            >
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.92] dark:opacity-100", accent)} aria-hidden />
              <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-br-[100%] bg-primary/[0.07] blur-3xl dark:bg-primary/[0.12]" aria-hidden />
              <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-48 rounded-tl-[100%] bg-foreground/[0.03] blur-2xl dark:bg-white/[0.05]" aria-hidden />
              <div className="absolute left-1/2 top-10 flex -translate-x-1/2 items-center justify-center gap-8">
                <span
                  className="pointer-events-none w-max max-w-[min(92%,14rem)] select-none text-center font-mono text-[clamp(1.75rem,4.2vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-foreground/[0.055] dark:text-white/[0.07]"
                  aria-hidden
                >
                  {wm}
                </span>
                <span className="h-fit rounded-lg border border-border/55 bg-muted/25 px-2.5 py-1 font-mono text-[10px] font-bold tabular-nums text-muted-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.08] dark:bg-muted/15 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                  {String(index + 1).padStart(2, "0")}/03
                </span>
              </div>

              <div className="relative w-fit max-w-full rounded-[calc(1.5rem-4px)] border border-border/35 bg-gradient-to-br from-background/95 via-card/40 to-transparent p-5 shadow-inner dark:from-background/65 dark:via-card/25 dark:to-transparent sm:p-6">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className={cn(
                          "size-1.5 rounded-full border",
                          d === 1 ? "border-primary/50 bg-primary/35 shadow-[0_0_8px_color-mix(in_oklch,var(--color-primary)_45%,_transparent)]" : "border-border/60 bg-muted/40",
                        )}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
                </div>

                <div className="flex w-full max-w-full flex-col gap-3">
                  <div className="flex w-full min-w-0 items-start gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-primary/[0.04] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] ring-2 ring-primary/10">
                      <PanelIcon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">{kicker}</p>
                      <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex w-fit max-w-full flex-wrap content-start gap-3 sm:gap-3.5">
                  {items.map((tech) => (
                    <TechTile key={tech.name} panelId={id} tech={tech} compact={id === "ferramentas"} rail={rail} />
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </StackSpotlight>
  );
}
