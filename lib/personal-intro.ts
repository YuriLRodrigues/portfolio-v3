/**
 * Dados do “sobre mim” pessoal (foto e fatos fora de tradução imediata).
 * Foto em public/yuri.webp — recorte com fundo transparente (701x992).
 * O fundo do retrato vem do tema, em PhotoBlock; a imagem só carrega o sujeito.
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
