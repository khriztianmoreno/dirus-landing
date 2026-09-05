import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LayerStack } from "./LayerStack";

const sampleLayers = [
  {
    id: "layer-1",
    title: "Layer 1",
    subtitle: "Subtitle 1",
    badge: "Badge 1",
  },
  {
    id: "layer-2",
    title: "Layer 2",
    subtitle: "Subtitle 2",
    variant: "highlight" as const,
  },
];

describe("LayerStack", () => {
  it("renders all layers provided", () => {
    render(<LayerStack layers={sampleLayers} />);
    expect(screen.getByText("Layer 1")).toBeInTheDocument();
    expect(screen.getByText("Layer 2")).toBeInTheDocument();
  });

  it("renders badges when present", () => {
    render(<LayerStack layers={sampleLayers} />);
    expect(screen.getByText("Badge 1")).toBeInTheDocument();
  });

  it("applies highlight variant classes correctly", () => {
    const { container } = render(<LayerStack layers={sampleLayers} />);
    expect(container.innerHTML).toContain("border-accent-indigo");
  });

  it("hides connectors when showConnectors is false", () => {
    const { container } = render(
      <LayerStack layers={sampleLayers} showConnectors={false} />,
    );
    expect(container.querySelectorAll(".h-8").length).toBe(0);
  });
});
