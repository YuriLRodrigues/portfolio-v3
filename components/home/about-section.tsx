import Link from "next/link";

import { PersonalIntroTrigger } from "@/components/home/personal-intro";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Coffee, FolderKanban, Timer } from "lucide-react";

const STATS = [
  { label: "Anos em produção", icon: Timer, ticker: 3, suffix: "+" },
  { label: "Projetos entregues", icon: FolderKanban, ticker: 30, suffix: "+" },
  { label: "Café por sprint", icon: Coffee, display: "∞" },
] as const;

const FOCUS_STACK = [
  {
    name: "Next.js",
    tag: "App",
    detail: "React com App Router, Server Components, streaming e build otimizado para rodar em produção.",
  },
  { name: "NestJS", tag: "Backend", detail: "Node modular com injeção de dependência, camadas e suporte a REST, GraphQL e WebSockets." },
  { name: "Drizzle", tag: "Dados", detail: "ORM em TypeScript com SQL explícito, schema tipado e migrações versionadas no repositório." },
  { name: "PostgreSQL", tag: "Dados", detail: "Banco relacional ACID com índices avançados, JSON/JSONB, CTEs e ecossistema de extensões." },
  { name: "Tailwind CSS", tag: "UI", detail: "Utilities CSS com JIT: breakpoints, tema com variáveis, modo escuro por variante e CSS gerado só do que entra na marcação." },
] as const;

/**
 * Sobre — layout próprio (coluna editorial + métricas em cartões + stack em destaque),
 * sem copiar a hierarquia visual da referência (marca d’água gigante, INTRO/NO., lista tabular).
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 100% -20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 55%),
          radial-gradient(ellipse 60% 40% at 0% 100%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 50%)
        `,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -12deg,
            transparent,
            transparent 56px,
            color-mix(in oklch, var(--foreground) 4%, transparent) 56px,
            color-mix(in oklch, var(--foreground) 4%, transparent) 57px
          )`,
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.16] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_24%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">01</span>
          </div>
          <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/5 via-primary/45 to-transparent lg:max-w-[11rem]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">Contexto</p>
        </div>

        <p className="mt-6 max-w-xl font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-muted-foreground sm:text-xs">Quem eu sou e como trabalho</p>

        <div className="mt-8 grid gap-12 sm:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <div className="min-w-0 border-l-2 border-primary/35 pl-5 sm:pl-7">
            <h2 className="max-w-xl text-balance text-[clamp(1.85rem,4.6vw,2.85rem)] font-bold leading-[1.12] tracking-[-0.035em] text-foreground">
              Sobre <GradientText>quem assina</GradientText> o código por aqui
            </h2>

            <blockquote className="relative mt-7 max-w-xl border-l border-primary/25 py-1 pl-5 text-base italic leading-relaxed text-foreground/90 sm:mt-8 sm:text-lg">
              <span className="font-semibold not-italic text-foreground">Produto sólido</span> começa com arquitetura que aguenta mudança — e{" "}
              <span className="text-primary not-italic">experiências</span> que não travam quando alguém realmente usa.
            </blockquote>

            <div className="mt-7 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base">
              <p>Trabalho entre APIs bem desenhadas e interfaces que respondem rápido: performance, acessibilidade e detalhes que somam quando o produto cresce.</p>
              <p>
                Sou desenvolvedor full stack e costumo atravessar o ciclo inteiro — do entendimento do problema ao deploy e ao que acontece depois em produção. Me prendo com
                contratos de API claros, dados consistentes e interface que não sacrifica performance nem acessibilidade por capricho visual. Valorizo convenção do repositório,
                código legível e teste onde realmente segura mudança sensível, não como enfeite de checklist. Em time, alinho cedo com produto e design; em revisão de código
                prefiro explicar o porquê do que só trocar linha por gosto pessoal.
              </p>
            </div>

            <div className="mt-6 sm:mt-7">
              <PersonalIntroTrigger />
            </div>

            <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
              {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <MagicCard
                    key={stat.label}
                    gradientSize={75}
                    className="flex flex-col rounded-2xl border border-border/50 bg-card/50 p-4 shadow-sm ring-1 ring-foreground/[0.02] backdrop-blur-sm transition hover:border-primary/25 hover:ring-primary/10 dark:bg-card/35 dark:ring-white/[0.03] sm:p-5"
                    innerClassName="bg-card/50 dark:bg-card/35"
                  >
                    <Icon className="size-4 text-primary/80" aria-hidden />
                    <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">{stat.label}</p>
                    <p className="mt-1 flex min-h-[2.5rem] items-baseline gap-0.5 text-2xl font-black tabular-nums tracking-tight text-foreground sm:min-h-[2.75rem] sm:text-3xl">
                      {"ticker" in stat ? (
                        <>
                          <NumberTicker value={stat.ticker} delay={index * 0.12} className="font-black tracking-tight text-foreground" />
                          <span className="text-primary/90">{stat.suffix}</span>
                        </>
                      ) : (
                        <span className="text-primary/90">{stat.display}</span>
                      )}
                    </p>
                  </MagicCard>
                );
              })}
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="relative rounded-3xl p-[1px] shadow-lg shadow-primary/5">
              <div
                className="absolute inset-0 rounded-3xl opacity-90"
                style={{
                  background: `linear-gradient(135deg, color-mix(in oklch, var(--primary) 45%, transparent), transparent 42%, color-mix(in oklch, var(--foreground) 8%, transparent))`,
                }}
                aria-hidden
              />
              <div className="relative rounded-[calc(1.5rem-1px)] bg-card/90 p-6 backdrop-blur-xl dark:bg-card/75 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Em evidência</p>
                    <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">Stack que uso hoje</h3>
                  </div>
                  <span className="rounded-md bg-primary/12 px-2 py-1 font-mono text-[10px] font-semibold text-primary">live</span>
                </div>

                <ul className="mt-6 flex flex-col gap-2.5" role="list">
                  {FOCUS_STACK.map((row) => (
                    <li
                      key={row.name}
                      className="group rounded-2xl border border-border/40 bg-background/40 px-4 py-3.5 transition hover:border-primary/30 hover:bg-background/70 dark:border-border/30 dark:bg-background/20 dark:hover:bg-background/35 sm:px-4 sm:py-4"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{row.name}</span>
                        <span className="rounded-md border border-primary/20 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-medium text-primary">{row.tag}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{row.detail}</p>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#projects"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "group/about-cta mt-6 inline-flex w-full gap-2 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_24px_color-mix(in_oklch,var(--color-primary)_28%,_transparent)]",
                  )}
                >
                  Ver projetos no portfólio
                  <ArrowUpRight className="size-4 opacity-90 transition group-hover/about-cta:translate-x-0.5 group-hover/about-cta:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
