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
            key={cert.title + cert.issued}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/55 bg-gradient-to-br from-card via-card/90 to-background/30 p-5 shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/30 hover:shadow-[0_16px_48px_-24px_color-mix(in_oklch,var(--color-primary)_30%,_transparent)] dark:from-card/50 dark:to-background/20"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-background/80 text-primary">
                <Award className="size-5" aria-hidden />
              </span>
              <span className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {cert.format}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{cert.title}</h3>
            <p className="text-sm text-primary">{cert.issuer}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("certIssued", { date: cert.issued })}</p>
            <a
              href={cert.href}
              {...(isFileDownload ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition",
                "hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {isFileDownload ? <Download className="size-4" aria-hidden /> : <ExternalLink className="size-4" aria-hidden />}
              {isFileDownload ? t("certDownload") : t("certOpen")}
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{t("certHint")}</p>
          </div>
        );
      })}
    </div>
  );
}
