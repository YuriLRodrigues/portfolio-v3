import type { I18nLocale } from "./resources";

export function normalizeToSupported(lng: string | undefined | null): I18nLocale {
  const base = String(lng ?? "pt")
    .split(/[-_]/u)[0]
    ?.toLowerCase();
  return base === "en" ? "en" : "pt";
}

export function toHtmlLang(locale: I18nLocale): string {
  return locale === "en" ? "en" : "pt-BR";
}
