import { cn } from "@/lib/utils";

export const fieldClass =
  "peer w-full border-0 border-b border-border/80 bg-transparent px-0 pb-2 pt-6 text-base text-foreground outline-none transition-[border-color] placeholder:text-transparent focus:border-primary focus:ring-0 dark:border-border/60";

export const labelClass = cn(
  "pointer-events-none absolute left-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-200",
  "top-1 text-primary/90",
  "peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground",
  "peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-primary",
  "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:text-primary/90",
);
