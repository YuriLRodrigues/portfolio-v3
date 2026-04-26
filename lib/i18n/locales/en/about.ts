export const about = {
  sectionKicker: "Context",
  sectionSubtitle: "Who I am and how I work",
  titleBefore: "About",
  titleGradient: "who signs",
  titleAfter: "the code here",
  blockquoteStrong: "Solid product",
  blockquoteRest: "starts with architecture that survives change — and",
  blockquoteAccent: "experiences",
  blockquoteEnd: "that don’t break when people actually use them.",
  p1: "I work between well-designed APIs and interfaces that feel fast: performance, accessibility, and the details that add up as the product grows.",
  p2: "I’m a full stack developer and usually go end-to end—from understanding the problem to deploy and what happens in production. I care about clear API contracts, reliable data, and UIs that don’t trade performance or accessibility for visual vanity. I value repository conventions, readable code, and tests that protect real risk areas—not decoration. On a team, I align early with product and design; in code review I prefer to explain the why, not just swap lines for taste.",
  stats: {
    years: "Years in production",
    projects: "Shipped projects",
    coffee: "Coffee per sprint",
  },
  stackKicker: "In focus",
  stackTitle: "Stack I use today",
  stackLive: "live",
  stackCta: "View portfolio projects",
  focus: {
    next: {
      tag: "App",
      detail: "React with App Router, Server Components, streaming, and a production-ready build pipeline.",
    },
    nest: {
      tag: "Backend",
      detail: "Modular Node with DI, clear layers, and support for REST, GraphQL, and WebSockets.",
    },
    drizzle: {
      tag: "Data",
      detail: "TypeScript ORM with explicit SQL, typed schema, and versioned migrations in the repo.",
    },
    pg: {
      tag: "Data",
      detail: "Relational ACID database with strong indexing, JSON/JSONB, CTEs, and a rich extension ecosystem.",
    },
    tailwind: {
      tag: "UI",
      detail: "Utility CSS with JIT: breakpoints, theme via variables, dark mode, and only the CSS you use.",
    },
  },
} as const;
