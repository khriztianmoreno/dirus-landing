import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Heading } from "./Heading";
import { Text } from "./Text";

export type CardProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  icon?: ReactNode;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

export function Card({
  title,
  description,
  eyebrow,
  icon,
  headingLevel: HeadingTag = "h3",
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between gap-6 rounded-lg border border-dark-gray bg-near-black/60 p-6 md:p-8 transition-all duration-300 hover:border-soft-gray",
        className,
      )}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="text-soft-gray transition-colors group-hover:text-accent-indigo-soft"
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-2">
        {eyebrow && <Eyebrow color="accent">{eyebrow}</Eyebrow>}
        <Heading
          level={3}
          as={HeadingTag}
          className="font-sans text-body-lg font-semibold tracking-tight text-ink"
        >
          {title}
        </Heading>
        {description && (
          <Text muted variant="md" className="mt-1">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}
