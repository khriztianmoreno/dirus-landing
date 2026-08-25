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

### Requirements

| Tool    | Version                   | Why                                           |
| ------- | ------------------------- | --------------------------------------------- |
| Node.js | 22 (see `.nvmrc`)         | `nvm use` picks it up automatically           |
| pnpm    | 10 (see `packageManager`) | `corepack enable` installs the pinned version |

This project is **pnpm-only**. `npm install` and `yarn install` fail on purpose, through the `preinstall` guard — a second lockfile in the tree would let two developers resolve different dependency versions from the same commit.

### Running it

```bash
git clone git@github.com:khriztianmoreno/dirus-landing.git
cd dirus-landing
nvm use          # or install Node 22 by other means
corepack enable  # makes pnpm 10 available
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You land on `/es`; `/en` serves the English variant.

### Before you push

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm test:coverage && pnpm build
```

That is the same sequence CI runs, in the same order. Running it locally turns a ten-minute round trip through CI into ten seconds.

## Environment variables

**There are none, and nothing here reads `process.env`.** The site is fully static: copy lives in `src/content/`, and there is no API, database or third-party service behind it yet. No `.env` file is needed to run or build the project.

Two things will need one, and neither is decided yet:

| Variable               | Needed for                                                                                            | Blocked on            |
| ---------------------- | ----------------------------------------------------------------------------------------------------- | --------------------- |
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, so Open Graph and canonical URLs resolve against the real domain instead of localhost | The production domain |
| Analytics key          | Whatever analytics tool gets chosen                                                                   | That choice           |

When the first one arrives, add it to `.env.example` with a comment, commit that file, and keep `.env.local` out of git — it is already ignored.

## Scripts

| Command              | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `pnpm dev`           | Start the development server on http://localhost:3000 |
| `pnpm build`         | Production build (also type-checks)                   |
| `pnpm start`         | Serve the production build — run `build` first        |
| `pnpm test`          | Run the test suite once                               |
| `pnpm test:watch`    | Re-run tests as files change                          |
| `pnpm test:coverage` | Run tests and enforce the 90% coverage gate           |
| `pnpm lint`          | Run ESLint (correctness and accessibility)            |
| `pnpm format`        | Format the codebase with Prettier                     |
| `pnpm format:check`  | Verify formatting without writing — what CI runs      |
| `pnpm typecheck`     | Generate route types, then run `tsc --noEmit`         |

`preinstall` is a guard, not a script anyone runs: it blocks `npm` and `yarn` installs.

## Contributing

### 1. Branch from `develop`

`main` is the production branch; `develop` is where work integrates. Never commit to either directly — both are protected, and a direct push bypasses every check in this README.

```bash
git switch develop && git pull
git switch -c <type>/<short-description>
```

Branch names use the commit type as their prefix: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`, `test/`, `ci/`.

### 2. Commit in work units

[Conventional Commits](https://www.conventionalcommits.org): `type(scope): description`.

**This is enforced, not suggested.** A `commit-msg` hook runs [commitlint](https://commitlint.js.org/) against `commitlint.config.mjs`, so a malformed message is rejected before the commit exists. The same check runs in CI over every commit in a pull request, because `--no-verify` skips the hook and a rule that can be skipped silently is a rule nobody follows.

Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`. Subjects are capped at 72 characters — past that GitHub truncates them in list views. Scopes are optional: a change that genuinely spans the repo should not have to invent one. Merge commits are exempt, since their format is GitHub's, not yours.

A commit is one deliverable change, not one file type. Tests belong with the behaviour they verify, and documentation belongs with the change it explains — a separate "update docs" commit misrepresents when the decision was made.

Write the _why_ in the body. The diff already shows what changed; what it cannot show is the alternative you rejected and the reason.

### 3. Open a pull request against `develop`

```bash
git push -u origin <your-branch>
gh pr create --base develop
```

The PR must state what changed and how you verified it. If a step could not be verified, say so — an unverified claim in a PR description is worse than an admitted gap, because it stops the reviewer from looking.

Open it as a **draft** when the branch will carry several commits: CI then validates every push instead of only the final one.

### 4. Green CI, then review

Branch protection requires the `Typecheck, lint and build` status check and one approving review. GitHub does not let you approve your own pull request, so a solo change needs a second pair of eyes or an explicit admin merge.

## Troubleshooting

Every entry below is something that actually happened while building this repo.

### `pnpm test -- --coverage` reports no coverage

pnpm swallows the `--`, so the flag never reaches Vitest. The suite runs without coverage **and exits 0** — it looks like a passing coverage run and is not one.

Use `pnpm test:coverage`, which is what CI runs.

### `npm install` fails with `Cannot read properties of null (reading 'matches')`

