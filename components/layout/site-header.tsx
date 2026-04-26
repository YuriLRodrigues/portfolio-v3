"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { AppearanceMenu } from "@/components/theme/appearance-menu";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_LINKS, SECTION_IDS } from "@/lib/navigation";
import { scrollToAnchorSlow } from "@/lib/smooth-scroll-anchor";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const { t } = useTranslation("common");
  const active = useActiveSection(SECTION_IDS, "home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const onNavClick = useCallback((id: string) => {
    scrollToAnchorSlow(id);
    setMobileOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavClick("home");
            }}
            className="group flex items-center gap-2 tracking-tight"
          >
            <span className="flex h-8 w-8  items-center uppercase justify-center rounded-lg border border-border/60 bg-primary/10 font-mono text-xs font-bold text-primary shadow-sm transition group-hover:shadow-md">
              {t("siteHeader.logoInitials")}
            </span>
            <span className=" text-2xl leading-none text-foreground sm:text-3xl">{t("siteHeader.brand")}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t("siteHeader.mainNav")}>
            {NAV_LINKS.map(({ id, href }) => (
              <a
                key={id}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(id);
                }}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition after:content-['']",
                  active === id && "text-foreground after:scale-x-100",
                )}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <AppearanceMenu />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t("siteHeader.closeMenu") : t("siteHeader.mobileOpenMenu")}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </Container>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[48] md:hidden" id="mobile-nav" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-background/60 backdrop-blur-sm" aria-label={t("siteHeader.closeOverlay")} onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-16 w-[min(100%,20rem)] border-l border-border/40 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
            <p className="mb-1 text-xs font-medium text-muted-foreground">{t("appearance.dialogTitle")}</p>
            <p className="mb-2 text-xs text-muted-foreground">{t("siteHeader.mobileNavHint")}</p>
            <nav className="flex flex-col gap-0.5" aria-label={t("siteHeader.mobileNav")}>
              {NAV_LINKS.map(({ id, href }) => (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(id);
                  }}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium transition",
                    active === id ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {t(`nav.${id}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
