import { describe, expect, it } from "vitest";

import { resolveLocale } from "./detect";

describe("resolveLocale", () => {
  it("falls back to Spanish when no header is sent", () => {
    expect(resolveLocale(null)).toBe("es");
    expect(resolveLocale("")).toBe("es");
  });

  it("matches an exact supported tag", () => {
    expect(resolveLocale("en")).toBe("en");
    expect(resolveLocale("es")).toBe("es");
  });

  it("matches a region-qualified tag by its base language", () => {
    // A browser set to Colombian Spanish sends es-CO; it should still get es.
    expect(resolveLocale("es-CO")).toBe("es");
    expect(resolveLocale("en-GB")).toBe("en");
  });

  it("honours quality values rather than header order", () => {
    // en is listed first but Spanish is explicitly preferred.
    expect(resolveLocale("en;q=0.3,es;q=0.9")).toBe("es");
    expect(resolveLocale("es;q=0.2,en;q=0.8")).toBe("en");
  });

  it("treats a missing q value as the highest priority", () => {
    expect(resolveLocale("en,es;q=0.9")).toBe("en");
  });

  it("skips unsupported languages and takes the best supported one", () => {
    expect(resolveLocale("fr-FR,de;q=0.9,en;q=0.5")).toBe("en");
  });

  it("falls back to Spanish when nothing is supported", () => {
    expect(resolveLocale("fr-FR,de;q=0.9")).toBe("es");
  });

  it("ignores a malformed q value instead of throwing", () => {
    expect(resolveLocale("en;q=banana")).toBe("en");
  });

  it("tolerates whitespace and casing", () => {
    expect(resolveLocale("  EN-us ;q=0.9 ,  ES ;q=0.4 ")).toBe("en");
  });

  it("ignores the wildcard rather than matching it to a language", () => {
    expect(resolveLocale("*")).toBe("es");
  });
});
