#!/usr/bin/env node
/**
 * CLI: does the dry run's packed tarball reconcile with the resolved target?
 *
 *   node scripts/release/check-dry-run-artifact.mjs \
 *     --mode bump --release-type patch \
 *     --packed 0.13.0 --current 0.13.0 --target 0.13.1
 *
 * Exit 0 = consistent. Exit 1 = the artifact or the target is wrong.
 *
 * Replaces the inline `test "$VER" = "<target>"` that the dry-run job used to
 * run, which could not pass in bump mode because the dry run never applies the
 * version bump. See lib/dry-run-artifact.mjs for the full reasoning.
 *
 * Reads nothing from disk and writes nothing — every value is passed in, so the
 * workflow remains the single place that decides what is being compared.
 */

import { verifyDryRunArtifact } from "./lib/dry-run-artifact.mjs";

function arg(flag) {
  const index = process.argv.indexOf(flag);
  const value = index === -1 ? undefined : process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

const mode = arg("--mode") ?? "committed";
// An empty string from a workflow input must read as "absent", not as a value —
// the same trap resolve-target.mjs guards against.
const releaseType = arg("--release-type") || undefined;
const packedVersion = arg("--packed");
const currentVersion = arg("--current");
const targetVersion = arg("--target");

const result = verifyDryRunArtifact({
  mode,
  releaseType,
  packedVersion,
  currentVersion,
  targetVersion,
});

console.log("── Dry-run artifact reconciliation ──────────────");
console.log(`  mode              : ${mode}`);
console.log(`  release type      : ${releaseType ?? "<none>"}`);
console.log(`  packed version    : ${packedVersion ?? "<unset>"}`);
console.log(`  committed version : ${currentVersion ?? "<unset>"}`);
console.log(`  would publish     : ${targetVersion ?? "<unset>"}`);
console.log("─────────────────────────────────────────────────");

for (const note of result.notes) console.log(`  ${note}`);

if (result.ok) {
  console.log("✔ packed tarball reconciles with the resolved release target.");
  process.exit(0);
}

for (const problem of result.problems) {
  console.error(`::error title=Dry-run artifact mismatch::${problem}`);
}
process.exit(1);
