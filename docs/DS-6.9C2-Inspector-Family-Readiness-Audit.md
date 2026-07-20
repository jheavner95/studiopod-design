# DS-6.9C2 — Inspector Family Readiness & Stability Audit

**Verdict: CERTIFIED WITH REQUIRED DS CHANGES**

The Inspector family is **architecturally ready** — the API is clean, composes
existing foundations rather than duplicating them, and covers nearly every real
StudioPOD requirement. It is **not yet ready to be declared canonical**, for one
reason that has nothing to do with its design:

**It has zero test coverage.** 21 exported components, 682 lines, **0 tests** —
against 84 test files elsewhere in the design system.

No application migration performed. No Design System code changed by this audit.

---

## A correction to DS-6.9C1

DS-6.9C1 reported that "nothing in the Inspector family owns a close/dismiss
affordance" and listed it as the one genuine gap. **That was wrong**, and it is
my error — I repeated a survey claim without opening the file.

`InspectorHeader` renders a real close button:

```tsx
onCollapse ? (
  <button type="button" onClick={onCollapse} aria-label="Close inspector" …>
    <X className="size-4" />
  </button>
) : null
```

The affordance exists and is correctly labelled. What C1 actually found is a
**naming mismatch** — the prop is `onCollapse`, which reads as
collapse-to-rail, not dismiss. That is a documentation/naming question, not a
missing capability, and it does **not** justify a DS change.

## 1. API inventory

### Inspector family (11 exported)

| Component | Purpose | Composition model | Composes |
|---|---|---|---|
| `InspectorPanel` | Canonical shell: sticky header, tabs, scrolling body, sticky footer, loading/empty | slot props (`header`/`tabs`/`footer`) + children | `Surface`, `ScrollArea`, `LoadingState`, `EmptyState` |
| `InspectorHeader` | Identity: icon, name, type, status, close | props | `IdentityBlock` |
| `InspectorSection` | Titled, collapsible region | children + controlled/uncontrolled open | `Expandable`, `PropertySection`, `Surface` |
| `InspectorProperty` | One label/value row; read **or** edit | props or children | `MetadataField` |
| `InspectorGroup` | Titled grid of properties | **pure re-export** of `PropertyGroup` | metadata |
| `InspectorTabs` (+`InspectorTabPanel`) | Data-driven tabs | `tabs[]` + children | `Tabs`/`TabsList`/`Tab`/`TabPanel` |
| `InspectorActions` | Right-aligned action row | children | `Inline` |
| `InspectorFooter` | Sticky footer | children | — |
| `InspectorStatus` | Multi-row status list | `items[]` | `StatusIndicator` |
| `InspectorHistory` | Newest-first activity, collapsed after N | `entries[]` | `Expandable` |
| `InspectorValidation` | Errors/warnings, success fallback | `items[]` | `ValidationSummary`, `Alert` |
| `WorkspaceInspector` | The `<aside>` container itself | props | — (in `layout`) |

### Property family (10 exported)

`PropertyRow` (label/value **or** editor, with `modified`/`onReset`) ·
`PropertySection` · `PropertyGroup` · `PropertyEditor` (single-field dispatcher:
text/number/select/switch/color) · `PropertyToggle` · `PropertySelect` ·
`PropertyNumber` · `PropertyColor` · `PropertyReset` · `PropertyPanel`
(**pure re-export alias of `InspectorPanel`**).

**Architectural note, in the family's favour:** two of these are deliberate
re-exports rather than reimplementations (`InspectorGroup` → `PropertyGroup`,
`PropertyPanel` → `InspectorPanel`), each with an in-source rationale comment.
This is a family that has already resisted duplicating itself — which is
precisely the discipline the application side failed at with three rival
`InspectorShell`s.

## 2. Stability matrix

| Component | Classification | Basis |
|---|---|---|
| All 11 Inspector + 10 Property | **Experimental** | API.md category B; **0 tests**; one consumer (doc galleries) |
| `WorkspaceInspector` | **Stable-adjacent** | Lives in `layout` (category A) and **is tested** — 13 references in `Workspace.test.tsx` |
| `InspectorGroup`, `PropertyPanel` | Experimental **aliases** | Inherit the stability of their targets |
| `InspectorPropertyEditor` | Experimental, **renamed** | API.md category E: genuine second implementation vs `form`'s `PropertyEditor`, renamed to resolve the collision |

