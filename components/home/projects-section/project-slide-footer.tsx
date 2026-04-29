"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkPreview } from "@/components/ui/link-preview";

import type { Project, ProjectStackRole } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const INITIAL_TECH_COUNT = 6;

const stackBadgeStyles: Record<ProjectStackRole, string> = {
  full: "border border-primary/50 bg-primary/18 text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
  frontend: "border border-dashed border-primary/55 bg-primary/[0.06] text-primary",
  backend: "border border-primary/40 bg-transparent text-primary ring-2 ring-inset ring-primary/22",
};

const linkChipClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/55 bg-background/70 px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/45 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.99]";

type ProjectSlideFooterProps = {
  stack: ProjectStackRole;
  stackLabel: string;
  description: string;
  technologies: readonly string[];
  liveUrl: string;
  repoUrl: string;
  name: string;
};

export function ProjectSlideFooter({ stack, stackLabel, description, technologies, liveUrl, repoUrl, name }: ProjectSlideFooterProps) {
  const { t } = useTranslation("projects");
  const [techExpanded, setTechExpanded] = useState(false);
  const list = [...technologies];
  const overflow = list.length - INITIAL_TECH_COUNT;
  const hasOverflow = overflow > 0;
  const visible = techExpanded || !hasOverflow ? list : list.slice(0, INITIAL_TECH_COUNT);

  return (
    <div className="space-y-3">
      <span className={cn("inline-flex rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase", stackBadgeStyles[stack])}>{stackLabel}</span>
      <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:line-clamp-2 sm:text-sm">{description}</p>
      <div className="w-full">
        <ul className="flex flex-wrap items-center gap-1.5" aria-label={t("tileAria")}>
          {visible.map((tech) => (
            <li key={tech}>
              <span className="inline-flex rounded-md border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary uppercase sm:text-[10px]">
                {tech}
              </span>
            </li>
          ))}
          {hasOverflow && !techExpanded ? (
            <li className="my-auto contents">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-dashed border-primary/40 bg-primary/[0.04] px-2 py-0.5 font-mono text-[8px] font-semibold tracking-wider text-primary uppercase transition-[border-color,background-color,transform] duration-200 hover:border-primary/55 hover:bg-primary/[0.08] sm:text-[10px]"
                aria-expanded={false}
                onClick={() => setTechExpanded(true)}
              >
                {t("stackShowMore", { count: overflow })}
              </button>
            </li>
          ) : null}
        </ul>
        {hasOverflow && techExpanded ? (
          <button type="button" className="mt-2 text-xs font-medium text-primary underline-offset-4 hover:underline" aria-expanded onClick={() => setTechExpanded(false)}>
            {t("stackShowLess")}
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 pt-0.5">
        <LinkPreview url={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={t("openSite", { name })} className={linkChipClass} width={220} height={138}>
          <Globe className="size-4 shrink-0 text-primary" />
          {t("ctaView")}
        </LinkPreview>
        <LinkPreview url={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={t("openRepo", { name })} className={linkChipClass} width={220} height={138}>
          <GitHubIcon className="size-4 shrink-0 text-primary" />
          {t("ctaGithub")}
        </LinkPreview>
      </div>
    </div>
  );
}
