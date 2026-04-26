"use client";

import type { RefObject } from "react";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils";
import { Tabs } from "@base-ui/react/tabs";
import { Award, Briefcase, Download, ExternalLink, GraduationCap } from "lucide-react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

type ProfessionalEntry = {
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  stack?: string[];
};

type AcademicEntry = {
  period: string;
  title: string;
  institution: string;
  description: string;
};

type CertificateEntry = {
  title: string;
  issuer: string;
  issued: string;
  href: string;
  format: string;
  /** Se true, sugere download de PDF; se false, abre credencial em nova aba. */
  download?: boolean;
};

const PROFESSIONAL: ProfessionalEntry[] = [
  {
    period: "2024 — atual",
    title: "Desenvolvedor full stack",
    org: "Estúdio / produto digital",
    location: "Remoto & híbrido",
    description:
      "Evolução de features em Next.js, APIs em Node e integrações com serviços externos. Participação em decisões de arquitetura, revisão de código e alinhamento com design.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    period: "2021 — 2024",
    title: "Desenvolvedor frontend",
    org: "Empresa de software B2B",
    description: "Interfaces complexas com foco em performance e acessibilidade. Design system interno, testes e entrega contínua ao lado de produto e QA.",
    stack: ["React", "Tailwind CSS", "Storybook", "Jest"],
  },
  {
    period: "2019 — 2021",
    title: "Desenvolvedor júnior",
    org: "Agência digital",
    location: "Presencial",
    description: "Landing pages, integrações com CMS e primeiros contatos com pipeline de deploy e versionamento em time.",
    stack: ["JavaScript", "WordPress", "Git"],
  },
];

const ACADEMIC: AcademicEntry[] = [
  {
    period: "2018 — 2022",
    title: "Bacharelado em Ciência da Computação",
    institution: "Universidade (substitua pelo nome real)",
    description: "Base sólida em algoritmos, estruturas de dados, engenharia de software e projetos em grupo. Trabalho de conclusão alinhado a aplicações web.",
  },
  {
    period: "2023",
    title: "Certificação em desenvolvimento web avançado",
    institution: "Plataforma / bootcamp (opcional)",
    description: "Aprofundamento em arquitetura frontend, padrões de API e boas práticas de deploy.",
  },
];

