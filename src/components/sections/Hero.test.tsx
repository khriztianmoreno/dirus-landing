import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the Spanish copy for the es locale", () => {
    const dictionary = getDictionary("es");
    render(<Hero dictionary={dictionary} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /broker/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(dictionary.home.hero.badge)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: new RegExp(dictionary.home.hero.cta, "i"),
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.hero.flowPill.step1),
    ).toBeInTheDocument();
  });

  it("renders the English copy for the en locale", () => {
    const dictionary = getDictionary("en");
    render(<Hero dictionary={dictionary} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /broker/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(dictionary.home.hero.badge)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: new RegExp(dictionary.home.hero.cta, "i"),
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.hero.flowPill.step1),
    ).toBeInTheDocument();
  });

  it("exposes exactly one level-one heading", () => {
    render(<Hero dictionary={getDictionary("es")} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("scopes horizontal overflow on mobile without clipping the section", () => {
    const { container } = render(<Hero dictionary={getDictionary("es")} />);

    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.className).toContain("overflow-hidden");

    const flowPill = container.querySelector('div[class*="overflow-x-auto"]');
    expect(flowPill).not.toBeNull();
    expect(flowPill?.className).toContain("overflow-x-auto");
  });

  it("makes the CTA full-width on mobile and auto-width from sm up", () => {
    const dictionary = getDictionary("es");
    render(<Hero dictionary={dictionary} />);

    const cta = screen.getByRole("link", {
      name: new RegExp(dictionary.home.hero.cta, "i"),
    });
    expect(cta.className).toContain("w-full");
    expect(cta.className).toContain("sm:w-auto");
  });

  it("keeps the headline within its container on narrow screens", () => {
    render(<Hero dictionary={getDictionary("es")} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.className).toContain("break-words");
  });
});
