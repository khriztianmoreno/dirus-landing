import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Problem } from "./Problem";

const meta: Meta<typeof Problem> = {
  title: "Sections/Problem",
  component: Problem,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spanish: Story = {
  args: {
    dictionary: getDictionary("es"),
  },
};

export const English: Story = {
  args: {
    dictionary: getDictionary("en"),
  },
};
