import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { Problem } from "./Problem";

describe("Problem", () => {
  it("renders the Spanish copy for the es locale", () => {
    const dictionary = getDictionary("es");
    render(<Problem dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.problem.eyebrow),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: dictionary.home.problem.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.closing),
    ).toBeInTheDocument();
  });

  it("renders the English copy for the en locale", () => {
    const dictionary = getDictionary("en");
    render(<Problem dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.problem.eyebrow),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: dictionary.home.problem.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.closing),
    ).toBeInTheDocument();
  });

  it("exposes exactly one level-two heading", () => {
    render(<Problem dictionary={getDictionary("es")} />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
  });
});
