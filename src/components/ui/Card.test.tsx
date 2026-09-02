import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the title and description", () => {
    render(
      <Card
        title="Instalación eléctrica"
        description="Cambio de tomacorrientes y breakers."
      />,
    );
    expect(screen.getByText("Instalación eléctrica")).toBeInTheDocument();
    expect(
      screen.getByText("Cambio de tomacorrientes y breakers."),
    ).toBeInTheDocument();
  });

  it("renders the title as a semantic heading by default", () => {
    render(<Card title="Plomería" description="Reparación de fugas." />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Plomería" }),
    ).toBeInTheDocument();
  });

  it("allows overriding the heading level", () => {
    render(
      <Card
        title="Carpintería"
        description="Muebles a medida."
        headingLevel="h2"
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Carpintería" }),
    ).toBeInTheDocument();
  });

  it("does not render an icon when none is provided", () => {
    const { container } = render(
      <Card title="Pintura" description="Interior y exterior." />,
    );
    expect(
      container.querySelector('[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
  });

  it("renders the icon and hides it from screen readers", () => {
    render(
      <Card
        title="Jardinería"
        description="Poda y mantenimiento."
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
        title="Cerrajería"
        description="Cambio de cerraduras."
        className="w-64"
      />,
    );
    expect(container.firstChild).toHaveClass("w-64");
    expect(container.firstChild).toHaveClass("border-dark-gray");
  });
});
