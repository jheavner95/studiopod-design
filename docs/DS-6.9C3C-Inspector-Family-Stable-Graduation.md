# DS-6.9C3C — Inspector Family Stable Graduation

**Verdict: CERTIFIED WITH DEFERRED ITEMS**

The Inspector and Property exports are now **A. Stable**. The deferred item is
**F1**, which is owned by `ui/Expandable` and is explicitly non-blocking.

No production behaviour changed. No new components. No application migration.

---

## 1. Final stability matrix

| Family / subset | Classification | Change |
|---|---|---|
| `operational` — **Inspector/Property subset** | **A. Stable** | **B → A (this package)** |
| `operational` — everything else (~90 files) | B. Experimental | unchanged |
| `workflow` (incl. `WorkflowInspector`, `StateInspector`, `DependencyInspector`) | B. Experimental | unchanged |
| `layout` (incl. **`WorkspaceInspector`**) | A. Stable | **confirmed** — always was, still is |
| `metadata`, `ui`, `feedback`, `navigation`, `form` (the primitives these compose) | A. Stable | unchanged |

### A scoping decision worth stating explicitly

`API.md` classifies **by family**, and `operational` is 114 files. Promoting the
row as written would have graduated Asset Browser, Queue, Bulk Actions, Data
Grid and ~85 other components that **no package in this programme audited or
tested**.

I split the row instead. The `operational` entry is now two rows — a Stable
Inspector/Property subset and an Experimental remainder — so stability is
granted to exactly what was certified and nothing more. The three
`workflow` inspectors compose the graduated primitives but were never audited
themselves, so they stay Experimental too.

### Graduated: 33 exports

**Components (25):** `InspectorPanel`, `InspectorHeader`, `InspectorSection`,
`InspectorProperty`, `InspectorGroup`, `InspectorTabs`, `InspectorTabPanel`,
`InspectorActions`, `InspectorFooter`, `InspectorStatus`, `InspectorHistory`,
`InspectorValidation`, `InspectorPropertyEditor`, `PropertyPanel`,
`PropertyRow`, `PropertySection`, `PropertyGroup`, `PropertyToggle`,
`PropertySelect`, `PropertyNumber`, `PropertyColor`, `PropertyReset`,
`PropertyActions`, `PropertyLabel`, `PropertyValue`.

**Types (8):** `InspectorPanelProps`, `InspectorHistoryEntry`,
`InspectorStatusItem`, `InspectorTabDef`, `InspectorPropertyEditorField`,
`PropertyEditorField`, `PropertyPanelProps` (+ the `PropertyEditor` component
name itself, exported as `InspectorPropertyEditor`).

**`InspectorPropertyEditor` keeps its documented rename** (API.md category E).
Graduation changes its stability, not its public name — it remains distinct
from `form`'s `PropertyEditor`, which stays bare.

**A gap I found and closed rather than waved through:** the C3A scope list
omitted `PropertyActions`, `PropertyLabel` and `PropertyValue`, so three exports
were about to graduate with **zero assertions**. All three are pure aliases
(`InspectorActions`, `MetadataLabel`, `MetadataValue`), so their behaviour was
covered transitively — but "covered transitively" is not the standard C3A set.
I added four identity/render tests. Suite 860 → **864**.

## 2. API.md changes

- The `operational` row **split into two**, with the Inspector/Property subset
  classified **A. Stable** and pointing at the new section.
- The "Why … Experimental" heading and paragraph re-scoped to *the rest of*
  `operational` plus `workflow`, so it no longer contradicts the new row.
- New **"Inspector/Property graduation (DS-6.9C3C)"** section: the full export
  list, the explicit not-graduated list, the four-package basis, the rename
  note, and a statement that `WorkspaceInspector` is unaffected.

## 3. R2 documentation changes

**R2a — `InspectorHeader.onCollapse` is the dismiss affordance.** Its JSDoc now
says so in as many words, notes the button is labelled "Close inspector", and
states plainly that *the name says `onCollapse` for historical reasons — it
dismisses the inspector, it does not collapse it to a rail*, and that no
`onClose` prop exists anywhere in the family.

This is the misreading that produced the false "missing close affordance"
finding in DS-6.9C1. The documentation now prevents the next reader repeating
it.

**R2b — `WorkspaceInspector.hideBelowLg` defaults to `true`.** The existing
JSDoc explained the rationale but never told a consumer what to *do*. It now
states that the inspector disappears below `lg` unless you opt out, that
persistent visibility requires `hideBelowLg={false}` explicitly, and that the
better answer for small screens is usually the same `InspectorPanel` inside a
`Drawer`.

## 4. Documentation examples verified

