This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Formulário de contato

O envio usa [Resend](https://resend.com), que tem plano gratuito de 3.000 e-mails por mês
(100 por dia) — o suficiente com folga para um portfólio.

1. Copie `.env.example` para `.env.local`.
2. Crie a conta no Resend e gere uma API key em **API Keys**.
3. Preencha `RESEND_API_KEY` e `CONTACT_NOTIFY_EMAIL` (onde você quer receber).
4. `CONTACT_FROM_EMAIL` é opcional. Sem domínio verificado, deixe comentado: o envio
   sai de `onboarding@resend.dev`, que já funciona no plano gratuito. Com domínio próprio
   verificado no Resend, use um remetente do seu domínio para não cair em spam.

Em produção (Vercel), as mesmas variáveis vão em **Settings → Environment Variables**.

Sem as variáveis o site continua no ar: a rota `app/api/contact` responde 503 e o
formulário mostra o aviso de "envio ainda não configurado", com o e-mail direto ao lado
como alternativa.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
