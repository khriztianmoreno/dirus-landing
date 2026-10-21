import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Sections/Hero",
  component: Hero,
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
