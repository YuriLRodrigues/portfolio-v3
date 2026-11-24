/**
 * Prefixo de caminho do site publicado.
 *
 * No GitHub Pages de usuário (yurilrodrigues.github.io) o site fica na raiz e o prefixo é vazio. Num repositório de
 * projeto (yurilrodrigues.github.io/portfolio-v3) o workflow passa NEXT_PUBLIC_BASE_PATH="/portfolio-v3".
 * O Next já aplica o basePath em <Link>, scripts e CSS; arquivos de public/ referenciados por string
 * (PDF, retrato, certificados) precisam passar por withBasePath.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
