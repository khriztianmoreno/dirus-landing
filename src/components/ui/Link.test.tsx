import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Link } from "./Link";

describe("Link", () => {
  it("renderiza como enlace con href", () => {
    render(<Link href="/nosotros">Sobre nosotros</Link>);
    const link = screen.getByRole("link", { name: "Sobre nosotros" });
    expect(link).toHaveAttribute("href", "/nosotros");
  });

  it("aplica los estilos base del enlace", () => {
    render(<Link href="/precios">Precios</Link>);
    const link = screen.getByRole("link", { name: "Precios" });
    expect(link).toHaveClass("text-accent-indigo-soft");
    expect(link).toHaveClass("underline");
  });

  it("recibe foco al navegar con el teclado", async () => {
    const user = userEvent.setup();
    render(<Link href="/contacto">Contacto</Link>);
    await user.tab();
    expect(screen.getByRole("link", { name: "Contacto" })).toHaveFocus();
  });

  it("fusiona className personalizado con estilos base", () => {
    render(
      <Link href="/docs" className="font-bold">
        Documentación
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Documentación" });
    expect(link).toHaveClass("font-bold");
    expect(link).toHaveClass("text-accent-indigo-soft");
  });

  it("preserva parámetros de consulta", () => {
    render(<Link href="/buscar?q=hola">Buscar</Link>);
    expect(screen.getByRole("link", { name: "Buscar" })).toHaveAttribute(
      "href",
      "/buscar?q=hola",
    );
  });

  it("agrega rel='noopener noreferrer' por seguridad en enlaces externos con target='_blank'", () => {
    render(
      <Link href="https://example.com" target="_blank">
        Sitio externo
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Sitio externo" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
