"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

/**
 * Cursor de duas peças: um ponto que gruda no ponteiro e um anel que chega
 * atrasado, com mola. Ambos usam `var(--primary)`, então seguem o seletor de
 * cor e o tema. Sobre link, botão ou campo o anel cresce e esvazia.
 *
 * Só aparece em ponteiro fino (mouse/trackpad) e fica de fora quando o
 * visitante pede menos movimento — nesses casos o cursor nativo continua.
 */

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], input, textarea, select, summary, label[for], [data-cursor="grow"]';

const FINE = "(pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeToPointer(onChange: () => void) {
  const fine = window.matchMedia(FINE);
  const reduced = window.matchMedia(REDUCED);
  fine.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
  };
}

function getPointerSnapshot() {
  return window.matchMedia(FINE).matches && !window.matchMedia(REDUCED).matches;
}

/** Falso no SSR e na hidratação; o valor real entra no render seguinte. */
function getPointerServerSnapshot() {
  return false;
}

export function CursorCompanion({ className }: { className?: string }) {
  const enabled = useSyncExternalStore(subscribeToPointer, getPointerSnapshot, getPointerServerSnapshot);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let visible = false;
    let frame = 0;

    const setVisible = (next: boolean) => {
      if (visible === next) return;
      visible = next;
      dot.style.opacity = next ? "1" : "0";
      ring.style.opacity = next ? "1" : "0";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      setVisible(true);

      const target = event.target as Element | null;
      const hot = Boolean(target?.closest?.(INTERACTIVE));
      ring.dataset.hot = hot ? "true" : "false";
    };

    const onLeave = () => setVisible(false);
    const onDown = () => {
      ring.dataset.down = "true";
    };
    const onUp = () => {
      ring.dataset.down = "false";
    };

    const tick = () => {
      // Mola simples: o anel persegue o ponteiro, o ponto vai direto.
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <div className={cn("pointer-events-none fixed inset-0 z-[150]", className)} aria-hidden>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-primary opacity-0 shadow-[0_0_12px_color-mix(in_oklch,var(--color-primary)_70%,_transparent)] transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        data-hot="false"
        data-down="false"
        className={cn(
          "absolute top-0 left-0 size-8 rounded-full border border-primary/60 bg-primary/[0.07] opacity-0 backdrop-blur-[1px]",
          "transition-[opacity,width,height,border-color,background-color,border-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "data-[hot=true]:size-14 data-[hot=true]:border-primary/80 data-[hot=true]:bg-primary/[0.12]",
          "data-[down=true]:size-6 data-[down=true]:bg-primary/20",
        )}
      />
    </div>,
    document.body,
  );
}
