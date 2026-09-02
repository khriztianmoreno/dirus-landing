import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof NextLink> & {
  className?: string;
};

const linkStyles =
  "inline-flex items-center gap-1 text-accent-indigo-soft underline underline-offset-2 transition-colors duration-150 hover:text-white hover:decoration-white active:text-accent-indigo-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink className={cn(linkStyles, className)} {...props}>
      {children}
    </NextLink>
  );
}
