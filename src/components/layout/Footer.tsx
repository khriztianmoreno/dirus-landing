import Link from "next/link";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Footer({ locale, dictionary }: FooterProps) {
  const { footer } = dictionary.home;
  const homeHref = `/${locale}`;

  return (
    <footer className="bg-graphite border-t border-white/5 relative z-10 py-12 md:py-16">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <Link
            href={homeHref}
            className="font-sans text-xl font-bold tracking-tighter text-white"
          >
            DIRUS
          </Link>
          <span className="font-mono text-xs text-soft-gray/60">
            {footer.tagline}
          </span>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
          {footer.links.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-soft-gray hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="font-mono text-xs text-soft-gray/50 text-center md:text-right">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  );
}
