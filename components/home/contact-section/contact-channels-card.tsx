"use client";

import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";

import { LinkedInIcon } from "@/components/icons/linkedin-icon";

import { RESUME_FILENAME_DOWNLOAD, RESUME_PDF_HREF } from "@/lib/resume";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { motion } from "motion/react";

import { sectionEase, sectionLiftHoverTransition, sectionMotionViewport } from "../section-motion";
import { CONTACT } from "./contact-data";

type Channel = {
  id: "email" | "linkedin" | "resume";
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  download?: string;
};

/**
 * Contato sem formulário: o site é estático (GitHub Pages), então os caminhos são diretos —
 * e-mail, LinkedIn e o currículo em PDF.
 */
export function ContactChannelsCard() {
  const { t } = useTranslation("contact");

  const channels: Channel[] = [
    { id: "email", href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(t("emailSubject"))}`, Icon: Mail },
    { id: "linkedin", href: CONTACT.social.linkedin, Icon: LinkedInIcon, external: true },
    { id: "resume", href: RESUME_PDF_HREF, Icon: FileText, download: RESUME_FILENAME_DOWNLOAD },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: sectionLiftHoverTransition }}
      viewport={sectionMotionViewport}
      transition={{ duration: 0.74, delay: 0.14, ease: sectionEase }}
      className="relative overflow-hidden rounded-[1.75rem] border border-border/50 bg-card/45 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06] backdrop-blur-xl ring-inset sm:p-8 lg:p-9 dark:border-white/[0.08] dark:bg-card/30 dark:shadow-[0_28px_90px_-36px_rgba(0,0,0,0.55)] dark:ring-white/[0.05]"
    >
      <div className="pointer-events-none absolute -top-24 -right-20 size-72 rounded-full bg-primary/[0.12] blur-3xl dark:bg-primary/[0.18]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[85%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent" aria-hidden />

      <div className="relative border-b border-border/40 pb-5 dark:border-white/[0.06]">
        <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-primary uppercase">{t("channelsKicker")}</p>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{t("channelsSub")}</p>
      </div>

      <ul className="relative mt-6 space-y-3">
        {channels.map(({ id, href, Icon, external, download }) => (
          <li key={id}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...(download ? { download } : {})}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-background/50 px-4 py-4 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/[0.06] focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:outline-none sm:px-5 dark:bg-background/20"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/[0.08] text-primary" aria-hidden>
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold tracking-tight text-foreground">{t(`channels.${id}.title`)}</span>
                <span className="block text-sm text-muted-foreground">{t(`channels.${id}.hint`)}</span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
