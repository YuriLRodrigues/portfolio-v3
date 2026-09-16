import { CONTACT } from "@/components/home/contact-section/contact-data";

import { RESUME_PDF_HREF } from "@/lib/resume";

/**
 * Perguntas que o widget sabe responder. Aqui fica só o que não é texto —
 * ids, ordem e as ações que acompanham cada resposta. Rótulo, palavras-chave
 * e a resposta em si vivem em lib/i18n/locales (namespace `ask`).
 */

export type AskCommandId = "whoami" | "stack" | "now" | "experience" | "projects" | "contact" | "resume" | "availability";

export type AskAction =
  /** Fecha o widget e rola até a seção. */
  | { kind: "scroll"; labelKey: string; sectionId: string }
  /** Abre um link (interno ou externo). */
  | { kind: "link"; labelKey: string; href: string; external?: boolean };

export type AskCommand = {
  id: AskCommandId;
  actions?: readonly AskAction[];
};

export const ASK_COMMANDS: readonly AskCommand[] = [
  { id: "whoami" },
  {
    id: "stack",
    actions: [{ kind: "scroll", labelKey: "goTechnologies", sectionId: "technologies" }],
  },
  {
    id: "now",
    actions: [{ kind: "scroll", labelKey: "goExperience", sectionId: "experience" }],
  },
  {
    id: "experience",
    actions: [{ kind: "scroll", labelKey: "goExperience", sectionId: "experience" }],
  },
  {
    id: "projects",
    actions: [
      { kind: "scroll", labelKey: "goProjects", sectionId: "projects" },
      { kind: "link", labelKey: "github", href: CONTACT.social.github, external: true },
    ],
  },
  {
    id: "contact",
    actions: [
      { kind: "scroll", labelKey: "goContact", sectionId: "contact" },
      { kind: "link", labelKey: "email", href: `mailto:${CONTACT.email}`, external: true },
      { kind: "link", labelKey: "linkedin", href: CONTACT.social.linkedin, external: true },
    ],
  },
  {
    id: "resume",
    actions: [{ kind: "link", labelKey: "resume", href: RESUME_PDF_HREF, external: true }],
  },
  {
    id: "availability",
    actions: [{ kind: "scroll", labelKey: "goContact", sectionId: "contact" }],
  },
] as const;

/** Sem acento, sem caixa alta, sem espaço sobrando — os dois lados da comparação passam por aqui. */
export function normalizeQuery(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
}

export type AskKeywordEntry = {
  id: AskCommandId;
  /** Lista já separada por vírgula, vinda da tradução. */
  keywords: readonly string[];
};

/**
 * Casa a pergunta livre com um comando. Pontua pelo comprimento da palavra-chave
 * encontrada, então "como entro em contato" ganha de um "como" solto.
 */
export function matchCommand(input: string, entries: readonly AskKeywordEntry[]): AskCommandId | null {
  const query = normalizeQuery(input);
  if (query.length < 2) return null;

  const direct = entries.find((entry) => entry.id === query);
  if (direct) return direct.id;

  let best: { id: AskCommandId; score: number } | null = null;

  for (const entry of entries) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const needle = normalizeQuery(keyword);
      if (needle.length >= 3 && query.includes(needle)) {
        score += needle.length;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: entry.id, score };
    }
  }

  return best?.id ?? null;
}
