"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@/components/ui/container";

import { cn } from "@/lib/utils";
import { Tabs } from "@base-ui/react/tabs";
import { Award, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

import { SectionBackground } from "../section-background";
import { sectionEase, sectionMotionViewport } from "../section-motion";
import { AlternatingTimeline } from "./alternating-timeline";
import { CertificatesGrid } from "./certificates-grid";
import { JourneyHeader } from "./journey-header";
import { academicToEntries, professionalToEntries } from "./journey-mappers";
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
    <section id="experience" className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28" aria-labelledby="journey-heading">
      <SectionBackground variant="aurora" anchor="topLeft" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden />

      <Container className="relative z-10">
        <JourneyHeader />

        <Tabs.Root defaultValue="professional" className="mt-12 w-full sm:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionMotionViewport}
            transition={{ duration: 0.7, delay: 0.06, ease: sectionEase }}
          >
            <Tabs.List className="relative flex w-full flex-col gap-2 rounded-2xl border border-border/50 bg-muted/25 p-1.5 shadow-inner backdrop-blur-sm sm:flex-row sm:gap-1.5 sm:p-1.5">
              <Tabs.Tab
                value="professional"
                className={({ active }) =>
                  cn(
                    "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-[color,transform,background-color,box-shadow] duration-200 outline-none sm:flex-1 sm:px-4 sm:py-2.5",
                    active ? "bg-primary/[0.12] text-primary shadow-md ring-1 ring-primary/45" : "text-muted-foreground hover:scale-[1.02] hover:text-foreground",
                  )
                }
              >
                <Briefcase className="size-4 shrink-0 opacity-90" aria-hidden />
                {t("tabs.professional")}
              </Tabs.Tab>
              <Tabs.Tab
                value="academic"
                className={({ active }) =>
                  cn(
                    "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-[color,transform,background-color,box-shadow] duration-200 outline-none sm:flex-1 sm:px-4 sm:py-2.5",
                    active ? "bg-primary/[0.12] text-primary shadow-md ring-1 ring-primary/45" : "text-muted-foreground hover:scale-[1.02] hover:text-foreground",
                  )
                }
              >
                <GraduationCap className="size-4 shrink-0 opacity-90" aria-hidden />
                {t("tabs.academic")}
              </Tabs.Tab>
              <Tabs.Tab
                value="certificates"
                className={({ active }) =>
                  cn(
                    "flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-[color,transform,background-color,box-shadow] duration-200 outline-none sm:flex-1 sm:px-4 sm:py-2.5",
                    active ? "bg-primary/[0.12] text-primary shadow-md ring-1 ring-primary/45" : "text-muted-foreground hover:scale-[1.02] hover:text-foreground",
                  )
                }
              >
                <Award className="size-4 shrink-0 opacity-90" aria-hidden />
                {t("tabs.certificates")}
              </Tabs.Tab>
            </Tabs.List>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={sectionMotionViewport}
            transition={{ duration: 0.76, delay: 0.14, ease: sectionEase }}
            className="relative mt-10 w-full sm:mt-12"
          >

            <Tabs.Panel value="professional" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={sectionMotionViewport} transition={{ duration: 0.62, ease: sectionEase }}>
                <AlternatingTimeline listRef={listProRef} entries={professionalToEntries(professional)} kind="work" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="academic" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={sectionMotionViewport} transition={{ duration: 0.62, ease: sectionEase }}>
                <AlternatingTimeline listRef={listAcadRef} entries={academicToEntries(academic)} kind="study" />
              </motion.div>
            </Tabs.Panel>
            <Tabs.Panel value="certificates" className="outline-none">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={sectionMotionViewport} transition={{ duration: 0.62, ease: sectionEase }}>
                <CertificatesGrid items={certificates} />
              </motion.div>
            </Tabs.Panel>
          </motion.div>
        </Tabs.Root>
      </Container>
    </section>
  );
}
