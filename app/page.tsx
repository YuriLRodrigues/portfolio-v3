import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { HighlightsSection } from "@/components/home/highlights-section";
import { JourneySection } from "@/components/home/journey-section";
import { SectionPlaceholder } from "@/components/home/section-placeholder";
import { TechnologiesSection } from "@/components/home/technologies-section";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <HighlightsSection />
      <SectionPlaceholder
        id="projects"
        kicker="Projetos"
        sectionNumber={4}
        watermark="PROJETOS"
        title="O que você já construiu"
        description="Cards no estilo referências que você gostou (compilação, links, stack) entram depois, com detalhe e visuais."
      />
      <JourneySection />
      <ContactSection />
    </div>
  );
}
