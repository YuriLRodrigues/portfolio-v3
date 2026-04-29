import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { InitialSplash } from "@/components/intro/initial-splash";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";

import { getSiteUrl } from "@/lib/site-url";
import { ACCENT_STORAGE_KEY, ACCENTS } from "@/lib/theme/accents";

import "./globals.css";

const allowedAccents = ACCENTS.map((a) => a.id);
const accentInitScript = `(function(){try{var k=${JSON.stringify(ACCENT_STORAGE_KEY)};var v=localStorage.getItem(k);var a=${JSON.stringify(allowedAccents)};if(v&&a.indexOf(v)>=0)document.documentElement.setAttribute("data-accent",v);}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const siteName = "Portfólio";
const defaultDescription = "Desenvolvedor fullstack web — portfólio pessoal com projetos, stack e contato.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s | Portfólio" },
  description: defaultDescription,
  applicationName: siteName,
  keywords: ["portfólio", "desenvolvedor frontend", "React", "TypeScript", "Next.js", "desenvolvimento web", "fullstack", "web development", "backend"],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/logo.png",
        alt: "Logo do portfólio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${oswald.variable} h-full antialiased scroll-smooth`}
      data-accent="neutral"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground scroll-smooth" suppressHydrationWarning>
        <Script id="portfolio-accent-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: accentInitScript }} />
        <AppProviders>
          {/* <MouseFollower /> */}
          <InitialSplash />
          <div className="relative z-10 flex min-h-0 min-h-full flex-1 flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
