import { cn } from "@/lib/utils";

type InteractiveGridPatternProps = {
  width?: number;
  height?: number;
  /** [colunas, linhas] */
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
  /** Só efeito visual (não ativa cliques na grid). Padrão: true em fundos com conteúdo por cima. */
  pointerless?: boolean;
};

const defaultSquares: [number, number] = [32, 24];

/**
 * Grelha SVG interativa, inspirada no
 * [Magic UI — Interactive Grid Pattern](https://magicui.design/docs/components/interactive-grid-pattern).
 * Usa a cor de destaque e contrastes para light / dark (opacidade alinhada ao que antes era o estado de hover).
 */
export function InteractiveGridPattern({ width = 32, height = 32, squares = defaultSquares, className, squaresClassName, pointerless = true }: InteractiveGridPatternProps) {
  const [cols, rows] = squares;
  const w = cols * width;
  const h = rows * height;
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return { col, row, i };
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", pointerless && "pointer-events-none", className)}
      aria-hidden
    >
      <g>
        {cells.map(({ col, row, i }) => (
          <rect
            key={i}
            x={col * width}
            y={row * height}
            width={width}
            height={height}
            className={cn(
              "transition-all duration-200 [fill:color-mix(in_oklch,var(--color-primary)_20%,_transparent)] [stroke:color-mix(in_oklch,var(--color-primary)_32%,_transparent)]",
              "dark:[fill:color-mix(in_oklch,var(--color-primary)_16%,_transparent)] dark:[stroke:color-mix(in_oklch,var(--color-primary)_22%,_transparent)]",
              squaresClassName,
            )}
            strokeWidth={0.4}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
