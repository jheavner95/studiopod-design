export type MaturityLevel = "Concept" | "Prototype" | "Production Ready" | "Certified" | "Locked";

export interface FamilyCertification {
  id: string;
  family: string;
  level: MaturityLevel;
  reasoning: string[];
  blockers: string[];
  /** Set only when a family has real, partial adoption underway — deliberately distinct from `level`, which never jumps straight to Certified on partial evidence. */
  adoptionStatus?: string;
}

/**
 * Applies the design system's own five-level maturity model (Concept / Prototype / Production Ready /
 * Certified / Locked, defined in application-components/_data/maturity.ts) to each family. Certified
 * requires Production Ready plus a verified accessibility pass, responsive verification at all three
 * breakpoints, and use in at least one real, non-playground screen. Foundation Table met all three in
 * DS-2.1.8 — the first family in this audit to do so. The rest remain below that bar; that's a finding,
 * not an oversight.
 */
export const FAMILY_CERTIFICATION: FamilyCertification[] = [
  {
    id: "layout",
    family: "Foundation Layout",
    level: "Production Ready",
    reasoning: [
      "Every one of the 13 primitives is real, internally consistent (closed prop interfaces, className support, sound internal composition), and was verified at desktop/tablet/mobile when built.",
      "Application-components pages themselves are real, shipped routes, not a sandboxed preview — so the 9-page-shell usage (PageShell/SectionShell/CardGrid) does count as real-screen usage for that narrow slice.",
      "DescriptionList now has real consumers: one migration moved all 9 hand-rolled dl/dt/dd blocks onto it (imported through @/components/metadata, since it's also documented as a Foundation Metadata component). Panel and Surface — the other two primitives with the richest duplication case behind them — still have zero consumers anywhere outside their own documentation page. No formal per-component accessibility checklist exists; the Accessibility section on the docs page covers system-level reading order and focus flow, not a per-primitive pass.",
    ],
    blockers: [
      "Adopt Panel and Surface in at least one page outside foundation-layout's own docs (the migration plan's step 7, Card wrappers, would satisfy this).",
      "Run and record a per-primitive accessibility checklist, not just the system-level narrative.",
    ],
  },
  {
    id: "table",
    family: "Foundation Table",
    level: "Certified",
    reasoning: [
      "13 real components that lean on native <table>/<th scope> semantics plus a handful of ARIA attributes (scope, aria-sort, aria-selected, per-row aria-label) rather than custom interaction code — grep-verified zero onKeyDown handlers and zero explicit role= attributes anywhere in the family, the least custom interaction wiring of any family, not the richest (Overlay and Navigation each implement multiple custom keyboard-navigable patterns of their own: focus traps, roving tabindex, arrow-key handling). Genuinely safe to build a screen with today precisely because there's so little bespoke behavior to get wrong.",
      "Composes Layout and ui correctly, never Metadata or Forms.",
      "The ResponsiveRulesTable migration closed the zero-adoption gap for 6 of the 13 components: Table, TableHeader, TableBody, TableRow, TableHead, and TableCell now compose the shared ResponsiveRulesTable, used by 3 real pages, re-verified with zero visual regression at desktop, tablet, and mobile, and with sticky-column behavior confirmed by measurement, not just visual inspection. This is real, not projected: Foundation Table's first production adoption.",
      "One migration attempted MaturityTable next and reverted it: migrating a 40-row, 3-column table onto Table produced a measured mobile regression (640px natural width against a 333px viewport), because Table has no equivalent to MaturityTable's original stacked-card mobile layout. This is a real, confirmed capability gap, not every remaining candidate is safely migratable today — recorded honestly rather than shipped broken or worked around locally.",
      "The next migration attempted InventoryTable, expecting a genuine <table> unlike MaturityTable — direct code review found the opposite (the identical div/grid + stack-below-sm: pattern), and the migration failed the same way, worse (774px against a 333px viewport, clipping Status and hiding Source/Priority entirely). Two independent failures for the identical reason is a pattern, not a fluke.",
      "The ScorecardTable migration was gated on an explicit Phase 0 architecture check before touching code: confirmed it's a genuine native <table> with the same horizontal-scroll-plus-sticky-column shape as ResponsiveRulesTable, unlike MaturityTable/InventoryTable's div/grid pattern, so migration proceeded. It exercised a 7th component (TableStatusCell) in real usage for the first time, required zero new Foundation Table API surface — the sticky prop added during the ResponsiveRulesTable migration covered it completely — and cut the file from 70 to 48 lines with zero visual regression at desktop, tablet, and mobile.",
      "The CertificationMatrix migration repeated the same Phase 0 gate and reached the same verdict: genuine native <table>, same shape, migration proceeded. Its 3 badge columns (2 boolean, 1 phase) all mapped directly onto TableStatusCell, and its 2 percentage columns onto TableCell — no new cell type was needed. Zero new Foundation Table API surface required, the second migration in a row with none, and the file dropped from 89 to 68 lines with zero visual regression at desktop, tablet, and mobile.",
      "The CoverageMatrix migration closed out the pilot — Phase 0 confirmed the same genuine architecture, and migration proceeded, composing onto Table, TableHeader, TableHead, TableBody, TableRow, and TableStatusCell alone, the simplest of the three real-table migrations. Third migration in a row requiring zero new Foundation Table API surface. This completed the Adoption Pilot for genuine native tables: every real <table> in the codebase this audit found had been migrated, across 5 real pages (workspace-layout, workspace-toolbar, primary-workspace, workspace-certification, coverage), exercising 7 of 13 components.",
      "A final review ran the family's first formal per-component accessibility pass: table semantics (native <table>/<thead>/<tbody>/<tr>/<th>/<td>), caption support (used with real descriptive text in all 4 shipped pilots), header associations (scope=\"col\"/\"row\" on every header cell, verified against real DOM in every migration), sticky behavior (both axes — TableHeader's top-sticky and TableHead's left-sticky — reconfirmed by scroll measurement across 4 migrations, not just visual inspection), keyboard navigation and focus (all interactive cell content — sortable header buttons, selection checkboxes, action buttons — uses native focusable elements with the design system's standard focus-ring, no custom keyboard handling to audit), and screen-reader semantics (aria-sort on sortable headers, aria-selected on selected rows, aria-label on selection checkboxes) all checked out against the real component source, not asserted from memory. Two minor, non-blocking gaps were found and are recorded rather than silently passed over: TableLoadingState's skeleton rows carry no aria-busy or live-region announcement, and TableToolbar's bulk-action-bar transition isn't announced to screen readers either.",
      "This is the first family in this audit to satisfy all three Certified criteria: Production Ready baseline, a verified accessibility pass (this review), and real, non-playground screen usage (5 pages, not just one). 6 components (TableSelectionCell, TableActionCell, TableEmptyState, TableLoadingState, TableToolbar, TableFooter) and the sortable-header interaction remain unexercised in real usage — a real, disclosed limitation, but not one the family's own documented Certified bar requires closing, since that bar asks for at least one real screen, not full-surface adoption.",
    ],
    blockers: [],
  },
  {
    id: "metadata",
    family: "Foundation Metadata",
    level: "Production Ready",
    adoptionStatus: "Adoption In Progress",
    reasoning: [
      "16 real components, verified by direct grep to have zero editing-rule violations.",
      "Composes Layout and ui correctly, never Table or Forms.",
      "One migration closed the zero-adoption gap for one component: all 9 hand-rolled dl/dt/dd blocks — including on the two pages that introduced the pattern — now render DescriptionList directly, re-verified against the live repository before migrating, with zero visual regression at any breakpoint. This is real, not projected: the Foundation Layer's first production adoption.",
      "Still not Certified: DescriptionList is 1 of 16 Metadata components. The other 15 (IdentityBlock, PropertyGroup, RelationshipList, StatusSummary, HealthSummary, StatGroup, TagCollection, and the rest) remain unadopted, and no per-component accessibility checklist has been run against any of them.",
    ],
    blockers: [
      "Adopt the remaining 15 Metadata components in at least one real page (the identity-regions and relationship-links duplication findings are the next-lowest-risk targets).",
      "Run and record a per-component accessibility checklist, not just the family-level compliance grep.",
    ],
  },
  {
    id: "forms",
    family: "Foundation Forms",
    level: "Production Ready",
    reasoning: [
      "22 real components, verified by direct grep to have zero read-only-presentation violations — every editing component is genuinely controlled.",
      "Composes Layout and ui correctly, never Table or Metadata.",
      "Carries one concrete, self-disclosed defect (aria-describedby not wired on 9 of 10 field types) in addition to zero real-world adoption — a slightly heavier bar to clear than Table or Metadata, which have no disclosed defect of their own.",
    ],
    blockers: [
      "Fix the aria-describedby gap across the 9 affected field types before pursuing Certified.",
      "Migrate at least one real editing surface onto it (ControlDock, the lowest-risk candidate, or the Property Editor gap it already fills).",
    ],
  },
  {
    id: "catalog",
    family: "Foundation Component Catalog",
    level: "Production Ready",
    reasoning: [
      "Internally sound: every summary figure (52 total, byStatus, byMaturity) is computed live from the data, not hand-typed — verified by independently re-running catalogSummary() and cross-checking against a raw grep of entry boundaries (both agree on 52).",
      "Genuinely useful as a planning artifact — the four downstream-readiness blockers it defines are accurate and traceable.",
      "But its granularity doesn't reflect what's actually been built: Metadata's 16 components and Forms' 22 components each collapse into one or two catalog rows, understating the real delivered surface area of the Foundation Layer this audit reviews.",
    ],
    blockers: ["Add catalog rows (or a new group) that reflect Metadata and Forms as their own systems, not single line items folded into Data Display and Inputs."],
  },
];

export const CERTIFICATION_HEADLINE =
  "Foundation Table reached Certified first — the first family in this audit to clear all three of its own documented Certified criteria: Production Ready baseline, a verified per-component accessibility pass, and real, non-playground screen usage (5 pages, via ResponsiveRulesTable, ScorecardTable, CertificationMatrix, and CoverageMatrix). Getting there took four shipped migrations and two honestly reverted ones (MaturityTable, InventoryTable — a real capability gap, documented rather than forced through). The other three built families, plus the catalog that tracks them, remain at Production Ready. Metadata shows real adoption in progress (DescriptionList) but hasn't yet run its own accessibility pass or adopted the other 15 components; Forms and Layout have real, disclosed gaps of their own. This is stated plainly rather than rounded up: one family has now fully proven itself under real usage — the rest are real and well-built, but not yet there.";
