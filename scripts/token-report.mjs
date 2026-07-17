#!/usr/bin/env node
/**
 * Token coverage report (DS-4). Advisory only — always exits 0, never gates
 * `verify`/`verify:full`. "No reference found" is a signal worth a human
 * look, not proof a token is safe to delete (see
 * docs/engineering-notes/13-token-consolidation.md for a worked example of
 * why — the still-public `zIndex` export). Regex-scans source text rather
 * than importing src/lib/token-verification.ts as a module, for the same
 * reason scripts/certification-report.mjs and scripts/docs-coverage.mjs do
 * (DS-1E/DS-1F): this must run identically under CI's Node 20, which has no
 * native TypeScript support. The real, type-safe version of this same
 * check runs as a Vitest test (src/lib/token-verification.test.ts) — that
 * file is also where the one DETERMINISTIC token check (invalid `var()`
 * references) lives as an actual gate; this script is deliberately softer.
 *
 * Usage:
 *   node scripts/token-report.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

const TOKEN_SOURCE_FILES = ["src/styles/palette.css", "src/styles/theme.css", "src/styles/tokens.css", "src/app/globals.css"];
const UNUSED_SCAN_SOURCE_FILES = TOKEN_SOURCE_FILES.filter((f) => f !== "src/styles/palette.css");
const SCAN_DIRS = ["src", "packages/design-system/src", "e2e"];
const SCAN_EXTENSIONS = new Set([".css", ".ts", ".tsx"]);
const EXCLUDED_DIR_NAMES = new Set(["node_modules", "dist", ".next", "coverage", "test-results", "playwright-report"]);
const FRAMEWORK_CONVENTION_TOKENS = new Set(["--color-background", "--color-foreground", "--font-geist-sans", "--font-geist-mono"]);
const UTILITY_PREFIX_OVERRIDES = { "--radius-": "rounded-" };

const CUSTOM_PROPERTY_DECLARATION_RE = /(--[a-zA-Z0-9-]+)\s*:/g;

function walk(dir, out) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    if (EXCLUDED_DIR_NAMES.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath, out);
    else if (SCAN_EXTENSIONS.has(extname(entry))) out.push(fullPath);
  }
}

const scanFiles = [];
for (const dir of SCAN_DIRS) walk(join(repoRoot, dir), scanFiles);
const allSource = scanFiles.map((f) => readFileSync(f, "utf8")).join("\n");

const candidates = [];
let totalDeclared = 0;
for (const relPath of UNUSED_SCAN_SOURCE_FILES) {
  const fullPath = join(repoRoot, relPath);
  if (!existsSync(fullPath)) continue;
  const source = readFileSync(fullPath, "utf8");
  for (const match of source.matchAll(CUSTOM_PROPERTY_DECLARATION_RE)) {
    const token = match[1];
    totalDeclared += 1;
    if (FRAMEWORK_CONVENTION_TOKENS.has(token)) continue;

    const varUsageCount = (allSource.match(new RegExp(`var\\(\\s*${token}\\b`, "g")) ?? []).length;
    const quotedStringUsageCount = (allSource.match(new RegExp(`["'\`]${token}\\b`, "g")) ?? []).length;
    const overridePrefix = Object.keys(UTILITY_PREFIX_OVERRIDES).find((prefix) => token.startsWith(prefix));
    const utilityFragment = overridePrefix
      ? token.replace(overridePrefix, UTILITY_PREFIX_OVERRIDES[overridePrefix])
      : token.replace(/^--color-/, "").replace(/^--/, "");
    const utilityUsageCount = (allSource.match(new RegExp(`[-"'\`:\\s]${utilityFragment}(?=[\\s"'\`;)]|$)`, "g")) ?? []).length;

    if (varUsageCount === 0 && quotedStringUsageCount === 0 && utilityUsageCount === 0) {
      candidates.push({ token, sourceFile: relPath });
    }
  }
}

console.log("StudioPOD Design System — Token Coverage Report\n");
console.log(`Declared tokens scanned: ${totalDeclared} (across ${UNUSED_SCAN_SOURCE_FILES.length} source files; palette.css excluded — its ramps are consumed via a data-driven cssVar prop, which this scanner can't see through)\n`);

if (candidates.length === 0) {
  console.log("No likely-unused tokens found.");
} else {
  console.log(`${candidates.length} token(s) with no detected reference — review before removing, do not remove mechanically:\n`);
  for (const c of candidates) {
    console.log(`  ${c.token.padEnd(28)} ${c.sourceFile}`);
  }
  console.log(
    "\nA token can be genuinely used with zero hits here: JS-mirror-only consumption (a framer-motion transition reading motionDuration.slow, never the CSS var directly) and intentionally-reserved infrastructure both produce this exact signal. See docs/engineering-notes/13-token-consolidation.md before deleting anything this report names.",
  );
}

console.log("\nThis report is informational — it does not fail. See docs/TOKENS.md for the token architecture and how to add or deprecate a token.");
