import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders as a span by default", () => {
    render(<Eyebrow>Platform</Eyebrow>);
    const element = screen.getByText("Platform");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("SPAN");
  });

  it("applies accent color by default", () => {
    render(<Eyebrow>Platform</Eyebrow>);
    const element = screen.getByText("Platform");
    expect(element).toHaveClass("text-accent-indigo-soft");
    expect(element).toHaveClass("font-mono");
    expect(element).toHaveClass("uppercase");
  });

  it("allows overriding the HTML tag via 'as' prop", () => {
    render(<Eyebrow as="p">Pre-header text</Eyebrow>);
    const element = screen.getByText("Pre-header text");
    expect(element.tagName).toBe("P");
  });

  it("supports muted color variant", () => {
    render(<Eyebrow color="muted">Subtle Label</Eyebrow>);
    const element = screen.getByText("Subtle Label");
    expect(element).toHaveClass("text-soft-gray");
  });

  it("merges custom className", () => {
    render(<Eyebrow className="tracking-normal">Custom</Eyebrow>);
    const element = screen.getByText("Custom");
    expect(element).toHaveClass("tracking-normal");
  });
});
