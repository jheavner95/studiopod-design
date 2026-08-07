# DH-6 — Comprehensive Component Architecture Audit

**Certification: CERTIFIED WITH OBSERVATIONS**

An audit, not an implementation. Nothing was renamed, removed, merged or
redesigned. Every number below is measured from the repository, the published
package, the first consumer, and the documentation site in a browser.

---

## 0. Method

| Evidence            | How it was obtained                                                                 |
| ------------------- | ----------------------------------------------------------------------------------- |
| Export inventory    | DH-5's `api-baseline/*.json` — 1,175 names with tiers                               |
| Value vs type       | Parsed from the entry files' `export` / `export type` blocks                        |
| Consumer usage      | Every `import … from "@studiopod/design*"` in Cloud, brace-matched                  |
| Documentation usage | The same, across all 356 docs-site files, split into pages vs site chrome           |
| Internal usage      | Whole-library scan, excluding barrels, for each unreferenced name                   |
| Test coverage       | Co-located `*.test.tsx` per family                                                  |
| API shape           | AST-ish scan for rest elements, JSX spreads, `forwardRef`, HTML-attribute extension |
| Duplication         | Filename collisions across families, then content comparison                        |
| Browser             | Cloud and the docs site, both running                                               |

**One correction to an earlier reading, stated because it changes the
headline.** A first pass found "59% of the public surface is unused, 108 Stable
exports among them." That was inflated: it counted the 459 _type_ exports DH-5
added, which a consumer imports by name only when it wraps a component. Split
properly, the unused figure among _value_ exports is 23% and only **six**
unreferenced value exports are Stable. The tier assignment is in far better
shape than the raw number suggested.

---

## 1. Executive assessment

**The repository is architecturally sound and roughly twice the size it has
earned.** The infrastructure phase did its job: the surface is measurable, the
boundary holds, the tiers correlate with evidence. What DH-6 finds is not
disorder — it is _accumulation_, and it is concentrated in a way that makes it
tractable.

### Strengths

- **The core is genuinely healthy.** Of 34 `ui` value exports, **zero** are
  unreferenced. `layout` (2/27 unused), `table` (1/15), `navigation` (2/19),
  `overlay` (2/16) are close behind. The primitives StudioPOD actually builds
  on are used, tested (83–93% coverage in those families), and correctly tiered.
- **The tiers are honest.** Stable tracks test coverage closely — `navigation`
  is 82% Stable and 93% tested; `workflow` is 3% Stable and 2% tested. DH-5
  applied its criteria faithfully.
- **No lying types.** All six components whose props extend HTML attributes
  actually spread them. There is no component promising native props and
  silently dropping them.
- **Framework neutrality and the client boundary hold** under audit — 134 of
  442 components are client, individually marked.

### Weaknesses

- **Two families are half the surface and almost none of the evidence.**
  `operational` (117 values) and `workflow` (101 values) are 52% of the root
  value surface, 7% and 2% tested respectively, and 5% and 3% Stable.
- **Three of the four diagram engines are documented only on pages the docs
  site itself marks "Historical Reference."** That is 137 public exports whose
  own documentation says they are superseded.
- **The component surface is closed.** 19 of 442 components (4%) pass unknown
  props to the DOM; exactly **one** forwards a ref. For a system whose
  recommended integration pattern is wrapping, this is the binding constraint.
- **One real consumer uses 10 exports.** 1.1% of the root surface. Everything
  else is attested only by the documentation site — which demonstrates
  components rather than depending on them.

### Risk

The dominant risk is **not** that the extra surface is wrong. It is that it is
_unfalsifiable_: 0%-tested, 0-consumer code cannot be refactored with
confidence, cannot be deleted without argument, and silently sets the price of
every future change. The second risk is the closed API — it is the reason a
consumer reaches for `<table>` instead of `Table`, and it compounds quietly.

### Direction

Shrink the published surface toward what has evidence; open the API of what
remains. Those are separable, and the second is more urgent than the first.

---

## 2. Component inventory summary

**1,175 public exports** across four entry points: **552 values** (components,
hooks, functions, constants) and **623 types**.

Classification is applied to **value exports**; a type export inherits its
component's classification. Family-level defaults with named, evidence-derived
exceptions — not invented per-export precision.

### Root entry — 417 value exports

