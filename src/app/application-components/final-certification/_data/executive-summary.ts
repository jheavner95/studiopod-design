export interface CertificationSummary {
  code: string;
  title: string;
  oneLiner: string;
}

export const CERTIFICATION_SUMMARIES: CertificationSummary[] = [
  { code: "DS-1.9", title: "Workspace Architecture", oneLiner: "Certified; two documentation gaps disclosed below." },
  { code: "DS-2.1.6", title: "Foundation Audit", oneLiner: "Certified; the aria-describedby gap covers 10 of 10 field types." },
  { code: "DS-2.5.10", title: "Operational Certification", oneLiner: "Certified; all quantitative claims confirmed." },
  { code: "DS-3.9", title: "Workflow Certification", oneLiner: "Certified; the WorkflowStep/PipelineStage naming collision remains open." },
  { code: "DS-4.10", title: "Platform Certification", oneLiner: "Certified; production adoption evidence still doesn't exist." },
  { code: "DS-5.5", title: "Application Composition Certification", oneLiner: "Certified; all thirteen Composition Framework parts Pass." },
  { code: "DS-6.1 / DS-6.2", title: "Documentation Experience", oneLiner: "Certified, by this page's own audit." },
  { code: "DS-6.3", title: "Accessibility & Interaction Quality", oneLiner: "Certified; two open items are now Resolved." },
  { code: "DS-6.4", title: "Enterprise Architecture & Adoption Audit", oneLiner: "Architecturally Sound." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS: string[] = [
  "Zero structural architecture violations found anywhere in the codebase.",
  "Every one of the nine certifications' core claims holds against current source — nothing in the certification history is trusted on faith alone.",
  "Two accessibility items open since Accessibility Certification are now confirmed genuinely fixed (TableRow keyboard activation; Popover aria-label), and Documentation Experience is certified here.",
  "aria-describedby coverage for field description text applies to 10 of 10 field types — not the 9 of 10 previously documented — and DatePickerField is not a usable reference implementation for the pattern.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES: string[] = [
  "Production-scale adoption evidence still does not exist anywhere in the codebase. Production Workspace remains the only real Business Feature, and it is explicitly non-production. This is the single largest, permanent gap between the Design System's own architecture and true enterprise-scale certification.",
  "A number of known limitations remain across the system — non-structural gaps in accessibility live-region coverage, a couple of naming collisions, and touch-target sizing on a few components. None are structural.",
  "Two documentation gaps remain open in Workspace Architecture Certification — see Architecture Summary.",
];

export const CLOSING_NOTE =
  "This page represents the current, complete certification status of the StudioPOD Design System, covering all nine tiers and cross-cutting audits in one place.";
