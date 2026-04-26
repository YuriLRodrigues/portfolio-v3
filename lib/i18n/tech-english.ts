import type { PanelMeta, Tech } from "@/components/home/technologies-section/types";

import type { I18nLocale } from "./resources";

type PanelId = PanelMeta["id"];
type TechKey = `${PanelId}::${string}`;

/**
 * English copy for tech taglines and details. Keys: `${panelId}::${tech.name}`.
 * Portuguese text lives in `stack-data.ts`; this map is only applied when `locale === "en"`.
 */
export const TECH_EN: Partial<Record<TechKey, Pick<Tech, "tagline" | "detail">>> = {
  "frontend::React": {
    tagline: "Components & state",
    detail: "Composition, hooks, and boundaries for predictable product UI.",
  },
  "frontend::Next.js": {
    tagline: "App Router & RSC",
    detail: "Streaming, nested layouts, and asset optimization without hacks.",
  },
  "frontend::TypeScript": {
    tagline: "Types end to end",
    detail: "Shared models between client and server—fewer regressions.",
  },
  "frontend::React Testing Library": {
    tagline: "User-centric tests",
    detail: "Queries and flows close to what users see—fewer brittle tests.",
  },
  "frontend::Cypress": {
    tagline: "E2E in the browser",
    detail: "Critical flows with visual feedback and easier debugging on failure.",
  },
  "frontend::Jest": {
    tagline: "Unit & snapshot",
    detail: "Mocks, coverage, and stable CI for confident refactors.",
  },
  "frontend::Storybook": {
    tagline: "UI catalog",
    detail: "Isolated states, design review, and living component docs.",
  },
  "frontend::Tailwind CSS": {
    tagline: "Design in the markup",
    detail: "Tokens, dark mode, and responsive layout with consistent spacing.",
  },
  "frontend::Motion": {
    tagline: "Micro-interactions",
    detail: "Transitions with intentional curves—without janking the main thread.",
  },
  "frontend::I18Next": {
    tagline: "Internationalization",
    detail: "String translation and i18n for product copy.",
  },
  "frontend::Radix UI": {
    tagline: "Accessibility",
    detail: "Headless primitives: focus, keyboard, and ARIA baked in.",
  },
  "frontend::Vite": {
    tagline: "Fast dev server",
    detail: "Snappy HMR and lean builds for SPAs and libraries.",
  },
  "frontend::styled-components": {
    tagline: "CSS-in-JS",
    detail: "Dynamic themes and colocated styles without leaving React.",
  },
  "frontend::Sass": {
    tagline: "CSS with superpowers",
    detail: "Mixins, nesting, and partials when the design system needs more structure.",
  },
  "frontend::Bootstrap": {
    tagline: "Grid & utilities",
    detail: "Prototypes and dashboards with ready-made responsive components.",
  },
  "frontend::JavaScript": {
    tagline: "The web language",
    detail: "ES modules, async/await, and browser APIs without extra layers.",
  },
  "frontend::HTML": {
    tagline: "Semantics & SEO",
    detail: "Solid structure: headings, landmarks, and machine-readable content.",
  },
  "frontend::CSS": {
    tagline: "Layout & motion",
    detail: "Flex, grid, custom properties, and motion at the browser level.",
  },
  "backend::TypeScript": {
    tagline: "Typed contracts",
    detail: "DTOs, generics, and narrowing in handlers—errors before deploy.",
  },
  "backend::Node.js": {
    tagline: "Runtime & tooling",
    detail: "Async I/O and a mature ecosystem for APIs and workers.",
  },
  "backend::Express": {
    tagline: "Minimal HTTP",
    detail: "Lean middleware, clear routes, and freedom to choose the rest.",
  },
  "backend::NestJS": {
    tagline: "Modules & DI",
    detail: "Clear layers, tests, and horizontal scale when traffic grows.",
  },
  "backend::Drizzle": {
    tagline: "Typesafe SQL",
    detail: "TypeScript schema and explicit queries—performance without black magic.",
  },
  "backend::Prisma": {
    tagline: "ORM & migrations",
    detail: "Schema as the source of truth and confident change rollout.",
  },
  "backend::PostgreSQL": {
    tagline: "Relational data",
    detail: "Integrity, indexes, and queries that stand real growth.",
  },
  "backend::Redis": {
    tagline: "Cache & queues",
    detail: "Sessions, rate limits, and light queues to absorb spikes.",
  },
  "backend::JavaScript": {
    tagline: "Classic runtime",
    detail: "CommonJS or ESM in legacy services and tooling still in JS.",
  },
  "backend::Jest": {
    tagline: "Service tests",
    detail: "HTTP/DB mocks, payload snapshots, and fast CI suites.",
  },
  "backend::Supertest": {
    tagline: "HTTP assertions",
    detail: "In-memory app calls—status, headers, body without booting a server.",
  },
  "backend::Swagger": {
    tagline: "OpenAPI & docs",
    detail: "The living contract: client generation and endpoint review with the team.",
  },
  "ferramentas::Git": {
    tagline: "Version control",
    detail: "Short branches, rebase when it makes sense, and readable history.",
  },
  "ferramentas::Docker": {
    tagline: "Environments",
    detail: "Dev/prod parity and slimmer images for faster CI.",
  },
  "ferramentas::pnpm": {
    tagline: "Fast packages",
    detail: "Shared store and deterministic lockfiles in monorepos.",
  },
  "ferramentas::Figma": {
    tagline: "Handoff",
    detail: "Tokens, grids, and components that become code without a broken telephone.",
  },
  "ferramentas::Notion": {
    tagline: "Wiki & specs",
    detail: "PRDs, runbooks, and architecture notes in one searchable place.",
  },
  "ferramentas::Jira": {
    tagline: "Backlog & sprint",
    detail: "Epics, bugs, and flow metrics aligned with product.",
  },
  "ferramentas::ClickUp": {
    tagline: "Tasks & views",
    detail: "Lists, boards, and automations when the project needs flex.",
  },
  "ferramentas::Trello": {
    tagline: "Light kanban",
    detail: "Simple, visible flow for small squads or discovery work.",
  },
  "ferramentas::Postman": {
    tagline: "Collections & envs",
    detail: "Manual smokes, per-env variables, and sharing with the team.",
  },
  "ferramentas::ESLint": {
    tagline: "Quality",
    detail: "Team-aligned rules—style and bugs before merge.",
  },
  "ferramentas::Prettier": {
    tagline: "Formatting",
    detail: "One style in the repo—cleaner diffs and faster reviews.",
  },
  "ferramentas::DataGrip": {
    tagline: "SQL & introspection",
    detail: "Explore schemas, refactor queries, and unified SQL terminal.",
  },
  "ferramentas::Cursor": {
    tagline: "Assisted IDE",
    detail: "Automation with human review: faster without replacing judgment.",
  },
};

export function getTechKey(panelId: PanelId, name: string): TechKey {
  return `${panelId}::${name}` as TechKey;
}

export function withTechLocale(tech: Tech, panelId: PanelId, locale: I18nLocale): Tech {
  if (locale !== "en") {
    return tech;
  }
  const k = getTechKey(panelId, tech.name);
  const en = TECH_EN[k];
  if (!en) {
    return tech;
  }
  return { ...tech, ...en };
}
