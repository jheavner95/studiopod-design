# DS-7.2 — Implement Headless Edit Session

**Verdict: CERTIFIED WITH FOLLOW-UP**

`useEditSession` is implemented, tested, documented, and published as **0.12.0**,
verified from a clean registry install with both a compile probe and a **real
runtime execution** of the published artifact.

Scope was held exactly: **orchestration only.** No presentation primitive, no
provider, no context, no imperative controller, no inspector migration, and no
change to `studiopod-app` or the Stable Inspector family.

The follow-ups are two honest, pre-existing repository conditions surfaced by
this work (§9), not defects in the hook.

---

## 1. Approved decisions, as implemented

| Decision | How it landed |
|---|---|
| Buffered sessions only | The hook models draft + baseline + explicit save. Documented in the JSDoc and `docs/DS-7.2-Edit-Session-Hook.md` §6 that per-action commits stay `InspectorActions` |
| Immediate commits outside the session | Not modelled; explicitly named as out of scope |
| `original` optional | Optional prop; `reset` is a documented no-op without it (test-covered) |
| Hook-first | A single exported function, no component |
| No Context / No Provider | None added. Extension seam documented instead |
| No new Inspector UI | Zero component files touched |
| No concurrency implementation | Not implemented; extension point documented (§7 of the hook doc) |

## 2. Public API — exactly as specified

```ts
useEditSession<TDraft>(options): {
  draft, baseline, status, error, actions,        // required surface
  isDirty, isSaving, canSave, isReadOnly, hasError // derived selectors
}
```

**Status** — exactly the seven canonical values, no more:

```ts
type EditSessionStatus =
  "loading" | "pristine" | "dirty" | "saving" | "saved" | "savedWithWarnings" | "error";
```

`editing` and `disabled` are **not implemented**, and this is enforced by the
type system — the published-package compile probe includes two `@ts-expect-error`
assertions proving neither is assignable (§7).

**Actions** — exactly five: `update`, `save`, `discard`, `reset`, `dismissError`.

**No duplicated state.** One stored `phase` plus the draft/baseline comparison
derives everything else. Notably there is **no second in-flight boolean** —
`isSaving` is `status === "saving"`, which was DS-7.1 anti-pattern 3.

Types exported: `EditSessionStatus`, `EditSessionCommitResult`,
`EditSessionActions`, `EditSessionResult`, `UseEditSessionOptions`. Five types
for a generic hook whose options and result both need naming at call sites —
each is justified, none is decorative.

## 3. Required behaviour — implementation notes

