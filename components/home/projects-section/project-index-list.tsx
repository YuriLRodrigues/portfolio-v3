"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import type { Project } from "@/lib/projects";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { sectionEase } from "../section-motion";

type ProjectIndexListProps = {
  projects: readonly Project[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Id do painel controlado, para ligar tab ↔ tabpanel. */
  panelId: string;
  idPrefix: string;
};

/**
 * Sumário dos projetos. Em telas largas ocupa a altura inteira do palco e os
 * itens dividem o espaço entre si; no telemóvel vira um trilho horizontal com
 * scroll-snap. Segue o padrão tablist: seta navega, Home/End salta para as
 * pontas e só o item ativo fica na ordem do Tab.
 */
export function ProjectIndexList({ projects, activeId, onSelect, panelId, idPrefix }: ProjectIndexListProps) {
  const { t } = useTranslation("projects");
  const reducedMotion = usePrefersReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  const activeIndex = Math.max(
    0,
    projects.findIndex((project) => project.id === activeId),
  );

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelectorAll<HTMLButtonElement>("[role='tab']")[activeIndex];
    if (!list || !tab) return;

    if (shouldFocus.current) {
      shouldFocus.current = false;
      tab.focus();
    }

    // Trilho horizontal (telemóvel): centra o item escolhido, de modo que
    // escolher o próximo já traz os seguintes para dentro da tela.
    if (list.scrollWidth <= list.clientWidth + 4) return;
    const target = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: reducedMotion ? "auto" : "smooth" });
  }, [activeIndex, reducedMotion]);

  function move(to: number, focus = true) {
    const next = (to + projects.length) % projects.length;
    const project = projects[next];
    if (!project) return;
    shouldFocus.current = focus;
    onSelect(project.id);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        move(activeIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        move(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        move(0);
        break;
      case "End":
        event.preventDefault();
        move(projects.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex flex-col lg:h-full">
      <div className="mb-3 flex items-center gap-3">
        <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">{t("indexKicker")}</p>

        {/* Setas só no trilho horizontal; no desktop a lista inteira já está visível. */}
        <div className="ml-auto flex items-center gap-1.5 lg:hidden">
          <span className="font-mono text-[10px] font-bold text-muted-foreground tabular-nums" aria-hidden>
            {String(activeIndex + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => move(activeIndex - 1, false)}
            aria-label={t("prev")}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border/55 text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-primary/45 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none active:scale-95"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => move(activeIndex + 1, false)}
            aria-label={t("next")}
            className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border/55 text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-primary/45 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none active:scale-95"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        role="tablist"
        aria-label={t("indexLabel")}
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className={cn(
          "relative",
          "flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory lg:snap-none",
          "lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pr-1 lg:pb-0",
        )}
      >
        {projects.map((project, index) => {
          const isActive = project.id === activeId;
          const name = t(`items.${project.id}.name` as never) as string;
          const tagline = t(`items.${project.id}.tagline` as never) as string;

          return (
            <button
              key={project.id}
              id={`${idPrefix}-tab-${project.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(project.id)}
              className={cn(
                "group relative flex shrink-0 cursor-pointer snap-start items-center gap-3 overflow-hidden rounded-xl border px-3 py-2.5 text-left",
                "transition-[border-color,background-color,transform] duration-250",
                "focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none",
                "lg:min-h-[3.5rem] lg:w-full lg:flex-1 lg:shrink lg:px-4 lg:py-3",
                isActive ? "border-primary/50" : "border-border/45 bg-background/50 hover:border-primary/30 hover:bg-primary/[0.04] lg:hover:translate-x-1",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${idPrefix}-index-active`}
                  className="absolute inset-0 -z-[1] rounded-[inherit] bg-primary/[0.09] shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_18%,_transparent)]"
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38, mass: 0.7 }}
                  aria-hidden
                />
              ) : null}

              <span
                className={cn(
                  "relative font-mono text-[11px] font-bold tabular-nums transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-primary/70",
                )}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="relative min-w-0">
                <span className={cn("block truncate text-sm font-semibold transition-colors duration-200", isActive ? "text-foreground" : "text-foreground/80")}>{name}</span>
                <span className="mt-0.5 hidden truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase lg:block">
                  {t(`stack.${project.stack}` as never)} · {project.year}
                </span>
                <span className={cn("mt-1 hidden truncate text-[11px] leading-snug xl:block", isActive ? "text-primary/80" : "text-muted-foreground/70")}>{tagline}</span>
              </span>

              <motion.span
                className="relative ml-auto hidden w-px shrink-0 rounded-full bg-primary lg:block"
                initial={false}
                animate={{ height: isActive ? 24 : 0, opacity: isActive ? 1 : 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.32, ease: sectionEase }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
