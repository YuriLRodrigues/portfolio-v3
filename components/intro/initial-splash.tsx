"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { PortfolioLoadingView } from "@/components/intro/portfolio-loading-view";

import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "portfolio-intro-splash";

/**
 * Apresentação inicial (uma vez por sessão): logo YR + riscos; encerra sozinha ou por "Pular".
 */
export function InitialSplash() {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(false);
  const autoHideRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (autoHideRef.current !== null) {
      window.clearTimeout(autoHideRef.current);
      autoHideRef.current = null;
    }
    setShow(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.classList.remove("overflow-hidden");
    document.documentElement.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    let frame = 0;
    const clearAutoHide = () => {
      if (autoHideRef.current !== null) {
        window.clearTimeout(autoHideRef.current);
        autoHideRef.current = null;
      }
    };

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        return;
      }
    } catch {
      /* ignore */
    }

    frame = requestAnimationFrame(() => {
      setShow(true);
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
      autoHideRef.current = window.setTimeout(() => {
        autoHideRef.current = null;
        dismiss();
      }, 2600);
    });
    return () => {
      cancelAnimationFrame(frame);
      clearAutoHide();
    };
  }, [dismiss]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.classList.remove("overflow-hidden");
        document.documentElement.classList.remove("overflow-hidden");
      }}
    >
      {show ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <PortfolioLoadingView />
          <div className="pointer-events-auto absolute bottom-8 left-0 right-0 z-[1] flex justify-center">
            <button
              type="button"
              onClick={dismiss}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 transition hover:text-foreground"
            >
              {t("splash.skip")}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
