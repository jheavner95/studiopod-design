#!/usr/bin/env node
/**
 * Rewrite module specifiers in the emitted output so it is valid ESM.
 *
 * DH-3 changed the package from a bundled build to a preserve-modules build.
 * That is what makes per-module `"use client"` directives survive: esbuild
 * drops a directive prologue the moment it bundles, which is why the old build
 * had to re-inject one directive per entry point afterwards — making every
 * export in the package a client reference, pure functions included.
 *
 * Not bundling has one cost, and this script is it. esbuild in transform mode
 * does not resolve anything, so the emitted files still carry the source's own
 * specifiers:
 *
 *   import { cn } from "@/lib/utils";     ← a tsconfig path alias
 *   import { Container } from "./Container";  ← no file extension
 *
 * Neither resolves in a consumer's ESM graph. This rewrites both against the
 * emitted tree, which is the only thing that can be checked: it resolves to a
 * file that must actually exist in dist/, and fails loudly if one does not.
 *
 * Exit codes: 0 = every specifier resolved. 1 = at least one did not.
 *
 * Usage: node scripts/resolve-specifiers.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, resolve, sep } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const DIST = join(here, "..", "dist");

if (!existsSync(DIST)) {
  console.error("✖ dist/ does not exist — run the build first");
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(js|d\.ts)$/.test(entry)) files.push(p);
  }
})(DIST);

/** Resolve a target path (no extension) to the emitted file that satisfies it. */
function emittedTarget(absNoExt, forTypes) {
  const exts = forTypes ? [".d.ts"] : [".js"];
  for (const e of exts) if (existsSync(absNoExt + e)) return absNoExt + e;
  for (const e of exts) if (existsSync(join(absNoExt, "index" + e))) return join(absNoExt, "index" + e);
  // A directory whose index exists only as JS is still the right JS target, and
  // vice versa — check the other kind before giving up, so a types-only or
  // runtime-only module does not fail the whole build.
  const other = forTypes ? ".js" : ".d.ts";
  if (existsSync(absNoExt + other)) return absNoExt + other;
  if (existsSync(join(absNoExt, "index" + other))) return join(absNoExt, "index" + other);
  return null;
}

const SPECIFIER = /(\bfrom\s*|\bimport\s*|\bexport\s*\*\s*from\s*|\bimport\s*\()(["'])([^"']+)\2/g;

let rewritten = 0;
const unresolved = [];

for (const file of files) {
  const forTypes = file.endsWith(".d.ts");
  const src = readFileSync(file, "utf8");
  let changed = false;

  const out = src.replace(SPECIFIER, (whole, lead, quote, spec) => {
    // Bare package names (react, clsx, lucide-react, …) stay as they are.
    if (!spec.startsWith("@/") && !spec.startsWith(".")) return whole;
    // Already carries an extension.
    if (/\.(js|css|json)$/.test(spec)) return whole;

    const absNoExt = spec.startsWith("@/")
      ? join(DIST, spec.slice(2))
      : resolve(dirname(file), spec);

    const target = emittedTarget(absNoExt, forTypes);
    if (!target) {
      unresolved.push(`${relative(DIST, file)} -> "${spec}"`);
      return whole;
    }

    let rel = relative(dirname(file), target).split(sep).join("/");
    if (!rel.startsWith(".")) rel = "./" + rel;
    // A .d.ts import must not carry the .d.ts extension — TypeScript resolves
    // "./x.js" to "./x.d.ts" itself, and writing the declaration extension is
    // an error under every moduleResolution mode a consumer might use.
    if (forTypes) rel = rel.replace(/\.d\.ts$/, ".js");

    changed = true;
    rewritten++;
    return `${lead}${quote}${rel}${quote}`;
  });

  if (changed) writeFileSync(file, out);
}

if (unresolved.length) {
  console.error(`✖ ${unresolved.length} specifier(s) did not resolve against dist/:\n`);
  for (const u of unresolved.slice(0, 30)) console.error(`    ${u}`);
  if (unresolved.length > 30) console.error(`    … and ${unresolved.length - 30} more`);
  process.exit(1);
}

console.log(`✓ resolved ${rewritten} specifier(s) across ${files.length} emitted file(s)`);
