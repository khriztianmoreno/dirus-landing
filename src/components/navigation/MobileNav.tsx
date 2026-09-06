"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { NavCopy } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  copy: NavCopy;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
};

export function MobileNav({
  isOpen,
  onClose,
  locale,
  copy,
  triggerRef,
}: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  // Focus trap & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        triggerRef?.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        if (!panelRef.current) return;

        const focusableElements =
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement && lastElement) {
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Initial focus into panel close button or first focusable element
    const timer = setTimeout(() => {
      if (panelRef.current) {
        const firstFocusable =
          panelRef.current.querySelector<HTMLElement>("button, a[href]");
        firstFocusable?.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const homeHref = `/${locale}`;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        data-testid="mobile-nav-backdrop"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label={copy.openMenu}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col justify-between border-l border-white/10 bg-graphite-raised p-6 shadow-2xl shadow-black/80 transition-transform duration-300 ease-in-out"
      >
        {/* Header inside drawer */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Link
              href={homeHref}
              onClick={onClose}
              className="font-sans text-xl font-bold tracking-tighter text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
            >
              DIRUS
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-soft-gray hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6">
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="#el-problema"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.problem}
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.howItWorks}
                </a>
              </li>
              <li>
                <a
                  href="#beneficios"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.benefits}
                </a>
              </li>
              <li>
                <a
                  href="#casos-de-uso"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.useCases}
                </a>
              </li>
              <li>
                <a
                  href="#comparativa"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.comparison}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={onClose}
                  className="block font-mono text-body-md uppercase tracking-widest text-soft-gray transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded-sm"
                >
                  {copy.faq}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Footer inside drawer */}
        <div className="space-y-6 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-label uppercase text-soft-gray">
              Language
            </span>
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <Button
            variant="primary"
            as="a"
            href="#solicitar-demo"
            onClick={onClose}
            className="w-full justify-center"
          >
            {copy.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
