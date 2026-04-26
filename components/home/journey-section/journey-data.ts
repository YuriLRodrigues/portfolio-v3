import type { AcademicEntry, CertificateEntry, ProfessionalEntry } from "./journey-types";

const PROFESSIONAL_BASE = [
  { id: "p1" as const, stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"] as const },
  { id: "p2" as const, stack: ["React", "Tailwind CSS", "Storybook", "Jest"] as const },
  { id: "p3" as const, stack: ["JavaScript", "WordPress", "Git"] as const },
] as const;

const ACADEMIC_BASE = [{ id: "a1" as const }, { id: "a2" as const }] as const;

const CERTIFICATES_BASE = [
  {
    id: "c1" as const,
    href: "/certificados/certificado-modelo.pdf" as const,
    format: "PDF",
    download: true as const,
  },
  {
    id: "c2" as const,
    href: "https://www.credly.com",
    format: "Online",
    download: false as const,
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
