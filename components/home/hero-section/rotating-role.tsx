"use client";

import { Archivo } from "next/font/google";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LineShadowText } from "@/components/ui/line-shadow-text";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const display = Archivo({ subsets: ["latin"], weight: "900" });

const TYPE_MS = 42;
const HOLD_MS = 2400;
const ROLE_KEYS = ["fullstack", "frontend", "backend"] as const;

/**
 * Título principal: FULL / STACK + linha com digitação, gradiente, Line Shadow Text e saída com blur.
 */
export function RotatingRole() {
  const { t } = useTranslation("hero");
  const [idx, setIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [exiting, setExiting] = useState(false);

  const word = t(`roles.${ROLE_KEYS[idx]}` as "roles.fullstack");

  useEffect(() => {
    if (exiting) {
      return;
    }
    if (len < word.length) {
      const to = window.setTimeout(() => {
        setLen((c) => c + 1);
      }, TYPE_MS);
      return () => window.clearTimeout(to);
    }
    if (len === word.length && len > 0) {
      const t2 = window.setTimeout(() => {
        setExiting(true);
      }, HOLD_MS);
      return () => window.clearTimeout(t2);
    }
    return undefined;
  }, [len, word, exiting, word.length]);

  return (
    <p
      className={cn(
        display.className,
        "w-full min-h-[150px] min-w-0 max-w-full text-balance break-words text-[clamp(1.35rem,4.5vw,2.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] sm:tracking-[-0.04em]",
      )}
    >
      <LineShadowText
        className="block w-full min-w-0 max-w-full min-h-[1.1em]"
        textClassName="block w-full min-w-0 max-w-full break-words [overflow-wrap:anywhere] font-inherit text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl [text-shadow:0_0_1px_rgba(0,0,0,0.12),0_0_28px_color-mix(in_oklch,var(--color-primary)_32%,_transparent)]"
        as="span"
      >
        {exiting ? (
          <motion.span
            key={`out-${idx}`}
            className="block max-w-full break-words will-change-[filter,opacity]"
            initial={{ opacity: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              setIdx((k) => (k + 1) % ROLE_KEYS.length);
              setLen(0);
              setExiting(false);
            }}
          >
            {word}
          </motion.span>
        ) : (
          <motion.span
            key={`type-${idx}`}
            className="block max-w-full break-words will-change-[filter]"
            initial={{ filter: "blur(10px)", opacity: 0.5 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {word.slice(0, len)}
          </motion.span>
        )}
      </LineShadowText>
    </p>
  );
}
