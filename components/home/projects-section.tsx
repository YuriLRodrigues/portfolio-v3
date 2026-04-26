"use client";

import { GitHubIcon } from "@/components/icons/github-icon";
import { PortfolioCarousel, type PortfolioCarouselSlide } from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { LinkPreview } from "@/components/ui/link-preview";

import { PROJECTS, STACK_LABEL, type Project, type ProjectStackRole } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

/** Badges só com `primary`: variações de borda/preenchimento para distinguir o tipo de stack. */
const stackBadgeStyles: Record<ProjectStackRole, string> = {
  full: "border border-primary/50 bg-primary/18 text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
  frontend: "border border-dashed border-primary/55 bg-primary/[0.06] text-primary",
  backend: "border border-primary/40 bg-transparent text-primary ring-2 ring-inset ring-primary/22",
};

const linkChipClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/55 bg-background/70 px-4 font-mono text-[11px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-sm transition hover:border-primary/45 hover:bg-primary/10 hover:text-primary";

function projectToSlide(project: Project): PortfolioCarouselSlide {
  return {
    id: project.id,
    title: project.name,
    subtitle: project.period,
    imageSrc: project.image,
    imageAlt: `Capa do projeto ${project.name}`,
    footer: (
      <div className="space-y-3">
        <span className={cn("inline-flex rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider", stackBadgeStyles[project.stack])}>
          {STACK_LABEL[project.stack]}
        </span>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{project.description}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
          {project.technologies.map((t) => (
            <li key={t}>
              <span className="inline-flex rounded-md border border-primary/20 bg-primary/[0.06] px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-primary sm:text-[10px]">
                {t}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-0.5">
          <LinkPreview
            url={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir site: ${project.name}`}
            className={linkChipClass}
            width={220}
            height={138}
          >
            <Globe className="size-4 shrink-0 text-primary" />
            Ver projeto
          </LinkPreview>
          <LinkPreview
            url={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositório GitHub: ${project.name}`}
            className={linkChipClass}
            width={220}
            height={138}
          >
            <GitHubIcon className="size-4 shrink-0 text-primary" />
            GitHub
          </LinkPreview>
        </div>
      </div>
    ),
  };
}

export function ProjectsSection() {
  const slides = PROJECTS.map(projectToSlide);

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
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">04</span>
          </div>
          <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">Projetos</p>
        </div>

        <div className="relative mt-8 max-w-4xl sm:mt-10">
          <p
            className="pointer-events-none absolute -left-2 top-1/2 z-0 max-h-[min(32vh,280px)] -translate-y-1/2 select-none overflow-hidden text-ellipsis whitespace-nowrap font-black uppercase leading-none tracking-[-0.04em] text-foreground/[0.055] dark:text-white/[0.07] sm:left-0"
            style={{ fontSize: "clamp(2.25rem, 12vw, 6.5rem)" }}
            aria-hidden
          >
            PROJETOS
          </p>
          <h2 className="relative z-[1] text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.06]">
            Do <GradientText variant="primaryBalanced">trabalho em time</GradientText> ao que fiz por conta
          </h2>
          <p className="relative z-[1] mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
            Entregas com squad, freela e side projects que estão em produção ou com código aberto no GitHub.
          </p>
        </div>

        <div className="relative z-[1] mt-10 w-full sm:mt-14">
          <PortfolioCarousel slides={slides} />
        </div>
      </Container>
    </section>
  );
}
