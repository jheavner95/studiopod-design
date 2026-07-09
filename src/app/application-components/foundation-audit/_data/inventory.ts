export type MaturityLevel = "Concept" | "Prototype" | "Production Ready" | "Certified" | "Locked";
export type InventoryStatus = "Exists" | "Partial" | "Needed";

export interface FamilyInventoryRow {
  id: string;
  family: string;
  packageCode: string;
  fileCount: number;
  primitiveCount: number;
  status: InventoryStatus;
  maturity: MaturityLevel;
  note: string;
}

/**
 * The four built Foundation Layer packages plus the catalog that's meant to track all of them.
 * File counts are real directory listings, not estimates.
 */
export const FOUNDATION_LAYER_INVENTORY: FamilyInventoryRow[] = [
  {
    id: "layout",
    family: "Foundation Layout",
    packageCode: "DS-2.1.2",
    fileCount: 16,
    primitiveCount: 9,
    status: "Exists",
    maturity: "Production Ready",
    note: "16 files in src/components/layout/, including GlobalNav and SectionPlaceholder — app-shell components, not layout primitives. The foundation-layout docs page documents 9 as \"primitives\" (Stack, Inline, Grid, Cluster, Surface, Panel, Scroll Area, Separator, Description List). Container, PageShell, SectionShell, ContentColumns, and CardGrid exist and are used everywhere but aren't catalogued as primitives on that page.",
  },
  {
    id: "table",
    family: "Foundation Table",
    packageCode: "DS-2.1.3",
    fileCount: 13,
    primitiveCount: 13,
    status: "Exists",
    maturity: "Certified",
    note: "13 components — the richest accessibility wiring of any family (scope on th, aria-sort, aria-selected, per-checkbox aria-label). Certified in DS-2.1.8 after four real migrations (ResponsiveRulesTable, ScorecardTable, CertificationMatrix, CoverageMatrix — 7 of 13 components, 5 real pages), a verified per-component accessibility pass, and a stable API across three consecutive zero-change releases.",
  },
  {
    id: "metadata",
    family: "Foundation Metadata",
    packageCode: "DS-2.1.4",
    fileCount: 16,
    primitiveCount: 16,
    status: "Exists",
    maturity: "Production Ready",
    note: "16 components. Verified by direct grep: zero onChange/input/button/select/textarea/contentEditable anywhere in the family except one sanctioned navigational Link in RelationshipList. DescriptionList (1 of 16) has real consumers as of DS-2.1.7.1, across 9 pages; the other 15 remain unadopted and the family hasn't run its own accessibility pass yet.",
  },
  {
    id: "forms",
    family: "Foundation Forms",
    packageCode: "DS-2.1.5",
    fileCount: 23,
    primitiveCount: 22,
    status: "Exists",
    maturity: "Production Ready",
    note: "23 files — 22 real components plus a re-export of ui/FormField. Verified every editing component is genuinely controlled (real value/onChange). One self-disclosed accessibility gap: field descriptions aren't wired to aria-describedby on 9 of 10 field types (only DatePickerField does it).",
  },
  {
    id: "catalog",
    family: "Foundation Component Catalog",
    packageCode: "DS-2.1.1",
    fileCount: 5,
    primitiveCount: 52,
    status: "Exists",
    maturity: "Production Ready",
    note: "Tracks 52 generic UI components across 7 groups (Actions/Inputs/Feedback/Overlays/Navigation/Data Display/Layout Primitives) — a different 52 than the 68 files across the four packages above. The catalog's granularity doesn't reflect Metadata's 16 or Forms' 22 real components: both collapse into one or two catalog rows (\"description-list\", \"combobox\", \"date-picker\", \"file-upload\").",
  },
];

export const CATALOG_SUMMARY = {
  total: 52,
  byStatus: { Exists: 26, Partial: 6, Needed: 20 } as Record<InventoryStatus, number>,
  byMaturity: { Concept: 20, Prototype: 6, "Production Ready": 26, Certified: 0, Locked: 0 } as Record<MaturityLevel, number>,
};

export interface CatalogFamilyBreakdown {
  group: string;
  total: number;
  exists: number;
  partial: number;
  needed: number;
}

/** Computed from the live catalog, verified against catalogSummary() output — not hand-typed. */
export const CATALOG_BY_FAMILY: CatalogFamilyBreakdown[] = [
  { group: "Actions", total: 5, exists: 1, partial: 1, needed: 3 },
  { group: "Inputs", total: 10, exists: 10, partial: 0, needed: 0 },
  { group: "Feedback", total: 9, exists: 3, partial: 2, needed: 4 },
  { group: "Overlays", total: 6, exists: 0, partial: 0, needed: 6 },
  { group: "Navigation", total: 6, exists: 0, partial: 2, needed: 4 },
  { group: "Data Display", total: 8, exists: 4, partial: 1, needed: 3 },
  { group: "Layout Primitives", total: 8, exists: 8, partial: 0, needed: 0 },
];

export const HIGH_PRIORITY_GAPS: string[] = [
  "Icon Button",
  "Toast",
  "Alert",
  "Empty State",
  "Dialog",
  "Drawer",
  "Menu",
  "Tooltip",
  "Tabs",
  "Sidebar Nav",
];

export const INVENTORY_NOTE =
  "No component anywhere in the catalog has been marked Certified or Locked — every \"Exists\" entry sits at Production Ready by definition of the status-to-maturity mapping (Exists → Production Ready), and none has been separately verified for accessibility, responsive behavior, and real-screen usage, the three additional requirements Certified adds.";
