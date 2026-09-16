"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { GitHubIcon } from "@/components/icons/github-icon";

import type { Project } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { sectionEase } from "../section-motion";
import { ProjectCover } from "./covers";

const INITIAL_TECH_COUNT = 8;
const HIGHLIGHT_KEYS = ["h1", "h2", "h3"] as const;

const stackBadge: Record<Project["stack"], string> = {
  full: "border-primary/50 bg-primary/[0.16] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
  frontend: "border-dashed border-primary/55 bg-primary/[0.06] text-primary",
  backend: "border-primary/40 bg-transparent text-primary ring-2 ring-inset ring-primary/20",
};

const repoChip =
  "inline-flex h-10 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border/55 bg-background/70 px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45";

/**
 * `direction` vem do índice: +1 quando o projeto escolhido está abaixo do
 * anterior, -1 quando está acima. O painel entra pelo lado de onde veio.
 */
const panelVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, y: 20 * direction }),
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: sectionEase, staggerChildren: 0.055, delayChildren: 0.06 },
  },
  exit: (direction: number) => ({ opacity: 0, y: -16 * direction, transition: { duration: 0.24, ease: sectionEase } }),
};

const coverVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.62, ease: sectionEase } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: sectionEase } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const still: Variants = { hidden: {}, visible: {}, exit: {} };

type ProjectStageProps = {
  project: Project;
  index: number;
  direction: number;
  panelId: string;
  labelledBy: string;
};

export function ProjectStage({ project, index, direction, panelId, labelledBy }: ProjectStageProps) {
  const { t } = useTranslation("projects");
  const reducedMotion = usePrefersReducedMotion();
  // Guarda o projeto em que a lista foi aberta: ao trocar de projeto, volta sozinha ao estado curto.
  const [expandedFor, setExpandedFor] = useState<string | null>(null);
  const techExpanded = expandedFor === project.id;

  const name = t(`items.${project.id}.name` as never) as string;
  const tagline = t(`items.${project.id}.tagline` as never) as string;
  const description = t(`items.${project.id}.description` as never) as string;
  const stackLabel = t(`stack.${project.stack}` as never) as string;
  const kindLabel = t(`kind.${project.kind}` as never) as string;

  const overflow = project.technologies.length - INITIAL_TECH_COUNT;
  const hasOverflow = overflow > 0;
  const visibleTech = techExpanded || !hasOverflow ? project.technologies : project.technologies.slice(0, INITIAL_TECH_COUNT);

  const panel = reducedMotion ? still : panelVariants;
  const cover = reducedMotion ? still : coverVariants;
  const item = reducedMotion ? still : itemVariants;

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      tabIndex={0}
      className={cn(
        "relative overflow-hidden rounded-2xl p-[1px] shadow-[0_28px_90px_-46px_rgba(0,0,0,0.45)] sm:rounded-3xl",
        "bg-gradient-to-br from-primary/40 via-primary/[0.1] to-transparent",
        "focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none",
        "dark:shadow-[0_32px_110px_-52px_rgba(0,0,0,0.75)]",
      )}
    >
      <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-gradient-to-br from-card/95 via-card/80 to-background/90 ring-1 ring-white/[0.06] backdrop-blur-xl ring-inset sm:rounded-[calc(1.5rem-1px)] dark:from-card/70 dark:via-card/50 dark:to-background/70 dark:ring-white/[0.05]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div key={project.id} custom={direction} variants={panel} initial="hidden" animate="visible" exit="exit">
            <motion.div variants={cover} className="relative aspect-[16/10] w-full overflow-hidden border-b border-primary/15 dark:border-white/[0.08]">
              <ProjectCover id={project.id} alt={t("coverAlt", { name })} index={index} meta={`${project.year} · ${kindLabel}`} />

              {reducedMotion ? null : (
                <motion.span
                  key={`${project.id}-sweep`}
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: "420%", opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, ease: sectionEase, delay: 0.08 }}
                  aria-hidden
                />
              )}
            </motion.div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <motion.div variants={item} className="flex flex-wrap items-center gap-2">
                <span className={cn("inline-flex rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider uppercase", stackBadge[project.stack])}>
                  {stackLabel}
                </span>
                <span className="inline-flex rounded-lg border border-border/55 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {kindLabel}
                </span>
                <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase sm:ml-1">
                  <span className="sr-only">{t("yearLabel")}: </span>
                  {project.year}
                </span>
              </motion.div>

              <motion.div variants={item} className="mt-3">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-pretty text-foreground sm:text-2xl">{name}</h3>
                <p className="mt-1 text-sm font-medium text-pretty text-primary/90">{tagline}</p>
              </motion.div>

              <motion.p variants={item} className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-pretty text-muted-foreground sm:text-sm">
                {description}
              </motion.p>

              <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
                <div>
                  <motion.p variants={item} className="font-mono text-[10px] font-semibold tracking-[0.18em] text-primary uppercase">
                    {t("highlightsLabel")}
                  </motion.p>
                  <ul className="mt-2.5 space-y-2">
                    {HIGHLIGHT_KEYS.map((key) => (
                      <motion.li key={key} variants={item} className="flex gap-3 text-[13px] leading-relaxed text-foreground/85">
                        <span className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 rounded-[2px] bg-primary/70" aria-hidden />
                        <span className="text-pretty">{t(`items.${project.id}.${key}` as never) as string}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div variants={item} className="lg:border-l lg:border-border/40 lg:pl-5">
                  <ul className="flex flex-wrap items-center gap-1.5" aria-label={t("tileAria")}>
                    {visibleTech.map((tech) => (
                      <li key={tech}>
                        <span className="inline-flex rounded-md border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary uppercase sm:text-[10px]">
                          {tech}
                        </span>
                      </li>
                    ))}
                    {hasOverflow && !techExpanded ? (
                      <li>
                        <button
                          type="button"
                          onClick={() => setExpandedFor(project.id)}
                          aria-expanded={false}
                          className="inline-flex cursor-pointer items-center rounded-md border border-dashed border-primary/40 bg-primary/[0.04] px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-primary uppercase transition-[border-color,background-color] duration-200 hover:border-primary/55 hover:bg-primary/[0.08] sm:text-[10px]"
                        >
                          {t("stackShowMore", { count: overflow })}
                        </button>
                      </li>
                    ) : null}
                  </ul>
                  {hasOverflow && techExpanded ? (
                    <button
                      type="button"
                      onClick={() => setExpandedFor(null)}
                      aria-expanded
                      className="mt-2 cursor-pointer text-xs font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {t("stackShowLess")}
                    </button>
                  ) : null}

                  {/* Grid em vez de wrap: dois repositórios dividem a linha em vez de empilhar por 2px. */}
                  <div className={cn("mt-4 grid gap-2", project.repos.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                    {project.repos.map((repo) => {
                      const repoLabel = t(`repo.${repo.kind}` as never) as string;
                      return (
                        <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={t("openRepo", { name, repo: repoLabel })} className={repoChip}>
                          <GitHubIcon className="size-4 shrink-0 text-primary" />
                          <span className="truncate">{repoLabel}</span>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
