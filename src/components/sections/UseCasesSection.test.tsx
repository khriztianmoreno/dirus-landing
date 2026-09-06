import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { UseCasesSection } from "./UseCasesSection";

describe("UseCasesSection", () => {
  it("renders 5 practical use cases", () => {
    const dictionary = getDictionary("es");
    render(<UseCasesSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.useCases.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.useCases.items[0]!.title),
    ).toBeInTheDocument();
  });
});
