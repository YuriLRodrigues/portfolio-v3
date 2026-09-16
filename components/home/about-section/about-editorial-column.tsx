"use client";

import { useTranslation } from "react-i18next";

import { GradientText } from "@/components/ui/gradient-text";

import { AboutPrinciples } from "./about-principles";
import { AboutStatsGrid } from "./about-stats-grid";

export function AboutEditorialColumn() {
  const { t } = useTranslation("about");
  return (
    <div className="min-w-0 border-l-2 border-primary/35 pl-5 sm:pl-7">
      <h2 className="max-w-xl text-[clamp(1.85rem,4.6vw,2.85rem)] leading-[1.12] font-bold tracking-[-0.035em] text-balance text-foreground">
        {t("titleBefore")} <GradientText>{t("titleGradient")}</GradientText> {t("titleAfter")}
      </h2>

      <blockquote className="relative mt-7 max-w-xl border-l border-primary/25 py-1 pl-5 text-base leading-relaxed text-foreground/90 italic transition-[border-color,box-shadow] duration-300 hover:border-primary/45 hover:shadow-[inset_4px_0_0_0_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] sm:mt-8 sm:text-lg">
        <span className="font-semibold text-foreground not-italic">{t("blockquoteStrong")}</span> {t("blockquoteRest")}{" "}
        <span className="text-primary not-italic">{t("blockquoteAccent")}</span> {t("blockquoteEnd")}
      </blockquote>

      <div className="mt-7 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>

      <AboutPrinciples />

      <AboutStatsGrid />
    </div>
  );
}
