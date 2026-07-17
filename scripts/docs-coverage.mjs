#!/usr/bin/env node
/**
 * Documentation coverage report (DS-1E). Advisory only — always exits 0,
 * never gates `verify`/`verify:full`. Per the brief: "Do not require 100%."
 * Regex-scans design-system-navigation.ts's source text rather than
 * importing it as a module: this script must run identically under CI's
 * Node 20 (see .github/workflows/release.yml) and any local Node version,
 * and Node 20 has no native TypeScript support — the same constraint
 * design-system-navigation.test.ts avoids by running through Vitest
 * instead. A hard integrity check belongs in that test file (it asserts);
 * this script only reports (it never fails), so it doesn't need real
 * module execution — see docs/DOCUMENTATION.md "Coverage reporting."
 *
 * Usage:
 *   node scripts/docs-coverage.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

const navSource = readFileSync(join(repoRoot, "src/lib/design-system-navigation.ts"), "utf8");
const registryBlock = navSource.slice(
  navSource.indexOf("export const NAV_REGISTRY"),
  navSource.indexOf("// ---------------------------------------------------------------------\n// Query helpers"),
);

const entryBlocks = registryBlock.split(/\{\s*id:\s*"/).slice(1);
const entries = entryBlocks.map((block) => ({
  id: block.match(/^([^"]+)"/)?.[1] ?? "(unknown)",
  section: block.match(/section:\s*"([^"]+)"/)?.[1],
  pageType: block.match(/pageType:\s*"([^"]+)"/)?.[1],
  badge: block.match(/badge:\s*"([^"]+)"/)?.[1] ?? null,
}));

/** Mirrors src/lib/docs-contracts.ts's getArchetype() — see that file for the reasoning. Kept in sync by design-system-navigation.test.ts's own archetype-classification test, which runs against the real function. */
function archetypeOf(entry) {
  if (entry.pageType === "landing") return "landing";
  if (entry.badge === "application") return "application";
  if (entry.badge === "architecture") return "architecture";
  if (entry.badge === "playground") return "playground";
  if (entry.badge === "historical-reference") return "historical-reference";
  if (entry.badge === "pattern") return "pattern";
  if (entry.pageType === "pattern") return "pattern";
  if (entry.pageType === "architecture") return "architecture";
  return "reference";
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item) ?? "(none)";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function countPageFiles(dir) {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) count += countPageFiles(full);
    else if (entry.name === "page.tsx") count += 1;
  }
  return count;
}

function countExportedNames(indexPath) {
  try {
    const source = readFileSync(indexPath, "utf8");
    return [...source.matchAll(/^export\s/gm)].length;
  } catch {
    return null;
  }
}

console.log("StudioPOD Design System — Documentation Coverage\n");

console.log(`Registry entries: ${entries.length}`);
console.log(`page.tsx files:   ${countPageFiles(join(repoRoot, "src/app"))}  (1 intentionally unregistered — see design-system-navigation.test.ts)\n`);

console.log("By archetype:");
const byArchetype = countBy(entries, archetypeOf);
for (const [archetype, count] of Object.entries(byArchetype).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${archetype.padEnd(22)} ${count}`);
}

console.log("\nBy section:");
const bySection = countBy(entries, (e) => e.section);
for (const [section, count] of Object.entries(bySection).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${section.padEnd(22)} ${count}`);
}

console.log("\nComponent family export volume (context, not a coverage percentage — see docs/DOCUMENTATION.md):");
const FAMILIES = [
  "src/components/operational",
  "src/components/workflow",
  "src/components/ui",
  "src/components/form",
  "src/components/layout",
  "src/components/feedback",
  "src/components/metadata",
  "src/components/navigation",
  "src/components/table",
  "src/components/docs",
  "src/components/overlay",
  "src/motion",
  "src/illustrations",
];
for (const family of FAMILIES) {
  const count = countExportedNames(join(repoRoot, family, "index.ts"));
  if (count !== null) console.log(`  ${family.padEnd(28)} ${count} export statement(s)`);
}

console.log(
  "\nThis report is informational — it does not fail, and 100% per-component documentation is not the goal.\nSee docs/DOCUMENTATION.md \"Documentation coverage\" for how to read it.",
);
