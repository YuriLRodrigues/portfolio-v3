"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import i18n from "@/lib/i18n/i18n";
import { normalizeToSupported, toHtmlLang } from "@/lib/i18n/resolve-locale";

/**
 * Keeps <html lang="…"> in sync with the active i18n locale and updates document title + meta description.
 */
export function I18nDomSync() {
  const { t } = useTranslation("common");

  useEffect(() => {
    const apply = (lng?: string) => {
      const resolved = normalizeToSupported(lng ?? i18n.resolvedLanguage ?? i18n.language);
      document.documentElement.lang = toHtmlLang(resolved);
    };

    apply();
    i18n.on("languageChanged", apply);
    return () => {
      i18n.off("languageChanged", apply);
    };
  }, []);

  useEffect(() => {
    const applyMeta = () => {
      document.title = t("meta.title");
      const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (desc) {
        desc.content = t("meta.description");
      }
    };
    applyMeta();
    i18n.on("languageChanged", applyMeta);
    return () => {
      i18n.off("languageChanged", applyMeta);
    };
  }, [t]);

  return null;
}