const CERTIFICATES: CertificateEntry[] = [
  {
    title: "Certificado (modelo PDF)",
    issuer: "Instituição ou curso",
    issued: "2025",
    href: "/certificados/certificado-modelo.pdf",
    format: "PDF",
    download: true,
  },
  {
    title: "Credencial verificável (modelo)",
    issuer: "Plataforma de badges",
    issued: "2024",
    href: "https://www.credly.com",
    format: "Online",
    download: false,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function CertificatesGrid({ items }: { items: CertificateEntry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
      {items.map((cert) => {
        const isFileDownload = cert.download === true;
        return (
          <div
            key={cert.title + cert.issued}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/55 bg-gradient-to-br from-card via-card/90 to-background/30 p-5 shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/30 hover:shadow-[0_16px_48px_-24px_color-mix(in_oklch,var(--color-primary)_30%,_transparent)] dark:from-card/50 dark:to-background/20"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-background/80 text-primary">
                <Award className="size-5" aria-hidden />
              </span>
              <span className="rounded-md border border-border/50 bg-muted/40 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {cert.format}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{cert.title}</h3>
            <p className="text-sm text-primary">{cert.issuer}</p>
            <p className="mt-1 text-xs text-muted-foreground">Emitido em {cert.issued}</p>
            <a
              href={cert.href}
              {...(isFileDownload ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/35 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition",
                "hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {isFileDownload ? <Download className="size-4" aria-hidden /> : <ExternalLink className="size-4" aria-hidden />}
              {isFileDownload ? "Baixar PDF" : "Abrir credencial"}
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              PDFs em <code className="rounded bg-muted px-1 py-px font-mono text-[10px]">public/certificados/</code> — edite títulos, emitente e links no topo de{" "}
              <code className="rounded bg-muted px-1 py-px font-mono text-[10px]">journey-section.tsx</code>.
            </p>
          </div>
        );
      })}
    </div>
  );
}

type TimelineKind = "work" | "study";

type Entry = {
  period: string;
  title: string;
  subtitle: string;
  meta?: string;
  description: string;
  tags?: string[];
};

function ExperienceCard({ period, title, subtitle, meta, description, tags, kind }: Entry & { kind: TimelineKind }) {
  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br p-5 shadow-lg ring-1 ring-inset transition-[border-color,box-shadow,transform] duration-500 sm:p-6",
        "from-card/95 via-card/70 to-background/40 ring-white/[0.06] dark:from-card/60 dark:via-card/45 dark:to-background/25 dark:ring-white/[0.05]",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_24px_60px_-28px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl transition-opacity duration-500 group-hover/card:opacity-100",
          kind === "work" ? "bg-primary/[0.14]" : "bg-primary/[0.09]",
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <time className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{period}</time>
      <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h3>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        {subtitle}
        {meta ? (
          <>
            <span className="text-border"> · </span>
            {meta}
          </>
        ) : null}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{description}</p>
      {tags?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
          {tags.map((t) => (
            <li key={t}>
              <span className="inline-flex rounded-md border border-primary/25 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                {t}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function NumberMilestone({ index, total, highlighted, compact }: { index: number; total: number; highlighted: boolean; compact?: boolean }) {
  const n = String(index + 1).padStart(2, "0");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("flex flex-col items-center", compact ? "py-1" : "py-2")}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: compact ? 6 : 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.48, ease: easeOut, delay: index * 0.04 }}
    >
      <div
        className={cn(
          "relative grid place-items-center rounded-2xl border-2 bg-gradient-to-br font-mono font-black tabular-nums tracking-tighter shadow-lg transition-[border-color,color,box-shadow,filter] duration-700 ease-out",
          compact ? "size-16 text-lg" : "size-[4.25rem] text-xl sm:size-24 sm:text-3xl",
          "from-background via-card to-background/80",
          highlighted
            ? "border-primary text-primary shadow-[0_0_0_1px_color-mix(in_oklch,var(--color-primary)_40%,_transparent),0_16px_48px_-16px_color-mix(in_oklch,var(--color-primary)_45%,_transparent)]"
            : "border-border/55 text-muted-foreground shadow-black/[0.06] dark:shadow-black/25",
        )}
      >
        <span className="relative z-[1]">{n}</span>
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700",
            highlighted && "opacity-100 [background:radial-gradient(circle_at_28%_18%,color-mix(in_oklch,var(--primary)_28%,_transparent),transparent_62%)]",
          )}
          aria-hidden
        />
      </div>
      <span className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/75">
        {n}/{String(total).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

function TimelineRow({ entry, index, total, kind }: { entry: Entry; index: number; total: number; kind: TimelineKind }) {
  const rowRef = useRef<HTMLLIElement>(null);
  /** Só colore o marco quando boa parte da linha já está na viewport (evita primary “cedo demais”). */
  const milestoneHighlighted = useInView(rowRef, {
    amount: 0.58,
    margin: "0px 0px -18% 0px",
  });
  const even = index % 2 === 0;

  return (
    <li ref={rowRef} className="relative py-10 sm:py-12 md:py-14">
      {/* Marco no eixo central — desktop */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 z-[3] hidden size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-background shadow-md transition-[background-color,box-shadow] duration-700 ease-out md:block",
          milestoneHighlighted
            ? "bg-primary shadow-[0_0_0_6px_color-mix(in_oklch,var(--color-primary)_22%,_transparent),0_0_28px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)]"
            : "bg-muted-foreground/35",
        )}
        aria-hidden
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease: easeOut, delay: index * 0.06 }}
      >
        {/* Mobile: sempre número → card */}
        <div className="flex justify-center md:hidden">
          <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} compact />
        </div>
        <div className="md:hidden">
          <ExperienceCard {...entry} kind={kind} />
        </div>

        {/* Desktop: alternância */}
        <div className="hidden md:flex md:justify-end md:pr-4 lg:pr-8">
          {even ? <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} /> : <ExperienceCard {...entry} kind={kind} />}
        </div>
        <div className="hidden md:flex md:justify-start md:pl-4 lg:pl-8">
          {even ? <ExperienceCard {...entry} kind={kind} /> : <NumberMilestone index={index} total={total} highlighted={milestoneHighlighted} />}
        </div>
      </motion.div>
    </li>
  );
}

function AlternatingTimeline({ listRef, entries, kind }: { listRef: RefObject<HTMLUListElement | null>; entries: Entry[]; kind: TimelineKind }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    /* Intervalo mais curto = barra completa com menos scroll; “end” mais alto = 100% um pouco antes do fim da lista. */
    offset: ["start 0.72", "end 0.38"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 10000 : 220,
    damping: reduceMotion ? 100 : 32,
    mass: reduceMotion ? 0.05 : 0.22,
  });
  /** Avança ~15% o preenchimento para a ponta ficar um pouco abaixo do ponto “neutro” do scroll. */
  const lineScale = useTransform(lineProgress, (p) => Math.min(1, Math.max(0, p * 1.15 + 0.12)));

  const railClass =
    "rounded-full bg-muted/55 ring-1 ring-border/70 shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,_transparent)] dark:bg-muted/25 dark:ring-border/50";

  return (
    <div className="relative md:px-2">
      {/* Trilho vertical — desktop: canal cheio + preenchimento primary animado ao scroll */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-0 -translate-x-1/2 md:block" aria-hidden>
        <div className={cn("absolute inset-y-3 left-1/2 w-1 -translate-x-1/2", railClass)} />
        <div className="absolute inset-y-3 left-1/2 w-1 -translate-x-1/2 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_45%,_transparent),inset_0_-12px_16px_-8px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      {/* Trilho — mobile: mesma lógica */}
      <div className="absolute left-[1.05rem] top-3 bottom-3 w-1 md:hidden" aria-hidden>
        <div className={cn("absolute inset-0", railClass)} />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/45 shadow-[0_0_22px_color-mix(in_oklch,var(--color-primary)_40%,_transparent),inset_0_-10px_14px_-6px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]"
            style={{ scaleY: lineScale }}
          />
        </div>
      </div>

      <ul ref={listRef} className="relative z-[1] space-y-0 pl-10 md:space-y-0 md:pl-0">
        {entries.map((entry, index) => (
          <TimelineRow key={entry.title + entry.period} entry={entry} index={index} total={entries.length} kind={kind} />
        ))}
      </ul>
    </div>
  );
}

