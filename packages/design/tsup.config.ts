import { defineConfig } from "tsup";

/**
 * Two builds, because the package emits two kinds of thing.
 *
 * ## Why the JS build does not bundle (DH-3)
 *
 * esbuild drops a module-level directive prologue the moment it bundles — it
 * considers a directive unsafe to keep once tree-shaking can reorder and merge
 * modules. The old build worked around that by re-injecting one `"use client"`
 * per entry point after esbuild finished.
 *
 * That workaround was the defect DH-2 recorded as N1. A directive at the top of
 * `index.js` marks *every* export in the package as a client reference,
 * including `cn`, the token constants, and the ~73% of components that are pure
 * presentation. Any consumer with a Server Component paid for that, and both
 * Cloud and Web are App Router applications.
 *
 * Not bundling makes the problem disappear rather than managing it: each source
 * module becomes one output module, and its own directive — or its own absence
 * of one — travels with it. React's client/server boundary is defined per
 * module, so this is the output shape the boundary was designed for.
 *
 * The cost is that esbuild in transform mode resolves nothing, so emitted
 * specifiers keep the source's path aliases and extensionless relative paths.
 * `scripts/resolve-specifiers.mjs` rewrites them against the emitted tree and
 * fails if any does not resolve.
 *
 * Declarations come from `tsc --emitDeclarationOnly` (see package.json), not
 * from tsup: rollup-plugin-dts bundles types into one file per entry, which
 * would undo the per-module shape on the type side.
 *
 * ## Why the CSS build still bundles
 *
 * `styles.css` is a plain concatenation of the five generated token
 * stylesheets, and consumers import one file. That has to be bundled, and it
 * must never go through Tailwind's compiler — see scripts/check-css.mjs.
 */
export default defineConfig([
  {
    name: "js",
    entry: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "!src/**/*.test.ts",
      "!src/**/*.test.tsx",
    ],
    outDir: "dist",
    format: ["esm"],
    platform: "browser",
    target: "es2017",
    bundle: false,
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    minify: false,
    tsconfig: "./tsconfig.json",
  },
  {
    name: "css",
    entry: { styles: "src/styles.css" },
    outDir: "dist",
    format: ["esm"],
    bundle: true,
    clean: false,
    sourcemap: false,
    minify: false,
    tsconfig: "./tsconfig.json",
    /**
     * The webfonts ride along with the stylesheet that declares them (DH-5.5).
     *
     * `copy` emits each file untouched instead of inlining it as a data URI.
     * Inlining would be the worse default by some margin: ~137 KB of base64
     * would land in every consumer's CSS bundle, blocking first paint on bytes
     * the browser can neither cache separately nor skip when it already holds
     * the font.
     */
    loader: { ".woff2": "copy" },
    esbuildOptions(options) {
      /**
       * Stable, unhashed names under `dist/fonts/`. esbuild hashes asset names
       * by default, which is right for an application and wrong for a library:
       * the hash changes the emitted filename whenever the file or esbuild's
       * algorithm changes, and `dist/styles.css` is a published artifact whose
       * diff should stay reviewable. Cache-busting belongs to the consuming
       * application's build, and every one of them re-hashes assets anyway.
       */
      options.assetNames = "fonts/[name]";
    },
  },
]);
