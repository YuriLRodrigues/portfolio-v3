import { Coffee, FolderKanban, Timer } from "lucide-react";

export const ABOUT_STAT_IDS = ["years", "projects", "coffee"] as const;
export type AboutStatId = (typeof ABOUT_STAT_IDS)[number];

export const ABOUT_STATS = [
  { id: "years" as const, icon: Timer, ticker: 3, suffix: "+" },
  { id: "projects" as const, icon: FolderKanban, ticker: 30, suffix: "+" },
  { id: "coffee" as const, icon: Coffee, display: "∞" },
] as const;

export const FOCUS_STACK = [
  { name: "Next.js", i18nKey: "next" as const },
  { name: "NestJS", i18nKey: "nest" as const },
  { name: "Drizzle", i18nKey: "drizzle" as const },
  { name: "PostgreSQL", i18nKey: "pg" as const },
  { name: "Tailwind CSS", i18nKey: "tailwind" as const },
] as const;
