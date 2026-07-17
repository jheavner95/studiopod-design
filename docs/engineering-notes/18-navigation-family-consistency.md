# 18. Navigation Component Consistency (DS-5E)

DS-5C consolidated the structural layout family, DS-5D the feedback/status family. DS-5E applies the same lens to navigation: every component that helps a user move through the product — Tabs, Breadcrumbs, Pagination, Stepper, TreeNavigation, SideNavigation, TopNavigation, NavigationRail, ContextNavigation, CommandNavigation, NavigationItem/Group/Section/Divider, plus GlobalNav and WorkspaceNavigation (already covered structurally in DS-5C, re-audited here through a navigation-specific lens) and the overlay Menu/MenuItem mechanism dropdown/context menus depend on. Like DS-5D, this family turned out to already be in strong shape — the real findings were narrower than DS-5A/5B/5C's, and the single largest gap was, again, test coverage.

## Part 1 — Family audit and classification

A full read of all 17 components against a uniform lens (purpose, hierarchy, navigation model, interaction, keyboard behavior, focus handling, accessibility, responsive behavior, composition, public API, documentation, testing) found:

**No separate "Sidebar," "TreeItem," "NavigationLink," or standalone "Dropdown" component exists.** The task's "Sidebar" is `SideNavigation`; "TreeItem" is `TreeNavigation`'s internal row renderer, not a separate exported component; "NavigationLink" doesn't exist anywhere (confirmed via grep) — the closest matches are `NavigationItem` (the shared leaf every composite renders) and `ContextNavigation`'s own `ContextNavigationLink` type; "Dropdown navigation" and "Context menus" are both served by the one overlay `Menu`/`MenuItem` mechanism, not two separate primitives. `SegmentedControl` under `src/components/navigation/` is a confirmed re-export of `ui/SegmentedControl.tsx` (a radiogroup choice input, not a view-switching navigation pattern, per its own doc comment) — not a real navigation primitive, excluded from the rest of this audit.

**Comparison matrix** (condensed — full per-component detail, including every exact prop/keyboard-handler/ARIA quote, is in the audit transcript this note was synthesized from):

| Component | Model | Roving tabindex | Current-item marker | Tests (before) |
|---|---|---|---|---|
| Breadcrumbs | linear/path | delegates to Menu (overflow only) | `aria-current="page"` | ❌ |
| CommandNavigation | trigger only | delegates to CommandPalette | n/a | ❌ |
| ContextNavigation | flat/object-based | no | n/a (no current concept) | ❌ |
| NavigationDivider | n/a | n/a | n/a | ❌ |
| NavigationGroup | grouping wrapper | n/a | n/a | ❌ |
| NavigationItem | leaf | no (native Tab) | `aria-current="page"` | ❌ |
| NavigationRail | flat/list | no | `aria-current` (scrollSpy or `activeId`, DS-5E fix) | ❌ |
| NavigationSection | landmark wrapper | n/a | n/a | ❌ |
| Pagination | linear | no | `aria-current="page"` | ❌ |
| SideNavigation | composition shell | no | pass-through | ❌ |
| Stepper | linear, read-only | n/a (not interactive) | `aria-current="step"` | ❌ |
| Tabs | flat/widget | **yes** | `aria-selected` | ❌ |
| TopNavigation | flat/list | no | `aria-current="page"` | ❌ |
| TreeNavigation | hierarchical/widget | **yes** | `aria-selected` | ❌ |
| GlobalNav (doc-site chrome, not a package primitive) | routing-aware | no | `aria-current` (two independent implementations — desktop/mobile) | ❌ |
| WorkspaceNavigation (layout region) | n/a — pure region | n/a | pass-through | partial (layout concerns only) |
| Menu/MenuItem (overlay) | flat/widget | **yes** | n/a (action list, no current concept) | ❌ |

**Classification of every inconsistency found:**

