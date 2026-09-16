"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";

import { buttonVariants } from "@/components/ui/button";

import { scrollToAnchorSlow } from "@/lib/smooth-scroll-anchor";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, CornerDownLeft, MessageCircleQuestion, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { ASK_COMMANDS, matchCommand, type AskAction, type AskCommandId } from "./ask-commands";

const EASE = [0.22, 1, 0.36, 1] as const;

type Entry = {
  key: number;
  question: string;
  /** null quando nada casou — a resposta vira o texto de fallback. */
  commandId: AskCommandId | null;
};

export function AskWidget() {
  const { t } = useTranslation("ask");
  const reducedMotion = usePrefersReducedMotion();

  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const nextKey = useRef(0);

  const keywordEntries = useMemo(
    () =>
      ASK_COMMANDS.map((command) => ({
        id: command.id,
        keywords: (t(`commands.${command.id}.keywords` as never) as string).split(","),
      })),
    [t],
  );

  const ask = useCallback(
    (question: string, forcedId?: AskCommandId) => {
      const trimmed = question.trim();
      if (!trimmed) return;
      const commandId = forcedId ?? matchCommand(trimmed, keywordEntries);
      nextKey.current += 1;
      setEntries((list) => [...list, { key: nextKey.current, question: trimmed, commandId }]);
      setDraft("");
    },
    [keywordEntries],
  );

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(draft);
  }

  // Cada nova resposta desce a conversa até o fim.
  useEffect(() => {
    const el = transcriptRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [entries.length, reducedMotion]);

  function runAction(action: AskAction) {
    if (action.kind === "scroll") {
      setOpen(false);
      // Espera o diálogo sair antes de rolar, senão o scroll lock engole o movimento.
      window.setTimeout(() => scrollToAnchorSlow(action.sectionId), 220);
    }
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) window.setTimeout(() => inputRef.current?.focus(), 120);
      }}
    >
      <Dialog.Trigger
        className={cn(
          "fixed right-4 bottom-4 z-[90] grid size-13 cursor-pointer place-items-center rounded-2xl sm:right-6 sm:bottom-6",
          "border border-primary/45 bg-gradient-to-br from-card/95 to-background/85 text-primary backdrop-blur-md",
          "shadow-[0_14px_40px_-14px_color-mix(in_oklch,var(--color-primary)_55%,_transparent)] ring-1 ring-primary/15",
          "transition-[transform,border-color,background-color,box-shadow] duration-250",
          "hover:-translate-y-0.5 hover:scale-105 hover:border-primary/70 hover:bg-primary/10 active:scale-95",
          "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          "data-[popup-open]:scale-95 data-[popup-open]:opacity-0",
        )}
        style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label={t("launcherAria")}
        title={t("launcherTooltip")}
      >
        <MessageCircleQuestion className="size-6" aria-hidden />
        <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-primary font-mono text-[9px] font-black text-primary-foreground" aria-hidden>
          ?
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop
          className={cn(
            "fixed inset-0 z-[120] bg-black/55 backdrop-blur-[4px]",
            "transition-[opacity,backdrop-filter] duration-300 ease-out",
            "data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          )}
        />
        <Dialog.Viewport className={cn("pointer-events-none fixed inset-0 z-[121] flex items-end justify-center p-3 sm:justify-end sm:p-6", "[&>*]:pointer-events-auto")}>
          <Dialog.Popup
            className={cn(
              "relative flex h-[min(78vh,34rem)] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-primary/25",
              "bg-gradient-to-br from-card/96 via-card/88 to-background/92 shadow-[0_28px_90px_-24px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.07] backdrop-blur-xl",
              "dark:from-card/92 dark:via-card/78 dark:to-background/88",
              "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none",
              "data-[starting-style]:translate-y-4 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
              "data-[ending-style]:translate-y-3 data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
            )}
          >
            <div className="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full bg-primary/20 blur-3xl" aria-hidden />

            <Dialog.Title className="sr-only">{t("title")}</Dialog.Title>
            <Dialog.Description className="sr-only">{t("description")}</Dialog.Description>

            {/* Cabeçalho estilo janela de terminal */}
            <div className="relative flex items-center gap-3 border-b border-border/45 bg-muted/35 px-4 py-3 dark:bg-muted/15">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-destructive/80" />
                <span className="size-2.5 rounded-full bg-yellow-500/80" />
                <span className="size-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="flex-1 truncate font-mono text-[11px] text-muted-foreground">{t("window")}</span>
              {entries.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setEntries([])}
                  aria-label={t("clearAria")}
                  className="cursor-pointer rounded-lg border border-border/50 px-2 py-1 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase transition-colors duration-200 hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none"
                >
                  {t("clear")}
                </button>
              ) : null}
              <Dialog.Close
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 shrink-0 rounded-lg text-muted-foreground hover:text-foreground")}
                aria-label={t("close")}
              >
                <X className="size-4" />
              </Dialog.Close>
            </div>

            <div
              ref={transcriptRef}
              className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 font-mono text-[12.5px] leading-relaxed"
              aria-live="polite"
              aria-label={t("transcriptLabel")}
            >
              <p className="text-muted-foreground">{t("greeting")}</p>

              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.key}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.34, ease: EASE }}
                    className="mt-5"
                  >
                    <p className="text-foreground">
                      <span className="mr-2 font-bold text-primary" aria-hidden>
                        $
                      </span>
                      {entry.question}
                    </p>
                    <AskAnswer commandId={entry.commandId} onAction={runAction} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="relative border-t border-border/45 px-4 pt-3 pb-3">
              <p className="sr-only" id="ask-suggestions-label">
                {t("suggestionsLabel")}
              </p>
              <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="ask-suggestions-label">
                {ASK_COMMANDS.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    onClick={() => ask(t(`commands.${command.id}.label` as never) as string, command.id)}
                    className="cursor-pointer rounded-lg border border-primary/25 bg-primary/[0.06] px-2.5 py-1 text-[11px] font-medium text-primary transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/[0.12] focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none"
                  >
                    {t(`commands.${command.id}.label` as never) as string}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
                <label className="sr-only" htmlFor="ask-input">
                  {t("inputLabel")}
                </label>
                <span className="font-mono text-sm font-bold text-primary" aria-hidden>
                  $
                </span>
                <input
                  id="ask-input"
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={t("inputPlaceholder")}
                  autoComplete="off"
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[12.5px] text-foreground placeholder:text-muted-foreground/70 focus:ring-0 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={t("sendAria")}
                  disabled={draft.trim().length === 0}
                  className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-border/55 text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-primary/45 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border/55 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                >
                  <CornerDownLeft className="size-3.5" aria-hidden />
                </button>
              </form>

              <p className="mt-2 font-mono text-[10px] tracking-wider text-muted-foreground/70">{t("hint")}</p>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function AskAnswer({ commandId, onAction }: { commandId: AskCommandId | null; onAction: (action: AskAction) => void }) {
  const { t } = useTranslation("ask");

  if (!commandId) {
    return <p className="mt-1.5 text-muted-foreground">{t("unknown")}</p>;
  }

  const answer = t(`commands.${commandId}.answer` as never) as string;
  const command = ASK_COMMANDS.find((item) => item.id === commandId);

  return (
    <div className="mt-1.5">
      {answer.split("\n").map((line, index) => (
        <p key={index} className="text-muted-foreground">
          {line}
        </p>
      ))}

      {command?.actions?.length ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {command.actions.map((action) =>
            action.kind === "link" ? (
              <a
                key={action.labelKey + action.href}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/[0.08] px-2.5 py-1 font-sans text-[11px] font-semibold text-primary transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/[0.14] focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none"
              >
                {t(`actions.${action.labelKey}` as never) as string}
                <ArrowUpRight className="size-3" aria-hidden />
              </a>
            ) : (
              <button
                key={action.labelKey + action.sectionId}
                type="button"
                onClick={() => onAction(action)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/[0.08] px-2.5 py-1 font-sans text-[11px] font-semibold text-primary transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/[0.14] focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none"
              >
                {t(`actions.${action.labelKey}` as never) as string}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}
