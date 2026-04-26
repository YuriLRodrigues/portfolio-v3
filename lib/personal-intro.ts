/**
 * Dados do “sobre mim” pessoal (foto + bio curta).
 * Coloque a sua foto em `public/me.jpg` (ou altere `photoSrc`).
 */
export const PERSONAL_INTRO = {
  displayName: "Yuri",
  birthYear: 2004,
  cityState: "Conselheiro Lafaiete, MG",
  country: "Brasil",
  timezoneLabel: "Brasília (GMT-3)",
  languages: ["Português", "Inglês (básico)"],
  /** Frases curtas — tom informal, quem você é fora do stack */
  blurbs: [
    "Curto café forte, código legível e conversas sobre evolução pessoal e profissional.",
    "Fora do teclado: música, automóveis, academia e aprender coisas fora da bolha tech.",
  ],
  photoSrc: "/me.jpg",
} as const;

export type PersonalIntro = typeof PERSONAL_INTRO;
