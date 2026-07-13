#!/usr/bin/env node
/**
 * "use client" directive regression check for @studiopod/design-system.
 *
 * Added after an RM-6 integration discovered that tsup's `treeshake: true`
 * (see tsup.config.ts) makes esbuild drop any module-level directive
 * prologue during bundling, even one placed as the literal first line of
 * an entry's own source file. Since index/marketing/illustrations all
 * export real client components (hooks, context providers, framer-motion
 * primitives), scripts/inject-use-client.mjs prepends the directive as a
 * post-build step. This check fails the build if that ever regresses —
 * e.g. if a future tsup/esbuild upgrade changes how directives are
 * dropped, or the injection script silently stops running.
 *
 * tokens.js is intentionally excluded: it's pure constants with no React
 * import, and a spurious "use client" would force it into the client
 * bundle graph for every consumer that only wants plain values.
 *
 * Exit codes: 0 = all required entries begin with the directive.
 * 1 = one or more missing.
 *
 * Usage:
 *   node scripts/check-use-client.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "..", "dist");

const REQUIRED_ENTRIES = ["index.js", "marketing.js", "illustrations.js"];
const DIRECTIVE = '"use client";';

let failed = false;

for (const file of REQUIRED_ENTRIES) {
  const path = join(distDir, file);
  if (!existsSync(path)) {
    console.error(`✗ ${file} not found in dist/ — run "npm run package:build" first.`);
    failed = true;
    continue;
  }
  const content = readFileSync(path, "utf8");
  if (!content.startsWith(DIRECTIVE)) {
    console.error(`✗ ${file} does not begin with ${DIRECTIVE} — client components in this entry will break under React Server Components.`);
    failed = true;
    continue;
  }
  console.log(`✓ ${file} begins with ${DIRECTIVE}`);
}

if (failed) {
  console.error('\n"use client" directive check FAILED.');
  process.exit(1);
} else {
  console.log('\n"use client" directive check passed.');
}
