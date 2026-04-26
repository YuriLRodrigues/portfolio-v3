"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import { I18nDomSync } from "@/components/i18n/i18n-dom-sync";
import { PersonalIntroDialog } from "@/components/home/hero-section";

import i18n from "@/lib/i18n/i18n";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nDomSync />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <PersonalIntroDialog />
      </ThemeProvider>
    </I18nextProvider>
  );
}
