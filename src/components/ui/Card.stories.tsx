import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Grid } from "../layout/Grid";
import { Card } from "./Card";

function BoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A content card with optional icon and configurable heading level. " +
          "Stacks vertically with consistent spacing between icon, title, and description.",
      },
    },
  },
  args: {
    title: "Instalación eléctrica",
    description: "Cambio de tomacorrientes y breakers.",
    headingLevel: "h3",
  },
  argTypes: {
    headingLevel: {
      control: "inline-radio",
      options: ["h2", "h3", "h4"],
      description: "Semantic heading level for the title.",
    },
    icon: {
      control: false,
      description: "Optional icon element rendered above the title.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <BoltIcon />,
  },
};

export const HeadingH2: Story = {
  args: {
    headingLevel: "h2",
    title: "Plomería",
    description: "Reparación de fugas y cambio de grifería.",
  },
};

export const HeadingH4: Story = {
  args: {
    headingLevel: "h4",
    title: "Carpintería",
    description: "Muebles a medida y reparaciones.",
  },
};

export const InGrid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid columns={3}>
      <Card
        icon={<BoltIcon />}
        title="Electricidad"
        description="Instalación y mantenimiento de sistemas eléctricos."
        headingLevel="h3"
      />
      <Card
        icon={<WrenchIcon />}
        title="Plomería"
        description="Reparación de fugas y cambio de grifería."
        headingLevel="h3"
      />
      <Card
        icon={<ShieldIcon />}
        title="Seguridad"
        description="Sistemas de alarma y monitoreo 24/7."
        headingLevel="h3"
      />
    </Grid>
  ),
};
