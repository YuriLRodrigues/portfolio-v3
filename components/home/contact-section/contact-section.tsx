import { Container } from "@/components/ui/container";

import { SectionBackground } from "../section-background";
import { ContactEditorialColumn } from "./contact-editorial-column";
import { ContactFormCard } from "./contact-form-card";

/**
 * Contato — layout editorial + cartão de formulário (UI apenas; envio real num passo seguinte).
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-b border-border/30 bg-background py-20 sm:py-28 lg:py-32" aria-labelledby="contact-heading">
      <SectionBackground variant="aurora" anchor="bottomLeft" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16 xl:gap-20">
          <ContactEditorialColumn />
          <ContactFormCard />
        </div>
      </Container>
    </section>
  );
}
