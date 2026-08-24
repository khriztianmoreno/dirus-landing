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

## Styling

Tailwind CSS v4 is wired through PostCSS (`postcss.config.mjs`) and configured **in CSS**, inside `src/app/globals.css`. There is no `tailwind.config.ts`: v4 replaced the JavaScript config with the `@theme` directive, and every custom property declared there becomes a utility class (`--color-brand-500` produces `bg-brand-500`, `text-brand-500`, …).

Brand tokens land in the `@theme` block, in the sections already marked for M02. Until then the block only carries neutral surfaces and the `next/font` wiring from `layout.tsx`.

### Content detection

v4 scans for utility classes automatically, starting from the CSS file and walking up, skipping `node_modules` and anything in `.gitignore`. `src/app/`, `src/components/` and `src/content/` are all covered with no configuration — verified by placing a file with a unique arbitrary utility in each directory and confirming the generated rule in the build output.

Explicit `@source` directives are therefore unnecessary and were deliberately not added: they would restate what already happens and drift out of date. Add one only for a directory automatic detection cannot reach — content living outside the project root, or classes coming from a dependency.

## Testing

**Vitest**, with React Testing Library and jsdom.

### Why Vitest over Jest

- **ESM and TypeScript work without a transform layer.** Next.js 16 is ESM-first; Jest still needs `babel-jest` or `ts-jest` plus `transformIgnorePatterns` maintenance to keep up with dependencies that ship ESM only. Vitest runs the same Vite pipeline the app already uses.
- **One resolver instead of two.** `vite-tsconfig-paths` reads the `@/*` alias straight from `tsconfig.json`, so path mapping cannot drift out of sync the way a hand-maintained `moduleNameMapper` does.
- **Next.js documents this path.** The framework's own testing guide covers the Vitest setup used here.

Jest remains the safer pick for a codebase with an existing Jest investment or heavy reliance on its module mocking. Neither applies to a landing page starting from zero.

**Known limitation:** Vitest cannot run `async` Server Components. Those need end-to-end tests, not unit tests.

### Coverage

`pnpm test:coverage` enforces a 90% threshold on statements, branches, functions and lines, and exits non-zero when any of them falls short — verified by dropping an uncovered module in and confirming all four thresholds fail.

> Run coverage through `pnpm test:coverage` or `pnpm test --coverage`. **`pnpm test -- --coverage` silently drops the flag**, runs without coverage and still exits 0 — it looks like a passing coverage run and is not one.

#### Coverage exceptions

- **`src/app/layout.tsx` is excluded.** It is a composition root: it renders `<html>`/`<body>` and wires `next/font`. Rendering it in jsdom asserts on framework internals rather than on our own logic, and the invalid nesting it produces in a test container makes the exercise misleading. Its behaviour is covered by the build and by end-to-end tests once those exist.

## Linting and formatting

The two tools have separate jobs and do not overlap:

- **Prettier owns formatting.** Configured in `prettier.config.mjs`, applied with `pnpm format`.
- **ESLint owns correctness and accessibility.** `eslint.config.mjs` layers the full `eslint-plugin-jsx-a11y` recommended set (34 rules) on top of `eslint-config-next`, so accessibility problems surface while writing the code rather than in an audit later.

`eslint-config-prettier` is applied **last** in the flat config. It switches off every stylistic rule the other configs enable, so the two tools can never disagree about the same line — a classic source of unfixable lint errors.

Both run in CI, so formatting drift fails the build instead of turning up as noise in someone else's diff.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request against `main` and `develop`. Steps run in order and the job stops at the first failure:

1. `pnpm install --frozen-lockfile` — fails if `pnpm-lock.yaml` is out of sync with `package.json`
2. `pnpm format:check`
3. `pnpm lint`
4. `pnpm typecheck`
5. `pnpm test:coverage` — the suite plus the 90% gate
6. `pnpm build`

The coverage report is uploaded as an artifact even when the run fails, since a failed gate is exactly when someone needs to see which lines are uncovered.

`pnpm typecheck` runs `next typegen` first: types such as `LayoutProps` are generated by Next.js into `.next/types/`, so on a clean checkout `tsc` alone would fail on globals that do not exist yet.

The Node version comes from `.nvmrc` and the pnpm version from the `packageManager` field, so CI and local development always run the same toolchain.

### Caching

Two caches, neither of them `node_modules`:

- **The pnpm store**, via `setup-node`'s `cache: pnpm`, keyed on the lockfile. `node_modules` itself is deliberately not cached: pnpm builds it out of symlinks into that store, so a restored `node_modules` without a matching store is a tree of broken links. Caching the store and re-linking with `--frozen-lockfile` is both faster and correct.
- **`.next/cache`**, so Next.js can reuse compilation work between runs instead of rebuilding from scratch.

### One note on the job name

The job is still called `Typecheck, lint and build` even though it now also formats, tests and measures coverage. Branch protection on `main` and `develop` requires that exact status check context — renaming the job leaves every pull request waiting on a check that no longer reports. Renaming it means updating both branch protection rules in the same change.

## Type safety

TypeScript runs in `strict` mode plus these additional checks, enforced by `pnpm typecheck` and by `pnpm build`:

| Flag                         | Why                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strict`                     | Enables the full strict family (`strictNullChecks`, `noImplicitAny`, …)                                                                             |
| `noUncheckedIndexedAccess`   | Indexed access (`arr[i]`, `record[key]`) yields `T \| undefined`, so out-of-range and missing-key reads must be handled instead of silently trusted |
| `noImplicitOverride`         | Class members that override a base member must say `override`, so a renamed base method fails to compile instead of quietly becoming dead code      |
| `noFallthroughCasesInSwitch` | Catches a missing `break` in a `switch`                                                                                                             |
| `noImplicitReturns`          | Every code path of a function returning a value must actually return one                                                                            |
| `useUnknownInCatchVariables` | `catch (e)` is typed `unknown`, forcing a narrowing check before use                                                                                |

### Documented exceptions

- **`exactOptionalPropertyTypes` is intentionally off.** It distinguishes "property absent" from "property set to `undefined`", which conflicts with the common React pattern of spreading optional props (`<C {...{ title }} />`) and with several third-party component typings. The friction is not worth it for a marketing site; revisit if a shared internal component library appears.
- **`noUnusedLocals` / `noUnusedParameters` are off on purpose.** ESLint already reports unused variables, and having the compiler fail on them makes intermediate states during development painful. Linting is the right layer for this, not compilation.
- **`skipLibCheck` stays on**, inherited from the Next.js default. Type-checking all of `node_modules` costs build time to surface errors in dependencies we cannot fix.

## Project structure

```
src/app/          App Router pages, layout and global styles (theme tokens)
src/components/   Reusable UI components
src/content/      Marketing copy and long-form content
public/           Static assets
```
