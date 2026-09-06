import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { ComparisonSection } from "./ComparisonSection";

describe("ComparisonSection", () => {
  it("renders traditional vs DIRUS comparison workflow", () => {
    const dictionary = getDictionary("es");
    render(<ComparisonSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.comparison.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.comparison.traditional.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.comparison.dirus.title),
    ).toBeInTheDocument();
  });
});
