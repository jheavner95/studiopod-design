#!/usr/bin/env node
/**
 * CLI: resolve the release target and emit it for the workflow.
 *
 *   node scripts/release/resolve-target.mjs --mode committed
 *   node scripts/release/resolve-target.mjs --mode bump --release-type minor
 *
 * Writes `name`, `version`, `tag`, `mode`, `will-mutate-manifest` to
 * $GITHUB_OUTPUT when running in Actions, and always prints a human summary.
 *
 * In `committed` mode this process NEVER writes to package.json or the
 * lockfile — it only reads. That is enforced downstream too: the workflow
 * re-checks `git status --porcelain` after this step.
 */

import { readFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { resolveTarget } from "./lib/resolve-target.mjs";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const manifestPath = join(repoRoot, "packages/design-system/package.json");

function arg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

const mode = arg("--mode") ?? "committed";
// An empty string from a workflow input must read as "absent", not as a value.
const releaseType = arg("--release-type") || undefined;

let target;
try {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  target = resolveTarget({ mode, releaseType, manifest });
} catch (error) {
  console.error(`::error title=Release target unresolved::${error.message}`);
  process.exit(1);
}

console.log("── Release target ───────────────────────────────");
console.log(`  mode              : ${target.mode}`);
console.log(`  package           : ${target.name}`);
console.log(`  committed version : ${target.currentVersion}`);
console.log(`  version to publish: ${target.version}`);
console.log(`  tag               : ${target.tag}`);
console.log(`  mutates manifest  : ${target.willMutateManifest ? "yes" : "no"}`);
console.log("─────────────────────────────────────────────────");

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    [
      `mode=${target.mode}`,
      `name=${target.name}`,
      `version=${target.version}`,
      `current-version=${target.currentVersion}`,
      `tag=${target.tag}`,
      `will-mutate-manifest=${target.willMutateManifest}`,
      "",
    ].join("\n"),
  );
}
