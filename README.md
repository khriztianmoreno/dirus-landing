# DIRUS — Landing Page

Marketing landing page for **DIRUS**, the Autonomous Execution Operating System for insurance brokers, agencies and MGAs.

This repository contains **only the public website**. The DIRUS platform itself (agents, workflows, WhatsApp integration) lives outside this repo.

## What is DIRUS

Traditional CRMs demand constant manual data entry that advisors reject. DIRUS works the other way around: an **invisible interface** built on AI and WhatsApp that absorbs the heavy administrative work of an insurance agency.

The goal, from first principles, is to turn the broker into an **operationally superhuman** one — breaking the linear relationship between policies under management and administrative hours, so a commercial team can multiply its capacity and premium volume without growing payroll.

### Core pillars (MVP)

- **Multimodal ingestion over WhatsApp (Ingestion Agent)** — Clients and brokers forward voice notes, photos of vehicle registrations, ID cards or PDFs to the system's WhatsApp number. The multimodal agent turns that chaos into clean structured data (name, ID, plate, coverage dates) in seconds and validates it.
- **Zero-touch renewals (Renewal Agent)** — The heart of the business. A long-running workflow detects policies expiring in 30–45 days, checks whether the premium is still competitive, and runs contextual WhatsApp campaigns with the end client that end in a direct payment link. It handles objections autonomously and escalates to the human broker only on real friction.
- **Broker Copilot** — An AI assistant that lets the broker run the business by voice or chat instead of navigating dashboards: reminders, the week's renewals, or a personalized message drafted straight from a WhatsApp audio.

### Later phases

- **AI claims handling, 24/7** — The client reports an incident over WhatsApp. The AI guides the report, requests photos, assesses damage with computer vision, validates coverage and deductibles, and approves repair-shop orders or reimbursements in minutes. Severe or injury claims trigger emergency protocols and escalate to a human adjuster with the case file already written.
- **Autonomous cross-selling on life events** — The AI watches conversation threads for personal milestones (a move, an upcoming trip) and generates hyper-personalized proposals — home or travel coverage — raising portfolio LTV without human effort.
- **Intelligent document hub** — A unified repository where the AI organizes policies, riders, terms, endorsements and identity documents per client, and answers complex natural-language questions about coverage and deductibles without anyone opening a PDF.

### Strategic differentiators

- **Exception-based invisible interface** — The broker never logs in to record data. DIRUS runs silently in the background and surfaces work through a unified inbox (Chatwoot) only for the ~5% of interactions that need empathy, signatures or human judgment.
- **Data flywheel as a moat** — Every broker correction in chat feeds the trace system, training proprietary models on local jargon, objections and claims patterns — a barrier generalist tooling cannot replicate.
- **Low-cost infrastructure** — Agent orchestration with long-running, pausable workflows (Mastra), async queues for heavy audio processing (Trigger.dev), transactional database with vectors (Neon/pgvector), and a direct connection to Meta's WhatsApp Cloud API to avoid intermediary fees.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript 5
- pnpm as the only package manager

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm` and `yarn` installs are blocked by the `preinstall` guard — this project is pnpm-only, pinned via the `packageManager` field.

## Scripts

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start the development server |
| `pnpm build` | Production build             |
| `pnpm start` | Serve the production build   |
| `pnpm lint`  | Run ESLint                   |

## Project structure

```
src/app/        App Router pages, layout and global styles
public/         Static assets
```
