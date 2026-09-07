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
});
