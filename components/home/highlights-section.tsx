"use client";

import { Container } from "@/components/ui/container";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GradientText } from "@/components/ui/gradient-text";
import { MagicCard } from "@/components/ui/magic-card";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { GitPullRequest, MessageCircle, Rocket, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "motion/react";

type Highlight = {
  title: string;
  description: string;
  Icon: LucideIcon;
  accent?: "default" | "featured";
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Produto antes do código",
    description: "Traduzo objetivos de negócio em entregas priorizadas: alinho escopo com stakeholders, corto ruído e documento decisões para o time não perder contexto.",
    Icon: Target,
    accent: "featured",
  },
  {
    title: "Comunicação direta",
    description: "Status honestos, riscos visíveis cedo e handoffs claros com design e QA — menos surpresas em produção e mais confiança no ritmo.",
    Icon: MessageCircle,
  },
  {
    title: "Código pensado para o próximo",
    description: "Legibilidade, convenções do projeto e PRs enxutos: quem vier depois (ou eu daqui a seis meses) entende o porquê, não só o como.",
    Icon: GitPullRequest,
  },
  {
    title: "Performance e acessibilidade no radar",
    description: "Web vitals, contraste e teclado não são extras de última hora — entram no desenho da feature e nos critérios de pronto.",
    Icon: Zap,
  },
  {
    title: "Entrega contínua, não big bang",
    description: "Slices entregáveis, feature flags quando faz sentido e rollback simples: valor cedo para o utilizador e menos stress na equipa.",
    Icon: Rocket,
  },
  {
    title: "Curiosidade técnica aplicada",
    description: "Experimento com ferramentas novas com critério: só levo ao projeto o que reduz risco, tempo ou custo de manutenção.",
    Icon: Sparkles,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Diferenciais — padrão [Aceternity Glowing Effect](https://ui.aceternity.com/components/glowing-effect):
 * wrapper `relative` + brilho na borda + camada `z-10` com [Magic Card](https://magicui.design/docs/components/magic-card) (spotlight no interior).
 */
export function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 60% 45% at 50% -10%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 48%),
          radial-gradient(ellipse 45% 40% at 100% 100%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 50%)
        `,
      }}
      aria-labelledby="highlights-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.24] dark:opacity-[0.15]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 80px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 80px,
            color-mix(in oklch, var(--foreground) 2.8%, transparent) 81px
          )`,
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
              aria-hidden
            >
              <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">03</span>
            </div>
            <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">Diferenciais</p>
          </div>
          <h2 id="highlights-heading" className="mt-5 text-balance text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            O que levo para <GradientText variant="primaryBalanced">cada equipa</GradientText>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Um conjunto curto de princípios e hábitos — não buzzwords. Ajusta os textos para refletir a tua experiência real e o tipo de projetos que queres atrair.
          </p>
        </div>

        <motion.ul
          className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -8% 0px" }}
        >
          {HIGHLIGHTS.map(({ title, description, Icon, accent }) => (
            <motion.li key={title} variants={item} className="h-full min-h-0">
              <div
                className={cn(
                  "group relative flex h-full min-h-[188px] flex-col overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card/85 to-background/35 shadow-sm ring-1 ring-inset ring-white/[0.04] dark:from-card/55 dark:via-card/40 dark:to-background/20 dark:ring-white/[0.03]",
                  "transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/35 hover:shadow-[0_14px_44px_-18px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]",
                  accent === "featured" && "border-primary/30 from-primary/[0.07] via-card/88 to-background/35 ring-primary/15 dark:from-primary/[0.1] dark:via-card/45",
                )}
              >
                <GlowingEffect
                  disabled={false}
                  variant="themed"
                  spread={accent === "featured" ? 32 : 26}
                  proximity={100}
                  inactiveZone={0.65}
                  movementDuration={1.5}
                  borderWidth={1}
                />
                <MagicCard mode="gradient" emphasis={accent === "featured"} className="relative z-10 flex h-full min-h-0 flex-1 flex-col rounded-2xl p-0">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/[0.08] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative flex flex-1 flex-col p-5">
                    <div className="relative flex flex-1 items-start gap-4">
                      <span
                        className={cn(
                          "grid shrink-0 place-items-center rounded-2xl border text-primary shadow-sm",
                          accent === "featured" ? "size-12 border-primary/35 bg-primary/[0.12] sm:size-14" : "size-11 border-border/60 bg-background/75 dark:bg-background/40",
                        )}
                      >
                        <Icon className={accent === "featured" ? "size-6 sm:size-7" : "size-5"} strokeWidth={1.65} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{description}</p>
                      </div>
                    </div>
                  </div>
                </MagicCard>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
