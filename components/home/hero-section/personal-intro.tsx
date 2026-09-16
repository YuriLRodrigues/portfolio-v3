"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";

import { PERSONAL_INTRO } from "@/lib/personal-intro";
import { cn } from "@/lib/utils";
import { Dialog } from "@base-ui/react/dialog";
import { MapPin, X } from "lucide-react";
import { motion } from "motion/react";

/** Instância única por carregamento do módulo — liga `Dialog.Root` a qualquer gatilho sem Context. */
export const personalIntroDialogHandle = Dialog.createHandle();

export function openPersonalIntro() {
  personalIntroDialogHandle.open(null);
}

/**
 * Montado uma vez em `AppProviders`. Em qualquer página/cliente: `openPersonalIntro()` ou `PersonalIntroTrigger`.
 */
export function PersonalIntroDialog() {
  const { t } = useTranslation("intro");
  const age = useMemo(() => ageFromBirthYear(PERSONAL_INTRO.birthYear), []);
  const year = new Date().getFullYear();

  return (
    <Dialog.Root handle={personalIntroDialogHandle}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-[120] bg-black/65 backdrop-blur-[6px]",
            "transition-[opacity,backdrop-filter] duration-300 ease-out",
            "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          )}
        />
        <Dialog.Viewport className={cn("fixed inset-0 z-[121] flex items-center justify-center p-4 sm:p-6", "pointer-events-none [&>*]:pointer-events-auto")}>
          <Dialog.Popup
            className={cn(
              "relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-hidden rounded-3xl border border-border/60",
              "bg-gradient-to-br from-card/95 via-card/85 to-background/90 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06] backdrop-blur-xl",
              "dark:from-card/90 dark:via-card/70 dark:to-background/80",
              "transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none",
              "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[starting-style]:blur-[1px]",
              "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
            )}
          >
            <div className="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" aria-hidden />
            <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/10 blur-2xl" aria-hidden />

            <Dialog.Title className="sr-only">{t("title", { name: PERSONAL_INTRO.displayName })}</Dialog.Title>
            <Dialog.Description className="sr-only">{t("description")}</Dialog.Description>

            <div className="relative flex max-h-[min(90vh,40rem)] flex-col">
              <div className="flex items-start justify-between gap-3 border-b border-border/40 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
                <div>
                  <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary/90 uppercase">{t("kicker")}</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    {t("greeting")} <GradientText variant="primarySoft">{PERSONAL_INTRO.displayName}</GradientText>
                  </p>
                </div>
                <Dialog.Close
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "shrink-0 rounded-xl border border-border/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                  aria-label={t("close")}
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-6 sm:px-6 sm:pt-6 sm:pb-7">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  className="flex flex-col items-center gap-6 sm:flex-col sm:items-start"
                >
                  <PhotoBlock photoAlt={t("photoAlt", { name: PERSONAL_INTRO.displayName })} />

                  <div className="w-full min-w-0 flex-1 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <dl className="grid gap-3 font-mono text-[11px] sm:text-xs">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="tracking-[0.14em] text-muted-foreground uppercase">{t("age")}</dt>
                        <dd className="font-semibold text-foreground tabular-nums">{t("years", { count: age })}</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="flex items-center gap-1.5 tracking-[0.14em] text-muted-foreground uppercase">
                          <MapPin className="size-3.5 text-primary/80" aria-hidden />
                          {t("city")}
                        </dt>
                        <dd className="text-right font-semibold text-foreground">{PERSONAL_INTRO.cityState}</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="tracking-[0.14em] text-muted-foreground uppercase">{t("country")}</dt>
                        <dd className="font-semibold text-foreground">{PERSONAL_INTRO.country}</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="tracking-[0.14em] text-muted-foreground uppercase">{t("timezone")}</dt>
                        <dd className="text-right text-foreground/90">{PERSONAL_INTRO.timezoneLabel}</dd>
                      </div>
                      <div className="pt-0.5">
                        <dt className="tracking-[0.14em] text-muted-foreground uppercase">{t("languages")}</dt>
                        <dd className="mt-1.5 flex flex-wrap gap-2">
                          <span className="rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-1 text-[11px] font-medium text-primary">{t("language0")}</span>
                          <span className="rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-1 text-[11px] font-medium text-primary">{t("language1")}</span>
                        </dd>
                      </div>
                    </dl>

                    <div className="space-y-2 border-t border-border/35 pt-4 text-[13px] leading-relaxed sm:text-sm dark:border-white/[0.06]">
                      <p>{t("blurb0")}</p>
                      <p>{t("blurb1")}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-border/40 bg-muted/15 px-5 py-3 sm:px-6 dark:bg-muted/10">
                <p className="text-center font-mono text-[10px] text-muted-foreground">{t("copyright", { year: String(year) })}</p>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PersonalIntroTrigger({ className, children, variant = "outline" }: { className?: string; children?: ReactNode; variant?: "outline" | "ghost" | "link" }) {
  const { t } = useTranslation("intro");
  return (
    <button
      type="button"
      onClick={() => openPersonalIntro()}
      className={cn(
        variant === "outline" && buttonVariants({ variant: "outline", size: "default" }),
        variant === "ghost" && buttonVariants({ variant: "ghost", size: "default" }),
        variant === "link" && "text-primary underline-offset-4 hover:underline",
        className,
      )}
    >
      {children ?? t("introTrigger")}
    </button>
  );
}

function ageFromBirthYear(birthYear: number) {
  const y = new Date().getFullYear();
  return Math.max(0, y - birthYear);
}

function PhotoBlock({ photoAlt }: { photoAlt: string }) {
  const [failed, setFailed] = useState(false);
  const initial = PERSONAL_INTRO.displayName.trim().charAt(0).toUpperCase() || "?";

  if (failed) {
    return (
      <div
        className={cn(
          "relative mx-auto flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/30",
          "bg-gradient-to-br from-primary/25 via-primary/10 to-background shadow-inner ring-2 ring-primary/15 sm:size-40",
        )}
        aria-hidden
      >
        <span className="font-mono text-4xl font-black text-primary/90 sm:text-5xl">{initial}</span>
      </div>
    );
  }

  return (
    <div className="relative mx-auto size-36 shrink-0 overflow-hidden rounded-2xl border border-primary/30 bg-muted/50 shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] ring-2 ring-primary/15 sm:size-40 dark:bg-muted/20">
      {/* A foto é um recorte sem fundo; o fundo abaixo vem do tema, em tom baixo. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(125% 95% at 50% 105%, color-mix(in oklch, var(--primary) 26%, transparent), transparent 66%)`,
        }}
        aria-hidden
      />
      <Image
        src={PERSONAL_INTRO.photoSrc}
        alt={photoAlt}
        width={701}
        height={992}
        draggable={false}
        // Desce e amplia um pouco: a borda inferior do recorte sai do quadro.
        className="relative size-full translate-y-[7%] scale-[1.06] object-contain object-bottom select-none"
        sizes="160px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
