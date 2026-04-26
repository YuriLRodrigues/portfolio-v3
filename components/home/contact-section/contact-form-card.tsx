"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { sectionEase, sectionMotionViewport } from "../section-motion";
import { UnderlineInput, UnderlineTextarea } from "./underline-fields";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactFormCard() {
  const { t } = useTranslation("contact");
  const formRef = useRef<HTMLFormElement>(null);
  const [pulse, setPulse] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form || status === "sending") return;

      setStatus("sending");
      setErrorMessage(null);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 600);

      const fd = new FormData(form);
      const body = {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        message: String(fd.get("message") ?? ""),
        _company: String(fd.get("_company") ?? ""),
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          setStatus("success");
          form.reset();
          return;
        }

        let errKey: string | null = null;
        try {
          const data = (await res.json()) as { error?: string };
          errKey = data.error ?? null;
        } catch {
          errKey = null;
        }

        if (res.status === 400) {
          if (errKey === "name") setErrorMessage(t("validationName"));
          else if (errKey === "email") setErrorMessage(t("validationEmail"));
          else if (errKey === "message") setErrorMessage(t("validationMessage"));
          else setErrorMessage(t("submitErrorValidation"));
        } else if (res.status === 503) {
          setErrorMessage(t("submitErrorConfig"));
        } else {
          setErrorMessage(t("submitError"));
        }
        setStatus("error");
      } catch {
        setErrorMessage(t("submitError"));
        setStatus("error");
      }
    },
    [status, t],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={sectionMotionViewport}
      transition={{ duration: 0.74, delay: 0.14, ease: sectionEase }}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-card/45 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-xl dark:border-white/[0.08] dark:bg-card/30 dark:shadow-[0_28px_90px_-36px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] sm:p-8 lg:p-9",
        pulse && "ring-2 ring-primary/40",
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

      <div className="relative flex items-start justify-between gap-4 border-b border-border/40 pb-5 dark:border-white/[0.06]">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{t("formKicker")}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{t("formSub")}</p>
        </div>
      </div>

      <form
        ref={formRef}
        className="relative mt-8 space-y-9"
        onSubmit={onSubmit}
        onFocusCapture={() => {
          setStatus((s) => (s === "success" ? "idle" : s));
          setErrorMessage((msg) => (msg ? null : msg));
        }}
        noValidate
      >
        <input type="text" name="_company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden />

        <UnderlineInput id="contact-name" name="name" label={t("name")} autoComplete="name" />
        <UnderlineInput id="contact-email" name="email" type="email" label={t("emailField")} autoComplete="email" />
        <UnderlineTextarea id="contact-message" name="message" label={t("message")} rows={5} />

        <div className="space-y-3 pt-2">
          {errorMessage ? (
            <p className="text-center text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}
          {status === "success" ? (
            <p className="text-center text-sm font-medium text-primary" role="status">
              {t("submitSuccess")}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="h-12 w-full rounded-full border-0 bg-primary font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_32px_color-mix(in_oklch,var(--color-primary)_38%,_transparent)] transition-[background-color,box-shadow,transform] duration-200 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_40px_color-mix(in_oklch,var(--color-primary)_48%,_transparent)] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
          >
            {status === "sending" ? t("submitSending") : t("submit")}
            <ArrowUpRight className="ml-2 size-4" aria-hidden />
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">{t("footnote")}</p>
        </div>
      </form>
    </motion.div>
  );
}
