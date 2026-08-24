import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

/**
 * These assertions deliberately target structural and accessibility
 * invariants rather than copy. The page still holds create-next-app
 * scaffolding that M02 will replace, and a test pinned to that copy would
 * have to be rewritten alongside it — which teaches the team to delete
 * failing tests instead of trusting them.
 */
describe("Home", () => {
  it("exposes a single main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("gives every image an accessible name", () => {
    render(<Home />);

    const images = screen.getAllByRole("img");

    expect(images.length).toBeGreaterThan(0);
    for (const image of images) {
      expect(image).toHaveAccessibleName();
    }
  });

  it("opens external links safely", () => {
    render(<Home />);

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank");

    expect(externalLinks.length).toBeGreaterThan(0);
    for (const link of externalLinks) {
      // Without noopener the opened page can reach back through
      // window.opener and navigate this tab elsewhere.
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    }
  });
});
