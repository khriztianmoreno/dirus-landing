import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataNode } from "./DataNode";

describe("DataNode", () => {
  it("renders default pulse node", () => {
    const { container } = render(<DataNode />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<DataNode label="Status: Active" />);
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(<DataNode variant="error" />);
    const span = container.querySelector("span[aria-hidden='true']");
    expect(span).toHaveClass("bg-red-500");
  });

  it("applies size classes correctly", () => {
    const { container } = render(<DataNode size="lg" />);
    const span = container.querySelector("span[aria-hidden='true']");
    expect(span).toHaveClass("w-4");
    expect(span).toHaveClass("h-4");
  });

  it("renders children inside node element when size is xl", () => {
    render(
      <DataNode size="xl">
        <span data-testid="icon-child">⚡</span>
      </DataNode>,
    );
    expect(screen.getByTestId("icon-child")).toBeInTheDocument();
  });
});
