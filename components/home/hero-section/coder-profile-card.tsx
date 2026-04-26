import { cn } from "@/lib/utils";

export type CoderProfileData = {
  name: string;
  role: string;
  seniority: string;
  location: string;
  skills: readonly string[];
};

const DEFAULT_PROFILE: CoderProfileData = {
  name: "Yuri",
  role: "Full-stack Developer",
  seniority: "Pleno",
  location: "Brasil",
  skills: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Drizzle", "Tailwind CSS", "Docker", "Git"],
};

const LINE_COUNT = 14;

type CoderProfileCardProps = {
  data?: CoderProfileData;
  className?: string;
};

/**
 * Janela estilo editor com objeto JS — cores alinhadas a `background`, `card`, `primary`, `muted`, `chart-*`.
 */
export function CoderProfileCard({ data = DEFAULT_PROFILE, className }: CoderProfileCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-xl overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-card via-card to-muted/25 shadow-lg ring-1 ring-foreground/[0.04] dark:from-card dark:via-card/90 dark:to-background/40 dark:ring-white/[0.05] lg:max-w-none",
        className,
      )}
    >
      <div className="flex flex-row">
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-primary/60" />
        <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 to-transparent" />
      </div>

      <div className="flex items-center justify-between border-b border-border/80 bg-muted/40 px-4 py-4 dark:bg-muted/15 lg:px-6">
        <div className="flex flex-row gap-2">
          <div className="size-3 rounded-full bg-destructive/90" aria-hidden />
          <div className="size-3 rounded-full bg-yellow-500/90" aria-hidden />
          <div className="size-3 rounded-full bg-green-500/90" aria-hidden />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">portfolio.ts</span>
      </div>

      <div className="relative overflow-hidden border-t border-border/60 px-4 py-5 lg:px-6 lg:py-7">
        <div className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -right-20 size-56 rounded-full bg-primary/10 blur-3xl" aria-hidden />

        <div className="relative flex gap-0">
          <div className="hidden shrink-0 flex-col items-end pr-3 font-mono text-[11px] leading-relaxed text-muted-foreground/80 md:flex sm:text-xs">
            {Array.from({ length: LINE_COUNT }, (_, i) => (
              <div key={i} className="select-none tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>

          <code className="min-w-0 font-mono text-[11px] leading-relaxed sm:text-xs md:text-sm">
            <div>
              <span className="text-primary">const</span> <span className="text-foreground">coder</span> <span className="text-primary">=</span>{" "}
              <span className="text-muted-foreground">{"{"}</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">name:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{data.name}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">role:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{data.role}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">seniority:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{data.seniority}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">location:</span> <span className="text-muted-foreground">&apos;</span>
              <span className="text-primary">{data.location}</span>
              <span className="text-muted-foreground">&apos;,</span>
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-foreground">skills:</span> <span className="text-muted-foreground">{"["}</span>
            </div>
            <div className="flex flex-wrap pl-8 sm:pl-12">
              {data.skills.map((skill, index) => (
                <span key={skill} className="mr-1">
                  <span className="text-muted-foreground">&apos;</span>
                  <span className="text-primary">{skill}</span>
                  <span className="text-muted-foreground">&apos;</span>
                  {index < data.skills.length - 1 ? <span className="text-muted-foreground">, </span> : null}
                </span>
              ))}
            </div>
            <div className="pl-4 sm:pl-6">
              <span className="text-muted-foreground">{"],"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{"};"}</span>
            </div>
          </code>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 px-4 py-3 font-mono text-[10px] text-muted-foreground sm:text-xs lg:px-6">
        <span>UTF-8</span>
        <span>TypeScript</span>
        <span>Ln {LINE_COUNT}, Col 1</span>
      </div>
    </div>
  );
}
