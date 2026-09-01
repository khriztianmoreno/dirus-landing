import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /**
   * Accessible name for the section. Without it the element is not exposed
   * as a `region` landmark to screen readers.
   */
  "aria-label"?: string;
};

/**
 * Vertical band that wraps a section of the page.
 * Provides consistent vertical spacing between sections.
 */
export function Section({
  children,
  className = "",
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section aria-label={ariaLabel} className={cn("py-16 md:py-24", className)}>
      {children}
    </section>
  );
}
