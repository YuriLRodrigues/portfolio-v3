import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Coffee, FolderKanban, Timer } from "lucide-react";

import { MagicCard } from "../ui/magic-card";

const STATS = [
  { label: "Anos em produção", value: "3+", icon: Timer },
  { label: "Projetos entregues", value: "30+", icon: FolderKanban },
  { label: "Café por sprint", value: "∞", icon: Coffee },
] as const;

const FOCUS_STACK = [
  { name: "TypeScript", tag: "Tipagem", detail: "Contratos claros em todo o stack." },
  { name: "Node.js", tag: "Runtime", detail: "Serviços e APIs com performance previsível." },
  { name: "React", tag: "Interface", detail: "Componentes reutilizáveis e UX responsiva." },
  { name: "NestJS", tag: "Backend", detail: "Módulos organizados e prontos para escalar." },
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
        <div className="mb-8 flex flex-wrap items-center gap-4 sm:mb-10">
          <div
            className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.12] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_25%,_transparent)] sm:size-12"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">01</span>
          </div>
          <div className="h-px min-w-[3rem] flex-1 max-w-[8rem] bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" aria-hidden />
          <p className="min-w-0 text-[11px] font-medium uppercase leading-snug tracking-[0.2em] text-muted-foreground sm:text-xs">
            <span className="text-foreground/90">Contexto</span>
            <span className="mx-2 text-border" aria-hidden>
              ·
            </span>
            <span className="font-normal normal-case tracking-normal text-muted-foreground/90">quem eu sou e como trabalho</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
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
              <p>Este site é um laboratório vivo do meu jeito de construir — inclusive a cor de destaque que você escolhe no topo, que percorre o layout inteiro.</p>
            </div>

            <div className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
              {STATS.map(({ label, value, icon: Icon }) => (
                <MagicCard
                  key={label}
                  gradientSize={75}
                  className="flex flex-col rounded-2xl border border-border/50 bg-card/50 p-4 shadow-sm ring-1 ring-foreground/[0.02] backdrop-blur-sm transition hover:border-primary/25 hover:ring-primary/10 dark:bg-card/35 dark:ring-white/[0.03] sm:p-5"
                  innerClassName="bg-card/50 dark:bg-card/35"
                >
                  <Icon className="size-4 text-primary/80" aria-hidden />
                  <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-[11px]">{label}</p>
                  <p className="mt-1 text-2xl font-black tabular-nums tracking-tight text-foreground sm:text-3xl">{value}</p>
                </MagicCard>
              ))}
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
