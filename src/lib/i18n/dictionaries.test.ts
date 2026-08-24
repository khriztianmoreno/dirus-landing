import { describe, expect, it } from "vitest";

import { getDictionary } from "./dictionaries";
import { locales } from "./config";

describe("getDictionary", () => {
  it("returns Spanish copy for es", () => {
    expect(getDictionary("es").home.title).toMatch(/corredores/i);
  });

  it("returns English copy for en", () => {
    expect(getDictionary("en").home.title).toMatch(/brokers/i);
  });

  it("returns the same keys for every locale", () => {
    // A missing translation must surface as a type or test failure here,
    // not as a half-translated page in production.
    const shapes = locales.map((locale) =>
      Object.keys(getDictionary(locale).home).sort(),
    );

    for (const shape of shapes) {
      expect(shape).toEqual(shapes[0]);
    }
  });
});
