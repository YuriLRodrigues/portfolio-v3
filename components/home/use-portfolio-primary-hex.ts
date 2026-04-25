"use client";

import { useLayoutEffect, useState } from "react";

import { Color } from "three";

const FALLBACK = "#a3e635";

/**
 * Lê `color` em `--color-primary` (OKLCH/RGB) para materiais three.js.
 */
export function usePortfolioPrimaryHex(): string {
  const [hex, setHex] = useState(FALLBACK);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const read = () => {
      const raw = getComputedStyle(root).getPropertyValue("--color-primary").trim();
      if (!raw) {
        setHex(FALLBACK);
        return;
      }
      try {
        const c = new Color();
        c.setStyle(raw);
        setHex(`#${c.getHexString()}`);
      } catch {
        setHex(FALLBACK);
      }
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["data-accent", "class", "style"] });
    return () => obs.disconnect();
  }, []);

  return hex;
}
