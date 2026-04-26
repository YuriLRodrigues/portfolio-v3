import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { HighlightsSection } from "@/components/home/highlights-section";
import { JourneySection } from "@/components/home/journey-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { TechnologiesSection } from "@/components/home/technologies-section";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <TechnologiesSection />
      <HighlightsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </div>
  );
}
