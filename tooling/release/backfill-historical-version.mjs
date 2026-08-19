#!/usr/bin/env node
/**
 * CLI: republish an already-published `@studiopod/design@<version>` under
 * the current identity, `@jheavner95/design@<version>`, unchanged.
 *
 *   node tooling/release/backfill-historical-version.mjs --version 0.14.0 [--dry-run]
 *
 * This is NOT a release. It exists for exactly one situation: a consumer
 * (studiopod-web, ORG-2C3) is pinned to a legacy version that predates the
 * ORG-2B identity migration, so there is no `@jheavner95/design` build of
 * that version to move it to. Rebuilding that version from historical source
 * would risk resolving a different Foundation version than the original
 * release used (ORG-2C3A found the original built against
 * @studiopod/foundation@0.3.0, which was never republished as
 * @jheavner95/foundation@0.3.0 — only 0.4.0 exists under the new identity).
 * Rebuilding against 0.4.0 would silently change token values baked into a
 * "historical, unchanged" artifact. So this script does not rebuild anything.
 *
 * It takes the artifact the registry already has — the actual bytes a
 * consumer of that version has always received — and republishes it under
 * the new name. Every file is byte-identical except `package.json`, where
 * exactly one field changes: `name`.
 *
 * ── Two credentials, two directions, never mixed ────────────────────────────
 *
 * Reading `@studiopod/design` needs a PAT: that scope was never linked to
 * this repository (ORG-1/ORG-2B), so GITHUB_TOKEN cannot reach it — this is
 * measured, not assumed, elsewhere in this repository's history. Publishing
 * `@jheavner95/design` needs no PAT: that scope IS linked here, and
 * GITHUB_TOKEN with `packages: write` is sufficient (ORG-2B).
 *
 * Two temporary, single-purpose .npmrc files carry this — never the same
 * file, never the same npm invocation — so a bug here cannot end with the
 * write credential attempting a read of the legacy scope, or vice versa.
 * Neither token value is ever read, printed, or logged by this script.
 *
 * ── What this deliberately does NOT do ──────────────────────────────────────
 *
 *   - It does not create a git tag. `design-system-v<version>` already names
 *     the legacy release; creating a second tag for the same version number
 *     would be false — nothing new was released, an existing artifact was
 *     made reachable under a new name.
 *   - It does not create a GitHub Release.
 *   - It does not touch package.json, package-lock.json, or any tracked file
 *     on `main`. `main` stays at whatever version it is actually released at
 *     (0.19.1 as of ORG-2C3A) regardless of which historical version this
 *     backfills.
 *   - It does not rebuild. The published tarball is the baseline contract,
 *     not the source tree at the historical commit.
 *
 * Exit 0 = published (or, in --dry-run, would publish cleanly).
 * Exit 1 = any problem — including the two tarballs not actually matching
 * the "identity field only" contract, which is checked before publishing,
 * not assumed.
 */

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const REGISTRY = "https://npm.pkg.github.com";
const OLD_SCOPE = "@studiopod";
const NEW_SCOPE = "@jheavner95";
const OLD_NAME = `${OLD_SCOPE}/design`;
const NEW_NAME = `${NEW_SCOPE}/design`;

function arg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}
const hasFlag = (flag) => process.argv.includes(flag);

const version = arg("--version");
const dryRun = hasFlag("--dry-run");

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("::error::--version x.y.z is required");
  process.exit(1);
}

const readToken = process.env.LEGACY_READ_TOKEN ?? "";
const writeToken = process.env.NODE_AUTH_TOKEN ?? "";
// The fetch step runs whether or not this is a dry run — a dry run proves
// the real pipeline against the real registry, it just stops before publish.
if (!readToken) {
  console.error("::error::LEGACY_READ_TOKEN is required — the legacy artifact is always fetched fresh, dry run or not.");
  process.exit(1);
}
if (!dryRun && !writeToken) {
  console.error("::error::NODE_AUTH_TOKEN is required to publish.");
  process.exit(1);
}

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

function walk(dir, base = dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else if (entry.isFile()) out.push(relative(base, full));
  }
  return out;
}

/** A throwaway .npmrc that resolves ONE registry with ONE credential, nothing else. */
function writeScopedNpmrc(path, scope, token) {
  writeFileSync(path, `${scope}:registry=${REGISTRY}\n//npm.pkg.github.com/:_authToken=${token}\n`);
}

const scratch = mkdtempSync(join(tmpdir(), "design-backfill-"));
const problems = [];
const ok = [];

