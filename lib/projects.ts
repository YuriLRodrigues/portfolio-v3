/**
 * Projetos da seção #projects.
 *
 * Aqui fica só o que não é texto: stack, ano, links de repositório e qual arte
 * de capa usar. Nome, resumo e destaques vivem em lib/i18n/locales (namespace
 * `projects`, chave `items.<id>`) para os dois idiomas.
 *
 * As capas são SVG desenhado em componente (components/home/projects-section/covers),
 * então acompanham o accent escolhido e o tema claro/escuro — não há imagem em public/.
 */

export type ProjectStackRole = "frontend" | "backend" | "full";

/** De onde veio o projeto. Ajuda quem lê a calibrar o que esperar do código. */
export type ProjectKind = "authorial" | "study" | "challenge";

/** `web` e `api` aparecem quando o projeto tem repositório separado por camada. */
export type ProjectRepoKind = "repo" | "web" | "api";

export type ProjectRepo = {
  kind: ProjectRepoKind;
  url: string;
};

export type Project = {
  id: string;
  stack: ProjectStackRole;
  kind: ProjectKind;
  /** Ano ou intervalo, exibido como metadado do card. */
  year: string;
  technologies: readonly string[];
  repos: readonly ProjectRepo[];
};

export const PROJECTS: readonly Project[] = [
  {
    id: "fullstackTemplates",
    stack: "full",
    kind: "authorial",
    year: "2026",
    technologies: [
      "NestJS",
      "Next.js",
      "React",
      "TypeScript",
      "Drizzle",
      "PostgreSQL",
      "PGlite",
      "shadcn/ui",
      "Base UI",
      "Tailwind CSS",
      "Orval",
      "Zod",
      "JWT",
      "Swagger",
      "Vitest",
      "Playwright",
      "ESLint",
      "GitHub Actions",
      "Docker",
      "Claude Code",
    ],
    repos: [
      { kind: "api", url: "https://github.com/YuriLRodrigues/nestjs-drizzle-clean-architecture" },
      { kind: "web", url: "https://github.com/YuriLRodrigues/nextjs-shadcn-orval-template" },
    ],
  },
  {
    id: "workoutTracker",
    stack: "full",
    kind: "authorial",
    year: "2025 — 2026",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Zod",
      "React Hook Form",
      "shadcn/ui",
      "Kubb",
      "MinIO",
      "JWT",
      "Swagger",
      "Nodemailer",
      "Jest",
      "Cypress",
      "Docker",
    ],
    repos: [
      { kind: "web", url: "https://github.com/YuriLRodrigues/workout-tracker" },
      { kind: "api", url: "https://github.com/YuriLRodrigues/workout-tracker-api" },
    ],
  },
  {
    id: "autoCars",
    stack: "full",
    kind: "authorial",
    year: "2024 — 2025",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Zod",
      "React Hook Form",
      "shadcn/ui",
      "Framer Motion",
      "Orval",
      "MinIO",
      "JWT",
      "Swagger",
      "Vitest",
      "Cypress",
      "Docker",
    ],
    repos: [
      { kind: "web", url: "https://github.com/YuriLRodrigues/autocars-frontend" },
      { kind: "api", url: "https://github.com/YuriLRodrigues/autocars-backend" },
    ],
  },
  {
    id: "fincheck",
    stack: "full",
    kind: "study",
    year: "2025",
    technologies: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "React",
      "Vite",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "JWT",
      "bcrypt",
      "Zod",
      "React Hook Form",
      "Docker",
    ],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/fincheck" }],
  },
  {
    id: "documentSignature",
    stack: "full",
    kind: "challenge",
    year: "2025",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "NextAuth.js", "bcrypt", "Zod", "TanStack Query", "React Hook Form", "shadcn/ui", "date-fns"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/document-signature" }],
  },
  {
    id: "cinematecando",
    stack: "frontend",
    kind: "authorial",
    year: "2024 — 2025",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Jotai", "Zod", "React Hook Form", "shadcn/ui", "next-themes"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/cinematecando" }],
  },
  {
    id: "setupProStore",
    stack: "full",
    kind: "study",
    year: "2025",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth.js", "Stripe", "Zod", "React Hook Form", "shadcn/ui"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/setup-pro-store" }],
  },
  {
    id: "fastKing",
    stack: "full",
    kind: "study",
    year: "2025",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Stripe", "Zod", "shadcn/ui"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/fast-king" }],
  },
  {
    id: "marvelTechTest",
    stack: "frontend",
    kind: "challenge",
    year: "2024",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "Framer Motion", "Zod"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/test-frontend-dinheirow" }],
  },
  {
    id: "valorantHub",
    stack: "frontend",
    kind: "authorial",
    year: "2023",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zod", "next-themes"],
    repos: [{ kind: "repo", url: "https://github.com/YuriLRodrigues/valorant" }],
  },
] as const;

export type ProjectId = (typeof PROJECTS)[number]["id"];

/** Ordem dos filtros na UI; `all` primeiro e depois do mais comum para o mais específico. */
export const PROJECT_FILTERS = ["all", "full", "frontend", "backend"] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export function filterProjects(projects: readonly Project[], filter: ProjectFilter) {
  if (filter === "all") return projects;
  return projects.filter((project) => project.stack === filter);
}

/** Esconde filtros sem projeto — a lista muda conforme PROJECTS cresce. */
export function availableFilters(projects: readonly Project[]) {
  return PROJECT_FILTERS.filter((filter) => filterProjects(projects, filter).length > 0);
}
