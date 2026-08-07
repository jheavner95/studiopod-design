import { defineConfig } from "tsup";

/**
 * The package builds its own source tree and nothing else.
 *
 * Before DH-2 this config carried two esbuild resolver plugins that
 * redirected "@/components/layout" and "@/workflows" to package-local
 * shims, because those barrels reached into documentation-site chrome and
 * canned example data that shared a `src/` tree with the library. The
 * shims were a boundary implemented by hand, per barrel — they only ever
 * caught the barrels someone had noticed. DH-2 gave the library its own
 * source tree, so there is nothing left to redirect and both plugins are
 * gone. See docs/decisions/0003-library-owns-its-source.md.
 */
export default defineConfig({
  entry: {
    index: "src/index.ts",
    tokens: "src/tokens.ts",
    marketing: "src/marketing.ts",
    illustrations: "src/illustrations.ts",
    internal: "src/internal.ts",
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
      internal: "src/internal.ts",
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
});