| Family            | Total   | KEEP    | REFINE  | MERGE  | DEMOTE | REMOVE |
| ----------------- | ------- | ------- | ------- | ------ | ------ | ------ |
| `ui`              | 34      | 33      | —       | 1      | —      | —      |
| `layout`          | 27      | 25      | —       | —      | —      | 2      |
| `navigation`      | 19      | 17      | —       | —      | 2      | —      |
| `feedback`        | 22      | 16      | —       | 1      | 5      | —      |
| `table`           | 15      | 14      | —       | —      | 1      | —      |
| `metadata`        | 15      | 11      | —       | 1      | 3      | —      |
| `overlay`         | 16      | 13      | 1       | —      | 2      | —      |
| `form`            | 22      | 13      | —       | 2      | 5      | 2      |
| `motion`          | 16      | 1       | —       | —      | 15     | —      |
| `hooks`           | 10      | 2       | —       | —      | 8      | —      |
| `providers`       | 2       | 1       | —       | —      | 1      | —      |
| `lib`             | 1       | 1       | —       | —      | —      | —      |
| **`operational`** | **117** | —       | **76**  | 3      | 32     | 6      |
| **`workflow`**    | **101** | —       | **87**  | 4      | 5      | 5      |
| **Total**         | **417** | **147** | **164** | **12** | **79** | **15** |

### `/illustrations` entry — 119 value exports

| Engine                                       | Values | Classification                                         |
| -------------------------------------------- | ------ | ------------------------------------------------------ |
| `capabilities`                               | ~22    | **MOVE** — documented only as Historical Reference     |
| `production`                                 | ~20    | **MOVE** — same                                        |
| `platforms`                                  | ~13    | **MOVE** — same                                        |
| `workflows`                                  | ~20    | REFINE — current, but duplicates `components/workflow` |
| `illustrations` primitives + layout/geometry | ~44    | KEEP / REFINE — the real engine                        |

### `/marketing` — 11 values · `/tokens` — 5 values

| Entry                         | Classification                                         |
| ----------------------------- | ------------------------------------------------------ |
| `marketing` (11 compositions) | **FUTURE** — coherent, current, zero product consumers |
| `tokens` (5)                  | KEEP                                                   |

### Totals across all entries

|        | KEEP | REFINE | MERGE | DEMOTE | MOVE | REMOVE | FUTURE | DEPRECATE |
| ------ | ---- | ------ | ----- | ------ | ---- | ------ | ------ | --------- |
| Values | 196  | 209    | 12    | 79     | 55   | 15     | 11     | 0         |

**DEPRECATE is deliberately empty.** Deprecation is a promise to consumers, and
there is one consumer using ten exports. Every removal here can be a clean
break in a single planned major; inventing a deprecation window for exports
nobody imports would be ceremony.

---

## 3. Package assessment

### `ui` — 34 values · 31% tested · **KEEP**

Button, Card, Badge, TextInput, Typography, Select, Checkbox, Slider. Zero
unreferenced exports — the only family that can say so. This is the design
system. Test coverage (31%) is the weakest thing about it and is worth raising
before anything else, because everything else depends on it.

### `layout` — 27 values · 93% tested · **KEEP**

Stack, Grid, Container, Panel, Surface, Workspace, SplitView. Best-tested
family, 67% Stable, 2 unreferenced. Also holds the library's **only**
`forwardRef` (`Workspace`) — which is the exception that proves § 5's finding.
`workspaceDensityPadding` / `workspaceDensityHeaderHeight` are used nowhere
including internally: REMOVE.

### `navigation` — 19 values · 93% tested · **KEEP**

82% Stable, the highest in the repository, and it earns it. `SideNavigation`'s
API is clean and generic — a consumer could build an app shell from it, and § 6
shows one didn't. `NavigationCollapsedContext` / `useNavigationCollapsed` are
internal cascade machinery: DEMOTE.

### `feedback` — 22 values · 83% tested · **KEEP**

Alert, Toast, Notification, ProgressBar, Skeleton, states. Solid. Five exports
are internal tone plumbing (`FEEDBACK_TONE_ICON/TEXT/BG`, `feedbackRole`,
`useAnnounce`): DEMOTE. `ValidationSummary` here is a re-export shim of the
`form` one: MERGE.

### `metadata` — 15 values · 75% tested · **KEEP**

Coherent label/value presentation. Overlaps `operational`'s property family in
three places (`PropertyGroup`, `PropertySection`, `StatusSummary`) — two are
already re-export shims, which is the right instinct applied inconsistently.

### `table` — 15 values · 64% tested · **KEEP**

