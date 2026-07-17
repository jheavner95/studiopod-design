# @studiopod/design-system — Tone

The semantic tone system: what it is, how it differs from status/severity, supported values, accessibility expectations, and how to add or avoid adding to it. Written during DS-5B (tone consolidation); see `docs/engineering-notes/15-tone-consolidation.md` for the full audit this document is built from.

## 1. Philosophy

**One canonical tone, `StatusTone`**, and nothing more general. It answers exactly one question: *which of five color families should this render in* — `neutral`, `accent`, `success`, `warning`, `error`. It is not a styling engine, not a design-token replacement, and not meant to cover every color decision in the system. `src/lib/tone.ts` owns it, the dependency graph's floor (zero imports), the same pattern `src/lib/spacing.ts` established for spacing in DS-5A.

## 2. Tone vs. status vs. severity — these are not the same concept

**Tone answers "what color."** It has no domain knowledge — `StatusTone` doesn't know what a workflow step, a health check, or a form field is.

**Status/severity vocabularies answer "what state is this domain object in."** A workflow step's `WorkflowStateValue` (`not-started` / `ready` / `running` / `waiting` / `blocked` / `completed` / `failed` / `cancelled`) is a real, 8-value lifecycle a workflow step actually goes through — it is not a tone, and it should not become one. Each of these domain vocabularies *maps into* a tone (or a color recipe more specific than tone) via its own small, purpose-scoped `Record`, the way `WorkflowStep.tsx`'s `MARKER_TONE` maps its 8 lifecycle states onto a handful of visual treatments.

**Do not collapse a domain vocabulary into `StatusTone` just because it eventually renders one of the same five colors.** DS-5B audited ~15 workflow-tier lifecycle unions (`WorkflowNodeStatus`, `StateValue`, `DependencyStatusValue`, `ApprovalStateValue`, and others) and found every one already carries a doc comment justifying why it's distinct from its siblings — these stayed separate on purpose. The corresponding failure mode this system already stepped in before DS-5B: eight files each declared their own copy of `StatusTone` itself, purely because nothing existed to import — that *was* real duplication, and DS-5B fixed it. The difference: a domain lifecycle union carries meaning `StatusTone` doesn't (what actually happened to this object); redeclaring the same five-value color-only union in eight places carried no meaning at all.

## 3. Supported values

```ts
type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";
```

| Value | Use for |
|---|---|
| `neutral` | No strong signal — an inactive, default, or unremarkable state. |
| `accent` | In-progress, active, or the system's own primary-action color where a status needs one. |
| `success` | Completed successfully, healthy, connected. |
| `warning` | Needs attention but isn't blocking or broken. |
| `error` | Failed, broken, blocking. |

Two narrower, deliberately-separate vocabularies also exist and are not merged into `StatusTone`:
- **`ProgressTone`** (`accent`/`success`/`warning`/`error`, no `neutral`) — `ProgressBar`/`ProgressRing`. A progress fill has no meaningful "neutral" state.
- **`FieldMessageTone`** (`error`/`warning` only) — `FieldError`/`ValidationSummary`. Form validation has no success/accent/neutral severity to represent.

## 4. Visual pairings

`STATUS_TONE_PILL_CLASSES` (`src/lib/tone.ts`) is the one shared background+text pairing — the pill treatment `Badge` and `FilterChip` both render:

| Tone | Classes |
|---|---|
| `neutral` | `bg-neutral-soft text-neutral` |
| `accent` | `bg-accent-soft text-accent-400` |
| `success` | `bg-success-soft text-success` |
| `warning` | `bg-warning-soft text-warning` |
| `error` | `bg-error-soft text-error` |

This is deliberately the *only* general-purpose tone recipe. Other tone-adjacent components own their own small, purpose-scoped recipe rather than reaching for one universal resolver: `ProgressBar`/`ProgressRing` share a `PROGRESS_TONE_CLASSES` fill/stroke pairing (same colors, two CSS properties); `WorkflowStep`/`PipelineStep` share a marker/label/icon set scoped to that one component family. **Building one giant resolver that tries to serve every visual pattern is exactly what this system avoids** — see engineering note 15 for why.

## 5. Accessibility expectations

