import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders DIRUS logo, tagline, links, and copyright", () => {
    const dictionary = getDictionary("es");
    render(<Footer locale="es" dictionary={dictionary} />);

    expect(screen.getByText("DIRUS")).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.footer.tagline),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dictionary.home.footer.copyright),
    ).toBeInTheDocument();
  });
});
