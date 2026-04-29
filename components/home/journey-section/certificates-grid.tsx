"use client";

import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Award, Download, ExternalLink } from "lucide-react";

import type { CertificateEntry } from "./journey-types";

export function CertificatesGrid({ items }: { items: CertificateEntry[] }) {
  const { t } = useTranslation("journey");
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
      {items.map((cert) => {
        const isFileDownload = cert.download === true;
        return (
          <div
            key={cert.href}
            className={cn(
              "group/cert relative flex flex-col overflow-hidden rounded-2xl border border-border/55 bg-gradient-to-br from-card via-card/90 to-background/30 p-5 shadow-sm ring-1 ring-inset ring-white/[0.04] dark:from-card/50 dark:to-background/20",
              "transition-[border-color,box-shadow,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
              "hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_64px_-32px_color-mix(in_oklch,var(--color-primary)_42%,transparent),0_0_0_1px_color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:ring-primary/15",
            )}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/[0.08] blur-3xl opacity-0 transition-opacity duration-700 group-hover/cert:opacity-100" aria-hidden />
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-background/80 text-primary shadow-sm transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cert:scale-105 group-hover/cert:border-primary/45 group-hover/cert:bg-primary/[0.08] group-hover/cert:shadow-[0_10px_28px_-12px_color-mix(in_oklch,var(--color-primary)_35%,transparent)]">
                <Award className="size-5 transition-transform duration-500 group-hover/cert:scale-110" aria-hidden />
              </span>
              <span className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {cert.format}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground transition-[color,transform] duration-500 group-hover/cert:translate-x-0.5">{cert.title}</h3>
            <p className="text-sm text-primary">{cert.issuer}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("certIssued", { date: cert.issued })}</p>
            <a
              href={cert.href}
              {...(isFileDownload ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary",
                "transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_12px_32px_-16px_color-mix(in_oklch,var(--color-primary)_50%,transparent)] active:translate-y-0",
              )}
            >
              {isFileDownload ? <Download className="size-4" aria-hidden /> : <ExternalLink className="size-4" aria-hidden />}
              {isFileDownload ? t("certDownload") : t("certOpen")}
            </a>
          </div>
        );
      })}
    </div>
  );
}
