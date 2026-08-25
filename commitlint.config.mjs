/**
 * Commit message rules.
 *
 * Extends conventional commits, which is what the contribution guide in the
 * README already asks for. The overrides below are the places where the
 * default is wrong for this repo rather than merely stricter.
 *
 * @type {import("@commitlint/types").UserConfig}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // The types the contribution guide documents, and the same list the
    // branch naming convention uses as its prefix.
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    // A scope is useful but not always honest: a change that genuinely spans
    // the repo should not be forced to invent one.
    "scope-empty": [0],
    // GitHub truncates the subject in list views past roughly this width.
    "header-max-length": [2, "always", 72],
    // Bodies explain why. Hard-wrapping at 72 keeps `git log` readable in a
    // terminal, but URLs and code identifiers cannot be wrapped, so this
    // warns instead of failing.
    "body-max-line-length": [1, "always", 100],
  },
};

export default config;
