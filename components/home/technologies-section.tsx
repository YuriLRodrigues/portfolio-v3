"use client";

import type { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from "react";
import { useCallback, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils";
import {
  SiCursor,
  SiDocker,
  SiEslint,
  SiFigma,
  SiFramer,
  SiGit,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons";
import { Code2, Cpu, Layers, Sparkles, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type BrandSvg = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
type Tech = { name: string; tagline: string; detail: string; Icon: BrandSvg; badge?: string };

const FRONTEND: Tech[] = [
  { name: "React", tagline: "Componentes & estado", detail: "Composição, hooks e boundaries para UI previsível em produto.", Icon: SiReact, badge: "UI" },
  { name: "Next.js", tagline: "App Router & RSC", detail: "Streaming, layouts aninhados e otimização de assets sem gambiarra.", Icon: SiNextdotjs, badge: "App" },
  { name: "TypeScript", tagline: "Tipos ponta a ponta", detail: "Modelos compartilhados entre cliente e servidor — menos regressões.", Icon: SiTypescript, badge: "TS" },
  { name: "Tailwind CSS", tagline: "Design no markup", detail: "Tokens, dark mode e responsivo com consistência de spacing.", Icon: SiTailwindcss, badge: "CSS" },
  { name: "Motion", tagline: "Microinterações", detail: "Transições com curvas pensadas — sem travar o main thread.", Icon: SiFramer, badge: "UX" },
  { name: "Radix UI", tagline: "Acessibilidade", detail: "Primitivos headless: foco, teclado e ARIA já no núcleo.", Icon: SiRadixui, badge: "a11y" },
];

const BACKEND: Tech[] = [
  { name: "Node.js", tagline: "Runtime & tooling", detail: "I/O assíncrono e ecossistema maduro para APIs e workers.", Icon: SiNodedotjs, badge: "I/O" },
  { name: "NestJS", tagline: "Módulos & DI", detail: "Camadas claras, testes e escalonamento horizontal quando o tráfego sobe.", Icon: SiNestjs, badge: "API" },
  { name: "PostgreSQL", tagline: "Dados relacionais", detail: "Integridade, índices e consultas que aguentam crescimento real.", Icon: SiPostgresql, badge: "SQL" },
  { name: "Prisma", tagline: "ORM & migrações", detail: "Schema como fonte da verdade e deploy de mudanças com confiança.", Icon: SiPrisma, badge: "ORM" },
  { name: "Redis", tagline: "Cache & filas", detail: "Sessões, rate limit e filas leves para desacoplar picos de carga.", Icon: SiRedis, badge: "cache" },
];

const TOOLS: Tech[] = [
  { name: "Git", tagline: "Versionamento", detail: "Branches curtas, rebase quando faz sentido e histórico legível.", Icon: SiGit, badge: "VCS" },
  { name: "Docker", tagline: "Ambientes", detail: "Paridade dev/prod e imagens enxutas para CI mais rápido.", Icon: SiDocker, badge: "ops" },
  { name: "pnpm", tagline: "Pacotes rápidos", detail: "Disco compartilhado e lockfile determinístico em monorepos.", Icon: SiPnpm, badge: "pkg" },
  { name: "ESLint", tagline: "Qualidade", detail: "Regras alinhadas ao time — estilo e bugs antes do merge.", Icon: SiEslint, badge: "lint" },
  { name: "Figma", tagline: "Handoff", detail: "Tokens, grids e componentes viram código sem telefone sem fio.", Icon: SiFigma, badge: "UX" },
  { name: "Cursor", tagline: "IDE assistida", detail: "Automação com revisão humana: acelera sem substituir critério.", Icon: SiCursor, badge: "IDE" },
];

const PANEL_META = [
  {
    id: "frontend",
    title: "Frontend",
    kicker: "Camada visível",
    blurb: "Performance percebida, acessibilidade e consistência visual.",
    items: FRONTEND,
    icon: Layers,
    span: "lg:col-span-5",
    tileGrid: "grid grid-cols-2 gap-3 sm:gap-3.5",
    accent: "from-primary/[0.12] via-transparent to-transparent",
  },
  {
    id: "backend",
    title: "Backend",
    kicker: "Serviços & dados",
    blurb: "Contratos estáveis, persistência e resiliência para o produto crescer.",
    items: BACKEND,
    icon: Code2,
    span: "lg:col-span-4",
    tileGrid: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-1 xl:grid-cols-2",
    accent: "from-transparent via-primary/[0.08] to-transparent",
  },
  {
    id: "ferramentas",
    title: "Ferramentas",
    kicker: "Do repo ao deploy",
    blurb: "Pipeline de trabalho que mantém ritmo sem sacrificar qualidade.",
    items: TOOLS,
    icon: Wrench,
    span: "lg:col-span-3",
    tileGrid: "grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1 xl:grid-cols-2",
    accent: "from-transparent via-transparent to-primary/[0.1]",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const panel = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const totalTechs = FRONTEND.length + BACKEND.length + TOOLS.length;

function PipelineDecor({ className }: { className?: string }) {
  return (
    <div className={cn("hidden w-full select-none items-center justify-center gap-0 px-4 lg:flex", className)} aria-hidden>
      <div className="h-px flex-1 max-w-[6rem] bg-gradient-to-r from-transparent to-border/60" />
      <div className="flex items-center gap-2 px-3">
        <span className="size-2 rounded-full border border-primary/40 bg-primary/20 shadow-[0_0_14px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)]" />
        <span className="h-px w-12 bg-gradient-to-r from-border/80 to-border/25 sm:w-20" />
        <Cpu className="size-4 text-primary/70" />
        <span className="h-px w-12 bg-gradient-to-l from-border/80 to-border/25 sm:w-20" />
        <span className="size-2 rounded-full border border-primary/40 bg-primary/20 shadow-[0_0_14px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)]" />
      </div>
      <div className="h-px flex-1 max-w-[6rem] bg-gradient-to-l from-transparent to-border/60" />
    </div>
  );
}

function TechTile({ tech, compact }: { tech: Tech; compact?: boolean }) {
  const { name, tagline, detail, Icon, badge } = tech;
  const reduceMotion = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const tileRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !tileRef.current) return;
      const r = tileRef.current.getBoundingClientRect();
      setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    },
    [reduceMotion],
  );

  const spotlightStyle: CSSProperties = {
    background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 52%)`,
  };

  return (
    <motion.div
      ref={tileRef}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.42, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.22, ease: easeOut } }}
      onMouseMove={onMove}
      onMouseLeave={() => setGlow({ x: 50, y: 50 })}
      className={cn(
        "group/tile relative overflow-hidden rounded-2xl border border-border/55 bg-gradient-to-br from-card via-card/75 to-background/45 p-3.5 shadow-sm ring-1 ring-inset ring-white/[0.05] dark:from-card/55 dark:via-card/38 dark:to-background/22 dark:ring-white/[0.04]",
        "transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/40 hover:shadow-[0_16px_48px_-18px_color-mix(in_oklch,var(--color-primary)_38%,_transparent)]",
        compact && "p-3",
      )}
    >
      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100" style={spotlightStyle} aria-hidden />
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-primary/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-start gap-3">
        <span
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border border-border/60 bg-background/75 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-foreground)_7%,_transparent)] dark:bg-background/38",
            "transition-transform duration-300 group-hover/tile:scale-[1.03] group-hover/tile:border-primary/35",
            compact ? "size-10" : "size-11 sm:size-12",
          )}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
            style={{
              background: "conic-gradient(from 180deg, transparent, color-mix(in oklch, var(--primary) 25%, transparent), transparent)",
            }}
            aria-hidden
          />
          <Icon size={compact ? 22 : 26} className="relative z-[1] opacity-[0.92]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className={cn("min-w-0 truncate font-semibold tracking-tight text-foreground", compact ? "text-sm" : "text-[0.95rem] sm:text-base")}>{name}</p>
            {badge ? (
              <span className="shrink-0 rounded border border-primary/20 bg-primary/[0.08] px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-wider text-primary/90">
                {badge}
              </span>
            ) : null}
          </div>
          <p className={cn("truncate text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>{tagline}</p>

          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              "grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover/tile:grid-rows-[1fr] md:group-focus-within/tile:grid-rows-[1fr]",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className={cn("pt-2 text-[11px] leading-snug text-muted-foreground/95 sm:text-xs", compact && "text-[10px] leading-snug")}>{detail}</p>
            </div>
          </div>
        </div>
      </div>

      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover/tile:translate-x-[220%] group-hover/tile:opacity-100 dark:via-white/[0.06]"
          aria-hidden
        />
      ) : null}
    </motion.div>
  );
}

function StackSpotlight({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const reduceMotion = useReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    },
    [reduceMotion],
  );

  return (
    <div ref={wrapRef} className="relative mt-12 sm:mt-14" onMouseMove={onMove} onMouseLeave={() => setPos({ x: 50, y: 45 })}>
      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 -z-0 rounded-[2rem] opacity-70 transition-opacity duration-500 dark:opacity-50"
          style={{
            background: `radial-gradient(70% 55% at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 55%)`,
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/**
 * Stack curado com painéis densos, spotlight e tiles com profundidade ao hover.
 */
export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-24 sm:py-32"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 85% 65% at 100% -5%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 52%),
          radial-gradient(ellipse 60% 50% at 0% 105%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 48%),
          radial-gradient(ellipse 50% 40% at 50% 40%, color-mix(in oklch, var(--foreground) 2.5%, transparent), transparent 55%)
        `,
      }}
      aria-labelledby="technologies-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32] dark:opacity-[0.18]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            118deg,
            transparent,
            transparent 76px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 76px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 77px
          )`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_minmax(0,0.55fr)] lg:gap-16 lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.16] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_24%,_transparent)] sm:size-12"
                aria-hidden
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">02</span>
              </div>
              <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">Instrumentos</p>
            </div>

            <p className="mt-6 max-w-xl font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:text-xs">
              Curadoria em primeira pessoa — nada de vitrine genérica
            </p>
            <h2
              id="technologies-heading"
              className="mt-3 text-balance font-black tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(2rem, 5.2vw, 3.15rem)", lineHeight: 1.06 }}
            >
              O arsenal que <GradientText variant="primarySoft">escolho</GradientText> quando o desafio exige precisão.
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-[1.02rem]">
              Não acumulo ferramentas por moda: cada nome aqui já pagou dividendos em produto real — interfaces que respondem rápido, APIs que aguentam carga e entregas que o
              próprio time consegue manter seis meses depois. Passe o rato nos cartões para ver o contexto de cada peça.
            </p>
          </div>

          <aside className="relative flex flex-col justify-end gap-4 rounded-2xl border border-border/55 bg-card/35 p-5 shadow-[0_20px_60px_-28px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.05] backdrop-blur-md dark:border-white/[0.07] dark:bg-card/22 dark:shadow-black/40">
            <div className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-primary/[0.1] blur-3xl" aria-hidden />
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="size-5 shrink-0" aria-hidden />
              <span className="text-sm font-semibold tracking-tight text-foreground">Resumo material</span>
            </div>
            <dl className="grid gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <div className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 dark:border-white/[0.06]">
                <dt>Entradas</dt>
                <dd className="text-2xl font-bold tabular-nums tracking-tight text-foreground">{totalTechs}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3 dark:border-white/[0.06]">
                <dt>Camadas</dt>
                <dd className="text-2xl font-bold tabular-nums tracking-tight text-foreground">03</dd>
              </div>
            </dl>
          </aside>
        </div>

        <PipelineDecor className="mt-14 sm:mt-16" />

        <StackSpotlight>
          <motion.div
            className="grid auto-rows-min gap-5 lg:grid-cols-12 lg:gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
          >
            {PANEL_META.map(({ id, title, kicker, blurb, items, icon: PanelIcon, span, tileGrid, accent }, index) => (
              <motion.article
                key={id}
                variants={panel}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-1 shadow-lg shadow-black/[0.04] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md dark:bg-card/32 dark:shadow-black/25 dark:ring-white/[0.05]",
                  span,
                )}
              >
                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90 dark:opacity-100", accent)} aria-hidden />
                <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-br-[100%] bg-primary/[0.04] blur-3xl" aria-hidden />
                <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 rounded-tl-[100%] bg-foreground/[0.025] blur-2xl dark:bg-white/[0.04]" aria-hidden />

                <div className="relative rounded-[calc(1.5rem-4px)] border border-transparent bg-gradient-to-br from-background/92 via-card/35 to-transparent p-5 dark:from-background/55 dark:via-card/22 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-primary/30 bg-primary/[0.1] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_18%,_transparent)]">
                        <PanelIcon className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">{kicker}</p>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-lg border border-border/60 bg-muted/30 px-2 py-1 font-mono text-[10px] font-bold tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}/03
                    </span>
                  </div>

                  <div className={cn("mt-6", tileGrid)}>
                    {items.map((tech) => (
                      <TechTile key={tech.name} tech={tech} compact={id === "ferramentas"} />
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </StackSpotlight>
      </Container>
    </section>
  );
}
