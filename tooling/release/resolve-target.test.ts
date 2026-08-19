/**
 * Tests for the release-workflow logic (DS-7.3a-R1).
 *
 * The logic lives in `tooling/release/lib/*.mjs` as plain ESM so CI's Node 20
 * can run it without a TypeScript loader — the same split as
 * `tooling/token-report.mjs`. It is imported directly here rather than
 * reimplemented, so there is exactly one implementation and these tests
 * exercise the code the workflow actually runs.
 *
 * The test file lives under `src/` because that is what `vitest.config.ts`
 * includes; the alternative was widening the shared include pattern, which is
 * more churn than a single import path.
 *
 * Why any of this is tested at all: the previous release logic lived as inline
 * shell inside YAML, where the only way to exercise it was to run a release.
 * That is how the DS-7.3a-R blocker — an unconditional `npm version` bump that
 * could never publish an already-committed version — survived unnoticed.
 */

import { describe, expect, it } from "vitest";

import {
  EXPECTED_PACKAGE_NAME,
  RELEASE_TYPES,
  TAG_PREFIX,
  bumpVersion,
  parseVersion,
  resolveTarget,
  tagFor,
} from "./lib/resolve-target.mjs";
import {
  ALREADY_PUBLISHED,
  AVAILABLE,
  BLOCKED,
  CREDENTIAL_CODES,
  classifyCoordinate,
  classifyCredential,
} from "./lib/registry.mjs";
import { verifyDryRunArtifact } from "./lib/dry-run-artifact.mjs";

/** The manifest as committed at DS-7.3a. */
const committedManifest = { name: "@studiopod/design", version: "0.13.0" };

describe("committed mode", () => {
  it("resolves exactly the committed version — 0.13.0", () => {
    const target = resolveTarget({
      mode: "committed",
      manifest: committedManifest,
    });
    expect(target.version).toBe("0.13.0");
    expect(target.currentVersion).toBe("0.13.0");
    expect(target.name).toBe("@studiopod/design");
  });

  it("never mutates the manifest", () => {
    // The flag the workflow branches on: `committed` must not reach any step
    // that runs `npm version`. This is the DS-7.3a-R blocker, encoded.
    const target = resolveTarget({
      mode: "committed",
      manifest: committedManifest,
    });
    expect(target.willMutateManifest).toBe(false);
  });

  it("derives the tag as design-system-v<version>", () => {
    const target = resolveTarget({
      mode: "committed",
      manifest: committedManifest,
    });
    expect(target.tag).toBe("design-system-v0.13.0");
    expect(TAG_PREFIX).toBe("design-system-v");
  });

  it("leaves the input manifest object untouched", () => {
    const manifest = { ...committedManifest };
    resolveTarget({ mode: "committed", manifest });
    expect(manifest).toEqual(committedManifest);
  });

  it("rejects a release type — a pre-set version plus a bump is ambiguous", () => {
    expect(() =>
      resolveTarget({
        mode: "committed",
        releaseType: "minor",
        manifest: committedManifest,
      }),
    ).toThrow(/does not take a release type/);
  });

  it("treats an empty release type as absent, not as a value", () => {
    // Workflow inputs arrive as "" when unset; that must not look like a bump.
    expect(() =>
      resolveTarget({
        mode: "committed",
        releaseType: undefined,
        manifest: committedManifest,
      }),
    ).not.toThrow();
  });
});

describe("bump mode", () => {
  it("still computes the requested next version", () => {
    const cases = [
      ["patch", "0.13.1"],
      ["minor", "0.14.0"],
      ["major", "1.0.0"],
    ] as const;
    for (const [releaseType, expected] of cases) {
      const target = resolveTarget({
        mode: "bump",
        releaseType,
        manifest: committedManifest,
      });
      expect(target.version, releaseType).toBe(expected);
      expect(target.tag, releaseType).toBe(`design-system-v${expected}`);
      expect(target.willMutateManifest).toBe(true);
    }
  });

  it("zeroes the lower digits, as SemVer requires", () => {
    expect(bumpVersion("1.2.3", "minor")).toBe("1.3.0");
    expect(bumpVersion("1.2.3", "major")).toBe("2.0.0");
    expect(bumpVersion("1.2.3", "patch")).toBe("1.2.4");
  });

  it("requires a release type", () => {
    expect(() =>
      resolveTarget({ mode: "bump", manifest: committedManifest }),
    ).toThrow(/requires a release type/);
  });

  it("rejects an unknown release type", () => {
    expect(() =>
      resolveTarget({
        mode: "bump",
        releaseType: "prerelease",
        manifest: committedManifest,
      }),
    ).toThrow(/invalid release type/);
    expect(RELEASE_TYPES).toEqual(["patch", "minor", "major"]);
  });
});

