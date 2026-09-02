import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The primary call to action. Renders a `<button>` by default, or a " +
          'Next `<Link>` with `as="a"`, which then requires `href`. Links ' +
          "cannot be disabled natively, so any CTA that needs a disabled " +
          "state has to stay in button mode.",
      },
    },
  },
  args: {
    children: "Request a demo",
    variant: "primary",
    showArrow: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
      description: "Which colour token pair the button wears.",
    },
    showArrow: {
      control: "boolean",
      description: "Appends a decorative arrow that slides on hover.",
    },
    disabled: {
      control: "boolean",
      description: 'Button mode only. Ignored when `as="a"`.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const WithArrow: Story = {
  args: { showArrow: true },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story:
          "Pointer events are off and opacity drops, but the element stays " +
          "in the accessibility tree as a disabled button rather than " +
          "disappearing from it.",
      },
    },
  },
};

export const AsLink: Story = {
  args: { as: "a", href: "/contact", showArrow: true },
  parameters: {
    docs: {
      description: {
        story:
          "Same skin, different element. It renders a real anchor, so it " +
          "reaches the keyboard, the context menu and open-in-new-tab.",
      },
    },
  },
};

/** Both variants together, which is the only way to judge whether they still belong to one family. */
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

/**
 * The focus ring only appears for keyboard users, because the base styles use
 * `focus-visible` and not `focus`. A screenshot cannot show that, so this
 * story tabs to the button and leaves it focused.
 */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Request a demo" });

    await userEvent.tab();

    await expect(button).toHaveFocus();
  },
};