try {
  // ── 1. Fetch the legacy artifact — the actual published bytes ─────────────
  const readRc = join(scratch, ".npmrc-read");
  writeScopedNpmrc(readRc, OLD_SCOPE, readToken);

  const fetchDir = join(scratch, "fetch");
  mkdirSync(fetchDir, { recursive: true });
  console.log(`fetching ${OLD_NAME}@${version} from ${REGISTRY} …`);
  execFileSync("npm", ["pack", `${OLD_NAME}@${version}`, "--userconfig", readRc, "--pack-destination", fetchDir], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  const legacyTarball = readdirSync(fetchDir).find((f) => f.endsWith(".tgz"));
  if (!legacyTarball) throw new Error("npm pack produced no tarball for the legacy version");
  ok.push(`fetched ${OLD_NAME}@${version} (${legacyTarball})`);

  // ── 2. Extract, and record every file's hash before touching anything ─────
  const extractDir = join(scratch, "extracted");
  mkdirSync(extractDir, { recursive: true });
  execFileSync("tar", ["-xzf", join(fetchDir, legacyTarball), "-C", extractDir], { stdio: "ignore" });
  const pkgDir = join(extractDir, "package");

  const beforeFiles = walk(pkgDir);
  const beforeHashes = new Map(beforeFiles.map((f) => [f, sha256(join(pkgDir, f))]));

  // ── 3. Rewrite package.json#name. Nothing else in the tree is touched. ────
  const manifestPath = join(pkgDir, "package.json");
  const manifestText = readFileSync(manifestPath, "utf8");
  const manifest = JSON.parse(manifestText);
  if (manifest.name !== OLD_NAME) {
    throw new Error(`expected package.json#name to be "${OLD_NAME}", got "${manifest.name}"`);
  }
  const rewritten = manifestText.replace(
    `"name": "${OLD_NAME}"`,
    `"name": "${NEW_NAME}"`,
  );
  if (rewritten === manifestText) {
    throw new Error("package.json#name replacement did not match — refusing to publish an unverified rewrite");
  }
  writeFileSync(manifestPath, rewritten);
  ok.push(`package.json#name: ${OLD_NAME} -> ${NEW_NAME}`);

  // ── 4. Prove the ONLY difference is that one field, before publishing ─────
  const afterFiles = walk(pkgDir);
  if (afterFiles.length !== beforeFiles.length || afterFiles.some((f, i) => f !== beforeFiles[i])) {
    throw new Error("file set changed during rewrite — this should be impossible and is not safe to publish");
  }
  const changed = afterFiles.filter((f) => sha256(join(pkgDir, f)) !== beforeHashes.get(f));
  if (changed.length !== 1 || changed[0] !== "package.json") {
    problems.push(
      `expected exactly one changed file (package.json), got: ${changed.join(", ") || "(none)"}`,
    );
  } else {
    ok.push(`equivalence proven: ${afterFiles.length} files, only package.json differs`);
  }

  const finalManifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (finalManifest.version !== version) {
    problems.push(`version drifted: manifest now says ${finalManifest.version}, expected ${version}`);
  }

  if (problems.length > 0) {
    console.error("\n✖ Backfill equivalence check FAILED:\n");
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  for (const line of ok) console.log(`  ✔ ${line}`);

  // ── 5. Repack the modified tree into a real tarball ────────────────────────
  const repackDir = join(scratch, "repack");
  mkdirSync(repackDir, { recursive: true });
  execFileSync("npm", ["pack", "--pack-destination", repackDir], { cwd: pkgDir, stdio: ["ignore", "pipe", "pipe"] });
  const newTarball = readdirSync(repackDir).find((f) => f.endsWith(".tgz"));
  if (!newTarball) throw new Error("repack produced no tarball");
  console.log(`  ✔ repacked: ${newTarball}`);

  if (dryRun) {
    console.log(`\n✔ DRY RUN — would publish ${NEW_NAME}@${version} from ${join(repackDir, newTarball)}. Nothing published.`);
    process.exit(0);
  }

  // ── 6. Publish — the only irreversible step ────────────────────────────────
  const writeRc = join(scratch, ".npmrc-write");
  writeScopedNpmrc(writeRc, NEW_SCOPE, writeToken);
  execFileSync(
    "npm",
    ["publish", join(repackDir, newTarball), "--userconfig", writeRc],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  console.log(`\n✔ published ${NEW_NAME}@${version}`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
