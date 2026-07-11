export interface CertificationHistoryEntry {
  code: string;
  title: string;
  /** Real page href, or a same-page anchor for the one tier with no dedicated capstone page yet. */
  href: string;
  external: boolean;
  status: string;
}

/**
 * All nine certifications that precede this one, in the order they shipped.
 * Eight have their own capstone page; Documentation Experience (DS-6.1/
 * DS-6.2) never got one — it is certified for the first time by this page's
 * own Documentation Summary (Part 5) rather than pointing at a page that
 * doesn't exist. Every status line below reflects DS-6.5's own
 * re-verification against current source, not a re-publish of each page's
 * original verdict.
 */
export const CERTIFICATION_HISTORY: CertificationHistoryEntry[] = [
  {
    code: "DS-1.9",
    title: "Workspace Architecture Certification",
    href: "/application-components/workspace-certification",
    external: true,
    status:
      "Certified. Re-verified by DS-6.5: every scorecard, checklist, and cross-reference count still checks out — but two new documentation defects were found this pass (the blueprint's undocumented tier-5 gap; the accessibility principle's false claim for Workspace Framework and Workspace Layout). Neither is structural. See Architecture Summary and the Technical Debt Register.",
  },
  {
    code: "DS-2.1.6",
    title: "Foundation Audit",
    href: "/application-components/foundation-audit",
    external: true,
    status:
      "Certified. Re-verified by DS-6.5: the aria-describedby field-description gap is reopened at its true severity — 10 of 10 field types, not 9 of 10 — and DatePickerField is retracted as a reference implementation. Every other quantitative claim holds. See the Technical Debt Register.",
  },
  {
    code: "DS-2.5.10",
    title: "Operational Certification",
    href: "/application-components/operational-certification",
    external: true,
    status:
      "Certified. Re-verified by DS-6.5: all nine systems' component counts, the 113-component total, and the four Certified / five Production Ready readiness labels are unchanged in current source. No new defects found this pass.",
  },
  {
    code: "DS-3.9",
    title: "Workflow Certification",
    href: "/application-components/workflow-certification",
    external: true,
    status:
      "Certified. The 92-component, eight-system total was independently confirmed at Enterprise Architecture Audit and carried forward unchanged here. The WorkflowStep / PipelineStage naming collision it first disclosed remains open — see the Technical Debt Register.",
  },
  {
    code: "DS-4.10",
    title: "Platform Certification",
    href: "/application-components/platform-certification",
    external: true,
    status:
      "Certified. The 96-component, eight-platform total was independently confirmed at Enterprise Architecture Audit and carried forward unchanged here. Production Workspace remains the only Business Feature built on a certified Platform library, and it is still pilot-stage, not production.",
  },
  {
    code: "DS-5.5",
    title: "Application Composition Certification",
    href: "/docs/application-composition-certification",
    external: true,
    status:
      "Certified. All thirteen Composition Framework parts still Pass against current source, re-confirmed at Enterprise Architecture Audit and unchanged since. The two real defects it resolved at its own certification remain resolved.",
  },
  {
    code: "DS-6.1 / DS-6.2",
    title: "Documentation Experience",
    href: "#documentation-summary",
    external: false,
    status:
      "Certified for the first time — by this page. No prior package audited the docs shell, the navigation registry, or the five DS-6.1 page archetypes on their own terms. See Documentation Summary below for the audit and its findings.",
  },
  {
    code: "DS-6.3",
    title: "Accessibility & Interaction Quality Certification",
    href: "/application-components/accessibility-certification",
    external: true,
    status:
      "Certified. Re-verified by DS-6.5: all five pre-session fixes and the Table accessibility-wiring correction are confirmed present. Two of its own Still-open items — TableRow keyboard activation and Popover aria-label on FilterPopover/DataGridColumnPicker — are now genuinely Resolved in current source.",
  },
  {
    code: "DS-6.4",
    title: "Enterprise Architecture & Adoption Audit",
    href: "/application-components/enterprise-architecture-audit",
    external: true,
    status:
      "Architecturally Sound. Re-verified by DS-6.5: zero structural violations reconfirmed by a second independent full-repo parse. Its own 18-item technical debt register has been carried forward, reconciled further, and superseded by this page's 21-item register below.",
  },
];
