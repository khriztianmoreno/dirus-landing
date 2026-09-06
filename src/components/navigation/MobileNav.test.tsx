import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { nav as esNav } from "@/content/es/nav";
import { MobileNav } from "./MobileNav";

/**
 * The drawer is a modal dialog, so the parts worth testing are the ones a
 * sighted mouse user never sees: where focus goes when it opens, and whether
 * Tab can escape it while it is open.
 *
 * Navbar.test.tsx already covers opening and closing. This file covers the
 * keyboard contract, which is the whole reason the component is called
 * "accessible".
 */

function renderOpen(triggerRef?: React.RefObject<HTMLButtonElement | null>) {
  const onClose = vi.fn();
  const view = render(
    <MobileNav
      isOpen
      onClose={onClose}
      locale="es"
      copy={esNav}
      triggerRef={triggerRef}
    />,
  );

  return { ...view, onClose };
}

/** The same query the component uses, so the test moves when the component does. */
function focusables(dialog: HTMLElement) {
  return Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe("MobileNav", () => {
  it("renders nothing when closed", () => {
    render(
      <MobileNav isOpen={false} onClose={vi.fn()} locale="es" copy={esNav} />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  describe("initial focus", () => {
    it("moves focus into the panel after the opening delay", () => {
      vi.useFakeTimers();
      renderOpen();

      const dialog = screen.getByRole("dialog");
      expect(dialog.contains(document.activeElement)).toBe(false);

      act(() => {
        vi.advanceTimersByTime(50);
      });

      // Which element receives it is an implementation detail; that focus
      // lands inside the dialog at all is the accessibility requirement.
      expect(dialog.contains(document.activeElement)).toBe(true);
    });
  });

  describe("focus trap", () => {
    it("wraps from the last element back to the first on Tab", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      const elements = focusables(dialog);
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;

      last.focus();
      fireEvent.keyDown(window, { key: "Tab" });

      expect(first).toHaveFocus();
    });

    it("wraps from the first element back to the last on Shift+Tab", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      const elements = focusables(dialog);
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;

      first.focus();
      fireEvent.keyDown(window, { key: "Tab", shiftKey: true });

      expect(last).toHaveFocus();
    });

    it("leaves focus alone when Tab is pressed mid-list", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      const elements = focusables(dialog);
      const middle = elements[1]!;

      middle.focus();
      fireEvent.keyDown(window, { key: "Tab" });

      // The browser handles the ordinary step; the trap only intervenes at
      // the edges. Hijacking every Tab would break the natural order.
      expect(middle).toHaveFocus();
    });

    it("leaves focus alone when Shift+Tab is pressed mid-list", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      const elements = focusables(dialog);
      const middle = elements[1]!;

      middle.focus();
      fireEvent.keyDown(window, { key: "Tab", shiftKey: true });

      expect(middle).toHaveFocus();
    });

    it("ignores keys that are neither Tab nor Escape", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      const first = focusables(dialog)[0]!;

      first.focus();
      fireEvent.keyDown(window, { key: "a" });

      expect(first).toHaveFocus();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Escape", () => {
    it("closes the drawer and returns focus to the trigger", () => {
      const trigger = document.createElement("button");
      trigger.textContent = esNav.openMenu;
      document.body.append(trigger);

      const triggerRef = createRef<HTMLButtonElement>();
      // The ref mirrors what Navbar passes: a handle on the button that
      // opened the drawer, so focus can go back where the user left it.
      Object.assign(triggerRef, { current: trigger });

      const { onClose } = renderOpen(triggerRef);
      fireEvent.keyDown(window, { key: "Escape" });

      expect(onClose).toHaveBeenCalledOnce();
      expect(trigger).toHaveFocus();

      trigger.remove();
    });

    it("closes without a trigger ref", () => {
      const { onClose } = renderOpen();

      fireEvent.keyDown(window, { key: "Escape" });

      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe("body scroll", () => {
    it("locks scroll while open and restores the original value on unmount", () => {
      document.body.style.overflow = "scroll";

      const { unmount } = renderOpen();
      expect(document.body.style.overflow).toBe("hidden");

      unmount();
      expect(document.body.style.overflow).toBe("scroll");

      document.body.style.overflow = "";
    });
  });

  describe("dialog contents", () => {
    it("exposes the drawer as a labelled modal dialog", () => {
      renderOpen();

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-label", esNav.openMenu);
      expect(
        within(dialog).getByRole("button", { name: esNav.closeMenu }),
      ).toBeInTheDocument();
    });
  });
});
