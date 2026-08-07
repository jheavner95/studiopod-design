import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const url = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/**
 * Three projects, one per source tree, because DH-2 gave each tree its own
 * meaning for "@".
 *
 * Before DH-2 there was a single project over one `src/` — the packaged
 * library and the documentation site shared a compilation, which is exactly
 * the defect ADR 0003 removed. Now:
 *
 *   design   the published library. "@" is packages/design/src.
 *   docs     the documentation application. "@" is apps/docs/src. It has no
 *            alias into the library: like Cloud and Web, it resolves
 *            "@studiopod/design" through the workspace link to the package's
 *            built output, so these tests exercise the real public surface.
 *   tooling  repository tooling — release-target resolution, token hygiene.
 *
 * The docs project therefore requires the package to be built first. That is
 * deliberate: `npm run verify` builds the package before it tests.
 */
export default defineConfig({
  test: {
    projects: [
      {
        plugins: [react()],
        resolve: {
          alias: {
            "@": url("./packages/design/src"),
            "@test": url("./packages/design/test"),
          },
        },
        test: {
          name: "design",
          environment: "jsdom",
          globals: false,
          setupFiles: [url("./packages/design/test/setup.ts")],
          include: ["packages/design/src/**/*.{test,spec}.{ts,tsx}"],
          css: false,
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: { "@": url("./apps/docs/src") },
        },
        test: {
          name: "docs",
          environment: "jsdom",
          globals: false,
          setupFiles: [url("./packages/design/test/setup.ts")],
          include: ["apps/docs/src/**/*.{test,spec}.{ts,tsx}"],
          css: false,
        },
      },
      {
        test: {
          name: "tooling",
          environment: "node",
          globals: false,
          include: ["tooling/**/*.{test,spec}.{ts,tsx}"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["packages/design/src/**"],
      exclude: [
        "packages/design/src/**/*.test.{ts,tsx}",
        "packages/design/src/**/index.ts",
        "packages/design/src/**/types/**",
        "packages/design/src/**/*.d.ts",
      ],
    },
  },
});
