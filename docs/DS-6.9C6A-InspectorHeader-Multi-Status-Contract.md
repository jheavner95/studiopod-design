# DS-6.9C6A — InspectorHeader Multi-Status Contract

**Verdict: CERTIFIED**

`InspectorHeader.status` accepts one status or several. Published as **0.10.0**
and verified from a clean registry install. Purely additive — no breaking
change, no export removed, `InspectorHeader` remains **Stable**.

`studiopod-app` was not modified.

---

## 1. Final API

```ts
export interface InspectorHeaderStatus {
  label: string;
  tone?: StatusTone;
}

status?: InspectorHeaderStatus | InspectorHeaderStatus[];
```

No competing `statuses` prop. No `ReactNode` acceptance — callers describe
*what* the status is, and the design system decides how a status badge looks.

**Implementation note.** A single object still travels through `IdentityBlock`,
exactly as before, so existing callers get byte-identical markup. Arrays render
in `InspectorHeader` itself, because `IdentityBlock` owns exactly one badge slot
and widening a **Foundation Metadata** component to serve an Inspector-only need
would push the change into the wrong layer.

## 2. Rendering behaviour matrix

| `status` | Renders |
|---|---|
| `{ label, tone }` | One badge, via `IdentityBlock` — **unchanged from before** |
| `{ label }` | One badge, tone defaults to `neutral` |
| `[a, b]` | Two badges, **in the order given**, same canonical `Badge` treatment |
| `[{ label }, { label, tone }]` | Tones independent per entry; the untoned one defaults to `neutral` |
| `[a, a]` | **Two** badges — no deduplication |
| `[]` | **No status region and no empty wrapper** — DOM identical to omitting `status` |
| omitted | No status region |

Never: merged labels, inferred priority, reordering, or silently discarded
entries. Order is caller-owned.

## 3. Updated tests

`InspectorHeader.test.tsx`: **13 → 28** (+15).

| Group | Covers |
|---|---|
| Single status | one badge; **byte-identical determinism**; omitted tone → neutral |
| Multiple statuses | all badges render; **supplied order preserved**; independent tones; missing tone doesn't affect siblings; **no dedup**; **no label merging** |
| Regression | **lifecycle + health coexist** — the exact DS-6.9C6 blocker |
| Absent status | empty array renders **DOM identical to omitting status**; omitted renders name only |
| Close affordance | still works alongside multiple statuses; still absent when `onCollapse` is omitted |
| Accessibility | every label is readable text; axe clean |

Behavioural throughout; **no snapshots**. The empty-array and single-object
cases are proven by DOM comparison rather than by asserting a class name.

## 4. Compatibility analysis

| Check | Result |
|---|---|
| Existing consumers requiring changes | **none** — `status={{…}}` is still valid and renders identically |
| Export removed | **none** |
| Export added | **1** — `InspectorHeaderStatus` (type) |
| Root export count | **609 → 610** |
| `InspectorHeader` stability | **Stable**, unchanged |
| Type-level widening covered by | TypeScript + **15 runtime tests** |

### A process finding worth recording

**`package:api-check` initially PASSED against a stale `dist`.** It reported
"609 exports match baseline" *after* I had added a new export. Only running
`npm run package:build` first made it correctly report:

```
✗ index: 1 NEW export(s) not in baseline: InspectorHeaderStatus
```

So the tool's known blind spot is worse than previously recorded: DS-6.9B4A and
C3B noted it compares export **names** only and cannot see prop-shape changes.
It also cannot see anything at all if `dist` is behind the source. **Rebuild
before trusting it.** The baseline was then updated deliberately via
`check-api.mjs --write`, as the tool instructs.

A second, related catch: my first barrel edit exported the type from
`src/components/operational/index.ts` only. The **package root barrel**
(`packages/design-system/src/index.ts`) re-exports operational types
explicitly, so the type was *declared* in `dist` but absent from the public
export list — it would have shipped unusable. Caught by grepping the emitted
export block, then fixed and re-verified by importing it in a real probe file.

## 5. Documentation changes

