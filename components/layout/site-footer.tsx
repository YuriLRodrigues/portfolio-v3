import Link from "next/link";

import { Container } from "@/components/ui/container";

import { cn } from "@/lib/utils";

const SITE_LABEL = "Yuri Rodrigues";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative mt-auto border-t border-border/40 bg-gradient-to-b from-background via-muted/[0.15] to-muted/25",
        "dark:border-white/[0.06] dark:from-background dark:via-card/[0.12] dark:to-card/20",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-90" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent dark:via-white/[0.06]" aria-hidden />

      <Container className="relative py-12 sm:py-14">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
          <div className="text-center sm:max-w-md sm:text-left">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">Portfólio</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
              Código, interface e produto com atenção ao detalhe — obrigado por visitar.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <Link
              href="#home"
              className="group flex items-center gap-2 rounded-lg border border-border/50 bg-background/60 px-3 py-2 shadow-sm ring-1 ring-inset ring-white/[0.04] transition hover:border-primary/35 hover:ring-primary/15 dark:bg-card/40 dark:ring-white/[0.05]"
            >
              <span className="grid size-8 place-items-center rounded-md border border-primary/25 bg-primary/10 font-mono text-[10px] font-bold text-primary transition group-hover:bg-primary/15">
                YR
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">{SITE_LABEL}</span>
            </Link>
            <p className="text-center font-mono text-[11px] tabular-nums text-muted-foreground sm:text-right">
              © {year} {SITE_LABEL}. <span className="text-foreground/85">Todos os direitos reservados.</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
