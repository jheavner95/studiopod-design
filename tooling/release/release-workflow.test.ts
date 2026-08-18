/**
 * Structural tests for `.github/workflows/release.yml` (DS-7.3a-R1).
 *
 * Some release guarantees are properties of the workflow's SHAPE, not of any
 * script: that the dry-run job contains no publish step, that the tag is
 * created after the publish and after remote verification, that a failed
 * publish therefore cannot leave a tag behind. Those cannot be unit tested by
 * calling a function — but they can be asserted against the file, and that is
 * far better than discovering them during a release.
 *
 * This is exactly the class of bug that shipped before: the previous workflow
 * committed, tagged and PUSHED before `npm publish` ran, so a publish failure
 * left an orphan tag and a version-bump commit on main.
 *
 * Parsed by line rather than with a YAML library on purpose — the only YAML
 * package available here is a transitive dependency of the lint toolchain, and
 * a release-critical test should not rest on something nothing declares.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  join(process.cwd(), ".github/workflows/release.yml"),
  "utf8",
);
const lines = workflow.split("\n");

/** Extract the line range of a top-level job (two-space indent under `jobs:`). */
function jobRange(name: string): [number, number] {
  const start = lines.findIndex((line) => line === `  ${name}:`);
  expect(start, `job "${name}" not found`).toBeGreaterThan(-1);
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^ {2}[a-z][a-z0-9-]*:$/.test(lines[i]!)) {
      end = i;
      break;
    }
  }
  return [start, end];
}

function jobText(name: string): string {
  const [start, end] = jobRange(name);
  return lines.slice(start, end).join("\n");
}

/** Ordered `- name:` step labels within a job. */
function stepNames(name: string): string[] {
  return jobText(name)
    .split("\n")
    .filter((line) => /^ {6}- name:/.test(line))
    .map((line) => line.replace(/^ {6}- name:\s*/, "").trim());
}

const indexOfStep = (job: string, fragment: string) =>
  stepNames(job).findIndex((s) => s.toLowerCase().includes(fragment.toLowerCase()));

describe("workflow inputs", () => {
  it("offers exactly the two named modes, defaulting to committed", () => {
    expect(workflow).toMatch(/options: \[committed, bump\]/);
    const modeBlock = workflow.slice(workflow.indexOf("      mode:"));
    expect(modeBlock.slice(0, 400)).toMatch(/default: committed/);
  });

  it("defaults to a non-publishing dry run", () => {
    const dryRunBlock = workflow.slice(workflow.indexOf("      dry_run:"));
    expect(dryRunBlock.slice(0, 300)).toMatch(/default: true/);
  });

  it("passes a release type only in bump mode", () => {
    // The guard that stops a pre-set version silently becoming a bump.
    //
    // Three call sites, all gated identically: the resolver in the dry-run job,
    // the resolver in the publish job, and — added in DS-7.5D.1 — the dry-run
    // artifact reconciler, which needs the release type to check the bump
    // arithmetic. Counting rather than merely matching is what stops a fourth
    // site being added with the gate omitted.
    const gated = workflow.match(
      /--release-type "\$\{\{ inputs\.mode == 'bump' && inputs\.release_type \|\| '' \}\}"/g,
    );
    expect(gated?.length, "every release-type call site must gate on bump mode").toBe(3);

    // And no UNGATED site exists: every `--release-type` in the file is one of
    // the three above.
    const all = workflow.match(/--release-type /g);
    expect(all?.length, "an ungated --release-type would publish a silent bump").toBe(3);
  });
});

