"use client";

import { cn } from "@/lib/utils";

import { CoverFrame } from "./cover-frame";
import { COVER_MOTIFS, isCoverMotifId } from "./cover-motifs";

type ProjectCoverProps = {
  /** Id do projeto; precisa existir em COVER_MOTIFS. */
  id: string;
  /** Texto lido por leitor de tela — a arte em si é decorativa. */
  alt: string;
  /** Posição na lista, usada no selo "01" e para variar o brilho do fundo. */
  index: number;
  /** Linha de metadados curta, ex.: "2025 — 2026 · Autoral". */
  meta?: string;
  className?: string;
  /** Sem os selos de canto — útil em miniaturas. */
  bare?: boolean;
};

export function ProjectCover({ id, alt, index, meta, className, bare = false }: ProjectCoverProps) {
  const Motif = isCoverMotifId(id) ? COVER_MOTIFS[id] : null;

  return (
    <div className={cn("relative size-full overflow-hidden", className)} role="img" aria-label={alt}>
      <CoverFrame seed={index + 1}>{Motif ? <Motif /> : null}</CoverFrame>

      {bare ? null : (
        <>
          <span
            className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-background/70 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-primary tabular-nums backdrop-blur-sm sm:top-6 sm:left-6 sm:text-[11px]"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {meta ? (
            <span
              className="pointer-events-none absolute top-4 right-4 hidden rounded-lg border border-border/50 bg-background/70 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase backdrop-blur-sm sm:top-6 sm:right-6 sm:inline-flex sm:text-[11px]"
              aria-hidden
            >
              {meta}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}
