"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { PersonalIntroDialog } from "@/components/home/personal-intro";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <PersonalIntroDialog />
    </ThemeProvider>
  );
}
