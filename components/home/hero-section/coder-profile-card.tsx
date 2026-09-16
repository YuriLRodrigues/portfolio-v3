"use client";

import { useTranslation } from "react-i18next";

import { PERSONAL_INTRO } from "@/lib/personal-intro";
import { cn } from "@/lib/utils";

export type CoderProfileData = {
  name: string;
  role: string;
  seniority: string;
  location: string;
  skills: readonly string[];
};

/** Nomes de tecnologia não traduzem; o resto do objeto vem do namespace `hero`. */
const SKILLS = ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Drizzle", "Tailwind CSS", "Docker", "Git"] as const;

const LINE_COUNT = 14;

type CoderProfileCardProps = {
  /** Sobrepõe o perfil traduzido; útil em testes e demos. */
  data?: CoderProfileData;
  className?: string;
};

/**
 * Janela estilo editor com objeto JS — cores alinhadas a `background`, `card`, `primary`, `muted`, `chart-*`.
 */
export function CoderProfileCard({ data, className }: CoderProfileCardProps) {
  const { t } = useTranslation("hero");

  const profile: CoderProfileData = data ?? {
    name: PERSONAL_INTRO.displayName,
    role: t("coder.role"),
    seniority: t("coder.seniority"),
    location: t("coder.location"),
    skills: SKILLS,
  };

  return (
    <div
      className={cn(
        "w-full max-w-xl overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/25 shadow-lg ring-1 ring-foreground/[0.04] transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--color-primary)_18%,_transparent)] lg:max-w-none dark:from-card dark:via-card/90 dark:to-background/40 dark:ring-white/[0.05]",
        className,
      )}
    >
      <div className="flex flex-row">
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-primary/60" />
        <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 to-transparent" />
      </div>

      <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-4 py-4 lg:px-6 dark:bg-muted/15">
        <div className="flex flex-row gap-2">
          <div className="size-3 rounded-full bg-destructive/90" aria-hidden />
          <div className="size-3 rounded-full bg-yellow-500/90" aria-hidden />
          <div className="size-3 rounded-full bg-green-500/90" aria-hidden />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">{t("coder.file")}</span>
      </div>

      <div className="relative overflow-hidden border-t border-border/60 px-4 py-5 lg:px-6 lg:py-7">
        <div className="pointer-events-none absolute -top-24 -left-20 size-56 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -bottom-24 size-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />

        <div className="relative flex gap-0">
          <div className="hidden shrink-0 flex-col items-end pr-3 font-mono text-[11px] leading-relaxed text-muted-foreground/80 sm:text-xs md:flex">
            {Array.from({ length: LINE_COUNT }, (_, i) => (
              <div key={i} className="tabular-nums select-none">
                {i + 1}
              </div>
            ))}
          </div>

          <code className="min-w-0 font-mono text-[11px] leading-relaxed sm:text-xs md:text-sm">
            <div>
              <span className="text-primary">const</span> <span className="text-foreground">{t("coder.varName")}</span> <span className="text-primary">=</span>{" "}
              <span className="text-muted-foreground">{"{"}</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">{t("coder.keyName")}:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{profile.name}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">{t("coder.keyRole")}:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{profile.role}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">{t("coder.keySeniority")}:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{profile.seniority}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">{t("coder.keyLocation")}:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{profile.location}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">{t("coder.keyStack")}:</span> <span className="text-muted-foreground">{"["}</span>
            </div>
            <div className="flex flex-wrap pl-8 sm:pl-12">
              {profile.skills.map((skill, index) => (
                <span key={skill} className="mr-1">
                  <span className="text-muted-foreground">&apos;</span>
                  <span className="text-primary">{skill}</span>
                  <span className="text-muted-foreground">&apos;</span>
                  {index < profile.skills.length - 1 ? <span className="text-muted-foreground">, </span> : null}
                </span>
              ))}
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-muted-foreground">{"],"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{"};"}</span>
            </div>
          </code>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 font-mono text-[10px] text-muted-foreground sm:text-xs lg:px-6">
        <span>UTF-8</span>
        <span>TypeScript</span>
        <span>Ln {LINE_COUNT}, Col 1</span>
      </div>
    </div>
  );
}
