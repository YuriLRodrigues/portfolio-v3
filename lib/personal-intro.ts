/**
 * Dados do “sobre mim” pessoal (foto e fatos fora de tradução imediata).
 * Coloque sua foto em public/me.jpg (ou altere photoSrc).
 * Texto do diálogo: namespace intro em lib/i18n.
 */
export const PERSONAL_INTRO = {
  displayName: "Yuri",
  birthYear: 2004,
  cityState: "Conselheiro Lafaiete, MG",
  country: "Brasil",
  timezoneLabel: "Brasília (GMT-3)",
  photoSrc: "/me.jpg",
} as const;

export type PersonalIntro = typeof PERSONAL_INTRO;
