/**
 * Registry-result and credential-result classification.
 *
 * The I/O lives in the CLI wrappers; everything that DECIDES lives here, as
 * pure functions over already-captured output, so the decision logic is unit
 * tested rather than discovered during a release.
 *
 * The governing rule: **only an explicitly-proven-available coordinate may be
 * published.** Every ambiguous outcome maps to `blocked`, never to `available`.
 * A 404 is the same response whether a package is genuinely absent or the
 * caller merely cannot see it, so a bare 404 is not evidence of availability —
 * it counts only once a control read has proven auth and routing work.
 */

/** Terminal verdicts for a coordinate check. */
export const AVAILABLE = "available";
export const ALREADY_PUBLISHED = "already-published";
export const BLOCKED = "blocked";

/**
 * Classify the registry's answer for a specific name@version.
 *
 * @param {object} input
 * @param {boolean} input.controlReadSucceeded  did reading a KNOWN package work?
 * @param {number|null} input.status            HTTP-ish status, when known
 * @param {string[]|null} input.publishedVersions versions the registry reports
 * @param {string} input.targetVersion
 * @param {string} [input.stderr]
 */
export function classifyCoordinate({
  controlReadSucceeded,
  status,
  publishedVersions,
  targetVersion,
  stderr = "",
}) {
  // Auth/routing must be proven independently before a 404 means anything.
  if (!controlReadSucceeded) {
    return {
      verdict: BLOCKED,
      reason:
        "registry-configuration-or-auth: the control read of a known-published package failed, " +
        "so a 404 for the target cannot be distinguished from an unreadable registry.",
    };
  }

  if (/E401|Unauthorized/i.test(stderr)) {
    return { verdict: BLOCKED, reason: "authentication: registry returned 401." };
  }
  if (/E403|Forbidden/i.test(stderr)) {
    return { verdict: BLOCKED, reason: "authorization: registry returned 403." };
  }

  if (Array.isArray(publishedVersions)) {
    if (publishedVersions.includes(targetVersion)) {
      return {
        verdict: ALREADY_PUBLISHED,
        reason:
          `version ${targetVersion} is already published. A published name@version is permanent — ` +
          `it cannot be reused after unpublish.`,
      };
    }
    return {
      verdict: AVAILABLE,
      reason: `package exists; ${targetVersion} is not among its ${publishedVersions.length} published version(s).`,
    };
  }

  if (status === 404) {
    return {
      verdict: AVAILABLE,
      reason: "package does not exist yet; this would be its first publish (control read proved auth and routing).",
    };
  }

  return {
    verdict: BLOCKED,
    reason: `ambiguous: could not determine registry state (status=${status ?? "unknown"}).`,
  };
}

/** Credential diagnosis codes, ordered from most to least actionable. */
export const CREDENTIAL_CODES = {
  MISSING: "missing-credential",
  INVALID: "invalid-credential",
  NO_READ: "missing-read-packages",
  NO_WRITE: "missing-write-packages",
  SSO: "organization-restriction",
  OK: "credential-ok",
  UNKNOWN: "indeterminate",
};

/**
 * Classify a credential from a GitHub API probe.
 *
 * Scopes come from the `x-oauth-scopes` response header, which classic PATs
 * populate. Fine-grained tokens do not, which is why an empty scope list on an
 * otherwise-valid token is reported as indeterminate rather than as a failure.
 *
 * @param {object} input
 * @param {boolean} input.present
 * @param {number|null} input.status
 * @param {string|null} input.scopesHeader
 * @param {string|null} [input.ssoHeader]
 * @param {string|null} [input.tokenPrefix]
 */
export function classifyCredential({
  present,
  status,
  scopesHeader,
  ssoHeader = null,
  tokenPrefix = null,
}) {
  if (!present) {
    return {
      code: CREDENTIAL_CODES.MISSING,
      publishable: false,
      detail: "no credential was supplied to the step (secret unset or not wired into the job).",
    };
  }

  if (status === 401) {
    return {
      code: CREDENTIAL_CODES.INVALID,
      publishable: false,
      detail: "the registry/API rejected the credential (401) — expired, revoked, or malformed.",
    };
  }

  // GitHub signals an unauthorised-for-SSO token with this header.
  if (ssoHeader) {
    return {
      code: CREDENTIAL_CODES.SSO,
      publishable: false,
      detail:
        "the token is valid but not authorized for the organization (SAML/SSO). " +
        "Authorize it for `studiopod` in the token's settings page.",
    };
  }

  if (status !== 200) {
    return {
      code: CREDENTIAL_CODES.UNKNOWN,
      publishable: false,
      detail: `unexpected status ${status ?? "unknown"} while probing the credential.`,
    };
  }

  // A fine-grained PAT authenticates fine but reports no classic scopes.
  if (scopesHeader === null || scopesHeader === "") {
    return {
      code: CREDENTIAL_CODES.UNKNOWN,
      publishable: false,
      detail:
        "the credential authenticated but reported no classic OAuth scopes. This is expected for a " +
        "fine-grained PAT, whose package permissions cannot be read from a response header — " +
        "confirm `Packages: write` on the token, and note this workflow's publish path expects a classic PAT.",
      tokenPrefix,
    };
  }

  const scopes = scopesHeader.split(",").map((s) => s.trim()).filter(Boolean);
  const hasRead = scopes.includes("read:packages") || scopes.includes("write:packages");
  const hasWrite = scopes.includes("write:packages");

  if (!hasRead) {
    return {
      code: CREDENTIAL_CODES.NO_READ,
      publishable: false,
      detail: `scopes are [${scopes.join(", ")}] — no read:packages, so the registry is not even readable.`,
    };
  }

  if (!hasWrite) {
    return {
      code: CREDENTIAL_CODES.NO_WRITE,
      publishable: false,
      detail:
        `scopes are [${scopes.join(", ")}] — read-only. Publishing needs write:packages. ` +
        `This is the exact state the local PAT was found in during DS-7.3a-R.`,
    };
  }

  return {
    code: CREDENTIAL_CODES.OK,
    publishable: true,
    detail: `scopes are [${scopes.join(", ")}] — includes write:packages.`,
    // Deliberately NOT "cleared to publish": see below.
    caveat:
      "write:packages is necessary but NOT sufficient for a FIRST publish into an organization " +
      "namespace. Whether this token's owner may CREATE a new package under `studiopod` cannot be " +
      "determined by any read-only probe — GitHub exposes no such endpoint. It is proven only by " +
      "the publish attempt itself.",
  };
}
