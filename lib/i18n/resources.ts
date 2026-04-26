import { en } from "./locales/en";
import { pt } from "./locales/pt";

export const supportedLocales = ["pt", "en"] as const;

export type I18nLocale = (typeof supportedLocales)[number];

/** Runtime default; keep equal to the locale used in `types/i18next.d.ts` (`resources.pt`). */
export const defaultLocale: I18nLocale = "pt";

/** Default namespace when `useTranslation()` is called without `ns`. */
export const defaultNS = "common" as const;

export const resources = {
  pt,
  en,
} as const;
