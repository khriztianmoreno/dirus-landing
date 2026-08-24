import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Locks the brand palette to the values in the design brief.
 *
 * Colour tokens are the kind of thing that drifts silently: someone nudges a
 * hex to fix one screen and the whole system moves with it. This test makes
 * that edit fail loudly and forces the brief to be updated first.
 */
const css = readFileSync(
  join(process.cwd(), "src/app/globals.css"),
  "utf8",
).toLowerCase();

function tokenValue(name: string): string | undefined {
  const match = new RegExp(`--color-${name}:\\s*([^;]+);`).exec(css);
  return match?.[1]?.trim();
}

const base = {
  black: "#000000",
  "near-black": "#0e0e0e",
  graphite: "#141313",
  "graphite-raised": "#1c1b1b",
  white: "#ffffff",
  ink: "#e5e2e1",
  "soft-gray": "#c4c7c8",
  "dark-gray": "#444748",
};

const accents = {
  "accent-indigo": "#3626ce",
  "accent-indigo-soft": "#c3c0ff",
  "accent-violet": "#8c2ae3",
};

describe("base colour tokens", () => {
  it.each(Object.entries(base))("%s is %s", (name, value) => {
    expect(tokenValue(name)).toBe(value);
  });

  it("keeps the surface ramp ordered from deepest to lightest", () => {
    // Hierarchy comes from surface brightness, so the ramp has to stay
    // monotonic or the z-axis stops reading as depth.
    const ramp = ["black", "near-black", "graphite", "graphite-raised"]
      .map((name) => tokenValue(name) ?? "")
      .map((hex) => Number.parseInt(hex.slice(1), 16));

    const ascending = [...ramp].sort((a, b) => a - b);
    expect(ramp).toEqual(ascending);
  });
});

describe("accent colour tokens", () => {
  it.each(Object.entries(accents))("%s is %s", (name, value) => {
    expect(tokenValue(name)).toBe(value);
  });

  it("names every accent with the accent- prefix", () => {
    // The separation between base and accent has to be visible at the call
    // site, not only in a comment in this file.
    const declared = [...css.matchAll(/--color-([a-z0-9-]+):/g)]
      .map((match) => match[1] ?? "")
      .filter((name) => !name.startsWith("accent-"));

    for (const name of declared) {
      expect(name).not.toMatch(/blue|indigo|violet|purple/);
    }
  });
});
