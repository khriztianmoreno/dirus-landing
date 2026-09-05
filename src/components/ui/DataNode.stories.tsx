import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DataNode } from "./DataNode";

const meta: Meta<typeof DataNode> = {
  title: "Design System/DataNode",
  component: DataNode,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visual data node primitive for displaying data pulses, active indicators, status dots, and icon nodes. " +
          "Supports pulse animation, label rendering, and multiple sizes.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "pulse",
    size: "md",
    label: "Status: Live Signal",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["pulse", "accent", "muted", "error"],
      description: "Visual style variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Node size dimensions",
    },
    label: {
      control: "text",
      description: "Optional label text displayed alongside node",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataNode>;

export const Default: Story = {};

export const Pulse: Story = {
  args: {
    variant: "pulse",
    size: "md",
    label: "System Active",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    size: "lg",
    label: "Connected Node",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    size: "sm",
    label: "Offline Signal",
  },
};

export const ErrorState: Story = {
  args: {
    variant: "error",
    size: "md",
    label: "High Noise Level",
  },
};

export const IconContainerNode: Story = {
  args: {
    variant: "pulse",
    size: "xl",
  },
  render: (args) => (
    <DataNode {...args}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </DataNode>
  ),
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <DataNode variant="pulse" size="sm" label="Pulse (sm)" />
      <DataNode variant="pulse" size="md" label="Pulse (md)" />
      <DataNode variant="accent" size="lg" label="Accent (lg)" />
      <DataNode variant="muted" size="md" label="Muted (md)" />
      <DataNode variant="error" size="md" label="Error (md)" />
    </div>
  ),
};
