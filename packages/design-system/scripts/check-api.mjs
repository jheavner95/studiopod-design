#!/usr/bin/env node
/**
 * API baseline check for @studiopod/design-system.
 *
 * Statically parses each built entry's trailing `export { ... }` statement
 * (present in both the .js and .d.ts tsup output — one per file, since
 * esbuild/tsup always emit a single re-export list at the end of a bundled
 * ESM module) and compares the sorted list of PUBLIC export names against
 * a checked-in baseline manifest per entry point.
 *
 * Deliberately does NOT dynamically `import()` the built files: doing so
 * would require Node to resolve "next/link" etc. as bare specifiers
 * outside of a bundler, which fails in a plain Node ESM loader (a Next.js
 * package-exports quirk, unrelated to this package) — so this reads the
 * .d.ts files as text instead, which covers both values and types and
 * needs no module resolution at all.
 *
 * Exit codes: 0 = manifests match. 1 = drift detected (missing export,
 * new/accidental export, or an entry point's .d.ts is missing/unparsable).
 *
 * Usage:
 *   node scripts/check-api.mjs           # verify against checked-in manifests
 *   node scripts/check-api.mjs --write   # regenerate manifests from current dist/ (use after an intentional API change)
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const distDir = join(pkgRoot, "dist");
const baselineDir = join(pkgRoot, "api-baseline");

const ENTRIES = [
  { name: "index", dts: "index.d.ts" },
  { name: "tokens", dts: "tokens.d.ts" },
  { name: "marketing", dts: "marketing.d.ts" },
  { name: "illustrations", dts: "illustrations.d.ts" },
];

/** Extracts the public export names from a bundled .d.ts file's trailing `export { ... }` statement(s). */
function extractExportNames(dtsText) {
  const names = new Set();
  // Matches every top-level `export { ... }` block (there may be more than
  // one physical statement, though tsup typically emits exactly one).
  const blockRegex = /export\s*\{([^}]*)\}/g;
  let match;
  while ((match = blockRegex.exec(dtsText)) !== null) {
    const body = match[1];
    // Split on commas that separate entries. Entries never contain commas
    // themselves (identifiers and `X as Y` pairs only), so a plain split is safe.
    for (const rawEntry of body.split(",")) {
      const entry = rawEntry.trim();
      if (!entry) continue;
      // Forms seen in tsup dts output: "Name", "type Name", "Internal as Public",
      // "type Internal as Public".
      const asMatch = entry.match(/^(?:type\s+)?\S+\s+as\s+(\S+)$/);
      if (asMatch) {
        names.add(asMatch[1]);
        continue;
      }
      const plainMatch = entry.match(/^(?:type\s+)?(\S+)$/);
      if (plainMatch) {
        names.add(plainMatch[1]);
      }
    }
  }
  return names;
}

function loadBaseline(entryName) {
  const path = join(baselineDir, `${entryName}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeBaseline(entryName, names) {
  const path = join(baselineDir, `${entryName}.json`);
  writeFileSync(path, JSON.stringify(names, null, 2) + "\n", "utf8");
}

function diffSets(baseline, current) {
  const baselineSet = new Set(baseline);
  const currentSet = new Set(current);
  const missing = [...baselineSet].filter((n) => !currentSet.has(n)).sort();
  const added = [...currentSet].filter((n) => !baselineSet.has(n)).sort();
  return { missing, added };
}

const write = process.argv.includes("--write");
let failed = false;
const summary = [];

for (const entry of ENTRIES) {
  const dtsPath = join(distDir, entry.dts);
  if (!existsSync(dtsPath)) {
    console.error(`✗ ${entry.name}: ${entry.dts} not found in dist/ — run "npm run package:build" first.`);
    failed = true;
    continue;
  }

  const dtsText = readFileSync(dtsPath, "utf8");
  const currentNames = [...extractExportNames(dtsText)].sort();

  if (currentNames.length === 0) {
    console.error(`✗ ${entry.name}: parsed zero exports from ${entry.dts} — the entry may have failed to resolve, or the parser needs updating for a new tsup output shape.`);
    failed = true;
    continue;
  }

  if (write) {
    writeBaseline(entry.name, currentNames);
    summary.push(`✓ ${entry.name}: wrote baseline with ${currentNames.length} exports`);
    continue;
  }

  const baseline = loadBaseline(entry.name);
  if (baseline === null) {
    console.error(`✗ ${entry.name}: no baseline manifest found at api-baseline/${entry.name}.json — run with --write once to create it.`);
    failed = true;
    continue;
  }

  const { missing, added } = diffSets(baseline, currentNames);
  if (missing.length === 0 && added.length === 0) {
    summary.push(`✓ ${entry.name}: ${currentNames.length} exports match baseline`);
  } else {
    failed = true;
    if (missing.length > 0) {
      console.error(`✗ ${entry.name}: ${missing.length} export(s) REMOVED since baseline: ${missing.join(", ")}`);
    }
    if (added.length > 0) {
      console.error(`✗ ${entry.name}: ${added.length} NEW export(s) not in baseline: ${added.join(", ")}`);
      console.error(`  If intentional, review against the versioning policy (docs/VERSIONING.md), then run "node scripts/check-api.mjs --write" to update the baseline.`);
    }
  }
}

console.log("");
summary.forEach((line) => console.log(line));

if (failed) {
  console.error("\nAPI baseline check FAILED.");
  process.exit(1);
} else {
  console.log("\nAPI baseline check passed — public export surface is unchanged.");
}
