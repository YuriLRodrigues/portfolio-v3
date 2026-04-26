"use client";

import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { ChevronRight, Code2, Cpu, Layers, Wrench } from "lucide-react";

function PipelineConnector() {
  return (
    <div className="relative flex h-[4.25rem] w-8 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-10" aria-hidden>
      <div className="absolute inset-x-[15%] top-[46%] h-px -translate-y-1/2 bg-gradient-to-r from-border/30 via-primary/45 to-border/30 sm:inset-x-0" />
      <ChevronRight
        className="relative z-[1] size-4 text-primary/55 drop-shadow-[0_0_8px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] sm:size-[1.125rem]"
        strokeWidth={2.25}
        aria-hidden
      />
    </div>
  );
}

export function PipelineDecor({ className }: { className?: string }) {
  const { t } = useTranslation("technologies");
  const pipelineSteps = useMemo(
    () => [
      { Icon: Layers, key: "interface" as const },
      { Icon: Code2, key: "services" as const },
      { Icon: Cpu, key: "runtime" as const },
      { Icon: Wrench, key: "delivery" as const },
    ],
    [],
  );
  return (
    <div className={cn("hidden w-full select-none  lg:block", className)} aria-hidden>
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/70 via-background/35 to-card/40 p-[1px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/[0.07] dark:from-card/45 dark:via-background/25 dark:to-card/30 dark:shadow-black/45 dark:ring-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-30%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_58%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

        <div className="relative px-3 py-4 sm:px-6 sm:py-5">
          <div className="flex items-end justify-between gap-0.5 sm:gap-1">
            {pipelineSteps.map((step, index) => (
              <Fragment key={step.key}>
                {index > 0 ? <PipelineConnector /> : null}
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                  <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-gradient-to-b from-primary/[0.15] to-primary/[0.04] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] ring-1 ring-black/[0.04] dark:ring-white/[0.06] sm:size-11">
                    <step.Icon className="size-[1.15rem] sm:size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="w-full truncate font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.16em] text-foreground sm:text-[10px] sm:tracking-[0.18em]">
                    {t(`pipeline.${step.key}.label` as "pipeline.interface.label")}
                  </span>
                  <span className="line-clamp-2 min-h-[2lh] max-w-[9.5rem] text-[9px] leading-snug text-muted-foreground sm:max-w-[11rem] sm:text-[10px]">
                    {t(`pipeline.${step.key}.sub` as "pipeline.interface.sub")}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>

          <p className="mt-4 border-t border-border/35 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:border-white/[0.07]">
            {t("pipeline.footnote")}
          </p>
        </div>
      </div>
    </div>
  );
}
