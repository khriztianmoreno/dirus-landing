import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Design System/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Responsive heading component for titles (Display, Level 1–3). " +
          "Decouples semantic HTML tag (`h1`–`h6`) from visual sizing (`size` or `level`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["display", 1, 2, 3],
      description: "Semantic level & default visual size",
    },
    size: {
      control: "select",
      options: ["display", 1, 2, 3],
      description: "Visual size override",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"],
      description: "Semantic HTML tag override",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    level: "display",
    children: "Infrastructure for Brokers",
  },
};

export const Level1: Story = {
  args: {
    level: 1,
    children: "Primary Section Heading",
  },
};

export const Level2: Story = {
  args: {
    level: 2,
    children: "Secondary Sub-section Heading",
  },
};

export const Level3: Story = {
  args: {
    level: 3,
    children: "Card or Component Title",
  },
};

export const SemanticTagOverride: Story = {
  args: {
    level: 1,
    as: "h3",
    children: "Visual Level 1 rendered as semantic H3 tag",
  },
};
