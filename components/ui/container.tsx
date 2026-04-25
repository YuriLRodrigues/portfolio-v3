import * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6", {
  variants: {
    maxWidth: {
      "7xl": "max-w-7xl",
      "8xl": "max-w-8xl",
    },
  },
  defaultVariants: {
    maxWidth: "7xl",
  },
});

export type ContainerProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof containerVariants> & {
    asChild?: boolean;
  };

export function Container({ className, maxWidth, asChild = false, ...props }: ContainerProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(containerVariants({ maxWidth }), className)} {...props} />;
}
