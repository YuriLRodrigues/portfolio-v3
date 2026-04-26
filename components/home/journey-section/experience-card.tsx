import { cn } from "@/lib/utils";

import type { Entry, TimelineKind } from "./journey-types";

export function ExperienceCard({ period, title, subtitle, meta, description, tags, kind }: Entry & { kind: TimelineKind }) {
  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br p-5 shadow-lg ring-1 ring-inset transition-[border-color,box-shadow,transform] duration-500 sm:p-6",
        "from-card/95 via-card/70 to-background/40 ring-white/[0.06] dark:from-card/60 dark:via-card/45 dark:to-background/25 dark:ring-white/[0.05]",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_24px_60px_-28px_color-mix(in_oklch,var(--color-primary)_35%,_transparent)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl transition-opacity duration-500 group-hover/card:opacity-100",
          kind === "work" ? "bg-primary/[0.14]" : "bg-primary/[0.09]",
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <time className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{period}</time>
      <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">{title}</h3>
      <p className="mt-1 text-sm font-medium text-muted-foreground">
        {subtitle}
        {meta ? (
          <>
            <span className="text-border"> · </span>
            {meta}
          </>
        ) : null}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">{description}</p>
      {tags?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
          {tags.map((t) => (
            <li key={t}>
              <span className="inline-flex rounded-md border border-primary/25 bg-primary/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                {t}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
