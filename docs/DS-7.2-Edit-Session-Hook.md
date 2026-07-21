# DS-7.2 — `useEditSession` (Headless Edit Session)

**Status: implemented, 0.12.0.** The orchestration layer of the DS-7.0 editable
inspector programme, implementing the contract defined by DS-7.1.

`useEditSession` is **headless**: it holds a draft against a baseline, derives
dirtiness, and runs the save lifecycle. It renders nothing, persists nothing, and
knows nothing about your domain.

---

## 1. Why a hook and not a component

DS-7.0 Phase 1 established that this system **already owns editing presentation** —
`InspectorProperty`'s edit slot, the Foundation Forms fields (`InputField`,
`SelectField`, `SwitchField`, `SliderField`, `TextareaField`, `ComboboxField`),
`InspectorValidation`, `UnsavedChangesBanner`, `ConfirmDialog`, `FormActions`.
Those components are deliberately caller-controlled and stateless.

DS-7.1 then audited three application orchestration owners and found the real gap
was not UI at all: each had invented **its own vocabulary for the same state
machine** — `saveStatus: idle|saved|warning|error` in one, `actionBusy`+`actionError`
in another, `saveStatus: idle|saving|success|error` in a third. That divergence is
what this hook removes.

So DS-7.2 ships **only** the state machine. No components, no provider, no
imperative controller.

## 2. The state machine

```
                    ┌──────────┐
                    │ loading  │  (caller's fetch in flight)
                    └────┬─────┘
                         │ data resolved
                         ▼
   ┌──────── discard ─ ┌──────────┐
   │   /  edit nets    │ pristine │ ◀──── auto-clear (successResetMs)
   │      to baseline  └────┬─────┘              ▲
   │                        │ update()           │
   │                        ▼                    │
   └──────────────────▶ ┌────────┐               │
                        │ dirty  │               │
                        └───┬────┘               │
              save()        │                    │
        (gate passes,       │                    │
         not a no-op)       ▼                    │
                        ┌────────┐               │
                        │ saving │               │
                        └───┬────┘               │
              ┌─────────────┼──────────────┐     │
              ▼             ▼              ▼     │
         ┌────────┐  ┌──────────────────┐  ┌─────┴──┐
         │ saved  │  │savedWithWarnings │  │ error  │
         └────────┘  └──────────────────┘  └────┬───┘
                                                │ persists until
                                                │ update / save / dismissError
```

Additional transitions:

- **`dirty → pristine` via the no-op guard.** `save()` on a draft equal to the
  baseline clears any transient status and performs **no commit**.
- **`dirty → error` via the gate.** Blockers short-circuit before any commit; the
  first blocker becomes `error`.
- **`error → saving`** — simply call `save()` again. (There is no retry *policy*;
  retrying is the caller invoking the action.)
- **Re-seed.** A new `baseline` identity resets draft, baseline and status.

### Orthogonal modes

`readOnly` and `noSelection` are **not** status values:

- **`readOnly`** freezes every mutating action and forces `canSave: false`, but the
  session keeps whatever status it had. Read it via `isReadOnly`.
- **`noSelection`** is the absence of a session — don't mount the hook.

### States that are deliberately absent

| Not implemented | Why |
|---|---|
| `editing` | Editing is inline and continuous; this system has no edit-mode toggle. "Editing" is an act that produces `dirty`, not a state. |
| `disabled` | Derived, never stored: `isSaving \|\| isReadOnly \|\| loading`. |

## 3. Ownership boundaries

| Concern | Owner |
|---|---|
| Draft contents, baseline source, `original` snapshot | **Caller** |
| Dirtiness, status, the transition rules, `canSave` | **Design System** (this hook) |
| Persistence, networking, retries, conflict resolution | **Caller** (`commit`) |
| Domain save-blockers | **Caller** (`gate`) |
| What a warning *says* | **Caller** (it produced them) |
| Field rendering, validation display, banners, confirm dialogs | **Design System** (existing components) |
| Keyboard shortcuts, focus, autosave | **Caller** |

### Caller responsibilities

1. Own the `baseline` and keep it **referentially stable**. A new object identity
   means "different data loaded" and re-seeds the session.
2. Implement `commit`. It is the entire persistence boundary.
3. Supply `original` if `reset` should work.
4. Supply `gate` for domain blockers.
5. Decide what to do on resolution (navigate, toast, refresh a version list).
6. Own all keyboard and focus behaviour.

### Design System responsibilities

1. Derive `isDirty` from `draft` vs `baseline` using the configured equality.
2. Own the canonical status vocabulary and every transition.
3. Run the no-op guard and the gate before committing.
4. Advance the baseline **only** to what was actually committed.
5. Auto-clear success; never auto-clear failure.
6. Refuse mutations while frozen; ignore commits from a re-seeded session.

## 4. Usage

```tsx
import { useEditSession, InspectorProperty, InputField, Button } from "@studiopod/design-system";

function LayerInspector({ savedLayers, initialLayers, templateId, archived }) {
  const session = useEditSession({
    baseline: savedLayers,      // caller-owned, referentially stable
    original: initialLayers,    // optional — enables reset()
    readOnly: archived,
    gate: (draft) => getSaveBlockers(draft),
    commit: async (draft) => {
      const result = await saveGeometry(templateId, draft);
      return { warnings: result.warnings };
    },
  });

  const { draft, status, error, canSave, isSaving, actions } = session;

  return (
    <>
      <InspectorProperty>
        <InputField
          label="Name"
          value={draft.name}
          onChange={(e) => actions.update((d) => ({ ...d, name: e.target.value }))}
        />
      </InspectorProperty>

      {status === "error" && <InlineMessage tone="error">{error}</InlineMessage>}
      {status === "savedWithWarnings" && <InlineMessage tone="warning">Saved with warnings</InlineMessage>}

      <Button onClick={actions.save} disabled={!canSave}>
        {isSaving ? "Saving…" : "Save"}
      </Button>
      <Button variant="ghost" onClick={actions.discard} disabled={!session.isDirty}>
        Discard
      </Button>
    </>
  );
}
```