Table and its parts. Sound. Note § 6: the one consumer hand-wrote four `<table>`
elements rather than use it.

### `overlay` — 16 values · 25% tested · **KEEP, one REFINE**

Dialog, Drawer, Menu, Popover, Tooltip, CommandPalette. Coverage is low for a
family this behaviour-heavy and this accessibility-sensitive.

**`CommandPalette` is the clearest ownership violation in the repository.** Its
public `CommandPaletteItem` type carries `area` ("Components", "Architecture")
and `pageType` ("reference", "landing", "certification") — the documentation
site's own information architecture, published as design-system API. REFINE.

### `form` — 22 values · 8% tested · **REFINE**

The gap between this family's importance and its evidence is the widest in the
repository. Forms are where accessibility bugs live, and 2 of 23 files have
tests. `FieldLabel` and `FormDivider` are dead: REMOVE. Five field parts are
internal to `FormField`: DEMOTE.

### `motion` — 16 values · 12% tested · **DEMOTE (15 of 16)**

94% unreferenced by any consumer — the highest of any family. Every Framer
variant object (`fadeInVariants`, `pulseVariants`, `staggerContainerVariants`,
…) and every wrapper (`FadeIn`, `ScaleIn`, `SlideUp`) is public and used only
inside the library. Motion should be a _behaviour_ of components, not a
component vocabulary consumers assemble. **Should motion remain public? Mostly
no** — the variants belong behind `/internal` where the motion engine already
lives.

### `hooks` — 10 values · 10% tested · **DEMOTE (8 of 10)**

`useFocusTrap`, `useEscapeKey`, `useOutsideClick`, `useBodyLock`,
`useReducedMotion`, `useAnimationSpeed`, `useMotionEnabled`, `useEditSession`
are the implementation of the overlay and motion families, exposed publicly
because they were in a folder called `hooks`. That is a directory becoming an
API by accident.

### `operational` — 117 values · **7% tested** · **REFINE, at scale**

The largest family in the repository: DataGrid, Inspector, AssetBrowser, Queue,
Job, Bulk actions, Dashboard widgets, Filters. 32 unreferenced-but-internal, 6
dead, 3 duplicated.

An entire **AssetBrowser subsystem — 14 exports** (`AssetGrid`, `AssetList`,
`AssetCard`, `AssetThumbnail`, `AssetFilters`, `AssetSearch`, `AssetPagination`,
…) is referenced by no consumer and no documentation page. It is a complete,
coherent, undocumented, untested feature.

This family is where "is the abstraction correct?" bites. `DataGrid` and
`InspectorPanel` are legitimate design-system abstractions. `QueuePriority`,
`JobRetry`, `BulkUndo` are closer to application behaviour with a StudioPOD
workflow assumed inside them.

### `workflow` — 101 values · **2% tested** · **REFINE, at scale**

Pipeline, Approval, StateMachine, Dependency, Workflow canvas — 92 files, 2
tests. Also **duplicates four components** with the `workflows/` diagram engine
(`WorkflowLegend`, `WorkflowMiniMap`, `WorkflowProgress`, `WorkflowTimeline`):
two parallel workflow systems, one for composition and one data-driven, with
overlapping names in two different entry points.

**Should Workflow remain?** Yes — StudioPOD is a production pipeline product
and workflow visualisation is core to it. But as _one_ system, not two.

### `/illustrations` — 119 values, 131 types · **0% tested** · **split**

Five engines behind one entry point, and the entry is still **`export *`** — 17
of them. ADR 0016 ("the public API is constructed, not aggregated") was applied
to the root entry only, so 28% of the public surface is still aggregated. This
is gap N6, and it is not hypothetical: it is present.

The base illustration engine (canvas, nodes, connections, six layout
algorithms, geometry) is real, reusable infrastructure: **KEEP**.

`capabilities`, `platforms`, `production` are **domain models**, not design
abstractions. `capabilities/types/capability.ts` declares `Capability`,
`CapabilityProvider`, `CapabilityAdapter`, `CapabilityRegistry` and
`CapabilityRelationship` (`"implements"`, `"routes-to"`, `"depends-on"`,
`"fails-over-to"`) — StudioPOD's platform ontology. `CommerceDiagram` and
`PublishingDiagram` are product content. **MOVE** to the documentation
application, which is their only consumer and which marks them historical.

### `/marketing` — 11 compositions · 0% tested · **FUTURE**

