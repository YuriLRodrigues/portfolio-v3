"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy: a seção ativa é a última (na ordem da página) cujo topo já passou
 * da linha de ativação abaixo do header — comportamento estável com sticky nav.
 */
export function useActiveSection(sectionIds: readonly string[], fallback: string = sectionIds[0] ?? "home") {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    /** Linha abaixo do header (h-16 = 4rem) + pequena folga */
    const activationY = () => {
      const header = document.querySelector("header");
      const h = header?.getBoundingClientRect().height ?? 64;
      return Math.min(h + 24, 120);
    };

    const compute = () => {
      const doc = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const nearDocumentEnd = scrollBottom >= doc.scrollHeight - 48;

      let current = fallback;

      if (nearDocumentEnd) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          if (document.getElementById(id)) {
            current = id;
            break;
          }
        }
      } else {
        const y = activationY();
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= y) {
            current = id;
          }
        }
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    compute();

    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute, { passive: true });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(compute) : null;
    const header = document.querySelector("header");
    if (ro && header) ro.observe(header);

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      ro?.disconnect();
    };
  }, [sectionIds, fallback]);

  return active;
}
