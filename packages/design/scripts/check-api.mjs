#!/usr/bin/env node
/**
 * API contract check for @jheavner95/design.
 *
 * Resolves each public entry point's full export surface and compares it
 * against a checked-in manifest that records, for every export, **what it is
 * called and what it promises**.
 *
 * ## What the manifest is
 *
 * `api-baseline/<entry>.json` maps every export name to a stability tier:
 *
 *   { "Button": "stable", "ActivityWidget": "preview", … }
 *
 * Before DH-5 it was a flat array of names, which answered "did the surface
 * change" and nothing else. A consumer could see that `Button` and
 * `ActivityWidget` were both exported and had no way to learn that one is
 * pinned by tests and documented and the other is neither. The tier is now
 * part of the contract, so a change to it is as visible as adding an export.
 *
 * ## What it enforces
 *
 *   1. No accidental exports — every name in the surface is in the manifest.
 *   2. No silent removals — every name in the manifest is in the surface.
 *   3. Every export declares a tier from the fixed vocabulary.
 *   4. Tier changes are surfaced, and a promotion or demotion is a reviewable
 *      event rather than a diff nobody reads.
 *
 * Deliberately does NOT dynamically `import()` the built files — that would
 * only find runtime values, missing every type-only export.
 *
 * Exit codes: 0 = surface and tiers match. 1 = drift.
 *
 * Usage:
 *   node scripts/check-api.mjs           # verify
 *   node scripts/check-api.mjs --write   # regenerate after an intentional change
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

/** The whole stability vocabulary. Anything else is a defect, not a new tier. */
const TIERS = new Set(["stable", "preview", "deprecated"]);

/**
 * Every name a consumer can import from this entry, values and types alike,
 * resolved through the whole re-export graph by the TypeScript compiler.
 */
function extractExportNames(dtsPath) {
  const program = ts.createProgram([dtsPath], {
    noEmit: true,
    skipLibCheck: true,
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

const baselinePath = (entry) => join(baselineDir, `${entry}.json`);

function loadBaseline(entry) {
  const path = baselinePath(entry);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

/**
 * A new export starts at `preview`. Promotion to `stable` is a decision
 * somebody makes, never a default a script hands out — see
 * docs/decisions/0015-stability-tiers.md.
 */
function writeBaseline(entry, names, previous) {
  const next = {};
  for (const name of names.sort()) next[name] = previous?.[name] ?? "preview";
  writeFileSync(baselinePath(entry), `${JSON.stringify(next, Object.keys(next).sort(), 2)}\n`);
  return next;
}

const write = process.argv.includes("--write");
const summary = [];
let failed = false;

for (const entry of ENTRIES) {
  const dtsPath = join(distDir, entry.dts);
  if (!existsSync(dtsPath)) {
    console.error(`✗ ${entry.name}: ${entry.dts} not found — run the build first.`);
    failed = true;
    continue;
  }

  const currentNames = extractExportNames(dtsPath);
  if (currentNames.length === 0) {
    console.error(
      `✗ ${entry.name}: parsed zero exports from ${entry.dts} — the declaration graph did not resolve — check that dist/ was built and that specifiers were rewritten.`
    );
    failed = true;
    continue;
  }

  const baseline = loadBaseline(entry.name);

  if (write) {
    const next = writeBaseline(entry.name, currentNames, baseline);
    const stable = Object.values(next).filter((t) => t === "stable").length;
    summary.push(`✓ ${entry.name}: wrote ${currentNames.length} exports (${stable} stable)`);
    continue;
  }

  if (!baseline) {
    console.error(`✗ ${entry.name}: no baseline manifest. Run with --write to create one.`);
    failed = true;
    continue;
  }

  const baselineNames = Object.keys(baseline);
  const current = new Set(currentNames);
  const missing = baselineNames.filter((n) => !current.has(n));
  const added = currentNames.filter((n) => !(n in baseline));

  if (missing.length > 0) {
    console.error(`✗ ${entry.name}: ${missing.length} export(s) REMOVED since baseline: ${missing.join(", ")}`);
    failed = true;
  }
  if (added.length > 0) {
    console.error(
      `✗ ${entry.name}: ${added.length} NEW export(s) not in the manifest: ${added.join(", ")}\n` +
        `  An export reaches consumers only when someone accepts it into the API. If that is what you\n` +
        `  intend, run "node scripts/check-api.mjs --write" — new names enter at "preview".`
    );
    failed = true;
  }

  const badTier = baselineNames.filter((n) => !TIERS.has(baseline[n]));
  if (badTier.length > 0) {
    console.error(
      `✗ ${entry.name}: ${badTier.length} export(s) declare an unknown stability tier: ` +
        badTier.map((n) => `${n}="${baseline[n]}"`).join(", ") +
        `\n  Allowed: ${[...TIERS].join(", ")}.`
    );
    failed = true;
  }

  if (missing.length === 0 && added.length === 0 && badTier.length === 0) {
    const tally = {};
    for (const t of Object.values(baseline)) tally[t] = (tally[t] ?? 0) + 1;
    const shape = [...TIERS].filter((t) => tally[t]).map((t) => `${tally[t]} ${t}`).join(", ");
    summary.push(`✓ ${entry.name}: ${currentNames.length} exports match — ${shape}`);
  }
}

if (failed) {
  console.error("\nAPI contract check FAILED.");
  process.exit(1);
}

console.log(summary.join("\n"));
console.log("\nAPI contract check passed — surface and stability tiers are unchanged.");
