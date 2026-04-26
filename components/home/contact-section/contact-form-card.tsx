"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { easeOut } from "./contact-motion";
import { UnderlineInput, UnderlineTextarea } from "./underline-fields";

export function ContactFormCard() {
  const { t } = useTranslation("contact");
  const [pulse, setPulse] = useState(false);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPulse(true);
    window.setTimeout(() => setPulse(false), 900);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay: 0.06, ease: easeOut }}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-card/45 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-xl dark:border-white/[0.08] dark:bg-card/30 dark:shadow-[0_28px_90px_-36px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] sm:p-8 lg:p-9",
        pulse && "ring-2 ring-primary/40",
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

      <div className="relative flex items-center justify-between gap-4 border-b border-border/40 pb-5 dark:border-white/[0.06]">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{t("formKicker")}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{t("formSub")}</p>
        </div>
        <span className="hidden rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-block">
          {t("beta")}
        </span>
      </div>

      <form className="relative mt-8 space-y-9" onSubmit={onSubmit} noValidate>
        <UnderlineInput id="contact-name" name="name" label="Seu nome" autoComplete="name" />
        <UnderlineInput id="contact-email" name="email" type="email" label="E-mail" autoComplete="email" />
        <UnderlineTextarea id="contact-message" name="message" label="Projeto ou mensagem" rows={5} />

        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-full border-0 bg-primary font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_32px_color-mix(in_oklch,var(--color-primary)_38%,_transparent)] transition hover:bg-primary/90 hover:shadow-[0_0_40px_color-mix(in_oklch,var(--color-primary)_48%,_transparent)]"
          >
            {t("submit")}
            <ArrowUpRight className="ml-2 size-4" aria-hidden />
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">{t("footnote")}</p>
        </div>
      </form>
    </motion.div>
  );
}
