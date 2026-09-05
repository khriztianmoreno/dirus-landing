import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders level 1 as an h1 by default", () => {
    render(<Heading level={1}>Heading Level 1</Heading>);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Heading Level 1",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders level 2 as an h2 by default", () => {
    render(<Heading level={2}>Heading Level 2</Heading>);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Heading Level 2",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders level 3 as an h3 by default", () => {
    render(<Heading level={3}>Heading Level 3</Heading>);
    const heading = screen.getByRole("heading", {
      level: 3,
      name: "Heading Level 3",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H3");
  });

  it("renders display level as an h1 by default", () => {
    render(<Heading level="display">Display Title</Heading>);
    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Display Title",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("allows overriding the semantic tag via 'as' prop", () => {
    render(
      <Heading level={1} as="h2">
        Semantic H2 with Level 1 visual style
      </Heading>,
    );
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Semantic H2 with Level 1 visual style",
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("allows overriding visual size via 'size' prop", () => {
    render(
      <Heading level={1} size={3}>
        Semantic H1 with Level 3 size
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-body-lg");
  });

  it("merges custom className with default styles", () => {
    render(<Heading className="text-accent-indigo">Custom Heading</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-accent-indigo");
  });

  it("forwards extra HTML attributes", () => {
    render(
      <Heading id="main-heading" data-testid="heading-test">
        Test
      </Heading>,
    );
    const heading = screen.getByTestId("heading-test");
    expect(heading).toHaveAttribute("id", "main-heading");
  });
});
