import { describe, expect, it } from "vitest";

import { locales } from "./config";
import { getDictionary } from "./dictionaries";

describe("getDictionary", () => {
  it("returns Spanish copy for es", () => {
    expect(getDictionary("es").home.title).toMatch(/corredores/i);
    expect(getDictionary("es").nav.architecture).toBe("Arquitectura");
  });

  it("returns English copy for en", () => {
    expect(getDictionary("en").home.title).toMatch(/brokers/i);
    expect(getDictionary("en").nav.architecture).toBe("Architecture");
  });

  it("returns the same keys for every locale", () => {
    // A missing translation must surface as a type or test failure here,
    // not as a half-translated page in production.
    const homeShapes = locales.map((locale) =>
      Object.keys(getDictionary(locale).home).sort(),
    );
    const navShapes = locales.map((locale) =>
      Object.keys(getDictionary(locale).nav).sort(),
    );

    for (const shape of homeShapes) {
      expect(shape).toEqual(homeShapes[0]);
    }
    for (const shape of navShapes) {
      expect(shape).toEqual(navShapes[0]);
    }
  });
});
