import { withBasePath } from "@/lib/base-path";

import type { AcademicEntry, CertificateEntry, ProfessionalEntry } from "./journey-types";

function publicCertPdf(filename: string) {
  return withBasePath(`/certificados/${encodeURIComponent(filename)}`);
}

/** Molla (2024–2025): core stack first, then data layer, state, API contract, tests, infra, integrations. */
const MOLLA_STACK_PREVIOUS = [
  "TypeScript",
  "Next.js",
  "React",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "React Query",
  "Zustand",
  "Swagger",
  "React Testing Library",
  "Jest",
  "Cypress",
  "Docker",
  "Amazon S3",
  "SendGrid",
] as const;

/** Molla (return): Drizzle + Redis + Infisical added; same ordering principle. */
const MOLLA_STACK_RETURN = [
  "TypeScript",
  "Next.js",
  "React",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Drizzle",
  "Redis",
  "React Query",
  "Zustand",
  "Infisical",
  "Swagger",
  "React Testing Library",
  "Jest",
  "Cypress",
  "Docker",
  "Amazon S3",
  "SendGrid",
] as const;

/** Molla (pleno): monorepo, SSO, filas e a camada visual da LP entram na lista. */
const MOLLA_STACK_MID = [
  "TypeScript",
  "Next.js",
  "React",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Drizzle",
  "Redis",
  "BullMQ",
  "Turborepo",
  "OpenID Connect",
  "TanStack Query",
  "Orval",
  "Tailwind CSS",
  "shadcn/ui",
  "GSAP",
  "three.js",
  "Vitest",
  "Playwright",
  "Docker",
  "Amazon S3",
  "Claude Code",
] as const;

/** Sites das empresas, também linkados no currículo. */
const SITE = {
  molla: "https://www.agenciamolla.com.br/",
  pokernetic: "https://pokernetic.com/",
  dinheirow: "https://www.dinheirow.com.br/",
} as const;

const PROFESSIONAL_BASE = [
  { id: "p0" as const, site: SITE.molla, stack: MOLLA_STACK_MID },
  { id: "p1" as const, site: SITE.molla, stack: MOLLA_STACK_RETURN },
  {
    id: "p2" as const,
    site: SITE.pokernetic,
    stack: ["TypeScript", "Next.js", "React", "NestJS", "Node.js", "PostgreSQL", "Amazon S3", "React Query", "Tailwind CSS", "i18n"] as const,
  },
  { id: "p3" as const, site: SITE.molla, stack: MOLLA_STACK_PREVIOUS },
  {
    id: "p4" as const,
    site: SITE.dinheirow,
    stack: ["TypeScript", "Next.js", "React", "React Query", "Tailwind CSS", "Storybook", "Zustand", "React Testing Library", "Jest", "Cypress"] as const,
  },
] as const;

const ACADEMIC_BASE = [
  { id: "a1" as const, stack: ["Node.js", "NestJS", "React", "React Native", "Prisma", "Zod", "Docker", "AWS"] as const },
  { id: "a3" as const, stack: ["NestJS", "TypeScript"] as const },
  {
    id: "a4" as const,
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Sequelize", "Sass", "Git"] as const,
  },
  { id: "a5" as const, stack: ["Python", "Power BI"] as const },
] as const;

const CERTIFICATES_BASE = [
  {
    id: "c1" as const,
    href: publicCertPdf("Certificado Desenvolvedor Fullstack.pdf"),
    format: "PDF",
    download: true as const,
  },
  {
    id: "c2" as const,
    href: publicCertPdf("Testes Automatizados.pdf"),
    format: "PDF",
    download: true as const,
  },
  {
    id: "c3" as const,
    href: publicCertPdf("Javascript do Básico ao Avançado.pdf"),
    format: "PDF",
    download: true as const,
  },
] as const;

export type ProfessionalId = (typeof PROFESSIONAL_BASE)[number]["id"];
export type AcademicId = (typeof ACADEMIC_BASE)[number]["id"];
export type CertificateId = (typeof CERTIFICATES_BASE)[number]["id"];

/**
 * Ids and stacks; copy lives in lib/i18n/locales (journey) and is merged in useJourneyEntries.
 */
export const JOURNEY_PROFESSIONAL = PROFESSIONAL_BASE;
export const JOURNEY_ACADEMIC = ACADEMIC_BASE;
export const JOURNEY_CERTIFICATES = CERTIFICATES_BASE;

export type { AcademicEntry, CertificateEntry, ProfessionalEntry };
