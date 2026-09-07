"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { NavCopy } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export type NavbarProps = {
  locale: Locale;
  copy: NavCopy;
  /**
   * Optional manual override for scrolled sticky state (useful for Storybook and tests).
   */
  scrolled?: boolean;
  className?: string;
};

export function Navbar({
  locale,
  copy,
  scrolled: scrolledProp,
  className,
}: NavbarProps) {
  const [scrolledState, setScrolledState] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const isScrolled = scrolledProp ?? scrolledState;

  useEffect(() => {
    if (typeof scrolledProp === "boolean") return;

    const handleScroll = () => {
      setScrolledState(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledProp]);

  const homeHref = `/${locale}`;

  return (
    <>
      <header
        data-scrolled={isScrolled}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
          isScrolled
            ? "border-b border-white/10 bg-graphite-raised/90 supports-[backdrop-filter:blur(0)]:bg-graphite/80 py-3.5 shadow-lg shadow-black/40 backdrop-blur-2xl"
            : "border-b border-transparent bg-transparent py-5",
          className,
        )}
      >
        <Container>
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-between"
          >
            {/* Logo Container */}
            <div className="flex items-center gap-3">
              <Link
                href={homeHref}
                className="flex items-center gap-3 rounded-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
              >
                <span className="font-sans text-xl font-bold tracking-tighter text-white">
                  DIRUS
                </span>
              </Link>
              <span className="hidden font-mono text-xs uppercase tracking-wider text-accent-indigo-soft px-2.5 py-0.5 rounded-full border border-accent-indigo-soft/20 bg-accent-indigo/10 sm:inline-block">
                {copy.badge}
              </span>
            </div>

            {/* Navigation Links (Desktop) */}
            <ul className="hidden items-center gap-6 lg:flex">
              <li>
                <a
                  href="#el-problema"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.problem}
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.benefits}
                </a>
              </li>
              <li>
                <a
                  href="#casos-de-uso"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.useCases}
                </a>
              </li>
              <li>
                <a
                  href="#comparativa"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.comparison}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.faq}
                </a>
              </li>
            </ul>

            {/* Right Actions: Language Switcher + CTA (Desktop) & Hamburger Trigger (Mobile) */}
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <LanguageSwitcher currentLocale={locale} />
              </div>
              <div className="hidden md:block">
                <Button variant="primary" as="a" href="#solicitar-demo">
                  {copy.cta}
                </Button>
              </div>

              {/* Hamburger Button (Mobile Only) */}
              <button
                ref={mobileTriggerRef}
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={isMobileMenuOpen ? copy.closeMenu : copy.openMenu}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-soft-gray hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue md:hidden"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
        copy={copy}
        triggerRef={mobileTriggerRef}
      />
    </>
  );
}