| Required pattern | Status |
|---|---|
| `isEmpty` for state ownership | ✅ JSDoc `@example` + `states.ts` + implementation guidance (from C3B) |
| Custom `EmptyState` element for specific titles | ✅ `@example` on `InspectorPanel` |
| `Drawer` + `InspectorPanel` for drawer presentations | ✅ already in `responsive.ts`; **extended** with the `hideBelowLg` relationship |
| `WorkspaceInspector` for persistent aside layouts | ⚠️ **was missing** — added |

The fourth was a real gap: the inspector-panel documentation never named
`WorkspaceInspector` at all, despite it being the intended docked container.
The Desktop breakpoint note now says so, and states that **there is
deliberately no separate drawer-inspector or docked-inspector component** — the
same `InspectorPanel` composes into either container.

**No separate drawer-inspector component was introduced.** Verified: zero
matches for `DrawerInspector`/`InspectorDrawer` anywhere in `src/`.

## 5. Graduation rationale

| Evidence | Package |
|---|---|
| Architecture is right; nothing needed adding — 36 real consumer surfaces | DS-6.9C1 |
| 17 consumer requirements mapped to real files; **zero tests** named as the sole blocker | DS-6.9C2 |
| **145 tests**, every exported prop asserted, 9 axe checks, **no defect found** | DS-6.9C3A |
| R1 shipped **additively**; no breaking change | DS-6.9C3B |
| No unresolved Inspector-owned defects | this package |
| No breaking change required to stabilise | this package |

The original Experimental rationale was "unproven with a second real consumer."
That is now answered from the opposite direction, and more strongly: C1 found
**36 application surfaces already implementing this pattern by hand**. A family
that 36 independent surfaces converged on is better evidenced than one with a
single adopted consumer.

The one honest caveat: **the graduated family still has no production
consumer.** Its fitness is evidenced by audit and test, not by production
mileage. Application adoption (DS-6.9C4+) is what will confirm it, and
graduating first is deliberate — C2 recommended exactly this order so that
adoption happens against a stable, tested API rather than a moving one.

## 6. Verification summary

| Gate | Result |
|---|---|
| TypeScript — app | ✅ |
| TypeScript — tests | ✅ |
| ESLint | ✅ |
| Unit & component tests | ✅ **864 passing / 96 files** (was 860 — **+4**) |
| Next.js build | ✅ |
| Package verify | ✅ |
| **API classification audit** | ✅ subset promoted; remainder and `workflow` untouched |
| **Export surface comparison** | ✅ `package:api-check` — **unchanged** |

Diff scope: 5 files — `API.md`, two JSDoc blocks (`InspectorHeader`,
`Workspace`), one docs data file, one test file. **No component implementation
was modified**, consistent with "no production behaviour changes."

## 7. Deferred-item register

| ID | Item | Owner | Blocking? |
|---|---|---|---|
| **F1** | **`ui/Expandable` emits `aria-expanded` but no `aria-controls`, and sets no id on its content region — so `InspectorSection`'s and `InspectorHistory`'s disclosures have no programmatic trigger→region link.** | **`ui/Expandable`** | **No — non-blocking for Inspector stability.** `aria-expanded` is the required half of the ARIA disclosure pattern; `aria-controls` is a SHOULD. axe reports no violation. Pinned by a test in `InspectorSection.test.tsx` that asserts the current contract, so if `Expandable` gains the attribute the test fails and the change is recorded deliberately. |
| R2 | Documentation for `onCollapse` / `hideBelowLg` | — | **Closed by this package.** |
| R1 | `InspectorPanel` empty-state ownership | — | **Closed by DS-6.9C3B.** |
| — | Graduated family has no production consumer yet | app (DS-6.9C4+) | No — the certification is explicit that fitness rests on audit and test |
| — | Rest of `operational` (~90 files) and all of `workflow` remain Experimental | DS owner | No — deliberately out of scope |

## 8. Certification

| Requirement | Result |
|---|---|
| API.md updated, Experimental → Stable | ✅ scoped to the certified subset |
| `InspectorPropertyEditor` rename preserved | ✅ |
| R2 documentation complete | ✅ both clarifications |
| Stability basis recorded | ✅ four packages cited |
| Examples verified against all four patterns | ✅ one gap found and closed |
| No separate drawer-inspector component | ✅ verified absent |
| `WorkspaceInspector` confirmed stable under `layout` | ✅ |
| All gates pass | ✅ 6/6 |
| Export surface unchanged | ✅ |
| No production behaviour change | ✅ no component implementation touched |

**CERTIFIED WITH DEFERRED ITEMS** — the deferral is **F1** alone, owned by
`ui/Expandable` and non-blocking by the brief's own terms.

The Inspector and Property families are now the canonical, stable, supported
Inspector API for StudioPOD.

Stop after DS-6.9C3C. Application migration not begun.
