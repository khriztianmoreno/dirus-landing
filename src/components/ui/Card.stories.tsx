import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Grid } from "@/components/layout/Grid";
import { Card } from "./Card";

function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function SupportAgentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function AssignmentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
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

function PaymentsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Content card component featuring an optional icon header, eyebrow label, title, and description text. " +
          "Maintains vertical alignment with generous spacing and ghost border hover state in the Obsidian Infrastructure aesthetic.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    eyebrow: "AUTO-EXTRACTION",
    title: "Quote Processing",
    headingLevel: "h3",
  },
  argTypes: {
    eyebrow: {
      control: "text",
      description: "Optional uppercase monospace eyebrow tag",
    },
    title: {
      control: "text",
      description: "Card title text",
    },
    description: {
      control: "text",
      description: "Optional supporting description copy",
    },
    headingLevel: {
      control: "inline-radio",
      options: ["h2", "h3", "h4"],
      description: "Semantic heading level for title element",
    },
    icon: {
      control: false,
      description: "Optional decorative icon element rendered at top of card",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    eyebrow: "AUTO-EXTRACTION",
    title: "Quote Processing",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <DocumentIcon />,
    eyebrow: "AUTO-EXTRACTION",
    title: "Quote Processing",
  },
};

export const WithDescription: Story = {
  args: {
    icon: <ShieldIcon />,
    eyebrow: "RESOLUTION",
    title: "Claims Routing",
    description: "Intelligent categorization and automated carrier submission.",
  },
};

export const HeadingH2: Story = {
  name: "Heading level h2",
  args: {
    headingLevel: "h2",
    eyebrow: "PROACTIVE",
    title: "Renewals",
    description: "Automated policy renewal tracking and client notifications.",
  },
};

export const HeadingH4: Story = {
  name: "Heading level h4",
  args: {
    headingLevel: "h4",
    eyebrow: "OMNICHANNEL",
    title: "Follow-ups",
    description:
      "Cross-platform automated messaging across email and messaging channels.",
  },
};

export const InGrid: Story = {
  parameters: {
    layout: "padded",
    controls: { disable: true },
  },
  render: () => (
    <Grid columns={3}>
      <Card
        icon={<DocumentIcon />}
        eyebrow="AUTO-EXTRACTION"
        title="Quote Processing"
        headingLevel="h3"
      />
      <Card
        icon={<HistoryIcon />}
        eyebrow="PROACTIVE"
        title="Renewals"
        headingLevel="h3"
      />
      <Card
        icon={<SupportAgentIcon />}
        eyebrow="OMNICHANNEL"
        title="Follow-ups"
        headingLevel="h3"
      />
      <Card
        icon={<AssignmentIcon />}
        eyebrow="COMPLIANCE"
        title="Docs"
        headingLevel="h3"
      />
      <Card
        icon={<ShieldIcon />}
        eyebrow="RESOLUTION"
        title="Claims Routing"
        description="Intelligent categorization and automated carrier submission."
        headingLevel="h3"
      />
      <Card
        icon={<PaymentsIcon />}
        eyebrow="FINANCE"
        title="Collections"
        headingLevel="h3"
      />
    </Grid>
  ),
};
