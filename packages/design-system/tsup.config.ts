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
  // `treeshake: true` above makes esbuild actively drop any module-level
  // directive prologue (including a literal "use client" placed as line 1
  // of an entry's own source) once it bundles — esbuild considers a
  // directive unsafe to keep after tree-shaking can reorder/merge code, so
  // it's stripped with a "Module level directives cause errors when
  // bundled" warning rather than preserved. Since index/marketing/
  // illustrations all export real client components (hooks, context
  // providers, framer-motion primitives), this runs a post-build step that
  // prepends the directive as plain text after esbuild's own transform
  // finishes, sidestepping the tree-shake/directive conflict entirely. See
  // scripts/inject-use-client.mjs.
  onSuccess: "node ./scripts/inject-use-client.mjs",
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
