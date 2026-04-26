"use client";

import Image from "next/image";
import { useMemo, useState, type ReactNode } from "react";

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
  const age = useMemo(() => ageFromBirthYear(PERSONAL_INTRO.birthYear), []);

  return (
    <Dialog.Root handle={personalIntroDialogHandle}>
      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-[120] bg-black/65 backdrop-blur-[6px]",
            "transition-[opacity,backdrop-filter] duration-300 ease-out",
            "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
          )}
        />
        <Dialog.Viewport className={cn("fixed inset-0 z-[121] flex items-center justify-center p-4 sm:p-6", "pointer-events-none [&>*]:pointer-events-auto")}>
          <Dialog.Popup
            className={cn(
              "relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-hidden rounded-3xl border border-border/60",
              "bg-gradient-to-br from-card/95 via-card/85 to-background/90 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06] backdrop-blur-xl",
              "dark:from-card/90 dark:via-card/70 dark:to-background/80",
              "outline-none transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[starting-style]:blur-[1px]",
              "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
            )}
          >
            <div className="pointer-events-none absolute -right-20 -top-24 size-56 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" aria-hidden />
            <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-primary/10 blur-2xl" aria-hidden />

            <Dialog.Title className="sr-only">Sobre {PERSONAL_INTRO.displayName} — informações pessoais</Dialog.Title>
            <Dialog.Description className="sr-only">Foto, idade, localização e notas pessoais para visitantes conhecerem o autor do portfólio.</Dialog.Description>

            <div className="relative flex max-h-[min(90vh,40rem)] flex-col">
              <div className="flex items-start justify-between gap-3 border-b border-border/40 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">Pessoal</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                    Prazer, sou o <GradientText variant="primarySoft">{PERSONAL_INTRO.displayName}</GradientText>
                  </p>
                </div>
                <Dialog.Close
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "shrink-0 rounded-xl border border-border/50 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                  aria-label="Fechar"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                  className="flex flex-col items-center gap-6 sm:flex-col sm:items-start"
                >
                  <PhotoBlock />

                  <div className="w-full min-w-0 flex-1 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <dl className="grid gap-3 font-mono text-[11px] sm:text-xs">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="uppercase tracking-[0.14em] text-muted-foreground">Idade</dt>
                        <dd className="tabular-nums font-semibold text-foreground">{age} anos</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="flex items-center gap-1.5 uppercase tracking-[0.14em] text-muted-foreground">
                          <MapPin className="size-3.5 text-primary/80" aria-hidden />
                          Cidade / estado
                        </dt>
                        <dd className="text-right font-semibold text-foreground">{PERSONAL_INTRO.cityState}</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="uppercase tracking-[0.14em] text-muted-foreground">País</dt>
                        <dd className="font-semibold text-foreground">{PERSONAL_INTRO.country}</dd>
                      </div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/35 pb-2 dark:border-white/[0.06]">
                        <dt className="uppercase tracking-[0.14em] text-muted-foreground">Fuso</dt>
                        <dd className="text-right text-foreground/90">{PERSONAL_INTRO.timezoneLabel}</dd>
                      </div>
                      <div className="pt-0.5">
                        <dt className="uppercase tracking-[0.14em] text-muted-foreground">Idiomas</dt>
                        <dd className="mt-1.5 flex flex-wrap gap-2">
                          {PERSONAL_INTRO.languages.map((lang) => (
                            <span key={lang} className="rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-1 text-[11px] font-medium text-primary">
                              {lang}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>

                    <div className="space-y-2 border-t border-border/35 pt-4 text-[13px] leading-relaxed dark:border-white/[0.06] sm:text-sm">
                      {PERSONAL_INTRO.blurbs.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-border/40 bg-muted/15 px-5 py-3 dark:bg-muted/10 sm:px-6">
                <p className="text-center font-mono text-[10px] text-muted-foreground">Yuri Rodrigues - Copyright © 2026 - Todos os direitos reservados</p>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function PersonalIntroTrigger({ className, children, variant = "outline" }: { className?: string; children?: ReactNode; variant?: "outline" | "ghost" | "link" }) {
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
      {children ?? (
        <>
          Ver <span className="font-semibold text-foreground">foto & detalhes</span> pessoais
        </>
      )}
    </button>
  );
}

function ageFromBirthYear(birthYear: number) {
  const y = new Date().getFullYear();
  return Math.max(0, y - birthYear);
}

function PhotoBlock() {
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
    <div className="relative size-36 mx-auto shrink-0 overflow-hidden rounded-2xl border border-primary/30 shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] ring-2 ring-primary/15 sm:size-40">
      <Image
        src={PERSONAL_INTRO.photoSrc}
        alt={`Retrato de ${PERSONAL_INTRO.displayName}`}
        width={320}
        height={400}
        className="size-full object-cover"
        sizes="160px"
        onError={() => setFailed(true)}
        priority={false}
      />
    </div>
  );
}
