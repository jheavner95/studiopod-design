#!/usr/bin/env node
/**
 * CLI: diagnose the publish credential before anything irreversible happens.
 *
 *   NODE_AUTH_TOKEN=… node scripts/release/preflight-credential.mjs
 *
 * ORG-2B rewrite. The credential is now GITHUB_TOKEN, not a personal access
 * token, and that changes what is worth checking here.
 *
 * The previous version of this script called `api.github.com/user` and read
 * `x-oauth-scopes` / SSO headers to diagnose a classic PAT's organization
 * membership and scope grants. None of that applies to GITHUB_TOKEN: it is an
 * installation token, not a user OAuth token, `GET /user` does not
 * authenticate it the same way, and there is no "studiopod org member" model
 * to check anymore — see docs/MIGRATION-ORG-2.md for why.
 *
 * What IS worth proving before `npm publish` runs: that the credential can
 * actually reach the registry and read a package under the scope it is about
 * to publish into. A registry-level control read — the same technique
 * check-registry.mjs uses to distinguish "genuinely absent" from "cannot see
 * it" — answers that without depending on any GitHub-API-specific token
 * shape, so it works identically whether the credential in NODE_AUTH_TOKEN is
 * GITHUB_TOKEN or, if this workflow ever needs one again, a PAT.
 *
 * HONEST LIMITATION, stated up front and repeated in the output: **no
 * read-only probe can establish whether this token can CREATE a new package**
 * — first-publish permission is proven only by the publish attempt. This was
 * true of the old PAT model too; it does not go away with GITHUB_TOKEN.
 *
 * Exit 0 = the checkable preconditions hold. Exit 1 = a definite blocker.
 */

import { execFileSync } from "node:child_process";

const token = process.env.NODE_AUTH_TOKEN ?? "";
const present = token.trim().length > 0;
const registry = process.env.DS_REGISTRY || "https://npm.pkg.github.com";

/** A package that already exists under the CURRENT scope, same as the target. */
const CONTROL_PACKAGE = "@jheavner95/design";

console.log("── Credential preflight ─────────────────────────");
console.log(`  credential present : ${present ? "yes" : "NO"}`);

if (!present) {
  console.error("::error title=Publish credential not usable::NODE_AUTH_TOKEN is empty.");
  process.exit(1);
}

let controlReadOk = false;
let detail = "";
try {
  execFileSync("npm", ["view", CONTROL_PACKAGE, "version", "--json", `--registry=${registry}`], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  controlReadOk = true;
} catch (error) {
  // A 404 here means the FIRST publish of @jheavner95/design has not happened
  // yet — that is not a credential failure, it is the expected state before
  // this package exists. Anything else (401/403/network) is.
  const stderr = String(error.stderr ?? error.message ?? "");
  if (/E404|404 Not Found|does not exist/i.test(stderr)) {
    controlReadOk = true;
    detail = "package not yet published — read succeeded, absence is genuine";
  } else {
    detail = stderr.replace(/(Bearer|token|_authToken=)\s*\S+/gi, "$1 <redacted>").split("\n").slice(0, 3).join(" | ");
  }
}

console.log(`  registry           : ${registry}`);
console.log(`  control package    : ${CONTROL_PACKAGE} — ${controlReadOk ? "reachable" : "NOT reachable"}`);
if (detail) console.log(`  detail             : ${detail}`);
console.log("─────────────────────────────────────────────────");

if (!controlReadOk) {
  console.error(`::error title=Publish credential not usable::could not read ${CONTROL_PACKAGE} from ${registry}: ${detail}`);
  process.exit(1);
}

console.log("⚠ NOT a guarantee of first-publish permission:");
console.log("  A credential that can READ under this scope is not proof it can CREATE");
console.log("  a brand-new package name. That is proven only by the publish attempt.");
