import { home as en } from "@/content/en/home";
import { home as es } from "@/content/es/home";

import type { Locale } from "./config";

/**
 * The copy contract every locale must satisfy.
 *
 * Declared with `string` rather than derived from the Spanish object: `typeof`
 * on an `as const` literal would pin each field to its exact Spanish sentence,
 * so no translation could ever satisfy it.
 */
export type HomeCopy = {
  title: string;
  description: string;
};

export type Dictionary = {
  home: HomeCopy;
};

// Typing the record means a missing or renamed key fails the type check
// instead of rendering `undefined` in production.
const dictionaries: Record<Locale, Dictionary> = {
  es: { home: es },
  en: { home: en },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
