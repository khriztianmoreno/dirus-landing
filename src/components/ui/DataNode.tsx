import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DataNodeVariant = "accent" | "pulse" | "muted" | "error";
export type DataNodeSize = "sm" | "md" | "lg" | "xl";

export type DataNodeProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Visual style variant.
   * - "pulse": Animated glowing data pulse node
   * - "accent": Primary accent Indigo indicator
   * - "muted": Soft graphite / gray indicator
   * - "error": Warning / noise state indicator
   */
  variant?: DataNodeVariant;
  /**
   * Node size variant.
   * - "sm": 8px dot
   * - "md": 12px dot (default)
   * - "lg": 16px dot
   * - "xl": 48px container node (supports icon/content)
   */
  size?: DataNodeSize;
  /**
   * Optional text label displayed alongside the node.
   */
  label?: string;
  /**
   * Optional icon or custom content inside the node (xl size recommended).
   */
  children?: ReactNode;
  className?: string;
};

const variantStyles: Record<DataNodeVariant, string> = {
  pulse:
    "bg-accent-indigo text-white shadow-[0_0_15px_rgba(54,38,206,0.6)] animate-pulse",
  accent: "bg-accent-indigo-soft text-accent-indigo",
  muted: "bg-soft-gray/40 text-soft-gray",
  error: "bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]",
};

const sizeStyles: Record<DataNodeSize, string> = {
  sm: "w-2 h-2 rounded-full",
  md: "w-3 h-3 rounded-full",
  lg: "w-4 h-4 rounded-full",
  xl: "w-12 h-12 rounded-full border border-white/10 bg-graphite-raised flex items-center justify-center",
};

export function DataNode({
  variant = "pulse",
  size = "md",
  label,
  children,
  className,
  ...restProps
}: DataNodeProps) {
  return (
    <div className="inline-flex items-center gap-2.5" {...restProps}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 items-center justify-center transition-all duration-300",
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
      >
        {children}
      </span>
      {label && (
        <span className="font-mono text-xs font-medium tracking-wide text-soft-gray">
          {label}
        </span>
      )}
    </div>
  );
}
