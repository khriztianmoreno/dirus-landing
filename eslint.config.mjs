import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierConfig from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next already registers the jsx-a11y plugin but enables
    // only a handful of its rules, so we layer the full recommended set on
    // top. Registering the plugin again here would be a redefinition error.
    files: ["**/*.{js,jsx,ts,tsx,mjs,mts}"],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // Next.js <Link> renders a real anchor, so the rule needs to be told
      // about it to check hrefs correctly.
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    },
  },
  // Prettier owns formatting. This must stay last so it can switch off every
  // stylistic rule the configs above enable, leaving ESLint to report only
  // correctness and accessibility problems.
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated test output.
    "coverage/**",
  ]),
]);

export default eslintConfig;
