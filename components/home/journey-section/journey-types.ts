export type ProfessionalEntry = {
  period: string;
  title: string;
  org: string;
  /** Optional second segment (e.g. Autônomo) with a primary-colored · before and after. */
  orgSecondary?: string;
  /** City/region (e.g. São Paulo, SP). Shown before a primary-colored · and {@link locationMode}. */
  locationPlace: string;
  /** Work arrangement label (e.g. Remoto). */
  locationMode: string;
  description: string;
  stack?: string[];
  /** Company website, linked from the org name. */
  site?: string;
};

export type AcademicEntry = {
  period: string;
  title: string;
  institution: string;
  description: string;
  stack?: string[];
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
  /** When set, the subtitle links to this URL (company website, new tab). */
  subtitleHref?: string;
  /** Shown after subtitle with · (e.g. employment type). */
  subtitleSecondary?: string;
  /** @deprecated Prefer metaPlace + metaMode for work entries. */
  meta?: string;
  metaPlace?: string;
  metaMode?: string;
  description: string;
  tags?: string[];
};