1. **Roving tabindex present on `Tabs`/`TreeNavigation`/`Menu`, absent on `SideNavigation`/`TopNavigation`/`NavigationRail`/`ContextNavigation` — Classification 1 (intentional), not drift.** The three with it are ARIA *widget* patterns (`tablist`, `tree`, `menu`) that own their own arrow-key navigation per the WAI-ARIA Authoring Practices. The four without it are ARIA *landmark* patterns — plain `<nav>` link lists, where a normal Tab-stop-per-link is the spec-correct behavior, not a gap. Documented explicitly (in both this note and the docs site) so a future pass doesn't "fix" the landmark group into having roving tabindex incorrectly.
2. **`NavigationRail` in non-scrollSpy mode never marked any item active — Classification 2 (historical drift), fixed.** The component had no way to know which destination the caller was already on in plain `href` mode (it only tracked `activeId` via its own scroll-spy observer). See Part 3/4.
3. **`TopNavigationItemDef`/`NavigationRailItemDef` didn't expose `icon`/`badge` despite `NavigationItem` — the primitive both compose directly — already supporting both — Classification 2 (historical drift), fixed.** See Part 4.
4. **`GlobalNav`'s desktop nav row hand-rolls its own `<Link>` + `aria-current` instead of reusing `NavigationItem`, while its mobile drawer correctly does use `NavigationItem` — Classification 2 (historical drift), documented, not fixed.** `GlobalNav` is the doc site's own concrete header chrome (confirmed excluded from the public package, same treatment as `Footer.tsx`), and its own doc comment claims `TopNavigation` "generalizes the exact shape already proven" by it — a claim this audit found is only half true within `GlobalNav`'s own single file. Left unfixed: this is live doc-site chrome, not a package primitive, and refactoring its desktop row carries real regression risk for the actual deployed site for a benefit (internal consistency, not an external behavior change) that isn't required by any Part of this phase. Flagged clearly rather than silently accepted, matching the precedent DS-5C set for `ContentColumns` and DS-5D for `UnsavedChangesBanner`.
5. **`NavigationDivider` had zero documentation anywhere in the docs site — Classification 4 (documentation inconsistency), fixed.** Exported publicly (both `navigation/index.ts` and the package index) but absent from the gallery, every `_data/*.ts` file, and `page.tsx`. See Part 5.
6. **`disabled` missing from `TreeNode`** — Classification 5 (future work, not fixed). Real gap, but closing it means deciding real interaction behavior (should arrow-key traversal skip a disabled node? should Enter no-op?), which is more than a additive prop — out of this phase's "normalize only genuine inconsistencies" scope.
7. **Three independent 2-value `"horizontal"|"vertical"` orientation unions** (`NavigationDividerOrientation`, `NavigationRail`'s inline union, `Stepper`'s inline union) — Classification 1 (intentional-enough to leave alone). Considered consolidating into one shared type and rejected: three declarations of a trivial two-value union isn't real cognitive load, and forcing a shared type across three components whose actual concepts differ (a divider's axis, a rail's layout direction, a stepper's reading direction) would be exactly the "universal abstraction for a coincidental resemblance" prior phases (DS-5A, DS-5C) already warned against building.
8. **All 17 components had zero test coverage** (one partial exception: `WorkspaceNavigation`, tested for its layout concerns in DS-5C's `Workspace.test.tsx`, but nothing navigation-specific to test since it owns no navigation logic itself) — Classification 5 (future work), now closed for 14 of them. See Part 6.

**No Classification 3 (duplicate implementation) survived the audit.** Every pair that looked like it could be doing the same job — `TopNavigation` vs. `GlobalNav`, `SideNavigation` vs. `NavigationRail`, `Breadcrumbs` vs. `ContextNavigation`, `Tabs` vs. `SegmentedControl` — was confirmed to have a real, code-verified difference, not a naming-only one.

## Part 2 — Navigation philosophy

**Global vs. local**: `TopNavigation`/`GlobalNav`/`SideNavigation` are global — always visible, move between an app's top-level destinations. `Breadcrumbs`, `ContextNavigation`, `Tabs`, `NavigationRail` (non-scrollSpy) are local — scoped to the current page or object.

**Persistent vs. contextual**: `TopNavigation`/`SideNavigation`/`GlobalNav` are persistent — present regardless of what the user is looking at. `ContextNavigation` is the one deliberately contextual component — its entire job is showing "the current object plus its related destinations," and it disappears/changes as the object changes. `Breadcrumbs` sits in between: persistent in the sense that every page has one, contextual in that its content is entirely page-specific.

**Page vs. workspace navigation**: `GlobalNav` operates at the page/site level — one instance for the whole doc site, routing-aware via `usePathname()`. `WorkspaceNavigation` (the layout-family region) operates at the workspace level — a `Tier 4` peer region inside one `Workspace` instance, with no navigation logic of its own; it's a pure layout slot that expects the caller to place a `SideNavigation` (or equivalent) inside it. The same underlying components (`NavigationItem`, `NavigationSection`) can serve either role; what differs is the *scope* they're mounted at, not their own implementation.

**Hierarchical vs. linear**: `TreeNavigation` is the family's one genuinely hierarchical model (unbounded nesting depth, `role="tree"`). `Breadcrumbs`, `Pagination`, and `Stepper` are linear/sequential (a path, a page number, a step index). Everything else — `Tabs`, `SideNavigation`'s items, `TopNavigation`'s items, `NavigationRail`'s items — is flat: a list of peers with no ordering relationship beyond visual order. `NavigationItem`'s own `level` prop provides indentation for grouped/tree contexts without making the base primitive itself hierarchical.

**Primary vs. secondary**: `TopNavigation`/`SideNavigation`/`GlobalNav` are primary. `ContextNavigation`, `NavigationRail`, `Breadcrumbs` are secondary/contextual wayfinding that supplements, never replaces, the primary nav.

**Ownership boundaries** (the composition graph, in full):

```
NavigationItem — the atomic leaf every composite in this family ultimately renders
 ├─ used directly by: ContextNavigation, TopNavigation, NavigationRail, GlobalNav's mobile drawer
 └─ used indirectly (via caller's own children) by: SideNavigation, NavigationGroup, NavigationSection

NavigationSection (nav landmark) → wraps NavigationGroup(s) and/or raw NavigationItem(s)
NavigationGroup (labeled cluster) → wraps NavigationItem(s)
NavigationCollapsedContext (defined in NavigationItem.tsx) → provided by SideNavigation/NavigationRail, consumed by NavigationItem/NavigationGroup

SideNavigation — pure composition shell, expects NavigationSection/Group/Item as children
Breadcrumbs — composes Menu/MenuItem (overlay) for overflow; its own Link/span for visible crumbs
CommandNavigation — a trigger only; all logic lives in CommandPalette (overlay)
TreeNavigation, Tabs family, Stepper, Pagination, NavigationDivider — standalone leaves, no composition with siblings

WorkspaceNavigation (layout) — pure region; renders whatever nav the caller places inside (typically SideNavigation)
GlobalNav (doc-site chrome, not a package primitive) — composes NavigationItem + NavigationSection (mobile only);
  its own desktop row bypasses NavigationItem (Classification 2 finding above)
```

`NavigationItem` is the one place `active`/`aria-current`/collapsed/tooltip/badge logic actually lives — every consolidation decision in Part 4 flows from that: a composite that doesn't expose a field `NavigationItem` already supports is drift, not a deliberate omission, unless a real doc comment says otherwise.

## Part 3 — Accessibility review

The family was already in strong accessibility shape going in — unlike DS-5D's `StatusIndicator` (zero ARIA of any kind), **no navigation component was found marking "current" with a className swap and no matching ARIA state.** Every visual active/selected/expanded indicator in the family is paired with a real attribute (`aria-current`, `aria-selected`, `aria-expanded`).

The one functional gap found, and the one improvement implemented (per the phase's "clear, family-local improvements" allowance): **`NavigationRail` in non-scrollSpy (plain `href`) mode had no mechanism to mark any item as current at all** — a real, confirmed consequence of the API gap in Part 1 finding #2, not a separate accessibility-only bug. Fixed together with the API fix in Part 4 (a single `activeId` prop closes both).

Also found, documented, not fixed (each individually too small or too risky to justify a second change under the "one clear, family-local improvement" discipline, and neither blocks the family from "behaving as one coherent system"):
- `NavigationSection`'s landmark is unnamed if a caller passes neither `title` nor `aria-label` — already flagged by the component's own doc comment; making either required would be a breaking API change, not attempted here.
- `GlobalNav`'s two `<nav aria-label="Design system sections">` landmarks (desktop + mobile drawer) share the same accessible name — harmless since they never render simultaneously, but worth a note for whoever next touches that file.

## Part 4 — API consistency

Reviewed `items`, `children`, `href`, `selected`, `active`, `expanded`, `disabled`, `icon`, `badge`, `onSelect`, `orientation`, `variant`, `size` across all 17 components. Two genuine, low-risk gaps were found and closed — both purely additive, no existing behavior changed:

- **`NavigationRail` gained an optional `activeId` prop** — closes Part 1/3's finding directly. Ignored when `scrollSpy` is true (the observer still owns `activeId` in that mode); when omitted, behavior is byte-identical to before (no item ever marked active), so every existing call site is unaffected.
- **`TopNavigationItemDef` gained optional `icon`/`badge` fields; `NavigationRailItemDef` gained an optional `badge` field** (it already had `icon`) — both are piped straight through to the underlying `NavigationItem`, which already supported both. This was confirmed drift, not a deliberate omission: no doc comment anywhere explained why a composite backed entirely by `NavigationItem` would silently drop two of its props.

**Not changed, and why**: the three independent `orientation` unions (Part 1 finding #7) — consolidating them would be a cosmetic-only rename across unrelated concepts. `TreeNode`'s missing `disabled` field (Part 1 finding #6) — closing it changes real interaction behavior, not just a type shape, out of scope for "normalize only genuine inconsistencies." No `variant`/`size` axis was added anywhere — `Pagination`'s `variant` and `Stepper`'s `numbered` boolean are each scoped to genuinely different concerns (page-navigation strategy vs. a display toggle), not a family-wide axis this pass found evidence for.

## Part 5 — Documentation

- Added a `NavigationDivider` demo to `foundation-navigation`'s interactive gallery (`NavigationGallery.tsx`) and to `_data/anatomy.ts` — the one component in the family with zero prior documentation, despite being publicly exported.
- Added two accessibility topics to `_data/accessibility.ts`: the roving-tabindex-widget-vs-landmark-list distinction (Part 1 finding #1), written explicitly so a future reader doesn't "fix" the landmark group incorrectly; and the `NavigationRail` `activeId` fix itself.
- **No stale documentation found requiring removal.** `foundation-navigation`'s existing `page.tsx`, `_data/{states,responsive,implementation-guidance,promotion-candidates,future-extensions}.ts` were reviewed against current source and found accurate — including an already-correct, already-detailed "When to use" section distinguishing `Tabs` vs. `SegmentedControl`, `Breadcrumbs` vs. `ContextNavigation`, `SideNavigation` vs. `NavigationRail`, and when `TreeNavigation` is (and isn't) the right reach. This family's documentation was already unusually mature going into this phase.
- Live-verified in the browser: the `foundation-navigation` docs page loads with no console errors; the new `NavigationDivider` demo and both new accessibility topics render correctly.

## Part 6 — Testing

Added test files for 14 of the 17 audited components: `Breadcrumbs`, `CommandNavigation`, `ContextNavigation`, `NavigationDivider`, `NavigationGroup`, `NavigationItem`, `NavigationRail`, `NavigationSection`, `Pagination`, `SideNavigation`, `Stepper`, `Tabs`, `TopNavigation`, `TreeNavigation`. Not tested this phase: `GlobalNav` (doc-site chrome, not a package primitive, harder to test in isolation given its `usePathname()`/registry coupling), `WorkspaceNavigation` (already has layout-concern coverage from DS-5C; nothing navigation-specific to test since it owns no navigation logic), and `Menu`/`MenuItem` (overlay-family primitives, out of this phase's own family scope even though audited for context).

Every file follows the established `rendering`/`state coverage`/`accessibility` convention; `Tabs` and `TreeNavigation` additionally required a full `interaction` block given their real roving-tabindex/arrow-key logic. 97 new tests. Full suite: **443 tests across 61 files, all passing** (up from 346/47 before this phase).

Two real jsdom/`act()` interactions surfaced and were fixed correctly, both matching a pattern DS-5D already established rather than being novel:
- Raw `.click()`/`dispatchEvent()` calls didn't reliably flush React's subsequent re-render for handlers that trigger a state update deeper in a component tree (`CommandNavigation`'s portal-rendered `CommandPalette`, `TreeNavigation`'s expand/select state) — `fireEvent.click()`/`fireEvent.keyDown()` (both `act()`-wrapped) fixed it, same root cause as DS-5D's `Toast` test fix.
- `Breadcrumbs` needed a `vi.mock("next/navigation")` stub for `useRouter()` — the first navigation-family component requiring a router mock; no existing precedent in the test suite, so this establishes one for future router-dependent component tests.

Not inflated: `NavigationDivider`/`NavigationGroup`/`NavigationSection` — the family's smallest, least logic-bearing components — each get a proportionately small test file (3–4 tests), not padded to match a heavier sibling's count.

## Part 7 — Certification review

`CERTIFICATION_REGISTRY` (`src/lib/certification.ts`) is **unchanged** — still exactly Button (`Certified`), Workspace (`Production Ready`), SplitView (`Production Ready`). No navigation-family component was added or certified.

**Recommendations only, not acted on**: `Tabs` and `TreeNavigation` are the strongest candidates — real ARIA widget patterns, full keyboard interaction, now-complete test coverage including their interaction logic, and no outstanding findings from this audit. `Breadcrumbs`, `NavigationItem`, and `Pagination` are close behind — each is heavily reused elsewhere in the codebase (`Pagination` alone is wrapped by two separate operational components) and now has real coverage. `NavigationRail`, `TopNavigation`, `SideNavigation`, `ContextNavigation` are reasonable next-tier candidates once their now-closed API gaps have had a release cycle to prove out. `NavigationDivider`/`NavigationGroup`/`NavigationSection` should **not** be treated as independent candidates — each is a thin structural companion to `NavigationItem`/`SideNavigation`, not a standalone unit worth certifying on its own. `GlobalNav` cannot be a candidate at all under this framework — it isn't a public package primitive.

## Part 8 — Validation

- `npx tsc --noEmit` — clean.
- `npx eslint` — clean.
- `npx vitest run` — 443/443 passing across 61 files.
- `npm run verify:full` — all 7 steps pass; API baseline unchanged (the two Part 4 API additions are field/prop additions on already-exported types, not new export names, so they correctly don't appear in the export-surface diff).
- `npm run certification:report` — unchanged (Button/Workspace/SplitView, same levels).
- `npm run token:report` — unchanged (same pre-existing, pre-DS-5E findings only).
- `npm run package:build` + package verify — clean.
- Live browser verification: `foundation-navigation` docs page loads with no console errors; confirmed the new `NavigationDivider` demo card and both new accessibility topics render with the exact text authored.

## What this phase deliberately did not do

Per its own closing constraints: navigation was not redesigned, no application page was migrated, the package was not published, no additional component was certified, and Data Display components were not started. `Button`, `Workspace`, and `SplitView` were not touched. `GlobalNav`'s internal desktop/mobile inconsistency (Part 1 finding #4) was documented but deliberately left unfixed — real doc-site chrome with regression risk, for a benefit this phase didn't require. `TreeNode`'s missing `disabled` field and the three independent `orientation` unions were found and explicitly not consolidated, for the reasons given in Parts 1 and 4.
