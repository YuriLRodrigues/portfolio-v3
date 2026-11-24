import type { NextConfig } from "next";

/**
 * Site estático para o GitHub Pages (`next build` gera a pasta out/).
 * NEXT_PUBLIC_BASE_PATH vem do workflow quando o site não fica na raiz do domínio; veja lib/base-path.ts.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    // Sem servidor de imagens no Pages: as imagens saem como estão em public/.
    unoptimized: true,
  },
};

export default nextConfig;