Hero, CTA, FAQ, Metrics, Testimonial, Comparison, Timeline, FeatureGrid,
Platform, Workflow, Empty. Coherent and current, referenced by two docs files,
used by no product. **Should Marketing remain in Design? Not indefinitely.** It
serves a Web application that does not exist yet. It is not doing harm; it is
also not earning its place, and it is the natural first inhabitant of a second
package when there is a second consumer. Revisit when Web ships, not before.

### `/tokens` — 5 values · **KEEP**

Small, correct, no findings.

### `/internal` — **KEEP**

Working as designed. Used by the docs site 33 times; Cloud enforces the ban
from its side.

---

## 4. Public API assessment

### The finding: the surface is closed

| Measure                                         | Count  | of 442   |
| ----------------------------------------------- | ------ | -------- |
| Accept `className`                              | 336    | 76%      |
| Carry `aria-*` or `role`                        | 174    | 39%      |
| Declare a rest element and spread it to the DOM | **19** | **4%**   |
| Props type extends HTML attributes              | 6      | 1.4%     |
| Use `forwardRef`                                | **1**  | **0.2%** |

96% of components accept a **closed prop list**. `Button` destructures eleven
named props and renders; there is no path for `id`, `name`, `form`,
`data-testid`, `onFocus`, or an `aria-label` the type did not anticipate.

The consequences are concrete, and they are the ones a real application hits
first:

- **No refs.** Focus management, scroll-into-view, popover anchoring,
  `react-hook-form` registration, drag-and-drop, and analytics libraries all
  need a DOM node. One component in the library can give one.
- **No test hooks.** A consumer cannot put `data-testid` on a `Button`.
- **The wrapper pattern is half-built.** DH-5 exported 310 props types
  specifically so consumers could wrap components (ADR 0013). Wrapping requires
  passing _through_ — and the props types now describe a surface that does not
  accept what a wrapper needs to add.

DH-5 solved the _typing_ half of wrapping. The _plumbing_ half is still open,
and it is the half that blocks adoption.

### Consistency, complexity, discoverability

- **Naming is good.** Families are coherent, names are predictable, `XProps`
  is now near-universal.
- **Tone vocabularies remain fragmented** — DH-4 finding D4, still open: 28
  tone-ish types, seven named `*Tone`, `destructive` vs `error` unreconciled.
- **Discoverability is the quiet problem.** 876 root exports in one namespace.
  A consumer looking for a status component finds `StatusIndicator`,
  `StatusSummary`, `StatusPanel`, `StatusMetric`, `StatusWidget`,
  `StatusTimeline`, `HealthIndicator` and `StatusBadge` across four families —
  several of which are re-export shims of each other.
- **Controlled/uncontrolled is unstated.** No documented convention; each
  component decides. Not wrong today, but unspecified.

### Duplication

17 filenames appear in more than one family. Roughly ten are **deliberate
re-export shims** carrying comments explaining the shared ownership — a
reasonable pattern applied because families are treated as needing to be
"complete." The remaining **~7 are genuine second implementations**: `FilterBar`
(79 vs 35 lines), `HealthIndicator` (18 vs 47), `PipelineStep` (29 vs 75),
`PropertyEditor` (58 vs 67, renamed `InspectorPropertyEditor` at the barrel),
and the four `Workflow*` pairs.

The shims are a symptom worth naming: **the "family completeness" instinct
generates surface.** Nine files exist only so an import path looks whole.

---

## 5. Major findings

**F1 — Three diagram engines are documented as historical by their own docs
site.** `/platforms`, `/capabilities`, `/production` each carry a
`Historical Reference` badge and a banner pointing elsewhere. That is **137
public exports** (55 values) whose only documentation says they are superseded.
Verified in the browser. _Impact: the single largest evidence-backed reduction
available._

**F2 — The component surface is closed.** 4% pass through props; 1 of 442
forwards a ref. _Impact: the most likely reason adoption stalls, and it is
invisible until a consumer tries something the props type did not foresee._

**F3 — Half the root surface has almost no evidence.** `operational` + `workflow`
= 218 of 417 value exports (52%), tested at 7% and 2%, Stable at 5% and 3%.
_Impact: unfalsifiable code. Not necessarily wrong — unarguable either way._

**F4 — 79 exports are public by accident.** Used inside the library, imported by
no consumer: the entire motion variant vocabulary (15), the overlay/motion hooks
(8), tone constants (5), form field parts (5), DataGrid selection helpers, the
AssetBrowser's internals. _Impact: they carry a compatibility promise nobody
asked for._ `cn` was deliberately excluded from this set — it is a legitimate
public utility that our two-consumer sample simply does not import.

