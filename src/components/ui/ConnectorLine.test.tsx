import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConnectorLine } from "./ConnectorLine";

describe("ConnectorLine", () => {
  it("renders SVG element with default props", () => {
    const { container } = render(<ConnectorLine />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 100 20");
  });

  it("renders vertical orientation viewBox", () => {
    const { container } = render(<ConnectorLine orientation="vertical" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 20 100");
  });

  it("renders orthogonal orientation viewBox", () => {
    const { container } = render(<ConnectorLine orientation="orthogonal" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 100 100");
  });

  it("renders custom path override when provided", () => {
    const customD = "M 0,0 L 50,50";
    const { container } = render(<ConnectorLine path={customD} />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("d", customD);
  });

  it("renders pulse animation path when animated is true", () => {
    const { container } = render(<ConnectorLine animated />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(2);
  });
});
