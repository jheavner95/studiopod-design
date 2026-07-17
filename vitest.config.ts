import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * Single Vitest project for the whole repo. There is one component source
 * tree (`src/`) — `packages/design-system` only re-exports it at build time
 * (see its tsup config) — so tests live next to that source, not duplicated
 * per package. See docs/TESTING.md for the full rationale and conventions.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@test": fileURLToPath(new URL("./test", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**", "e2e/**"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components/**", "src/motion/**", "src/illustrations/**", "src/hooks/**", "src/lib/**"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/index.ts",
        "src/**/types/**",
        "src/**/examples/**",
        "src/**/*.d.ts",
      ],
    },
  },
});
