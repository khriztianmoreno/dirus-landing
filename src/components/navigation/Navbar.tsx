import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { NavCopy } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type NavbarProps = {
  locale: Locale;
  copy: NavCopy;
  className?: string;
};

export function Navbar({ locale, copy, className }: NavbarProps) {
  const homeHref = `/${locale}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-graphite/40 backdrop-blur-2xl transition-all duration-300 py-4",
        className,
      )}
    >
      <Container>
        <nav
          aria-label="Main Navigation"
          className="flex items-center justify-between"
        >
          {/* Logo Container */}
          <Link
            href={homeHref}
            className="flex items-center gap-3 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
          >
            <span className="font-sans text-xl font-bold tracking-tighter text-white">
              DIRUS
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden items-center gap-10 md:flex">
            <li>
              <a
                href="#architecture"
                className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
              >
                {copy.architecture}
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
              >
                {copy.solutions}
              </a>
            </li>
            <li>
              <a
                href="#reliability"
                className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
              >
                {copy.reliability}
              </a>
            </li>
            <li>
              <a
                href="#company"
                className="font-mono text-label uppercase tracking-widest text-soft-gray transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
              >
                {copy.company}
              </a>
            </li>
          </ul>

          {/* Right Actions: Language Switcher + CTA */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher currentLocale={locale} />
            <div className="hidden md:block">
              <Button variant="primary" as="a" href="#contact">
                {copy.cta}
              </Button>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
