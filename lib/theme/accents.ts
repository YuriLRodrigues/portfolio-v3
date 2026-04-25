export const ACCENTS = [
  { id: "neutral", label: "Neutro", className: "bg-zinc-500" },
  { id: "rose", label: "Rosa", className: "bg-rose-500" },
  { id: "red", label: "Vermelho", className: "bg-red-500" },
  { id: "pink", label: "Pink", className: "bg-pink-500" },
  { id: "fuchsia", label: "Fúcsia", className: "bg-fuchsia-500" },
  { id: "orange", label: "Laranja", className: "bg-orange-500" },
  { id: "amber", label: "Âmbar", className: "bg-amber-500" },
  { id: "yellow", label: "Amarelo", className: "bg-yellow-400" },
  { id: "lime", label: "Lima", className: "bg-lime-500" },
  { id: "emerald", label: "Esmeralda", className: "bg-emerald-500" },
  { id: "teal", label: "Turquesa", className: "bg-teal-500" },
  { id: "cyan", label: "Ciano", className: "bg-cyan-500" },
  { id: "sky", label: "Céu", className: "bg-sky-500" },
  { id: "blue", label: "Azul", className: "bg-blue-500" },
  { id: "indigo", label: "Anil", className: "bg-indigo-500" },
  { id: "violet", label: "Violeta", className: "bg-violet-500" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];

export const ACCENT_STORAGE_KEY = "portfolio-accent";
