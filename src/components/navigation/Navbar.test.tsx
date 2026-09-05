import { render, screen } from "@testing-library/react";
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
});
