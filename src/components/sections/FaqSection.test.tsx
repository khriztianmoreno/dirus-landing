import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { FaqSection } from "./FaqSection";

describe("FaqSection", () => {
  it("renders FAQ accordion items", () => {
    const dictionary = getDictionary("es");
    render(<FaqSection dictionary={dictionary} />);

    expect(screen.getByText(dictionary.home.faq.title)).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.faq.items[0]!.question),
    ).toBeInTheDocument();
  });
});
