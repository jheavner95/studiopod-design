/**
 * DS-1F — the permanent certification framework. Read
 * docs/engineering-notes/12-component-certification.md before changing this
 * file; it explains why this phase deliberately does NOT repeat the
 * pre-RM-5 certification pattern (dedicated per-package certification
 * pages, since deleted as "obsolete implementation" — see
 * docs/engineering-notes/01-certification-history-and-technical-debt.md and
 * docs/engineering-notes/README.md's own "what was deliberately not
 * preserved: certification ceremony... certification-level ladders").
 * This is data + query helpers, the same shape as
 * design-system-navigation.ts and showcase-registry.ts — a certification
 * record is a fact about a component, not JSX hand-typed onto a docs page.
 *
 * `CertificationLevel` deliberately mirrors, but does not import, the
 * existing five-level maturity vocabulary defined in
 * src/app/application-components/_data/maturity.ts (Concept / Prototype /
 * Production Ready / Certified / Locked, with "Certified" and "Locked"
 * already precisely defined there). Not importing it is a layering
 * decision, not an oversight: src/lib is documented (certification-history
 * engineering note) as the dependency graph's floor — zero internal
 * dependencies — and that maturity file lives under a page-scoped
 * `_data/` folder. Duplicating five string literals is cheaper than
 * inverting that dependency direction. If the two ever need a single
 * source of truth, the maturity file should move to src/lib, not the
 * reverse.
 */

// ---------------------------------------------------------------------
// Certification level (aligned with, not imported from, the existing
// Foundation Catalog maturity model — see file header)
// ---------------------------------------------------------------------

export type CertificationLevel = "Concept" | "Prototype" | "Production Ready" | "Certified" | "Locked";

export const CERTIFICATION_LEVEL_DESCRIPTIONS: Record<CertificationLevel, string> = {
  Concept: "Named and scoped, with no implementation.",
  Prototype: "A working version exists, often borrowing a pattern from an adjacent component.",
  "Production Ready": "A real, reusable component exists and is safe to build a screen with.",
  Certified: "Production Ready, plus every automated check in this framework passes and every manual check has been reviewed and signed off.",
  Locked: "Certified and stable enough that its API is a contract — changing it requires a deliberate migration.",
};

// ---------------------------------------------------------------------
// The checklist itself — Part 2's canonical standard, as data
// ---------------------------------------------------------------------

export type CertificationCategoryId =
  | "identity"
  | "api"
  | "accessibility"
  | "responsive"
  | "motion"
  | "tokens"
  | "documentation"
  | "testing"
  | "visual"
  | "performance"
  | "release";

/**
 * Who actually resolves this check, today — not an aspiration.
 * - "automated": a real, running check produces a pass/fail signal
 *   (`src/lib/certification-checks.ts`, or an existing tool like `tsc`/`axe`).
 * - "manual": requires human judgment; tracked here, not machine-verifiable
 *   with anything in this codebase today.
 * - "advisory": an automated signal exists but is informational, not
 *   authoritative — e.g. axe-core cannot evaluate color-contrast in jsdom
 *   (see docs/TESTING.md), so its output here is a hint, not a verdict.
 */
export type CheckOwner = "automated" | "manual" | "advisory";

export interface CertificationCheckItem {
  id: string;
  label: string;
  owner: CheckOwner;
  /** The concrete mechanism — a real command, tool, or process, not a restated intention. */
  mechanism: string;
}

export interface CertificationCategory {
  id: CertificationCategoryId;
  title: string;
  items: CertificationCheckItem[];
}

