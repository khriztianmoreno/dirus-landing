import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Body, Text } from "./Text";

describe("Text", () => {
  it("renders as a paragraph tag by default", () => {
    render(<Text>Body paragraph copy.</Text>);
    const paragraph = screen.getByText("Body paragraph copy.");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe("P");
  });

  it("applies body-md variant and ink text color by default", () => {
    render(<Text>Default text</Text>);
    const paragraph = screen.getByText("Default text");
    expect(paragraph).toHaveClass("text-body-md");
    expect(paragraph).toHaveClass("text-ink");
  });

  it("supports body-lg variant", () => {
    render(<Text variant="lg">Lead paragraph</Text>);
    const paragraph = screen.getByText("Lead paragraph");
    expect(paragraph).toHaveClass("text-body-lg");
  });

  it("applies muted text color when muted is true", () => {
    render(<Text muted>Secondary description</Text>);
    const paragraph = screen.getByText("Secondary description");
    expect(paragraph).toHaveClass("text-soft-gray");
  });

  it("allows overriding HTML tag via 'as' prop", () => {
    render(<Text as="span">Inline text</Text>);
    const span = screen.getByText("Inline text");
    expect(span.tagName).toBe("SPAN");
  });

  it("exports Body as a valid alias for Text", () => {
    render(<Body variant="lg">Body alias test</Body>);
    const paragraph = screen.getByText("Body alias test");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-body-lg");
  });

  it("merges custom className", () => {
    render(<Text className="leading-relaxed">Custom leading</Text>);
    const paragraph = screen.getByText("Custom leading");
    expect(paragraph).toHaveClass("leading-relaxed");
  });
});
