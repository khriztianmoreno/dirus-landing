import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof NextLink>;

const linkStyles =
  "inline-flex items-center gap-1 text-accent-indigo-soft underline underline-offset-2 transition-colors duration-150 hover:text-white hover:decoration-white active:text-accent-indigo-soft";

export function Link({
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  const computedRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;

  return (
    <NextLink
      className={cn(linkStyles, className)}
      target={target}
      rel={computedRel}
      {...props}
    >
      {children}
    </NextLink>
  );
}
