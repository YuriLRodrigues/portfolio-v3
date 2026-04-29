export type NavId = "home" | "about" | "technologies" | "highlights" | "projects" | "experience" | "contact";

export const SECTION_IDS: NavId[] = ["home", "about", "experience", "technologies", "highlights", "projects", "contact"];

export const NAV_LINKS: { id: NavId; href: string }[] = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "technologies", href: "#technologies" },
  { id: "highlights", href: "#highlights" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
];
