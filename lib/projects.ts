/**
 * Modelo de projetos da seção #projects. Texto em lib/i18n/locales (namespace projects, chave items).
 * image: public/... ou domínio permitido em next.config.
 */
export type ProjectStackRole = "frontend" | "backend" | "full";

export type Project = {
  id: "deck" | "studio" | "relay";
  stack: ProjectStackRole;
  technologies: readonly string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "deck",
    stack: "full",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://vercel.com",
    repoUrl: "https://github.com/vercel/next.js",
  },
  {
    id: "studio",
    stack: "frontend",
    technologies: ["React", "Vite", "Zustand", "Stripe", "Playwright"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://stripe.com",
    repoUrl: "https://github.com/stripe-samples",
  },
  {
    id: "relay",
    stack: "backend",
    technologies: ["NestJS", "Node.js", "Redis", "PostgreSQL", "OpenAPI"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    liveUrl: "https://nodejs.org",
    repoUrl: "https://github.com/nestjs/nest",
  },
] as const;
