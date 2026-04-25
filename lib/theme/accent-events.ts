import type { AccentId } from "@/lib/theme/accents";
import { ACCENT_STORAGE_KEY, ACCENTS } from "@/lib/theme/accents";

export const PORTFOLIO_ACCENT_EVENT = "portfolio:accent";

function isValid(id: string | null | undefined): id is AccentId {
  return Boolean(id && ACCENTS.some((a) => a.id === id));
}

/**
 * Sincroniza atributo, armazenamento e notificação (para `useSyncExternalStore`).
 */
export function setPortfolioAccentOnDocument(accent: AccentId) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.accent = accent;
  try {
    window.localStorage.setItem(ACCENT_STORAGE_KEY, accent);
  } catch {
    /* private mode / quota */
  }
  window.dispatchEvent(new Event(PORTFOLIO_ACCENT_EVENT));
}

export function getPortfolioAccentSnapshot(): AccentId {
  if (typeof document === "undefined") return "neutral";
  const fromDom = document.documentElement.dataset.accent;
  if (isValid(fromDom)) return fromDom;
  return "neutral";
}

export function getPortfolioAccentServerSnapshot(): AccentId {
  return "neutral";
}

export function subscribePortfolioAccent(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => onChange();
  window.addEventListener(PORTFOLIO_ACCENT_EVENT, handler);
  return () => {
    window.removeEventListener(PORTFOLIO_ACCENT_EVENT, handler);
  };
}
