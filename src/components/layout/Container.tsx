import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerPadding = "page" | "none";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /**
   * Horizontal padding. Use "none" to opt out: a bare `px-*` in `className`
   * cannot cancel the responsive default, because `px-0` and `md:px-16` are
   * different variants and never conflict in tailwind-merge.
   */
  padding?: ContainerPadding;
};

const CONTAINER_PADDING: Record<ContainerPadding, string> = {
  page: "px-4 md:px-16",
  none: "",
};

/**
 * Centers content with the page max-width and responsive padding.
 * Padding comes from layout tokens: px-4 on mobile, md:px-16 on desktop.
 */
export function Container({
  children,
  className,
  padding = "page",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-page",
        CONTAINER_PADDING[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
