# 17. Feedback & Status Component Consistency (DS-5D)

DS-5A/5B/5C consolidated spacing, tone, and the structural layout primitive family respectively. DS-5D applies the same lens to the feedback/status family — every component that tells a user what happened or what state something is in: Alert, Banner, Toast, Notification, StatusIndicator, PulseStatus, FieldError, ValidationSummary, ProgressBar, ProgressRing, Skeleton, LoadingState, EmptyState, SuccessState, ErrorState, WarningState, InfoState, InlineMessage, and LiveRegion (20 components/re-exports total, plus Badge as canonical-tone context). Unlike prior phases, this family turned out to already be in unusually good shape — the real, actionable findings were narrower than DS-5A/5B/5C's, and the largest single gap was test coverage, not drift.

## Part 1 — Family audit and classification

A full read of all 20 files against a uniform lens (purpose, semantic responsibility, public API, tone vocabulary, accessibility, animation, implementation pattern, test coverage, documentation coverage) found:

**No separate "Callout", "Spinner", or plain "Status" component exists.** `Spinner`'s job is filled by `LoadingState`'s internal `Loader2` + `animate-spin`, and by `Button`'s own built-in `loading` prop (the same pattern, reused, per `LoadingState`'s own doc comment). The task's "Status" scope item is `StatusIndicator` (`src/components/illustration/StatusIndicator.tsx`, re-exported from `src/components/feedback/`).

