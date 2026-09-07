import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Design System/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text component for body copy (`lg` for lead paragraphs, `md` for standard body text). " +
          "Supports muted color variant and tag override via `as`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["md", "lg"],
      description: "Typography size variant",
    },
    muted: {
      control: "boolean",
      description: "Apply muted soft gray color",
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "label"],
      description: "HTML tag override",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "md",
    children: "Quote, bind and renew without leaving the platform.",
  },
};

export const LeadParagraph: Story = {
  args: {
    variant: "lg",
    children: "Quote, bind and renew without leaving the platform.",
  },
};

export const Muted: Story = {
  args: {
    variant: "md",
    muted: true,
    children: "Secondary and supporting body text across the interface.",
  },
};
