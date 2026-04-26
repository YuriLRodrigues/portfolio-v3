"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { PortfolioCarousel } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";

import { PROJECTS } from "@/lib/projects";

import { ProjectsHeader } from "./projects-header";
import { projectToSlide } from "./projects-slides";

export function ProjectsSection() {
  const { t } = useTranslation("projects");
  const slides = useMemo(() => PROJECTS.map((p) => projectToSlide(p, t)), [t]);

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 75% 55% at 100% 0%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 52%),
          radial-gradient(ellipse 50% 40% at 0% 100%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 48%)
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.14]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -18deg,
            transparent,
            transparent 72px,
            color-mix(in oklch, var(--foreground) 2.5%, transparent) 72px,
            color-mix(in oklch, var(--foreground) 2.5%, transparent) 73px
          )`,
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <ProjectsHeader />

        <div className="relative z-[1] mt-10 w-full sm:mt-14">
          <PortfolioCarousel slides={slides} />
        </div>
      </Container>
    </section>
  );
}
