"use client";

import type { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from "react";
import { Fragment, useCallback, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils";
import {
  SiBootstrap,
  SiClickup,
  SiCss,
  SiCypress,
  SiCursor,
  SiDatagrip,
  SiDocker,
  SiDrizzle,
  SiEslint,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJira,
  SiNestjs,
  SiNextdotjs,
  SiNotion,
  SiNodedotjs,
  SiPnpm,
  SiPostgresql,
  SiPostman,
  SiPrettier,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiRedis,
  SiSass,
  SiStorybook,
  SiStyledcomponents,
  SiSwagger,
  SiTailwindcss,
  SiTestinglibrary,
  SiTrello,
  SiTypescript,
  SiVite,
  SiI18next,
} from "@icons-pack/react-simple-icons";
import { ChevronRight, Code2, Cpu, Layers, Sparkles, TestTube2, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type BrandSvg = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
type Tech = { name: string; tagline: string; detail: string; Icon: BrandSvg; badge?: string };

/** Supertest não tem ícone no Simple Icons — Lucide com a mesma API de `size`. */
const SiSupertest: BrandSvg = ({ size = 24, className, ...rest }) => {
  const dim = typeof size === "number" ? size : Number.parseInt(String(size), 10) || 24;
  return <TestTube2 width={dim} height={dim} className={className} strokeWidth={1.65} {...rest} />;
};

/** Do que mais pesa em experiência (testes, docs, build) à base (HTML/CSS). */
const FRONTEND: Tech[] = [
  { name: "React", tagline: "Componentes & estado", detail: "Composição, hooks e boundaries para UI previsível em produto.", Icon: SiReact, badge: "UI" },
  { name: "Next.js", tagline: "App Router & RSC", detail: "Streaming, layouts aninhados e otimização de assets sem gambiarra.", Icon: SiNextdotjs, badge: "App" },
  { name: "TypeScript", tagline: "Tipos ponta a ponta", detail: "Modelos compartilhados entre cliente e servidor — menos regressões.", Icon: SiTypescript, badge: "TS" },
  {
    name: "React Testing Library",
    tagline: "Testes centrados no usuário",
    detail: "Queries e fluxos próximos ao que o usuário vê — menos testes frágeis.",
    Icon: SiTestinglibrary,
    badge: "a11y",
  },
  { name: "Cypress", tagline: "E2E no browser", detail: "Fluxos críticos com feedback visual e depuração quando algo falha.", Icon: SiCypress, badge: "e2e" },
  { name: "Jest", tagline: "Unit & snapshot", detail: "Mocks, cobertura e CI estável para refactors sem medo.", Icon: SiJest, badge: "test" },
  { name: "Storybook", tagline: "Catálogo de UI", detail: "Estados isolados, revisão de design e documentação viva de componentes.", Icon: SiStorybook, badge: "docs" },
  { name: "Tailwind CSS", tagline: "Design no markup", detail: "Tokens, dark mode e responsivo com consistência de spacing.", Icon: SiTailwindcss, badge: "CSS" },
  { name: "Motion", tagline: "Microinterações", detail: "Transições com curvas pensadas — sem travar o main thread.", Icon: SiFramer, badge: "UX" },
  { name: "I18Next", tagline: "Internationalization", detail: "Tradução de texto e internacionalização de aplicações.", Icon: SiI18next, badge: "I18N" },
  { name: "Radix UI", tagline: "Acessibilidade", detail: "Primitivos headless: foco, teclado e ARIA já no núcleo.", Icon: SiRadixui, badge: "a11y" },
  { name: "Vite", tagline: "Dev server rápido", detail: "HMR instantâneo e builds enxutos para SPAs e libs.", Icon: SiVite, badge: "build" },
  { name: "styled-components", tagline: "CSS-in-JS", detail: "Temas dinâmicos e estilos colocalizados sem fugir do ecossistema React.", Icon: SiStyledcomponents, badge: "css" },
  { name: "Sass", tagline: "CSS com superpoderes", detail: "Mixins, nesting e partials quando o design system pede mais estrutura.", Icon: SiSass, badge: "pre" },
  { name: "Bootstrap", tagline: "Grid & utilitários", detail: "Protótipos e dashboards com componentes prontos e responsivos.", Icon: SiBootstrap, badge: "UI" },
  { name: "JavaScript", tagline: "Linguagem da web", detail: "ES modules, async/await e APIs do browser sem camadas desnecessárias.", Icon: SiJavascript, badge: "JS" },
  { name: "HTML", tagline: "Semântica & SEO", detail: "Estrutura correta: headings, landmarks e conteúdo legível por máquinas.", Icon: SiHtml5, badge: "web" },
  { name: "CSS", tagline: "Layout & animação", detail: "Flex, grid, custom properties e motion no nível do browser.", Icon: SiCss, badge: "web" },
];

const BACKEND: Tech[] = [
  { name: "TypeScript", tagline: "Contratos tipados", detail: "DTOs, generics e narrowing em handlers — erros antes do deploy.", Icon: SiTypescript, badge: "TS" },
  { name: "Node.js", tagline: "Runtime & tooling", detail: "I/O assíncrono e ecossistema maduro para APIs e workers.", Icon: SiNodedotjs, badge: "I/O" },
  { name: "Express", tagline: "HTTP minimalista", detail: "Middlewares enxutos, rotas claras e liberdade para escolher o resto da stack.", Icon: SiExpress, badge: "HTTP" },
  { name: "NestJS", tagline: "Módulos & DI", detail: "Camadas claras, testes e escalonamento horizontal quando o tráfego sobe.", Icon: SiNestjs, badge: "API" },
  { name: "Drizzle", tagline: "SQL typesafe", detail: "Schema em TypeScript e queries explícitas — performance sem magia negra.", Icon: SiDrizzle, badge: "ORM" },
  { name: "Prisma", tagline: "ORM & migrações", detail: "Schema como fonte da verdade e deploy de mudanças com confiança.", Icon: SiPrisma, badge: "ORM" },
  { name: "PostgreSQL", tagline: "Dados relacionais", detail: "Integridade, índices e consultas que aguentam crescimento real.", Icon: SiPostgresql, badge: "SQL" },
  { name: "Redis", tagline: "Cache & filas", detail: "Sessões, rate limit e filas leves para desacoplar picos de carga.", Icon: SiRedis, badge: "cache" },
  { name: "JavaScript", tagline: "Runtime clássico", detail: "CommonJS ou ESM em serviços legados e tooling que ainda vive em JS.", Icon: SiJavascript, badge: "JS" },
  { name: "Jest", tagline: "Testes de serviço", detail: "Mocks de HTTP e DB, snapshots de payloads e suites rápidas no CI.", Icon: SiJest, badge: "test" },
  { name: "Supertest", tagline: "Asserções HTTP", detail: "Chamadas reais à app em memória — status, headers e corpo sem subir servidor.", Icon: SiSupertest, badge: "API" },
  { name: "Swagger", tagline: "OpenAPI & docs", detail: "Contrato vivo: geração de clientes e revisão de endpoints com o time.", Icon: SiSwagger, badge: "docs" },
];

const TOOLS: Tech[] = [
  { name: "Git", tagline: "Versionamento", detail: "Branches curtas, rebase quando faz sentido e histórico legível.", Icon: SiGit, badge: "VCS" },
  { name: "Docker", tagline: "Ambientes", detail: "Paridade dev/prod e imagens enxutas para CI mais rápido.", Icon: SiDocker, badge: "ops" },
  { name: "pnpm", tagline: "Pacotes rápidos", detail: "Disco compartilhado e lockfile determinístico em monorepos.", Icon: SiPnpm, badge: "pkg" },
  { name: "Figma", tagline: "Handoff", detail: "Tokens, grids e componentes viram código sem telefone sem fio.", Icon: SiFigma, badge: "UX" },
  { name: "Notion", tagline: "Wiki & specs", detail: "PRDs, runbooks e decisões de arquitetura num único lugar pesquisável.", Icon: SiNotion, badge: "docs" },
  { name: "Jira", tagline: "Backlog & sprint", detail: "Épicos, bugs e métricas de fluxo alinhados ao produto.", Icon: SiJira, badge: "PM" },
  { name: "ClickUp", tagline: "Tarefas & vistas", detail: "Listas, boards e automações quando o projeto precisa de flex.", Icon: SiClickup, badge: "PM" },
  { name: "Trello", tagline: "Kanban leve", detail: "Fluxos simples e visíveis para squads pequenos ou discovery.", Icon: SiTrello, badge: "PM" },
  { name: "Postman", tagline: "Collections & envs", detail: "Smoke tests manuais, variáveis por ambiente e compartilhamento com o time.", Icon: SiPostman, badge: "API" },
  { name: "ESLint", tagline: "Qualidade", detail: "Regras alinhadas ao time — estilo e bugs antes do merge.", Icon: SiEslint, badge: "lint" },
  { name: "Prettier", tagline: "Formatação", detail: "Um estilo único no repo — diffs limpos e reviews mais rápidos.", Icon: SiPrettier, badge: "fmt" },
  { name: "DataGrip", tagline: "SQL & introspection", detail: "Explorar schemas, refatorar queries e terminal SQL unificado.", Icon: SiDatagrip, badge: "DB" },
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
    accent: "from-primary/[0.18] via-primary/[0.05] to-transparent",
    watermark: "INTERFACE",
    rail: "before:from-primary before:via-primary/55 before:to-primary/10",
    panelRing: "shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-primary)_18%,_transparent),0_24px_50px_-20px_color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
  },
  {
    id: "backend",
    title: "Backend",
    kicker: "Serviços & dados",
    blurb: "Contratos estáveis, persistência e resiliência para o produto crescer.",
    items: BACKEND,
    icon: Code2,
    span: "lg:col-span-4",
    accent: "from-transparent via-primary/[0.12] to-primary/[0.04]",
    watermark: "SERVIÇOS",
    rail: "before:from-primary/90 before:via-primary/45 before:to-muted-foreground/30",
    panelRing: "shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-primary)_14%,_transparent),0_22px_48px_-22px_rgba(0,0,0,0.2)] dark:shadow-[0_22px_48px_-22px_rgba(0,0,0,0.55)]",
  },
  {
    id: "ferramentas",
    title: "Ferramentas",
    kicker: "Do repo ao deploy",
    blurb: "Pipeline de trabalho que mantém ritmo sem sacrificar qualidade.",
    items: TOOLS,
    icon: Wrench,
    span: "lg:col-span-3",
    accent: "from-transparent via-primary/[0.06] to-primary/[0.16]",
    watermark: "WORKFLOW",
    rail: "before:from-muted-foreground/70 before:via-primary/40 before:to-primary/12",
    panelRing: "shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-foreground)_8%,_transparent),0_20px_44px_-20px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_44px_-20px_rgba(0,0,0,0.5)]",
  },
] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const panel = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: easeOut },
  },
};

