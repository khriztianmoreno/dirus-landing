import type { Preview } from "@storybook/nextjs-vite";
import { Geist, JetBrains_Mono } from "next/font/google";

import "../src/app/globals.css";

/*
 * The same two families the root layout loads, declared the same way.
 *
 * Storybook never renders app/[locale]/layout.tsx, so without this the
 * --font-* custom properties are undefined and every component silently
 * falls back to the system stack — which is exactly the class of bug this
 * design system already shipped once. Stories have to render with the fonts
 * production uses, or they document something nobody will ever see.
 *
 * One difference worth knowing: `next build` self-hosts these files under
 * .next/static/media, while the Storybook build emits @font-face rules that
 * point at fonts.gstatic.com. Storybook therefore needs network access to
 * show the real faces, and falls back to the system stack offline. That is
 * fine for a documentation tool, but it is not the production loading path,
 * so Storybook is not the place to judge font performance.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    // Named after the tokens rather than the colours, so renaming a token
    // here fails loudly instead of leaving a stale hex behind.
    backgrounds: {
      options: {
        background: { name: "background", value: "#0a0a0a" },
        graphite: { name: "graphite", value: "#141313" },
        white: { name: "white", value: "#ffffff" },
      },
    },
    a11y: { test: "todo" },
  },
  initialGlobals: {
    backgrounds: { value: "background" },
  },
  decorators: [
    (Story) => (
      <div
        className={`${geistSans.variable} ${jetbrainsMono.variable} text-foreground font-body`}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
