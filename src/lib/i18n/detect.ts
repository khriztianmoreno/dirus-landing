import { defaultLocale, isLocale, type Locale, locales } from "./config";

type LanguageRange = {
  language: string;
  quality: number;
};

/**
 * Parses an Accept-Language header into ranges sorted by descending quality.
 *
 * Written by hand rather than pulled from a dependency: the header grammar
 * needed here is a comma-separated list of tags with optional `q` values, and
 * a negotiation library would add install weight and a supply-chain surface
 * for roughly twenty lines of parsing.
 */
function parseAcceptLanguage(header: string): LanguageRange[] {
  return header
    .split(",")
    .map((part) => {
      // Split on the first ";" by index rather than by array destructuring:
      // indexing would need a `?? ""` fallback that can never run, and an
      // unreachable branch is dead code the coverage gate rightly flags.
      const separator = part.indexOf(";");
      const hasParameters = separator !== -1;

      const language = (hasParameters ? part.slice(0, separator) : part)
        .trim()
        .toLowerCase();

      const qualityParameter = hasParameters
        ? part
            .slice(separator + 1)
            .split(";")
            .map((parameter) => parameter.trim())
            .find((parameter) => parameter.startsWith("q="))
        : undefined;

      const parsed = Number.parseFloat(qualityParameter?.slice(2) ?? "");
      // A malformed q value must not drop the language entirely; RFC 9110
      // treats a missing q as 1, and a broken one is no more informative.
      const quality = Number.isFinite(parsed) ? parsed : 1;

      return { language, quality };
    })
    .filter((range) => range.language.length > 0 && range.language !== "*")
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Picks the best supported locale for an Accept-Language header, falling back
 * to the default when the header is absent or lists nothing we speak.
 */
export function resolveLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;

  for (const { language } of parseAcceptLanguage(header)) {
    if (isLocale(language)) return language;

    // A region-qualified tag such as es-CO still means Spanish.
    const dash = language.indexOf("-");
    if (dash !== -1) {
      const base = language.slice(0, dash);
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export { locales };
