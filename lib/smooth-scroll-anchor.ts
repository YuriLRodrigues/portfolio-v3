const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

let rafId = 0;

/**
 * Scroll animado até à âncora (#id), mais lento que o `scroll-behavior: smooth` nativo.
 * Respeita `prefers-reduced-motion` (salto instantâneo).
 */
export function scrollToAnchorSlow(id: string, durationMs: number = 1150): void {
  const el = document.getElementById(id);
  if (!el) return;

  cancelAnimationFrame(rafId);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("header");
  const headerH = header?.getBoundingClientRect().height ?? 64;
  const gap = 10;
  const offset = headerH + gap;

  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetY);
    return;
  }

  if (reduce) {
    window.scrollTo(0, targetY);
    return;
  }

  const start = performance.now();
  const prevHtml = document.documentElement.style.scrollBehavior;
  const prevBody = document.body.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    const y = startY + distance * easeOutCubic(t);
    window.scrollTo(0, y);
    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      document.documentElement.style.scrollBehavior = prevHtml;
      document.body.style.scrollBehavior = prevBody;
    }
  };

  rafId = requestAnimationFrame(step);
}