The split is worth noting: **the container is stable, the contents are not.**

## 3. Consumer contract matrix

Every row below references a real application consumer from DS-6.9C1's
inventory of 36 surfaces. Nothing here is speculative.

| Requirement | Real consumer | Status |
|---|---|---|
| Persistent right `<aside>` | all 36 | **supported** — `WorkspaceInspector` |
| Resizable width from `useWorkspace()` | blueprints `[id]`, published-templates, batch-review | **supported** — `width: string \| number` |
| Close affordance | overlay-library, VariantInspector, templates detail | **supported** — `onCollapse` (**awkward name**) |
| Sticky header | ProductInspector, overlay-library | **supported** |
| Collapsible sections | batch-review "Technical Details" | **supported** |
| Tabs | `ConsoleInspector` (1 of 21) | **supported** |
| Editable fields | Product, Template, JobDetail, Composition (5) | **supported** — `Property*` |
| Read-only metadata | 11 low-complexity inspectors | **supported** |
| Version/activity history | overlay-library, blueprints | **supported** — `InspectorHistory` |
| Validation display | QACert, Intelligence, Publishing diagnostics | **supported** |
| Status rows | `SyncStatusPanel`-style, Intelligence | **supported** |
| Action buttons | Product, Style, Template, JobDetail | **supported** |
| **Custom empty-state title** | enrollment, template-intake, CompositionProperties, StyleInspector | **awkward — see §4** |
| **Visible below `lg`** | `/settings/overlay-generator` | **awkward — see §4** |
| Multi-select header ("N Selected") | batch-review | **supported** — `name: ReactNode` |
| Canvas-coupled selection | CanvasInspector, zone inspectors, TemplateInspectorCanvas | **application responsibility** |
| Drawer-based inspector | templates (< lg), overlay-generator mobile sheet | **supported through composition** — `Drawer` + `InspectorPanel`; `Drawer` is chrome-less by design |

## 4. Missing capability matrix

| Capability | Verdict |
|---|---|
| Close / dismiss | **already supported** (`onCollapse`) |
| Drawer usage | **supported through composition** |
| Persistent inspector | **already supported** |
| Loading | **already supported** (`loading` + `loadingLabel`) |
| Empty state | **awkward — see below** |
| Error state | **already supported** (`InspectorValidation` / `Alert`) |
| History | **already supported** |
| Validation | **already supported** |
| Editable properties | **already supported** |
| Metadata | **already supported** |
| Toolbar actions | **already supported** |
| Tabs | **already supported** |
| Collapsible sections | **already supported** |
| Responsive | **application responsibility**, with one caveat |

### The two awkward contracts

**(a) `emptyState` cannot carry its own title.**

```tsx
{loading ? <LoadingState …/>
 : emptyState ? <EmptyState title="Nothing selected" description={emptyState} />
 : children}
```

The title is **hardcoded**. The caller's node becomes the *description*. Real
consumers need distinct titles — enrollment says "Select an enrollment to view
details", template-intake renders a "No Selection" heading plus its own body
copy, `CompositionPropertiesPanel` says "Select a layer to inspect",
`StyleInspector` says "Select a style to inspect its properties." None can be
expressed as a description under "Nothing selected".