You ran `npm install` in a pnpm-only project. The install does fail — which is the point — but npm 10 crashes on this dependency tree before it reaches the `preinstall` guard, so you never see the guard's actual message. Running `npx only-allow pnpm` on its own prints it:

```
Use "pnpm install" for installation in this project.
```

Use `pnpm install`. If pnpm is missing, `corepack enable` installs the pinned version.

The cryptic error is documented here rather than explained, because the crash comes from inside npm and the cause was not worth chasing: the fix is the same either way.

### Typecheck fails on `LayoutProps` / `PageProps` after moving route files

`.next/types/` still describes the old routes. Those globals are generated by Next.js, so a stale `.next` reports errors for files that no longer exist.

```bash
rm -rf .next && pnpm typecheck
```

### Coverage fails on branches you cannot reach

Usually a `?? ""` or `?.` added to satisfy `noUncheckedIndexedAccess` on an expression that can never actually be nullish. The fix is deleting the unreachable branch, not lowering the threshold or ignoring the line — a branch no input can reach is dead code, and the gate is right to flag it.

### A pull request waits forever on a status check

Branch protection requires the exact context `Typecheck, lint and build`. Renaming the CI job leaves every PR waiting on a check that no longer reports. Renaming means updating the job and both branch protection rules in the same change.

### A commit is rejected when merging to `main`

`main` requires signed commits. Configure SSH or GPG signing before promoting work there; `develop` does not require it.

### commitlint warns about `footer-leading-blank` on a perfectly good message

A line in your body starts with a word followed by a colon — `purpose: ...`, `enforcement: ...` — and commitlint reads it as a footer token rather than prose.

It is a warning, not an error: the commit goes through. Rephrase the line if the noise bothers you. The rule stays on because it catches real footers (`BREAKING CHANGE:`, `Refs:`) that genuinely need a blank line before them.

### A commit is rejected before it exists

The `commit-msg` hook ran commitlint and the message does not match the convention. The output names the exact rule. Rewrite the message — do not reach for `--no-verify`, since CI runs the same check over every commit in the pull request and will reject it there instead, after a slower round trip.

### The dev server shows stale styles or routes

```bash
rm -rf .next && pnpm dev
```

Next.js caches aggressively between runs, and moved or renamed route files are the usual trigger.

## Styling

Tailwind CSS v4 is wired through PostCSS (`postcss.config.mjs`) and configured **in CSS**, inside `src/app/globals.css`. There is no `tailwind.config.ts`: v4 replaced the JavaScript config with the `@theme` directive, and every custom property declared there becomes a utility class (`--color-brand-500` produces `bg-brand-500`, `text-brand-500`, …).

Brand tokens land in the `@theme` block, in the sections already marked for M02. Until then the block only carries neutral surfaces and the `next/font` wiring from `layout.tsx`.

### Colour tokens

The palette comes from the "Obsidian Infrastructure" brief and lives in `src/app/globals.css`. Every token generates the full set of utilities, so `--color-graphite` gives `bg-graphite`, `text-graphite`, `border-graphite`.

**Base — the monochromatic foundation.** Hierarchy comes from surface brightness, not drop shadows, so the dark values form a z-axis: the deeper the surface, the lower the value.

| Token             | Value     | Use for                                                 |
| ----------------- | --------- | ------------------------------------------------------- |
| `black`           | `#000000` | Deep backgrounds                                        |
| `near-black`      | `#0e0e0e` | Cards, the layer above the page                         |
| `graphite`        | `#141313` | Default surface and page background                     |
| `graphite-raised` | `#1c1b1b` | Modals, popovers, anything above a card                 |
| `white`           | `#ffffff` | High-priority typography and critical controls **only** |
| `ink`             | `#e5e2e1` | Default body text                                       |
| `soft-gray`       | `#c4c7c8` | Secondary and muted text                                |
| `dark-gray`       | `#444748` | Borders, dividers, ghost outlines                       |

**Accents — "data pulses".**

| Token                | Value     | Use for                                                |
| -------------------- | --------- | ------------------------------------------------------ |
| `accent-blue`        | `#3d6bff` | Focus rings, active input underlines, live-state glows |
| `accent-indigo`      | `#3626ce` | Primary actions, success states                        |
| `accent-indigo-soft` | `#c3c0ff` | Indigo text or icons on a dark surface                 |
| `accent-violet`      | `#8c2ae3` | Rare highlight — the least used colour in the system   |

#### How to use them

**Accents are signals, not decoration.** An accent on screen should mean something is happening: focus, activity, a primary action. If a view shows more than one accent at rest, that is a hierarchy problem wearing a colour costume.

**White is not the body text colour.** The brief reserves pure white for high-priority typography, which is why `ink` exists. Using `text-white` everywhere flattens exactly the contrast the design depends on.

