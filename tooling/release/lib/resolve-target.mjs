/**
 * Release-target resolution — the single source of truth for "what are we about
 * to publish, and under what tag".
 *
 * Plain ESM rather than TypeScript for the same reason as scripts/token-report.mjs
 * and scripts/certification-report.mjs: this must run identically under CI's
 * Node 20, which has no native TypeScript support. It is exercised by a real
 * Vitest suite (src/lib/release-target.test.ts) so the logic is tested rather
 * than trusted — which is the whole point of moving it out of YAML, where it
 * could only ever be tested by running a release.
 *
 * Two modes, deliberately disjoint:
 *
 *   committed — publish the version already in the committed manifest. Reads;
 *               never writes. This is what DS-7.3a needs: 0.13.0 is already
 *               committed and certified, and any bump would publish a version
 *               nobody verified.
 *   bump      — compute the next version from a SemVer release type, as the
 *               workflow has always done. Retained for ordinary releases.
 *
 * Supplying a release type in `committed` mode is an ERROR, not an ignored
 * argument. "Pre-set version plus automatic bump" is exactly the ambiguity that
 * produced the DS-7.3a-R blocker, and a silently-ignored input is how it would
 * come back.
 */

/** Tag prefix for this repository's release series. Deliberately unchanged. */
export const TAG_PREFIX = "design-system-v";

/** The only package name this workflow may publish. */
export const EXPECTED_PACKAGE_NAME = "@jheavner95/design";

/** Release types the bump path accepts. */
export const RELEASE_TYPES = ["patch", "minor", "major"];

export const MODES = ["committed", "bump"];

/** Strict `x.y.z` — this package has never used prereleases or build metadata. */
const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)$/;

export function parseVersion(version) {
  const match = SEMVER_RE.exec(String(version ?? "").trim());
  if (!match) return null;
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) };
}

/** Compute the next version. Pure — does not touch any manifest. */
export function bumpVersion(version, releaseType) {
  const parsed = parseVersion(version);
  if (!parsed) throw new Error(`invalid current version "${version}" — expected x.y.z`);
  if (!RELEASE_TYPES.includes(releaseType)) {
    throw new Error(
      `invalid release type "${releaseType}" — expected one of ${RELEASE_TYPES.join(", ")}`,
    );
  }

  const { major, minor, patch } = parsed;
  if (releaseType === "major") return `${major + 1}.0.0`;
  if (releaseType === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

/** `0.13.0` -> `design-system-v0.13.0`. */
export function tagFor(version) {
  return `${TAG_PREFIX}${version}`;
}

/**
 * Resolve the release target.
 *
 * @param {object} options
 * @param {"committed"|"bump"} options.mode
 * @param {string} [options.releaseType]  required in bump mode, forbidden in committed
 * @param {object} options.manifest       the parsed package.json
 * @returns {{mode:string,name:string,version:string,tag:string,willMutateManifest:boolean,currentVersion:string}}
 */
export function resolveTarget({ mode, releaseType, manifest }) {
  if (!MODES.includes(mode)) {
    throw new Error(`invalid mode "${mode}" — expected one of ${MODES.join(", ")}`);
  }

  if (!manifest || typeof manifest !== "object") {
    throw new Error("manifest is missing or not an object");
  }

  const name = manifest.name;
  if (name !== EXPECTED_PACKAGE_NAME) {
    throw new Error(
      `package name is "${name}", expected "${EXPECTED_PACKAGE_NAME}". ` +
        `Refusing to release: publishing the wrong name cannot be undone.`,
    );
  }

  const currentVersion = manifest.version;
  if (!parseVersion(currentVersion)) {
    throw new Error(`committed version "${currentVersion}" is missing or not x.y.z`);
  }

  if (mode === "committed") {
    // An accepted-but-ignored release type is how a "committed" release
    // silently becomes a bump. Reject it instead.
    if (releaseType) {
      throw new Error(
        `mode "committed" does not take a release type (got "${releaseType}"). ` +
          `Use mode "bump" to compute a new version.`,
      );
    }
    return {
      mode,
      name,
      currentVersion,
      version: currentVersion,
      tag: tagFor(currentVersion),
      willMutateManifest: false,
    };
  }

  if (!releaseType) {
    throw new Error(`mode "bump" requires a release type (${RELEASE_TYPES.join(", ")})`);
  }

  const version = bumpVersion(currentVersion, releaseType);
  return {
    mode,
    name,
    currentVersion,
    version,
    tag: tagFor(version),
    willMutateManifest: true,
  };
}
