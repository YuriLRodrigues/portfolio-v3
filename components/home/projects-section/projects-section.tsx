"use client";

import { useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { CONTACT } from "@/components/home/contact-section/contact-data";
import { GitHubIcon } from "@/components/icons/github-icon";
import { Container } from "@/components/ui/container";

import { availableFilters, filterProjects, PROJECTS, type ProjectFilter } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { SectionBackground } from "../section-background";
import { sectionEase, sectionMotionViewport } from "../section-motion";
import { ProjectFilters } from "./project-filters";
import { ProjectIndexList } from "./project-index-list";
import { ProjectStage } from "./project-stage";
import { ProjectsHeader } from "./projects-header";

export function ProjectsSection() {
  const { t } = useTranslation("projects");
  const uid = useId().replace(/:/g, "");
  const panelId = `projects-panel-${uid}`;

  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedId, setSelectedId] = useState<string>(PROJECTS[0]?.id ?? "");
  // +1 = escolheu algo mais abaixo na lista, -1 = mais acima. O palco entra por esse lado.
  const [direction, setDirection] = useState(1);

  const filters = useMemo(() => availableFilters(PROJECTS), []);
  const visible = useMemo(() => filterProjects(PROJECTS, filter), [filter]);

  // O filtro pode esconder o projeto aberto; nesse caso cai no primeiro da lista.
  const active = visible.find((project) => project.id === selectedId) ?? visible[0];
  const activeIndex = active ? PROJECTS.findIndex((project) => project.id === active.id) : 0;

  function onSelect(id: string) {
    const from = visible.findIndex((project) => project.id === active?.id);
    const to = visible.findIndex((project) => project.id === id);
    setDirection(to < from ? -1 : 1);
    setSelectedId(id);
  }

  function onFilterChange(next: ProjectFilter) {
    setFilter(next);
    const list = filterProjects(PROJECTS, next);
    if (!list.some((project) => project.id === selectedId)) {
      setDirection(1);
      setSelectedId(list[0]?.id ?? "");
    }
  }

  return (
    <section id="projects" className="relative scroll-mt-20 overflow-x-clip border-b border-border/30 bg-background py-20 sm:py-28">
      <SectionBackground variant="mesh" anchor="bottomRight" />

      <Container className="relative z-10">
        <ProjectsHeader />

        <ProjectFilters filters={filters} active={filter} onChange={onFilterChange} count={visible.length} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.72, delay: 0.22, ease: sectionEase }}
          className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 sm:mt-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-7"
        >
          <ProjectIndexList projects={visible} activeId={active?.id ?? ""} onSelect={onSelect} panelId={panelId} idPrefix={uid} />

          {active ? <ProjectStage project={active} index={activeIndex} direction={direction} panelId={panelId} labelledBy={`${uid}-tab-${active.id}`} /> : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionMotionViewport}
          transition={{ duration: 0.6, delay: 0.3, ease: sectionEase }}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <a
            href={CONTACT.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("githubCtaAria")}
            className="group inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-border/55 bg-background/70 px-5 font-mono text-[11px] font-bold tracking-wider text-foreground uppercase shadow-sm backdrop-blur-sm transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:text-primary hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none"
          >
            <GitHubIcon className="size-4 shrink-0 text-primary" />
            {t("githubCta")}
            <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
