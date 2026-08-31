import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type SharedProps = {
  variant?: ButtonVariant;
  showArrow?: boolean;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    as?: "button";
  };

/**
 * Links can't be disabled natively — use the button mode (`as="button"`,
 * the default) for any CTA that needs a disabled state.
 */
type ButtonAsLink = SharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/*
 * Every Button shares one base string; a variant only swaps colour tokens.
 * That split is what keeps primary and secondary from drifting apart as the
 * component grows — there is exactly one place to change padding, radius,
 * typography or the focus ring.
 *
 * Colours come from the "Obsidian Infrastructure" tokens in globals.css,
 * never as raw hex: `accent-indigo` for the primary action, `accent-blue`
 * for the focus ring, and `background` as the ring offset so the halo reads
 * against the real page surface, whatever it is today or after the theme
 * ticket lands.
 */
const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded px-6 py-3 font-mono text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-indigo text-ink hover:bg-accent-indigo/90",
  secondary:
    "border border-dark-gray bg-transparent text-ink hover:border-soft-gray hover:bg-white/5",
};

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-block transition-transform group-hover:translate-x-0.5"
    >
      →
    </span>
  );
}

export function Button(props: ButtonProps) {
  if (props.as === "a") {
    const {
      as: _as,
      variant = "primary",
      showArrow = false,
      children,
      className,
      href,
      ...anchorRest
    } = props;

    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...anchorRest}
      >
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  const {
    as: _as,
    variant = "primary",
    showArrow = false,
    children,
    className,
    type = "button",
    ...buttonRest
  } = props;

  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...buttonRest}
    >
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