### Partial reset

The session is generic and cannot know your fields, so `reset` takes an optional
selector:

```tsx
actions.reset();                                                  // whole draft → original
actions.reset((original, draft) => ({ ...draft, x: original.x })); // one field → original
```

## 5. Equality

The default is a **structural deep comparison** covering plain objects, arrays,
`Date`, and primitives (including `NaN` via `Object.is`). It replaces the
`JSON.stringify` equality one reference owner used, without that approach's key
ordering and `undefined` hazards.

It deliberately does not walk `Map`/`Set`/class instances — a draft is expected to
be serialisable state. Supply `isEqual` for anything richer, for large drafts where
a cheaper check suffices, or to scope dirtiness to a field subset:

```tsx
useEditSession({ ..., isEqual: (a, b) => a.revision === b.revision });
```

The chosen strategy drives `isDirty`, `canSave`, **and** the no-op save guard, so
they can never disagree.

## 6. Non-goals

This hook does **not** implement, and will not be extended to implement without a
new evidence-backed package:

- persistence or networking of any kind
- optimistic concurrency, conflict detection, or conflict resolution
- retry policy or backoff
- keyboard handling, focus management, or scroll behaviour
- autosave
- undo/redo history
- any Inspector UI, inline-editing component, or presentation primitive
- a React context or provider
- an imperative controller object

**Immediate per-action commits are out of scope by design.** A surface where each
control persists on its own action (a row added, a row deleted) is not a session —
keep those as discrete `InspectorActions` with their own pending/error state.
Forcing them through a draft/baseline pair would be a mis-fit.

## 7. Extension points

These are **documented boundaries, not implementations**. Each names the seam a
future package would use.

| Future capability | Seam it extends | How it would attach |
|---|---|---|
| **Concurrency / conflict** | `commit` return value + `EditSessionCommitResult` | `commit` already returns a structured result. A future `conflict` field (e.g. `{ conflict: { serverVersion } }`) would resolve the save to a new terminal status without changing any existing signature. The caller sends its version precondition inside `commit` — the session never needs to know the protocol. |
| **Context / provider** | The returned object | The result is a plain, serialisable object with stable action identities. Wrapping it in a caller-owned `createContext` is a two-line change and needs nothing from this package. DS-7.1 deferred a DS-owned provider until a real multi-level consumer exists. |
| **Autosave** | `actions.save` + `isDirty` | A caller effect — debounce on `isDirty`, call `save()`. The no-op guard already makes redundant autosaves free. Deliberately not built in: autosave eligibility is a product decision, and none of the three reference owners had it. |
| **Undo / redo** | `actions.update` | Wrap `update` in a caller-owned history stack; the session holds only the current draft. A DS implementation would need to own a history buffer, which is a different (and much larger) contract. |
| **External updates while editing** | The `baseline` option | Passing a new `baseline` identity re-seeds the session. Today that **silently discards** an in-flight draft — deliberately unopinionated, because DS-7.1 found no owner had a policy. A future package should decide between ignore / prompt / merge and express it *above* this hook. |

The in-flight guard is already in place for all of these: a commit that resolves
after a re-seed is discarded rather than applied to the new session.

## 8. Future evolution

1. **DS-7.3 should pilot, not extend.** Adopt the hook in one real editable
   inspector before adding anything to it. DS-7.1 recommends `TemplateInspector` —
   the only surface exercising baseline, original, gate, discard, reset, read-only
   and warnings together.
2. **Warnings content is intentionally not re-exposed — decided, not pending
   (DS-7.4).** The caller's `commit` produced them, so it holds them. The
   DS-7.3 pilot was audited in DS-7.4 and the extension was found **not
   justified**: only one buffered session in the consuming application produces
   commit warnings at all, and the parallel field that prompted the question
   turned out to hold a *success message* (present on the clean-success path
   too), not warnings — so a `warnings` field would not have removed it. The
   warning *detail* was already available caller-side and live. See
   `DS-7.4-Warning-Payload-Evaluation.md`, including §6 guidance for consumers.
   Reopen only if a third buffered session needs commit-time warning text that
   is not derivable from live state.
3. **The concurrency decision is still open** (DS-7.1 §8-Q4). No reference owner
   handles save conflicts; all are last-write-wins. That remains a deliberate,
   named gap, not an oversight.
4. **A provider stays deferred** until a consumer needs the session more than one
   level deep.

## 9. Relationship to the package charter

The root barrel states this package ships "shared presentation primitives only: no
business logic, no API clients, no repository/auth/routing state, no application
orchestration." `useEditSession` is consistent with that: it holds **interaction
state**, not application orchestration — no persistence, no transport, no domain
rules, no routing. It follows the precedent already set by `useDataGridSelection`
(uncontrolled selection state), `useTableDensity`, and `useWorkflowPlayback`, all
of which are stateful behaviour hooks in this package. The persistence boundary
(`commit`) and the domain boundary (`gate`) are both callbacks the **caller** owns.
