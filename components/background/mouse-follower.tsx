"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { subscribePortfolioAccent } from "@/lib/theme/accent-events";
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
  /** Desfoque gaussiano (px) aplicado à linha — desenhada nítida num buffer e composta com `filter: blur()`. */
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
  pointsCount = 32,
  lineWidth = 1.15,
  springStrength = 0.45,
  dampening = 0.58,
  color,
  blur = 10,
  trailOpacity = 0.32,
  mixBlendMode = "source-over",
}: MouseFollowerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Pt[] | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const colorRef = useRef("#888888");
  const dprRef = useRef(1);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setPortalTarget(document.body);
    });
  }, []);

  useEffect(() => {
    if (!portalTarget) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!bufferRef.current) {
      bufferRef.current = document.createElement("canvas");
    }
    const buffer = bufferRef.current;
    const bufferCtx = buffer.getContext("2d", { alpha: true });
    if (!bufferCtx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blurPx = Math.min(36, Math.max(0, prefersReduced ? 0 : blur));
    const effectiveSpring = prefersReduced ? Math.min(springStrength * 1.35, 0.92) : springStrength;
    const effectiveDamp = prefersReduced ? Math.min(dampening * 1.15, 0.75) : dampening;
    const effectiveTrailOpacity = prefersReduced ? Math.min(trailOpacity + 0.12, 0.5) : trailOpacity;

    const n = Math.max(8, Math.min(96, pointsCount));
    pointsRef.current = Array.from({ length: n }, () => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    const resolveColor = () => {
      if (color) {
        colorRef.current = color;
        return;
      }
      const root = document.documentElement;
      const p = getComputedStyle(root).getPropertyValue("--primary").trim();
      colorRef.current = p || "oklch(0.5 0.2 264)";
    };
    resolveColor();

    let unsubAccent: () => void = () => {};
    let accentObserver: MutationObserver | null = null;
    if (!color) {
      unsubAccent = subscribePortfolioAccent(resolveColor);
      accentObserver = new MutationObserver(resolveColor);
      accentObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-accent"],
      });
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
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
      dprRef.current = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bw = Math.floor(w * dpr);
      const bh = Math.floor(h * dpr);
      canvas.width = bw;
      canvas.height = bh;
      buffer.width = bw;
      buffer.height = bh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const pts = pointsRef.current;
    if (!pts) return;

    const spring = effectiveSpring;
    const damp = effectiveDamp;

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const iw = window.innerWidth;
      const ih = window.innerHeight;
      const dpr = dprRef.current;

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

      bufferCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bufferCtx.clearRect(0, 0, iw, ih);
      if (hasMovedRef.current) {
        bufferCtx.globalCompositeOperation = "source-over";
        bufferCtx.globalAlpha = 1;
        bufferCtx.strokeStyle = colorRef.current;
        bufferCtx.lineCap = "round";
        bufferCtx.lineJoin = "round";
        bufferCtx.lineWidth = lineWidth;
        bufferCtx.filter = "none";
        bufferCtx.shadowBlur = 0;
        bufferCtx.shadowColor = "transparent";
        bufferCtx.beginPath();
        bufferCtx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < n; i++) {
          bufferCtx.lineTo(pts[i].x, pts[i].y);
        }
        bufferCtx.stroke();
      }

      const bw = canvas.width;
      const bh = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, bw, bh);
      if (hasMovedRef.current) {
        ctx.globalCompositeOperation = mixBlendMode;
        ctx.globalAlpha = effectiveTrailOpacity;
        ctx.imageSmoothingEnabled = true;
        ctx.filter = blurPx > 0 ? `blur(${blurPx}px)` : "none";
        ctx.drawImage(buffer, 0, 0);
      }
      ctx.filter = "none";
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubAccent();
      accentObserver?.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [portalTarget, pointsCount, lineWidth, springStrength, dampening, color, blur, trailOpacity, mixBlendMode]);

  if (!portalTarget) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none fixed inset-0", className)}
      style={{
        zIndex: 110,
        width: "100vw",
        height: "100vh",
      }}
    />,
    portalTarget,
  );
}
