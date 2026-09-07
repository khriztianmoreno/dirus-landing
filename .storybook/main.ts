import type { StorybookConfig } from "@storybook/nextjs-vite";

/**
 * Stories live next to the code they document, not in a parallel tree, so a
 * component and its story move and get deleted together.
 *
 * The framework is the Vite flavour rather than the webpack one: the project
 * already runs Vite through Vitest, so this reuses that toolchain instead of
 * introducing a second bundler with its own resolution rules.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  core: {
    // This is a client project; nothing about the component tree needs to
    // leave the machine it builds on.
    disableTelemetry: true,
  },
};

export default config;
