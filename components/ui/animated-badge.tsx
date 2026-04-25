"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type AnimatedBadgeProps = {
  text: string;
  /** Cor do destaque (hex ou CSS). Sem definir, usa a cor de destaque do tema (`--color-primary`). */
  color?: string;
  href?: string;
  className?: string;
};

const dot = "relative flex h-2.5 w-2.5 shrink-0" as const;
const ring = "absolute inset-0 inline-flex animate-ping rounded-full opacity-60" as const;
const center = "relative inline-flex h-2.5 w-2.5 rounded-full" as const;

/**
 * Badge com ponto a pulsar e entrada suave, inspirado no
 * [Eldora UI — Animated Badge](https://www.eldoraui.site/docs/components/animated-badge).
 */
export function AnimatedBadge({ text, color, href, className }: AnimatedBadgeProps) {
  const tone = color ?? "var(--color-primary)";
  const pillStyle = color
    ? {
        color: tone,
        borderColor: `color-mix(in srgb, ${tone} 45%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${tone} 10%, var(--color-background, white))`,
        boxShadow: `0 0 24px color-mix(in srgb, ${tone} 30%, transparent)`,
      }
    : undefined;

  const content: ReactNode = (
    <>
      <span className={dot}>
        <span className={cn(ring, !color && "bg-primary/60")} style={color ? { backgroundColor: tone } : undefined} />
        <span
          className={cn(center, !color && "bg-primary shadow-[0_0_8px_1px_rgba(0,0,0,0.08)] dark:shadow-[0_0_8px_1px_rgba(255,255,255,0.12)]")}
          style={color ? { backgroundColor: tone } : undefined}
        />
      </span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">{text}</span>
    </>
  );

  const shellClass = cn(
    "inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border px-3 py-1.5",
    "backdrop-blur-sm transition-colors",
    !color && "border-primary/50 bg-zinc-950/85 text-primary shadow-[0_0_24px_color-mix(in_oklch,var(--color-primary)_30%,_transparent)] dark:bg-zinc-950/80",
    className,
  );

  const inner = href ? (
    <Link href={href} className={cn(shellClass, "hover:border-primary/70 hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-ring/60")} style={pillStyle}>
      {content}
    </Link>
  ) : (
    <span className={shellClass} style={pillStyle}>
      {content}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block w-fit max-w-full"
    >
      {inner}
    </motion.div>
  );
}
