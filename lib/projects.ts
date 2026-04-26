/**
 * Modelo de projetos da secção `#projects`.
 * `image`: uma única URL (`public/...` ou domínio permitido em `next.config`).
 */
export type ProjectStackRole = "frontend" | "backend" | "full";

export type Project = {
  id: string;
  name: string;
  description: string;
  period: string;
  stack: ProjectStackRole;
  technologies: readonly string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "deck",
    name: "Painel analítico em tempo real",
    description: "Dashboard com métricas agregadas, filtros persistentes e exportação. Foco em latência baixa e estados de carregamento honestos para o utilizador.",
    period: "2024 — 2025",
    stack: "full",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://vercel.com",
    repoUrl: "https://github.com/vercel/next.js",
  },
  {
    id: "studio",
    name: "Experiência de checkout guiada",
    description: "Fluxo de compra em passos com validação progressiva, integração com gateway e telemetria de abandono para produto iterar em cima de dados reais.",
    period: "2023",
    stack: "frontend",
    technologies: ["React", "Vite", "Zustand", "Stripe", "Playwright"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://stripe.com",
    repoUrl: "https://github.com/stripe-samples",
  },
  {
    id: "relay",
    name: "API de orquestração e filas",
    description: "Serviço NestJS com workers, idempotência em webhooks e observabilidade mínima viável: health checks, métricas e logs estruturados.",
    period: "2022 — 2023",
    stack: "backend",
    technologies: ["NestJS", "Node.js", "Redis", "PostgreSQL", "OpenAPI"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://nodejs.org",
    repoUrl: "https://github.com/nestjs/nest",
  },
] as const;

export const STACK_LABEL: Record<ProjectStackRole, string> = {
  frontend: "Frontend",
  backend: "Backend",
  full: "Full stack",
};
