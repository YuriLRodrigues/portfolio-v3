"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { sectionLiftHoverTransition, sectionMotionViewport } from "../section-motion";
import { container, panel } from "./motion-variants";
import { PANEL_META } from "./stack-data";
import { StackSpotlight } from "./stack-spotlight";
import { TechTile } from "./tech-tile";
import type { PanelMeta } from "./types";

const TECH_PAGE = 4;

function StackPanelTechItems({ id: panelId, items, rail, compact }: { id: PanelMeta["id"]; items: PanelMeta["items"]; rail: string; compact: boolean }) {
  const { t } = useTranslation("technologies");
  const [visible, setVisible] = useState(() => Math.min(TECH_PAGE, items.length));
  const listId = useId();

  const hasMore = visible < items.length;
  const list = useMemo(() => items.slice(0, visible), [items, visible]);

  const onMore = useCallback(() => {
    setVisible((c) => Math.min(c + TECH_PAGE, items.length));
  }, [items.length]);

  return (
    <>
      <ul
        id={listId}
        className="mt-6 grid w-full max-w-full list-none grid-cols-1 gap-2.5 @min-[30rem]:grid-cols-2 @min-[30rem]:gap-3.5 @min-[52rem]:grid-cols-3 @min-[70rem]:grid-cols-4"
      >
        {list.map((tech) => (
          <li key={tech.name} className="min-w-0">
            <TechTile panelId={panelId} tech={tech} compact={compact} rail={rail} />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <Button type="button" variant="outline" size="sm" className="mt-4 w-full @sm:mx-auto @sm:w-auto" onClick={onMore} aria-controls={listId}>
          {t("seeMore")}
        </Button>
      ) : null}
    </>
  );
}

export function StackPanels() {
  const { t } = useTranslation("technologies");
  const reduceMotion = usePrefersReducedMotion();
  return (
    <StackSpotlight>
      <motion.div
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate={reduceMotion ? "show" : undefined}
        whileInView={reduceMotion ? undefined : "show"}
        viewport={sectionMotionViewport}
      >
        {PANEL_META.map(({ id, items, icon: PanelIcon, span, accent, rail, panelRing }) => {
          const title = t(`panels.${id}.title` as "panels.frontend.title");
          const kicker = t(`panels.${id}.kicker` as "panels.frontend.kicker");
          const blurb = t(`panels.${id}.blurb` as "panels.frontend.blurb");
          const wm = t(`panels.${id}.watermark` as "panels.frontend.watermark");
          return (
            <motion.article
              key={id}
              variants={panel}
              whileHover={{ y: -4 }}
              transition={sectionLiftHoverTransition}
              className={cn("relative flex flex-col overflow-hidden rounded-3xl border border-border/55 bg-card/55 p-1 backdrop-blur-md dark:bg-card/38", panelRing, span)}
            >
              <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.92] dark:opacity-100", accent)} aria-hidden />
              <div className="pointer-events-none absolute top-0 left-0 h-40 w-40 rounded-br-[100%] bg-primary/[0.07] blur-3xl dark:bg-primary/[0.12]" aria-hidden />
              <div className="pointer-events-none absolute right-0 bottom-0 h-28 w-48 rounded-tl-[100%] bg-foreground/[0.03] blur-2xl dark:bg-white/[0.05]" aria-hidden />
              <div className="absolute top-10 left-1/2 flex -translate-x-1/2 items-center justify-center gap-8">
                <span
                  className="pointer-events-none w-max max-w-[min(92%,14rem)] text-center font-mono text-[clamp(1.75rem,4.2vw,3rem)] leading-[0.88] font-black tracking-[-0.06em] text-foreground/[0.055] uppercase select-none dark:text-white/[0.07]"
                  aria-hidden
                >
                  {wm}
                </span>
              </div>

              <div className="@container relative w-full max-w-full min-w-0 rounded-[calc(1.5rem-4px)] border border-border/35 bg-gradient-to-br from-background/95 via-card/40 to-transparent p-5 shadow-inner @sm:p-6 dark:from-background/65 dark:via-card/25 dark:to-transparent">
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
                      <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary/90 uppercase">{kicker}</p>
                      <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground @sm:text-2xl">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
                    </div>
                  </div>
                </div>

                <StackPanelTechItems id={id} items={items} rail={rail} compact={id === "ferramentas"} />
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </StackSpotlight>
  );
}
