"use client";

import { useTranslation } from "react-i18next";

import type { ProjectFilter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { sectionEase, sectionMotionViewport } from "../section-motion";

type ProjectFiltersProps = {
  filters: readonly ProjectFilter[];
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  count: number;
};

export function ProjectFilters({ filters, active, onChange, count }: ProjectFiltersProps) {
  const { t } = useTranslation("projects");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={sectionMotionViewport}
      transition={{ duration: 0.6, delay: 0.16, ease: sectionEase }}
      className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-11"
    >
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t("filtersLabel")}>
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onChange(filter)}
              aria-pressed={isActive}
              className={cn(
                "cursor-pointer rounded-lg border px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase transition-[border-color,background-color,color,transform] duration-200 sm:text-[11px]",
                "focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none",
                isActive
                  ? "border-primary/55 bg-primary/15 text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]"
                  : "border-border/55 bg-background/60 text-muted-foreground hover:-translate-y-0.5 hover:border-primary/35 hover:text-foreground",
              )}
            >
              {t(`filters.${filter}` as never)}
            </button>
          );
        })}
      </div>

      <span className="ml-auto font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:text-[11px]" aria-live="polite">
        {t("filterCount", { count })}
      </span>
    </motion.div>
  );
}