describe("guards that block a release outright", () => {
  it("blocks a package-name mismatch", () => {
    expect(() =>
      resolveTarget({
        mode: "committed",
        manifest: { name: "@studiopod/design-system", version: "0.13.0" },
      }),
    ).toThrow(/expected "@studiopod\/design"/);
    expect(EXPECTED_PACKAGE_NAME).toBe("@studiopod/design");
  });

  it("blocks a missing or malformed version", () => {
    for (const version of [
      undefined,
      "",
      "1.2",
      "v1.2.3",
      "1.2.3-beta.1",
      "latest",
    ]) {
      expect(() =>
        resolveTarget({
          mode: "committed",
          manifest: { name: EXPECTED_PACKAGE_NAME, version },
        }),
      ).toThrow(/is missing or not x\.y\.z/);
    }
  });

  it("blocks an unknown mode", () => {
    // The JSDoc union already rejects this at compile time — the cast is what
    // lets the RUNTIME guard be tested, which is the one that protects a
    // workflow input arriving as an arbitrary string.
    const badMode = "auto" as unknown as "committed";
    expect(() =>
      resolveTarget({ mode: badMode, manifest: committedManifest }),
    ).toThrow(/invalid mode/);
  });

  it("parses versions strictly", () => {
    expect(parseVersion("0.13.0")).toEqual({ major: 0, minor: 13, patch: 0 });
    expect(parseVersion("0.13")).toBeNull();
    expect(parseVersion(" 0.13.0 ")).toEqual({ major: 0, minor: 13, patch: 0 });
  });

  it("derives tags consistently for any version", () => {
    expect(tagFor("1.0.0")).toBe("design-system-v1.0.0");
  });
});

describe("registry coordinate classification", () => {
  const base = {
    controlReadSucceeded: true,
    status: null,
    targetVersion: "0.13.0",
  };

  it("blocks when the target version is already published", () => {
    const result = classifyCoordinate({
      ...base,
      publishedVersions: ["0.12.0", "0.13.0"],
    });
    expect(result.verdict).toBe(ALREADY_PUBLISHED);
    expect(result.reason).toMatch(/cannot be reused/);
  });

  it("allows a new version of an existing package", () => {
    const result = classifyCoordinate({
      ...base,
      publishedVersions: ["0.12.0"],
    });
    expect(result.verdict).toBe(AVAILABLE);
  });

  it("accepts a 404 as availability ONLY when the control read proved auth", () => {
    expect(
      classifyCoordinate({ ...base, status: 404, publishedVersions: null })
        .verdict,
    ).toBe(AVAILABLE);

    // Same 404, but nothing proved the registry is readable — could equally be
    // "you cannot see this package". Must not be read as availability.
    expect(
      classifyCoordinate({
        ...base,
        controlReadSucceeded: false,
        status: 404,
        publishedVersions: null,
      }).verdict,
    ).toBe(BLOCKED);
  });

  it("blocks on auth and authorization errors", () => {
    expect(
      classifyCoordinate({
        ...base,
        publishedVersions: null,
        stderr: "npm error code E401",
      }).verdict,
    ).toBe(BLOCKED);
    expect(
      classifyCoordinate({
        ...base,
        publishedVersions: null,
        stderr: "npm error code E403",
      }).verdict,
    ).toBe(BLOCKED);
  });

  it("blocks anything it cannot classify", () => {
    const result = classifyCoordinate({
      ...base,
      status: 500,
      publishedVersions: null,
    });
    expect(result.verdict).toBe(BLOCKED);
    expect(result.reason).toMatch(/ambiguous/);
  });
});

describe("credential classification", () => {
  it("detects a missing credential", () => {
    const result = classifyCredential({
      present: false,
      status: null,
      scopesHeader: null,
    });
    expect(result.code).toBe(CREDENTIAL_CODES.MISSING);
    expect(result.publishable).toBe(false);
  });

  it("detects an invalid credential", () => {
    const result = classifyCredential({
      present: true,
      status: 401,
      scopesHeader: null,
    });
    expect(result.code).toBe(CREDENTIAL_CODES.INVALID);
  });

  it("detects a read-only token — the exact DS-7.3a-R local-PAT state", () => {
    const result = classifyCredential({
      present: true,
      status: 200,
      scopesHeader: "read:packages",
    });
    expect(result.code).toBe(CREDENTIAL_CODES.NO_WRITE);
    expect(result.publishable).toBe(false);
  });

  it("detects a token that cannot even read", () => {
    const result = classifyCredential({
      present: true,
      status: 200,
      scopesHeader: "repo, gist",
    });
    expect(result.code).toBe(CREDENTIAL_CODES.NO_READ);
  });

  it("detects an SSO-unauthorized token", () => {
    const result = classifyCredential({
      present: true,
      status: 200,
      scopesHeader: "write:packages",
      ssoHeader: "required; url=https://github.com/orgs/studiopod/sso",
    });
    expect(result.code).toBe(CREDENTIAL_CODES.SSO);
    expect(result.publishable).toBe(false);
  });

  it("accepts write:packages but refuses to promise first-publish rights", () => {
    const result = classifyCredential({
      present: true,
      status: 200,
      scopesHeader: "read:packages, write:packages",
    });
    expect(result.code).toBe(CREDENTIAL_CODES.OK);
    expect(result.publishable).toBe(true);
    // The honest caveat is part of the contract, not decoration: write:packages
    // does not imply permission to CREATE a package under a scope that does not
    // match the token owner's login.
    expect(result.caveat).toMatch(/not sufficient for a FIRST publish/i);
  });

  it("reports a fine-grained PAT as indeterminate rather than guessing", () => {
    const result = classifyCredential({
      present: true,
      status: 200,
      scopesHeader: "",
      tokenPrefix: "gith…",
    });
    expect(result.code).toBe(CREDENTIAL_CODES.UNKNOWN);
    expect(result.publishable).toBe(false);
  });
});

