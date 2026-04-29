import type { PortfolioCarouselSlide } from "@/components/ui/carousel";

import type { Project } from "@/lib/projects";
import type { TFunction } from "i18next";

import { ProjectSlideFooter } from "./project-slide-footer";

type ProjectsT = TFunction<"projects", undefined>;

export function projectToSlide(project: Project, t: ProjectsT): PortfolioCarouselSlide {
  const itemKey = `items.${project.id}` as const;
  const name = t(`${itemKey}.name` as never) as string;
  const description = t(`${itemKey}.description` as never) as string;
  const period = t(`${itemKey}.period` as never, { defaultValue: "" }) as string;
  const stackLabel = t(`stack.${project.stack}` as never) as string;
  return {
    id: project.id,
    title: name,
    subtitle: period.trim() || undefined,
    imageSrc: project.image,
    imageAlt: t("coverAlt", { name }),
    footer: (
      <ProjectSlideFooter
        stack={project.stack}
        stackLabel={stackLabel}
        description={description}
        technologies={project.technologies}
        liveUrl={project.liveUrl}
        repoUrl={project.repoUrl}
        name={name}
      />
    ),
  };
}
