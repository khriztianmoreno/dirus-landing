import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

export function Card({
  title,
  description,
  icon,
  headingLevel: Heading = "h3",
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded border border-dark-gray bg-transparent p-6 transition-colors hover:border-soft-gray",
        className,
      )}
    >
      {icon && (
        <span aria-hidden="true" className="text-accent-indigo">
          {icon}
        </span>
      )}
      <Heading className="font-mono text-sm font-medium tracking-wide text-ink">
        {title}
      </Heading>
      <p className="text-sm text-soft-gray">{description}</p>
    </div>
  );
}
