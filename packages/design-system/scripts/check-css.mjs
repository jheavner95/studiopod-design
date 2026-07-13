#!/usr/bin/env node
/**
 * CSS content regression check for @studiopod/design-system.
 *
 * Added after an RM-6 integration discovered that `tsup` (via
 * `postcss-load-config`, which walks up from `cwd` looking for a config)
 * can silently pick up an unrelated PostCSS config elsewhere in the
 * directory tree and run this package's `styles.css` entry through
 * Tailwind's compiler in isolation — which strips the entire `@theme`
 * block as "unused" since there are no content files to scan. The package
 * ships plain concatenated token CSS (see README.md's CSS section) and
 * must never be compiled by Tailwind itself. This check fails the build if
 * that ever regresses, by asserting each of the five canonical source
 * files' content actually made it into dist/styles.css, in order.
 *
 * Exit codes: 0 = all markers present and ordered. 1 = one or more missing,
 * or out of order.
 *
 * Usage:
 *   node scripts/check-css.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const distPath = join(pkgRoot, "dist", "styles.css");

// One representative, distinctive declaration from each of the five
// canonical source files, in the order they're @import-ed by src/styles.css.
const EXPECTED_MARKERS = [
  { source: "palette.css", marker: "--palette-slate-50:" },
  { source: "theme.css", marker: "@theme" },
  { source: "theme.css", marker: "--color-canvas:" },
  { source: "theme.css", marker: "--color-accent-500:" },
  { source: "theme.css", marker: "--radius-md:" },
  { source: "tokens.css", marker: "--z-base:" },
  { source: "typography.css", marker: ".text-display-1" },
  { source: "utilities.css", marker: ".glass-panel" },
];

if (!existsSync(distPath)) {
  console.error(`✗ dist/styles.css not found — run "npm run package:build" first.`);
  process.exit(1);
}

const css = readFileSync(distPath, "utf8");
let failed = false;
let searchFrom = 0;

for (const { source, marker } of EXPECTED_MARKERS) {
  const idx = css.indexOf(marker, searchFrom);
  if (idx === -1) {
    // Check without the ordering constraint to give a more precise error.
    const idxAnywhere = css.indexOf(marker);
    if (idxAnywhere === -1) {
      console.error(`✗ missing: "${marker}" (expected from ${source}) is absent from dist/styles.css entirely.`);
    } else {
      console.error(`✗ out of order: "${marker}" (expected from ${source}) appears earlier than a prior marker — @import ordering may have changed.`);
    }
    failed = true;
    continue;
  }
  searchFrom = idx;
}

if (failed) {
  console.error("\nCSS content check FAILED — dist/styles.css is missing or has reordered canonical token content.");
  console.error("If this is a build-tooling regression (e.g. an unrelated PostCSS/Tailwind config being picked up by tsup), fix the build isolation rather than the source tokens.");
  process.exit(1);
} else {
  console.log(`✓ all ${EXPECTED_MARKERS.length} canonical markers present and in order in dist/styles.css`);
  console.log("\nCSS content check passed.");
}
