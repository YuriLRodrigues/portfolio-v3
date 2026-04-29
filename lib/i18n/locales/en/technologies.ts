export const technologies = {
  stackWatermark: "STACK",
  sectionKicker: "Technologies",
  sectionSubtitle: "What I’ve built up through study, projects, and production",
  titleLine1: "From the web to deploy: ",
  titleGradient: "technologies I’ve learned",
  titleLine2: " and use today",
  p: "Languages, runtimes, frameworks, and tools I’ve actually shipped—in courses, freelance, squads, or production. Some are in every sprint; others I keep in my pocket for the right context.",
  seeMore: "Show more",
  overview: {
    title: "Overview",
    sub: "List size and how it breaks down",
    countLabel: "Catalogued technologies",
    barLabel: "Development ecosystems",
  },
  pipeline: {
    interface: { label: "Interface", sub: "UI, state, motion" },
    services: { label: "Services", sub: "APIs, data, cache" },
    runtime: { label: "Runtime", sub: "Node, queues, scale" },
    delivery: { label: "Delivery", sub: "Git, CI, design" },
    footnote: "From interface to environment—what I’ve run in production",
  },
  panels: {
    frontend: {
      title: "Product & interface",
      kicker: "What people see and feel",
      blurb: "Perceived performance, accessibility, and visual consistency.",
      watermark: "INTERFACE",
    },
    backend: {
      title: "System & services",
      kicker: "What keeps the product standing",
      blurb: "Stable contracts, persistence, and resilience as the product grows.",
      watermark: "SERVICES",
    },
    ferramentas: {
      title: "Delivery & quality",
      kicker: "From repo to environment",
      blurb: "A workflow that keeps pace without trading away quality.",
      watermark: "WORKFLOW",
    },
  },
} as const;
