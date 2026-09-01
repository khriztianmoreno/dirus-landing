import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Centers content with the page max-width and responsive padding.
 * Padding comes from layout tokens: px-4 on mobile, md:px-16 on desktop.
 */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-page px-4 md:px-16", className)}>
      {children}
    </div>
  );
}
