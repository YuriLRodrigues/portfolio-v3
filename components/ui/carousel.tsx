"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PortfolioCarouselSlide = {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  footer?: ReactNode;
};

type PortfolioCarouselProps = {
  slides: PortfolioCarouselSlide[];
  className?: string;
};

/**
 * Carrossel à largura do pai (ex.: `Container` com `max-w-7xl`), tilt 3D no slide ativo, área de imagem alta e acabamento “premium” (gradiente, glow, painel inferior).
 */
export function PortfolioCarousel({ slides, className }: PortfolioCarouselProps) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  const go = useCallback(
    (dir: -1 | 1) => {
      setCurrent((c) => {
        const n = c + dir;
        if (n < 0) return slides.length - 1;
        if (n >= slides.length) return 0;
        return n;
      });
    },
    [slides.length],
  );

  return (
    <div className={cn("relative w-full", className)} aria-labelledby={`carousel-heading-${id}`}>
      <h2 id={`carousel-heading-${id}`} className="sr-only">
        Projetos em destaque
      </h2>

      {/* Glow de fundo (fora da moldura) */}
      <div className="pointer-events-none absolute -inset-x-6 -top-16 bottom-1/3 z-0 opacity-90 blur-3xl sm:-inset-x-10" aria-hidden>
        <div className="absolute left-1/4 top-0 size-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-primary/[0.12] dark:bg-primary/[0.18]" />
        <div className="absolute bottom-0 right-0 size-[min(100%,28rem)] rounded-full bg-foreground/[0.04] dark:bg-white/[0.06]" />
      </div>

      <div className="relative z-[1] w-full">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl p-[1px] shadow-[0_32px_100px_-40px_rgba(0,0,0,0.45)] sm:rounded-3xl",
            "bg-gradient-to-br from-primary/45 via-primary/[0.12] to-transparent",
            "dark:shadow-[0_36px_120px_-48px_rgba(0,0,0,0.75)]",
          )}
        >
          <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-gradient-to-br from-card/95 via-card/80 to-background/90 ring-1 ring-inset ring-white/[0.06] backdrop-blur-xl dark:from-card/70 dark:via-card/50 dark:to-background/70 dark:ring-white/[0.05] sm:rounded-[calc(1.5rem-1px)]">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_58%)]"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" aria-hidden />

            <div className="relative w-full min-h-[min(46vh,520px)] sm:min-h-[min(50vh,580px)] lg:min-h-[min(54vh,640px)] xl:min-h-[min(56vh,680px)]">
              <div
                className="flex h-full min-h-[inherit] w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <CarouselSlide key={slide.id} slide={slide} index={index} active={index === current} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] mx-auto mt-6 flex max-w-2xl items-center justify-center gap-3 sm:mt-8 sm:gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="grid cursor-pointer size-12 place-items-center rounded-2xl border border-border/55 bg-gradient-to-b from-background/95 to-muted/30 text-foreground shadow-[0_8px_28px_-12px_rgba(0,0,0,0.25)] ring-1 ring-primary/15 transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:scale-105 hover:border-primary/40 hover:from-primary/10 hover:to-primary/5 hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 dark:from-card/90 dark:to-background/40 dark:shadow-black/40"
          aria-label="Projeto anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div
          className="flex items-center gap-2 rounded-2xl border border-border/50 bg-gradient-to-b from-muted/50 to-background/80 px-4 py-2.5 shadow-inner ring-1 ring-inset ring-white/[0.04] dark:from-muted/20 dark:to-card/40 dark:ring-white/[0.05]"
          role="tablist"
          aria-label="Projetos"
        >
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === current}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full cursor-pointer transition-all duration-300 ease-out hover:scale-125",
                i === current
                  ? "w-10 bg-primary shadow-[0_0_18px_color-mix(in_oklch,var(--color-primary)_50%,_transparent)]"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
              aria-label={`Ir para ${s.title}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          className="grid cursor-pointer size-12 place-items-center rounded-2xl border border-border/55 bg-gradient-to-b from-background/95 to-muted/30 text-foreground shadow-[0_8px_28px_-12px_rgba(0,0,0,0.25)] ring-1 ring-primary/15 transition-[border-color,background-color,color,transform,box-shadow] duration-200 hover:scale-105 hover:border-primary/40 hover:from-primary/10 hover:to-primary/5 hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 dark:from-card/90 dark:to-background/40 dark:shadow-black/40"
          aria-label="Projeto seguinte"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

function CarouselSlide({ slide, index, active }: { slide: PortfolioCarouselSlide; index: number; active: boolean }) {
  const slideRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) return;
    const animate = () => {
      const el = slideRef.current;
      if (!el) return;
      el.style.setProperty("--tilt-x", `${xRef.current}px`);
      el.style.setProperty("--tilt-y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [active]);

  const onMove = (e: React.MouseEvent) => {
    if (!active || !slideRef.current) return;
    const r = slideRef.current.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + r.width / 2);
    yRef.current = e.clientY - (r.top + r.height / 2);
  };

  const onLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const hasImage = Boolean(slide.imageSrc?.trim());

  return (
    <div className="[perspective:1600px] [transform-style:preserve-3d] h-full min-h-[inherit] w-full min-w-0 shrink-0 basis-full">
      <div
        ref={slideRef}
        className={cn(
          "relative flex h-full min-h-[inherit] w-full flex-col overflow-hidden transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "z-[2] scale-100 opacity-100" : "z-[1] scale-[0.988] opacity-[0.38]",
        )}
        style={{
          transform: active ? "rotateX(0deg)" : "rotateX(5deg)",
          transformOrigin: "50% 100%",
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div
          className="relative min-h-0 flex-1 overflow-hidden bg-muted/25 dark:bg-muted/10"
          style={
            active
              ? {
                  transform: "translate3d(calc(var(--tilt-x, 0px) / 26), calc(var(--tilt-y, 0px) / 26), 0)",
                }
              : undefined
          }
        >
          {hasImage ? (
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, calc(100vw - 2rem)"
              priority={index === 0}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/[0.08] via-muted/40 to-card/90">
              <span className="font-mono text-[clamp(3.5rem,14vw,7rem)] font-black text-primary/[0.12]" aria-hidden>
                {(slide.title.trim().charAt(0) || "?").toUpperCase()}
              </span>
            </div>
          )}
          {/* Vinheta + brilho no canto */}
          <div
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.28),inset_0_-80px_120px_-40px_rgba(0,0,0,0.35)] dark:shadow-[inset_0_0_120px_rgba(0,0,0,0.45),inset_0_-90px_140px_-50px_rgba(0,0,0,0.5)]"
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
              active ? "from-black/60 via-black/20 to-transparent" : "from-background/85 via-background/45 to-transparent dark:from-background/95",
            )}
            aria-hidden
          />
          <div className="pointer-events-none absolute -right-20 top-0 size-56 rounded-full bg-primary/25 blur-3xl opacity-70 dark:bg-primary/35" aria-hidden />
        </div>

        <div
          className={cn(
            "relative z-[3] border-t border-primary/15 bg-gradient-to-br from-background/92 via-card/55 to-muted/25 px-4 py-5 backdrop-blur-xl dark:border-white/[0.08] dark:from-background/88 dark:via-card/40 dark:to-muted/15 sm:px-7 sm:py-6",
            active ? "opacity-100" : "opacity-75",
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" aria-hidden />
          <h3 className="text-balance font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Projeto {String(index + 1).padStart(2, "0")}</h3>
          <p className="mt-2 text-pretty text-xl font-bold tracking-tight text-foreground sm:text-2xl">{slide.title}</p>
          {slide.subtitle ? <p className="mt-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-sm">{slide.subtitle}</p> : null}
          <div className={cn("mt-4 transition-opacity duration-500", active ? "opacity-100" : "max-h-[5rem] overflow-hidden opacity-55")}>{slide.footer}</div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioCarousel;