export const CERTIFICATION_CHECKLIST: CertificationCategory[] = [
  {
    id: "identity",
    title: "Identity",
    items: [
      { id: "identity-purpose", label: "Purpose documented", owner: "manual", mechanism: "Reviewer confirms the component's docs page states what it's for and when to reach for it." },
      { id: "identity-usage", label: "Usage guidance", owner: "manual", mechanism: "Reviewer confirms concrete do/use guidance exists, not just a prop reference." },
      { id: "identity-related", label: "Related components", owner: "automated", mechanism: "getRelatedLinks(entry) resolves and every linked entry exists — enforced by design-system-navigation.test.ts. Whether the RIGHT components are related is manual." },
    ],
  },
  {
    id: "api",
    title: "API",
    items: [
      { id: "api-stable", label: "Stable props", owner: "advisory", mechanism: "packages/design-system's api-check (scripts/check-api.mjs) flags any export-surface drift; it tracks the package's export list, not per-prop stability, so this is a signal, not a verdict." },
      { id: "api-type-safe", label: "Type-safe", owner: "automated", mechanism: "npm run typecheck (tsc --noEmit) — a type error anywhere in the component's source fails this outright." },
      { id: "api-defaults", label: "Sensible defaults", owner: "manual", mechanism: "Reviewer judgment — no tool can evaluate whether a default value is the right one." },
      { id: "api-composable", label: "Composition-friendly", owner: "manual", mechanism: "Reviewer confirms the component accepts className/children/asChild-shaped composition where appropriate." },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    items: [
      { id: "a11y-keyboard", label: "Keyboard", owner: "automated", mechanism: "Vitest + userEvent.tab()/.keyboard() — see src/components/ui/Button.test.tsx's own 'interaction' suite for the pattern every component should follow." },
      { id: "a11y-focus", label: "Focus", owner: "automated", mechanism: "Vitest + toHaveFocus() assertions, same suite." },
      { id: "a11y-screen-reader", label: "Screen reader", owner: "manual", mechanism: "axe-core (automated, see next row) catches structural issues; real screen-reader spot-checking is still manual — nothing in this repo automates that." },
      { id: "a11y-aria", label: "ARIA", owner: "automated", mechanism: "runA11yCheck()/toHaveNoA11yViolations() (test/a11y.ts, axe-core) in the component's own test file." },
      { id: "a11y-color-independence", label: "Color independence", owner: "manual", mechanism: "Reviewer confirms state isn't conveyed by color alone. Axe's color-contrast rule is explicitly disabled in the Vitest/jsdom layer (see docs/TESTING.md) and not yet wired into the Playwright layer either — see docs/CERTIFICATION.md's known limitations." },
    ],
  },
  {
    id: "responsive",
    title: "Responsive",
    items: [
      { id: "responsive-desktop", label: "Desktop", owner: "automated", mechanism: "Playwright visual regression, 'desktop' project (playwright.config.ts) — local-only today, see docs/TESTING.md." },
      { id: "responsive-tablet", label: "Tablet", owner: "advisory", mechanism: "No dedicated tablet Playwright project exists yet — only 'desktop' and 'mobile'. Advisory until one is added." },
      { id: "responsive-mobile", label: "Mobile", owner: "automated", mechanism: "Playwright visual regression, 'mobile' project." },
    ],
  },
  {
    id: "motion",
    title: "Motion",
    items: [
      { id: "motion-reduced", label: "Reduced motion", owner: "automated", mechanism: "mockMatchMedia() (test/render.tsx) to simulate prefers-reduced-motion, asserting the component respects it." },
      { id: "motion-tokens", label: "Timing tokens", owner: "advisory", mechanism: "No lint rule enforces this today (see checkTokenBypasses in certification-checks.ts, which currently scans color/spacing/typography, not motion durations) — reviewable by grep for raw duration-[0-9] values outside src/motion/tokens.ts." },
      { id: "motion-no-jank", label: "No layout jank", owner: "manual", mechanism: "No performance-profiling tooling exists in this repo; reviewer judgment from manual visual verification." },
    ],
  },
  {
    id: "tokens",
    title: "Design Tokens",
    items: [
      { id: "tokens-no-hardcoded-color", label: "No hardcoded colors", owner: "automated", mechanism: "checkTokenBypasses() (certification-checks.ts) scans the component's source for literal hex/rgb color values." },
      { id: "tokens-no-hardcoded-spacing", label: "No hardcoded spacing", owner: "automated", mechanism: "checkTokenBypasses() scans for arbitrary-value Tailwind spacing (e.g. size-[18px]) outside documented exceptions." },
      { id: "tokens-no-hardcoded-typography", label: "No hardcoded typography", owner: "automated", mechanism: "checkTokenBypasses() scans for raw font-size/font-family declarations outside the fluid typography classes (src/styles/typography.css)." },
      { id: "tokens-no-bypasses", label: "No token bypasses", owner: "advisory", mechanism: "checkTokenBypasses()'s combined finding count — a nonzero count is a prompt for reviewer judgment (some arbitrary values are legitimate), not an automatic failure." },
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    items: [
      { id: "docs-overview", label: "Overview", owner: "manual", mechanism: "Reviewer confirms the docs page has one. See src/lib/docs-contracts.ts's expectedSections for the archetype-specific checklist." },
      { id: "docs-anatomy", label: "Anatomy", owner: "manual", mechanism: "Reviewer confirms." },
      { id: "docs-variants", label: "Variants", owner: "manual", mechanism: "Reviewer confirms every real variant/size/state is shown, not just the default." },
      { id: "docs-examples", label: "Examples", owner: "automated", mechanism: "A component is 'exampled' if it appears in an e2e/visual/*.visual.spec.ts and/or a docs playground gallery — checkVisualBaseline() confirms the former mechanically." },
      { id: "docs-do-dont", label: "Do/Don't guidance", owner: "manual", mechanism: "Reviewer confirms — no tool evaluates editorial content quality." },
    ],
  },
  {
    id: "testing",
    title: "Testing",
    items: [
      { id: "testing-unit", label: "Unit tests", owner: "automated", mechanism: "checkTestCoverage() (certification-checks.ts) confirms a co-located *.test.tsx exists with a 'rendering' describe block." },
      { id: "testing-interaction", label: "Interaction tests", owner: "automated", mechanism: "checkTestCoverage() confirms an 'interaction' describe block exists." },
      { id: "testing-accessibility", label: "Accessibility tests", owner: "automated", mechanism: "checkTestCoverage() confirms an 'accessibility' describe block exists." },
    ],
  },
  {
    id: "visual",
    title: "Visual Verification",
    items: [
      { id: "visual-baseline", label: "Screenshot baseline", owner: "automated", mechanism: "checkVisualBaseline() confirms committed *-snapshots/*.png files exist for the component." },
      { id: "visual-responsive", label: "Responsive verification", owner: "automated", mechanism: "Same baseline, checked across both Playwright projects (desktop/mobile)." },
    ],
  },
  {
    id: "performance",
    title: "Performance",
    items: [
      { id: "perf-tree-shakeable", label: "Tree-shakeable", owner: "advisory", mechanism: "Covered at the package level, not per-component: packages/design-system's tsup build has treeshake: true and sideEffects: [\"*.css\"] — see packages/design-system/tsup.config.ts." },
      { id: "perf-rerenders", label: "No unnecessary rerenders", owner: "manual", mechanism: "No React profiler tooling exists in this repo; reviewer judgment." },
      { id: "perf-build", label: "Build verified", owner: "automated", mechanism: "npm run build (Next.js) and npm run package:build (tsup) both fail loudly on a broken component." },
    ],
  },
  {
    id: "release",
    title: "Release",
    items: [
      { id: "release-exported", label: "Exported", owner: "automated", mechanism: "checkExportStatus() confirms the component's name appears in packages/design-system/api-baseline/index.json." },
      { id: "release-in-package", label: "Included in package", owner: "automated", mechanism: "Same check — the api-baseline is generated from the actual built package, not hand-maintained." },
      { id: "release-in-docs", label: "Included in documentation", owner: "manual", mechanism: "Reviewer confirms a live docs page renders the component — no generic automated check exists for 'is this component used in a docs page' today." },
      { id: "release-in-verification", label: "Included in verification", owner: "automated", mechanism: "Same signal as testing-unit/interaction/accessibility — a component with no test file has nothing running in verify:fast." },
    ],
  },
];

export function getChecklistItem(id: string): CertificationCheckItem | undefined {
  for (const category of CERTIFICATION_CHECKLIST) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  return undefined;
}

export function getChecksByOwner(owner: CheckOwner): CertificationCheckItem[] {
  return CERTIFICATION_CHECKLIST.flatMap((category) => category.items.filter((item) => item.owner === owner));
}

export function getTotalCheckCount(): number {
  return CERTIFICATION_CHECKLIST.reduce((sum, category) => sum + category.items.length, 0);
}

// ---------------------------------------------------------------------
// Per-component certification records
// ---------------------------------------------------------------------

export interface ComponentCertificationRecord {
  componentName: string;
  /** Repo-relative path — the one place this is written down, so a docs page never has to restate it. */
  sourcePath: string;
  level: CertificationLevel;
  /** Ids from CERTIFICATION_CHECKLIST's items that are verified complete. */
  completedChecks: string[];
  /** Short, specific notes — what's open and why, not a restated conclusion. */
  notes?: string;
  lastReviewed: string;
}

/**
 * The certification registry — starts with exactly one entry (Button, the
 * DS-1F pilot). Per the brief: this phase builds the mechanism, it does not
 * certify the library. Adding entries here IS certifying a component —
 * that's deliberately DS-2+ work, not DS-1F's.
 */
export const CERTIFICATION_REGISTRY: ComponentCertificationRecord[] = [
  {
    componentName: "Button",
    sourcePath: "src/components/ui/Button.tsx",
    level: "Certified",
    completedChecks: [
      "identity-related",
      "api-type-safe",
      "a11y-keyboard",
      "a11y-focus",
      "a11y-aria",
      "responsive-desktop",
      "responsive-mobile",
      "motion-reduced",
      "docs-examples",
      "testing-unit",
      "testing-interaction",
      "testing-accessibility",
      "visual-baseline",
      "visual-responsive",
      "perf-build",
      "release-exported",
      "release-in-package",
      "release-in-verification",
    ],
    notes:
      "Manual checks (identity-purpose, identity-usage, api-defaults, api-composable, a11y-screen-reader, a11y-color-independence, docs-overview, docs-anatomy, docs-variants, docs-do-dont, release-in-docs) reviewed and passed during the DS-1F pilot — see docs/engineering-notes/12-component-certification.md for the review notes. One open advisory finding: checkTokenBypasses() flags `size-[18px]` (the lg-size spinner icon) as an arbitrary Tailwind value — reviewed and accepted as a legitimate one-off (icon proportional to a token-derived button height, no equivalent token exists), not a defect. tokens-no-bypasses left off completedChecks to keep that finding visible rather than silently marking it resolved.",
    lastReviewed: "2026-07-16",
  },
  {
    componentName: "Workspace",
    sourcePath: "src/components/layout/Workspace.tsx",
    level: "Production Ready",
    completedChecks: [
      "identity-related",
      "api-type-safe",
      "a11y-aria",
      "responsive-desktop",
      "responsive-mobile",
      "motion-reduced",
      "tokens-no-hardcoded-color",
      "tokens-no-hardcoded-spacing",
      "tokens-no-hardcoded-typography",
      "tokens-no-bypasses",
      "docs-examples",
      "testing-unit",
      "testing-interaction",
      "testing-accessibility",
      "visual-baseline",
      "visual-responsive",
      "perf-build",
      "release-exported",
      "release-in-package",
      "release-in-verification",
    ],
    notes:
      "DS-2 pilot: not 'Certified', deliberately. checkTokenBypasses() returns zero findings against Workspace.tsx — all four tokens-* items pass cleanly, better than Button's one accepted exception. a11y-keyboard/a11y-focus are left off completedChecks (not failed — not applicable in Button's sense): Workspace is a layout shell that owns no interactive elements of its own, so there is nothing for userEvent.tab()/.keyboard() to exercise the way Button's own click/focus surface is exercised; its 'interaction' test instead verifies the controlled `collapsed` prop transitions correctly via rerender, which is the actual contract this primitive owns. Manual checks (identity-purpose, identity-usage, api-defaults, api-composable, a11y-screen-reader, a11y-color-independence, docs-overview, docs-anatomy, docs-variants, docs-do-dont, release-in-docs) were reviewed against the live /application-components/foundation-workspace docs page and passed, following the same convention as Button: manual review outcomes are recorded here in prose, not checked off, since nothing here machine-verifies them. The one deliberate, honest gap: the parallel maturity vocabulary this framework mirrors (src/app/application-components/_data/maturity.ts) defines 'Certified' as Production Ready plus 'used in at least one real (non-playground) screen.' DS-2's own scope explicitly forbids migrating an application page to Workspace ('Do not migrate application pages'), so that bar cannot be honestly met in this phase — awarding 'Certified' here would satisfy this framework's own checklist while quietly diverging from what that label means elsewhere in the Foundation Catalog. 'Production Ready' is the accurate level until a real (non-playground) screen adopts Workspace; see docs/CERTIFICATION.md for how to close this gap.",
    lastReviewed: "2026-07-17",
  },
  {
    componentName: "SplitView",
    sourcePath: "src/components/layout/SplitView.tsx",
    level: "Production Ready",
    completedChecks: [
      "identity-related",
      "api-type-safe",
      "a11y-keyboard",
      "a11y-focus",
      "a11y-aria",
      "responsive-desktop",
      "responsive-mobile",
      "motion-reduced",
      "tokens-no-hardcoded-color",
      "tokens-no-hardcoded-spacing",
      "tokens-no-hardcoded-typography",
      "tokens-no-bypasses",
      "docs-examples",
      "testing-unit",
      "testing-interaction",
      "testing-accessibility",
      "visual-baseline",
      "visual-responsive",
      "perf-build",
      "release-exported",
      "release-in-package",
      "release-in-verification",
    ],
    notes:
      "DS-3 pilot: not 'Certified', for the same deliberate reason as Workspace — see below. Unlike Workspace, SplitDivider genuinely owns interactive keyboard behavior (Arrow/Shift+Arrow/Home/End/Enter), so a11y-keyboard and a11y-focus are honestly included here, backed by real userEvent.keyboard()/tab() tests, not left off as 'not applicable' the way Workspace's were. checkTokenBypasses() returns zero findings against SplitView.tsx — all four tokens-* items pass cleanly. Pointer-drag resizing is verified twice, deliberately: Vitest/jsdom (SplitView.test.tsx) checks the resize math against a mocked container rect, since jsdom has no real layout engine; the Playwright spec (e2e/visual/splitview-gallery.visual.spec.ts) drags the divider with real mouse events against real layout as the authoritative browser-level proof dragging actually works, plus a real-keyboard-resize test and a real-Enter-collapse screenshot. Manual checks (identity-purpose, identity-usage, api-defaults, api-composable, a11y-screen-reader, a11y-color-independence, docs-overview, docs-anatomy, docs-variants, docs-do-dont, release-in-docs) were reviewed against the live /application-components/foundation-splitview docs page and passed, following the same convention as Button/Workspace: manual review outcomes are recorded here in prose, not checked off. One open manual note worth flagging rather than silently passing: the divider's active-drag state (bg-accent-500) is currently conveyed primarily by color — its ARIA valuenow and the panes' own visible size change are the non-color signals, but there's no separate non-color indicator on the divider itself while dragging. The same deliberate gap as Workspace's own record: the parallel maturity vocabulary (src/app/application-components/_data/maturity.ts) defines 'Certified' as Production Ready plus 'used in at least one real (non-playground) screen,' and DS-3's own scope explicitly forbids migrating an application page to SplitView. 'Production Ready' is the accurate level until a real screen adopts it.",
    lastReviewed: "2026-07-17",
  },
];

export function getCertificationRecord(componentName: string): ComponentCertificationRecord | undefined {
  return CERTIFICATION_REGISTRY.find((r) => r.componentName === componentName);
}

export interface CertificationCoverage {
  total: number;
  completed: number;
  percentage: number;
  byCategory: { category: CertificationCategory; total: number; completed: number }[];
  remaining: CertificationCheckItem[];
}

export function getChecklistCoverage(record: ComponentCertificationRecord): CertificationCoverage {
  const completedSet = new Set(record.completedChecks);
  const byCategory = CERTIFICATION_CHECKLIST.map((category) => ({
    category,
    total: category.items.length,
    completed: category.items.filter((item) => completedSet.has(item.id)).length,
  }));
  const total = getTotalCheckCount();
  const completed = record.completedChecks.length;
  const remaining = CERTIFICATION_CHECKLIST.flatMap((category) => category.items).filter((item) => !completedSet.has(item.id));
  return { total, completed, percentage: Math.round((completed / total) * 100), byCategory, remaining };
}
