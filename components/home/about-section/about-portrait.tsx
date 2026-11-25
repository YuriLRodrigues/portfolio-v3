"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

import { PersonalIntroTrigger } from "@/components/home/hero-section";

import { PERSONAL_INTRO } from "@/lib/personal-intro";
import { motion } from "motion/react";

import { sectionLiftHoverTransition } from "../section-motion";

/**
 * Cartão do retrato: a mesma foto do LinkedIn, num quadro arredondado, sobre o fundo do tema.
 */
export function AboutPortrait() {
  const { t } = useTranslation("about");
  const { t: tIntro } = useTranslation("intro");

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={sectionLiftHoverTransition}
      className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/70 backdrop-blur-xl dark:bg-card/55"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 50% 108%, color-mix(in oklch, var(--primary) 24%, transparent), transparent 64%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in oklch, var(--foreground) 12%, transparent) 1px, transparent 0)`,
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 20%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative flex items-end gap-4 px-5 pt-6 sm:px-6 sm:pt-7">
        <div className="relative size-32 shrink-0 overflow-hidden rounded-2xl border border-primary/30 shadow-[0_18px_40px_-16px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)] ring-2 ring-primary/15 sm:size-40">
          <Image
            src={PERSONAL_INTRO.photoSrc}
            alt={tIntro("photoAlt", { name: PERSONAL_INTRO.displayName })}
            width={800}
            height={800}
            draggable={false}
            className="size-full object-cover select-none"
            sizes="160px"
          />
        </div>

        <div className="min-w-0 pb-2">
          <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">{t("portraitKicker")}</p>
          <p className="mt-2 text-lg font-bold tracking-[-0.02em] text-foreground sm:text-xl">{t("portraitName")}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{t("portraitRole")}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex rounded-md border border-primary/25 bg-primary/[0.07] px-2 py-0.5 font-mono text-[10px] font-semibold text-primary">
              {PERSONAL_INTRO.cityState}
            </span>
            <span className="inline-flex rounded-md border border-border/55 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
              {PERSONAL_INTRO.timezoneLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-3 border-t border-border/40 px-5 py-3.5 sm:px-6">
        <span className="relative flex size-2.5 shrink-0" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
        </span>
        <p className="min-w-0 flex-1 text-[12.5px] leading-snug text-muted-foreground">{t("portraitStatus")}</p>
        <PersonalIntroTrigger variant="ghost" className="shrink-0 text-xs font-semibold text-primary hover:bg-primary/10">
          {t("portraitCta")}
        </PersonalIntroTrigger>
      </div>
    </motion.div>
  );
}
