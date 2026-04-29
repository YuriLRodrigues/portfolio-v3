"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { easeOut } from "./journey-motion";
import type { Entry, TimelineKind } from "./journey-types";

const INITIAL_TAG_COUNT = 6;

function DotSep() {
  return <span className="text-primary"> · </span>;
}

export function ExperienceCard({ period, title, subtitle, subtitleSecondary, meta, metaPlace, metaMode, description, tags, kind }: Entry & { kind: TimelineKind }) {
  const { t } = useTranslation("journey");
  const reduceMotion = useReducedMotion();
  const [stackExpanded, setStackExpanded] = useState(false);
  const tagList = tags ?? [];
  const overflow = tagList.length - INITIAL_TAG_COUNT;
  const hasOverflow = overflow > 0;
  const visibleTags = stackExpanded || !hasOverflow ? tagList : tagList.slice(0, INITIAL_TAG_COUNT);
  return (
    <motion.div
      className={cn(
        "group/card relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br p-5 shadow-lg ring-1 ring-inset sm:p-6",
        "from-card/95 via-card/70 to-background/40 ring-white/[0.06] dark:from-card/60 dark:via-card/45 dark:to-background/25 dark:ring-white/[0.05]",
        "transition-[border-color,box-shadow,background-color,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-primary/40 hover:shadow-[0_28px_72px_-36px_color-mix(in_oklch,var(--color-primary)_45%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-primary)_12%,transparent)]",
        "hover:ring-primary/20 dark:hover:shadow-[0_28px_72px_-36px_color-mix(in_oklch,var(--color-primary)_38%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
      )}
      style={{ transformOrigin: "50% 50%" }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              scale: 1.014,
              transition: { duration: 0.5, ease: easeOut },
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.992, transition: { duration: 0.12, ease: easeOut } }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-44 scale-100 rounded-full blur-3xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-110 group-hover/card:opacity-100",
          "opacity-80",
          kind === "work" ? "bg-primary/[0.14]" : "bg-primary/[0.09]",
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-[opacity,filter] duration-500 group-hover/card:via-primary/70 group-hover/card:opacity-100"
        aria-hidden
      />
      <time className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary transition-[color,filter] duration-500 group-hover/card:text-primary group-hover/card:drop-shadow-[0_0_12px_color-mix(in_oklch,var(--color-primary)_35%,transparent)]">
        {period}
      </time>
      <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h3>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        {subtitle}
        {subtitleSecondary ? (
          <>
            <DotSep />
            {subtitleSecondary}
          </>
        ) : null}
        {metaPlace && metaMode ? (
          <>
            <DotSep />
            {metaPlace}
            <DotSep />
            {metaMode}
          </>
        ) : meta ? (
          <>
            <DotSep />
            {meta}
          </>
        ) : null}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{description}</p>
      {tagList.length ? (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2" aria-label={t("stackLabel")}>
            {visibleTags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-md border border-primary/25 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out group-hover/card:border-primary/35 group-hover/card:bg-primary/[0.1] hover:scale-105 hover:border-primary/50 hover:shadow-[0_6px_20px_-8px_color-mix(in_oklch,var(--color-primary)_40%,transparent)]">
                  {tag}
                </span>
              </li>
            ))}
            {hasOverflow && !stackExpanded ? (
              <li className="contents">
                <button
                  type="button"
                  className="inline-flex rounded-md border border-dashed border-primary/40 bg-primary/[0.04] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/[0.1] hover:shadow-[0_8px_24px_-12px_color-mix(in_oklch,var(--color-primary)_35%,transparent)] active:translate-y-0"
                  aria-expanded={false}
                  onClick={() => setStackExpanded(true)}
                >
                  {t("stackShowMore", { count: overflow })}
                </button>
              </li>
            ) : null}
          </ul>
          {hasOverflow && stackExpanded ? (
            <button
              type="button"
              className="mt-2 text-xs font-medium text-primary underline-offset-4 hover:underline"
              aria-expanded
              onClick={() => setStackExpanded(false)}
            >
              {t("stackShowLess")}
            </button>
          ) : null}
        </div>
      ) : null}
    </motion.div>
  );
}
