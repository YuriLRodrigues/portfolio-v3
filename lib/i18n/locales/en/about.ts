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
    companies: "Companies served",
  },
  portraitKicker: "Who's talking",
  portraitName: "Yuri Leite Rodrigues",
  portraitRole: "Full stack developer. I write both sides: NestJS on one, Next.js on the other.",
  portraitStatus: "At Agência Molla, remote, since March 2026. Mid-level since July.",
  portraitCta: "Get to know me",
  principlesKicker: "How I work",
  principles: {
    planning: {
      stage: "Planning",
      title: "Business rules before screens",
      text: "Before opening the editor, I learn the campaign mechanics and design the data model: who earns points, when the client's data arrives and what happens if it arrives wrong.",
    },
    building: {
      stage: "Building",
      title: "Start from the template, not from scratch",
      text: "Every new project starts from the agency template, with written patterns, a shared UI package and an API client generated from the contract. Contract changes show up in the build, not in production.",
    },
    ai: {
      stage: "AI in the process",
      title: "The agent follows the same patterns I do",
      text: "I use Claude Code every day, with skills and docs that explain how the project works. The agent speeds things up; review and decisions stay with me.",
    },
    testing: {
      stage: "Delivery",
      title: "Tests where rules touch rewards",
      text: "Scoring, rankings and payouts are tested before going live, and every project ships with documentation of its rules and the routines that run on their own.",
    },
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