describe("dry run cannot publish or tag", () => {
  const text = jobText("dry-run");

  it("is the default path and is read-only", () => {
    expect(text).toMatch(/if: github\.event_name == 'workflow_dispatch' && inputs\.dry_run == true/);
    expect(text).toMatch(/permissions:\s*\n\s*contents: read/);
    expect(text).not.toMatch(/packages: write/);
    expect(text).not.toMatch(/contents: write/);
  });

  it("contains no publish, tag, push, or release command", () => {
    expect(text).not.toMatch(/^\s*run:.*npm publish/m);
    expect(text).not.toMatch(/git tag/);
    expect(text).not.toMatch(/git push/);
    expect(text).not.toMatch(/gh release create/);
  });

  it("never mutates the version", () => {
    expect(text).not.toMatch(/npm version/);
  });

  it("runs the full required dry-run chain", () => {
    for (const fragment of [
      "Install",
      "Resolve release target",
      "Credential preflight",
      "distribution configuration",
      "Full verification pipeline",
      "Reject a dirty tree",
      "Pack",
      "Inspect the packed manifest",
      "Registry existence check",
      "Tag existence check",
      "Summary",
    ]) {
      expect(indexOfStep("dry-run", fragment), `missing dry-run step: ${fragment}`).toBeGreaterThan(-1);
    }
  });

  it("reports package, version, registry, tag and mode", () => {
    const summary = text.slice(text.indexOf("Summary"));
    for (const field of ["package", "version", "registry", "tag", "release mode"]) {
      expect(summary).toContain(field);
    }
  });

  // ── DS-7.5D.1 ───────────────────────────────────────────────────────────
  it("never compares the packed version against the BUMPED target", () => {
    // The regression: this job runs no `npm version` (asserted above), so the
    // tarball always carries the committed version. The old inline
    // `test "$VER" = "<steps.target.outputs.version>"` therefore could not pass
    // in bump mode, for any release type, and no future release candidate could
    // be validated. The version comparison must go through the reconciler.
    const inspect = text.slice(text.indexOf("Inspect the packed manifest"));
    const step = inspect.slice(0, inspect.indexOf("Registry existence check"));
    expect(step).not.toMatch(/test "\$VER"\s+=\s+"\$\{\{ steps\.target\.outputs\.version \}\}"/);
    expect(step).toMatch(/check-dry-run-artifact\.mjs/);
  });

  it("passes the reconciler all three versions plus the mode", () => {
    // Each flag matters: omit --current and the packed version has nothing
    // legitimate to compare against; omit --mode and bump arithmetic cannot be
    // checked. An unset value expands to "" — which the reconciler rejects
    // rather than comparing two empty strings as equal.
    const inspect = text.slice(text.indexOf("Inspect the packed manifest"));
    const step = inspect.slice(0, inspect.indexOf("Registry existence check"));
    expect(step).toMatch(/--packed "\$VER"/);
    expect(step).toMatch(/--current "\$\{\{ steps\.target\.outputs\.current-version \}\}"/);
    expect(step).toMatch(/--target "\$\{\{ steps\.target\.outputs\.version \}\}"/);
    expect(step).toMatch(/--mode "\$\{\{ inputs\.mode \}\}"/);
    // Same gating as the resolver: a release type only ever reaches bump mode.
    expect(step).toMatch(
      /--release-type "\$\{\{ inputs\.mode == 'bump' && inputs\.release_type \|\| '' \}\}"/,
    );
  });

  it("still asserts the packed NAME against the target", () => {
    // The name cannot change with a bump, so this comparison stays exact.
    const inspect = text.slice(text.indexOf("Inspect the packed manifest"));
    expect(inspect).toMatch(/test "\$NAME" = "\$\{\{ steps\.target\.outputs\.name \}\}"/);
  });
});

