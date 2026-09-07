import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LayerStack } from "./LayerStack";

const meta: Meta<typeof LayerStack> = {
  title: "Design System/LayerStack",
  component: LayerStack,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Layered architecture visual primitive for rendering stacked systems (e.g. Business Input Layer, DIRUS Intelligence Layer, Core Infrastructure). " +
          "Supports badges, highlights, custom content slots, and vertical connecting flow lines.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    showConnectors: true,
    layers: [
      {
        id: "business",
        title: "YOUR BUSINESS",
        subtitle: "Input Layer",
        badge: "Channels",
        variant: "ghost",
        content: (
          <div className="flex gap-4 font-mono text-xs text-soft-gray">
            <span>Email</span> • <span>WhatsApp</span> • <span>PDF Docs</span>
          </div>
        ),
      },
      {
        id: "dirus",
        title: "DIRUS",
        subtitle: "Intelligence Layer",
        badge: "Autonomous OS",
        variant: "highlight",
        content: (
          <p className="font-sans text-xs text-soft-gray">
            Unified execution layer handling routing, extraction, and
            compliance.
          </p>
        ),
      },
      {
        id: "systems",
        title: "CORE SYSTEMS",
        subtitle: "Output Layer",
        badge: "Integrations",
        variant: "default",
        content: (
          <div className="flex gap-4 font-mono text-xs text-soft-gray">
            <span>CRMs</span> • <span>Carrier APIs</span> •{" "}
            <span>Databases</span>
          </div>
        ),
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof LayerStack>;

export const Default: Story = {};

export const WithoutConnectors: Story = {
  args: {
    showConnectors: false,
  },
};