- **`InspectorHeaderStatus` JSDoc** — why it is structured, not a `ReactNode`.
- **`status` prop JSDoc** — the three cases (object / array / empty array),
  caller-owned order, the explicit "never merges, reorders, deduplicates or
  drops" guarantee, and that arbitrary JSX is intentionally unsupported.
- **`InspectorHeader` JSDoc** — two `@example` blocks: one dimension, and
  lifecycle + health.
- **`API.md`** — `InspectorHeaderStatus` added to the graduated export list,
  plus a DS-6.9C6A paragraph recording the widening, its evidence, its additive
  nature, and the 609 → 610 count.
- **`_data/implementation-guidance.ts`** — new "Header status dimensions" topic.
- **`_data/states.ts`** — new "Multi-status" state note.

## 6. Release-gate evidence

Run **before** dispatch, as required:

| # | Condition | First run | After correction |
|---|---|---|---|
| 1 | Clean tree | ✅ | ✅ |
| 2 | No unpushed commits | ❌ **FAILED** — `9e23180` unpushed | ✅ |
| 3–4 | `HEAD` == `origin/main` | ❌ **FAILED** | ✅ |

**The gate failed and I did not dispatch.** `origin/main` had also moved — the
0.9.0 release workflow pushed its own version-bump commit (`e2cff44`), so my
work was behind as well as ahead. I rebased onto it, pushed
`e2cff44..fd0ff03`, re-ran all four conditions, and only then released.

This is the second consecutive release package where condition 2 caught a real
problem. It is not ceremony.

## 7. Published version and artifact verification

| | |
|---|---|
| Version | **0.10.0** (minor — additive) |
| Tag | `design-system-v0.10.0` |
| Run | [29759601527](https://github.com/jheavner95/studiopod-design/actions/runs/29759601527) — success |
| Source | `fd0ff03` |

Installed `@latest` into a clean temp project with a fresh `.npmrc`:

| Check | Result |
|---|---|
| Version | **0.10.0** |
| `InspectorHeaderStatus` declared | ✅ `{ label: string; tone?: StatusTone; }` |
| `status` union declared | ✅ `status?: InspectorHeaderStatus \| InspectorHeaderStatus[]` |
| `InspectorHeader` exported | ✅ |
| Type present in the **root export list** | ✅ |
| **Type importable by a real consumer** | ✅ a probe file importing the type and building both a single value and an array **compiles against the published package** |

That last check is the one that matters: a declaration present in the bundle
proves nothing if it is not exported. I compiled against it rather than
grepping for it.

## 8. Verification summary

| Gate | Result |
|---|---|
| TypeScript — app | ✅ |
| TypeScript — tests | ✅ |
| ESLint | ✅ |
| Unit & component tests | ✅ **879 passing / 96 files** |
| Next.js build | ✅ |
| Package verification | ✅ |
| API export comparison | ✅ 610, one added, **none removed** |
| Independent published-artifact verification | ✅ clean-dir install + type-import probe |
| `studiopod-app` modified | ✅ **no** — still on `^0.9.0`, untouched |

## 9. Final audit

| Requirement | Result |
|---|---|
| `InspectorHeaderStatus` defined and exported | ✅ |
| `status` widened to object-or-array | ✅ |
| Single-status callers valid without change | ✅ byte-identical markup asserted |
| No competing `statuses` prop | ✅ |
| No `ReactNode` accepted | ✅ |
| Array: order, no merge, no priority, no dedup, no drops | ✅ each asserted |
| Empty array: no wrapper | ✅ DOM-identical to omitted |
| Lifecycle + health regression test | ✅ |
| Close affordance unchanged | ✅ |
| Documentation updated | ✅ 6 surfaces |
| Release gate observed | ✅ **failed, corrected, re-verified** |
| Published and independently verified | ✅ **0.10.0** |
| Application untouched | ✅ |

**CERTIFIED.**

DS-6.9C6 is now unblocked: adopting **0.10.0** in `studiopod-app` lets
`GenerationProfileInspector` and `RecipeInspector` express lifecycle and health
without dropping either. That adoption and the five-inspector migration belong
to the resumed DS-6.9C6, not here.

Stop after DS-6.9C6A. Application not modified; DS-6.9C6 not resumed.
