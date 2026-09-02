import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/*
 * A specimen sheet for the "Obsidian Infrastructure" type scale.
 *
 * Nothing here hardcodes a size. Each row renders with its real utility class
 * and then reads back what the browser actually computed, so the numbers on
 * screen cannot drift away from globals.css — if a token changes, this page
 * changes with it. A specimen that restates the values by hand is just a
 * second copy of the tokens waiting to go stale.
 */

type Specimen = {
  utility: string;
  usage: string;
  sample: string;
};

const SCALE: Specimen[] = [
  {
    utility: "text-display-lg",
    usage: "Hero headline. One per page.",
    sample: "Infrastructure",
  },
  {
    utility: "text-headline-lg",
    usage: "Section headline on desktop.",
    sample: "Built for brokers",
  },
  {
    utility: "text-headline-md",
    usage: "Sub-section headline, and the mobile size for the one above.",
    sample: "How it works",
  },
  {
    utility: "text-body-lg",
    usage: "Lead paragraph directly under a headline.",
    sample: "Quote, bind and renew without leaving the platform.",
  },
  {
    utility: "text-body-md",
    usage: "Default body copy.",
    sample: "Quote, bind and renew without leaving the platform.",
  },
  {
    utility: "text-label",
    usage: "Eyebrow, caption, form label.",
    sample: "PLATFORM",
  },
  {
    utility: "text-code",
    usage: "Inline code and monospace UI labels.",
    sample: "npm install dirus",
  },
];

function useComputedType(): [
  React.RefObject<HTMLParagraphElement | null>,
  string,
] {
  const ref = useRef<HTMLParagraphElement>(null);
  const [metrics, setMetrics] = useState("measuring…");

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { fontSize, lineHeight } = getComputedStyle(element);
    setMetrics(`${fontSize} / ${lineHeight}`);
  }, []);

  return [ref, metrics];
}

function Row({ utility, usage, sample }: Specimen) {
  const [ref, metrics] = useComputedType();

  return (
    <div className="border-dark-gray flex flex-col gap-2 border-b py-6 last:border-b-0">
      <div className="text-soft-gray flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs">
        <code className="text-accent-indigo-soft">{utility}</code>
        <span>{metrics}</span>
        {/*
         * dark-gray reads as "secondary" against a light surface, but on the
         * near-black page background it drops under the WCAG contrast floor.
         * Hierarchy here comes from the accent on the utility name instead.
         */}
        <span>{usage}</span>
      </div>
      <p className={`${utility} text-ink`} ref={ref}>
        {sample}
      </p>
    </div>
  );
}

function Sheet({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl p-8">{children}</div>;
}

const meta: Meta = {
  title: "Design System/Typography",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Every size in the scale, rendered with its own utility class and " +
          "labelled with the size the browser actually computed. Sizes are " +
          "declared in rem so they scale with the reader's browser font " +
          "preference; each one carries its line height, so a size utility " +
          "renders correctly on its own.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <Sheet>
      {SCALE.map((specimen) => (
        <Row key={specimen.utility} {...specimen} />
      ))}
    </Sheet>
  ),
};

/**
 * Two families, loaded by next/font in the root layout and exposed as tokens.
 * `font-body` and `font-code` are the design system names; `font-sans` and
 * `font-mono` are Tailwind's own keys, pointed at the same two families so a
 * utility written either way resolves to a font that is actually loaded.
 */
export const Families: Story = {
  render: () => (
    <Sheet>
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-soft-gray font-mono text-xs">
            <code className="text-accent-indigo-soft">font-body</code> — Geist
          </p>
          <p className="text-ink font-body text-body-lg">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>
        <div>
          <p className="text-soft-gray font-mono text-xs">
            <code className="text-accent-indigo-soft">font-code</code> —
            JetBrains Mono
          </p>
          <p className="text-ink font-code text-body-lg">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>
      </div>
    </Sheet>
  ),
};
