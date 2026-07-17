import { describe, it, expect } from "vitest";
import {
  CERTIFICATION_CHECKLIST,
  CERTIFICATION_REGISTRY,
  getCertificationRecord,
  getChecklistCoverage,
  getChecksByOwner,
  getChecklistItem,
  getTotalCheckCount,
} from "./certification";
import { checkTokenBypasses, checkTestCoverage, checkExportStatus, checkVisualBaseline } from "./certification-checks";

/**
 * DS-1F — validates the certification framework itself (structural
 * integrity of the checklist/registry data, matching design-system-
 * navigation.test.ts's own shape from DS-1E) AND runs the real automated
 * checks against Button, the DS-1F pilot — this is "run the complete
 * certification process" for every check this framework can actually
 * automate. The manual/advisory checks are recorded in
 * CERTIFICATION_REGISTRY's own notes field (see certification.ts) and in
 * docs/engineering-notes/12-component-certification.md's review log — a
 * human reviewer, not a test, is the correct owner for those.
 */

describe("CERTIFICATION_CHECKLIST integrity", () => {
  it("every item has a unique id", () => {
    const ids = CERTIFICATION_CHECKLIST.flatMap((c) => c.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every item's id is prefixed with its category's short id", () => {
    // Deliberately abbreviated (a11y, docs, perf, tokens) rather than the
    // full category id — this asserts the abbreviation map stays complete
    // and consistent, not that ids literally repeat the category id.
    const shortIdByCategory: Record<string, string> = {
      identity: "identity",
      api: "api",
      accessibility: "a11y",
      responsive: "responsive",
      motion: "motion",
      tokens: "tokens",
      documentation: "docs",
      testing: "testing",
      visual: "visual",
      performance: "perf",
      release: "release",
    };
    const mismatched = CERTIFICATION_CHECKLIST.flatMap((category) =>
      category.items.filter((item) => !item.id.startsWith(`${shortIdByCategory[category.id]}-`)).map((item) => `${category.id}/${item.id}`),
    );
    expect(mismatched).toEqual([]);
  });

  it("getChecklistItem resolves every real id and returns undefined for a fake one", () => {
    const allIds = CERTIFICATION_CHECKLIST.flatMap((c) => c.items.map((i) => i.id));
    for (const id of allIds) {
      expect(getChecklistItem(id)?.id).toBe(id);
    }
    expect(getChecklistItem("not-a-real-check")).toBeUndefined();
  });

  it("getChecksByOwner partitions every item into exactly one owner bucket", () => {
    const automated = getChecksByOwner("automated");
    const manual = getChecksByOwner("manual");
    const advisory = getChecksByOwner("advisory");
    expect(automated.length + manual.length + advisory.length).toBe(getTotalCheckCount());
  });
});

describe("CERTIFICATION_REGISTRY integrity", () => {
  it("every completedChecks id resolves to a real checklist item", () => {
    const dangling = CERTIFICATION_REGISTRY.flatMap((record) =>
      record.completedChecks.filter((id) => !getChecklistItem(id)).map((id) => `${record.componentName}: "${id}"`),
    );
    expect(dangling).toEqual([]);
  });

  it("getChecklistCoverage produces a consistent percentage and category breakdown", () => {
    for (const record of CERTIFICATION_REGISTRY) {
      const coverage = getChecklistCoverage(record);
      expect(coverage.completed).toBe(record.completedChecks.length);
      expect(coverage.total).toBe(getTotalCheckCount());
      const categorySum = coverage.byCategory.reduce((sum, c) => sum + c.completed, 0);
      expect(categorySum).toBe(coverage.completed);
      expect(coverage.remaining.length).toBe(coverage.total - coverage.completed);
    }
  });
});

describe("pilot: Button — automated certification checks", () => {
  const button = getCertificationRecord("Button")!;

  it("has a certification record", () => {
    expect(button).toBeDefined();
    expect(button.sourcePath).toBe("src/components/ui/Button.tsx");
  });

  it("tokens: checkTokenBypasses runs against the real source and finds the one known, reviewed arbitrary value", () => {
    const findings = checkTokenBypasses(button.sourcePath);
    // Button.tsx's lg-size spinner icon uses size-[18px] — a real, reviewed,
    // accepted arbitrary value (see certification.ts's Button record notes).
    // This assertion is intentionally specific: if it starts failing because
    // the finding count changed, that's exactly the signal a reviewer
    // should see before silently re-certifying.
    expect(findings.some((f) => f.kind === "arbitrary-spacing" && f.match.includes("18px"))).toBe(true);
    expect(findings.some((f) => f.kind === "hardcoded-color")).toBe(false);
  });

  it("testing: checkTestCoverage confirms Button.test.tsx has all three describe blocks", () => {
    const coverage = checkTestCoverage(button.sourcePath);
    expect(coverage.testFileExists).toBe(true);
    expect(coverage.hasUnitTests).toBe(true);
    expect(coverage.hasInteractionTests).toBe(true);
    expect(coverage.hasAccessibilityTests).toBe(true);
  });

  it("release: checkExportStatus confirms Button ships in the published package", () => {
    const status = checkExportStatus("Button");
    expect(status.exported).toBe(true);
    expect(status.entryPoint).toBe("index");
  });

  it("visual: checkVisualBaseline confirms committed Playwright screenshots exist", () => {
    const baseline = checkVisualBaseline("Button");
    expect(baseline.hasVisualSpec).toBe(true);
    expect(baseline.snapshotCount).toBeGreaterThan(0);
  });

  it("every automated checklist item Button claims as complete is backed by a real, passing check", () => {
    // Cross-references completedChecks against the actual check functions —
    // the thing that makes this "run the certification process" rather than
    // "assert a hand-typed array is internally consistent."
    const completed = new Set(button.completedChecks);

    if (completed.has("testing-unit") || completed.has("testing-interaction") || completed.has("testing-accessibility")) {
      const coverage = checkTestCoverage(button.sourcePath);
      if (completed.has("testing-unit")) expect(coverage.hasUnitTests).toBe(true);
      if (completed.has("testing-interaction")) expect(coverage.hasInteractionTests).toBe(true);
      if (completed.has("testing-accessibility")) expect(coverage.hasAccessibilityTests).toBe(true);
    }

    if (completed.has("release-exported") || completed.has("release-in-package")) {
      expect(checkExportStatus("Button").exported).toBe(true);
    }

    if (completed.has("visual-baseline") || completed.has("visual-responsive")) {
      expect(checkVisualBaseline("Button").hasVisualSpec).toBe(true);
    }
  });
});

describe("pilot: Workspace — automated certification checks", () => {
  const workspace = getCertificationRecord("Workspace")!;

  it("has a certification record", () => {
    expect(workspace).toBeDefined();
    expect(workspace.sourcePath).toBe("src/components/layout/Workspace.tsx");
  });

  it("is deliberately not marked Certified — the honest DS-2 finding, not an oversight", () => {
    // Workspace passes every applicable automated check but hasn't been
    // adopted by a real (non-playground) screen, the bar the parallel
    // maturity vocabulary (maturity.ts) sets for "Certified" — and DS-2's
    // own scope forbids migrating a page to close that gap this phase. If
    // this ever flips to "Certified" it should be because a real screen
    // adopted Workspace, not because this assertion was loosened.
    expect(workspace.level).toBe("Production Ready");
  });

  it("tokens: checkTokenBypasses runs against the real source and finds zero bypasses", () => {
    const findings = checkTokenBypasses(workspace.sourcePath);
    expect(findings).toEqual([]);
  });

  it("testing: checkTestCoverage confirms Workspace.test.tsx has all three describe blocks", () => {
    const coverage = checkTestCoverage(workspace.sourcePath);
    expect(coverage.testFileExists).toBe(true);
    expect(coverage.hasUnitTests).toBe(true);
    expect(coverage.hasInteractionTests).toBe(true);
    expect(coverage.hasAccessibilityTests).toBe(true);
  });

  it("release: checkExportStatus confirms Workspace and WorkspaceToolbar ship in the published package", () => {
    expect(checkExportStatus("Workspace")).toEqual({ exported: true, entryPoint: "index" });
    expect(checkExportStatus("WorkspaceToolbar")).toEqual({ exported: true, entryPoint: "index" });
  });

  it("visual: checkVisualBaseline confirms committed Playwright screenshots exist for both projects", () => {
    const baseline = checkVisualBaseline("Workspace");
    expect(baseline.hasVisualSpec).toBe(true);
    // 4 screenshots x 2 projects (desktop/mobile) — see workspace-gallery.visual.spec.ts.
    expect(baseline.snapshotCount).toBe(8);
  });

  it("every automated checklist item Workspace claims as complete is backed by a real, passing check", () => {
    const completed = new Set(workspace.completedChecks);

    if (completed.has("testing-unit") || completed.has("testing-interaction") || completed.has("testing-accessibility")) {
      const coverage = checkTestCoverage(workspace.sourcePath);
      if (completed.has("testing-unit")) expect(coverage.hasUnitTests).toBe(true);
      if (completed.has("testing-interaction")) expect(coverage.hasInteractionTests).toBe(true);
      if (completed.has("testing-accessibility")) expect(coverage.hasAccessibilityTests).toBe(true);
    }

    if (completed.has("release-exported") || completed.has("release-in-package")) {
      expect(checkExportStatus("Workspace").exported).toBe(true);
    }

    if (completed.has("visual-baseline") || completed.has("visual-responsive")) {
      expect(checkVisualBaseline("Workspace").hasVisualSpec).toBe(true);
    }

    if (completed.has("tokens-no-bypasses")) {
      expect(checkTokenBypasses(workspace.sourcePath)).toEqual([]);
    }
  });
});
