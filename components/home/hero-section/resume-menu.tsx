"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { RESUME_FILENAME_DOWNLOAD, RESUME_PDF_HREF } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { ChevronDown, Download, ExternalLink, FileText } from "lucide-react";
import { motion } from "motion/react";

import { sectionHoverTransition } from "../section-motion";

function Panel({ onPick, viewLabel, downloadLabel }: { onPick: () => void; viewLabel: string; downloadLabel: string }) {
  return (
    <div
      className="absolute left-0 top-full z-[60] mt-2 min-w-[14rem] overflow-hidden rounded-xl border border-border/60 bg-background/95 py-1 shadow-xl ring-1 ring-border/30 backdrop-blur-xl"
      role="menu"
    >
      <a
        href={RESUME_PDF_HREF}
        target="_blank"
        rel="noopener noreferrer"
        role="menuitem"
        className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground transition-[background-color,transform] duration-200 hover:bg-primary/10 hover:translate-x-0.5"
        onClick={onPick}
      >
        <ExternalLink className="size-4 shrink-0 text-primary" />
        {viewLabel}
      </a>
      <a
        href={RESUME_PDF_HREF}
        download={RESUME_FILENAME_DOWNLOAD}
        role="menuitem"
        className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground transition-[background-color,transform] duration-200 hover:bg-primary/10 hover:translate-x-0.5"
        onClick={onPick}
      >
        <Download className="size-4 shrink-0 text-primary" />
        {downloadLabel}
      </a>
    </div>
  );
}

/**
 * Currículo: visualizar (nova aba) ou baixar PDF.
 */
export function ResumeMenu() {
  const { t } = useTranslation("hero");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const toggle = () => setOpen((o) => !o);
  const pick = () => setOpen(false);

  return (
    <div className="relative flex flex-wrap items-center gap-2" ref={rootRef}>
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={sectionHoverTransition}>
        <Button
          type="button"
          variant="outline"
          size="default"
          className="gap-2 border-border/60 bg-background/60 font-mono text-xs font-bold uppercase tracking-wide"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={toggle}
        >
          <FileText className="size-4" />
          {t("resume")}
          <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
        </Button>
      </motion.div>
      {open ? <Panel onPick={pick} viewLabel={t("resumeView")} downloadLabel={t("resumeDownload")} /> : null}
    </div>
  );
}
