import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { nav as enNav } from "@/content/en/nav";
import { nav as esNav } from "@/content/es/nav";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders DIRUS logo, navigation links, and CTA in Spanish", () => {
    render(<Navbar locale="es" copy={esNav} />);

    expect(screen.getByText("DIRUS")).toBeInTheDocument();
    expect(screen.getByText("Arquitectura")).toHaveAttribute(
      "href",
      "#architecture",
    );
    expect(screen.getByText("Soluciones")).toHaveAttribute(
      "href",
      "#solutions",
    );
    expect(screen.getByText("Fiabilidad")).toHaveAttribute(
      "href",
      "#reliability",
    );
    expect(screen.getByText("Empresa")).toHaveAttribute("href", "#company");
    expect(screen.getByText("Hablar con DIRUS")).toBeInTheDocument();
  });

  it("renders navigation links and CTA in English", () => {
    render(<Navbar locale="en" copy={enNav} />);

    expect(screen.getByText("Architecture")).toHaveAttribute(
      "href",
      "#architecture",
    );
    expect(screen.getByText("Solutions")).toHaveAttribute("href", "#solutions");
    expect(screen.getByText("Reliability")).toHaveAttribute(
      "href",
      "#reliability",
    );
    expect(screen.getByText("Company")).toHaveAttribute("href", "#company");
    expect(screen.getByText("Talk to DIRUS")).toBeInTheDocument();
  });

  it("highlights current locale in language switcher", () => {
    render(<Navbar locale="es" copy={esNav} />);

    const esLink = screen.getByRole("link", { name: "ES" });
    const enLink = screen.getByRole("link", { name: "EN" });

    expect(esLink).toHaveAttribute("aria-current", "page");
    expect(enLink).not.toHaveAttribute("aria-current");
  });

  it("applies transparent background at rest when top of page", () => {
    const { container } = render(
      <Navbar locale="es" copy={esNav} scrolled={false} />,
    );

    const header = container.querySelector("header");
    expect(header).toHaveAttribute("data-scrolled", "false");
    expect(header).toHaveClass("bg-transparent");
  });

  it("applies glassmorphic background and border when scrolled is true", () => {
    const { container } = render(
      <Navbar locale="es" copy={esNav} scrolled={true} />,
    );

    const header = container.querySelector("header");
    expect(header).toHaveAttribute("data-scrolled", "true");
    expect(header).toHaveClass("bg-graphite/80");
    expect(header).toHaveClass("backdrop-blur-2xl");
    expect(header).toHaveClass("border-white/10");
  });

  it("dynamically transitions state when window scrolls past threshold", () => {
    const { container } = render(<Navbar locale="es" copy={esNav} />);
    const header = container.querySelector("header");

    expect(header).toHaveAttribute("data-scrolled", "false");

    // Scroll down past threshold
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 50,
        writable: true,
        configurable: true,
      });
      fireEvent.scroll(window);
    });

    expect(header).toHaveAttribute("data-scrolled", "true");

    // Scroll back to top
    act(() => {
      Object.defineProperty(window, "scrollY", {
        value: 0,
        writable: true,
        configurable: true,
      });
      fireEvent.scroll(window);
    });

    expect(header).toHaveAttribute("data-scrolled", "false");
  });
});
