import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { BenefitsSection } from "./BenefitsSection";

describe("BenefitsSection", () => {
  it("renders 6 benefit cards", () => {
    const dictionary = getDictionary("es");
    render(<BenefitsSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.benefits.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.benefits.items[0]!.title),
    ).toBeInTheDocument();
  });
});
