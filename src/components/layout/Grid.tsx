import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GridColumns = 2 | 3 | 4 | 6 | 12;

type GridProps = {
  children: ReactNode;
  className?: string;
  /** Number of columns on desktop. Defaults to 12. */
  columns?: GridColumns;
};

const GRID_COLS: Record<GridColumns, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

/**
 * CSS Grid wrapper with the design system gutter.
 * Stacks to a single column on mobile, expands to `columns` on desktop.
 */
export function Grid({ children, className = "", columns = 12 }: GridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-6", GRID_COLS[columns], className)}
    >
      {children}
    </div>
  );
}
