import { Container } from "@/components/ui/container";

type SectionPlaceholderProps = {
  id: string;
  /** Rótulo curto em destaque (cor `primary`), ex.: Sobre, Stack. */
  kicker: string;
  /** Título principal da seção. */
  title: string;
  description: string;
  /** Índice opcional para a linha estilo `NO. 02`. */
  sectionNumber?: number;
  /**
   * Texto gigante de fundo (caps). Se omitido, usa o título em maiúsculas
   * (pode ficar longo — prefira passar um rótulo curto em seções com título extenso).
   */
  watermark?: string;
};

export function SectionPlaceholder({ id, kicker, title, description, sectionNumber, watermark }: SectionPlaceholderProps) {
  const bgText = (watermark ?? title).toUpperCase();

  return (
    <section id={id} className="scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28">
      <Container className="relative">
        <div className="relative z-20 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-[11px]">
          <span className="text-primary">{kicker}</span>
          <span className="text-border" aria-hidden>
            ——
          </span>
          {sectionNumber != null ? <span>NO. {String(sectionNumber).padStart(2, "0")}</span> : null}
        </div>

        <div className="relative mt-8 sm:mt-11">
          <p
            className="pointer-events-none absolute left-0 top-1/2 z-0 max-h-[min(38vh,320px)] w-[calc(100%+2rem)] -translate-y-1/2 select-none overflow-hidden text-ellipsis whitespace-nowrap font-black uppercase leading-none tracking-[-0.05em] text-foreground/[0.06] dark:text-foreground/[0.085] sm:-left-1 sm:w-[calc(100%+3rem)]"
            style={{ fontSize: "clamp(2.75rem, 15vw, 8.5rem)" }}
            aria-hidden
          >
            {bgText}
          </p>

          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 h-px w-14 bg-primary sm:mb-5 sm:w-20" aria-hidden />
            <h2 className="flex flex-wrap items-baseline gap-x-1.5 text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
              <span>{title}</span>
              <span className="inline-block size-1.5 shrink-0 translate-y-[-0.12em] rounded-[1px] bg-primary sm:size-2" aria-hidden />
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base">{description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
