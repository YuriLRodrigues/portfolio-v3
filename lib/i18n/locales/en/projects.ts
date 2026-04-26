export const projects = {
  kicker: "Projects",
  bgWord: "PROJECTS",
  titleBefore: "From",
  titleGradient: "team work",
  titleAfter: "to what I build on the side",
  p: "Ships with a squad, freelance, and side projects in production or open on GitHub.",
  stack: {
    frontend: "Frontend",
    backend: "Backend",
    full: "Full stack",
  },
  openSite: "Open site: {{name}}",
  openRepo: "GitHub repository: {{name}}",
  ctaView: "View project",
  ctaGithub: "GitHub",
  tileAria: "Technologies",
  coverAlt: "Project cover for {{name}}",
  items: {
    deck: {
      name: "Real-time analytics dashboard",
      description: "Aggregated metrics, persistent filters, and export. Low latency and honest loading states for users.",
      period: "2024 — 2025",
    },
    studio: {
      name: "Guided checkout experience",
      description: "Stepped purchase flow with progressive validation, payment gateway, and drop-off telemetry so product can iterate on real data.",
      period: "2023",
    },
    relay: {
      name: "Orchestration & queue API",
      description: "NestJS service with workers, webhook idempotency, and baseline observability: health checks, metrics, and structured logs.",
      period: "2022 — 2023",
    },
  },
} as const;
