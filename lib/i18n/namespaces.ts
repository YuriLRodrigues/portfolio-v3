/**
 * All translation namespaces. Add a new name here, then add matching
 * `locales/{locale}/{name}.ts` files and the same keys in each language.
 */
export const I18N_NAMESPACES = ["common", "hero", "about", "technologies", "highlights", "projects", "journey", "contact", "intro"] as const;

export type I18nNamespace = (typeof I18N_NAMESPACES)[number];
