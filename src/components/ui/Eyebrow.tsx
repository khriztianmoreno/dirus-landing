import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type EyebrowTag = "span" | "p" | "div" | "h2" | "h3" | "h4";
export type EyebrowColor = "accent" | "muted";

export type EyebrowProps = HTMLAttributes<HTMLElement> & {
  /**
   * Customizable HTML tag. Defaults to "span".
   */
  as?: EyebrowTag;
  /**
   * Color variant. Defaults to "accent" (accent-indigo-soft).
   */
  color?: EyebrowColor;
  children: ReactNode;
  className?: string;
};

const colorStyles: Record<EyebrowColor, string> = {
  accent: "text-accent-indigo-soft",
  muted: "text-soft-gray",
};

export function Eyebrow({
  as: Component = "span",
  color = "accent",
  children,
  className,
  ...restProps
}: EyebrowProps) {
  const Tag = Component as ElementType;

  return (
    <Tag
      className={cn(
        "font-mono text-label font-medium uppercase tracking-widest",
        colorStyles[color],
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  );
}
