import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionPadding = "section" | "none";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /**
   * Vertical padding. Use "none" to opt out: a bare `py-*` in `className`
   * cannot cancel the responsive default, because `py-0` and `md:py-24` are
   * different variants and never conflict in tailwind-merge.
   */
  padding?: SectionPadding;
  /**
   * Accessible name for the section. Without it the element is not exposed
   * as a `region` landmark to screen readers.
   */
  "aria-label"?: string;
};

const SECTION_PADDING: Record<SectionPadding, string> = {
  section: "py-16 md:py-24",
  none: "",
};

/**
 * Vertical band that wraps a section of the page.
 * Provides consistent vertical spacing between sections.
 */
export function Section({
  children,
  className,
  padding = "section",
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(SECTION_PADDING[padding], className)}
    >
      {children}
    </section>
  );
}
