"use client";

import { useSyncExternalStore } from "react";

import {
  getPortfolioAccentServerSnapshot,
  getPortfolioAccentSnapshot,
  subscribePortfolioAccent,
} from "@/lib/theme/accent-events";

export function usePortfolioAccent() {
  return useSyncExternalStore(
    subscribePortfolioAccent,
    getPortfolioAccentSnapshot,
    getPortfolioAccentServerSnapshot,
  );
}
