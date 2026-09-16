"use client";

import { useTranslation } from "react-i18next";

import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { GradientText } from "@/components/ui/gradient-text";

import { motion } from "motion/react";

import { sectionEase, sectionHoverTransition, sectionMotionViewport } from "../section-motion";
import { CONTACT } from "./contact-data";
import { ContactDetails } from "./contact-details";

export function ContactEditorialColumn() {
  const { t } = useTranslation("contact");
  return (
    <div className="relative min-w-0">
      <span
        className="pointer-events-none absolute top-[-4%] -left-2 font-mono text-[clamp(3.5rem,14vw,9rem)] leading-none font-black tracking-[-0.06em] text-foreground/[0.04] select-none sm:top-[-6%] sm:-left-4 dark:text-foreground/[0.07]"
        aria-hidden
      >
        {t("bgWord")}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={sectionMotionViewport}
        transition={{ duration: 0.72, ease: sectionEase }}
        className="relative"
      >
        <div className="flex flex-wrap items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={sectionHoverTransition}
            className="grid size-11 shrink-0 cursor-default place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold text-primary tabular-nums sm:text-xs">06</span>
          </motion.div>
          <div className="h-px max-w-[6rem] min-w-[2.5rem] flex-1 bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold tracking-[0.22em] text-primary uppercase sm:text-[11px]">{t("kicker")}</p>
        </div>

        <h2
          id="contact-heading"
          className="mt-6 font-black tracking-[-0.045em] text-balance text-foreground"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.05 }}
        >
          <GradientText variant="surface">{t("title")}</GradientText>
          <GradientText variant="accentEnd">.</GradientText>
        </h2>

        <p className="mt-3 text-lg font-semibold tracking-tight text-foreground/90 sm:text-xl">{t("lead")}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{t("p")}</p>

        <ContactDetails />

        <div className="mt-10 flex flex-wrap gap-3" aria-label={t("social")}>
          <motion.a
            href={CONTACT.social.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={sectionHoverTransition}
            className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-white/[0.04] ring-inset hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
          >
            <GitHubIcon className="size-5" />
            <span className="sr-only">GitHub</span>
          </motion.a>
          <motion.a
            href={CONTACT.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={sectionHoverTransition}
            className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-white/[0.04] ring-inset hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
          >
            <LinkedInIcon className="size-5" />
            <span className="sr-only">LinkedIn</span>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
