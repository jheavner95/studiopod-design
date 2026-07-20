# DS-6.9C6E-A — InspectorHeader Metadata Contract

**Verdict: CERTIFIED WITH FOLLOW-UP**

`InspectorHeader` gains an optional `metadata?: ReactNode` slot for descriptive
header information that is not a status. Published as **0.11.0**, verified from a
clean registry install with a real root import. Purely additive; `InspectorHeader`
stays **Stable**.

The one follow-up is honest: the **in-browser visual pass could not run** — the
preview harness starts the *application's* dev server, not the design repo's, so
the design gallery route 404s. The rendering contract is instead proven by
behavioural tests, including a direct anti-truncation assertion.

`studiopod-app` was not modified.

---

## 1. Final API decision

```ts
metadata?: React.ReactNode;
```

Chosen exactly as the brief preferred. **No new exported type** — `ReactNode`
covers "short text, multiple values, inline separators, caller-owned
formatting" without a bespoke shape, so nothing to add to the barrels. Root
export count is **unchanged (610)**.

Semantically distinct from `name`, `type`, `status` and actions, by both
placement (its own row) and documentation (the status-vs-metadata guidance).

## 2. Rendering behaviour

Metadata renders as a **subordinate second row** beneath the identity/status
flex row:

```tsx
{hasMetadata ? (
  <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-caption text-ink-tertiary">
    {metadata}
  </div>
) : null}
```

This placement is the whole point. On the single `type` line, metadata competed
with `type` for width and truncated. On its own row it:

- **wraps** (`flex-wrap`) instead of truncating — full content always preserved;
- is **visually subordinate** (`text-caption text-ink-tertiary`, below name and
  status);
- **cannot push status badges out**, because it is not in their row at all.

`hasMetadata` guards `undefined`/`null`/`false`/`""`, so a falsey value renders
**no row and no wrapper**.

## 3. Compatibility analysis

| Check | Result |
|---|---|
| Existing headers without metadata | **byte-identical** — asserted by test |
| `name` / `type` / single-status / array-status / actions / collapse | unchanged |
| New required prop | **none** — `metadata` is optional |
| Export removed | none |
| Export added | none (prop is `ReactNode`) |
| Root export count | **610 → 610** |
| `InspectorHeader` stability | **Stable**, unchanged |

Additive, non-breaking. Covered by TypeScript + runtime tests since `api-check`
compares export names only.

## 4. Test additions and results

`InspectorHeader.test.tsx`: **28 → 38** (+10), one per required proof.

| # | Proof | How |
|---|---|---|
| 1 | Optional | no prop → no metadata text |
| 2 | Unchanged without it | two metadata-less renders byte-identical |
| 3 | Separate from `type` | both present; neither node contains the other |
| 4 | Multiple inline values | three runs with separators all present |
| 5 | Caller-owned React | a `data-testid` node renders |
| 6 | **Present when `type` is long** | full metadata text present despite a truncating slug |
| 7 | Coexists with multi-status | both badges + metadata present |
| 8 | Status order unchanged | "Zebra" before "Alpha" with metadata present |
| 9 | Accessible | text in the a11y tree, decorative separator `aria-hidden`, axe clean |
| 10 | No empty wrapper | `""`/`null`/`false`/`undefined` → DOM identical to omitting it |

**No snapshots** — semantic queries and structural assertions throughout. Test 6
is the direct answer to the truncation evidence: it proves the metadata's full
text survives regardless of `type` length.

## 5. Visual verification — **the follow-up**

A gallery demo card (`HeaderMetadataDemo`) was added to
`InspectorPanelGallery.tsx`, reproducing the exact OverlayPreset case at a
deliberately narrow `max-w-[320px]`: name + long slug type + two statuses +
`v5 · 2 blueprints · owned by Design` metadata.

**But the in-browser pass could not be executed.** The preview tool resolves
`.claude/launch.json` from the session's primary working directory — the
application — so `preview_start` launched the *app* dev server, and the design
docs route `/application-components/inspector-panel` returns "Page not found"
because it exists only in the design repo. I could not point the harness at the
design repo from this session.

I am **not claiming a visual pass I did not run.** What stands in its place:

