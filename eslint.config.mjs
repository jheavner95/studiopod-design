import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The Next.js application is apps/docs, not the repository root — DH-2
    // moved it there when the documentation product became a workspace of its
    // own. Without this, next's page-aware rules look for pages/ or src/pages
    // at the root and warn that neither exists.
    settings: { next: { rootDir: "apps/docs" } },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "**/.next/**",
    "out/**",
    "build/**",
    "**/next-env.d.ts",
    // Compiled package build output — not hand-written source.
    "packages/*/dist/**",
    // Generated test-tooling output — not hand-written source.
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
