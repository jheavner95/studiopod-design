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
    const matches = workflow.match(
      /--release-type "\$\{\{ inputs\.mode == 'bump' && inputs\.release_type \|\| '' \}\}"/g,
    );
    expect(matches?.length, "both jobs must gate the release type").toBe(2);
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
    // preflight, confirm-unused, publish, remote verification — and nothing else.
    expect(tokenUses).toHaveLength(4);
    expect(text).not.toMatch(/echo.*DS_NPM_TOKEN/);
  });
});

describe("the whole workflow", () => {
  it("never echoes a credential", () => {
    expect(workflow).not.toMatch(/echo\s+"?\$\{\{\s*secrets\./);
  });

  it("keeps the design-system-v tag prefix", () => {
    expect(workflow).not.toMatch(/design-v\$/);
    expect(readFileSync(join(process.cwd(), "scripts/release/lib/resolve-target.mjs"), "utf8"))
      .toMatch(/TAG_PREFIX = "design-system-v"/);
  });

  it("still runs the always-on gates on push and pull request", () => {
    expect(workflow).toMatch(/^on:\n {2}push:\n {4}branches: \[main\]\n {2}pull_request:/m);
    for (const job of ["fast", "verify"]) {
      expect(jobText(job)).not.toMatch(/if: github\.event_name/);
    }
  });
});
