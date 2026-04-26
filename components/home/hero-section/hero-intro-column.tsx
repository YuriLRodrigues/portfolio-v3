"use client";

import { useTranslation } from "react-i18next";

import { GitHubIcon } from "@/components/icons/github-icon";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { AnimatedBadge } from "@/components/ui/animated-badge";
import { buttonVariants } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { LinkPreview } from "@/components/ui/link-preview";
import { TypingAnimation } from "@/components/ui/typing-animation";

import { cn } from "@/lib/utils";
import { Mail, MoveRight, UserCircle2 } from "lucide-react";
import { motion } from "motion/react";

import { openPersonalIntro } from "./personal-intro";
import { ResumeMenu } from "./resume-menu";
import { RotatingRole } from "./rotating-role";

const socialIconClassName =
  "flex size-10 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-foreground";

export function HeroIntroColumn() {
  const { t, i18n } = useTranslation("hero");
  return (
    <div className="flex min-w-0 flex-col justify-center gap-6 sm:gap-8">
      <div className="w-fit max-w-full" suppressHydrationWarning>
        <AnimatedBadge text={t("badge")} color="var(--color-primary)" />
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="min-w-0 max-w-2xl">
        <p className="text-[clamp(1.85rem,5.2vw,3.1rem)] font-black leading-[1.06] tracking-[-0.045em] sm:tracking-[-0.05em]">
          <span className="text-muted-foreground">{t("greeting")}</span> <span className="text-foreground">{t("nameLead")}</span>{" "}
          <span className="relative inline-block">
            <GradientText>Yuri</GradientText>
          </span>
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-1.5 sm:space-y-2">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}>
          <RotatingRole key={i18n.language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 max-w-2xl overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 via-card/40 to-primary/[0.08] p-4 shadow-sm ring-1 ring-foreground/[0.04] backdrop-blur-md dark:from-card/50 dark:via-background/30 dark:to-primary/[0.12] dark:ring-white/[0.06] sm:p-5"
        >
          <div className="pointer-events-none absolute -right-12 -top-10 size-36 rounded-full bg-primary/15 blur-3xl sm:size-44" aria-hidden />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />
          <p className="relative flex min-w-0 gap-2.5 font-mono text-[clamp(0.75rem,1.85vw,0.92rem)] font-medium leading-relaxed tracking-wide text-muted-foreground sm:gap-3">
            <span className="shrink-0 select-none pt-0.5 font-bold text-primary/80" aria-hidden>
              ›
            </span>
            <TypingAnimation
              loop
              delay={1000}
              pauseDelay={1000}
              typeSpeed={22}
              startOnView
              showCursor
              as="span"
              className="block min-h-[5em] min-w-0 flex-1 text-foreground/90 [&_.cursor-blink]:text-primary"
            >
              {t("tagline")}
            </TypingAnimation>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <a
          href="#projects"
          className={cn(
            buttonVariants({ size: "lg" }),
            "inline-flex gap-2 bg-primary px-6 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)] hover:bg-primary/90",
          )}
        >
          {t("ctaProjects")}
          <MoveRight className="size-4" />
        </a>
        <ResumeMenu />
        <button
          type="button"
          onClick={openPersonalIntro}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "inline-flex gap-2 border-primary/35 bg-background/50 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10",
          )}
        >
          <UserCircle2 className="size-4 shrink-0 text-primary" aria-hidden />
          {t("photoBio")}
        </button>
        <div className="flex items-center gap-1.5 sm:pl-1" aria-label={t("socialLabel")}>
          {(
            [
              { href: "https://github.com/YuriLRodrigues", label: t("socialGithub"), Icon: GitHubIcon, preview: true },
              { href: "https://www.linkedin.com/in/yuri-leite-rodrigues", label: t("socialLinkedIn"), Icon: LinkedInIcon, preview: true },
              { href: "mailto:rodriguesyuri769@gmail.com", label: t("socialEmail"), Icon: Mail, preview: false },
            ] as const
          ).map(({ href, label, Icon, preview }) =>
            preview ? (
              <LinkPreview key={label} url={href} className={socialIconClassName} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="size-4" aria-hidden />
              </LinkPreview>
            ) : (
              <a key={label} href={href} className={socialIconClassName} aria-label={label}>
                <Icon className="size-4" aria-hidden />
              </a>
            ),
          )}
        </div>
      </motion.div>
    </div>
  );
}
