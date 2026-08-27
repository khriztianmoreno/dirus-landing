import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

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
 * Colours come from the "Obsidian Infrastructure" tokens in globals.css, never
 * as raw hex: `accent-indigo` for the primary action, `accent-blue` for the
 * focus ring (the token reserved for focus rings and live-state glows), and
 * `graphite` as the ring offset so the halo reads against the page surface.
 */
const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded px-6 py-3 font-mono text-sm font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-graphite disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent-indigo text-white hover:bg-accent-indigo/90",
  secondary:
    "border border-dark-gray bg-transparent text-ink hover:border-soft-gray hover:bg-white/5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    showArrow = false,
    children,
    className,
    as,
    ...rest
  } = props;

  const classes = [baseStyles, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {showArrow && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  );

  if (as === "a") {
    const { href, ...anchorRest } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "children"
    > & { href: string };

    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  // Default to type="button" so a Button dropped inside a <form> does not
  // submit it by accident; a caller that wants a submit button passes
  // type="submit" and the spread below wins.
  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
