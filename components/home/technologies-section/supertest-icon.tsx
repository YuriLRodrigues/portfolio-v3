"use client";

import { TestTube2 } from "lucide-react";

import type { BrandSvg } from "./types";

/** Supertest não tem ícone no Simple Icons — Lucide com a mesma API de `size`. */
export const SupertestIcon: BrandSvg = ({ size = 24, className, ...rest }) => {
  const dim = typeof size === "number" ? size : Number.parseInt(String(size), 10) || 24;
  return <TestTube2 width={dim} height={dim} className={className} strokeWidth={1.65} {...rest} />;
};
