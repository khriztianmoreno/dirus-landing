import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as a native button by default", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("defaults to type='button' to avoid submitting forms", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("allows overriding the type", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("renders as a link when as='a'", () => {
    render(
      <Button as="a" href="/pricing">
        View pricing
      </Button>,
    );
    const link = screen.getByRole("link", { name: "View pricing" });
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

  it("shows the arrow pattern when showArrow is true", () => {
    render(<Button showArrow>Continue</Button>);
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("does not show the arrow by default", () => {
    render(<Button>Continue</Button>);
    expect(screen.queryByText("→")).not.toBeInTheDocument();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("receives focus when navigated by keyboard", async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("lets a custom className override a conflicting utility", () => {
    render(<Button className="bg-red-500">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-red-500");
    expect(screen.getByRole("button")).not.toHaveClass("bg-accent-indigo");
  });
});
