import { Container } from "@/components/ui/container";

import { ContactEditorialColumn } from "./contact-editorial-column";
import { ContactFormCard } from "./contact-form-card";

/**
 * Contato — layout editorial + cartão de formulário (UI apenas; envio real num passo seguinte).
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/30 py-20 sm:py-28 lg:py-32"
      aria-labelledby="contact-heading"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 70% at 10% 20%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 55%),
          radial-gradient(ellipse 70% 50% at 90% 80%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 50%),
          radial-gradient(ellipse 50% 40% at 50% 100%, color-mix(in oklch, var(--foreground) 4%, transparent), transparent 45%)
        `,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.22]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -18deg,
              transparent,
              transparent 48px,
              color-mix(in oklch, var(--foreground) 2.5%, transparent) 48px,
              color-mix(in oklch, var(--foreground) 2.5%, transparent) 49px
            )`,
          }}
        />
        <svg className="absolute inset-0 size-full mix-blend-overlay opacity-[0.12] dark:opacity-[0.18]" aria-hidden>
          <filter id="contact-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contact-noise)" opacity="0.45" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16 xl:gap-20">
          <ContactEditorialColumn />
          <ContactFormCard />
        </div>
      </Container>
    </section>
  );
}
