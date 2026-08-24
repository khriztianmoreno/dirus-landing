/**
 * The supported locales, in priority order.
 *
 * This array is the single source of truth: route params, locale detection
 * and dictionary loading all derive from it. Adding a language here and
 * nowhere else should be enough to make the type checker point at every
 * place that still needs work.
 */
export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Spanish is the default because DIRUS sells to brokers in Latin America.
 * The English site is a translation of it, not a parallel original.
 */
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
