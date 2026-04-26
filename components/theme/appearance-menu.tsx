"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiBrazilFlag, GiUsaFlag } from "react-icons/gi";

import { AccentPicker } from "@/components/theme/accent-picker";
import { Button } from "@/components/ui/button";

import { useClientReady } from "@/hooks/use-client-ready";
import { normalizeToSupported } from "@/lib/i18n/resolve-locale";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Palette, Sun } from "lucide-react";

const languageOptions = [
  { id: "pt" as const, labelKey: "languagePt" as const, ariaKey: "languagePtAria" as const, Icon: GiBrazilFlag },
  { id: "en" as const, labelKey: "languageEn" as const, ariaKey: "languageEnAria" as const, Icon: GiUsaFlag },
] as const;

const themeOptions = [
  { id: "system" as const, label: "Sistema", icon: Monitor },
  { id: "light" as const, label: "Claro", icon: Sun },
  { id: "dark" as const, label: "Escuro", icon: Moon },
];

export function AppearanceMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation("common");
  const clientReady = useClientReady();
  const titleId = useId();
  const activeLanguage = normalizeToSupported(i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 border-border/60 bg-background/60 shadow-sm backdrop-blur-sm"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t("appearance.buttonAria")}
        title={t("appearance.buttonTitle")}
        disabled={!clientReady}
        onClick={() => setOpen((v) => !v)}
      >
        <Palette className="size-4" />
      </Button>

      {open && clientReady ? (
        <div
          className="absolute right-0 z-[80] mt-2 w-[min(calc(100vw-1.5rem),18.5rem)] rounded-xl border border-border/50 bg-background/90 p-4 shadow-2xl ring-1 ring-border/30 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <p id={titleId} className="mb-3 text-sm font-semibold text-foreground">
            {t("appearance.dialogTitle")}
          </p>

          <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t("appearance.language")}</p>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {languageOptions.map(({ id, labelKey, ariaKey, Icon }) => {
              const active = activeLanguage === id;
              return (
                <Button
                  key={id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className={cn("h-auto flex-col gap-1.5 border-border/50 py-2.5", !active && "bg-background/50")}
                  aria-pressed={active}
                  aria-label={t(`appearance.${ariaKey}`)}
                  onClick={() => {
                    void i18n.changeLanguage(id);
                  }}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  <span className="text-[0.7rem] font-medium leading-none">{t(`appearance.${labelKey}`)}</span>
                </Button>
              );
            })}
          </div>

          <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t("appearance.theme")}</p>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {themeOptions.map(({ id, icon: Icon }) => {
              const label = id === "system" ? t("appearance.themeSystem") : id === "light" ? t("appearance.themeLight") : t("appearance.themeDark");
              const active = theme === id;
              return (
                <Button
                  key={id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className={cn("h-auto flex-col gap-1.5 border-border/50 py-2.5", !active && "bg-background/50")}
                  aria-pressed={active}
                  onClick={() => {
                    setTheme(id);
                  }}
                >
                  <Icon className="size-4" />
                  <span className="text-[0.7rem] font-medium leading-none">{label}</span>
                </Button>
              );
            })}
          </div>

          <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t("appearance.accent")}</p>
          <AccentPicker />
        </div>
      ) : null}
    </div>
  );
}
