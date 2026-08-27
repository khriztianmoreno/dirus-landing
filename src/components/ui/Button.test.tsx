import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders as a native button by default", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("defaults to type='button' so it never submits a form by accident", () => {
    render(<Button>Safe</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("lets the caller override the button type", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders as a link when as='a'", () => {
    render(
      <Button as="a" href="/pricing">
        Ver precios
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Ver precios" });
    expect(link).toHaveAttribute("href", "/pricing");
  });

  it("applies the primary variant by default", () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent-indigo");
  });

  it("applies the secondary variant when specified", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-dark-gray");
  });

  it("shares one base style set across both variants", () => {
    // The acceptance criterion is "primary/secondary without duplicating
    // styles": both variants must carry the same base classes.
    render(
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </>,
    );
    const [primary, secondary] = screen.getAllByRole("button");
    for (const cls of ["inline-flex", "font-mono", "rounded", "px-6"]) {
      expect(primary).toHaveClass(cls);
      expect(secondary).toHaveClass(cls);
    }
  });

  it("shows the arrow pattern when showArrow is true", () => {
    render(<Button showArrow>Continuar</Button>);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("hides the arrow from assistive tech", () => {
    render(<Button showArrow>Continuar</Button>);
    expect(screen.getByText("→")).toHaveAttribute("aria-hidden", "true");
  });

  it("does not show the arrow by default", () => {
    render(<Button>Continuar</Button>);
    expect(screen.queryByText("→")).not.toBeInTheDocument();
  });

  it("renders the arrow in the link variant too", () => {
    render(
      <Button as="a" href="/demo" showArrow>
        Pedir demo
      </Button>,
    );
    expect(
      screen.getByRole("link", { name: "Pedir demo" }),
    ).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is focusable and carries a visible focus-ring treatment", () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole("button");

    button.focus();
    expect(button).toHaveFocus();
    // The focus ring is driven by :focus-visible utility classes; assert they
    // are wired so the keyboard-focus state stays visible.
    expect(button).toHaveClass(
      "focus-visible:ring-2",
      "focus-visible:ring-accent-blue",
      "focus-visible:ring-offset-graphite",
    );
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("merges a custom className with the variant styles", () => {
    render(<Button className="w-full">Full width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
    expect(screen.getByRole("button")).toHaveClass("bg-accent-indigo");
  });
});