const totalTechs = FRONTEND.length + BACKEND.length + TOOLS.length;
/** Referência visual da barra lateral (não é um limite técnico). */
const STACK_DENSITY_REF = 52;

const PIPELINE_STEPS = [
  { Icon: Layers, label: "Interface", sub: "UI, estado, motion" },
  { Icon: Code2, label: "Serviços", sub: "APIs, dados, cache" },
  { Icon: Cpu, label: "Runtime", sub: "Node, filas, escala" },
  { Icon: Wrench, label: "Entrega", sub: "Git, CI, design" },
] as const;

function PipelineConnector() {
  return (
    <div className="relative flex h-[4.25rem] w-8 shrink-0 items-center justify-center sm:h-[4.5rem] sm:w-10" aria-hidden>
      <div className="absolute inset-x-[15%] top-[46%] h-px -translate-y-1/2 bg-gradient-to-r from-border/30 via-primary/45 to-border/30 sm:inset-x-0" />
      <ChevronRight
        className="relative z-[1] size-4 text-primary/55 drop-shadow-[0_0_8px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] sm:size-[1.125rem]"
        strokeWidth={2.25}
        aria-hidden
      />
    </div>
  );
}

function PipelineDecor({ className }: { className?: string }) {
  return (
    <div className={cn("hidden w-full select-none  lg:block", className)} aria-hidden>
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/70 via-background/35 to-card/40 p-[1px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.2)] ring-1 ring-inset ring-white/[0.07] dark:from-card/45 dark:via-background/25 dark:to-card/30 dark:shadow-black/45 dark:ring-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-30%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_58%)]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

        <div className="relative px-3 py-4 sm:px-6 sm:py-5">
          <div className="flex items-end justify-between gap-0.5 sm:gap-1">
            {PIPELINE_STEPS.map((step, index) => (
              <Fragment key={step.label}>
                {index > 0 ? <PipelineConnector /> : null}
                <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
                  <span className="grid size-10 place-items-center rounded-xl border border-primary/30 bg-gradient-to-b from-primary/[0.15] to-primary/[0.04] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] ring-1 ring-black/[0.04] dark:ring-white/[0.06] sm:size-11">
                    <step.Icon className="size-[1.15rem] sm:size-5" strokeWidth={1.75} />
                  </span>
                  <span className="w-full truncate font-mono text-[9px] font-bold uppercase leading-tight tracking-[0.16em] text-foreground sm:text-[10px] sm:tracking-[0.18em]">
                    {step.label}
                  </span>
                  <span className="line-clamp-2 min-h-[2lh] max-w-[9.5rem] text-[9px] leading-snug text-muted-foreground sm:max-w-[11rem] sm:text-[10px]">{step.sub}</span>
                </div>
              </Fragment>
            ))}
          </div>

          <p className="mt-4 border-t border-border/35 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:border-white/[0.07]">
            Da interface ao ambiente — o que já coloquei em produção
          </p>
        </div>
      </div>
    </div>
  );
}

