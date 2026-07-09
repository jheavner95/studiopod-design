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
 * breakpoints, and use in at least one real, non-playground screen. No family below meets all three,
 * so none is rated Certified — that's a finding, not an oversight.
 */
export const FAMILY_CERTIFICATION: FamilyCertification[] = [
  {
    id: "layout",
    family: "Foundation Layout",
    level: "Production Ready",
    reasoning: [
      "Every one of the 13 primitives is real, internally consistent (closed prop interfaces, className support, sound internal composition), and was verified at desktop/tablet/mobile when built.",
      "Application-components pages themselves are real, shipped routes, not a sandboxed preview — so the 9-page-shell usage (PageShell/SectionShell/CardGrid) does count as real-screen usage for that narrow slice.",
      "DescriptionList now has real consumers: DS-2.1.7.1 migrated all 9 hand-rolled dl/dt/dd blocks onto it (imported through @/components/metadata, since it's also documented as a Foundation Metadata component). Panel and Surface — the other two primitives with the richest duplication case behind them — still have zero consumers anywhere outside their own documentation page. No formal per-component accessibility checklist exists; the Accessibility section on the docs page covers system-level reading order and focus flow, not a per-primitive pass.",
    ],
    blockers: [
      "Adopt Panel and Surface in at least one page outside foundation-layout's own docs (the migration plan's step 7, Card wrappers, would satisfy this).",
      "Run and record a per-primitive accessibility checklist, not just the system-level narrative.",
    ],
  },
  {
    id: "table",
    family: "Foundation Table",
    level: "Production Ready",
    adoptionStatus: "Adoption In Progress",
    reasoning: [
      "13 real components with the richest accessibility wiring of any family (scope, aria-sort, aria-selected, per-row aria-label) — genuinely safe to build a screen with today.",
      "Composes Layout and ui correctly, never Metadata or Forms.",
      "DS-2.1.7.2 closed the zero-adoption gap for 6 of the 13 components: Table, TableHeader, TableBody, TableRow, TableHead, and TableCell now compose the shared ResponsiveRulesTable, used by 3 real pages, re-verified with zero visual regression at desktop, tablet, and mobile, and with sticky-column behavior confirmed by measurement, not just visual inspection. This is real, not projected: Foundation Table's first production adoption.",
      "DS-2.1.7.3 attempted MaturityTable next and reverted it: migrating a 40-row, 3-column table onto Table produced a measured mobile regression (640px natural width against a 333px viewport), because Table has no equivalent to MaturityTable's original stacked-card mobile layout. This is a real, confirmed capability gap, not every remaining candidate is safely migratable today — recorded honestly rather than shipped broken or worked around locally.",
      "DS-2.1.7.4 attempted InventoryTable next, expecting a genuine <table> unlike MaturityTable — direct code review found the opposite (the identical div/grid + stack-below-sm: pattern), and the migration failed the same way, worse (774px against a 333px viewport, clipping Status and hiding Source/Priority entirely). Two independent failures for the identical reason is a pattern, not a fluke — Foundation Table's next real capability investment is now well-evidenced, not speculative.",
      "DS-2.1.7.5 gated the ScorecardTable migration on an explicit Phase 0 architecture check before touching code: confirmed it's a genuine native <table> with the same horizontal-scroll-plus-sticky-column shape as ResponsiveRulesTable, unlike MaturityTable/InventoryTable's div/grid pattern, so migration proceeded. It exercised a 7th component (TableStatusCell) in real usage for the first time, required zero new Foundation Table API surface — the sticky prop added in DS-2.1.7.2 covered it completely, evidence that extension is reusable infrastructure, not a one-off fix — and cut the file from 70 to 48 lines with zero visual regression at desktop, tablet, and mobile.",
      "DS-2.1.7.6 repeated the same Phase 0 gate on CertificationMatrix and reached the same verdict: genuine native <table>, same shape, migration proceeded. Its 3 badge columns (2 boolean, 1 phase) all mapped directly onto TableStatusCell, and its 2 percentage columns onto TableCell — no new cell type was needed despite this being the most cell-type-diverse candidate migrated so far. Zero new Foundation Table API surface required, the second migration in a row with none, and the file dropped from 89 to 68 lines with zero visual regression at desktop, tablet, and mobile.",
      "DS-2.1.7.7 closed out the pilot with CoverageMatrix — Phase 0 confirmed the same genuine architecture, and migration proceeded. Every data cell in it is a status Badge, so it composed onto Table, TableHeader, TableHead, TableBody, TableRow, and TableStatusCell alone — the simplest of the three real-table migrations, needing no TableCell at all. Third migration in a row requiring zero new Foundation Table API surface. This completes the Adoption Pilot for genuine native tables: every real <table> in the codebase this audit found has now been migrated, across 5 real pages.",
      "Still not Certified: 6 components (TableSelectionCell, TableActionCell, TableEmptyState, TableLoadingState, TableToolbar, TableFooter) and the sortable-header interaction remain unexercised in real usage, and no per-component accessibility checklist has been run. With every genuine-table candidate now migrated, exercising selection and action cells in real usage is structurally blocked until either a new real screen needs them or Table gains the responsive row-collapse capability MaturityTable and InventoryTable are waiting on — not simply unattempted anymore.",
    ],
    blockers: [
      "Add a responsive row-collapse capability to Table before attempting MaturityTable or InventoryTable again (see Foundation Table's Future Extensions) — do not local-workaround it. This is now the only path to a 6th real-page adoption for Table.",
      "Run and record a per-component accessibility checklist, not just the family-level compliance grep.",
      "TableSelectionCell and TableActionCell remain unexercised in real usage — no genuine candidate for either currently exists in this codebase; revisit if a future workspace page needs bulk selection or row actions.",
    ],
  },
  {
    id: "metadata",
    family: "Foundation Metadata",
    level: "Production Ready",
    adoptionStatus: "Adoption In Progress",
    reasoning: [
      "16 real components, verified by direct grep to have zero editing-rule violations.",
      "Composes Layout and ui correctly, never Table or Forms.",
      "DS-2.1.7.1 closed the zero-adoption gap for one component: all 9 hand-rolled dl/dt/dd blocks — including on the two pages that introduced the pattern — now render DescriptionList directly, re-verified against the live repository before migrating, with zero visual regression at any breakpoint. This is real, not projected: the Foundation Layer's first production adoption.",
      "Still not Certified: DescriptionList is 1 of 16 Metadata components. The other 15 (IdentityBlock, PropertyGroup, RelationshipList, StatusSummary, HealthSummary, StatGroup, TagCollection, and the rest) remain unadopted, and no per-component accessibility checklist has been run against any of them.",
    ],
    blockers: [
      "Adopt the remaining 15 Metadata components in at least one real page (the identity-regions and relationship-links promotion candidates are the next-lowest-risk targets).",
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
      "Genuinely useful as a planning artifact — the four DS-2.x readiness blockers it defines are accurate and traceable.",
      "But its granularity doesn't reflect what's actually been built: Metadata's 16 components and Forms' 22 components each collapse into one or two catalog rows, understating the real delivered surface area of the Foundation Layer this audit reviews.",
    ],
    blockers: ["Add catalog rows (or a new group) that reflect Metadata and Forms as their own systems, not single line items folded into Data Display and Inputs."],
  },
];

export const CERTIFICATION_HEADLINE =
  "All four built families, plus the catalog that tracks them, land at Production Ready. Two — Metadata and Table — now show real, verified adoption in progress (DescriptionList in DS-2.1.7.1; ResponsiveRulesTable, ScorecardTable, and CertificationMatrix in DS-2.1.7.2/7.5/7.6, and CoverageMatrix in DS-2.1.7.7, plus two honestly reverted attempts, MaturityTable and InventoryTable, that found and documented a real capability gap instead of shipping a regression), each closing specific real-screen-usage gaps. DS-2.1.7.7 completes the Table Adoption Pilot for genuine native tables — every real <table> this audit found has now been migrated. Neither family reaches Certified: each pilot exercised only a slice of its family's full component surface, and no family has a recorded per-component accessibility checklist yet. This is stated plainly rather than rounded up: the Foundation Layer is real, well-built, and — for two families — starting to prove itself under real usage, but not yet fully proven.";
