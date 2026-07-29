#!/usr/bin/env node
/**
 * CLI: diagnose the publish credential before anything irreversible happens.
 *
 *   NODE_AUTH_TOKEN=… node scripts/release/preflight-credential.mjs
 *
 * Distinguishes, as far as GitHub permits from a read-only probe:
 *   missing credential · invalid credential · missing read:packages ·
 *   missing write:packages · organization (SSO) restriction · indeterminate
 *
 * **The token value is never printed, logged, or written anywhere.** Only the
 * `x-oauth-scopes` / SSO response headers and the resulting classification are
 * shown. The token's first four characters (`ghp_`, `github_pat_`, …) are
 * reported solely to identify classic vs fine-grained, which changes how the
 * result must be read.
 *
 * HONEST LIMITATION, stated up front and repeated in the output: **no read-only
 * probe can establish whether this token's owner is allowed to CREATE a new
 * package in the `studiopod` organization.** GitHub exposes no endpoint for it.
 * `write:packages` is necessary but not sufficient. First-publish permission is
 * proven only by the publish attempt.
 *
 * Exit 0 = the checkable preconditions hold. Exit 1 = a definite blocker.
 */

import { CREDENTIAL_CODES, classifyCredential } from "./lib/registry.mjs";

const token = process.env.NODE_AUTH_TOKEN ?? process.env.DS_NPM_TOKEN ?? "";
const present = token.trim().length > 0;
const tokenPrefix = present ? `${token.slice(0, 4)}…` : null;

let status = null;
let scopesHeader = null;
let ssoHeader = null;

if (present) {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "studiopod-release-preflight",
      },
    });
    status = response.status;
    scopesHeader = response.headers.get("x-oauth-scopes");
    ssoHeader = response.headers.get("x-github-sso");
  } catch (error) {
    console.error(`::error::credential probe could not reach api.github.com: ${error.message}`);
    process.exit(1);
  }
}

const result = classifyCredential({ present, status, scopesHeader, ssoHeader, tokenPrefix });

console.log("── Credential preflight ─────────────────────────");
console.log(`  credential present : ${present ? "yes" : "NO"}`);
console.log(`  token kind         : ${tokenPrefix ?? "n/a"}${tokenPrefix === "ghp_…" ? " (classic PAT)" : ""}`);
console.log(`  api status         : ${status ?? "n/a"}`);
console.log(`  x-oauth-scopes     : ${scopesHeader === null ? "(absent)" : scopesHeader || "(empty)"}`);
console.log(`  sso header         : ${ssoHeader ?? "(none)"}`);
console.log(`  diagnosis          : ${result.code}`);
console.log(`  detail             : ${result.detail}`);
console.log("─────────────────────────────────────────────────");

if (!result.publishable) {
  console.error(`::error title=Publish credential not usable::${result.code} — ${result.detail}`);
  process.exit(1);
}

console.log("⚠ NOT a guarantee of first-publish permission:");
console.log(`  ${result.caveat}`);
console.log("");
console.log("Organization-side confirmation still required before a real publish:");
console.log("  1. token owner is an authorized member of the `studiopod` organization");
console.log("  2. token has write:packages                     (verified above)");
console.log("  3. classic PAT use is permitted by org policy");
console.log("  4. token is SSO-authorized for `studiopod`, if SSO is enforced");
console.log("  5. the org permits this owner to CREATE a new package");
console.log("  6. Actions can read the DS_NPM_TOKEN secret     (verified above)");