- **Never color alone.** Every tone-driven status in this system pairs its color with a label, an icon, or both — `WorkflowStep`'s screen-reader-only `STATUS_LABEL`, `Badge`'s own text content, `HealthIssueList`'s `SEVERITY_ICON`. A tone-only signal (a colored dot with no accessible name) is not an acceptable pattern.
- **Contrast is unchanged by consolidation.** DS-5B moved *where* tone-to-class maps are declared; it never changed *what* they render — every consolidated pairing is byte-identical to what shipped before this phase, so no new contrast risk was introduced. `axe-core`'s color-contrast rule is disabled in this repo's Vitest/jsdom layer (jsdom has no layout engine to compute real contrast against — see `docs/TESTING.md`); real contrast verification happens in the Playwright visual layer against actual rendered pixels.
- **An icon existing next to a tone is not proof of color independence** — verify the icon's *meaning* is actually distinguishable (shape, not just presence) and that assistive tech gets an accessible name, not just `aria-hidden` decoration next to color.

## 6. Choosing the right semantic concept

1. Is this describing **what color a generic UI element should render**, with no domain meaning of its own? → `StatusTone`.
2. Is this describing **what state a specific domain object is actually in** (a workflow step, a health check, a queue job)? → a domain-specific status/lifecycle type, mapped *into* a tone by its own small `Record` — not `StatusTone` itself.
3. Does an existing component's tone-shaped prop already cover this exact need? → reuse it (`Badge`'s `tone`, `FeedbackTone` for Alert-family components) rather than inventing a new prop with the same five values under a new name.
4. Is the visual recipe genuinely different from the pill treatment (a dot, a fill bar, a stroke, a marker), but the underlying five-color meaning the same? → a small, component-family-scoped shared constant (see `PROGRESS_TONE_CLASSES`, `MARKER_TONE`), not a fork of `STATUS_TONE_PILL_CLASSES`.

## 7. Adding a new tone

Adding a sixth value to `StatusTone` is a significant, rarely-justified decision — it would ripple through every consumer (`Badge`, `FilterChip`, `SavedFilter`, and anything importing the type). Before doing it:
1. Confirm the new value is genuinely a *color family*, not a domain status — a domain status belongs in its own vocabulary that maps into the existing five (§2).
2. Confirm no existing value already serves the need — `accent` frequently covers "in-progress/active/info" without needing a sixth name.
3. If justified, add it to `STATUS_TONE_PILL_CLASSES` and the `StatusTone` union in `src/lib/tone.ts` together — an incomplete map is a type error by construction (`Record<StatusTone, string>` requires every key).
4. This is a **MINOR** version bump (additive, non-breaking) per `packages/design-system/VERSIONING.md` — update the CHANGELOG.

## 8. When *not* to add a new tone

- To express a domain-specific lifecycle state — add to that domain's own vocabulary instead (§2).
- To get a slightly different shade of an existing tone for one component — that's a component-specific visual variant (Classification 2), not a new tone; keep it local, don't widen the shared type.
- Because two components' existing tones render similarly but aren't literally the same concept — `FeedbackTone`'s `info` and `StatusTone`'s `accent` render near-identically today, and DS-5B deliberately did not merge them (different public types, different established call sites, no clear win from a forced rename). Don't add a bridging tone to paper over this — flag it for a deliberate future decision instead.

## 9. Migration guidance

- **Importing `StatusTone`**: `import { Badge, type StatusTone } from "@studiopod/design-system"` (or `import type { StatusTone } from "@studiopod/design-system"` for type-only use) — this is a new export as of the version this shipped in; nothing to migrate away from, since nothing public changed shape.
- **If you previously redeclared your own `"neutral" | "accent" | "success" | "warning" | "error"` union locally** (the exact pattern DS-5B found and fixed internally): replace it with an import of `StatusTone`. Purely a type-identity change — no runtime behavior differs.
- **`FeedbackTone`, `SystemStatus`, `HealthState`, `ProgressTone`, `FieldMessageTone`**: all unchanged by this phase. None of these were merged into `StatusTone` — see §2 and §3 for why each stays separate.

## 10. Dark-theme readiness

Unaffected by this phase, and unaffected by design: every tone class (`bg-success-soft`, `text-error`, etc.) already resolves through the semantic color layer (`src/styles/theme.css`'s `@theme` block — see `docs/TOKENS.md`), never a raw palette value. A future light theme is a `theme.css` change; no tone-consuming component needs to change, because none of them reference a palette value directly.