**Two confirmed intentional re-exports, not duplicates** (same pattern as `docs/engineering-notes/16`'s `DescriptionList` finding): `src/components/feedback/Skeleton.tsx` re-exports `src/components/ui/Skeleton.tsx`; `src/components/feedback/ValidationSummary.tsx` re-exports `src/components/form/ValidationSummary.tsx`. Both re-export files' own doc comments already state this explicitly.

**Comparison matrix** (condensed — full per-component detail, including every exact prop/ARIA/tone quote, is in the audit transcript this note was synthesized from):

| Component | Tone vocabulary | Role | Dismissible | Animation | Tests (before) |
|---|---|---|---|---|---|
| Alert | `FeedbackTone` (owns it) | `feedbackRole(tone)` | ✅ | — | ❌ |
| Banner | `FeedbackTone` (imports) | `feedbackRole(tone)` | ✅ | — | ❌ |
| Toast | `FeedbackTone` (imports) | `aria-live` region + nested `feedbackRole` | auto + manual | framer-motion | ❌ |
| Notification | `FeedbackTone` (imports) | `feedbackRole(tone)` | ✅ | — | ❌ |
| StatusIndicator | `SystemStatus` → `PulseTone` | **none** (fixed, see Part 3) | — | via PulseStatus | ❌ |
| PulseStatus | `PulseTone` (= `StatusTone` alias) | — (decorative) | — | framer-motion | ✅ |
| FieldError | `FieldMessageTone` (owns it) | `feedbackRole(tone)` | — | — | ✅ |
| ValidationSummary | `FieldMessageTone` (imports, per-item) | `feedbackRole` + `useAnnounce` | — | — | ✅ |
| ProgressBar | `ProgressTone` (owns it) | `progressbar` | — | framer-motion | ✅ |
| ProgressRing | `ProgressTone` (imports) | `progressbar` | — | CSS + framer-motion | ✅ |
| Skeleton | — (shape enum, not tone) | **none** (see Part 3) | — | CSS pulse | ❌ |
| LoadingState | — | `status` | — | CSS spin | ❌ |
| EmptyState | `EmptyStateTone` (`FeedbackTone \| "neutral"`) | `feedbackRole`-derived | — | — | ❌ |
| SuccessState/ErrorState/WarningState/InfoState | fixed (locked via `Omit<EmptyStateProps,"tone">`) | inherited from EmptyState | — | — | ❌ (×4) |
| InlineMessage | `FeedbackTone` (imports) | `feedbackRole(tone)` | — | — | ❌ |
| LiveRegion | — (`AnnouncePriority`, unexported, different domain) | two persistent `aria-live` regions | — | — | ❌ |

**Classification of every inconsistency found:**

1. **Four tone vocabularies coexisting (`StatusTone`, `FeedbackTone`, `ProgressTone`, `FieldMessageTone`) — Classification 1 (intentional).** Verified byte-for-byte, not assumed: none of the four are identical value sets. `FeedbackTone` (`info`/`success`/`warning`/`error`) has no `neutral` and uses `info` where `StatusTone` uses `accent`. `ProgressTone` (`accent`/`success`/`warning`/`error`) has no `neutral`/`info` at all. `FieldMessageTone` (`error`/`warning`) is deliberately narrower — its own doc comment already states form validation has no neutral/accent/success state to represent. This matches DS-5B's own precedent exactly: distinct vocabularies for distinct semantic domains are not drift.
2. **`PulseTone` — Classification 1, not even a separate vocabulary.** `export type PulseTone = StatusTone;` is a literal alias, not a redeclared union — zero duplication.
3. **`EmptyStateTone`/`SystemStatus` — Classification 1, confirmed non-identical despite superficial resemblance.** `EmptyStateTone` is `FeedbackTone | "neutral"` (composed, not copied). `SystemStatus` (`idle`/`active`/`success`/`warning`/`error`) is a genuinely independent lifecycle vocabulary that happens to *resolve to* the same tone values via a mapping table (`statusConfig`) — not interchangeable as a type with `StatusTone` (different members: `idle`/`active` vs `neutral`/`accent`).
4. **`UnsavedChangesBanner.tsx` (`src/components/form/`) — Classification 3 (duplicate implementation), already documented, out of scope.** A real, hand-built instance of Banner's exact pattern, built independently rather than on `Banner`. This isn't a new finding — `Banner.tsx`'s own doc comment and `foundation-feedback/_data/promotion-candidates.ts` already record it, explicitly noting it's left untouched because "forms" is out of scope and this package doesn't migrate existing components. Confirmed still accurate.
5. **`StatusIndicator` and `Skeleton` had zero ARIA — Classification 2 (historical drift) for `StatusIndicator` (fixed, see Part 3), Classification 5 (future work) for `Skeleton` (flagged, not fixed).**
6. **14 of 20 components had zero test coverage — Classification 5 (future work), now closed.** See Part 7.
7. **No Classification 4 (documentation inconsistency) survived beyond `LiveRegion`'s missing home-family page presence** — see Part 6.

## Part 2 — Semantic consistency

Verified every component against `StatusTone`/`ProgressTone`/`FieldMessageTone` directly (not inferred): no component redeclares an identical copy of any of the three. The one true alias (`PulseTone = StatusTone`) was already established in DS-5B and remains correct. **No new tone system was introduced or is recommended** — the family's four vocabularies are each scoped to a real semantic domain (badge/status-dot tone, feedback-message tone, progress tone, field-validation tone) and none of DS-5D's findings changed that conclusion. No code changes were made under this part.

## Part 3 — Accessibility review

Audited `role`, `aria-live`, `aria-atomic`, `aria-labelledby`, `aria-describedby`, accessible names, `progressbar`/`status`/`alert` semantics, focus, dismiss, and icon accessibility across all 20 components. Findings:

- **`feedbackRole(tone)`** (`Alert.tsx`) is the one shared rule 8 components already correctly apply (Alert, Banner, Notification, InlineMessage, EmptyState-family ×5, FieldError, ValidationSummary) — confirmed consistent, not reinvented per-component.
- **`aria-describedby` is not set anywhere in this family** — `FieldError` sets `id` so a *consumer* can wire it to an input, but never sets it on itself. Correct as-is: the input owns that association, not the message.
- **`LiveRegionProvider`/`useAnnounce`** is real, working, mounted-once infrastructure — but only `ValidationSummary` consumes it (for the one case a self-owned `role` can't cover: announcing that a region just unmounted). Every other component correctly owns its own `role="status"`/`"alert"` instead. This is the correct default, not a gap — documented explicitly in Part 6 so it doesn't get "fixed" into unnecessary `useAnnounce` calls later.
- **The one real, confirmed gap: `StatusIndicator` had zero ARIA of any kind.** A status transition (idle → active → error) was rendered purely visually — color and pulse change, text swap — with nothing for a screen reader. Every sibling component in the family already had role-based live-region wiring; this was the one exception.
- **Also found, not fixed:** `Skeleton` has no `role`/`aria-busy` (contrast with `LoadingState`, which correctly sets `role="status"`) — left alone this phase (see below for why). `EmptyState`'s caller-supplied custom `icon` has no enforced `aria-hidden` (the default `Inbox` icon does); a caller who forgets it on a custom icon leaks an unlabeled icon into the region. `ProgressRing`'s visible percentage text has no `aria-hidden` (redundant-but-harmless alongside `aria-valuenow`, not broken).

**The one real accessibility improvement implemented** (per the phase's explicit one-fix allowance): `src/components/illustration/StatusIndicator.tsx` now sets `role={status === "error" ? "alert" : "status"}` on its root — mirroring `feedbackRole()`'s exact convention without importing across the `illustration`→`feedback` layering boundary (that dependency already runs the other direction: `feedback/StatusIndicator.tsx` re-exports from `illustration/`, not the reverse). Live-verified in the browser: all three `StatusIndicator` instances on the `foundation-feedback` docs page (`active`, `success`, `error`) now correctly resolve to `role="status"`/`role="alert"` where none existed before.

**Not fixed, and why:** `Skeleton`'s gap needs more design thought than one surgical fix allows — a bare `role="status"` on every individual skeleton block risks *more* noise, not less, when several render together on one page (a card grid of loading placeholders would fire multiple simultaneous status announcements). The right fix is likely `aria-busy` on a wrapping region rather than a role on each block, which is a call for whoever owns that region, not this primitive. `EmptyState`'s custom-icon gap is a real but lower-severity edge case, documented rather than patched, to keep this phase to its one-improvement discipline.

## Part 4 — API consistency

Reviewed `tone`, `size`, `variant`, `dismissible`, `loading`, `animated`, `icon`, `title`, `description`, `actions`, `children`, `className` across all 20 components (full matrix in the audit transcript). **No API changes were made.** Every apparent inconsistency resolved to a genuine difference in composition model, not cognitive-load-increasing drift:

- **`title`/`description`**: present on the `EmptyState` family (which has no `children` slot at all — everything is structured), absent on `Alert`/`Banner`/`Notification` (whose body *is* `children`/`message`, so a separate `description` prop would be redundant).
- **`icon` overridability**: only the `EmptyState` family exposes it — its icon carries primary visual weight (large, centered). `Alert`/`Banner`/`Notification`/`InlineMessage`'s icon is a small, tone-tied marker, correctly hardcoded via `FEEDBACK_TONE_ICON` rather than exposed as a second decision a caller has to make.
- **`size`**: three different vocabularies (`PulseStatus`'s sm/md, `LoadingState`'s sm/md/lg, `ProgressRing`'s literal pixel number) size three genuinely different things — a dot, a whole region's spinner, and an SVG circle whose stroke math needs real pixel precision. Forcing one shared `Size` type across these would be exactly the "universal abstraction" DS-5A/5C's own briefs already warned against building without cause.
- **`SuccessState`/`ErrorState`/`WarningState`/`InfoState` as four thin ~8-line wrapper files**: considered as a collapse candidate (each adds only a locked `tone` + default icon over `EmptyState`) and explicitly rejected — all four are already public, exported, `packages/design-system`-shipped components; removing them would be a breaking change for a cosmetic surface-area reduction, which neither this phase nor any prior one asked for. Preserved as-is, per "preserve compatibility whenever reasonable."

## Part 5 — Component relationships

Ownership boundaries, confirmed non-overlapping in the audit (each pair below has a real, code-verified difference, not just a naming one):

- **Alert vs. Banner**: boxed/inline-in-layout (Alert, has `title`) vs. full-bleed edge-to-edge strip (Banner, no `title`).
- **Alert vs. Notification**: `elevation="none"` inline box vs. `elevation="floating"` card with a `timestamp` slot — Notification is the row `Toast` stacks in its portal.
- **Toast vs. Notification**: `Toast` is a provider/hook (`ToastProvider`/`useToast`) owning the portal, stacking, timing, and motion; it renders `Notification` internally for presentation. Composition, not duplication.
- **InlineMessage vs. FieldError**: `InlineMessage` is for anywhere *except* one form field (general `FeedbackTone`, 4 values); `FieldError` is tied to one field via `id` (narrower `FieldMessageTone`, 2 values) — FieldError's own doc comment draws this line explicitly.
- **EmptyState family vs. Alert/Banner/InlineMessage**: the four `*State` components replace an entire region's content ("nothing else is here"); Alert/Banner/InlineMessage coexist alongside other content ("here's a note"). Same tone can mean either, depending on layout weight — that's the actual axis, not a redundant pair.
- **ValidationSummary vs. FieldError**: aggregation (many items) vs. a single field's single message — ValidationSummary literally imports FieldError's own tone map rather than duplicating it.
- **Badge vs. StatusIndicator**: Badge is a static label pill (counts, plan tiers); StatusIndicator is a live/lifecycle dot+label pairing (`idle`/`active`/`success`/`warning`/`error`) that pulses while live — different semantic job despite both ultimately resolving to `StatusTone` colors.
- **ProgressBar vs. ProgressRing**: linear vs. radial rendering of the identical `ProgressTone`/`PROGRESS_TONE_CLASSES` contract — ProgressRing imports rather than redeclares.
- **LoadingState vs. Skeleton**: full-region "no shape known yet" placeholder (spinner + label) vs. shape-accurate placeholder (a specific block/text/circle skeleton to preview). Different jobs, not two loading indicators competing for the same case.

No ownership overlap requiring a fix was found — this section's job was to write the boundaries down, not move them.

## Part 6 — Documentation

- `docs/engineering-notes/17-feedback-family-consistency.md` (this note).
- `foundation-feedback/_data/accessibility.ts`: added a "Shared announcement infrastructure" topic explaining `LiveRegion`/`useAnnounce`'s actual role (previously undocumented anywhere within this family's own docs, despite being real, mounted, working infrastructure — the audit's clearest documentation gap) and updated the "ARIA live regions" topic to include `StatusIndicator`'s new role and the DS-5D fix.
- `foundation-feedback/_data/anatomy.ts`: added `Skeleton` to the "Blocking" axis alongside `LoadingState` — an accurate omission fix (Skeleton was the one component clearly matching that axis's own description that wasn't listed under it).
- **No stale documentation found requiring removal.** `_data/promotion-candidates.ts`'s `UnsavedChangesBanner` finding, `_data/states.ts`, `_data/implementation-guidance.ts`, `_data/responsive.ts`, and `_data/future-extensions.ts` were all reviewed against the current source and found accurate — no hardcoded counts, stale references, or superseded claims.
- `FeedbackGallery.tsx` (the live interactive gallery) already demonstrates 13 of the 20 components with real local state, confirmed accurate and not modified — `FieldError` is correctly absent (forms are out of scope for this family's own gallery), `Badge` is documented in `foundation-components` instead (not this family's job), and `PulseStatus`/`LiveRegion` are documented indirectly (via `StatusIndicator`) or in prose (accessibility topic) rather than as their own gallery card, since neither has a meaningful standalone visual demo — consistent with how DS-5C's audit treated primitives with no independent visual identity.

## Part 7 — Testing

Added test files for all 14 of 20 components with zero prior coverage: `Alert`, `Banner`, `Notification`, `InlineMessage`, `Toast`, `LiveRegion`, `EmptyState`, `SuccessState`, `ErrorState`, `WarningState`, `InfoState`, `Skeleton`, `LoadingState`, `StatusIndicator`. Every file follows the established `rendering`/`state coverage`/`accessibility` convention; `Toast` additionally required real interaction coverage (auto-dismiss, manual dismiss, tone-driven urgency) given its stateful provider/hook shape. 92 new tests. Full suite: **346 tests across 47 files, all passing** (up from 254/33 before this phase). Not inflated — the four `*State` presets each get a small, proportionate test file (3–4 tests) matching their own thin ~8-line implementation, not padded to match a heavier sibling's count.

Two real jsdom/framer-motion interactions surfaced and were fixed correctly rather than worked around:
- `AnimatePresence`'s exit transition keeps a dismissed `Toast`/`Notification` mounted until the animation completes — jsdom never advances real animation time, so a genuine exit transition never resolves in a test. `mockMatchMedia` doesn't reliably reach framer-motion's own `useReducedMotion()` (already documented in `SplitView.test.tsx`); nesting a `MotionPreferenceProvider` override deeper in the tree *also* doesn't reach `useMotionEnabled()`, because the bridge that resolves it into `MotionContext` runs once at `MotionProvider`'s own root, above where a nested override would sit — a real, newly-identified limitation of the existing test-motion-override pattern, not a bug in the source. Fixed by overriding `MotionContext` directly in the two tests that need instant exit.
- Toast's `show()` call — triggered via a raw DOM event inside a portal-rendered, `AnimatePresence`-wrapped tree — needed `fireEvent.click()` (which wraps dispatch in `act()`) rather than a bare `.click()`, which worked fine for simpler components elsewhere in this family but silently failed to flush the resulting re-render here.

## Part 8 — Certification review

`CERTIFICATION_REGISTRY` (`src/lib/certification.ts`) is **unchanged** — still exactly Button (`Certified`), Workspace (`Production Ready`), SplitView (`Production Ready`). No feedback-family component was added or certified.

**Recommendations only, not acted on:** `ProgressBar`, `ProgressRing`, `FieldError`, and `ValidationSummary` were already the family's most mature members before this phase (full test coverage, exported types, clear doc-comment rationale) and remain the strongest candidates for a future certification pass. `Alert`, `Banner`, `Notification`, `StatusIndicator`, and `EmptyState` are now meaningfully stronger candidates than before DS-5D — each gained real test coverage this phase, and `StatusIndicator` gained the accessibility wiring every certification checklist's `a11y-aria` item would otherwise flag. `Toast`/`LiveRegion` are real but harder candidates: both are provider/hook infrastructure rather than a leaf component, which the certification checklist's per-component shape doesn't cleanly fit yet. `SuccessState`/`ErrorState`/`WarningState`/`InfoState` should **not** be treated as independent certification candidates — they're thin, intentional presets over `EmptyState`; certifying `EmptyState` itself would be the meaningful unit.

## Part 9 — Validation

- `npx tsc --noEmit` — clean.
- `npx eslint` — clean (one `react/no-unescaped-entities` finding in a new test file, fixed).
- `npx vitest run` — 346/346 passing across 47 files.
- `npm run verify:full` — all 7 steps pass; API baseline unchanged (no new public exports this phase — the one source change, `StatusIndicator`'s new `role`, is not an export-surface change).
- `npm run certification:report` — unchanged (Button/Workspace/SplitView, same levels).
- `npm run token:report` — unchanged (same pre-existing, pre-DS-5D findings only).
- `npm run package:build` + package verify — clean.
- Live browser verification: `foundation-feedback` docs page loads with no console errors; confirmed via direct DOM query that all three `StatusIndicator` demo instances (`active`/`success`/`error`) now resolve to `role="status"`/`role="alert"` respectively, where none existed before this phase.

## What this phase deliberately did not do

Per its own closing constraints: no component was visually redesigned, no application page was migrated, the package was not published, no additional component was certified, and Navigation components were not started. `Button`, `Workspace`, and `SplitView` were not touched. No new tone vocabulary was introduced. `Skeleton`'s accessibility gap and `EmptyState`'s custom-icon `aria-hidden` gap were found and documented but deliberately left unfixed, to keep this phase's one accessibility-improvement allowance to a single, well-scoped change.
