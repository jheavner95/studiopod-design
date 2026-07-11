export interface PropertyPromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified all six named domains
 * (Production, Publishing, Commerce, Products, QA, Settings) against
 * src/app, specifically for hand-rolled multi-field editing panels
 * (as distinct from Inspector Panel's own read-only detail-panel audit)
 * — every one came back clean. No genuine promotion candidate exists;
 * only a stale data note (below) worth flagging.
 */
export const PROPERTY_PROMOTION_CANDIDATES: PropertyPromotionCandidate[] = [];

export const PROPERTY_CLEAN_FINDINGS: string[] = [
  "Production: the only \"editing\"-shaped control is ControlDock.tsx, a shared playback/dev-overlay toolbar (speed, pause, bounds-overlay toggles) reused verbatim across production/motion/platforms/workflows/capabilities — a generic demo control dock, not a domain property panel.",
  "Publishing & Commerce: PublishingAndCommerceSection renders read-only diagrams with a selection toggle, not property editing. The only real editable-field example anywhere is this repo's own Inspector Panel gallery (CommerceInspectorDemo's price/availability fields) — a demo of the already-built Inspector family, not a hand-rolled duplicate.",
  "Products: every hit is prose or a table-column label; the sole \"products\" reference near a form control is unrelated placeholder text (\"Search products\") on a single SearchInput example.",
  "QA: every hit is a { label: \"QA\", status: ... } pipeline-stage data value in an illustration/timeline registry — no QA settings or editing panel anywhere.",
  "Settings: every hit is prose (\"every settings panel is built from these primitives\") or a nav-item label — no rendered settings panel exists to duplicate.",
  "Foundation Forms' own PropertyEditingDemo.tsx (foundation-forms) is confirmed to be that family's own documentation gallery for src/components/form/PropertyEditor.tsx — grep-verified as used nowhere else in src/app, so it isn't a duplicated pattern either.",
  "One stale data note found in passing: the earliest component inventory (inventory.ts) still lists \"Property Editor\" as status: \"Needed\", even though src/components/form/PropertyEditor.tsx already exists and is demonstrated live — not corrected here, since this page's own catalog entry (not that older inventory snapshot) is the live record other pages already treat as authoritative.",
];
