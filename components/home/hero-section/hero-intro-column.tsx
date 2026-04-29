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

import { sectionHoverTransition } from "../section-motion";
import { heroEase, heroMotionViewport } from "./hero-motion";
import { openPersonalIntro } from "./personal-intro";
import { ResumeMenu } from "./resume-menu";
import { RotatingRole } from "./rotating-role";

const socialIconClassName =
  "flex size-10 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground active:scale-95";

export function HeroIntroColumn() {
  const { t, i18n } = useTranslation("hero");
  return (
    <div className="flex min-w-0 flex-col justify-center gap-6 sm:gap-8">
      <div className="w-fit max-w-full" suppressHydrationWarning>
        <AnimatedBadge text={t("badge")} color="var(--color-primary)" motionViewport={heroMotionViewport} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={heroMotionViewport}
        transition={{ duration: 0.72, ease: heroEase }}
        className="max-w-2xl min-w-0"
      >
        <p className="text-[clamp(1.85rem,5.2vw,3.1rem)] leading-[1.06] font-black tracking-[-0.045em] sm:tracking-[-0.05em]">
          <span className="text-muted-foreground">{t("greeting")}</span> <span className="text-foreground">{t("nameLead")}</span>{" "}
          <span className="relative inline-block">
            <GradientText>Yuri</GradientText>
          </span>
        </p>
      </motion.div>

      <div className="max-w-4xl space-y-1.5 sm:space-y-2">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={heroMotionViewport} transition={{ duration: 0.68, delay: 0.22, ease: heroEase }}>
          <RotatingRole key={i18n.language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          viewport={heroMotionViewport}
          transition={{ delay: 0.38, duration: 0.7, ease: heroEase }}
          className="relative max-w-2xl min-w-0 overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/90 via-card/40 to-primary/[0.08] p-4 shadow-sm ring-1 ring-foreground/[0.04] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--color-primary)_22%,_transparent)] sm:p-5 dark:from-card/50 dark:via-background/30 dark:to-primary/[0.12] dark:ring-white/[0.06]"
        >
          <div className="pointer-events-none absolute -top-10 -right-12 size-36 rounded-full bg-primary/15 blur-3xl sm:size-44" aria-hidden />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />
          <p className="relative flex min-w-0 gap-2.5 font-mono text-[clamp(0.75rem,1.85vw,0.92rem)] leading-relaxed font-medium tracking-wide text-muted-foreground sm:gap-3">
            <span className="shrink-0 pt-0.5 font-bold text-primary/80 select-none" aria-hidden>
              ›
            </span>
            <TypingAnimation
              loop
              delay={1200}
              pauseDelay={1200}
              typeSpeed={28}
              startOnView
              inViewOnce={false}
              showCursor
              as="span"
              className="block min-h-[6.5em] min-w-0 flex-1 text-foreground/90 sm:min-h-[5em] [&_.cursor-blink]:text-primary"
            >
              {t("tagline")}
            </TypingAnimation>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={heroMotionViewport}
        transition={{ delay: 0.52, duration: 0.62, ease: heroEase }}
      >
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={sectionHoverTransition}
          className={cn(
            buttonVariants({ size: "lg" }),
            "group inline-flex gap-2 bg-primary px-6 font-mono text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-[0_0_28px_color-mix(in_oklch,var(--color-primary)_40%,_transparent)] hover:bg-primary/90",
          )}
        >
          {t("ctaProjects")}
          <MoveRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </motion.a>
        <ResumeMenu />
        <button
          type="button"
          onClick={openPersonalIntro}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "inline-flex gap-2 border-primary/35 bg-background/50 font-mono text-xs font-bold tracking-wider uppercase backdrop-blur-sm transition-transform duration-200 hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/10 active:scale-[0.99]",
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
