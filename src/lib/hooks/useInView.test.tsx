import { render } from "@testing-library/react";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useInView } from "./useInView";

let callback: ((entries: Array<{ isIntersecting: boolean }>) => void) | null =
  null;

class IntersectionObserverMock {
  constructor(cb: (entries: Array<{ isIntersecting: boolean }>) => void) {
    callback = cb;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

function InViewProbe() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} data-inview={String(inView)} />;
}

beforeEach(() => {
  callback = null;
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  // jsdom lacks matchMedia; stub it as unmatching by default.
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useInView", () => {
  it("starts as not-in-view when motion is allowed", () => {
    render(<InViewProbe />);
    expect(document.querySelector("[data-inview]")).toHaveAttribute(
      "data-inview",
      "false",
    );
  });

  it("becomes in-view once the element intersects", () => {
    render(<InViewProbe />);
    expect(document.querySelector("[data-inview]")).toHaveAttribute(
      "data-inview",
      "false",
    );

    act(() => {
      callback?.([{ isIntersecting: true }]);
    });

    expect(document.querySelector("[data-inview]")).toHaveAttribute(
      "data-inview",
      "true",
    );
  });

  it("shows the settled state immediately for reduced-motion users", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    render(<InViewProbe />);
    expect(document.querySelector("[data-inview]")).toHaveAttribute(
      "data-inview",
      "true",
    );
  });
});
