import type { AcademicEntry, Entry, ProfessionalEntry } from "./journey-types";

export function professionalToEntries(items: ProfessionalEntry[]): Entry[] {
  return items.map((item) => ({
    period: item.period,
    title: item.title,
    subtitle: item.org,
    meta: item.location,
    description: item.description,
    tags: item.stack,
  }));
}

export function academicToEntries(items: AcademicEntry[]): Entry[] {
  return items.map((item) => ({
    period: item.period,
    title: item.title,
    subtitle: item.institution,
    description: item.description,
  }));
}
