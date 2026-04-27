import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { MouseFollower } from "@/components/background/mouse-follower";
import { InitialSplash } from "@/components/intro/initial-splash";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/components/providers/app-providers";

import { ACCENT_STORAGE_KEY, ACCENTS } from "@/lib/theme/accents";

import "./globals.css";

const allowedAccents = ACCENTS.map((a) => a.id);
const accentInitScript = `(function(){try{var k=${JSON.stringify(ACCENT_STORAGE_KEY)};var v=localStorage.getItem(k);var a=${JSON.stringify(allowedAccents)};if(v&&a.indexOf(v)>=0)document.documentElement.setAttribute("data-accent",v);}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Desenvolvedor frontend — portfólio pessoal em construção.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`} data-accent="neutral" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-foreground scroll-smooth">
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