describe("publish is transactional", () => {
  const steps = stepNames("publish");

  it("only runs on an explicit non-dry-run dispatch", () => {
    expect(jobText("publish")).toMatch(
      /if: github\.event_name == 'workflow_dispatch' && inputs\.dry_run == false/,
    );
  });

  it("orders validate -> build -> pack -> confirm-unused -> publish", () => {
    const preflight = indexOfStep("publish", "Credential preflight");
    const resolve = indexOfStep("publish", "Resolve release target");
    const verify = indexOfStep("publish", "Full verification pipeline");
    const pack = indexOfStep("publish", "Pack");
    const unused = indexOfStep("publish", "Confirm target version is unused");
    const publish = indexOfStep("publish", "Publish");

    expect(preflight).toBeLessThan(resolve);
    expect(resolve).toBeLessThan(verify);
    expect(verify).toBeLessThan(pack);
    expect(pack).toBeLessThan(unused);
    expect(unused).toBeLessThan(publish);
  });

  it("creates the tag AFTER publishing — a publish failure leaves no tag", () => {
    const publish = indexOfStep("publish", "Publish");
    const tag = indexOfStep("publish", "Commit version bump and tag");
    expect(publish).toBeGreaterThan(-1);
    expect(tag).toBeGreaterThan(-1);
    expect(tag, "tag must come after publish").toBeGreaterThan(publish);
  });

  it("creates the tag AFTER remote verification — a verification failure leaves no tag", () => {
    const remote = indexOfStep("publish", "Verify the published package from a clean consumer");
    const tag = indexOfStep("publish", "Commit version bump and tag");
    expect(remote).toBeGreaterThan(-1);
    expect(tag, "tag must come after remote verification").toBeGreaterThan(remote);
  });

  it("creates the GitHub release last", () => {
    const tag = indexOfStep("publish", "Commit version bump and tag");
    const release = indexOfStep("publish", "Generate release notes");
    expect(release).toBeGreaterThan(tag);
    expect(release).toBe(steps.length - 1);
  });

  it("bumps the version only when the resolver says so", () => {
    const text = jobText("publish");
    // `npm version` must be reachable only behind the will-mutate-manifest flag,
    // which committed mode sets to false.
    const bumpStep = text.slice(text.indexOf("Apply version bump"));
    expect(bumpStep).toMatch(/if: steps\.target\.outputs\.will-mutate-manifest == 'true'/);

    // Count INVOCATIONS — a line whose command begins `npm version` — not
    // mentions. The step's own error message names the command too, and an
    // earlier revision of this test counted that as a second bump.
    const invocations = text
      .split("\n")
      .filter((line) => /^\s*npm version\s/.test(line));
    expect(invocations).toHaveLength(1);
  });

  it("wires the publish token only into steps that need the registry", () => {
    const text = jobText("publish");
    const tokenUses = text.match(/NODE_AUTH_TOKEN: \$\{\{ secrets\.DS_NPM_TOKEN \}\}/g) ?? [];
    // Five steps genuinely touch the registry: install, preflight,
    // confirm-unused, publish, remote verification — and nothing else.
    //
    // `npm ci` joined this list in DS-7.5D: the package now depends on
    // @studiopod/foundation, and GitHub Packages requires a token for every
    // install including reads, so an unauthenticated install fails with E401.
    // The count is asserted rather than loosened so that a token appearing in
    // some *other* step still fails this test.
    expect(tokenUses).toHaveLength(5);
    expect(text).not.toMatch(/echo.*DS_NPM_TOKEN/);
  });
});