**F5 — Only 15 exports are truly dead** — unused by consumers _and_ by the
library itself. After all the above, the genuinely-delete-now list is small.
This is the finding that argues against a dramatic cull.

**F6 — The first consumer hand-built what the library already had.** Cloud's
`AppShell` imports `Badge` and `Button`, then hand-writes `<nav>`, `<header>`,
four `<table>`s, three `<input>`s and a command palette — while Design ships
`SideNavigation`, `NavigationItem`, `Table`, `TableRow`, `SearchInput` and
`CommandPalette`. _Impact: the highest-value question in this audit is why, and
F2 is the leading hypothesis._

**F7 — `export *` survives on `/illustrations`.** 17 statements, 250 exports,
28% of the surface. ADR 0016 was applied to the root entry only. _Impact: the
governance DH-5 established has a hole exactly where the least-examined code
is._

**F8 — Documentation-site concepts are published as API.** `CommandPaletteItem`
carries `pageType: "reference" | "landing" | "certification"`. _Impact: small in
bytes, large as precedent — it is the design system encoding one application's
IA._

---

## 6. Migration roadmap

Sequenced so that each step makes the next cheaper, and so the riskiest
judgement calls come last.

**Stage 1 — Open the surface (no removals).** Add `forwardRef` and rest-prop
pass-through to the ~60 components in `ui`, `layout`, `form`, `navigation`,
`table`, `overlay`. Purely additive; ships as a minor. Do this first because it
is the one change that could alter what a consumer chooses to adopt — and
therefore changes the evidence every later stage depends on.

**Stage 2 — Close the governance hole.** Replace `export *` on `/illustrations`
with explicit lists; forbid `export *` on public entries in `check-api`. Cheap,
mechanical, and makes Stage 4 legible.

**Stage 3 — Demote the accidentally-public (79).** Move to `/internal` or
un-export. One major, one codemod, no consumer impact (verified: none is
imported by Cloud or the docs site).

**Stage 4 — Move the three historical engines (137 exports).** Relocate
`capabilities`, `platforms`, `production` into the documentation application,
their only consumer. Same major as Stage 3.

**Stage 5 — Remove the 15 dead exports.** Trivial once Stage 4 has landed.

**Stage 6 — Reconcile the duplicates (12).** Merge the ~7 genuine second
implementations; keep the shims or resolve them deliberately.

**Stage 7 — Earn or lose `operational` and `workflow`.** Not a deletion
exercise: a test-and-document exercise. Anything still 0-tested and 0-documented
after a deliberate pass is a candidate for `/internal` or removal in a later
major.

**Not scheduled:** `marketing`. Revisit when a Web consumer exists.

---

## 7. Breaking change assessment

| Change                                         | Severity                         | Migration                | Codemod            |
| ---------------------------------------------- | -------------------------------- | ------------------------ | ------------------ |
| Add `forwardRef` + rest props (Stage 1)        | **Safe** — additive              | none                     | —                  |
| Explicit exports on `/illustrations` (Stage 2) | **Safe** if the list is faithful | none                     | —                  |
| `check-api` forbids `export *`                 | Safe — tooling only              | none                     | —                  |
| Demote 79 exports (Stage 3)                    | **Major**                        | import path change       | ✅ high-confidence |
| Move 3 engines (Stage 4)                       | **Major**                        | import path change       | ✅ high-confidence |
| Remove 15 dead exports (Stage 5)               | **Major** in theory              | none in practice         | —                  |
| Merge 12 duplicates (Stage 6)                  | **Major**                        | rename                   | ✅ mostly          |
| Tone vocabulary convergence (D4)               | **Major**                        | rename                   | ✅                 |
| `CommandPaletteItem` field removal (F8)        | Minor                            | drop two optional fields | ✅                 |

**Version strategy.** Stages 1–2 ship as `0.18.0`, additive, immediately.
Stages 3–6 batch into **one** `0.19.0` with a single migration guide and one
codemod bundle — as the DH-5 handoff already recommended, and for the reason it
gave: incremental breaking releases against a one-consumer ecosystem spend
goodwill with nothing to show for it.

Below `1.0.0`, breaking changes bump the minor. **`1.0.0` should be declared
after Stage 6**, not before — the surface it would freeze is not yet the surface
worth freezing.