function professionalToEntries(items: ProfessionalEntry[]): Entry[] {
  return items.map((item) => ({
    period: item.period,
    title: item.title,
    subtitle: item.org,
    meta: item.location,
    description: item.description,
    tags: item.stack,
  }));
}

function academicToEntries(items: AcademicEntry[]): Entry[] {
  return items.map((item) => ({
    period: item.period,
    title: item.title,
    subtitle: item.institution,
    description: item.description,
  }));
}

/**
 * Trajetória: abas (profissional, acadêmico, certificados) + linha do tempo alternada no scroll.
 */
export function JourneySection() {
  const listProRef = useRef<HTMLUListElement>(null);
  const listAcadRef = useRef<HTMLUListElement>(null);

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 0% 0%, color-mix(in oklch, var(--primary) 11%, transparent), transparent 52%),
          radial-gradient(ellipse 55% 45% at 100% 100%, color-mix(in oklch, var(--primary) 8%, transparent), transparent 50%),
          radial-gradient(ellipse 45% 35% at 50% 30%, color-mix(in oklch, var(--foreground) 2%, transparent), transparent 55%)
        `,
      }}
      aria-labelledby="journey-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] dark:opacity-[0.12]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 56px,
              color-mix(in oklch, var(--foreground) 2.2%, transparent) 56px,
              color-mix(in oklch, var(--foreground) 2.2%, transparent) 57px
            )`,
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
              aria-hidden
            >
              <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">05</span>
            </div>
            <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-[11px]">Trajetória</p>
          </div>
          <h2 id="journey-heading" className="mt-5 text-balance text-3xl font-black tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[2.55rem] lg:leading-[1.08]">
            Minha evolução como <GradientText variant="primaryBalanced">desenvolvedor</GradientText>
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Organizei minha trajetória em três áreas: <strong>Profissional</strong>, com minha experiência no mercado e projetos reais;
            <strong> Acadêmico</strong>, com minha formação e estudos em tecnologia; e <strong>Certificados</strong>, onde reúno cursos e validações das minhas habilidades.
          </p>
        </div>

        <Tabs.Root defaultValue="professional" className="mt-12 w-full sm:mt-14">
          <Tabs.List className="relative flex w-full flex-col gap-2 rounded-2xl border border-border/50 bg-muted/25 p-1.5 shadow-inner backdrop-blur-sm sm:flex-row sm:gap-1.5 sm:p-1.5">
            <Tabs.Tab
              value="professional"
              className={({ active }) =>
                cn(
                  "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition outline-none sm:flex-1 sm:py-2.5 sm:px-4",
                  active ? "bg-background text-foreground shadow-md ring-1 ring-border/60" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Briefcase className="size-4 shrink-0 opacity-80" aria-hidden />
              Profissional
            </Tabs.Tab>
            <Tabs.Tab
              value="academic"
              className={({ active }) =>
                cn(
                  "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition outline-none sm:flex-1 sm:py-2.5 sm:px-4",
                  active ? "bg-background text-foreground shadow-md ring-1 ring-border/60" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <GraduationCap className="size-4 shrink-0 opacity-80" aria-hidden />
              Académico
            </Tabs.Tab>
            <Tabs.Tab
              value="certificates"
              className={({ active }) =>
                cn(
                  "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition outline-none sm:flex-1 sm:py-2.5 sm:px-4",
                  active ? "bg-background text-foreground shadow-md ring-1 ring-border/60" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Award className="size-4 shrink-0 opacity-80" aria-hidden />
              Certificados
            </Tabs.Tab>
          </Tabs.List>

          <div className="relative mt-8 w-full overflow-hidden rounded-[1.75rem] border border-border/45 bg-card/35 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl dark:border-white/[0.06] dark:bg-card/20 dark:shadow-black/40 sm:p-7 lg:p-9">
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-primary/[0.07] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-foreground/[0.04] blur-3xl dark:bg-white/[0.05]" aria-hidden />

            <Tabs.Panel value="professional" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <AlternatingTimeline listRef={listProRef} entries={professionalToEntries(PROFESSIONAL)} kind="work" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="academic" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <AlternatingTimeline listRef={listAcadRef} entries={academicToEntries(ACADEMIC)} kind="study" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="certificates" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <CertificatesGrid items={CERTIFICATES} />
              </motion.div>
            </Tabs.Panel>
          </div>
        </Tabs.Root>
      </Container>
    </section>
  );
}
