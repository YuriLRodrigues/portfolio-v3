"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

import { FOCUS_STACK } from "./about-data";

export function AboutStackAside() {
  const { t } = useTranslation("about");
  return (
    <aside className="min-w-0 lg:sticky lg:top-24">
      <div className="relative rounded-3xl p-[1px] shadow-lg shadow-primary/5">
        <div
          className="absolute inset-0 rounded-3xl opacity-90"
          style={{
            background: `linear-gradient(135deg, color-mix(in oklch, var(--primary) 45%, transparent), transparent 42%, color-mix(in oklch, var(--foreground) 8%, transparent))`,
          }}
          aria-hidden
        />
        <div className="relative rounded-[calc(1.5rem-1px)] bg-card/90 p-6 backdrop-blur-xl dark:bg-card/75 sm:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{t("stackKicker")}</p>
              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{t("stackTitle")}</h3>
            </div>
            <span className="rounded-md bg-primary/12 px-2 py-1 font-mono text-[10px] font-semibold text-primary">{t("stackLive")}</span>
          </div>

          <ul className="mt-6 flex flex-col gap-2.5" role="list">
            {FOCUS_STACK.map((row) => (
              <li
                key={row.name}
                className="group rounded-2xl border border-border/40 bg-background/40 px-4 py-3.5 transition hover:border-primary/30 hover:bg-background/70 dark:border-border/30 dark:bg-background/20 dark:hover:bg-background/35 sm:px-4 sm:py-4"
              >
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{row.name}</span>
                  <span className="rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                    {t(`focus.${row.i18nKey}.tag` as "focus.next.tag")}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{t(`focus.${row.i18nKey}.detail` as "focus.next.detail")}</p>
              </li>
            ))}
          </ul>

          <Link
            href="#projects"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group/about-cta mt-6 inline-flex w-full gap-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_24px_color-mix(in_oklch,var(--color-primary)_28%,_transparent)]",
            )}
          >
            {t("stackCta")}
            <ArrowUpRight className="size-4 opacity-90 transition group-hover/about-cta:translate-x-0.5 group-hover/about-cta:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
