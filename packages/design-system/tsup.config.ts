import { defineConfig } from "tsup";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/tokens.ts",
    marketing: "src/marketing.ts",
    illustrations: "src/illustrations.ts",
    styles: "src/styles.css",
  },
  format: ["esm"],
  platform: "browser",
  dts: {
    entry: {
      index: "src/index.ts",
      tokens: "src/tokens.ts",
      marketing: "src/marketing.ts",
      illustrations: "src/illustrations.ts",
    },
  },
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom", "react/jsx-runtime", "next", "next/link", "next/navigation", "next/image"],
  tsconfig: "./tsconfig.json",
  outDir: "dist",
  esbuildPlugins: [
    {
      // Redirect the bare "@/components/layout" barrel specifier to a
      // package-local shim that omits GlobalNav/Footer (see
      // src/_internal/layout-safe.ts). Scoped entirely to this build —
      // does not touch canonical app source, and matches only the exact
      // barrel specifier, not subpath imports like
      // "@/components/layout/Container". An onResolve plugin runs before
      // esbuild's native tsconfig-paths resolution, so this reliably
      // intercepts every internal consumer of the barrel (Form.tsx,
      // Alert.tsx, MetadataGroup.tsx, InspectorPanel.tsx,
      // WorkflowSidebar.tsx, all 11 marketing compositions, etc.), not
      // just this package's own entry files.
      name: "package-safe-layout-barrel",
      setup(build) {
        build.onResolve({ filter: /^@\/components\/layout$/ }, () => ({
          path: resolve(here, "src/_internal/layout-safe.ts"),
        }));
      },
    },
    {
      // Same technique for "@/workflows": several platforms/production/
      // capabilities files (PlatformFlowDiagram.tsx, PlatformCard.tsx,
      // PlatformMiniMap.tsx, ArtifactLifecycleDiagram.tsx,
      // CapabilityFlowDiagram.tsx, and their utils/flow.ts equivalents)
      // import the full "@/workflows" barrel internally, which includes
      // "./examples" — demo scenario data built on "@/lib/canonical.ts"
      // that must not ship (see src/_internal/workflows-safe.ts and
      // illustrations.ts).
      name: "package-safe-workflows-barrel",
      setup(build) {
        build.onResolve({ filter: /^@\/workflows$/ }, () => ({
          path: resolve(here, "src/_internal/workflows-safe.ts"),
        }));
      },
    },
  ],
});
