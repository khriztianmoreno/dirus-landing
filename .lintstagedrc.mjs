/**
 * What runs on staged files before a commit.
 *
 * Deliberately limited to per-file, auto-fixing tools. Typecheck and the test
 * suite are project-wide and cannot be scoped to a diff, so putting them here
 * would tax every commit for a signal CI already gives — and slow hooks are
 * the reason people reach for --no-verify.
 *
 * @type {import("lint-staged").Configuration}
 */
const config = {
  // ESLint first, Prettier last: eslint --fix can reflow code, and Prettier
  // has the final say on formatting. --no-warn-ignored keeps a staged file
  // that ESLint ignores from failing the whole commit.
  "*.{js,jsx,mjs,cjs,mts,ts,tsx}": [
    "eslint --fix --no-warn-ignored",
    "prettier --write",
  ],
  "*.{json,jsonc,css,md,yml,yaml}": ["prettier --write"],
};

export default config;
