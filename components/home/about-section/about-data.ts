import type { LucideIcon } from "lucide-react";
import { Building2, FolderKanban, Timer } from "lucide-react";

export const ABOUT_STAT_IDS = ["years", "projects", "companies"] as const;
export type AboutStatId = (typeof ABOUT_STAT_IDS)[number];

export type AboutStat = {
  id: AboutStatId;
  icon: LucideIcon;
  /** Número contado na entrada. */
  ticker?: number;
  /** Sufixo colado no número, ex.: "+". */
  suffix?: string;
  /** Alternativa ao ticker para valores não numéricos. */
  display?: string;
};

export const ABOUT_STATS: readonly AboutStat[] = [
  { id: "years" as const, icon: Timer, ticker: 3, suffix: "+" },
  { id: "projects" as const, icon: FolderKanban, ticker: 30, suffix: "+" },
  { id: "companies" as const, icon: Building2, ticker: 4 },
] as const;

export const FOCUS_STACK = [
  { name: "Next.js", i18nKey: "next" as const },
  { name: "NestJS", i18nKey: "nest" as const },
  { name: "Drizzle", i18nKey: "drizzle" as const },
  { name: "PostgreSQL", i18nKey: "pg" as const },
  { name: "Tailwind CSS", i18nKey: "tailwind" as const },
] as const;
