export type NavId = "home" | "about" | "technologies" | "highlights" | "projects" | "experience" | "contact";

export const SECTION_IDS: NavId[] = ["home", "about", "technologies", "highlights", "projects", "experience", "contact"];

export const NAV_LINKS: { id: NavId; label: string; href: string }[] = [
  { id: "home", label: "Início", href: "#home" },
  { id: "about", label: "Sobre", href: "#about" },
  { id: "technologies", label: "Tecnologias", href: "#technologies" },
  { id: "highlights", label: "Diferenciais", href: "#highlights" },
  { id: "projects", label: "Projetos", href: "#projects" },
  { id: "experience", label: "Experiência", href: "#experience" },
  { id: "contact", label: "Contato", href: "#contact" },
];
