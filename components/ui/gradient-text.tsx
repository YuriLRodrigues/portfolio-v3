import * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

/** Texto com gradiente (tokens `primary` / `foreground`). `asChild` funde classes no filho único via Radix Slot. */
const gradientTextVariants = cva("inline bg-clip-text text-transparent", {
  variants: {
    variant: {
      primary: "bg-gradient-to-r from-primary via-primary to-foreground/80",
      primaryHero: "bg-gradient-to-r from-primary via-primary to-foreground/85",
      primarySoft: "bg-gradient-to-r from-primary via-primary to-foreground/72",
      primaryBalanced: "bg-gradient-to-r from-primary via-primary to-foreground/75",
      surface: "bg-gradient-to-br from-foreground via-foreground to-foreground/65",
      accentEnd: "bg-gradient-to-r from-primary via-primary to-primary/70",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type GradientTextProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof gradientTextVariants> & {
    asChild?: boolean;
  };

export function GradientText({ className, variant, asChild = false, ...props }: GradientTextProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn(gradientTextVariants({ variant }), className)} {...props} />;
}
