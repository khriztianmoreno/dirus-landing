import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interactive button component for primary and secondary calls to action. " +
          'Renders a native `<button>` by default or a Next.js `<Link>` when `as="a"` (with required `href`). ' +
          "Supports optional trailing arrow indicator and disabled state for button mode.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Request a demo",
    variant: "primary",
    showArrow: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
      description: "Color token variant",
    },
    showArrow: {
      control: "boolean",
      description:
        "Appends a decorative directional arrow indicator that animates on hover",
    },
    as: {
      control: "inline-radio",
      options: ["button", "a"],
      description:
        "Element type to render (`button` for actions, `a` for links)",
    },
    disabled: {
      control: "boolean",
      description: 'Disabled state (button mode only; ignored when `as="a"`)',
    },
    children: {
      control: "text",
      description: "Button content label or elements",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Read the docs",
  },
};

export const WithArrow: Story = {
  args: {
    showArrow: true,
    children: "Get started",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Unavailable",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state for native button mode. Disables pointer events and reduces opacity, remaining accessible in the DOM tree.",
      },
    },
  },
};

export const AsLink: Story = {
  args: {
    as: "a",
    href: "/contact",
    showArrow: true,
    children: "Contact sales",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renders as a Next.js Link / HTML anchor element (`<a>`). Provides native link behavior while sharing identical button styling.",
      },
    },
  },
};

/** Both variants displayed together for visual comparison across primary, secondary, arrow, and disabled states. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Request a demo</Button>
      <Button variant="secondary">Read the docs</Button>
      <Button variant="primary" showArrow>
        Get started
      </Button>
      <Button variant="secondary" disabled>
        Unavailable
      </Button>
    </div>
  ),
};

/** Focus ring behavior test for keyboard navigation (`focus-visible`). */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Request a demo" });

    await userEvent.tab();

    await expect(button).toHaveFocus();
  },
};