- **Test 6** asserts the anti-truncation property at the DOM level — the exact
  failure mode the visual pass would check.
- The CSS is `flex-wrap` on a separate row, which cannot truncate horizontally
  by construction.
- The gallery card compiles (typecheck clean) and is ready for a human or a
  design-repo-scoped session to view.

The pixel-level check — wrapping shape, no overlap, subordinate weight — is the
genuine gap. It is low-risk given the structural proof, but it is a gap.

## 6. Export verification

| Check | Result |
|---|---|
| No new exported type introduced | ✅ — nothing to add to barrels |
| **Rebuild before api-check** | ✅ `package:build` run first (the stale-dist trap from DS-6.9C6A) |
| `api-check` after rebuild | ✅ **610 match baseline** |
| `metadata?: ReactNode` in built dist | ✅ present in `InspectorHeaderProps` |
| Clean registry install | ✅ 0.11.0 |
| **Real root import** | ✅ a probe using `metadata` + multi-status **compiles against the published package** |

## 7. Documentation updates

- **`InspectorHeaderProps` JSDoc** — `metadata` documented: what it is (version,
  counts, ownership), the wrapping/non-truncating behaviour, why it is not
  `status` or `type`, and the two-consumer evidence.
- **`InspectorHeader` JSDoc** — new `@example` for descriptive metadata,
  generic (version/count/ownership) with no domain coupling.
- **`API.md`** — DS-6.9C6E-A paragraph: additive, no export change, Stable
  preserved.
- **`_data/implementation-guidance.ts`** — new "Header status vs metadata"
  topic: status is state, metadata is descriptive; don't encode metadata into
  `type` (truncates) or `status` (not a state).
- **`_data/states.ts`** — "Header metadata" state note.

## 8. Version decision

**Minor → 0.11.0.** Additive API under the pre-1.0 policy, matching the
precedent of C6A (0.10.0 status array) — a new optional capability, no breaking
change.

## 9. Published package verification

| | |
|---|---|
| Version | **0.11.0** (`design-system-v0.11.0`) |
| Run | [29782140721](https://github.com/jheavner95/studiopod-design/actions/runs/29782140721) — success |
| Release gate | **failed on condition 2 (unpushed), corrected, re-verified, then dispatched** |
| Clean-install version | 0.11.0 |
| `metadata` prop in dist | ✅ |
| Root import compiles | ✅ |

The gate caught the unpushed commit for the third consecutive release package —
it remains load-bearing, not ceremony.

## 10. Recommendation for application adoption

**DS-6.9C6F should bump `studiopod-app` to `^0.11.0` and adopt `metadata` in the
two headers currently on the truncating `type` line**, then migrate
`RecipeInspector` (the last inspector, and the third multi-status header) using
`metadata` from the start:

- `OverlayPresetInspector`: move `v{version} · {n} BP` off `type` into
  `metadata`.
- `GenerationProfileInspector`: move `v{version}` off `type` into `metadata`.
- `RecipeInspector`: use `status` array + `metadata` directly.

The C6D-IMP and C6E follow-ups both close with this one adoption.

## 11. Final audit

| Requirement | Result |
|---|---|
| `metadata?: ReactNode` added | ✅ |
| Semantically distinct from name/type/status/actions | ✅ |
| Metadata not classified as status | ✅ |
| Wraps, never truncates | ✅ structurally + test 6 |
| Multiple values / caller-owned React | ✅ |
| Empty renders no wrapper | ✅ |
| Existing consumers identical | ✅ |
| No breaking prop change; Stable preserved | ✅ |
| 10 focused tests, no snapshots | ✅ 38 total |
| Visual verification | ⚠️ **gallery card added, in-browser pass not run — §5** |
| Export / dist / clean-install / root import | ✅ |
| Docs updated | ✅ 5 surfaces |
| Published 0.11.0, gate observed | ✅ |
| `studiopod-app` unmodified | ✅ still `^0.10.0` |

**CERTIFIED WITH FOLLOW-UP** — the follow-up is the unrun in-browser visual
pass (§5), mitigated by the DOM-level anti-truncation test and the ready gallery
card, plus the pending application adoption (§10).

Stop after DS-6.9C6E-A. `studiopod-app` not modified; `RecipeInspector` not
migrated.
