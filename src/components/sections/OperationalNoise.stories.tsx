import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { OperationalNoise } from "./OperationalNoise";

const meta: Meta<typeof OperationalNoise> = {
  title: "Sections/OperationalNoise",
  component: OperationalNoise,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Spanish: Story = {
  args: {
    nodes: getDictionary("es").home.problem.chaos.nodes,
    centerLabel: getDictionary("es").home.problem.chaos.center,
  },
};

export const English: Story = {
  args: {
    nodes: getDictionary("en").home.problem.chaos.nodes,
    centerLabel: getDictionary("en").home.problem.chaos.center,
  },
};
