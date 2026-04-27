"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MagicCard } from "@/components/ui/magic-card";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { sectionLiftHoverTransition } from "../section-motion";
import { item } from "./motion-variants";

type HighlightCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
  accent?: "default" | "featured";
};

export function HighlightCard({ title, description, Icon, accent }: HighlightCardProps) {
  return (
    <motion.li variants={item} whileHover={{ y: -3 }} transition={sectionLiftHoverTransition} className="relative h-full min-h-0">
      <div
        className={cn(
          "group relative flex h-full min-h-[188px] flex-col overflow-visible rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card/85 to-background/35 p-2 shadow-sm ring-1 ring-inset ring-white/[0.04] dark:from-card/55 dark:via-card/40 dark:to-background/20 dark:ring-white/[0.03]",
          "transition-[border-color,box-shadow,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/35 hover:shadow-[0_14px_44px_-18px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]",
          accent === "featured" && "border-primary/30 from-primary/[0.07] via-card/88 to-background/35 ring-primary/15 dark:from-primary/[0.1] dark:via-card/45",
        )}
      >
        <GlowingEffect
          className="z-0"
          disabled={false}
          variant="themed"
          glow
          spread={accent === "featured" ? 32 : 26}
          proximity={120}
          inactiveZone={0.01}
          movementDuration={1.5}
          borderWidth={2}
          blur={0}
        />
        <MagicCard mode="gradient" emphasis={accent === "featured"} className="relative z-10 flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-xl p-0">
          <div
            className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <div className="relative flex flex-1 flex-col p-5">
            <div className="relative flex flex-1 items-start gap-4">
              <span
                className={cn(
                  "grid shrink-0 place-items-center rounded-2xl border text-primary shadow-sm",
                  accent === "featured" ? "size-12 border-primary/35 bg-primary/[0.12] sm:size-14" : "size-11 border-border/60 bg-background/75 dark:bg-background/40",
                )}
              >
                <Icon className={accent === "featured" ? "size-6 sm:size-7" : "size-5"} strokeWidth={1.65} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{description}</p>
              </div>
            </div>
          </div>
        </MagicCard>
      </div>
    </motion.li>
  );
}
