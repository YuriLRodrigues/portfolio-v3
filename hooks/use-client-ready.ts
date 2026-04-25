"use client";

import { useSyncExternalStore } from "react";

const empty = () => () => {};

/**
 * Hidratação segura: false no SSR, true no cliente (sem setState em effect).
 */
export function useClientReady() {
  return useSyncExternalStore(empty, () => true, () => false);
}
