export type ProfessionalEntry = {
  period: string;
  title: string;
  org: string;
  location?: string;
  description: string;
  stack?: string[];
};

export type AcademicEntry = {
  period: string;
  title: string;
  institution: string;
  description: string;
};

export type CertificateEntry = {
  title: string;
  issuer: string;
  issued: string;
  href: string;
  format: string;
  /** Se true, sugere download de PDF; se false, abre credencial em nova aba. */
  download?: boolean;
};

export type TimelineKind = "work" | "study";

export type Entry = {
  period: string;
  title: string;
  subtitle: string;
  meta?: string;
  description: string;
  tags?: string[];
};
