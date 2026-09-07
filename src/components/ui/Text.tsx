import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TextVariant = "lg" | "md";
export type TextTag = "p" | "span" | "div" | "label";

export type TextProps = HTMLAttributes<HTMLElement> & {
  /**
   * Font size variant.
   * - "lg": Lead paragraph (18px)
   * - "md": Standard body text (16px, default)
   */
  variant?: TextVariant;
  /**
   * If true, applies secondary muted text color (`text-soft-gray`).
   */
  muted?: boolean;
  /**
   * HTML tag override. Defaults to "p".
   */
  as?: TextTag;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<TextVariant, string> = {
  lg: "text-body-lg",
  md: "text-body-md",
};

export function Text({
  variant = "md",
  muted = false,
  as: Component = "p",
  children,
  className,
  ...restProps
}: TextProps) {
  const Tag = Component as ElementType;

  return (
    <Tag
      className={cn(
        "font-sans",
        variantStyles[variant],
        muted ? "text-soft-gray" : "text-ink",
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  );
}

/**
 * Alias export for `Text` component to support legacy or alternative naming conventions.
 */
export const Body = Text;
