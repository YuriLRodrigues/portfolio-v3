"use client";

import { useTranslation } from "react-i18next";

import { PersonalIntroTrigger } from "@/components/home/hero-section";
import { GradientText } from "@/components/ui/gradient-text";

import { AboutStatsGrid } from "./about-stats-grid";

export function AboutEditorialColumn() {
  const { t } = useTranslation("about");
  return (
    <div className="min-w-0 border-l-2 border-primary/35 pl-5 sm:pl-7">
      <h2 className="max-w-xl text-balance text-[clamp(1.85rem,4.6vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.035em] text-foreground">
        {t("titleBefore")} <GradientText>{t("titleGradient")}</GradientText> {t("titleAfter")}
      </h2>

      <blockquote className="relative mt-7 max-w-xl border-l border-primary/25 py-1 pl-5 text-base italic leading-relaxed text-foreground/90 sm:mt-8 sm:text-lg">
        <span className="font-semibold not-italic text-foreground">{t("blockquoteStrong")}</span> {t("blockquoteRest")}{" "}
        <span className="text-primary not-italic">{t("blockquoteAccent")}</span> {t("blockquoteEnd")}
      </blockquote>

      <div className="mt-7 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>

      <div className="mt-6 sm:mt-7">
        <PersonalIntroTrigger />
      </div>

      <AboutStatsGrid />
    </div>
  );
}
