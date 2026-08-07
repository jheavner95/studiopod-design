#!/usr/bin/env node
/**
 * Boundary check (DH-2).
 *
 * The published library and the documentation application are separate
 * source trees. Before DH-2 they were one, and the separation was faked at
 * build time by two esbuild resolver plugins that amputated documentation
 * chrome out of the bundle — a boundary implemented by hand, per barrel,
 * that only ever caught the barrels someone had noticed.
 *
 * Those plugins are gone. This check is what replaces them, and it differs
 * in the way that matters: it fails on the *general* case rather than on an
 * enumerated list of known offenders.
 *
 * What it asserts:
 *
 *   1. The package's tsconfig cannot resolve outside the package. This is
 *      the load-bearing one — ADR 0003's boundary is literally that line.
 *   2. No library source escapes the package: no relative path climbing out
 *      of packages/design, no import of the documentation application.
 *   3. No documentation source reaches into library source: no relative path
 *      into packages/, no deep import past a public entry point.
 *   4. The built package contains no documentation-application source.
 *
 * Exit codes: 0 = every assertion holds. 1 = at least one failed.
 *
 * Usage: node tooling/boundary-check.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve, sep } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");
const PKG = join(repoRoot, "packages/design");
const DOCS = join(repoRoot, "apps/docs");

const failures = [];
const fail = (rule, detail) => failures.push({ rule, detail });

function sourceFiles(root, exts = [".ts", ".tsx", ".css"]) {
  const out = [];
  (function walk(dir) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      if (entry === "node_modules" || entry === ".next" || entry === "dist") continue;
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (exts.some((e) => entry.endsWith(e))) out.push(p);
    }
  })(root);
  return out;
}

// A specifier as it appears in an import, export-from, or CSS @import.
const SPECIFIERS = /(?:^\s*import\s|(?:^|\s)from\s|@import\s)\s*["']([^"']+)["']/gm;
const specifiersIn = (file) => [...readFileSync(file, "utf8").matchAll(SPECIFIERS)].map((m) => m[1]);

// ── 1. The package's tsconfig resolves nothing outside the package ────────
{
  const raw = readFileSync(join(PKG, "tsconfig.json"), "utf8");
  const json = JSON.parse(raw.replace(/^\s*\/\/.*$/gm, ""));
  const co = json.compilerOptions ?? {};
  const baseUrl = co.baseUrl ?? ".";
  const resolvedBase = resolve(PKG, baseUrl);
  if (resolvedBase !== resolve(PKG)) {
    fail(
      "package tsconfig scope",
      `baseUrl resolves to ${relative(repoRoot, resolvedBase) || "."} — it must be the package itself. ` +
        `This is the line that stops the package compiling anything outside packages/design.`
    );
  }
  for (const [alias, targets] of Object.entries(co.paths ?? {})) {
    for (const t of targets) {
      const abs = resolve(resolvedBase, t.replace(/\*$/, ""));
      if (!abs.startsWith(resolve(PKG) + sep)) {
        fail("package tsconfig scope", `path mapping "${alias}" -> "${t}" points outside the package`);
      }
    }
  }
}

// ── 2. Library source never escapes the package ───────────────────────────
for (const file of sourceFiles(join(PKG, "src"))) {
  for (const spec of specifiersIn(file)) {
    if (spec.startsWith(".")) {
      const abs = resolve(dirname(file), spec);
      if (!abs.startsWith(resolve(PKG) + sep)) {
        fail("library escapes package", `${relative(repoRoot, file)} -> "${spec}"`);
      }
    }
    if (spec === "@studiopod/docs" || spec.startsWith("@studiopod/docs/")) {
      fail("library imports the documentation app", `${relative(repoRoot, file)} -> "${spec}"`);
    }
  }
}

// ── 3. Documentation source consumes the package, never its source ────────
const PUBLIC_ENTRIES = new Set([
  "@studiopod/design",
  "@studiopod/design/tokens",
  "@studiopod/design/marketing",
  "@studiopod/design/illustrations",
  "@studiopod/design/internal",
  "@studiopod/design/styles.css",
]);
for (const file of sourceFiles(DOCS)) {
  for (const spec of specifiersIn(file)) {
    if (spec.startsWith(".")) {
      const abs = resolve(dirname(file), spec);
      if (abs.startsWith(resolve(repoRoot, "packages") + sep)) {
        fail("documentation reaches into library source", `${relative(repoRoot, file)} -> "${spec}"`);
      }
    }
    if (spec.startsWith("@studiopod/design") && !PUBLIC_ENTRIES.has(spec)) {
      fail("documentation deep-imports the package", `${relative(repoRoot, file)} -> "${spec}"`);
    }
  }
}

// ── 4. The built package carries no documentation source ──────────────────
{
  const dist = join(PKG, "dist");
  if (!existsSync(dist)) {
    console.log("ℹ dist/ not built — skipping build-output assertions (run the package build first)");
  } else {
    // Identifiers that exist only in the documentation application. If any
    // appears in the bundle as real code, documentation code has shipped.
    //
    // Comments are stripped before matching. Library components legitimately
    // *mention* site chrome in their JSDoc — "navigation is the site chrome
    // outside this primitive's concern (GlobalNav)" — and a check that
    // treated prose as evidence would be one people learn to work around by
    // rewording comments.
    const MARKERS = [
      "DocsShell",
      "DocsSidebar",
      "DocsTableOfContents",
      "CertificationPanel",
      "GlobalNav",
      "designSystemNavigation",
      "canonicalProductionFlow",
    ];
    const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
    const bundled = readdirSync(dist)
      .filter((f) => f.endsWith(".js") || f.endsWith(".d.ts"))
      .map((f) => ({ f, text: stripComments(readFileSync(join(dist, f), "utf8")) }));
    for (const marker of MARKERS) {
      const re = new RegExp(`\\b${marker}\\b`);
      for (const { f, text } of bundled) {
        if (re.test(text)) fail("documentation code in the bundle", `dist/${f} references "${marker}" outside a comment`);
      }
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────
if (failures.length === 0) {
  console.log("✔ boundary-check — the library and the documentation application are separate");
  console.log("  · package tsconfig resolves only inside packages/design");
  console.log("  · no library source escapes the package");
  console.log("  · documentation consumes the package through its public entry points only");
  console.log("  · no documentation code in the built bundle");
  process.exit(0);
}

const byRule = new Map();
for (const { rule, detail } of failures) {
  if (!byRule.has(rule)) byRule.set(rule, []);
  byRule.get(rule).push(detail);
}
console.error(`✖ boundary-check — ${failures.length} violation(s)\n`);
for (const [rule, details] of byRule) {
  console.error(`  ${rule}:`);
  for (const d of details.slice(0, 20)) console.error(`    - ${d}`);
  if (details.length > 20) console.error(`    … and ${details.length - 20} more`);
  console.error("");
}
process.exit(1);
