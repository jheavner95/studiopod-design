# DS-6.9C3B — InspectorPanel R1 Enhancement

**Verdict: CERTIFIED**

`InspectorPanel` now has explicit empty-state ownership. The change is
**purely additive** — one new optional prop, one widened prop behaviour, zero
breaking changes, and the public export surface is byte-identical.

Scope held to `InspectorPanel`. No unrelated refactoring, no application
migration, no API redesign.

---

## 1. Final API

```ts
export interface InspectorPanelProps {
  header: ReactNode;
  tabs?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  isEmpty?: boolean;      // NEW
  emptyState?: ReactNode; // widened
  maxHeight?: string;
  className?: string;
}
```

Two lines carry the whole change:

```tsx
const showEmptyState = isEmpty ?? Boolean(emptyState);

const emptyContent =
  emptyState === undefined || typeof emptyState === "string"
    ? <EmptyState title="Nothing selected" description={emptyState} />
    : emptyState;
```

**Body precedence is now explicit: `loading` → empty → `children`.**

| `isEmpty` | `emptyState` | Result |
|---|---|---|
| `true` | element | the element, rendered **as given** |
| `true` | string | `EmptyState` titled "Nothing selected", string as description |
| `true` | omitted | default `EmptyState` titled "Nothing selected" |
| `false` | anything | **`children`** |
| omitted | element | the element (legacy truthiness) |
| omitted | string | legacy `EmptyState` (unchanged) |
| omitted | omitted | `children` |

`isEmpty ?? Boolean(emptyState)` is the compatibility hinge: when a caller
says nothing about emptiness, the panel behaves exactly as it did before
`isEmpty` existed.

## 2. Migration notes

**No caller must change.** Nothing breaks, and nothing is deprecated.

For new or updated code:

```diff
- <InspectorPanel header={header} emptyState={selectedId ? undefined : "Select an asset"}>
+ <InspectorPanel
+   header={header}
+   isEmpty={!selectedId}
+   emptyState={<EmptyState title="No asset selected" description="Pick one from the list." />}
+ >
```

Two reasons to move:

1. **Titles you own.** DS-6.9C1 found four real StudioPOD inspectors whose
   empty states cannot be expressed as a description under "Nothing selected"
   — enrollment ("Select an enrollment to view details"), template-intake
   ("No Selection"), `CompositionPropertiesPanel` ("Select a layer to
   inspect"), `StyleInspector` ("Select a style to inspect its properties").
2. **The footgun closes.** Under the old contract the caller had to
   conditionally pass `undefined`; a constant `emptyState` silently suppressed
   `children` forever. With `isEmpty` the switch is stated, not inferred.

**One behavioural difference worth stating plainly:** a caller who passed a
non-string *element* as `emptyState` previously got it nested as an
`EmptyState` **description**; it now renders directly. That is the point of R1,
it is what the brief specifies, and it affects **zero existing callers** —
verified: no `InspectorPanel` or `PropertyPanel` call site in the design system
passes `emptyState` at all. (`Workflow.tsx` has its own unrelated `emptyState`
prop on a different component.) String callers are unaffected either way.

## 3. Updated tests

`InspectorPanel.test.tsx`: **19 → 25**. The C3A empty-state block was replaced
with three focused groups.

| Group | Tests |
|---|---|
| `isEmpty` ownership | `isEmpty=false` renders children despite an `emptyState`; `isEmpty=true` renders it and suppresses children; `isEmpty=true` with no node renders the default |
| Custom empty content | a supplied `EmptyState` renders with **the caller's title, and "Nothing selected" absent**; arbitrary non-`EmptyState` content (a button) renders untouched |
| Backwards compatibility | string → description under the fixed title; string still obeys `isEmpty`; truthy `emptyState` without `isEmpty` still switches; neither prop → children |
| Precedence | loading beats `emptyState`; **loading beats an explicit `isEmpty=true`** |

Every branch in the two new expressions is exercised. The C3A tests that pinned
the *old* contract were updated rather than deleted — the pin did its job:
this change is deliberate and visible, which is exactly why it was written.

## 4. Compatibility verification

| Check | Result |
|---|---|
| Public export surface | ✅ `package:api-check` — **unchanged** |
| Existing `InspectorPanel` callers passing `emptyState` | **0** — verified across `src/` |
| String `emptyState` behaviour | ✅ identical, asserted by two tests |
| Legacy truthiness switch without `isEmpty` | ✅ preserved, asserted |
| Required props | ✅ unchanged (`header` only) |
| `PropertyPanel` alias | ✅ still the same component, inherits the widening |
| Breaking change | **none** |

`api-check` compares export **names** only, so a widened prop is invisible to
it — the same limitation recorded in DS-6.9B4A/B4B. Coverage therefore comes
from typecheck plus the six new runtime tests, not from the baseline check.

## 5. Documentation updates

- **JSDoc on `InspectorPanelProps`** — `isEmpty` documented including its
  fallback; `emptyState` documented as a three-way contract (element / string /
  omitted), with the string case explicitly labelled backwards compatibility.
- **JSDoc on `InspectorPanel`** — states the `loading → empty → children`
  precedence and carries two `@example` blocks (custom title, default).
- **`_data/states.ts`** — the "Empty" state note now describes `isEmpty`,
  caller-owned titles, and the legacy string path.
- **`_data/implementation-guidance.ts`** — new "Empty-state ownership" topic:
  drive it from `isEmpty`, prefer an element so the title says something
  specific.
- **Inline rationale** — both new expressions carry a comment explaining *why*
  the fallback exists, so the compatibility hinge is not mistaken for
  redundancy later.

## 6. Verification summary

| Gate | Result |
|---|---|
| TypeScript — app | ✅ |
| TypeScript — tests | ✅ |
| ESLint | ✅ |
| Unit & component tests | ✅ **860 passing / 96 files** (was 854 — **+6**) |
| Next.js build | ✅ |
| Package verify (api-check, css, use-client, exports) | ✅ export surface unchanged |

**Accessibility unchanged**, verified rather than assumed: no headings are
introduced (`EmptyState` renders styled text, not `<h*>`), no landmark changes
(the panel is still a `Surface`; the landmark belongs to `WorkspaceInspector`),
no focus behaviour added, and accessible names are untouched. axe runs clean on
the default, loading, legacy-string-empty, **and new custom-empty** paths.

Diff scope: 4 files — the component, its test, and two docs data files. No
other component touched.

## 7. Final audit

| Requirement | Result |
|---|---|
| R1 implemented | ✅ `isEmpty` + widened `emptyState` |
| Precedence `loading → isEmpty → children` | ✅ asserted |
| Custom `EmptyState` renders directly | ✅ |
| Default `EmptyState` when omitted | ✅ |
| String compatibility preserved | ✅ |
| `isEmpty=false` / `isEmpty=true` covered | ✅ |
| No existing test regressions | ✅ 860 passing, 0 failing |
| Accessibility unchanged | ✅ |
| Documentation updated | ✅ JSDoc, examples, states, guidance |
| No breaking changes | ✅ |
| Scope held to `InspectorPanel` | ✅ |

**CERTIFIED.**

This clears **R1**, the last code-level item from DS-6.9C2. Remaining before the
family graduates to Stable: **R2** (documentation only — `onCollapse` as the
dismiss affordance, `WorkspaceInspector`'s `hideBelowLg` default) and the
owner's decision to reclassify `operational`/`workflow` in `API.md`. **F1**
(no `aria-controls` on `ui/Expandable`) remains open and out of scope.

Stop after DS-6.9C3B.
