"use client";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Blocks, ClipboardList, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { sectionEase, sectionMotionViewport } from "../section-motion";

/** As etapas, na ordem em que acontecem. O trilho à esquerda liga uma na outra. */
const STAGES: readonly { id: string; Icon: LucideIcon }[] = [
  { id: "planning", Icon: ClipboardList },
  { id: "building", Icon: Blocks },
  { id: "ai", Icon: Sparkles },
  { id: "testing", Icon: ShieldCheck },
];

export function AboutPrinciples() {
  const { t } = useTranslation("about");

  return (
    <div className="mt-9 max-w-xl sm:mt-10">
      <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary uppercase sm:text-[11px]">{t("principlesKicker")}</p>

      <ol className="relative mt-5">
        {/* Trilho contínuo por trás dos marcadores. */}
        <span className="pointer-events-none absolute top-4 bottom-4 left-[1.1875rem] w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent" aria-hidden />

        {STAGES.map(({ id, Icon }, index) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionMotionViewport}
            transition={{ duration: 0.55, delay: index * 0.12, ease: sectionEase }}
            className={cn("group relative grid grid-cols-[2.375rem_minmax(0,1fr)] gap-4", index > 0 && "mt-5")}
          >
            <span
              className="relative z-[1] grid size-[2.375rem] place-items-center rounded-xl border border-primary/35 bg-background text-primary shadow-[0_0_0_4px_var(--color-background)] transition-[border-color,background-color,transform] duration-250 group-hover:scale-105 group-hover:border-primary/60 group-hover:bg-primary/10"
              aria-hidden
            >
              <Icon className="size-4" />
            </span>

            <div className="min-w-0 pt-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-primary uppercase">
                  {String(index + 1).padStart(2, "0")} · {t(`principles.${id}.stage` as never) as string}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-foreground">{t(`principles.${id}.title` as never) as string}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-pretty text-muted-foreground">{t(`principles.${id}.text` as never) as string}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
