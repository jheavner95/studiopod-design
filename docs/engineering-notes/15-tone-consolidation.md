# 15. Tone System Consolidation (DS-5B)

DS-4's audit flagged, but deliberately didn't resolve, a real duplication finding: ~25+ independent tone/status/severity-to-Tailwind-class `Record`s across `feedback/`, `workflow/`, `operational/`, `metadata/`, `table/`, and `form/`. DS-5B's job was to resolve it — audit every one, classify it, and consolidate only the genuine duplicates.

## Part 1 — What the audit found

The full audit (grouped by directory, with file:line precision) is preserved in the DS-5B session record; this note summarizes the findings that drove implementation decisions. Highlights:

- **Eight files independently declared the byte-identical, unexported `type StatusTone = "neutral" | "accent" | "success" | "warning" | "error"`**: `TableStatusCell.tsx`, `DependencyInspector.tsx`, `WorkflowInspector.tsx`, `StateInspector.tsx`, `ApprovalRequest.tsx`, `InspectorHeader.tsx`, `IdentityBlock.tsx`, `StatusSummary.tsx` — one of them (`ApprovalRequest.tsx`) even had a comment reading *"Mirrors IdentityBlock's own (unexported) status tone union."* The duplication was self-aware and still not fixed until now.
- **The root cause**: `Badge` — the component every one of those eight files ultimately passes a tone value into — exported no type name for its own `tone` prop. Nothing existed to import, so every consumer redeclared the same five-value union locally.
- **`FilterChip`'s `TONE_STYLES`** reimplemented `Badge`'s exact five class strings, byte for byte, because — same root cause — nothing existed to import.
- **`SavedFilter`'s inline `TONE` constant** used the exact `accent`/`neutral` class values for its own `active`/`inactive` states.
- **`ProgressBar`'s `TONE_FILL` and `ProgressRing`'s `TONE_STROKE`** were two independently hand-typed Records mapping the same four color tokens to two different CSS properties (`bg-*` vs. `stroke-*`).
- **`WorkflowStep.tsx` and `PipelineStep.tsx`** declared four Records each (`MARKER_ICON`, `MARKER_TONE`, `LABEL_TONE`, `STATUS_LABEL`) that were byte-identical, key for key, value for value — the same duplication shape DS-4/DS-5A already found and fixed once for `Grid`/`CardGrid`'s gap map.
- **`FieldError.tsx`'s inline error/warning ternary and `ValidationSummary.tsx`'s `SEVERITY_COLOR`** mapped the identical two colors, independently declared.
- **~15 workflow-tier lifecycle unions** (`WorkflowNodeStatus`, `StateValue`, `DependencyStatusValue`, `ApprovalStateValue`, `WorkflowStateValue`, `WorkflowStepperStateValue`, `WorkflowTimelineEventStatus`, and others) each map *into* a tone via their own per-file `*_TONE` Record — these are domain-specific status vocabularies, not tone types, and (per the audit) already carry unusually thorough doc comments justifying why each is separate from its siblings.
- **`FeedbackTone`** (Alert/Banner/InlineMessage/Notification/Toast/EmptyState, 4-value: info/success/warning/error), **`SystemStatus`** (illustration/feedback, 5-value: idle/active/success/warning/error), and **`HealthState`**/**`HealthStatusValue`** (two more, differently-shaped "health" vocabularies) all describe roughly the same five-ish semantic slots under different key names, with no shared underlying type.

## Classification (Part 1's six categories, applied)

1. **Shared semantic tone (Classification 1) — consolidated:** the eight `StatusTone` duplicates, `FilterChip`⟷`Badge`, `SavedFilter`'s two values, `ProgressBar`⟷`ProgressRing`, `WorkflowStep`⟷`PipelineStep`, `FieldError`⟷`ValidationSummary`.
2. **Component-specific visual variant (Classification 2) — retained, documented:** `PulseStatus`'s `toneMap` (a solid dot, not a pill — different recipe, same key set, now a type alias not a separate declaration); the workflow marker components' own outline-vs-fill choices where internally consistent.
3. **Domain-specific status (Classification 3) — retained, not touched:** every workflow-tier lifecycle union (`WorkflowNodeStatus`, `StateValue`, `DependencyStatusValue`, etc.) — each already independently justified against its siblings in its own doc comment; unifying these is "broader component-family migration," explicitly out of this phase's scope.
4. **Historical duplication (Classification 4):** overlaps with 1 above — every consolidated finding started here.
5. **Public compatibility constraint (Classification 5):** none blocked a fix — every genuine duplicate found was either already unexported (the eight `StatusTone`s, `PulseTone`'s literal union before becoming an alias) or safely additive to export (`StatusTone` from Badge).
6. **Naming inconsistency (Classification 6) — documented, not renamed:** `FeedbackTone`'s `"info"` vs. `StatusTone`'s `"accent"` render near-identically but use different key names everywhere; `SystemStatus`'s `idle`/`active` vs. `StatusTone`'s `neutral`/`accent` describe the same slots under different names. Both are **public, already-shipped types** — renaming either's accepted values is a real breaking change to prop values a consumer might already pass, not a safe mechanical fix. Left alone, named here for whoever considers a deliberate rename later.

**Not resolved, and deliberately not guessed at:** the outline-vs-fill drift for `blocked`/`warning`/`circular`/`waiting` across the workflow marker components (`WorkflowNode.tsx`'s outlined `blocked` vs. `WorkflowStep.tsx`'s filled `blocked`; `DependencyNode.tsx`'s own internal inconsistency between `circular` and its sibling `warning`/`blocked`). No doc comment anywhere states a rule for when a marker should be outlined vs. filled, and picking a resolution without one risks a real, unintended visual regression across the workflow-tier component family — flagged for human review, not silently normalized either direction.

## Part 2/3 — Semantic model and canonical infrastructure

**One canonical concept, not several:** `StatusTone` — `neutral | accent | success | warning | error` — now lives in `src/lib/tone.ts`, the dependency-graph floor (zero imports, same pattern `src/lib/spacing.ts` established in DS-5A). `Badge` re-exports it at its own path (`export type { StatusTone } from "@/lib/tone"`) since that's the name a consumer typing a value for `<Badge tone={...}>` will look for first.

`src/lib/tone.ts` also owns `STATUS_TONE_PILL_CLASSES` — the one shared background+text pairing `Badge` and `FilterChip` both render. This is deliberately the *only* general-purpose tone infrastructure added. Per Part 3's own instruction ("avoid one giant resolver that attempts to serve every visual pattern"), no attempt was made to build a resolver covering foreground/background/border/icon/hover/active/focus for every tone-adjacent component in the audit — `ProgressBar`'s fill/stroke pairing and `WorkflowStep`'s marker/label/icon set stayed as their own small, purpose-scoped shared constants (owned by the most-established file in each pair), not folded into one universal system.

**Did StatusTone need a wider or narrower value set to fully support the model?** No — every genuinely-shared consumer (Badge, FilterChip, SavedFilter, the eight duplicate-type files) already used exactly this five-value set. `ProgressTone` (4-value, no `neutral`) and `FieldMessageTone` (2-value, error/warning only) stayed their own narrower types — a progress fill has no meaningful "neutral" state, and form validation genuinely has no success/accent/neutral severity, matching engineering note 03's own "may be a correct intentional difference" suspicion about the latter.

## Part 4 — Token contract

No token changes. Every class string this phase touches (`bg-neutral-soft text-neutral`, `bg-accent-500`, `stroke-error`, etc.) already existed and was already correct — DS-5B moved *where* these strings are declared, never changed *what* they render. Confirmed empirically, not just reasoned: after consolidating `ProgressBar`/`ProgressRing`'s fill/stroke pairing, a full `next build` was run and the compiled CSS bundle was grepped for all four `stroke-*` classes to confirm Tailwind's static scanner still generates them — a real, if narrowly avoided, risk this phase surfaced (see "A real bug caught" below).

## Part 5 — Component consolidation (what changed, what didn't)

**Changed (types only, zero runtime effect):** the eight `StatusTone` duplicates now import from `@/lib/tone` instead of redeclaring — confirmed via `tsc --noEmit` alone; no test suite addition was needed for these eight, since a type-only substitution with an identical shape has no compiled-JS difference to test.

**Changed (runtime, but rendered output identical):** `Badge`, `FilterChip`, `SavedFilter`, `ProgressRing`, `PipelineStep` all now read from a shared constant instead of their own copy. Every existing call site renders the exact same class string it did before — verified by new tests asserting the specific classes each tone value produces, not just that rendering doesn't throw.

**Not changed:** the ~15 workflow-tier lifecycle unions and their own `*_TONE` Records (Classification 3, left alone). `FeedbackTone`/`SystemStatus`/`HealthState`'s own key naming (Classification 6, documented not renamed). The outline-vs-fill drift (unresolved, flagged for human review).

## A real bug caught during implementation

An early draft of the `ProgressBar`/`ProgressRing` consolidation derived `TONE_FILL`/`TONE_STROKE` from a shared *token* map via template-literal construction (`` `bg-${token}` ``). This would have been a real, silent styling regression: Tailwind's build-time scanner only recognizes literal class-name text present in source files — it does not execute JavaScript, so a computed string like `` `bg-${PROGRESS_TONE_COLOR.accent}` `` never appears as literal text anywhere, and the corresponding CSS would never be generated. The fix (`PROGRESS_TONE_CLASSES: Record<ProgressTone, { fill: string; stroke: string }>`, every value a complete, statically-written class string) keeps the shared-ownership benefit while staying scanner-visible. Caught before landing, not after — via the exact reasoning this codebase's own RM-6 corrective-patch history (the `@theme`-stripping and `"use client"`-stripping bugs, both documented in `CHANGELOG.md`) already warns about: static analysis in this pipeline does not tolerate dynamically-constructed strings.

## Part 6 — Accessibility

Every consolidated tone pairing renders the exact pre-existing class strings — no new color combination was introduced, so no new contrast risk exists. `axe-core`'s color-contrast rule is disabled in the Vitest/jsdom layer for the reason `docs/TESTING.md` already documents (jsdom has no layout engine); every new test file instead runs a full `runA11yCheck()` pass covering structural ARIA correctness (roles, labels, landmark uniqueness), which is what jsdom *can* verify.

One real, pre-existing accessibility gap was found while adding test coverage, unrelated to tone/color: `ProgressBar`'s `label` prop renders as sibling text but is never wired to the `role="progressbar"` element via `aria-label`/`aria-labelledby`, so axe correctly flags a missing accessible name whenever `label` is set. This is not a tone-consolidation regression — the gap predates this phase — and fixing it (generating a stable id, wiring `aria-labelledby`, auditing whether `ProgressRing` has the same gap) is genuine scope beyond "tone system consolidation." Documented in a new test (`ProgressBar.test.tsx`'s own "KNOWN GAP" case, which asserts the violation is present rather than silently passing) and flagged as a follow-up task rather than fixed here.

## Part 9 — Hardcoded semantic-color review

No Category 1 findings (raw palette/hex/arbitrary-color bypass of the tone system) beyond the tone-*map* duplication itself, which Part 5 already resolves. `checkTokenBypasses()` returns zero findings against every file this phase touched.
