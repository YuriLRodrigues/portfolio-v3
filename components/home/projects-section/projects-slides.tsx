import { GitHubIcon } from "@/components/icons/github-icon";
import type { PortfolioCarouselSlide } from "@/components/ui/carousel";
import { LinkPreview } from "@/components/ui/link-preview";

import type { Project, ProjectStackRole } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { TFunction } from "i18next";
import { Globe } from "lucide-react";

/** Badges só com `primary`: variações de borda/preenchimento para distinguir o tipo de stack. */
const stackBadgeStyles: Record<ProjectStackRole, string> = {
  full: "border border-primary/50 bg-primary/18 text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
  frontend: "border border-dashed border-primary/55 bg-primary/[0.06] text-primary",
  backend: "border border-primary/40 bg-transparent text-primary ring-2 ring-inset ring-primary/22",
};

const linkChipClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/55 bg-background/70 px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm transition hover:border-primary/45 hover:bg-primary/10 hover:text-primary";

type ProjectsT = TFunction<"projects", undefined>;

export function projectToSlide(project: Project, t: ProjectsT): PortfolioCarouselSlide {
  const name = t(`items.${project.id}.name` as "items.deck.name");
  const description = t(`items.${project.id}.description` as "items.deck.description");
  const period = t(`items.${project.id}.period` as "items.deck.period");
  const stackLabel = t(`stack.${project.stack}` as "stack.full");
  return {
    id: project.id,
    title: name,
    subtitle: period,
    imageSrc: project.image,
    imageAlt: t("coverAlt", { name }),
    footer: (
      <div className="space-y-3">
        <span className={cn("inline-flex rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider", stackBadgeStyles[project.stack])}>{stackLabel}</span>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{description}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label={t("tileAria")}>
          {project.technologies.map((tech) => (
            <li key={tech}>
              <span className="inline-flex rounded-md border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-primary sm:text-[10px]">
                {tech}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-0.5">
          <LinkPreview url={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={t("openSite", { name })} className={linkChipClass} width={220} height={138}>
            <Globe className="size-4 shrink-0 text-primary" />
            {t("ctaView")}
          </LinkPreview>
          <LinkPreview url={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={t("openRepo", { name })} className={linkChipClass} width={220} height={138}>
            <GitHubIcon className="size-4 shrink-0 text-primary" />
            {t("ctaGithub")}
          </LinkPreview>
        </div>
      </div>
    ),
  };
}
