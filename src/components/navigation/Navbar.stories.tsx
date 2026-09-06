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
          "Sticky desktop navigation header featuring the DIRUS brand logo, section scroll links, language switcher (ES / EN), and primary CTA. " +
          "Transitions smoothly between transparent top state and glassmorphic backdrop-blurred sticky state on scroll.",
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
    scrolled: {
      control: "boolean",
      description: "Manual override for sticky scrolled state",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const AtRestTopState: Story = {
  name: "At Rest (Top of Page)",
  args: {
    locale: "es",
    copy: esNav,
    scrolled: false,
  },
};

export const ScrolledStickyState: Story = {
  name: "Scrolled (Sticky Glassmorphic)",
  args: {
    locale: "es",
    copy: esNav,
    scrolled: true,
  },
};

export const EnglishLocale: Story = {
  args: {
    locale: "en",
    copy: enNav,
  },
};

export const ScrollTransitionDemo: Story = {
  name: "Live Scroll Transition",
  render: (args) => (
    <div className="min-h-[200vh] bg-graphite p-8 pt-32 text-ink">
      <Navbar {...args} />
      <div className="mx-auto max-w-3xl space-y-12 py-12">
        <h1 className="font-sans text-3xl font-bold text-white">
          Scroll Down to Test Sticky Transition
        </h1>
        <p className="text-soft-gray">
          As you scroll past 20px, the header smoothly transitions from a
          transparent layout to a glassmorphic blurred sticky bar with a subtle
          border and elevation shadow.
        </p>
        <div className="h-[1200px] rounded-xl border border-white/10 bg-graphite-raised/50 p-8">
          <p className="font-mono text-sm text-accent-indigo-soft">
            Page content container for testing sticky navigation scrolling
            behavior...
          </p>
        </div>
      </div>
    </div>
  ),
};
