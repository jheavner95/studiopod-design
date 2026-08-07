#!/usr/bin/env node
/**
 * Framework-import check for @studiopod/design (DH-1 gap 17, built in DH-3).
 *
 * ADR 0007 says the package targets React and no framework. Until DH-3 that was
 * a convention, and the convention had already failed: five components imported
 * `next/link`, one imported `next/image`, one imported `next/navigation`, and
 * `next` was a required peer dependency for every consumer — including Cloud,
 * which declined to adopt the package partly because of it.
 *
 * A rule that depends on nobody reintroducing an import is not a rule. This
 * fails the build instead.
 *
 * Three assertions:
 *
 *   1. No framework specifier appears in package source.
 *   2. No framework specifier appears in the emitted output — the check that
 *      actually protects consumers, since output is what they resolve.
 *   3. The manifest declares no framework peer or runtime dependency.
 *
 * Framework capabilities are injected as props instead, with plain HTML
 * defaults — see src/framework/types.ts for why props rather than context.
 *
 * Exit codes: 0 = clean. 1 = at least one framework coupling.
 *
 * Usage: node scripts/check-framework-imports.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = join(here, "..");
const SRC = join(pkgRoot, "src");
const DIST = join(pkgRoot, "dist");

/**
 * Frameworks and framework-shaped runtimes the package must not reach for.
 * Routers and data layers are here for the same reason Next.js is: importing
 * one decides an application concern on the consumer's behalf.
 */
const FORBIDDEN = [
  "next", "next/link", "next/image", "next/navigation", "next/router", "next/head",
  "react-router", "react-router-dom", "@remix-run/react", "gatsby", "@tanstack/react-router",
  "@tanstack/react-query", "swr",
];

const isForbidden = (spec) => FORBIDDEN.some((f) => spec === f || spec.startsWith(f + "/"));

function filesUnder(root, exts) {
  const out = [];
  if (!existsSync(root)) return out;
  (function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) walk(p);
      else if (exts.some((e) => entry.endsWith(e))) out.push(p);
    }
  })(root);
  return out;
}

// Real import/export specifiers only — a framework name inside a JSDoc example
// is documentation, and a check that treated prose as a violation would teach
// people to reword comments rather than fix couplings.
const stripComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*\/\/.*$/gm, " ");
const SPECIFIER = /(?:\bfrom\s*|^\s*import\s*|\bimport\s*\(\s*|\brequire\s*\(\s*)["']([^"']+)["']/gm;

const violations = [];

for (const file of filesUnder(SRC, [".ts", ".tsx"])) {
  if (/\.test\.tsx?$/.test(file)) continue;
  for (const m of stripComments(readFileSync(file, "utf8")).matchAll(SPECIFIER)) {
    if (isForbidden(m[1])) violations.push(`source: ${relative(pkgRoot, file)} -> "${m[1]}"`);
  }
}

if (existsSync(DIST)) {
  for (const file of filesUnder(DIST, [".js", ".d.ts"])) {
    for (const m of stripComments(readFileSync(file, "utf8")).matchAll(SPECIFIER)) {
      if (isForbidden(m[1])) violations.push(`output: ${relative(pkgRoot, file)} -> "${m[1]}"`);
    }
  }
} else {
  console.log("ℹ dist/ not built — checking source only");
}

const manifest = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
for (const field of ["dependencies", "peerDependencies", "optionalDependencies"]) {
  for (const name of Object.keys(manifest[field] ?? {})) {
    if (isForbidden(name)) violations.push(`manifest: ${field}.${name}`);
  }
}

if (violations.length === 0) {
  console.log("✓ no framework coupling");
  console.log("  · no framework specifier in source or emitted output");
  console.log(`  · peerDependencies: ${Object.keys(manifest.peerDependencies ?? {}).join(", ") || "none"}`);
  process.exit(0);
}

console.error(`✖ framework-import check — ${violations.length} coupling(s)\n`);
for (const v of violations.slice(0, 30)) console.error(`    ${v}`);
if (violations.length > 30) console.error(`    … and ${violations.length - 30} more`);
console.error("\nFramework capabilities are injected as props. See src/framework/types.ts.");
process.exit(1);
