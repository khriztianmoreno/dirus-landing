import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export type LanguageSwitcherProps = {
  currentLocale: Locale;
  className?: string;
};

export function LanguageSwitcher({
  currentLocale,
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-label uppercase tracking-widest text-soft-gray border-r border-white/10 pr-6",
        className,
      )}
    >
      <Link
        href="/es"
        className={cn(
          "transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm",
          currentLocale === "es"
            ? "font-semibold text-white"
            : "text-soft-gray",
        )}
        aria-current={currentLocale === "es" ? "page" : undefined}
      >
        ES
      </Link>
      <span className="opacity-30" aria-hidden="true">
        /
      </span>
      <Link
        href="/en"
        className={cn(
          "transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm",
          currentLocale === "en"
            ? "font-semibold text-white"
            : "text-soft-gray",
        )}
        aria-current={currentLocale === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
