import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./Section";

describe("Section", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>,
    );

    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("renders as a section element", () => {
    render(
      <Section>
        <p>Content</p>
      </Section>,
    );

    expect(document.querySelector("section")).toBeInTheDocument();
  });

  it("exposes the region landmark when given an aria-label", () => {
    render(
      <Section aria-label="About us">
        <p>Content</p>
      </Section>,
    );

    expect(
      screen.getByRole("region", { name: "About us" }),
    ).toBeInTheDocument();
  });

  it("is not a landmark without an aria-label", () => {
    render(
      <Section>
        <p>Content</p>
      </Section>,
    );

    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("applies responsive vertical spacing", () => {
    const { container } = render(
      <Section>
        <p>Content</p>
      </Section>,
    );

    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("py-16");
    expect(section.className).toContain("md:py-24");
  });

  it("drops padding at every breakpoint when padding is none", () => {
    const { container } = render(
      <Section padding="none">
        <p>Content</p>
      </Section>,
    );

    const section = container.firstChild as HTMLElement;
    expect(section.className).not.toContain("py-16");
    expect(section.className).not.toContain("md:py-24");
  });
});
