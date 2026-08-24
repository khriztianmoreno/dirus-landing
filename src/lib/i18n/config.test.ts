import { describe, expect, it } from "vitest";

import { defaultLocale, isLocale, locales } from "./config";

describe("locale configuration", () => {
  it("supports Spanish and English", () => {
    expect(locales).toEqual(["es", "en"]);
  });

  it("defaults to Spanish", () => {
    // DIRUS sells to brokers in Latin America; English is the translation.
    expect(defaultLocale).toBe("es");
  });

  it("lists the default locale among the supported ones", () => {
    expect(locales).toContain(defaultLocale);
  });
});

describe("isLocale", () => {
  it.each(["es", "en"])("accepts %s", (value) => {
    expect(isLocale(value)).toBe(true);
  });

  it.each([
    ["an unsupported language", "fr"],
    ["a region-qualified tag", "es-CO"],
    ["an empty string", ""],
    ["a path segment", "es/pricing"],
    ["different casing", "ES"],
  ])("rejects %s", (_label, value) => {
    expect(isLocale(value)).toBe(false);
  });
});
