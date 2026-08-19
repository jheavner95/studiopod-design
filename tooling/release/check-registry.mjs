#!/usr/bin/env node
/**
 * CLI: is `<name>@<version>` free to publish?
 *
 *   node scripts/release/check-registry.mjs --name @jheavner95/design --version 0.13.0
 *
 * Exit 0 = available. Exit 1 = already published, ambiguous, or unreadable.
 *
 * A bare 404 is NOT treated as proof of availability. GitHub Packages returns
 * 404 both for "no such package" and for "you may not see this package", so
 * this first performs a CONTROL READ of a package known to be published
 * (`@studiopod/design-system`). Only if that read succeeds — proving the
 * credential and registry routing work — is a 404 on the target accepted as
 * genuine absence. Every other outcome is blocked.
 *
 * Authentication comes from the environment (NODE_AUTH_TOKEN, as wired by
 * actions/setup-node). No token value is read, printed, or logged here.
 */

import { execFileSync } from "node:child_process";

import { classifyCoordinate, AVAILABLE, ALREADY_PUBLISHED } from "./lib/registry.mjs";

function arg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  const value = index === -1 ? undefined : process.argv[index + 1];
  return value && !value.startsWith("--") ? value : fallback;
}

const name = arg("--name", "@jheavner95/design");
const version = arg("--version");
const registry = arg("--registry", process.env.DS_REGISTRY || "https://npm.pkg.github.com");
const controlPackage = arg("--control", "@studiopod/design-system");

if (!version) {
  console.error("::error::--version is required");
  process.exit(1);
}

/** `npm view <spec> versions --json`, captured without throwing. */
function npmView(spec) {
  try {
    const stdout = execFileSync(
      "npm",
      ["view", spec, "versions", "--json", `--registry=${registry}`],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    return { ok: true, stdout, stderr: "" };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.toString() ?? "",
      stderr: error.stderr?.toString() ?? String(error.message ?? ""),
    };
  }
}

// ── Control read: prove auth + routing before trusting any 404 ──────────────
const control = npmView(controlPackage);
const controlReadSucceeded = control.ok && control.stdout.trim().length > 0;

console.log(`registry        : ${registry}`);
console.log(`control package : ${controlPackage} — ${controlReadSucceeded ? "readable" : "NOT readable"}`);

if (!controlReadSucceeded) {
  // Surface the reason without echoing anything token-shaped.
  const redacted = control.stderr.replace(/(Bearer|token|_authToken=)\s*\S+/gi, "$1 <redacted>");
  console.log(`control read stderr (redacted): ${redacted.split("\n").slice(0, 3).join(" | ")}`);
}

// ── Target read ─────────────────────────────────────────────────────────────
const target = npmView(name);
let publishedVersions = null;
let status = null;

if (target.ok) {
  try {
    const parsed = JSON.parse(target.stdout);
    publishedVersions = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    publishedVersions = null;
  }
} else if (/E404|404 Not Found|does not exist/i.test(target.stderr)) {
  status = 404;
}

const result = classifyCoordinate({
  controlReadSucceeded,
  status,
  publishedVersions,
  targetVersion: version,
  stderr: target.stderr,
});

console.log(`target          : ${name}@${version}`);
console.log(`verdict         : ${result.verdict}`);
console.log(`reason          : ${result.reason}`);

if (result.verdict === AVAILABLE) {
  console.log(`✔ ${name}@${version} is free to publish.`);
  process.exit(0);
}

if (result.verdict === ALREADY_PUBLISHED) {
  console.error(`::error title=Version already published::${result.reason}`);
} else {
  console.error(`::error title=Registry check blocked::${result.reason}`);
}
process.exit(1);
