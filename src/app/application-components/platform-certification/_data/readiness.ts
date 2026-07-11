export interface ReadinessRow {
  label: string;
  verdict: "Ready" | "Mostly ready" | "Not ready";
  note: string;
}

export const READINESS_ASSESSMENT: ReadinessRow[] = [
  {
    label: "Production readiness",
    verdict: "Ready",
    note: "All eight platforms compile, type-check, and lint clean; every gallery demo across all eight docs pages runs real local state (click-to-inspect, live toggles/selects, controlled numeric inputs), independently re-verified by all eight per-platform audits. Nothing found during this review blocks a real screen from adopting any of the eight platforms today.",
  },
  {
    label: "Adoption readiness",
    verdict: "Not ready",
    note: "Zero real screens outside src/app/application-components/ import any Platform-tier component, confirmed by direct grep and independently reconfirmed by all eight per-platform audits. This is structural, not a defect — Business Features, the tier that would consume this library, is the next major phase and beyond, and doesn't exist yet.",
  },
  {
    label: "API stability",
    verdict: "Ready",
    note: "Every platform follows one consistent re-export pattern (95 of 96 components are literal one-line re-exports; the 96th, Production Platform's own ProductionCanvas, is a thin passthrough wrapper) with zero prop renaming or shadowing anywhere. The single real naming collision found (ProductionPipeline) is import-path-distinct with zero compile-time risk — a real but low-severity, now-disclosed surface issue, not a breaking-change risk.",
  },
  {
    label: "Documentation quality",
    verdict: "Ready",
    note: "Every platform's docs page covers all 8 required sections with real, grep-backed content. Five real documentation defects were found across three platforms plus Platform Architecture during this certification (Operations' self-contradictory gap count, Admin's false \"first\" superlative, Integrations' miscounted verbatim ratio, and Platform Architecture's stale \"zero platforms exist\" claims) — all five were corrected in this same pass, a stronger outcome than the Workflow tier's own \"found and left as a tracked gap\" precedent.",
  },
  {
    label: "Composition quality",
    verdict: "Ready",
    note: "Foundation reuse, Operational reuse, Workflow reuse, Platform boundary compliance, and Dependencies all scored a clean 8/8 Pass across every platform independently audited — zero Foundation/Operational/Workflow-layer duplication, zero platform-boundary violations (no real business logic anywhere in 96 components), zero reverse-dependency violations in any direction. This is the tier's strongest dimension, matching the pattern the Operational and Workflow tiers' own certifications already established one and two tiers down.",
  },
  {
    label: "Maintainability",
    verdict: "Ready",
    note: "The shared-ownership re-export precedent (StateHistory reused by Publishing and Admin; ProviderHealthPanel reused by Publishing, Operations, and Integrations; RelationshipView reused by Product and Integrations; PipelineStage reused by Commerce, Operations, and Admin) makes it straightforward for a future contributor to find and extend the right component. The one real naming collision (ProductionPipeline) is now disclosed, so a future contributor searching by name has a documented pointer rather than a silent trap.",
  },
];
