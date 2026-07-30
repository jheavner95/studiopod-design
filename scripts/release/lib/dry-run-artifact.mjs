/**
 * Dry-run artifact/target reconciliation (DS-7.5D.1).
 *
 * A dry run answers one question: "if this version were released, would every
 * verification step succeed?" — without changing git history, the manifest, the
 * lockfile, tags, releases, or the registry.
 *
 * That goal has a consequence the previous revision got wrong. The dry-run job
 * deliberately contains no `npm version` (it runs under `permissions:
 * contents: read`, and src/lib/release-workflow.test.ts asserts the command is
 * absent so the job cannot become a mutator by accident). So the tarball it
 * packs necessarily carries the version currently in the manifest — never the
 * bumped target. Asserting `packed == target` therefore FAILED BY CONSTRUCTION
 * in bump mode, for every release type, and no future release candidate could
 * ever be validated.
 *
 * The fix is not to loosen the check but to split it, because a dry run makes
 * two genuinely different claims and they need different expected values:
 *
 *   artifact claim — the tarball that would ship is well formed and carries the
 *                    version it was actually built from (the committed one).
 *   target claim   — the coordinate a real release would occupy is correct for
 *                    the mode. Whether that coordinate is FREE is a separate
 *                    question, answered by the registry and tag checks.
 *
 * Bumping changes exactly one byte range in the tarball — the `version` field
 * of package.json. File list, dist output, "use client", @theme and export
 * targets are all identical either way, so packing the committed version costs
 * the dry run no artifact-level coverage. The one property it cannot show —
 * that `npm version <type>` writes the expected string — is checked in the
 * publish job at the moment it matters (`APPLIED == target`) and is unit tested
 * here via bumpVersion.
 *
 * Pure and side-effect free, in lib/ rather than in YAML, for the reason given
 * in resolve-target.mjs: logic that lives in a workflow can only be tested by
 * running a release.
 */

import { bumpVersion, parseVersion, MODES, RELEASE_TYPES } from "./resolve-target.mjs";

/**
 * Reconcile what was packed against what a real release would publish.
 *
 * @param {object} options
 * @param {"committed"|"bump"} options.mode
 * @param {string} [options.releaseType]   required in bump mode, forbidden in committed
 * @param {string} options.packedVersion   version read from the packed tarball
 * @param {string} options.currentVersion  version in the committed manifest
 * @param {string} options.targetVersion   version the resolver says a release would publish
 * @returns {{ok:boolean, problems:string[], notes:string[]}}
 */
export function verifyDryRunArtifact({
  mode,
  releaseType,
  packedVersion,
  currentVersion,
  targetVersion,
}) {
  const problems = [];
  const notes = [];

  if (!MODES.includes(mode)) {
    return {
      ok: false,
      problems: [`invalid mode "${mode}" — expected one of ${MODES.join(", ")}`],
      notes,
    };
  }

  // An unparseable version anywhere means one of the three inputs was not
  // wired through — fail loudly rather than comparing empty strings, which
  // would compare equal and pass.
  for (const [label, value] of [
    ["packed", packedVersion],
    ["committed", currentVersion],
    ["target", targetVersion],
  ]) {
    if (!parseVersion(value)) {
      problems.push(`${label} version "${value ?? ""}" is missing or not x.y.z`);
    }
  }
  if (problems.length > 0) return { ok: false, problems, notes };

  // ── Artifact claim ────────────────────────────────────────────────────────
  // The dry run never bumps, so the tarball must carry the committed version.
  // A mismatch here does not mean "the bump is missing" — it means something
  // packed the wrong package or a step mutated the manifest, both of which are
  // real failures worth stopping for.
  if (packedVersion !== currentVersion) {
    problems.push(
      `packed version ${packedVersion} != committed version ${currentVersion}. ` +
        `The dry run does not bump, so the tarball must carry the committed ` +
        `version; a difference means a step mutated the manifest or packed the ` +
        `wrong package.`,
    );
  }

  // ── Target claim ──────────────────────────────────────────────────────────
  if (mode === "committed") {
    if (releaseType) {
      problems.push(
        `mode "committed" does not take a release type (got "${releaseType}")`,
      );
    }
    if (targetVersion !== currentVersion) {
      problems.push(
        `committed mode must publish the committed version, but the target is ` +
          `${targetVersion} and the manifest holds ${currentVersion}`,
      );
    } else {
      notes.push(
        `committed mode: the tarball IS the release candidate (${packedVersion}).`,
      );
    }
    return { ok: problems.length === 0, problems, notes };
  }

  // bump mode
  if (!releaseType) {
    problems.push(`mode "bump" requires a release type (${RELEASE_TYPES.join(", ")})`);
    return { ok: false, problems, notes };
  }

  let expected;
  try {
    expected = bumpVersion(currentVersion, releaseType);
  } catch (error) {
    problems.push(error.message);
    return { ok: false, problems, notes };
  }

  if (targetVersion !== expected) {
    problems.push(
      `bump("${currentVersion}", "${releaseType}") is ${expected}, but the ` +
        `resolved target is ${targetVersion}`,
    );
  }

  // A bump that lands on the version already in the manifest would mean the
  // real release republishes an existing coordinate. Unreachable through
  // bumpVersion today, and asserted so it stays that way.
  if (targetVersion === currentVersion) {
    problems.push(
      `bump mode resolved to the committed version ${currentVersion} — a bump ` +
        `must advance the version`,
    );
  }

  if (problems.length === 0) {
    notes.push(
      `bump mode: the tarball carries the committed version ${packedVersion}; a ` +
        `real release would apply ${releaseType} and publish ${targetVersion}. ` +
        `Only the manifest version field differs between the two tarballs.`,
    );
  }

  return { ok: problems.length === 0, problems, notes };
}
