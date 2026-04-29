export const technologies = {
  stackWatermark: "STACK",
  sectionKicker: "Tecnologias",
  sectionSubtitle: "O que fui acumulando em estudo, projeto e produção",
  titleLine1: "Da web ao deploy: ",
  titleGradient: "tecnologias que aprendi",
  titleLine2: " e uso hoje",
  p: "Linguagens, runtimes, frameworks e ferramentas que já coloquei em prática — em curso, freela, squad ou código em produção. Uns aparecem em todo sprint, outros ficam no bolso para quando o contexto pede.",
  seeMore: "Ver mais",
  overview: {
    title: "Visão geral",
    sub: "Quantidade na lista e como ela se divide",
    countLabel: "Tecnologias catalogadas",
    barLabel: "Ecossistemas de desenvolvimento",
  },
  pipeline: {
    interface: { label: "Interface", sub: "UI, estado, motion" },
    services: { label: "Serviços", sub: "APIs, dados, cache" },
    runtime: { label: "Runtime", sub: "Node, filas, escala" },
    delivery: { label: "Entrega", sub: "Git, CI, design" },
    footnote: "Da interface ao ambiente — o que já coloquei em produção",
  },
  panels: {
    frontend: {
      title: "Produto & interface",
      kicker: "O que a pessoa vê e sente",
      blurb: "Performance percebida, acessibilidade e consistência visual.",
      watermark: "INTERFACE",
    },
    backend: {
      title: "Sistema & serviços",
      kicker: "O que sustenta o produto",
      blurb: "Contratos estáveis, persistência e resiliência para o produto crescer.",
      watermark: "SERVIÇOS",
    },
    ferramentas: {
      title: "Entrega & qualidade",
      kicker: "Do repo ao ambiente",
      blurb: "Pipeline de trabalho que mantém ritmo sem sacrificar qualidade.",
      watermark: "WORKFLOW",
    },
  },
} as const;
