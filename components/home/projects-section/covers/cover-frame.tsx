"use client";

import { useId, type ReactNode } from "react";

/**
 * Fundo compartilhado das capas: grade fina, brilho no accent e vinheta.
 * Tudo em `var(--primary)` / `var(--foreground)`, então a arte acompanha o
 * seletor de cor e o tema claro/escuro sem gerar imagem nova.
 */

export const COVER_WIDTH = 800;
export const COVER_HEIGHT = 500;

type CoverFrameProps = {
  /** Desloca o brilho para que duas capas seguidas não fiquem idênticas. */
  seed?: number;
  children: ReactNode;
};

export function CoverFrame({ seed = 0, children }: CoverFrameProps) {
  const uid = useId().replace(/:/g, "");
  const grid = `cover-grid-${uid}`;
  const glow = `cover-glow-${uid}`;
  const surface = `cover-surface-${uid}`;
  const fade = `cover-fade-${uid}`;

  const glowX = 120 + ((seed * 137) % 560);
  const glowY = 80 + ((seed * 71) % 300);

  return (
    <svg viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`} className="size-full" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">
      <defs>
        <linearGradient id={surface} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="55%" stopColor="var(--background)" />
          <stop offset="100%" stopColor="var(--muted)" />
        </linearGradient>

        <radialGradient id={glow}>
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
          <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="var(--background)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="0.55" />
        </linearGradient>

        <pattern id={grid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="var(--foreground)" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width={COVER_WIDTH} height={COVER_HEIGHT} fill={`url(#${surface})`} />
      <rect width={COVER_WIDTH} height={COVER_HEIGHT} fill={`url(#${grid})`} />
      <ellipse cx={glowX} cy={glowY} rx="330" ry="240" fill={`url(#${glow})`} />
      <ellipse cx={COVER_WIDTH - glowX / 2} cy={COVER_HEIGHT - 40} rx="260" ry="150" fill={`url(#${glow})`} opacity="0.5" />

      {children}

      <rect width={COVER_WIDTH} height={COVER_HEIGHT} fill={`url(#${fade})`} />
      <rect x="0.5" y="0.5" width={COVER_WIDTH - 1} height={COVER_HEIGHT - 1} fill="none" stroke="var(--primary)" strokeOpacity="0.2" />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Primitivas reaproveitadas pelos motivos de cada projeto                 */
/* --------------------------------------------------------------------- */

type PanelProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  /** 0–1, quanto o painel se destaca do fundo. */
  emphasis?: number;
  children?: ReactNode;
};

/** Cartão de vidro: base escura translúcida com borda no accent. */
export function Panel({ x, y, width, height, radius = 14, emphasis = 0.5, children }: PanelProps) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={radius} fill="var(--card)" fillOpacity={0.55 + emphasis * 0.35} />
      <rect
        x={x + 0.75}
        y={y + 0.75}
        width={width - 1.5}
        height={height - 1.5}
        rx={radius}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity={0.22 + emphasis * 0.45}
        strokeWidth="1.5"
      />
      {children}
    </g>
  );
}

type LinesProps = {
  x: number;
  y: number;
  width: number;
  count?: number;
  gap?: number;
  thickness?: number;
  opacity?: number;
  /** Larguras relativas (0–1) por linha; repete se faltar. */
  widths?: readonly number[];
};

/** Linhas de texto simuladas. */
export function Lines({ x, y, width, count = 3, gap = 12, thickness = 5, opacity = 0.3, widths = [1, 0.78, 0.55] }: LinesProps) {
  return (
    <g fill="var(--foreground)" fillOpacity={opacity}>
      {Array.from({ length: count }, (_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={width * (widths[i % widths.length] ?? 1)} height={thickness} rx={thickness / 2} />
      ))}
    </g>
  );
}

type BarsProps = {
  x: number;
  /** Linha de base das barras. */
  baseline: number;
  values: readonly number[];
  barWidth?: number;
  gap?: number;
  maxHeight?: number;
  /** Índice destacado com opacidade cheia. */
  active?: number;
};

export function Bars({ x, baseline, values, barWidth = 18, gap = 12, maxHeight = 120, active }: BarsProps) {
  const peak = Math.max(...values, 1);
  return (
    <g>
      {values.map((value, i) => {
        const height = Math.max(6, (value / peak) * maxHeight);
        const isActive = active === i;
        return (
          <rect
            key={i}
            x={x + i * (barWidth + gap)}
            y={baseline - height}
            width={barWidth}
            height={height}
            rx={barWidth / 2}
            fill="var(--primary)"
            fillOpacity={isActive ? 0.95 : 0.34}
          />
        );
      })}
    </g>
  );
}

type RingProps = {
  cx: number;
  cy: number;
  r: number;
  /** 0–1 do arco preenchido. */
  progress: number;
  thickness?: number;
};

export function Ring({ cx, cy, r, progress, thickness = 10 }: RingProps) {
  const circumference = 2 * Math.PI * r;
  return (
    <g transform={`rotate(-90 ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--foreground)" strokeOpacity="0.14" strokeWidth={thickness} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.9"
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${circumference * progress} ${circumference}`}
      />
    </g>
  );
}

type ChipProps = {
  x: number;
  y: number;
  width: number;
  height?: number;
  filled?: boolean;
};

export function Chip({ x, y, width, height = 18, filled = false }: ChipProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={height / 2}
      fill="var(--primary)"
      fillOpacity={filled ? 0.8 : 0.12}
      stroke="var(--primary)"
      strokeOpacity={filled ? 0 : 0.4}
      strokeWidth="1.25"
    />
  );
}
