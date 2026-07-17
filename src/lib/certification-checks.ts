/**
 * DS-1F — the real, running implementations behind the "automated" checks
 * declared in src/lib/certification.ts's CERTIFICATION_CHECKLIST. These are
 * plain functions over the filesystem, exercised by
 * src/lib/certification.test.ts via Vitest (which already runs in Node, not
 * a browser — see docs/TESTING.md) — not a new CLI tool, not a new script
 * runner. Kept in a separate file from certification.ts on purpose: that
 * file is pure data (like design-system-navigation.ts); this one is logic
 * that touches the filesystem (like docs-contracts.ts's getArchetype, one
 * layer up).
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = process.cwd();

// ---------------------------------------------------------------------
// Design token bypass scanning
// ---------------------------------------------------------------------

export interface TokenBypassFinding {
  kind: "hardcoded-color" | "arbitrary-spacing" | "hardcoded-typography";
  match: string;
  line: number;
}

const HEX_COLOR_RE = /#[0-9a-fA-F]{3,8}\b/g;
const RGB_COLOR_RE = /\brgba?\([^)]+\)/g;
const ARBITRARY_SPACING_RE = /\b(?:size|w|h|p|px|py|m|mx|my|gap|top|left|right|bottom)-\[[0-9.]+(?:px|rem|em)\]/g;
const HARDCODED_FONT_RE = /font-(?:size|family)\s*:\s*[^;]+;|style=\{\{[^}]*fontSize/g;

/**
 * Scans one component's source for design-token bypasses. Returns findings,
 * never throws, never decides pass/fail on its own — some arbitrary values
 * are legitimate (see certification.ts's Button record for a real example:
 * a spinner icon sized to a specific px value with no equivalent token).
 * The checklist item this backs (`tokens-no-bypasses`) is explicitly
 * "advisory," not "automated," for exactly that reason.
 */
export function checkTokenBypasses(sourcePath: string): TokenBypassFinding[] {
  const fullPath = join(REPO_ROOT, sourcePath);
  if (!existsSync(fullPath)) return [];
  const source = readFileSync(fullPath, "utf8");
  const lines = source.split("\n");
  const findings: TokenBypassFinding[] = [];

  lines.forEach((lineText, idx) => {
    for (const match of lineText.matchAll(HEX_COLOR_RE)) {
      findings.push({ kind: "hardcoded-color", match: match[0], line: idx + 1 });
    }
    for (const match of lineText.matchAll(RGB_COLOR_RE)) {
      findings.push({ kind: "hardcoded-color", match: match[0], line: idx + 1 });
    }
    for (const match of lineText.matchAll(ARBITRARY_SPACING_RE)) {
      findings.push({ kind: "arbitrary-spacing", match: match[0], line: idx + 1 });
    }
    for (const match of lineText.matchAll(HARDCODED_FONT_RE)) {
      findings.push({ kind: "hardcoded-typography", match: match[0], line: idx + 1 });
    }
  });

  return findings;
}

// ---------------------------------------------------------------------
// Test coverage
// ---------------------------------------------------------------------

export interface TestCoverageResult {
  testFileExists: boolean;
  hasUnitTests: boolean;
  hasInteractionTests: boolean;
  hasAccessibilityTests: boolean;
}

/**
 * A component's own test file is expected to exist next to it
 * (`Button.tsx` -> `Button.test.tsx`, per docs/TESTING.md's co-location
 * convention) and to organize itself into describe blocks named
 * "rendering"/"interaction"/"accessibility" — the exact shape
 * Button.test.tsx (DS-1C's pilot) established. This checks for that shape
 * by name, not by re-running the suite — running tests is `npm test`'s job.
 */
export function checkTestCoverage(sourcePath: string): TestCoverageResult {
  const testPath = sourcePath.replace(/\.tsx$/, ".test.tsx");
  const fullPath = join(REPO_ROOT, testPath);
  if (!existsSync(fullPath)) {
    return { testFileExists: false, hasUnitTests: false, hasInteractionTests: false, hasAccessibilityTests: false };
  }
  const source = readFileSync(fullPath, "utf8");
  return {
    testFileExists: true,
    hasUnitTests: /describe\(\s*["']rendering["']/.test(source) || /describe\(\s*["']state coverage["']/.test(source),
    hasInteractionTests: /describe\(\s*["']interaction["']/.test(source),
    hasAccessibilityTests: /describe\(\s*["']accessibility["']/.test(source),
  };
}

// ---------------------------------------------------------------------
// Export / release status
// ---------------------------------------------------------------------

export interface ExportStatusResult {
  exported: boolean;
  entryPoint: string | null;
}

/**
 * The api-baseline files are generated FROM the actual built package
 * (packages/design-system/scripts/check-api.mjs), not hand-maintained —
 * so checking against them checks against reality, the same property
 * DS-1D's verification pipeline relies on for the package's own gate.
 */
export function checkExportStatus(componentName: string): ExportStatusResult {
  const baselineDir = join(REPO_ROOT, "packages/design-system/api-baseline");
  if (!existsSync(baselineDir)) return { exported: false, entryPoint: null };
  for (const file of readdirSync(baselineDir)) {
    if (!file.endsWith(".json")) continue;
    const contents = JSON.parse(readFileSync(join(baselineDir, file), "utf8"));
    const exportNames: string[] = Array.isArray(contents) ? contents : (contents.exports ?? []);
    if (exportNames.includes(componentName)) {
      return { exported: true, entryPoint: file.replace(/\.json$/, "") };
    }
  }
  return { exported: false, entryPoint: null };
}

// ---------------------------------------------------------------------
// Visual baseline
// ---------------------------------------------------------------------

export interface VisualBaselineResult {
  hasVisualSpec: boolean;
  specFile: string | null;
  snapshotCount: number;
}

/**
 * Confirms a component has a Playwright visual spec and committed
 * screenshot baselines — not by convention/naming alone, by actually
 * reading e2e/visual/ and matching the component's name (case-insensitively)
 * against spec filenames and their *-snapshots/ directories.
 */
export function checkVisualBaseline(componentName: string): VisualBaselineResult {
  const visualDir = join(REPO_ROOT, "e2e/visual");
  if (!existsSync(visualDir)) return { hasVisualSpec: false, specFile: null, snapshotCount: 0 };

  const needle = componentName.toLowerCase();
  const specFiles = readdirSync(visualDir).filter((f) => f.endsWith(".visual.spec.ts") && f.toLowerCase().includes(needle));
  if (specFiles.length === 0) return { hasVisualSpec: false, specFile: null, snapshotCount: 0 };

  const specFile = specFiles[0];
  const snapshotDir = join(visualDir, `${specFile}-snapshots`);
  const snapshotCount = existsSync(snapshotDir) ? readdirSync(snapshotDir).filter((f) => f.endsWith(".png")).length : 0;

  return { hasVisualSpec: true, specFile, snapshotCount };
}
