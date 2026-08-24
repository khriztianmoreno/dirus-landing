import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";

import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the Spanish copy for the es locale", () => {
    render(<Hero dictionary={getDictionary("es")} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /corredores/i }),
    ).toBeInTheDocument();
  });

  it("renders the English copy for the en locale", () => {
    render(<Hero dictionary={getDictionary("en")} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /brokers/i }),
    ).toBeInTheDocument();
  });

  it("exposes exactly one level-one heading", () => {
    // More than one h1 breaks the document outline for screen readers.
    render(<Hero dictionary={getDictionary("es")} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
