# @studiopod/design-system — Public API Contract

This document is the frozen public contract of the package, established in RM-5.5. It classifies every export family, documents the marketing/illustrations/tokens/CSS/dependency contracts, and records the portability caveats a consumer should know about before adopting the package (RM-6).

The literal, per-symbol ground truth lives in `api-baseline/*.json` (one sorted JSON array of export names per entry point) and is enforced by `npm run package:api-check`. This document is the human-readable classification layer on top of that machine-readable baseline — it explains *why* each family is classified the way it is, not just *what* is exported.

## Classification legend

- **A. STABLE PUBLIC** — appropriate for long-term Web/App consumption.
- **B. PUBLIC BUT EXPERIMENTAL** — useful now, exported, but not yet mature enough for a stability guarantee. Expect more naming/shape churn here than in A.
- **C. INTERNAL TRANSITIVE** — needed internally by exported components (bundled) but not itself exported.
- **D. ACCIDENTAL OR DUPLICATED** — removed from the public barrel in RM-5.5.
- **E. NAMING CONFLICT** — required a final public name before this freeze; resolved, documented below.

## Entry points (frozen)

| Entry | Purpose |
|---|---|
| `@studiopod/design-system` | Core UI/layout/form/feedback/navigation/overlay/table/metadata primitives, the motion composition components, the operational and workflow component families, shared hooks/providers, `cn`. |
| `@studiopod/design-system/tokens` | Raw JS-side token constants (motion durations/easing, z-index, accent/success RGB triples). |
| `@studiopod/design-system/marketing` | The 11 canonical marketing composition components. |
| `@studiopod/design-system/illustrations` | The illustration engine plus the workflow/platform/production/capability diagram-engine libraries, merged. |
| `@studiopod/design-system/styles.css` | Canonical token CSS. |

No new entry points were added in RM-5.5. `/application`, `/platform`, `/workflow`, `/production`, and wildcard exports remain explicitly out of scope, per the approved platform decision — `src/components/platform/**` is not exported from any entry point.

## Root entry (`.`) — family classification

| Family | Source | Classification | Recommendation | Dependencies | Web needs now | App needs later |
|---|---|---|---|---|---|---|
| `ui` | `@/components/ui` | A. Stable | Keep as-is | react, cva, clsx, lucide-react | Yes | Yes |
| `layout` | `@/components/layout` (minus `GlobalNav`/`Footer`) | A. Stable | Keep as-is | react | Yes | Yes |
| `form` | `@/components/form` (minus `FormField`, a duplicate) | A. Stable | Keep as-is | react | Yes | Yes |
| `feedback` | `@/components/feedback` (minus `Skeleton`/`ValidationSummary`, duplicates) | A. Stable | Keep as-is | react | Yes | Yes |
| `navigation` | `@/components/navigation` (minus `SegmentedControl`, a duplicate) | A. Stable | Keep as-is | react, **next** (`next/link`, `next/navigation`) | Likely | Yes |
| `overlay` | `@/components/overlay` | A. Stable | Keep as-is | react, react-dom (`Portal`) | Yes | Yes |
| `table` | `@/components/table` | A. Stable | Keep as-is | react | Likely | Yes |
| `metadata` | `@/components/metadata` (minus `DescriptionList`, a duplicate) | A. Stable | Keep as-is | react, **next** (`RelationshipList` only) | Likely | Yes |
| `motion` (composition components) | `@/components/motion` | A. Stable | Keep as-is | react, framer-motion | Yes | Yes |
| `operational` — Inspector/Property subset | `@/components/operational` (`Inspector*`, `Property*`; `PropertyEditor` exported as `InspectorPropertyEditor`) | **A. Stable** | Graduated in DS-6.9C3C. The canonical Inspector API for StudioPOD — see "Inspector/Property graduation" below | react | Likely | Yes |
| `operational` — everything else | `@/components/operational` (minus 3 duplicates, `FilterBar`/`FilterChip` renamed) | **B. Experimental** | Keep exported, but do not treat as stability-guaranteed yet — still the largest, newest, most domain-specific family; clean and generic per RM-1's audit but unproven with a second real consumer | react, **next** (`AssetThumbnail`, `QueueWidget`) | No | Likely |
| `workflow` | `@/components/workflow` | **B. Experimental** | Same reasoning as `operational` | react | No | Likely |
| `hooks` | `@/hooks` | A. Stable | Keep as-is | react | Yes | Yes |
| `providers` | `@/providers` | A. Stable | Keep as-is | react | Yes | Yes |
| `cn` | `@/lib/utils` | A. Stable | Keep as-is | clsx, tailwind-merge | Yes | Yes |

