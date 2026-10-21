import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { ProblemSection } from "./ProblemSection";

describe("ProblemSection", () => {
  it("renders problem heading and cards", () => {
    const dictionary = getDictionary("es");
    render(<ProblemSection dictionary={dictionary} />);

    expect(screen.getByText(dictionary.home.problem.title)).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.card1.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.problem.card2.title),
    ).toBeInTheDocument();
  });
});