function TechTile({ tech, compact, rail }: { tech: Tech; compact?: boolean; rail: string }) {
  const { name, tagline, Icon, badge } = tech;
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
    background: `radial-gradient(460px circle at ${glow.x}% ${glow.y}%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 55%)`,
  };

  return (
    <motion.div
      ref={tileRef}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45, ease: easeOut }}
      whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.24, ease: easeOut } }}
      onMouseMove={onMove}
      onMouseLeave={() => setGlow({ x: 50, y: 50 })}
      className={cn(
        "group/tile relative min-w-60 max-w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br p-3.5",
        "from-card/95 via-card/70 to-background/55 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_10px_28px_-12px_rgba(0,0,0,0.14)]",
        "ring-1 ring-inset ring-white/[0.06] dark:from-card/70 dark:via-card/45 dark:to-background/30 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_14px_36px_-14px_rgba(0,0,0,0.45)] dark:ring-white/[0.05]",
        "before:pointer-events-none before:absolute before:bottom-3 before:left-0 before:top-3 before:w-[3px] before:rounded-full before:bg-gradient-to-b before:opacity-95 before:content-['']",
        rail,
        "transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/45 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_20px_52px_-14px_color-mix(in_oklch,var(--color-primary)_42%,_transparent)]",
        compact && "p-3",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage: `radial-gradient(color-mix(in oklch, var(--foreground) 5%, transparent) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
        aria-hidden
      />

      {!reduceMotion ? (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100" style={spotlightStyle} aria-hidden />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-primary/[0.12] opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100 dark:bg-primary/[0.2]"
        aria-hidden
      />

      <div className="relative flex w-fit max-w-full items-start gap-3">
        <span
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border border-border/55 bg-gradient-to-br from-background/90 to-background/40",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] ring-2 ring-primary/10 transition-[transform,box-shadow,border-color] duration-300 dark:from-background/50 dark:to-background/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] dark:ring-primary/15",
            "group-hover/tile:scale-[1.04] group-hover/tile:border-primary/40 group-hover/tile:ring-primary/25",
            compact ? "size-10" : "size-11 sm:size-[3.25rem]",
          )}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100"
            style={{
              background: "conic-gradient(from 210deg, transparent, color-mix(in oklch, var(--primary) 32%, transparent), transparent)",
            }}
            aria-hidden
          />
          <Icon size={compact ? 22 : 28} className="relative z-[1] text-foreground/90" aria-hidden />
        </span>
        <div className="w-fit min-w-0 max-w-[min(100%,18rem)] sm:max-w-[20rem]">
          <div className="flex w-fit max-w-full flex-wrap items-center gap-2">
            <p className={cn("min-w-0 max-w-full truncate font-semibold tracking-tight text-foreground", compact ? "text-sm" : "text-[0.95rem] sm:text-base")}>{name}</p>
            {badge ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.1] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_18%,_transparent)] dark:border-primary/35 dark:bg-primary/[0.14]">
                <span className="size-1 rounded-full bg-primary/80" aria-hidden />
                {badge}
              </span>
            ) : null}
          </div>
          <p className={cn("mt-0.5 truncate text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>{tagline}</p>

          {/* <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              "grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover/tile:grid-rows-[1fr] md:group-focus-within/tile:grid-rows-[1fr]",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className={cn("pt-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs", compact && "text-[10px] leading-relaxed")}>{detail}</p>
            </div>
          </div> */}
        </div>
      </div>

      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 transition-[transform,opacity] duration-700 group-hover/tile:translate-x-[220%] group-hover/tile:opacity-100 dark:via-white/[0.07]"
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
          className="pointer-events-none absolute inset-0 -z-0 rounded-[2rem] opacity-75 transition-opacity duration-500 dark:opacity-55"
          style={{
            background: `radial-gradient(72% 58% at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--primary) 15%, transparent), transparent 58%)`,
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/**
 * Stack por domínio (front, back, ferramentas) — painéis com marca d’água, trilho de cor, tiles e pipeline visual.
 */
export function TechnologiesSection() {
  const stackPct = Math.min(100, Math.round((totalTechs / STACK_DENSITY_REF) * 100));

  return (
    <section
      id="technologies"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-24 sm:py-32"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 72% at 100% -8%, color-mix(in oklch, var(--primary) 17%, transparent), transparent 54%),
          radial-gradient(ellipse 68% 56% at 0% 102%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 50%),
          radial-gradient(ellipse 55% 48% at 48% 38%, color-mix(in oklch, var(--foreground) 3.2%, transparent), transparent 58%)
        `,
      }}
      aria-labelledby="technologies-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.34] dark:opacity-[0.2]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            118deg,
            transparent,
            transparent 76px,
            color-mix(in oklch, var(--foreground) 2.9%, transparent) 76px,
            color-mix(in oklch, var(--foreground) 2.9%, transparent) 77px
          )`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute -right-8 bottom-12 select-none font-mono text-[clamp(4.5rem,14vw,10rem)] font-black leading-none tracking-[-0.06em] text-foreground/[0.035] dark:text-white/[0.045] sm:right-4 sm:bottom-16"
        aria-hidden
      >
        STACK
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_minmax(0,0.55fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.16] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_24%,_transparent)] sm:size-12"
                aria-hidden
              >
                <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">02</span>
              </div>
              <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">Tecnologias</p>
            </div>

            <p className="mt-6 max-w-xl font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:text-xs">
              O que fui acumulando em estudo, projeto e produção
            </p>
            <h2
              id="technologies-heading"
              className="mt-3 text-balance font-black tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(2rem, 5.2vw, 3.15rem)", lineHeight: 1.06 }}
            >
              Da web ao deploy: <GradientText variant="primarySoft">tecnologias que aprendi</GradientText> e uso hoje
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-[1.02rem]">
              Linguagens, runtimes, frameworks e ferramentas que já coloquei em prática — em curso, freela, squad ou código em produção. Uns aparecem em todo sprint, outros ficam
              no bolso para quando o contexto pede.
            </p>
          </div>

          <aside className="relative overflow-hidden  rounded-2xl my-auto border border-border/55 bg-gradient-to-br from-card/80 via-card/50 to-background/40 p-5 shadow-[0_20px_56px_-28px_rgba(0,0,0,0.28)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-md dark:from-card/45 dark:via-card/28 dark:to-background/25 dark:shadow-black/50">
            <div className="pointer-events-none absolute -right-14 -top-24 size-52 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-36 rounded-tr-[100%] bg-foreground/[0.04] blur-2xl dark:bg-white/[0.06]" aria-hidden />
            <div className="relative flex items-center gap-2 text-primary">
              <Sparkles className="size-5 shrink-0" aria-hidden />
              <span className="text-sm font-semibold tracking-tight text-foreground">Visão geral</span>
            </div>
            <div className="relative mt-5 space-y-3 border-t border-border/35 pt-4 dark:border-white/[0.06]">
              <p className="font-mono text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                Quantidade na lista e como ela se divide
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
                  <span>Tecnologias catalogadas</span>
                  <span className="tabular-nums text-foreground">{totalTechs}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/50 ring-1 ring-inset ring-black/[0.04] dark:bg-muted/25 dark:ring-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary shadow-[0_0_12px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)] transition-[width] duration-700 ease-out"
                    style={{ width: `${stackPct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
                  <span>Frontend, backend e ferramentas</span>
                  <span className="tabular-nums text-foreground">3</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/50 ring-1 ring-inset ring-black/[0.04] dark:bg-muted/25 dark:ring-white/[0.06]">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-muted-foreground/35 via-primary/40 to-primary/70 opacity-90" />
                </div>
              </div>
            </div>
          </aside>
        </div>

        <PipelineDecor className="mt-14 sm:mt-16" />

        <StackSpotlight>
          <motion.div
            // className="grid auto-rows-min gap-5 lg:grid-cols-12 lg:gap-6"
            className="space-y-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            // viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
          >
            {PANEL_META.map(({ id, title, kicker, blurb, items, icon: PanelIcon, span, accent, watermark, rail, panelRing }, index) => (
              <motion.article
                key={id}
                variants={panel}
                className={cn("relative flex flex-col overflow-hidden rounded-3xl border border-border/55 bg-card/55 p-1 backdrop-blur-md dark:bg-card/38", panelRing, span)}
              >
                <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-[0.92] dark:opacity-100", accent)} aria-hidden />
                <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-br-[100%] bg-primary/[0.07] blur-3xl dark:bg-primary/[0.12]" aria-hidden />
                <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-48 rounded-tl-[100%] bg-foreground/[0.03] blur-2xl dark:bg-white/[0.05]" aria-hidden />
                <div className="absolute left-1/2 top-10 flex -translate-x-1/2 items-center justify-center gap-8">
                  <span
                    className="pointer-events-none w-max max-w-[min(92%,14rem)] select-none text-center font-mono text-[clamp(1.75rem,4.2vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-foreground/[0.055] dark:text-white/[0.07]"
                    aria-hidden
                  >
                    {watermark}
                  </span>
                  <span className="h-fit rounded-lg border border-border/55 bg-muted/25 px-2.5 py-1 font-mono text-[10px] font-bold tabular-nums text-muted-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.08] dark:bg-muted/15 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                    {String(index + 1).padStart(2, "0")}/03
                  </span>
                </div>

                <div className="relative w-fit max-w-full rounded-[calc(1.5rem-4px)] border border-border/35 bg-gradient-to-br from-background/95 via-card/40 to-transparent p-5 shadow-inner dark:from-background/65 dark:via-card/25 dark:to-transparent sm:p-6">
                  <div className="mb-5 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className={cn(
                            "size-1.5 rounded-full border",
                            d === 1 ? "border-primary/50 bg-primary/35 shadow-[0_0_8px_color-mix(in_oklch,var(--color-primary)_45%,_transparent)]" : "border-border/60 bg-muted/40",
                          )}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
                  </div>

                  <div className="flex w-full max-w-full flex-col gap-3">
                    <div className="flex w-full min-w-0 items-start gap-3">
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-primary/[0.04] text-primary shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] ring-2 ring-primary/10">
                        <PanelIcon className="size-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">{kicker}</p>
                        <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{blurb}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex w-fit max-w-full flex-wrap content-start gap-3 sm:gap-3.5">
                    {items.map((tech) => (
                      <TechTile key={tech.name} tech={tech} compact={id === "ferramentas"} rail={rail} />
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
