import { home as enHome } from "@/content/en/home";
import { nav as enNav } from "@/content/en/nav";
import { home as esHome } from "@/content/es/home";
import { nav as esNav } from "@/content/es/nav";

import type { Locale } from "./config";

/**
 * The copy contract every locale must satisfy.
 */
export type HomeCopy = {
  title: string;
  description: string;
};

export type NavCopy = {
  architecture: string;
  solutions: string;
  reliability: string;
  company: string;
  cta: string;
};

export type Dictionary = {
  home: HomeCopy;
  nav: NavCopy;
};

// Typing the record means a missing or renamed key fails the type check
// instead of rendering `undefined` in production.
const dictionaries: Record<Locale, Dictionary> = {
  es: { home: esHome, nav: esNav },
  en: { home: enHome, nav: enNav },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
