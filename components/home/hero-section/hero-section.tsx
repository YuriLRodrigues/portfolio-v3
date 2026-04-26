"use client";

import { Archivo } from "next/font/google";

import { Container } from "@/components/ui/container";

import { cn } from "@/lib/utils";

import { HeroBackground } from "./hero-background";
import { HeroIntroColumn } from "./hero-intro-column";
import { HeroProfileColumn } from "./hero-profile-column";

const heroDisplay = Archivo({ subsets: ["latin"], weight: "900" });

/**
 * Hero em duas colunas: saudação, título FULL / STACK / rotação e cartão “coder” à direita.
 */
export function HeroSection() {
  return (
    <section id="home" className="group/hero relative z-[1] scroll-mt-20 overflow-hidden border-b border-border/30">
      <HeroBackground />
      <Container
        className={cn(heroDisplay.className, "relative z-10 grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 sm:gap-12 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14")}
      >
        <HeroIntroColumn />
        <HeroProfileColumn />
      </Container>
    </section>
  );
}
