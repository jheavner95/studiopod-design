#!/usr/bin/env node
/**
 * API baseline check for @studiopod/design.
 *
 * Resolves each entry point's full export surface and compares the sorted
 * list of PUBLIC export names against a checked-in baseline manifest.
 *
 * Uses the TypeScript compiler's own module resolution rather than reading
 * the .d.ts as text. It used to do the latter — matching the single trailing
 * `export { ... }` block that a *bundled* ESM module always ends with — and
 * DH-3 broke that by design: the package no longer bundles, so each entry's
 * declaration file is now a graph of `export * from "./..."` re-exports with
 * no such block. The old parser reported 267 exports removed from an API that
 * had not changed at all.
 *
 * Resolving the graph properly is both the fix and the more durable check: it
 * sees exactly what a consumer's TypeScript sees, through any number of
 * re-export hops, and does not care what shape the build emits next.
 *
 * Still deliberately does NOT dynamically `import()` the built files — that
 * would only find runtime values, missing every type-only export in the
 * baseline.
 *
 * Exit codes: 0 = manifests match. 1 = drift detected (missing export,
 * new/accidental export, or an entry point's .d.ts is missing/unparsable).
 *
 * Usage:
 *   node scripts/check-api.mjs           # verify against checked-in manifests
 *   node scripts/check-api.mjs --write   # regenerate manifests from current dist/ (use after an intentional API change)
 */
import ts from "typescript";
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

/**
 * Every name a consumer can import from this entry, values and types alike,
 * resolved through the whole re-export graph by the TypeScript compiler.
 */
function extractExportNames(dtsPath) {
  const program = ts.createProgram([dtsPath], {
    noEmit: true,
    skipLibCheck: true,
    // The emitted declarations import siblings as "./x.js"; both of these
    // resolution modes map that to the neighbouring "./x.d.ts", which is what
    // a consumer's own compiler will do.
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(dtsPath);
  if (!source) return [];
  const moduleSymbol = checker.getSymbolAtLocation(source);
  if (!moduleSymbol) return [];
  return [...new Set(checker.getExportsOfModule(moduleSymbol).map((sym) => sym.getName()))].sort();
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


  const currentNames = [...extractExportNames(dtsPath)].sort();

  if (currentNames.length === 0) {
    console.error(`✗ ${entry.name}: parsed zero exports from ${entry.dts} — the entry may have failed to resolve, or the declaration graph did not resolve — check that dist/ was built and that specifiers were rewritten.`);
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
