"use client";

import { useCallback, useState, type FormEvent } from "react";

import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";

/** Substitui pelos teus dados e URLs reais. */
const CONTACT = {
  email: "contato@exemplo.com",
  phoneDisplay: "+351 000 000 000",
  phoneHref: "tel:+351000000000",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "peer w-full border-0 border-b border-border/80 bg-transparent px-0 pb-2 pt-6 text-base text-foreground outline-none transition-[border-color] placeholder:text-transparent focus:border-primary focus:ring-0 dark:border-border/60";

const labelClass = cn(
  "pointer-events-none absolute left-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200",
  "top-1 text-primary/90",
  "peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground",
  "peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-primary",
  "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:text-primary/90",
);

function UnderlineInput({ id, name, type = "text", label, autoComplete }: { id: string; name: string; type?: string; label: string; autoComplete?: string }) {
  return (
    <div className="group relative">
      <input id={id} name={name} type={type} autoComplete={autoComplete} placeholder=" " className={fieldClass} required />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-transparent transition-transform duration-300 ease-out peer-focus:scale-x-100 peer-[:not(:placeholder-shown)]:scale-x-100"
        aria-hidden
      />
    </div>
  );
}

function UnderlineTextarea({ id, name, label, rows = 5 }: { id: string; name: string; label: string; rows?: number }) {
  return (
    <div className="group relative">
      <textarea id={id} name={name} rows={rows} placeholder=" " className={cn(fieldClass, "min-h-[140px] resize-y align-top leading-relaxed")} required />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-primary to-transparent transition-transform duration-300 ease-out peer-focus:scale-x-100 peer-[:not(:placeholder-shown)]:scale-x-100"
        aria-hidden
      />
    </div>
  );
}

/**
 * Contato — layout editorial + cartão de formulário (UI apenas; envio real num passo seguinte).
 */
export function ContactSection() {
  const [pulse, setPulse] = useState(false);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPulse(true);
    window.setTimeout(() => setPulse(false), 900);
  }, []);

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-20 sm:py-28 lg:py-32"
      aria-labelledby="contact-heading"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 70% at 10% 20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 55%),
          radial-gradient(ellipse 70% 50% at 90% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 50%),
          radial-gradient(ellipse 50% 40% at 50% 100%, color-mix(in oklch, var(--foreground) 4%, transparent), transparent 45%)
        `,
      }}
    >
      {/* Textura fina + ruído SVG */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -18deg,
              transparent,
              transparent 48px,
              color-mix(in oklch, var(--foreground) 2.5%, transparent) 48px,
              color-mix(in oklch, var(--foreground) 2.5%, transparent) 49px
            )`,
          }}
        />
        <svg className="absolute inset-0 size-full mix-blend-overlay opacity-[0.12] dark:opacity-[0.18]" aria-hidden>
          <filter id="contact-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-noise)" opacity="0.45" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16 xl:gap-20">
          {/* Coluna editorial */}
          <div className="relative min-w-0">
            <span
              className="pointer-events-none absolute -left-2 top-[-4%] select-none font-mono text-[clamp(3.5rem,14vw,9rem)] font-black leading-none tracking-[-0.06em] text-foreground/[0.04] dark:text-foreground/[0.07] sm:-left-4 sm:top-[-6%]"
              aria-hidden
            >
              CONTATO
            </span>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="relative"
            >
              <div className="flex flex-wrap items-center gap-4">
                <div
                  className="grid size-11 shrink-0 place-items-center rounded-lg border border-primary/35 bg-gradient-to-br from-primary/[0.14] to-transparent shadow-[inset_0_1px_0_0_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:size-12"
                  aria-hidden
                >
                  <span className="font-mono text-[11px] font-bold tabular-nums text-primary sm:text-xs">06</span>
                </div>
                <div className="h-px min-w-[2.5rem] flex-1 max-w-[6rem] bg-gradient-to-r from-primary/45 to-transparent lg:max-w-[10rem]" aria-hidden />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[11px]">Vamos conversar</p>
              </div>

              <h2
                id="contact-heading"
                className="mt-6 text-balance font-black tracking-[-0.045em] text-foreground"
                style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.05 }}
              >
                <GradientText variant="surface">Contato</GradientText>
                <GradientText variant="accentEnd">.</GradientText>
              </h2>

              <p className="mt-3 text-lg font-semibold tracking-tight text-foreground/90 sm:text-xl">Entre em contato</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Quer começar um projeto ou bater um papo técnico? Escreve com contexto — respondo o quanto antes.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">E-mail</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:decoration-primary"
                  >
                    <Mail className="size-5 shrink-0 text-primary" aria-hidden />
                    {CONTACT.email}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Telefone</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition hover:decoration-primary"
                  >
                    <Phone className="size-5 shrink-0 text-primary" aria-hidden />
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3" aria-label="Redes sociais">
                <a
                  href={CONTACT.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
                >
                  <GitHubIcon className="size-5" />
                  <span className="sr-only">GitHub</span>
                </a>
                <a
                  href={CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-12 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/45 hover:bg-primary/10 hover:text-foreground dark:bg-background/25"
                >
                  <LinkedInIcon className="size-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Cartão formulário */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeOut }}
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-card/45 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-xl dark:border-white/[0.08] dark:bg-card/30 dark:shadow-[0_28px_90px_-36px_rgba(0,0,0,0.55)] dark:ring-white/[0.05] sm:p-8 lg:p-9",
              pulse && "ring-2 ring-primary/40",
            )}
          >
            <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent"
              aria-hidden
            />

            <div className="relative flex items-center justify-between gap-4 border-b border-border/40 pb-5 dark:border-white/[0.06]">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Mensagem</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">Campos com estilo editorial — só interface por agora.</p>
              </div>
              <span className="hidden rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-block">
                Beta
              </span>
            </div>

            <form className="relative mt-8 space-y-9" onSubmit={onSubmit} noValidate>
              <UnderlineInput id="contact-name" name="name" label="Seu nome" autoComplete="name" />
              <UnderlineInput id="contact-email" name="email" type="email" label="E-mail" autoComplete="email" />
              <UnderlineTextarea id="contact-message" name="message" label="Projeto ou mensagem" rows={5} />

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full border-0 bg-primary font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0_32px_color-mix(in_oklch,var(--color-primary)_38%,_transparent)] transition hover:bg-primary/90 hover:shadow-[0_0_40px_color-mix(in_oklch,var(--color-primary)_48%,_transparent)]"
                >
                  Enviar
                  <ArrowUpRight className="ml-2 size-4" aria-hidden />
                </Button>
                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  Integração de envio (server action, Resend, Formspree, etc.) pode ser ligada depois — por agora o botão só confirma o layout.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
