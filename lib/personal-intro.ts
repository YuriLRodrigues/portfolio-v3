/**
 * Dados do “sobre mim” pessoal (foto e fatos fora de tradução imediata).
 * Foto em public/yuri.webp: a mesma do LinkedIn, quadrada (800x800) e com o fundo da própria foto
 * (gerada a partir de PESSOAL/LINKEDIN/imagens/foto.png).
 * Texto do diálogo: namespace intro em lib/i18n.
 */
import { withBasePath } from "@/lib/base-path";

export const PERSONAL_INTRO = {
  displayName: "Yuri",
  birthYear: 2004,
  cityState: "Conselheiro Lafaiete, MG",
  country: "Brasil",
  timezoneLabel: "Brasília (GMT-3)",
  photoSrc: withBasePath("/yuri.webp"),
} as const;

export type PersonalIntro = typeof PERSONAL_INTRO;