| Behaviour | Implementation |
|---|---|
| Dirty computation | `!isEqual(draft, baseline)`, memoized; never stored |
| Baseline advancement | On commit success, advances to **the committed snapshot** — not the current draft, so edits made during a save correctly stay dirty (pessimistic) |
| Optional original baseline | `reset()` reverts the whole draft; `reset(select)` reverts a part, since a generic session cannot know your fields |
| No-op save guard | Draft equal to baseline → clear transient status, **no commit call** |
| Save gating | `gate(draft)` returns blockers; first becomes `error`, no commit attempted. Also drives `canSave`, so a blocked draft never shows an enabled Save |
| Async lifecycle | `idle → saving → saved \| savedWithWarnings \| error` |
| `savedWithWarnings` | Non-empty `warnings` in the commit result; empty array is a clean `saved` |
| Automatic success reset | `successResetMs`, default **3000** (resolving DS-7.1 Q5's 3000-vs-4000 split) |
| Error persistence | Errors **never** auto-clear; cleared by edit, retry, or `dismissError` |
| Derived selectors | All five computed, none stored |
| Configurable equality | `isEqual` option; drives `isDirty`, `canSave` **and** the no-op guard together so they cannot disagree |
| Default deep comparison | Structural: objects, arrays, `Date`, primitives incl. `NaN` via `Object.is` |

**One correctness guard beyond the brief:** a commit that resolves *after* the
session was re-seeded (the caller loaded different data mid-flight) is discarded
rather than applied to the new session. Without it, a stale save would silently
overwrite a fresh baseline. Test-covered.

**Frozen draft.** Mutating actions are refused while `isSaving || isReadOnly ||
loading` — DS-7.1's derived `disabled`, and what all three reference owners did
by disabling controls during save.

## 4. What was deliberately NOT implemented

Persistence, networking, optimistic concurrency, conflict resolution, retry
policy, keyboard handling, focus management, autosave, undo/redo, Inspector UI,
inline-editing components, provider/context, imperative controller.

Retry is *possible* (call `save()` again — test-covered) but there is no retry
**policy**; that distinction is deliberate and documented.

## 5. Extension points — defined, not built

Documented in `docs/DS-7.2-Edit-Session-Hook.md` §7, each naming a real seam:

| Future capability | Seam |
|---|---|
| Concurrency / conflict | `EditSessionCommitResult` is already a structured return — a future `conflict` field adds a terminal status without changing any signature. The caller owns the precondition protocol inside `commit` |
| Context / provider | The result is a plain object with stable action identities; a caller `createContext` is two lines |
| Autosave | Caller effect on `isDirty` + `save()`; the no-op guard makes redundant autosaves free |
| Undo / redo | Wrap `update` in a caller-owned history stack |
| External updates while editing | A new `baseline` identity re-seeds. Today that silently discards the draft — deliberately unopinionated, because DS-7.1 found **no owner had a policy** |

## 6. Tests — 52 behavioural, no snapshots

Every required case is covered, plus the guards the implementation added:

| Required | Tests |
|---|---|
| initial state | 3 (pristine seed, loading override, exactly-five-actions) |
| update | 2 (value + updater form) |
| dirty | 3 (becomes dirty, baseline untouched, nets back to pristine) |
| no-op save | 2 (equal draft, edits netting to baseline) |
| successful save | 4 (commit/advance/resolve, passes through `saving`, draft frozen, no double-commit) |
| save with warnings | 2 (warnings → `savedWithWarnings`, empty array → `saved`) |
| save failure | 5 (error + no advancement, never rejects, retry, cleared by edit, `dismissError`) |
| discard | 3 (to baseline, to *advanced* baseline, refused read-only) |
| reset | 4 (whole, partial via selector, refused read-only, …) |
| missing original baseline | 1 (documented no-op) |
| gate failure | 4 (blocks + first blocker, disables `canSave`, passes when empty, null/undefined pass) |
| derived selectors | 5 |
| status transitions | 3 (full walk, never reports non-canonical, re-seed) |
| automatic success reset | 4 (default 3000, warnings variant, custom ms, errors do **not** clear) |
| custom equality | 2 (drives dirtiness and the no-op guard) |
| deep equality | 4 (structural, nested arrays, length, key-order insensitivity) |
| *(added)* stale-commit discard | 1 |
| *(added)* action identity stability | 1 |

`npx vitest run src/hooks/useEditSession.test.ts` → **52 passed**.
Full repo suite → **941 passed / 97 files** (889 before; +52, no regressions).

## 7. Validation results

| Gate | Result |
|---|---|
| `typecheck` (app) | ✅ clean |
| `package:typecheck` | ✅ clean |
| Unit & component tests | ✅ 941 passing |
| ESLint | ✅ |
| Next.js build | ✅ |
| `package:build` | ✅ (rebuilt **before** api-check — the DS-6.9C6A stale-dist trap) |
| `package:api-check` | ✅ after baseline update; drift showed **exactly** the 6 intended exports and nothing accidental |
| Export verification | ✅ 9 entry targets resolve, ship, well-formed |
| `use-client` / CSS checks | ✅ |
| `verify:full` | ✅ **all 7 steps** |
| Root export count | **610 → 616**, purely additive, no export changed |
| Documentation | ✅ hook doc, CHANGELOG 0.12.0, API.md (family row + DS-7.2 paragraph). `docs:coverage` is advisory-only and does not index hooks |

### Published package integrity

| Check | Result |
|---|---|
| Release gate (4 conditions) | ✅ **all PASS** before dispatch — branch `main`, clean tree, `HEAD == origin/main`, 0 unpushed |
| Workflow run | [29793568406](https://github.com/jheavner95/studiopod-design/actions/runs/29793568406) — **success** |
| Published version / tag | **0.12.0** / `design-system-v0.12.0` |
| Clean registry install | ✅ resolves 0.12.0 |
| All 6 exports in published `.d.ts` | ✅ |
| Canonical union in published types | ✅ exact 7 values |
| **Compile probe** (real root import, strict) | ✅ full API exercised; **both `@ts-expect-error` assertions hold** — `editing` and `disabled` are genuinely un-assignable |
| **Runtime probe** (executes the published artifact) | ✅ `pristine` / `readOnly` / `loading` all correct, exactly 5 actions, draft seeded from baseline, `readOnly` confirmed orthogonal (status stays `pristine`) |

The runtime probe needed a small resolver shim: the package's barrel imports
`next/link` extensionless, which only a bundler resolves — a **pre-existing,
already-documented** package trait (it is precisely why `check-api.mjs` parses
`.d.ts` as text rather than importing). The shim emulates bundler resolution; it
is a harness detail, not a package change. The verification fixture, including
its `.npmrc`, was deleted immediately after use.

## 8. Charter note

The root barrel states this package ships "presentation primitives only … no
application orchestration." `useEditSession` holds **interaction state**, not
application orchestration: no persistence, no transport, no domain rules, no
routing — `commit` and `gate` are caller-supplied callbacks. It follows the
precedent already set by `useDataGridSelection` (uncontrolled selection state),
`useTableDensity`, and `useWorkflowPlayback`. Recorded in the hook doc §9 rather
than silently rewriting the charter, which would be an architecture decision this
package was not asked to make.

## 9. Follow-ups

1. **CHANGELOG drift (pre-existing).** The changelog's newest entry before this
   package was **0.8.0** — releases **0.9.0, 0.10.0 and 0.11.0 shipped without
   entries**. I added 0.12.0 and did **not** retroactively author the three
   missing entries, since inventing release notes after the fact risks recording
   something untrue. Worth a dedicated backfill.
2. **Warnings content is not re-exposed.** `savedWithWarnings` signals *that*
   warnings occurred; the text stays with the caller that produced it. This keeps
   the API exactly as specified. If the DS-7.3 pilot finds it awkward, adding a
   `warnings` field is additive and non-breaking.
3. **The concurrency decision remains open** (DS-7.1 §8-Q4) — carried forward
   deliberately, with the extension seam in place and no implementation.

## 10. Recommendation for DS-7.3

**Pilot, do not extend.** Adopt `useEditSession` in exactly one real editable
inspector before adding anything to it.

- **Target `TemplateInspector` / `TemplateEditorPage`** — DS-7.1's recommendation
  and the only surface exercising baseline, `original`, `gate`, `discard`,
  `reset`, `readOnly` and warnings together. Its current orchestration
  (`layers`/`savedLayers`, `JSON.stringify` dirtiness, `saveStatus` +
  `saving` + `saveMessage`) maps onto the hook almost field-for-field.
- Bump `studiopod-app` to `^0.12.0` first and confirm it compiles before touching
  any inspector.
- Expect the pilot to answer follow-up 2 (warnings) and to produce the evidence
  for or against a provider.
- Do **not** migrate the four remaining read-only inspectors under DS-7.x — DS-7.0
  P1 established they belong to a Stable-family follow-on.

## 11. Final audit

| Deliverable | Result |
|---|---|
| 1. Hook implementation | ✅ `src/hooks/useEditSession.ts` |
| 2. Public API | ✅ required surface + 5 derived selectors, no duplicated state |
| 3. Behavioral tests | ✅ 52, no snapshots, every required case |
| 4. Documentation | ✅ state machine, ownership, responsibilities, extension points, usage, non-goals, future evolution |
| 5. Export verification | ✅ 610 → 616, exactly the intended 6 |
| 6. Package validation | ✅ `verify:full` 7/7 + published-package integrity |
| 7. Future extension documentation | ✅ five seams, none implemented |
| 8. Recommendation for DS-7.3 | ✅ §10 |
| No presentation primitives | ✅ |
| No provider / context / controller | ✅ |
| No inspector migration | ✅ |
| `studiopod-app` unmodified | ✅ |
| Stable Inspector family unmodified | ✅ |

**CERTIFIED WITH FOLLOW-UP** — the follow-ups are the pre-existing CHANGELOG gap
for 0.9.0–0.11.0, the deliberately un-exposed warnings content, and the still-open
concurrency decision carried from DS-7.1.

Stop after DS-7.2. `TemplateInspector` not migrated; `studiopod-app` untouched.
