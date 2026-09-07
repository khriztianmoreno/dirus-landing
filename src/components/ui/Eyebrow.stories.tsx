import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Eyebrow } from "./Eyebrow";

const meta: Meta<typeof Eyebrow> = {
  title: "Design System/Eyebrow",
  component: Eyebrow,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Eyebrow pre-header component used above section titles. " +
          "Applies uppercase monospace styling with subtle label sizing (`--text-label`).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "radio",
      options: ["accent", "muted"],
      description: "Color token variant",
    },
    as: {
      control: "select",
      options: ["span", "p", "div", "h2", "h3"],
      description: "Semantic HTML tag",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "PLATFORM ARCHITECTURE",
  },
};

export const Muted: Story = {
  args: {
    color: "muted",
    children: "SYSTEM LOGS",
  },
};

export const CustomTag: Story = {
  args: {
    as: "p",
    children: "SECTION SUB-HEADER",
  },
};
