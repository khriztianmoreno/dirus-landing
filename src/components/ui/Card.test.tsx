import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the title and description", () => {
    render(
      <Card
        title="Quote Processing"
        description="Automated quote extraction and carrier filing."
      />,
    );
    expect(screen.getByText("Quote Processing")).toBeInTheDocument();
    expect(
      screen.getByText("Automated quote extraction and carrier filing."),
    ).toBeInTheDocument();
  });

  it("renders the eyebrow tag when provided", () => {
    render(<Card eyebrow="AUTO-EXTRACTION" title="Quote Processing" />);
    expect(screen.getByText("AUTO-EXTRACTION")).toBeInTheDocument();
  });

  it("renders without a description when omitted", () => {
    render(<Card eyebrow="PROACTIVE" title="Renewals" />);
    expect(screen.getByText("Renewals")).toBeInTheDocument();
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders the title as a semantic heading by default", () => {
    render(
      <Card
        title="Plumbing Services"
        description="Leak repairs and fixture replacements."
      />,
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Plumbing Services" }),
    ).toBeInTheDocument();
  });

  it("allows overriding the heading level", () => {
    render(
      <Card
        title="Custom Carpentry"
        description="Bespoke furniture and woodwork repairs."
        headingLevel="h2"
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Custom Carpentry" }),
    ).toBeInTheDocument();
  });

  it("does not render an icon when none is provided", () => {
    const { container } = render(
      <Card
        title="Painting Services"
        description="Interior and exterior painting."
      />,
    );
    expect(
      container.querySelector('[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
  });

  it("renders the icon and hides it from screen readers", () => {
    render(
      <Card
        title="Landscaping"
        description="Pruning and lawn maintenance."
        icon={<svg data-testid="icon" />}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(
      screen.getByTestId("icon").closest('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });

  it("merges a custom className with the base styles", () => {
    const { container } = render(
      <Card
        title="Locksmith Services"
        description="Lock replacement and key management."
        className="w-64"
      />,
    );
    expect(container.firstChild).toHaveClass("w-64");
    expect(container.firstChild).toHaveClass("border-dark-gray");
  });
});