---

## 8. Design 2.0 maturity assessment

| Dimension               | State                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| Repository architecture | **Mature** — boundary enforced, ADRs current                                |
| Distribution            | **Mature** — published, consumed, typography included                       |
| Framework neutrality    | **Mature** — enforced mechanically                                          |
| API governance          | **Strong** — explicit exports, tiers, manifest; one hole (`/illustrations`) |
| API _ergonomics_        | **Immature** — closed props, no refs                                        |
| Test evidence           | **Bimodal** — core 64–93%, periphery 0–8%                                   |
| Consumer validation     | **Thin** — one product, ten exports                                         |
| Content discipline      | **Weak** — domain models and historical content still published             |

**Roughly two-thirds of the way to being the long-term ecosystem design
platform.** Everything structural is done. What remains is product judgement,
and it is gated on something the repository cannot supply from inside: a second
real consumer. Cloud's 10 exports are not enough signal to decide the fate of
218 operational and workflow components, and no amount of auditing will change
that.

The honest summary: **the platform is ready; the catalogue is not yet a
product.**

---

## 9. DH-7 recommendation

**DH-7 should be "Open the Component API" — Stage 1 above.** Ref forwarding and
prop pass-through across the ~60 components of the core families.

The evidence, not intuition:

1. **It is the only finding that blocks adoption today.** F2 measures 4%
   pass-through and 1 `forwardRef`. F6 shows the one real consumer hand-writing
   navigation, tables and a command palette the library already ships. The
   simplest hypothesis connecting them is that the components could not be
   integrated, and it is testable.
2. **It is additive.** No rename, no removal, no migration, no major version —
   the only substantial change in this roadmap that costs a consumer nothing.
3. **It completes work already paid for.** DH-5 exported 310 props types to
   enable wrapping; wrapping does not work without pass-through. DH-7 finishes
   the sentence DH-5 started.
4. **It is a precondition for every deletion decision.** Every REMOVE, DEMOTE
   and MOVE here rests on "no consumer uses it." If the reason is that the
   component _cannot_ be used, the evidence is measuring the wrong thing.
   **Open the API first, then re-measure, then cut.**

Deleting before opening would be the one sequencing mistake this audit can
actually prevent.

**Recommended after DH-7**, in order: Stage 2 (governance hole, trivial), then
re-run this audit's usage measurement against the reopened API, then the
batched Stage 3–6 major.

---

## 10. Certification

**CERTIFIED WITH OBSERVATIONS.**

The audit is complete and evidence-based. Every public export has been
inventoried, attributed to a family, classified, and cross-referenced against
consumer usage, internal usage, documentation, tests and stability tier. The
architectural questions posed are answered in § 3 with measurements rather than
opinion. Nothing was implemented.

**Certified**, because the deliverable is sound and the repository it describes
is architecturally healthy: the core is used, tested and correctly tiered, and
the problems are localised rather than systemic.

**With observations**, because three findings are material enough that DH-6
should not be read as an all-clear:

1. **The consumer evidence is thin enough to constrain what this audit can
   conclude.** One product, ten exports. The classifications for `operational`
   and `workflow` — 218 value exports, 52% of the surface — rest on the absence
   of usage rather than the presence of a judgement. They are marked REFINE, not
   REMOVE, for exactly that reason, and that is the honest limit of what the
   evidence supports.
2. **The API-ergonomics finding (F2) partially undermines the usage evidence**,
   and is the reason § 9 recommends opening the API _before_ acting on any
   removal. This is stated as a limitation of the audit, not a caveat to it.
3. **137 exports are published as design-system API while their own
   documentation calls them historical.** That is not a judgement call; it is a
   contradiction the repository is currently shipping.

Nothing in the roadmap should be executed before DH-7 re-measures usage against
an open API.

## References

- [DH-5](DH-5.md) § API Governance Established — the inventory this audit reviews
- [DH-5.5](DH-5.5.md) — typography foundation
- [DH-4](DH-4.md) § Design feedback — D2, D4, D5 remain relevant
- [ADR 0016 — intentional exports](../decisions/0016-intentional-exports.md) ·
  [ADR 0013 — framework capabilities are props](../decisions/0013-framework-capabilities-are-props.md)
- [architecture/infrastructure-handoff.md](../architecture/infrastructure-handoff.md) — gaps N5, N6, N7, 6, 8, 16
- Cloud ADR 0034 · Cloud `docs/certification/DH-4.md`
