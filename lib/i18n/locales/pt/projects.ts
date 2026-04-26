export const projects = {
  kicker: "Projetos",
  bgWord: "PROJETOS",
  titleBefore: "Do",
  titleGradient: "trabalho em time",
  titleAfter: "ao que fiz por conta",
  p: "Entregas com squad, freela e side projects que estão em produção ou com código aberto no GitHub.",
  stack: {
    frontend: "Frontend",
    backend: "Backend",
    full: "Full stack",
  },
  openSite: "Abrir site: {{name}}",
  openRepo: "Repositório GitHub: {{name}}",
  ctaView: "Ver projeto",
  ctaGithub: "GitHub",
  tileAria: "Tecnologias",
  coverAlt: "Capa do projeto {{name}}",
  items: {
    deck: {
      name: "Painel analítico em tempo real",
      description: "Dashboard com métricas agregadas, filtros persistentes e exportação. Foco em latência baixa e estados de carregamento honestos para o usuário.",
      period: "2024 — 2025",
    },
    studio: {
      name: "Experiência de checkout guiada",
      description: "Fluxo de compra em passos com validação progressiva, integração com gateway e telemetria de abandono para produto iterar em cima de dados reais.",
      period: "2023",
    },
    relay: {
      name: "API de orquestração e filas",
      description: "Serviço NestJS com workers, idempotência em webhooks e observabilidade mínima viável: health checks, métricas e logs estruturados.",
      period: "2022 — 2023",
    },
  },
} as const;
