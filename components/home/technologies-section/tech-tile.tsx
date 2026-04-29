"use client";

import type { MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { normalizeToSupported } from "@/lib/i18n/resolve-locale";
import { withTechLocale } from "@/lib/i18n/tech-english";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

import { sectionEase, sectionMotionViewport } from "../section-motion";
import { easeOut } from "./motion-variants";
import type { PanelMeta, Tech } from "./types";

type PanelId = PanelMeta["id"];

export function TechTile({ tech, panelId, compact, rail }: { tech: Tech; panelId: PanelId; compact?: boolean; rail: string }) {
  const { i18n } = useTranslation();
  const loc = normalizeToSupported(i18n.resolvedLanguage ?? i18n.language);
  const localized = withTechLocale(tech, panelId, loc);
  const { name, tagline, Icon, badge } = localized;
  const reduceMotion = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const tileRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !tileRef.current) return;
      const r = tileRef.current.getBoundingClientRect();
      setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    },
    [reduceMotion],
  );

  const spotlightStyle = {
    background: `radial-gradient(460px circle at ${glow.x}% ${glow.y}%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 55%)`,
  };

  return (
    <motion.div
      ref={tileRef}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={sectionMotionViewport}
      transition={{ duration: 0.62, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.48, ease: sectionEase } }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      onMouseMove={onMove}
      onMouseLeave={() => setGlow({ x: 50, y: 50 })}
      className={cn(
        "group/tile relative w-full max-w-full min-w-0 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br p-3.5",
        "from-card/95 via-card/70 to-background/55 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_10px_28px_-12px_rgba(0,0,0,0.14)]",
        "ring-1 ring-white/[0.06] ring-inset dark:from-card/70 dark:via-card/45 dark:to-background/30 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_14px_36px_-14px_rgba(0,0,0,0.45)] dark:ring-white/[0.05]",
        "before:pointer-events-none before:absolute before:top-3 before:bottom-3 before:left-0 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:opacity-95 before:content-['']",
        rail,
        "transition-[border-color,box-shadow,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/45 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_20px_52px_-14px_color-mix(in_oklch,var(--color-primary)_42%,_transparent)]",
        compact && "p-3",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage: `radial-gradient(color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
        aria-hidden
      />

      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100" style={spotlightStyle} aria-hidden />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute -top-12 -right-10 size-32 rounded-full bg-primary/[0.12] opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100 dark:bg-primary/[0.2]"
        aria-hidden
      />

      {badge ? (
        <span
          className={cn(
            "absolute z-10 inline-flex max-w-[min(8rem,calc(100%-1.5rem))] items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.1] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-primary uppercase shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_18%,_transparent)] dark:border-primary/35 dark:bg-primary/[0.14]",
            compact ? "top-2 right-2" : "top-2.5 right-2.5",
          )}
        >
          <span className="size-1 shrink-0 rounded-full bg-primary/80" aria-hidden />
          {badge}
        </span>
      ) : null}

      <div className="relative flex w-full max-w-full min-w-0 items-start gap-3">
        <span
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border border-border/55 bg-gradient-to-br from-background/90 to-background/40",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] ring-2 ring-primary/10 transition-[transform,box-shadow,border-color] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] dark:from-background/50 dark:to-background/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] dark:ring-primary/15",
            "group-hover/tile:scale-[1.04] group-hover/tile:border-primary/40 group-hover/tile:ring-primary/25",
            compact ? "size-10" : "size-11 @sm:size-[3.25rem]",
          )}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[420ms] ease-out group-hover/tile:opacity-100"
            style={{
              background: "conic-gradient(from 210deg, transparent, color-mix(in oklch, var(--primary) 32%, transparent), transparent)",
            }}
            aria-hidden
          />
          <Icon size={compact ? 22 : 28} className="relative z-[1] text-foreground/90" aria-hidden />
        </span>
        <div className={cn("w-full max-w-[min(100%,18rem)] min-w-0 flex-1 @sm:max-w-[20rem]", badge && (compact ? "pr-9" : "pr-10 @sm:pr-12"))}>
          <p className={cn("max-w-full min-w-0 truncate font-semibold tracking-tight text-foreground", compact ? "text-sm" : "text-[0.95rem] @sm:text-base")}>{name}</p>
          <p className={cn("mt-0.5 truncate text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>{tagline}</p>
        </div>
      </div>

      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute top-0 -left-1/2 h-full w-1/2 skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover/tile:translate-x-[220%] group-hover/tile:opacity-100 dark:via-white/[0.07]"
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}
