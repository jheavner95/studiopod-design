#!/usr/bin/env node
/**
 * The one verification runner behind `npm run verify:fast|verify|verify:full`
 * (DS-1D). Runs a named tier's steps as child processes, in order, and prints
 * a consistent ✔/✖/⋯ summary with per-step duration — the thing plain `&&`
 * chaining in package.json cannot do: `a && b && c` tells you *that*
 * something failed, not which step, how long the passing steps took, or
 * which later steps never ran.
 *
 * This does not replace or wrap any test framework — it orchestrates the
 * same `npm run <script>` commands a developer would type by hand, one
 * subprocess per step, and reports on them. TypeScript, ESLint, Vitest,
 * Playwright, and the package's own check-*.mjs scripts are all unchanged;
 * this only changes how their pass/fail is reported when run as a group.
 *
 * Tiers are strictly additive (fast ⊂ default ⊂ full) — see
 * docs/VERIFICATION.md for what belongs in each and why.
 *
 * Usage:
 *   node scripts/verify.mjs fast
 *   node scripts/verify.mjs           # defaults to "default"
 *   node scripts/verify.mjs full
 *
 * Exit codes: 0 = every step in the tier passed. 1 = at least one failed.
 */
import { spawnSync } from "node:child_process";

const FAST_STEPS = [
  { name: "TypeScript — app", script: "typecheck" },
  { name: "TypeScript — tests", script: "test:typecheck" },
  { name: "ESLint", script: "lint" },
  { name: "Unit & component tests", script: "test" },
];

const DEFAULT_STEPS = [...FAST_STEPS, { name: "Next.js build", script: "build" }, { name: "Package verify", script: "package:verify" }];

const FULL_STEPS = [...DEFAULT_STEPS, { name: "Package pack", script: "package:pack" }];

const TIERS = { fast: FAST_STEPS, default: DEFAULT_STEPS, full: FULL_STEPS };

const tierName = process.argv[2] ?? "default";
const steps = TIERS[tierName];
if (!steps) {
  console.error(`✗ unknown tier "${tierName}" — expected one of: ${Object.keys(TIERS).join(", ")}`);
  process.exit(1);
}

console.log(`Running verify:${tierName === "default" ? "" : tierName} — ${steps.length} step(s)\n`);

const results = [];
let failedAt = -1;

for (let i = 0; i < steps.length; i++) {
  const { name, script } = steps[i];
  const start = Date.now();
  const result = spawnSync("npm", ["run", "--silent", script], { stdio: "inherit", shell: process.platform === "win32" });
  const durationMs = Date.now() - start;
  const passed = result.status === 0;

  results.push({ name, durationMs, passed });
  console.log(passed ? `\n✔ ${name}  (${formatDuration(durationMs)})\n` : `\n✖ ${name}  (${formatDuration(durationMs)})\n`);

  if (!passed) {
    failedAt = i;
    break;
  }
}

const skipped = failedAt === -1 ? [] : steps.slice(failedAt + 1).map((s) => s.name);

console.log("─".repeat(48));
console.log("Summary");
console.log("─".repeat(48));
for (const r of results) {
  console.log(`  ${r.passed ? "✔" : "✖"}  ${r.name.padEnd(28)} ${formatDuration(r.durationMs)}`);
}
for (const name of skipped) {
  console.log(`  ⋯  ${name.padEnd(28)} skipped`);
}
const totalMs = results.reduce((sum, r) => sum + r.durationMs, 0);
console.log("─".repeat(48));

if (failedAt === -1) {
  console.log(`✔ All ${results.length} step(s) passed  (${formatDuration(totalMs)} total)`);
  process.exit(0);
} else {
  console.log(
    `✖ Failed at step ${failedAt + 1}/${steps.length}: "${results[failedAt].name}" — see its output above for the failure location.`,
  );
  if (skipped.length > 0) console.log(`  ${skipped.length} step(s) not run: ${skipped.join(", ")}`);
  process.exit(1);
}

function formatDuration(ms) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}
