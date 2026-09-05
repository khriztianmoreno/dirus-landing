import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { nav as enNav } from "@/content/en/nav";
import { nav as esNav } from "@/content/es/nav";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Desktop navigation header featuring the DIRUS brand logo, section scroll links, language switcher (ES / EN), and primary CTA. " +
          "Maintains glassmorphic backdrop blur and responsive layout.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    locale: "es",
    copy: esNav,
  },
  argTypes: {
    locale: {
      control: "inline-radio",
      options: ["es", "en"],
      description: "Active locale key",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const SpanishLocale: Story = {
  args: {
    locale: "es",
    copy: esNav,
  },
};

export const EnglishLocale: Story = {
  args: {
    locale: "en",
    copy: enNav,
  },
};
