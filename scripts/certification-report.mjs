#!/usr/bin/env node
/**
 * Certification coverage report (DS-1F). Advisory only — always exits 0,
 * never gates `verify`/`verify:full`. Per the brief: "Do NOT add artificial
 * gates." Regex-scans certification.ts's source text rather than importing
 * it as a module, for the same reason scripts/docs-coverage.mjs does (DS-1E):
 * this must run identically under CI's Node 20, which has no native
 * TypeScript support. The real, type-safe checks run as Vitest tests
 * (src/lib/certification.test.ts) — this script only reports the registry's
 * currently-recorded state.
 *
 * Usage:
 *   node scripts/certification-report.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

const certSource = readFileSync(join(repoRoot, "src/lib/certification.ts"), "utf8");

// Total check count: every `{ id: "...", label: ...` inside CERTIFICATION_CHECKLIST.
const checklistBlock = certSource.slice(
  certSource.indexOf("export const CERTIFICATION_CHECKLIST"),
  certSource.indexOf("export function getChecklistItem"),
);
const totalChecks = [...checklistBlock.matchAll(/\{\s*id:\s*"[a-z0-9-]+",\s*label:/g)].length;
const byOwner = { automated: 0, manual: 0, advisory: 0 };
for (const match of checklistBlock.matchAll(/owner:\s*"(automated|manual|advisory)"/g)) {
  byOwner[match[1]] += 1;
}

// Registry entries: each `componentName: "...",` at the top level of CERTIFICATION_REGISTRY.
const registryBlock = certSource.slice(
  certSource.indexOf("export const CERTIFICATION_REGISTRY"),
  certSource.indexOf("export function getCertificationRecord"),
);
const entries = [...registryBlock.matchAll(/componentName:\s*"([^"]+)"/g)].map((m) => m[1]);
const levels = [...registryBlock.matchAll(/level:\s*"([^"]+)"/g)].map((m) => m[1]);
const completedCounts = [...registryBlock.matchAll(/completedChecks:\s*\[([^\]]*)\]/gs)].map(
  (m) => [...m[1].matchAll(/"[a-z0-9-]+"/g)].length,
);

console.log("StudioPOD Design System — Certification Coverage\n");

console.log(`Checklist: ${totalChecks} checks total`);
console.log(`  automated: ${byOwner.automated}   manual: ${byOwner.manual}   advisory: ${byOwner.advisory}\n`);

console.log(`Registry: ${entries.length} component(s) tracked\n`);
entries.forEach((name, i) => {
  const completed = completedCounts[i] ?? 0;
  const pct = totalChecks > 0 ? Math.round((completed / totalChecks) * 100) : 0;
  console.log(`  ${name.padEnd(20)} ${(levels[i] ?? "?").padEnd(18)} ${completed}/${totalChecks} (${pct}%)`);
});

console.log(
  "\nThis report is informational — it does not fail, and certifying every component is not this phase's goal.\nSee docs/CERTIFICATION.md for how a component gets added to the registry.",
);
