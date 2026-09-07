import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge only knows Tailwind core utilities out of the box.
 * Our @theme tokens (accent-indigo, accent-blue, graphite, ink, …) are
 * custom colour names that v4 generates from --color-* properties, so we
 * must tell twMerge they belong to the same conflict group as any built-in
 * bg-<color> utility — otherwise two bg-* classes from different "worlds"
 * are kept instead of the later one overriding the earlier one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-color": [
        // Base palette
        "bg-black",
        "bg-near-black",
        "bg-graphite",
        "bg-graphite-raised",
        "bg-white",
        "bg-ink",
        "bg-soft-gray",
        "bg-dark-gray",
        // Accent palette
        "bg-accent-blue",
        "bg-accent-indigo",
        "bg-accent-indigo-soft",
        "bg-accent-violet",
        // Semantic aliases
        "bg-background",
        "bg-foreground",
      ],
      "text-color": [
        // Base palette
        "text-black",
        "text-near-black",
        "text-graphite",
        "text-graphite-raised",
        "text-white",
        "text-ink",
        "text-soft-gray",
        "text-dark-gray",
        // Accent palette
        "text-accent-blue",
        "text-accent-indigo",
        "text-accent-indigo-soft",
        "text-accent-violet",
        // Semantic aliases
        "text-background",
        "text-foreground",
      ],
      "font-size": [
        "text-display-lg",
        "text-headline-lg",
        "text-headline-md",
        "text-body-lg",
        "text-body-md",
        "text-label",
        "text-code",
      ],
      // --container-page generates max-w-page, which twMerge would otherwise
      // keep alongside a core max-w-* instead of letting the later one win.
      "max-w": ["max-w-page"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