/**
 * DS-7.5D.1 — dry-run artifact reconciliation.
 *
 * The regression these cover: the dry run never applies the version bump, so
 * the tarball carries the committed version. Comparing it against the resolved
 * target made every bump-mode dry run fail, for every release type, which meant
 * no future release candidate could be validated before publishing it.
 */
describe("dry-run artifact reconciliation", () => {
  const packed = "0.13.0";

  describe("committed mode", () => {
    it("accepts the tarball as the release candidate itself", () => {
      const result = verifyDryRunArtifact({
        mode: "committed",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.0",
      });
      expect(result.ok).toBe(true);
      expect(result.problems).toEqual([]);
      expect(result.notes.join(" ")).toContain(
        "the tarball IS the release candidate",
      );
    });

    it("still rejects a target that drifts from the committed version", () => {
      const result = verifyDryRunArtifact({
        mode: "committed",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.1",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain(
        "committed mode must publish the committed version",
      );
    });

    it("rejects a release type, matching the resolver's own rule", () => {
      const result = verifyDryRunArtifact({
        mode: "committed",
        releaseType: "patch",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.0",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain(
        "does not take a release type",
      );
    });
  });

  describe("bump mode", () => {
    // The exact matrix DS-7.5D.1 requires. Each of these FAILED before the fix.
    it.each([
      ["patch", "0.13.1"],
      ["minor", "0.14.0"],
      ["major", "1.0.0"],
    ])(
      "accepts a %s candidate packed as the committed version",
      (releaseType, target) => {
        const result = verifyDryRunArtifact({
          mode: "bump",
          releaseType,
          packedVersion: packed,
          currentVersion: "0.13.0",
          targetVersion: target,
        });
        expect(result.ok).toBe(true);
        expect(result.problems).toEqual([]);
        expect(result.notes.join(" ")).toContain(`publish ${target}`);
      },
    );

    it("rejects a target that is not the arithmetic result of the bump", () => {
      const result = verifyDryRunArtifact({
        mode: "bump",
        releaseType: "patch",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.14.0",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain(
        'bump("0.13.0", "patch") is 0.13.1',
      );
    });

    it("rejects a bump that does not advance the version", () => {
      const result = verifyDryRunArtifact({
        mode: "bump",
        releaseType: "patch",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.0",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain("must advance the version");
    });

    it("requires a release type", () => {
      const result = verifyDryRunArtifact({
        mode: "bump",
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.1",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain("requires a release type");
    });
  });

  describe("the artifact claim survives", () => {
    it("catches a tarball that does not match the committed manifest", () => {
      // The check the fix must NOT throw away: if a step mutated the manifest
      // or the wrong package was packed, the dry run has to stop.
      const result = verifyDryRunArtifact({
        mode: "bump",
        releaseType: "patch",
        packedVersion: "0.12.0",
        currentVersion: "0.13.0",
        targetVersion: "0.13.1",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain(
        "packed version 0.12.0 != committed version 0.13.0",
      );
    });

    it("fails loudly when a version is unwired rather than comparing empties", () => {
      // Two unset workflow outputs would both expand to "" and compare EQUAL.
      const result = verifyDryRunArtifact({
        mode: "committed",
        packedVersion: "",
        currentVersion: "",
        targetVersion: "0.13.0",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain("packed version");
      expect(result.problems.join(" ")).toContain("not x.y.z");
    });

    it("rejects an unknown mode", () => {
      // Cast for the same reason as the resolver's own unknown-mode test: the
      // JSDoc union rejects this at compile time, and the cast is what lets the
      // RUNTIME guard be exercised — the one protecting a workflow input that
      // arrives as an arbitrary string.
      const badMode = "publish" as unknown as "committed";
      const result = verifyDryRunArtifact({
        mode: badMode,
        packedVersion: packed,
        currentVersion: "0.13.0",
        targetVersion: "0.13.0",
      });
      expect(result.ok).toBe(false);
      expect(result.problems.join(" ")).toContain('invalid mode "publish"');
    });
  });
});