describe("the whole workflow", () => {
  it("never echoes a credential", () => {
    expect(workflow).not.toMatch(/echo\s+"?\$\{\{\s*secrets\./);
  });

  it("keeps the design-system-v tag prefix", () => {
    expect(workflow).not.toMatch(/design-v\$/);
    expect(readFileSync(join(process.cwd(), "tooling/release/lib/resolve-target.mjs"), "utf8"))
      .toMatch(/TAG_PREFIX = "design-system-v"/);
  });

  // CI-2: this workflow no longer runs on every push/PR — that routine half
  // moved to .github/workflows/validate.yml (one runner, no release tarball
  // on every commit). This file is deliberate-only: workflow_dispatch, never
  // an ordinary push or PR. `fast`/`verify` still carry no `if:
  // github.event_name` guard of their own — they run unconditionally
  // whenever this workflow fires, which is now only on workflow_dispatch, so
  // gating them individually would be redundant with the workflow-level
  // trigger rather than a second layer of protection.
  it("triggers only on workflow_dispatch — never an ordinary push or PR", () => {
    expect(workflow).toMatch(/^on:\n {2}workflow_dispatch:/m);
    expect(workflow).not.toMatch(/^\s*push:\n\s*branches: \[main\]/m);
    expect(workflow).not.toMatch(/^\s*pull_request:\s*$/m);
    for (const job of ["fast", "verify"]) {
      expect(jobText(job)).not.toMatch(/if: github\.event_name/);
    }
  });
});

describe("routine validation is separated from release (CI-2)", () => {
  const validateWorkflow = readFileSync(
    join(process.cwd(), ".github/workflows/validate.yml"),
    "utf8",
  );

  it("validate.yml runs on push to main and pull requests", () => {
    expect(validateWorkflow).toMatch(/^on:\n {2}push:\n {4}branches: \[main\]\n {2}pull_request:/m);
  });

  it("validate.yml has exactly one job, on one runner", () => {
    const jobsBlock = validateWorkflow.slice(validateWorkflow.indexOf("\njobs:"));
    const topLevelJobs = jobsBlock
      .split("\n")
      .filter((line) => /^ {2}[a-z][a-z0-9-]*:$/.test(line));
    expect(topLevelJobs).toHaveLength(1);
    expect((validateWorkflow.match(/runs-on: ubuntu-latest/g) ?? [])).toHaveLength(1);
  });

  it("validate.yml never publishes, tags, releases, or writes to the repository", () => {
    // Anchored to actual YAML keys / run: lines, not bare substrings — this
    // file's own explanatory comments legitimately use words like "publish"
    // and "packages: write" in prose when explaining what it does NOT do.
    expect(validateWorkflow).not.toMatch(/^\s*packages: write\s*$/m);
    expect(validateWorkflow).not.toMatch(/^\s*contents: write\s*$/m);
    expect(validateWorkflow).not.toMatch(/^\s*run:.*npm publish/m);
    expect(validateWorkflow).not.toMatch(/^\s*run:.*git tag/m);
    expect(validateWorkflow).not.toMatch(/^\s*run:.*git push/m);
    expect(validateWorkflow).not.toMatch(/^\s*run:.*gh release create/m);
  });

  it("validate.yml does not build or upload a release tarball", () => {
    // Anchored to an actual `run:` line, not just the string "npm pack" —
    // this file's own explanatory comments legitimately mention `npm pack`
    // when describing what identity-check already covers, so the assertion
    // must distinguish "the words appear in a comment" from "the command
    // actually runs," the same pattern used for the dry-run/publish jobs
    // above (`not.toMatch(/^\s*run:.*npm publish/m)`).
    expect(validateWorkflow).not.toMatch(/^\s*run:.*npm pack/m);
    expect(validateWorkflow).not.toMatch(/uses: actions\/upload-artifact/);
  });

  it("validate.yml runs verify:fast and the package's own verify", () => {
    expect(validateWorkflow).toMatch(/run: npm run verify:fast/);
    expect(validateWorkflow).toMatch(/run: npm run package:verify/);
  });

  it("validate.yml cancels a superseded run on the same ref; release.yml never cancels an in-flight publish", () => {
    const validateConcurrency = validateWorkflow.slice(validateWorkflow.indexOf("concurrency:"));
    expect(validateConcurrency.slice(0, 150)).toMatch(/cancel-in-progress: true/);

    const releaseConcurrency = workflow.slice(workflow.indexOf("concurrency:"));
    expect(releaseConcurrency.slice(0, 150)).toMatch(/cancel-in-progress: false/);

    // Independent concurrency groups — a routine validation run being
    // cancelled must never be able to touch an in-flight release.
    expect(validateConcurrency.slice(0, 150)).not.toMatch(/ds-release-/);
    expect(releaseConcurrency.slice(0, 150)).not.toMatch(/design-validation-/);
  });
});
