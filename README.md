# Portfólio · Yuri Leite Rodrigues

Portfólio pessoal em Next.js 16 (App Router), React 19, Tailwind CSS 4 e i18next (português e inglês).
É um site estático: o `next build` gera a pasta `out/`, publicada no GitHub Pages em
<https://yurilrodrigues.github.io/portfolio-v3/>.

## Rodar local

```bash
pnpm install
pnpm dev
```

Abra <http://localhost:3000>.

## Build estático

```bash
pnpm build
```

O resultado fica em `out/`. Para servir localmente: `npx serve out`.

## Publicação no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` roda a cada push na `main`:

1. instala as dependências com pnpm;
2. faz o build com `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_BASE_PATH` vindos do próprio GitHub Pages;
3. publica a pasta `out/`.

No repositório, em **Settings → Pages**, a origem precisa ser **GitHub Actions**.

- Num repositório `YuriLRodrigues.github.io`, o site fica na raiz: <https://yurilrodrigues.github.io>.
- Em qualquer outro nome, o site fica em `https://yurilrodrigues.github.io/<repositório>` e o workflow passa o
  prefixo sozinho. Arquivos de `public/` referenciados por string passam por `withBasePath` (`lib/base-path.ts`).

## Contato

Sem formulário nem backend: a seção de contato leva direto para e-mail, LinkedIn e o currículo em PDF
(`public/curriculo.pdf`, gerado a partir de `PESSOAL/LINKEDIN/curriculo`).