**Why the rest of `operational`, and all of `workflow`, are Experimental, not Stable**: both are large (114 and 93 files), StudioPOD-domain-flavored (Asset Browser, Queue, Bulk Actions, Data Grid, Pipeline, State Machine), and to date have exactly one consumer — this repo's own documentation galleries. RM-1's audit confirmed they're genuinely generic, props-only, no business-logic coupling — but "generic in principle" and "stable in practice" are different claims. Naming and shape here should be expected to move as Web/App actually build real screens against them; treat them as public, usable, but not yet under the same change-discipline as `ui`/`layout`/`form`/etc.

### Inspector/Property graduation (DS-6.9C3C)

The `Inspector*` and `Property*` exports graduated from **B. Experimental** to
**A. Stable** on 2026-07-20. They are now under the same change-discipline as
`ui`/`layout`/`form` — breaking changes require a major version and a migration
note.

**Graduated (33 exports).** Components: `InspectorPanel`, `InspectorHeader`,
`InspectorSection`, `InspectorProperty`, `InspectorGroup`, `InspectorTabs`,
`InspectorTabPanel`, `InspectorActions`, `InspectorFooter`, `InspectorStatus`,
`InspectorHistory`, `InspectorValidation`, `InspectorPropertyEditor`,
`PropertyPanel`, `PropertyRow`, `PropertySection`, `PropertyGroup`,
`PropertyToggle`, `PropertySelect`, `PropertyNumber`, `PropertyColor`,
`PropertyReset`, `PropertyActions`, `PropertyLabel`, `PropertyValue`. Types:
`InspectorPanelProps`, `InspectorHistoryEntry`, `InspectorStatusItem`,
`InspectorTabDef`, `InspectorHeaderStatus`, `InspectorPropertyEditorField`, `PropertyEditorField`,
`PropertyPanelProps`.

`InspectorPropertyEditor` keeps its documented rename (category E, below) —
graduation changes its stability, not its public name.

**Not graduated.** The remaining ~90 files in `operational` (Asset Browser,
Queue, Bulk Actions, Data Grid, Filter/Search, dashboard widgets) and all of
`workflow`, including `WorkflowInspector`/`StateInspector`/`DependencyInspector`.
Those three compose the graduated Inspector primitives but were not themselves
audited or tested, so they stay Experimental. Stability was granted only to what
was actually certified.

**DS-6.9C6A (additive, post-graduation).** `InspectorHeader.status` was widened
from a single `{ label, tone }` to `InspectorHeaderStatus | InspectorHeaderStatus[]`,
and `InspectorHeaderStatus` is now exported by name. Evidence: two StudioPOD
inspectors (`GenerationProfileInspector`, `RecipeInspector`) show lifecycle
**and** health in the header, which a single-valued contract could not express
without dropping information. Purely additive — every existing single-status
caller is unchanged — so it did not disturb Stable status. Root exports 609 → **610**.

**Basis.** Four packages, in sequence:

| Package | What it established |
|---|---|
| DS-6.9C1 | Architecture inventory — 36 real consumer surfaces; the family is the right shape and nothing needed adding |
| DS-6.9C2 | Readiness audit — 17 consumer requirements mapped to real files; **zero tests** identified as the sole blocker |
| DS-6.9C3A | **145 tests**, 0 → full coverage; every exported prop behaviourally asserted; 9 axe checks; **no defect found** |
| DS-6.9C3B | R1 — additive `isEmpty`; empty-state title ownership; **no breaking change** |

The original Experimental rationale was "unproven with a second real consumer."
That is now answered from the other direction: DS-6.9C1 found 36 application
surfaces already implementing this pattern by hand, which is stronger evidence
of fitness than a single adopted consumer would have been.

**No breaking change was required to stabilise the family** — the single
enhancement was additive and the public export surface is unchanged.

`WorkspaceInspector` is unaffected: it lives in `layout`, has always been
**A. Stable**, and remains there.

### Named exceptions within the root entry

