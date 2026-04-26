import type { ComponentType, SVGProps } from "react";

import type { LucideIcon } from "lucide-react";

export type BrandSvg = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export type Tech = {
  name: string;
  tagline: string;
  detail: string;
  Icon: BrandSvg;
  badge?: string;
};

export type PanelMeta = {
  id: "frontend" | "backend" | "ferramentas";
  title: string;
  kicker: string;
  blurb: string;
  items: readonly Tech[];
  icon: LucideIcon;
  span: string;
  accent: string;
  watermark: string;
  rail: string;
  panelRing: string;
};
