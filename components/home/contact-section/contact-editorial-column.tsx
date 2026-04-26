"use client";

import { useTranslation } from "react-i18next";

import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { GradientText } from "@/components/ui/gradient-text";

import { Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

import { CONTACT } from "./contact-data";
import { easeOut } from "./contact-motion";

export function ContactEditorialColumn() {
  const { t } = useTranslation("contact");
  return (
    <div className="relative min-w-0">
      <span
        className="pointer-events-none absolute -left-2 top-[-4%] select-none font-mono text-[clamp(3.5rem,14vw,9rem)] font-black leading-none tracking-[-0.06em] text-foreground/[0.04] dark:text-foreground/[0.07] sm:-left-4 sm:top-[-6%]"
        aria-hidden
      >
        {t("bgWord")}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="relative"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">06</span>
          </div>
          <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">{t("kicker")}</p>
        </div>

        <h2
          id="contact-heading"
          className="mt-6 text-balance font-black tracking-[-0.045em] text-foreground"
          style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.05 }}
        >
          <GradientText variant="surface">{t("title")}</GradientText>
          <GradientText variant="accentEnd">.</GradientText>
        </h2>

        <p className="mt-3 text-lg font-semibold tracking-tight text-foreground/90 sm:text-xl">{t("lead")}</p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{t("p")}</p>

        <div className="mt-10 space-y-8">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("email")}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:decoration-primary"
            >
              <Mail className="size-5 shrink-0 text-primary" aria-hidden />
              {CONTACT.email}
            </a>
          </div>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("phone")}</p>
            <a
              href={CONTACT.phoneHref}
              className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:decoration-primary"
            >
              <Phone className="size-5 shrink-0 text-primary" aria-hidden />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" aria-label={t("social")}>
          <a
            href={CONTACT.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
          >
            <GitHubIcon className="size-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={CONTACT.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
          >
            <LinkedInIcon className="size-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
