export interface ReadinessRow {
  label: string;
  verdict: "Ready" | "Mostly ready" | "Not ready";
  note: string;
}

export const READINESS_ASSESSMENT: ReadinessRow[] = [
  {
    label: "Production readiness",
    verdict: "Ready",
    note: "All nine systems compile, type-check, and lint clean; every gallery demo runs real local state rather than a static screenshot. Nothing found during this review blocks a screen from adopting any of the nine systems today.",
  },
  {
    label: "Adoption readiness",
    verdict: "Not ready",
    note: "Zero real screens outside src/app/application-components/ import any operational component, confirmed by direct grep and independently reconfirmed by all nine per-system audits. This is structural, not a defect — Platform Components, the tier that would consume this library, doesn't exist yet.",
  },
  {
    label: "API stability",
    verdict: "Mostly ready",
    note: "Every system follows one consistent controlled-component pattern (value/onChange, selectedIds/onSelectionChange) with no internal state hiding from callers. The two naming collisions (FilterBar/FilterChip, PropertyEditor/PropertyGroup/PropertySection) are the only surface-level API risk found — real, but resolvable by renaming rather than a breaking redesign.",
  },
  {
    label: "Documentation quality",
    verdict: "Mostly ready",
    note: "Every system's docs page covers all eight required sections with real, grep-backed content — not template filler. One factual inaccuracy was found (Status & Health's \"sortable table\" claim) and corrected during this review; no other system's docs were found to overstate a component's real behavior.",
  },
  {
    label: "Composition quality",
    verdict: "Ready",
    note: "Foundation reuse and Dependencies both scored a clean 9/9 Pass across every system audited — zero Foundation-layer duplication, zero reverse-dependency violations. This is the library's strongest dimension by a clear margin.",
  },
  {
    label: "Maintainability",
    verdict: "Ready",
    note: "Consistent naming conventions, consistent file-per-component structure, and a now-established shared-ownership re-export precedent (used six times across the library) all make it straightforward for a future contributor to find and extend the right component rather than duplicating it.",
  },
];
