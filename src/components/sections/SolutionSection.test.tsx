import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { SolutionSection } from "./SolutionSection";

describe("SolutionSection", () => {
  it("renders solution heading and architecture stack items", () => {
    const dictionary = getDictionary("es");
    render(<SolutionSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.solution.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.solution.architecture.topTitle),
    ).toBeInTheDocument();
  });
});
