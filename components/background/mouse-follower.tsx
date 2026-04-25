"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Pt = { x: number; y: number; vx: number; vy: number };

export type MouseFollowerProps = {
  className?: string;
  /** Pontos da cauda (mais = trilho mais longo). */
  pointsCount?: number;
  /** Espessura base da linha no canvas (px). */
  lineWidth?: number;
  /** Força do mola (0–1 típico). */
  springStrength?: number;
  /** Atrito / amortecimento (0–1). */
  dampening?: number;
  /** Cor da trilha (hex, rgb ou nome). */
  color?: string;
  /** Desfoque em px (efeito glow). */
  blur?: number;
  /** Opacidade global da trilho (0–1). */
  trailOpacity?: number;
  /** Modo de mistura no canvas. */
  mixBlendMode?: GlobalCompositeOperation;
};

/**
 * Cursor suave em canvas — trilho com física de mola (inspirado em React Bits “Smooth Cursor”).
 * @see https://pro.reactbits.dev/docs/components/smooth-cursor
 */
export function MouseFollower({
  className,
  pointsCount = 48,
  lineWidth = 1.25,
  springStrength = 0.45,
  dampening = 0.52,
  color,
  blur = 10,
  trailOpacity = 0.22,
  mixBlendMode = "source-over",
}: MouseFollowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Pt[] | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const colorRef = useRef("#888888");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const n = Math.max(8, Math.min(96, pointsCount));
    pointsRef.current = Array.from({ length: n }, () => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    const resolveColor = () => {
      if (color) {
        colorRef.current = color;
        return;
      }
      const p = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
      colorRef.current = p || "oklch(0.5 0.2 264)";
    };
    resolveColor();

    const onMove = (e: MouseEvent) => {
      hasMovedRef.current = true;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (pointsRef.current) {
        const pts = pointsRef.current;
        for (let i = 0; i < pts.length; i++) {
          if (i === 0 && pts[0].x === 0 && pts[0].y === 0) {
            for (let j = 0; j < pts.length; j++) {
              pts[j].x = e.clientX;
              pts[j].y = e.clientY;
            }
            break;
          }
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const pts = pointsRef.current;
    const spring = springStrength;
    const damp = dampening;

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < n; i++) {
        const p = pts[i];
        const tx = i === 0 ? mx : pts[i - 1].x;
        const ty = i === 0 ? my : pts[i - 1].y;
        p.vx += (tx - p.x) * spring;
        p.vy += (ty - p.y) * spring;
        p.vx *= 1 - damp;
        p.vy *= 1 - damp;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.save();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (hasMovedRef.current) {
        ctx.globalCompositeOperation = mixBlendMode;
        ctx.globalAlpha = trailOpacity;
        ctx.strokeStyle = colorRef.current;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.filter = blur > 0 ? `blur(${blur}px)` : "none";
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < n; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pointsCount, lineWidth, springStrength, dampening, color, blur, trailOpacity, mixBlendMode]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none fixed inset-0 z-[1]", className)} />;
}
