import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { HowItWorksSection } from "./HowItWorksSection";

describe("HowItWorksSection", () => {
  it("renders 5 step cards", () => {
    const dictionary = getDictionary("es");
    render(<HowItWorksSection dictionary={dictionary} />);

    expect(
      screen.getByText(dictionary.home.howItWorks.title),
    ).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("05")).toBeInTheDocument();
  });
});
