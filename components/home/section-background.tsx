import { cn } from "@/lib/utils";

/**
 * Fundo das seções. Duas famílias que se alternam na rolagem:
 *
 * - `mesh`   — malha no accent com grão por cima e vinheta. Fica atrás de
 *              conteúdo denso (texto, listas) sem competir com ele.
 * - `aurora` — cônico desfocado ancorado num canto, grade fina e um fio de luz
 *              na borda inferior. Para as seções de vitrine.
 *
 * `anchor` gira o ponto de origem, então duas seções da mesma família não
 * ficam idênticas. Tudo em `var(--primary)`, então segue o accent e o tema.
 */

export type SectionBackgroundVariant = "mesh" | "aurora";
export type SectionBackgroundAnchor = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

/** Grão fino — tira o aspecto liso do gradiente sem pesar em rede. */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

const MESH_ANCHORS: Record<SectionBackgroundAnchor, string> = {
  topLeft: "8% 12%",
  topRight: "92% 10%",
  bottomLeft: "10% 88%",
  bottomRight: "90% 86%",
};

const MESH_COUNTER: Record<SectionBackgroundAnchor, string> = {
  topLeft: "88% 82%",
  topRight: "12% 84%",
  bottomLeft: "86% 16%",
  bottomRight: "14% 18%",
};

const AURORA_ORIGIN: Record<SectionBackgroundAnchor, string> = {
  topLeft: "from 150deg at 12% -10%",
  topRight: "from 250deg at 88% -8%",
  bottomLeft: "from 30deg at 10% 108%",
  bottomRight: "from 320deg at 90% 106%",
};

type SectionBackgroundProps = {
  variant: SectionBackgroundVariant;
  anchor?: SectionBackgroundAnchor;
  className?: string;
};

export function SectionBackground({ variant, anchor = "topRight", className }: SectionBackgroundProps) {
  if (variant === "mesh") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 62% 70% at ${MESH_ANCHORS[anchor]}, color-mix(in oklch, var(--primary) 20%, transparent), transparent 62%),
              radial-gradient(ellipse 55% 60% at ${MESH_COUNTER[anchor]}, color-mix(in oklch, var(--primary) 12%, transparent), transparent 58%),
              radial-gradient(ellipse 48% 52% at 55% 45%, color-mix(in oklch, var(--foreground) 4%, transparent), transparent 62%)
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.28] mix-blend-soft-light dark:opacity-[0.4]" style={{ backgroundImage: NOISE, backgroundSize: "140px 140px" }} />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_color-mix(in_oklch,var(--background)_70%,_transparent)]" />
      </div>
    );
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -inset-[20%] opacity-90 blur-[70px]"
        style={{
          backgroundImage: `conic-gradient(${AURORA_ORIGIN[anchor]},
            color-mix(in oklch, var(--primary) 26%, transparent),
            transparent 34%,
            color-mix(in oklch, var(--primary) 15%, transparent) 58%,
            transparent 82%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.3]"
        style={{
          backgroundImage: `linear-gradient(color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklch, var(--foreground) 4%, transparent) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, #000 25%, transparent 80%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
    </div>
  );
}
