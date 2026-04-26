"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { cn } from "@/lib/utils";
import { Tabs } from "@base-ui/react/tabs";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

import { AlternatingTimeline } from "./alternating-timeline";
import { CertificatesGrid } from "./certificates-grid";
import { JourneyHeader } from "./journey-header";
import { academicToEntries, professionalToEntries } from "./journey-mappers";
import { easeOut } from "./journey-motion";
import { useJourneyEntries } from "./use-journey-entries";

/**
 * Trajetória: abas (profissional, acadêmico, certificados) + linha do tempo alternada no scroll.
 */
export function JourneySection() {
  const { t } = useTranslation("journey");
  const { professional, academic, certificates } = useJourneyEntries();
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
        <JourneyHeader />

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
              {t("tabs.professional")}
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
              {t("tabs.academic")}
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
              {t("tabs.certificates")}
            </Tabs.Tab>
          </Tabs.List>

          <div className="relative mt-8 w-full overflow-hidden rounded-[1.75rem] border border-border/45 bg-card/35 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl dark:border-white/[0.06] dark:bg-card/20 dark:shadow-black/40 sm:p-7 lg:p-9">
            <div className="pointer-events-none absolute -right-24 top-0 size-72 rounded-full bg-primary/[0.07] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-foreground/[0.04] blur-3xl dark:bg-white/[0.05]" aria-hidden />

            <Tabs.Panel value="professional" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <AlternatingTimeline listRef={listProRef} entries={professionalToEntries(professional)} kind="work" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="academic" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <AlternatingTimeline listRef={listAcadRef} entries={academicToEntries(academic)} kind="study" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="certificates" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                <CertificatesGrid items={certificates} />
              </motion.div>
            </Tabs.Panel>
          </div>
        </Tabs.Root>
      </Container>
    </section>
  );
}