**No soft purple gradients.** The generic indigo-to-violet wash reads as "AI startup", which is the opposite of positioning DIRUS as infrastructure. When a gradient is genuinely needed, make it sharp and linear — indigo to transparent — and only to show directionality in a data flow or to carry the logo motif.

**Depth comes from the surface ramp**, not from shadows. Move up the ramp instead of adding a `shadow-*`, and use a `dark-gray` ghost border where a card edge needs definition.

#### Two notes on the source

**`accent-blue` is provisional.** The brief names "electric blue" in prose but never gives it a value, and its frontmatter contains no blue at all. `#3d6bff` was derived from the brief's own indigo hue to stay coherent with the family. It needs confirming against the real brand asset before any launch.

**The brief contradicts itself on the surface ramp.** Its prose gives `#000` / `#0A0A0A` / `#141414`, its frontmatter `#0e0e0e` / `#141313` / `#1c1b1b`. The frontmatter values were used, since they are the machine-readable half and internally consistent across all surface roles.

`src/styles/tokens.test.ts` asserts every value against this table and fails if a hex drifts, so a colour change has to be a deliberate edit to the brief, not a nudge that fixes one screen and moves the system.

### Content detection

v4 scans for utility classes automatically, starting from the CSS file and walking up, skipping `node_modules` and anything in `.gitignore`. `src/app/`, `src/components/` and `src/content/` are all covered with no configuration — verified by placing a file with a unique arbitrary utility in each directory and confirming the generated rule in the build output.

Explicit `@source` directives are therefore unnecessary and were deliberately not added: they would restate what already happens and drift out of date. Add one only for a directory automatic detection cannot reach — content living outside the project root, or classes coming from a dependency.

## Internationalization

Spanish (`es`) is the default and the source of truth for copy; English (`en`) is available. Routing uses the App Router's `[locale]` segment plus a proxy — no external i18n library, since locale detection here is one Accept-Language parse.

| Request         | Response                                                      |
| --------------- | ------------------------------------------------------------- |
| `/`             | `307` to `/es`, or `/en` when Accept-Language prefers English |
| `/es`, `/en`    | `200`, prerendered                                            |
| `/pricing`      | `307` to `/es/pricing` — a locale-less path keeps its path    |
| `/fr`, `/pt-BR` | `404`                                                         |

### `proxy.ts`, not `middleware.ts`

The `middleware.js` file convention is **deprecated in Next.js 16** and renamed to `proxy.js`. Same behaviour, different file and export name. Existing projects can migrate with `npx @next/codemod@canary middleware-to-proxy .`.

### Why an invalid locale 404s instead of redirecting

Every route lives under `/[locale]`, so a locale-shaped first segment — two letters, optionally with a region — is always a locale attempt rather than a page name. The proxy leaves those alone and the route segment calls `notFound()`.

The alternative, redirecting `/fr` to `/es/fr`, answers an invalid locale with a `307` pointing at a page that does not exist, and serves Spanish content under a URL that claims to be French. A path that is not locale-shaped, like `/pricing`, still gets prefixed.

### Adding a locale

`src/lib/i18n/config.ts` is the single source of truth. Add the code to `locales`, add a matching folder under `src/content/`, and the type checker will point at every remaining gap — `getDictionary` will not compile until the new locale has a dictionary.

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

- **`src/app/**` is excluded.** Route files are async Server Components, which Vitest cannot render, and they are kept deliberately thin: they resolve `params`, validate the locale and delegate. The logic they delegate to — everything in `src/lib/` and `src/components/` — is covered, and the routes themselves are verified against a running production server.

Everything outside that exclusion currently sits at 100% on all four metrics. When the gate flagged branches at 87.5%, the fix was deleting unreachable `?? ""` fallbacks rather than lowering the threshold — a branch no input can reach is dead code, and the gate was right to say so.

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
src/app/                  App Router pages, layout and the Tailwind theme
src/components/
  layout/                 Page shell: header, footer, containers
  navigation/             Menus, links, language switcher
  sections/               Landing-page bands: hero, pillars, CTA
  ui/                     Presentational primitives: button, card, badge
  webgl/                  Canvas and shader work, with fallbacks
src/content/
  es/                     Spanish copy — the source of truth
  en/                     English copy, translated from es/
src/lib/
  i18n/                   Locale detection, routing, dictionaries
  seo/                    Metadata, structured data, sitemap helpers
  utils/                  Small shared helpers
src/styles/               Stylesheets that are not the global theme
public/                   Static assets
```

Each folder carries a `README.md` describing what belongs in it and what does
not. They are documentation, not barrels: an empty `index.ts` in every folder
would be dead code, would invite circular imports once the barrels grow, and —
being untested modules — would drag the 90% coverage gate below its threshold
from day one.

The set of folders matches the brief exactly. No extras were added.
