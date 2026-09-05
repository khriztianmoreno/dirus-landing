import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadingLevel = "display" | 1 | 2 | 3;
export type HeadingTag =
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * Semantic hierarchy level. Defines default HTML tag and default visual size.
   * - "display": Hero headline (defaults to h1, text-display-lg on desktop)
   * - 1: Primary section heading (defaults to h1, text-headline-lg on desktop)
   * - 2: Sub-section heading (defaults to h2, text-headline-md)
   * - 3: Card or component title (defaults to h3, text-body-lg)
   */
  level?: HeadingLevel;
  /**
   * Optional visual size override. Allows visual level to differ from semantic `level`.
   */
  size?: HeadingLevel;
  /**
   * Optional HTML tag override. Decouples semantic markup from visual styling.
   */
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
};

const defaultTagMap: Record<HeadingLevel, HeadingTag> = {
  display: "h1",
  1: "h1",
  2: "h2",
  3: "h3",
};

const sizeStyles: Record<HeadingLevel, string> = {
  display:
    "text-headline-md md:text-display-lg font-bold -tracking-[0.04em] text-white",
  1: "text-headline-md md:text-headline-lg font-semibold -tracking-[0.02em] text-ink",
  2: "text-headline-md font-medium -tracking-[0.01em] text-ink",
  3: "text-body-lg font-medium tracking-normal text-ink",
};

export function Heading({
  level = 1,
  size,
  as,
  children,
  className,
  ...restProps
}: HeadingProps) {
  const Component = (as || defaultTagMap[level]) as ElementType;
  const visualSize = size ?? level;

  return (
    <Component className={cn(sizeStyles[visualSize], className)} {...restProps}>
      {children}
    </Component>
  );
}