| Public name | Source | Note |
|---|---|---|
| `InspectorPropertyEditor` | `@/components/operational` (`PropertyEditor`) | **E, resolved.** Genuine second implementation distinct from `form`'s `PropertyEditor` (kept bare) — a real inspector-specific field editor, not a duplicate. Renamed to match this family's own `Inspector*` convention. |
| `OperationalFilterBar` | `@/components/operational` (`FilterBar`) | **E, resolved.** Genuine second implementation distinct from `ui`'s `FilterBar` (kept bare). |
| `OperationalFilterChip` | `@/components/operational` (`FilterChip`) | **E, resolved.** Genuine second implementation distinct from `ui`'s `FilterChip` (a type, kept bare). |
| `StaggerGroup`, `StaggerItem` | `@/components/motion` | **E, resolved differently than RM-4.** RM-4 originally kept these bare and re-exported the *other* `@/motion` engine's colliding `Stagger`/`StaggerGroup`/`StaggerItem` under an `Engine*` prefix. RM-5.5 instead removed `@/motion`'s public export entirely (see below) — the collision no longer exists, so no alias is needed at all now. |
| `INTERACTIVE_CARD_CLASSES` | `@/components/ui/Card` | B. Experimental. A string-constant escape hatch for the rare non-`Card` surface that needs the same interactive treatment. Intentionally exported (documented in its own source comment) but not a component — flagged so consumers don't mistake it for one. |

### Accidental exports removed in RM-5.5 (category D)

| Removed | Was exported from | Why it's gone |
|---|---|---|
| `@/motion` engine — ~30 symbols: `Fade`, `Slide`, `Scale`, `Collapse`, `Expand`, `Crossfade`, `Stagger`, `Pulse`, `Highlight`, `Activate`, `Progress`, `ConnectorFlow`, `QueueFlow`, `PublishFlow`, `MotionDebugOverlay`, `ControlDockShell`, `DOCK_CLEARANCE_CLASS`, `resolveDuration`, `resolveDelay`, `resolveDistance`, `resolveScaleDelta`, `resolveEase`, `transition`, `stagger`, `sequence`, `repeat`, `flow`, `pulse`, `motionDuration`/`motionDelay`/`motionDistance`/`motionScaleDelta`/`motionEase` (types) | Root (`.`) | RM-4 exported this whole low-level engine because 9 files (`SelectableCard`, `ProgressBar`, `Toast`, `Popover`, `CommandPalette`, `Drawer`, `Menu`, `Tooltip`, `Dialog`) import from it internally. It remains **bundled** (those 9 components still work) but is reclassified **C. Internal transitive** — consumers never needed to call `transition()`/`resolveDuration()` directly, and exporting it was accidental scope creep from "make the build work" rather than a deliberate public surface decision. Removing it also eliminated the `Stagger*` naming collision entirely (see above). |
| `IllustrationDevProvider`, `useIllustrationDev`, `useIllustrationDevControls`, `IllustrationDevState` | `illustrations` | A diagram-authoring debug overlay (toggles for node bounds/anchor points/connector routing/grid/animation paths), explicitly scoped to the documentation playground in its own source comments. Every illustration primitive already calls `useIllustrationDev()` internally with a safe all-off default, so removing the *export* doesn't change primitive behavior — it just stops offering consumers a provider they were never meant to mount. Remains bundled internally (see `packages/design-system/src/illustrations.ts`'s comment). |

Both removals were made via the entry files' own import choices (importing from a narrower subpath instead of a combined barrel) — no canonical app source was touched, and the documentation app's own use of these dev tools (if any) is unaffected.

## Marketing entry (`/marketing`) contract

All 11 compositions, audited directly against source (not assumed):

| Component | Required props | Key optional props | `next` dependency | motion/illustration dependency |
|---|---|---|---|---|
| `HeroComposition` | `title` | `eyebrow`, `subtitle`, `cta`, `illustration`, `metrics`, `trustRow`, `layout="centered"` | No (slots only) | `@/components/motion` (Fade/Slide/Scale/Stagger) |
| `CTAComposition` | `title`, `cta` | `eyebrow`, `description`, `size="md"`, `layout="centered"`, `illustration`, `enterprise=false` | No | `@/components/motion` |
| `FeatureGridComposition` | `items` | `eyebrow`, `title`, `description`, `columns=3` | No | motion + `@/components/illustration` (`StatusIndicator`) |
| `ComparisonComposition` | `title` | `eyebrow`, `description`, `variant="cards"`, `cards`, `matrix` | No | motion + illustration (`AnimatedNode`, `before-after` variant only) |
| `MetricsComposition` | `metrics` | `eyebrow`, `title`, `description`, `columns=3`, `variant="stats"` | No | motion (`AnimatedCounter`) + illustration (`health` variant only) |
| `TimelineComposition` | `items` | `eyebrow`, `title`, `description`, `orientation="vertical"` | No | motion + illustration (`AnimatedNode`/`AnimatedConnector`/`PipelineStep`) |
| `FAQComposition` | `items` | `eyebrow`, `title`, `description`, `categories`, `searchable=false` | No | **Neither** — the only composition with no motion/illustration import |
| `TestimonialComposition` | `testimonials` | `eyebrow`, `title`, `description`, `layout="grid"` | No | motion only |
| `EmptyComposition` | *(none — all optional)* | `icon`, `title="Coming soon"`, `description`, `cta`, `variant="default"` | No | motion + illustration |
| `WorkflowComposition` | `title`, `steps` | `eyebrow`, `description`, `cta` | No | motion + illustration |
| `PlatformComposition` | `title`, `platforms` | `eyebrow`, `description`, `hubLabel="StudioPOD Core"`, `hubIcon`, `defaultActiveId`, `cta` | No | illustration only (no motion import) |

