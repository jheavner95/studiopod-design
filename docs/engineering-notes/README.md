# StudioPOD Design System Engineering Notes

This directory preserves the genuinely useful engineering knowledge captured during the design system's internal certification exercise — architectural conclusions, reusable design principles, measurable findings, diagrams, and implementation lessons — after the certification/audit pages themselves were deleted as obsolete implementation (RM-5).

These notes are plain repo documentation, not part of the Next.js app (`src/app/`) — they render nowhere and are not linked from site navigation. They exist for engineers working in this codebase later who never saw the original certification pages.

## Contents

1. [Certification History & Technical Debt](./01-certification-history-and-technical-debt.md) — the terminal debt register, dependency-graph metrics, and the one unresolved structural fact (zero production Business Features exist).
2. [Accessibility Findings](./02-accessibility-findings.md) — every resolved and open accessibility defect found across every tier, with file:line detail.
3. [Naming Collisions & API Consistency](./03-naming-collisions-and-consistency.md) — every real cross-tier naming collision found, and the cross-family API inconsistencies (prop conventions, tone vocabularies) still open.
4. [Duplication & Reuse Discipline](./04-duplication-and-reuse-discipline.md) — real duplicate implementations found and consolidated, what's still outstanding, and the audit methodology worth reusing.
5. [Workspace Architecture](./05-workspace-architecture.md) — the six-tier workspace blueprint, its eight design principles, the maturity ladder, and the 110-point scorecard framework.
6. [Foundation Layer Architecture](./06-foundation-layer-architecture.md) — the composition/layering rules, the Table-family row-collapse gap and its migration lessons, and the design-rules audit verdicts.
7. [Application Composition Lessons](./07-application-composition-lessons.md) — how the one real Business Feature composed the tier stack, and the two real bugs its promotion review caught.
8. [Production Workspace Retrospective](./08-production-workspace-retrospective.md) — why the mock existed, its composition/state/accessibility patterns, and why it was removed.
9. [Test Infrastructure (DS-1C)](./09-test-infrastructure.md) — the audit that found zero test tooling, the Vitest/Testing Library/axe-core/Playwright stack chosen (and Storybook/Chromatic deliberately not), the `Button` pilot suite, and the known limitations (single theme, no Linux visual baselines yet) future phases should close.
10. [Verification Pipeline Consolidation (DS-1D)](./10-verification-pipeline.md) — the audit that found a duplicate exports-check and ESLint never running in CI, the three-tier `verify`/`verify:fast`/`verify:full` structure and shared `scripts/verify.mjs` runner adopted, why the root/package `verify` naming collision was resolved by documentation rather than a rename, and the CI duplication (dry-run's package rebuild) deliberately left for a future pass.
11. [Documentation & Showcase Infrastructure (DS-1E)](./11-documentation-infrastructure.md) — the audit that found `getRelated()`/`aliases` as dead metadata with a concrete already-drifted example, the seven-archetype page-contract system derived from existing `pageType`/`badge` fields rather than a new one, the registry-integrity test suite (`design-system-navigation.test.ts`) that needed zero pipeline wiring because it's a normal co-located Vitest file, and the showcase-registry pattern piloted on one example family.
12. [Component Certification Framework (DS-1F)](./12-component-certification.md) — why this deliberately isn't a repeat of the pre-RM-5 certification-page pattern this same directory's own history warns against, the discovery of an existing-but-unused five-level maturity vocabulary reused rather than duplicated, the automated/manual/advisory split across 39 checklist items, and the `Button` pilot's real review log.

## What was deliberately not preserved

Certification ceremony: pass/fail scorecards restating conclusions captured here, certification-level ladders, stale roadmaps, "systems reviewed" tallies, and the ~103 files of `_components`/`_data` implementation these notes replace. None of that implementation is preserved — only the knowledge it produced.
