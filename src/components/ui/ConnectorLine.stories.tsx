import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConnectorLine } from "./ConnectorLine";

const meta: Meta<typeof ConnectorLine> = {
  title: "Design System/ConnectorLine",
  component: ConnectorLine,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Scalable SVG connector line primitive for connecting visual nodes, layers, and workflow steps. " +
          "Supports horizontal, vertical, and 90-degree orthogonal orientations, dashed styling, and animated data pulse flow.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    orientation: "horizontal",
    color: "secondary",
    variant: "solid",
    animated: true,
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical", "orthogonal"],
      description: "Path direction orientation",
    },
    color: {
      control: "radio",
      options: ["accent", "secondary", "muted", "error"],
      description: "Stroke color variant",
    },
    variant: {
      control: "radio",
      options: ["solid", "dashed"],
      description: "Stroke line style",
    },
    animated: {
      control: "boolean",
      description: "Animate data signal pulse along line path",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConnectorLine>;

export const Horizontal: Story = {
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div className="h-48 w-12 p-4">
        <Story />
      </div>
    ),
  ],
};

export const Orthogonal: Story = {
  args: {
    orientation: "orthogonal",
  },
  decorators: [
    (Story) => (
      <div className="h-48 w-80 p-4">
        <Story />
      </div>
    ),
  ],
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
    color: "muted",
    animated: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    ),
  ],
};
