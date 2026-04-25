import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AsTag = "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4";

type LineShadowTextProps = {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  /** Classes extras na camada de texto (cor, peso). */
  textClassName?: string;
};

/**
 * Sombra em “linha” com animação, usando a cor de destaque e contraste
 * claro/escuro (inspirado em
 * [Magic UI — Line Shadow Text](https://magicui.design/docs/components/line-shadow-text)).
 */
export function LineShadowText({ children, className, as: Tag = "span", textClassName }: LineShadowTextProps) {
  return (
    <Tag className={cn("relative z-0 inline-block", className)} data-line-shadow>
      <span
        className={cn(
          "relative z-[1] inline-block [animation:line-shadow-drift_2.6s_ease-in-out_infinite] motion-reduce:animate-none",
          "text-primary [filter:drop-shadow(var(--ls-off-x)_var(--ls-off-y)_0.02em_color-mix(in_oklch,var(--color-primary)_55%,_var(--foreground)))]",
          "dark:[filter:drop-shadow(var(--ls-off-x)_var(--ls-off-y)_0.04em_color-mix(in_oklch,var(--color-primary)_50%,_var(--background)))]",
          textClassName,
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
