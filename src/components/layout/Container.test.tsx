import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container";

describe("Container", () => {
  it("renders children", () => {
    render(
      <Container>
        <p>Test content</p>
      </Container>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("centers content with the page max-width", () => {
    const { container } = render(
      <Container>
        <p>Content</p>
      </Container>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("max-w-page");
    expect(wrapper.className).toContain("mx-auto");
  });

  it("applies responsive padding from layout tokens", () => {
    const { container } = render(
      <Container>
        <p>Content</p>
      </Container>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("px-4");
    expect(wrapper.className).toContain("md:px-16");
  });

  it("drops padding at every breakpoint when padding is none", () => {
    const { container } = render(
      <Container padding="none">
        <p>Content</p>
      </Container>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain("px-4");
    expect(wrapper.className).not.toContain("md:px-16");
  });

  it("lets a className max-width override win", () => {
    const { container } = render(
      <Container className="max-w-none">
        <p>Content</p>
      </Container>,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("max-w-none");
    expect(wrapper.className).not.toContain("max-w-page");
  });
});
