"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Check, Copy, Mail, Phone } from "lucide-react";

import { CONTACT } from "./contact-data";

const HELP_KEYS = ["scope", "stack", "when"] as const;

/**
 * Bloco de contato direto: e-mail com botão de copiar, o que esperar de resposta
 * e o que ajuda a vir escrito na mensagem.
 */
export function ContactDetails() {
  const { t } = useTranslation("contact");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o link mailto ao lado continua valendo.
    }
  }

  return (
    <div className="mt-10 space-y-7">
      <div>
        <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">{t("email")}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-[text-decoration-color,transform] duration-200 hover:translate-x-0.5 hover:decoration-primary"
          >
            <Mail className="size-5 shrink-0 text-primary" aria-hidden />
            {CONTACT.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label={t("copyEmail")}
            className={cn(
              "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 font-mono text-[10px] font-bold tracking-wider uppercase transition-[border-color,background-color,color] duration-200",
              "focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none",
              copied ? "border-primary/55 bg-primary/12 text-primary" : "border-border/55 text-muted-foreground hover:border-primary/40 hover:text-primary",
            )}
          >
            {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
            {copied ? t("copied") : t("copy")}
          </button>
        </div>
      </div>

      {CONTACT.phoneDisplay && CONTACT.phoneHref ? (
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">{t("phone")}</p>
          <a
            href={CONTACT.phoneHref}
            className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-[text-decoration-color,transform] duration-200 hover:translate-x-0.5 hover:decoration-primary"
          >
            <Phone className="size-5 shrink-0 text-primary" aria-hidden />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/[0.07] px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-primary uppercase">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t("replyTime")}
        </span>
        <span className="inline-flex rounded-lg border border-border/55 px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          {t("timezone")}
        </span>
        <span className="inline-flex rounded-lg border border-border/55 px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          {t("languages")}
        </span>
      </div>

      <div className="rounded-xl border border-border/45 bg-background/40 px-4 py-4">
        <p className="font-mono text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">{t("helpKicker")}</p>
        <ul className="mt-3 space-y-2">
          {HELP_KEYS.map((key) => (
            <li key={key} className="flex gap-3 text-[13px] leading-relaxed text-muted-foreground">
              <span className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[2px] bg-primary/70" aria-hidden />
              <span className="text-pretty">{t(`help.${key}` as never) as string}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
