#!/usr/bin/env node
/**
 * Export-map verification for @studiopod/design-system (DS-0.5).
 *
 * `check-api.mjs` verifies WHAT is exported (the symbol surface). This verifies
 * that the package's declared entry points are actually RESOLVABLE and shippable
 * — the failure mode where `exports` advertises a subpath whose file was never
 * built, which npm will happily publish and which only explodes in a consumer.
 *
 * Checks, per entry in package.json#exports:
 *   1. every declared target file exists on disk
 *   2. every JS target is real ESM (has an `export` statement)
 *   3. every `types` target exists and is non-empty
 *   4. the CSS export exists and still carries its @theme block (the whole
 *      point of the CSS entry — consumers' Tailwind builds depend on it)
 *   5. entries that ship client components retain their "use client" directive
 *      (tsup's treeshake pass strips it; see tsup.config.ts)
 *   6. every file the exports map points at is inside the `files` allowlist,
 *      i.e. it will actually be present in the published tarball
 *
 * Deliberately does NOT `import()` the built files: they reference "next/link"
 * etc. as bare specifiers, which a plain Node ESM loader cannot resolve outside
 * a bundler. Static checks need no module resolution and cannot false-negative
 * for that reason.
 *
 * Exit codes: 0 = all good. 1 = at least one problem.
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

/** Entries whose bundles include React client components. */
const CLIENT_ENTRIES = new Set(["./dist/index.js", "./dist/marketing.js", "./dist/illustrations.js"]);

const problems = [];
const ok = [];

/** Collect every concrete file target from the exports map. */
function targets(node, subpath) {
  if (typeof node === "string") return [[subpath, node]];
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([cond, v]) =>
      targets(v, `${subpath} (${cond})`),
    );
  }
  return [];
}

const all = Object.entries(pkg.exports ?? {}).flatMap(([sub, node]) => targets(node, sub));

if (all.length === 0) problems.push("package.json#exports is empty or missing");

for (const [subpath, rel] of all) {
  const abs = join(pkgRoot, rel);

  if (!existsSync(abs)) {
    problems.push(`${subpath} -> ${rel} DOES NOT EXIST (run "npm run build" first)`);
    continue;
  }
  if (statSync(abs).size === 0) {
    problems.push(`${subpath} -> ${rel} is EMPTY`);
    continue;
  }

  const body = readFileSync(abs, "utf8");

  if (rel.endsWith(".js")) {
    if (!/\bexport\s*[{*]|\bexport\s+(default|const|function|class)\b/.test(body)) {
      problems.push(`${subpath} -> ${rel} has no ESM export statement — not a valid ESM entry`);
      continue;
    }
    if (CLIENT_ENTRIES.has(rel) && !body.startsWith('"use client"')) {
      problems.push(
        `${subpath} -> ${rel} is MISSING its "use client" directive. tsup's treeshake pass strips ` +
          `module-level directives; scripts/inject-use-client.mjs must re-add it (see tsup.config.ts).`,
      );
      continue;
    }
  }

  if (rel.endsWith(".css")) {
    if (!body.includes("@theme")) {
      problems.push(
        `${subpath} -> ${rel} has NO @theme block. Consumers' Tailwind builds derive every ` +
          `canonical token from it; without it the design system silently stops being canonical.`,
      );
      continue;
    }
  }

  if (rel.endsWith(".d.ts") && body.trim().length < 10) {
    problems.push(`${subpath} -> ${rel} looks empty — declarations not generated`);
    continue;
  }

  // Will this file actually ship? `files` is an allowlist of top-level entries.
  const files = pkg.files ?? [];
  const top = rel.replace(/^\.\//, "").split("/")[0];
  if (files.length && !files.includes(top)) {
    problems.push(
      `${subpath} -> ${rel} is NOT covered by package.json#files (${JSON.stringify(files)}) — ` +
        `it would be missing from the published tarball`,
    );
    continue;
  }

  ok.push(`${subpath} -> ${rel}`);
}

// `main`/`types` must agree with the exports map if present.
for (const field of ["main", "types"]) {
  const rel = pkg[field];
  if (rel && !existsSync(join(pkgRoot, rel))) {
    problems.push(`package.json#${field} -> ${rel} DOES NOT EXIST`);
  }
}

// sideEffects must keep CSS alive while letting JS tree-shake.
const se = pkg.sideEffects;
if (se === undefined) {
  problems.push(`package.json#sideEffects is unset — bundlers will assume side effects and skip tree-shaking`);
} else if (se === false) {
  problems.push(`package.json#sideEffects is false — the CSS entry could be dropped by bundlers`);
} else if (Array.isArray(se) && !se.some((p) => p.includes("css"))) {
  problems.push(`package.json#sideEffects does not preserve CSS: ${JSON.stringify(se)}`);
}

for (const line of ok) console.log(`✓ ${line}`);

if (problems.length) {
  console.error("");
  for (const p of problems) console.error(`✗ ${p}`);
  console.error(`\nExport verification FAILED (${problems.length} problem(s)).`);
  process.exit(1);
}

console.log(`\nExport verification passed — ${ok.length} entry target(s) resolve, ship, and are well-formed.`);