There is also a **precedence footgun**: the prop is truthy-checked, not
tied to an `isEmpty` flag, so a caller who passes a constant `emptyState` node
never renders `children` at all. It is documented ("omit to render children
normally"), but a prop whose correctness depends on the caller conditionally
passing `undefined` invites exactly one bug, silently.

**(b) `WorkspaceInspector` defaults to `hideBelowLg = true`.** The inspector
disappears below `lg` unless the caller opts out. That is a defensible default
and it is overridable — but `/settings/overlay-generator` deliberately keeps a
panel below `lg`, so the default is not universal. **Documentation, not a code
change.**

## 5. Experimental classification review

The recorded rationale is honest and specific:

> both are large (114 and 93 files), StudioPOD-domain-flavored … and to date
> have exactly one consumer — this repo's own documentation galleries. RM-1's
> audit confirmed they're genuinely generic, props-only, no business-logic
> coupling — but "generic in principle" and "stable in practice" are different
> claims.

**Is it still justified? Yes — but for a stronger reason than the one recorded.**

The recorded reason ("unproven with a second real consumer") is about to be
resolved: DS-6.9C1 identified 36 real consumers ready to adopt. But this audit
found a reason the original classification did not cite:

**Zero tests.** `find src/components/operational -name "*.test.tsx"` returns
exactly one file — `FilterChip.test.tsx` — and **no test anywhere in the design
system imports any Inspector or Property component**. The family's only tested
member is `WorkspaceInspector`, which lives in `layout`.

Declaring an untested 21-component family "canonical" for 36 consuming surfaces
would invert this programme's own standard. Every DS change in this programme —
0.8.1 selection, 0.8.3 row hover — shipped with tests first.

### Recommendation: **remain experimental, with a defined graduation path**

Not "remain experimental" as a holding position — as a two-step sequence:

1. **DS-6.9C3 (DS):** add unit tests for the 21 components, and resolve the
   `emptyState` contract (§6). Then graduate `Inspector*`/`Property*` to
   **stable** in API.md.
2. **DS-6.9C4+ (app):** begin adoption against a stable, tested API.

A **split public/internal** was considered and rejected: nothing in the family
is internal — every component has a legitimate external use, and the two
re-export aliases are conveniences, not leaks.

## 6. Required DS changes

Exactly one, and it is additive.

**R1 — `InspectorPanel` empty-state contract.** Let callers own the title.
Additive and non-breaking:

```ts
/** Renders in place of children when true. */
isEmpty?: boolean;
/** Node rendered when isEmpty — supply a full EmptyState, or omit for the default. */
emptyState?: ReactNode;
```

with `emptyState` rendered **as given** when it is an element, falling back to
today's `<EmptyState title="Nothing selected" description={emptyState}/>` only
for a bare string. Existing callers keep working; new callers get control.

**R2 (documentation only) —** clarify that `onCollapse` is the dismiss
affordance, and that `WorkspaceInspector` hides below `lg` by default.

**Not required:** a close button (exists), a drawer inspector (compose
`Drawer` + `InspectorPanel`), a metadata primitive (three exist), a disclosure
primitive (`Expandable`). The application's three rival families do not justify
a fourth implementation here.

## 7. Breaking change assessment

| Change | Type |
|---|---|
| Add tests | **no API change** |
| R1 `isEmpty` + `emptyState` widening | **additive** |
| R2 prop documentation | **documentation only** |
| Graduating B → A in API.md | **documentation only** |

**No breaking change is required to stabilise this family.** That is the
strongest single argument for graduating it rather than redesigning it.

Two caveats for whoever executes: `package:api-check` compares export **names**
only, so R1's widened props are invisible to it — cover them with typecheck and
runtime tests, as DS-6.9B4A/B4B did. And `ExpandableProps` is not exported,
which constrains how far `InspectorSection`'s disclosure can be re-typed by
consumers.

## 8. Readiness recommendation

**The family is the right foundation. Do not redesign it, do not replace it, and
do not build a fourth implementation in the application.**

It is not yet canonical because it is untested, not because it is wrong. The
work to make it canonical is small, additive, and entirely inside the design
system:

1. Test the 21 components.
2. Apply R1; apply R2 docs.
3. Graduate to stable in API.md.
4. Then, and only then, begin application adoption (DS-6.9C4+).

| Certification requirement | Result |
|---|---|
| API inventory complete | ✅ 21 components |
| Stability classified | ✅ all experimental; `WorkspaceInspector` stable-adjacent |
| Consumer contract mapped to real consumers | ✅ 17 requirements, no speculation |
| Missing capabilities determined | ✅ 12 supported, 2 awkward, 1 app responsibility |
| Classification reviewed with evidence | ✅ remain experimental — **0 tests** |
| Required DS changes identified | ✅ **R1 only**, additive |
| Breaking change assessed | ✅ **none required** |

**CERTIFIED WITH REQUIRED DS CHANGES.** No application migration performed.
Stopping after DS-6.9C2.