**None of the 11 compositions import `next/link`, `next/navigation`, or `next/image` directly.** Any Next.js dependency comes entirely from what a consumer passes into slot props (`cta`, `illustration`, `icon`) — e.g. passing a root-entry `Button` with an `href` pulls in `next/link` transitively, but that's the consumer's choice, not the composition's.

**Stability: all 11 are classified A. Stable enough for RM-6**, with the following naming inconsistencies noted for awareness (not fixed — redesigning compositions is out of scope for this freeze):
- The "pick one of N layouts" concept has three different prop names across the set: `layout` (Hero, CTA, and confusingly also Testimonial's *prop*, though its *type* is named `TestimonialLayout` matching the `variant`-style types elsewhere), `variant` (Comparison, Metrics, Empty), and `orientation` (Timeline).
- `columns` allows `2|3|4|6` in `FeatureGridComposition` but only `2|3|4` in `MetricsComposition`.
- `HeroMetric`/`MetricItem` are named, exported types for a "value + label" shape; `Testimonial.metric` uses an unexported inline object of the same shape.
- `EmptyComposition.title` (`"Coming soon"`) and `PlatformComposition.hubLabel` (`"StudioPOD Core"`) are the only two props with a hardcoded string default anywhere in the set.

These are real but low-severity inconsistencies. They don't block RM-6 adoption (every prop is fully typed and documented in source) and are recorded here so a future minor version can reconcile the naming without surprising anyone.

## Illustrations entry (`/illustrations`) contract

Sourced from `@/illustrations` (types/layout/utils/primitives subpaths — **not** its combined barrel, to exclude the dev-tools folder), `@/components/illustration`, and the `types`/`utils`/`components` subpaths of `@/workflows`, `@/platforms`, `@/production`, `@/capabilities` (their `examples` subfolders are excluded — canned demo data built on `@/lib/canonical.ts`, not reusable presentation code).

| Family | Classification | Notes |
|---|---|---|
| `@/illustrations` primitives/layout/utils/types | A. Stable | Generic data-driven diagram primitives (`IllustrationNode`, `IllustrationConnection`, `IllustrationGroup`, `IllustrationCanvas`, `IllustrationPipeline`, `StatusBadge`, `HealthIndicator`, `SelectionRing`, layout/geometry functions). Not domain-specific. |
| `@/components/illustration` | A. Stable | `AnimatedNode`, `AnimatedConnector`, `PipelineStep`, `StatusIndicator`, `FlowCard`, `SystemGrid`, `ProgressRail`. |
| `workflows`/`platforms`/`production`/`capabilities` | **B. Experimental** | Same reasoning as root's `operational`/`workflow`: domain-specific diagram-engine libraries, not yet proven with a second consumer. The 5 cross-domain naming collisions found and resolved during RM-4 (below) are themselves evidence this area's naming isn't fully settled yet. |

**Confirmed**: zero symbols from `src/components/platform/**` appear anywhere in this entry (or any entry) — the approved platform decision is intact.

**Named exceptions (category E, resolved)** — the four diagram-engine domains each independently defined a status/compile bridge function under the same bare name:

| Public name | Domain | Bare-name owner |
|---|---|---|
| `toSystemStatus` | workflows | Kept bare (workflows) |
| `productionToSystemStatus` | production | Renamed |
| `capabilityToSystemStatus` | capabilities | Renamed |
| `toNodeStatus` | production | Kept bare (production) |
| `capabilityToNodeStatus` | capabilities | Renamed |
| `compileFlowToWorkflow` | platforms | Kept bare (platforms) |
| `compileCapabilityFlowToWorkflow` | capabilities | Renamed |
| `compileRelationshipToConnection` | platforms | Kept bare (platforms) |
| `compileCapabilityRelationshipToConnection` | capabilities | Renamed |
| `CompileRelationshipOptions` (type) | platforms | Kept bare (platforms) |
| `CompileCapabilityRelationshipOptions` (type) | capabilities | Renamed |

**Removed in RM-5.5** (category D): `IllustrationDevProvider`, `useIllustrationDev`, `useIllustrationDevControls`, `IllustrationDevState` — see root entry section above for the full rationale (applies identically here).

## Tokens entry (`/tokens`) contract

Source: `@/lib/tokens.ts` only — 5 exports, unchanged since RM-4.

| Export | Shape | Role |
|---|---|---|
| `motionDuration` | `{ instant, fast, base, slow, slower }` — numbers (seconds) | Semantic — framer-motion `transition.duration` values |
| `motionEase` | `{ standard, inOut, linear }` — cubic-bezier arrays | Semantic — framer-motion `transition.ease` values |
| `zIndex` | `{ base, raised, sticky, dropdown, overlay, modal, toast, tooltip }` — numbers | Semantic — layering scale |
| `accentRgb` | `"59, 130, 246"` — string | Raw — RGB triple for animating an alpha-channel color framer-motion can't tween as a CSS var |
| `successRgb` | `"34, 197, 94"` — string | Raw — same purpose, success color |

**All 5 are canonical** — this is the single source of truth these values are meant to be read from; there is no separate "raw" vs "semantic" split within this entry itself (that distinction exists between this file and `src/styles/*.css`, which mirror the same values as CSS custom properties for non-framer-motion consumers).

**Naming stability**: treat every key here as a stable public name. **Renaming or removing any of these 5 exports requires a major version**, per the versioning policy below — a consumer destructuring `motionDuration.base` today would silently break if that key moved or disappeared.

**Note on a same-named but different token system**: `@/motion` (the internal engine, not exported — see above) has its *own* `tokens.ts` with keys also named `motionDuration`/`motionEase` but different values and an additional `motionDelay`/`motionDistance`/`motionScaleDelta`. These are two historically-separate token systems that happen to share names; only `@/lib/tokens.ts`'s versions (documented above) are part of the public `/tokens` contract. This is worth knowing if anyone greps the source and finds two files named `tokens.ts`.

**Explicitly deferred**: the App (`paws-bones-studio`) token reconciliation identified in RM-1 (accent-500/600 ramp offset, border solid-vs-translucent treatment, ink-role reassignment) is **not** addressed by this freeze. This entry documents the *design-system's own* canonical values; reconciling them against the App's independently-evolved token system remains a separate, later phase.

## CSS contract (`/styles.css`)

- **Required import**: consumers add `import "@studiopod/design-system/styles.css";` once, in the same place they'd put their own global CSS entry, alongside their own `@import "tailwindcss";`.
- **This package's `styles.css` does not itself import Tailwind.** Consumers must have their own `@import "tailwindcss";` — the package only supplies the `@theme` block and supporting CSS; Tailwind v4 discovers `@theme` transitively through whatever file tree contains `@import "tailwindcss"`, the same way this repo's own app already works.
- **Deterministic ordering**, verified in the compiled output: palette → theme → tokens → typography → utilities (exactly the `@import` order declared in `packages/design-system/src/styles.css`, which esbuild's CSS bundler preserves depth-first).
- **Duplicate import is safe.** CSS custom-property declarations and `@import` are idempotent; importing `styles.css` twice (e.g. from two different sub-packages of a consumer's own dependency tree) costs a few extra KB, not a functional conflict.
- **`sideEffects: ["*.css"]`** is set in `package.json` and confirmed present — this is what tells a consumer's bundler not to tree-shake the CSS import away just because nothing appears to "use" it from a JS import-graph perspective. Verified unchanged in RM-5.5.
- **Browser/global scope**: pure CSS custom properties, a handful of utility classes, and fluid-typography classes — no runtime JS, no `window`/`document` access, safe under SSR.
- **App Tailwind v3 compatibility**: **not solved by this package.** `paws-bones-studio` is on Tailwind v3 with its own `tailwind.config.ts`; RM-1 documented two viable paths (Phase A: arbitrary-value classes or `theme.extend` mirroring while staying on v3; Phase B: full migration to v4). Neither is implemented here — this freeze only concerns the design system's own contract, not the App's adoption path.
- **Future v4 App adoption**: deferred to whichever later phase executes RM-1's Phase B; out of scope for RM-5.5.

## Dependency contract

| Package | Classification | Range | Notes |
|---|---|---|---|
| `react` | peerDependency | `^18.0.0 \|\| ^19.0.0` | Not bundled. **Empirically verified** in RM-5.5 against both React 19.2.4 and React 18.3.1 (typecheck + render, both pass) — not just reasoned from API surface. |
| `react-dom` | peerDependency | `^18.0.0 \|\| ^19.0.0` | Same. |
| `next` | peerDependency | `>=14.0.0` (**open, no upper bound — confirmed as the correct decision in RM-5.5**) | See reasoning below. |
| `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react` | dependency | as declared | Implementation details; consumers don't manage these directly. |
| `framer-motion` | dependency | as declared | Not a context/singleton-sensitive package like React; bundling it as a normal dependency (rather than peer) means consumers get it installed automatically. |

**Why the `next` peer range stays open rather than gaining an upper bound**: the exact APIs this package depends on — `next/link`'s default export, `next/image`'s default export, `next/navigation`'s `useRouter`/`usePathname` hooks — have been stable public Next.js APIs since Next 13 and are unchanged through Next 16 (the newest version in use by either known consumer). There is no known future incompatibility to guard against. Adding an arbitrary upper bound (e.g. `<17.0.0`) would block a future compatible Next version for no real reason, creating avoidable upgrade friction. If a future Next major does change one of these three APIs, that would surface as a real build/typecheck failure in the consumer at the time, and should be handled then with a documented compatibility fix — not preempted now with a guess.

## Portability caveats

1. **`useBodyLock`'s hardcoded `#app-root` assumption.** `src/hooks/useBodyLock.ts` calls `document.getElementById("app-root")` to mark the app root `inert` while a modal is open. It degrades gracefully (optional chaining — no crash) if that element is absent, but a consumer without an element with `id="app-root"` won't get the inert-background behavior. **Known limitation, not fixed here** (fixing it would mean either changing the hook's API — a breaking change — or coordinating a specific element id across every consumer, which is an RM-6 integration concern, not a package-freeze concern). Recommend Web add a `#app-root` wrapper in its own root layout when it adopts this package.
2. **Next.js-specific exports.** `Button`, `NavigationItem`, `Breadcrumbs`, `RelationshipList`, `AssetThumbnail`, and `QueueWidget` use `next/link`, `next/navigation`, or `next/image` directly. This is expected and by design — `next` is a required peer dependency precisely because of these — not a defect.
3. **The two build-scoped shims** (`src/_internal/layout-safe.ts`, `src/_internal/workflows-safe.ts`). These exist purely to keep `GlobalNav`/`Footer` and the workflows `examples` mock data out of the compiled bundle, without editing the canonical app source those two files' real barrels are shared with. They're invisible to consumers and require no action from Web or App. **Future package hardening**: if the canonical app ever adds `"sideEffects": false` to its root `package.json`, or moves `GlobalNav`/`Footer` out of the `layout` barrel, these shims could likely be simplified or removed — not urgent, noted for whoever next touches the build config.
4. **Reliance on canonical source barrels.** This package has zero duplicated source — every entry file compiles directly from the app's own `src/` tree via the existing `@/*` tsconfig path mapping. This means the package build is coupled to the app's internal file organization; moving or renaming a canonical file the entry points or shims reference would require updating this package too. **Internal maintenance consideration**, not a consumer-facing risk.
5. **`"use client"` components.** Most exported interactive/motion/operational/workflow components are Client Components. A handful of purely presentational primitives (`Display`/`Heading`/`Body`/`Caption`/`Metadata`, `Container`/`SectionShell`/most of `layout`) are not marked `"use client"` and can render as Server Components. Consumers using the Next.js App Router should expect most interactive primitives to need a Client Component boundary somewhere above them — standard React Server Components behavior, not a package defect.
6. **SSR compatibility.** Verified via the disposable consumer fixture using `react-dom/server`'s `renderToStaticMarkup` — root, marketing, and illustrations entries all render successfully with no `window`/`document` access at module-evaluation time. Browser-only logic in the motion/illustration primitives is correctly gated behind hooks/`useEffect`, not top-level module code.
7. **React 18 and React 19 compatibility.** Empirically verified in RM-5.5 (not just reasoned) via two independent disposable fixtures — one on React 19.2.4 + Next 16.2.10, one on React 18.3.1 + Next 14.2.18 — both passing typecheck and render checks across all 4 entries. High confidence in the declared peer range.
