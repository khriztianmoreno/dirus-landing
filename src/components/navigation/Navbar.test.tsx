import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { nav as enNav } from "@/content/en/nav";
import { nav as esNav } from "@/content/es/nav";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders DIRUS logo, badge, navigation links, and CTA in Spanish", () => {
    render(<Navbar locale="es" copy={esNav} />);

    expect(screen.getByText("DIRUS")).toBeInTheDocument();
    expect(screen.getByText("Para Brokers")).toBeInTheDocument();
    expect(screen.getByText("Problema")).toHaveAttribute(
      "href",
      "#el-problema",
    );
    expect(screen.getByText("Cómo Funciona")).toHaveAttribute(
      "href",
      "#como-funciona",
    );
    expect(screen.getByText("Beneficios")).toHaveAttribute(
      "href",
      "#beneficios",
    );
    expect(screen.getByText("Casos Reales")).toHaveAttribute(
      "href",
      "#casos-de-uso",
    );
    expect(screen.getByText("Solicitar demo")).toBeInTheDocument();
  });

  it("renders badge, navigation links and CTA in English", () => {
    render(<Navbar locale="en" copy={enNav} />);

    expect(screen.getByText("For Brokers")).toBeInTheDocument();
    expect(screen.getByText("Problem")).toHaveAttribute("href", "#el-problema");
    expect(screen.getByText("How It Works")).toHaveAttribute(
      "href",
      "#como-funciona",
    );
    expect(screen.getByText("Benefits")).toHaveAttribute("href", "#beneficios");
    expect(screen.getByText("Use Cases")).toHaveAttribute(
      "href",
      "#casos-de-uso",
    );
    expect(screen.getByText("Request demo")).toBeInTheDocument();
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
    expect(header).toHaveClass(
      "supports-[backdrop-filter:blur(0)]:bg-graphite/80",
    );
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

  describe("Mobile Navigation Drawer", () => {
    it("renders hamburger button with correct initial accessibility attributes", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute(
        "aria-controls",
        "mobile-navigation-menu",
      );
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens mobile drawer when hamburger button is clicked", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(trigger);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-label", esNav.openMenu);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveAttribute("aria-label", esNav.closeMenu);
    });

    it("closes mobile drawer when close button inside drawer is clicked", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const openTrigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(openTrigger);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();

      const closeButton = within(dialog).getByRole("button", {
        name: esNav.closeMenu,
      });
      fireEvent.click(closeButton);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(openTrigger).toHaveAttribute("aria-expanded", "false");
    });

    it("closes mobile drawer when Escape key is pressed", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(trigger);

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      fireEvent.keyDown(window, { key: "Escape" });

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes mobile drawer when backdrop is clicked", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(trigger);

      const backdrop = screen.getByTestId("mobile-nav-backdrop");
      fireEvent.click(backdrop);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes mobile drawer when a navigation link is clicked", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(trigger);

      const links = screen.getAllByText(esNav.problem);
      expect(links.length).toBeGreaterThan(0);
      const drawerLink = links[links.length - 1];
      expect(drawerLink).toBeDefined();
      fireEvent.click(drawerLink!);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("locks body scroll when open and restores it when closed", () => {
      render(<Navbar locale="es" copy={esNav} />);

      const trigger = screen.getByRole("button", { name: esNav.openMenu });
      fireEvent.click(trigger);

      expect(document.body.style.overflow).toBe("hidden");

      const dialog = screen.getByRole("dialog");
      const closeButton = within(dialog).getByRole("button", {
        name: esNav.closeMenu,
      });
      fireEvent.click(closeButton);

      expect(document.body.style.overflow).toBe("");
    });
  });
});
