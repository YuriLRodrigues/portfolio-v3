"use client";

import type { Ref } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "motion/react";

export type TypingAnimationCursor = "line" | "block" | "underscore";

type TypingAnimationProps = {
  children?: string;
  words?: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";
  startOnView?: boolean;
  /** Com `startOnView`: se `false`, reinicia a digitação sempre que o elemento volta a ficar visível. Default `true`. */
  inViewOnce?: boolean;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: TypingAnimationCursor;
};

const cursorChar: Record<TypingAnimationCursor, string> = {
  line: "▌",
  block: "▮",
  underscore: "_",
};

/**
 * [Magic UI — Typing Animation](https://magicui.design/docs/components/typing-animation)
 */
export function TypingAnimation({
  children = "",
  words,
  className,
  typeSpeed = 100,
  deleteSpeed = 50,
  delay: startDelay = 0,
  pauseDelay = 1800,
  loop = false,
  as: Tag = "span",
  startOnView = true,
  inViewOnce = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
}: TypingAnimationProps) {
  const list = useMemo(() => (words && words.length > 0 ? [...words] : [children].filter((s) => s.length > 0)), [words, children]);
  const listKey = useMemo(() => list.join("\0"), [list]);
  const boxRef = useRef<HTMLElement | null>(null);
  const assignRef: Ref<HTMLElement> = useCallback((el: HTMLElement | null) => {
    boxRef.current = el;
  }, []);
  /** `amount` baixo + área mínima: span vazio `inline` costuma ter largura 0 e nunca entra em view — a digitação não começa. */
  const inView = useInView(boxRef, { once: inViewOnce, margin: "0px 0px -64px 0px", amount: 0.05 });
  const startOk = !startOnView || inView;
  const [go, setGo] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const pauseRef = useRef(false);
  const hasEnded = useRef(false);

  const word = list[wordIndex] ?? "";
  const multiOrLoop = list.length > 1 || loop;

  useEffect(() => {
    hasEnded.current = false;
    pauseRef.current = false;
    const id = window.requestAnimationFrame(() => {
      setCharIndex(0);
      setWordIndex(0);
      setDeleting(false);
      setGo(false);
    });
    return () => window.cancelAnimationFrame(id);
  }, [listKey]);

  useEffect(() => {
    if (inViewOnce || !startOnView || inView) {
      return;
    }
    const id = window.requestAnimationFrame(() => {
      hasEnded.current = false;
      pauseRef.current = false;
      setCharIndex(0);
      setWordIndex(0);
      setDeleting(false);
      setGo(false);
    });
    return () => window.cancelAnimationFrame(id);
  }, [inView, inViewOnce, startOnView]);

  useEffect(() => {
    if (!startOk) {
      return;
    }
    const t = window.setTimeout(() => setGo(true), startDelay);
    return () => window.clearTimeout(t);
  }, [startOk, startDelay, listKey]);

  useEffect(() => {
    if (!go || list.length === 0 || hasEnded.current) {
      return;
    }

    let t: number;

    if (!deleting) {
      if (charIndex < word.length) {
        t = window.setTimeout(() => setCharIndex((c) => c + 1), typeSpeed);
        return () => window.clearTimeout(t);
      }
      if (!multiOrLoop) {
        hasEnded.current = true;
        return;
      }
      if (pauseRef.current) {
        return;
      }
      pauseRef.current = true;
      t = window.setTimeout(() => {
        pauseRef.current = false;
        setDeleting(true);
      }, pauseDelay);
      return () => window.clearTimeout(t);
    }

    if (charIndex > 0) {
      t = window.setTimeout(() => setCharIndex((c) => c - 1), deleteSpeed);
      return () => window.clearTimeout(t);
    }

    if (!loop && wordIndex >= list.length - 1) {
      hasEnded.current = true;
      return;
    }

    const next = window.setTimeout(() => {
      setWordIndex((w) => (w + 1) % list.length);
      setDeleting(false);
    }, 0);
    return () => window.clearTimeout(next);
  }, [go, list, word, wordIndex, charIndex, deleting, typeSpeed, deleteSpeed, pauseDelay, multiOrLoop, loop, list.length]);

  const text = word.slice(0, charIndex);

  const cursor = showCursor ? (
    <span className={cn("inline", cursorStyle === "line" && "font-mono", blinkCursor && "cursor-blink")} aria-hidden>
      {cursorChar[cursorStyle]}
    </span>
  ) : null;

  const mergedClass = cn("inline-block min-h-[1cap] min-w-[0.35em] align-baseline", className);

  switch (Tag) {
    case "span":
      return (
        <span ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </span>
      );
    case "p":
      return (
        <p ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </p>
      );
    case "div":
      return (
        <div ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </div>
      );
    case "h1":
      return (
        <h1 ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </h3>
      );
    case "h4":
      return (
        <h4 ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </h4>
      );
    default:
      return (
        <span ref={assignRef} className={mergedClass}>
          {text}
          {cursor}
        </span>
      );
  }
}
