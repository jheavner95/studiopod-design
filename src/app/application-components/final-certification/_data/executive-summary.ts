export interface CertificationSummary {
  code: string;
  title: string;
  oneLiner: string;
}

export const CERTIFICATION_SUMMARIES: CertificationSummary[] = [
  { code: "DS-1.9", title: "Workspace Architecture", oneLiner: "Certified; two new documentation defects found and disclosed by this page's own re-verification." },
  { code: "DS-2.1.6", title: "Foundation Audit", oneLiner: "Certified; the aria-describedby gap is reopened at its true 10-of-10 severity." },
  { code: "DS-2.5.10", title: "Operational Certification", oneLiner: "Certified; all quantitative claims confirmed unchanged." },
  { code: "DS-3.9", title: "Workflow Certification", oneLiner: "Certified; the WorkflowStep/PipelineStage naming collision remains open." },
  { code: "DS-4.10", title: "Platform Certification", oneLiner: "Certified; production adoption evidence still doesn't exist." },
  { code: "DS-5.5", title: "Application Composition Certification", oneLiner: "Certified; all thirteen Composition Framework parts still Pass." },
  { code: "DS-6.1 / DS-6.2", title: "Documentation Experience", oneLiner: "Certified for the first time, by this page's own audit." },
  { code: "DS-6.3", title: "Accessibility & Interaction Quality", oneLiner: "Certified; two of its own open items are now genuinely Resolved." },
  { code: "DS-6.4", title: "Enterprise Architecture & Adoption Audit", oneLiner: "Architecturally Sound; reconfirmed by a second independent full-repo parse." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS: string[] = [
  "Zero structural architecture violations found anywhere across two independent full-repo dependency parses run at different points in the project's history — the same result twice, not a single unverified claim.",
  "Every one of the nine prior certifications' own core claims was directly re-checked at least once, either by this page or by Enterprise Architecture Audit before it — nothing in the certification history is trusted on faith alone.",
  "Two accessibility items open since Accessibility Certification are now confirmed genuinely fixed (TableRow keyboard activation; Popover aria-label), and Documentation Experience — the one part of the system with no certification history at all — is certified for the first time.",
  "This page caught and reopened one real, multi-generation error: Foundation Audit's aria-describedby claim was wrong at its own certification and was repeated uncritically by Enterprise Architecture Audit; only a third, direct read of the source caught it.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES: string[] = [
  "Production-scale adoption evidence still does not exist anywhere in the codebase. Production Workspace remains the only real Business Feature, and it is explicitly non-production. This is the single largest, and now permanent, gap between the Design System's own architecture and true enterprise-scale certification.",
  "21 items remain in the final Technical Debt Register: 9 genuinely Still open, 4 honestly Unconfirmed. None are structural, but none are being handed to a future audit either — DS-6.5 is the last package in this series.",
  "Two real, previously-undisclosed documentation defects were found in Workspace Architecture Certification (DS-1.9) — a tier that had never been independently re-verified until this page did it, seven certifications after it originally shipped.",
];

export const CLOSING_NOTE =
  "This is the ninth and final certification review in the Design System's own capstone series. No DS-6.6 is planned, and none of the open items in the Technical Debt Register below are being deferred to one — this page is where the series' own bookkeeping stops.";
