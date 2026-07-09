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
    reasoning: [
      "13 real components with the richest accessibility wiring of any family (scope, aria-sort, aria-selected, per-row aria-label) — genuinely safe to build a screen with today.",
      "Composes Layout and ui correctly, never Metadata or Forms.",
      "Zero real-world consumers: none of the 8 duplicate table implementations it exists to replace has been migrated yet, so it is entirely unproven under real usage.",
    ],
    blockers: ["Migrate at least one real hand-rolled table onto it (the ResponsiveRulesTable step is the lowest-risk candidate)."],
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
  "All four built families, plus the catalog that tracks them, land at Production Ready. None reaches Certified — the maturity model's own bar (accessibility pass, responsive verification, and real-screen usage) isn't cleared by any of them, primarily because real-screen usage is at zero across the board. This is stated plainly rather than rounded up: the Foundation Layer is real and well-built, but unproven.";
