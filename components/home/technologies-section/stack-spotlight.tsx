"use client";

import type { MouseEvent, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function StackSpotlight({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const reduceMotion = usePrefersReducedMotion();

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !wrapRef.current) return;
      const r = wrapRef.current.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    },
    [reduceMotion],
  );

  return (
    <div ref={wrapRef} className="relative mt-12 sm:mt-14" onMouseMove={onMove} onMouseLeave={() => setPos({ x: 50, y: 45 })}>
      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 -z-0 rounded-[2rem] opacity-75 transition-opacity duration-500 dark:opacity-55"
          style={{
            background: `radial-gradient(72% 58% at ${pos.x}% ${pos.y}%, color-mix(in oklch, var(--primary) 15%, transparent), transparent 58%)`,
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
