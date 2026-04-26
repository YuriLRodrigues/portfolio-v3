"use client";

import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import { I18N_NAMESPACES } from "./namespaces";
import { normalizeToSupported } from "./resolve-locale";
import { type I18nLocale, defaultLocale, defaultNS, resources, supportedLocales } from "./resources";
import { I18N_LANG_STORAGE_KEY } from "./storage";

function getStoredLanguage(): I18nLocale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  try {
    const raw = window.localStorage.getItem(I18N_LANG_STORAGE_KEY);
    if (raw === "pt" || raw === "en") {
      return raw;
    }
  } catch {
    // ignore
  }
  return defaultLocale;
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: defaultLocale,
  supportedLngs: [...supportedLocales],
  defaultNS,
  ns: [...I18N_NAMESPACES],
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

i18n.on("languageChanged", (lng) => {
  const normalized = normalizeToSupported(lng);
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(I18N_LANG_STORAGE_KEY, normalized);
  } catch {
    // ignore
  }
});

export default i18n;
export { defaultNS, resources } from "./resources";
