import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { OperationalNoise } from "./OperationalNoise";

const NODES = [
  { id: "whatsapp", title: "WhatsApp" },
  { id: "email", title: "Emails" },
];

describe("OperationalNoise", () => {
  beforeEach(() => {
    class IntersectionObserverMock {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the center DIRUS core", () => {
    render(<OperationalNoise nodes={NODES} centerLabel="DIRUS" />);

    expect(screen.getByText("DIRUS")).toBeInTheDocument();
  });

  it("renders every operational node title", () => {
    render(<OperationalNoise nodes={NODES} centerLabel="DIRUS" />);

    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Emails")).toBeInTheDocument();
  });

  it("marks the figure as decorative", () => {
    const { container } = render(
      <OperationalNoise nodes={NODES} centerLabel="DIRUS" />,
    );

    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it("renders exactly one connector line per node initially", () => {
    const { container } = render(
      <OperationalNoise nodes={NODES} centerLabel="DIRUS" />,
    );

    expect(container.querySelectorAll("path")).toHaveLength(2);
  });
});
