import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unicorn from "eslint-plugin-unicorn";

const unicornRecommended = unicorn.configs["flat/recommended"];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ...unicornRecommended,
    rules: {
      ...unicornRecommended.rules,
      // Explicitly set the default option to satisfy ESLint's schema validation.
      "unicorn/logical-assignment-operators": ["error", "always"],
      "unicorn/filename-case": "off"
    },
  },
  {
    // Conventional filenames (shadcn's utils.ts, Sanity's env.ts) — keep them as-is.
    files: ["lib/utils.ts", "sanity/env.ts"],
    rules: {
      "unicorn/name-replacements": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
