export interface CertificationHistoryEntry {
  code: string;
  title: string;
  /** Real page href, or a same-page anchor for the one tier with no dedicated certification page. */
  href: string;
  external: boolean;
  status: string;
}

/**
 * All nine certifications that precede this one, in the order they shipped.
 * Eight have their own certification page; Documentation Experience never
 * got one — it is certified by this page's own Documentation Summary
 * (Part 5) rather than pointing at a page that doesn't exist.
 */
export const CERTIFICATION_HISTORY: CertificationHistoryEntry[] = [
  {
    code: "DS-1.9",
    title: "Workspace Architecture Certification",
    href: "/application-components/workspace-certification",
    external: true,
    status:
      "Certified. Every scorecard, checklist, and cross-reference count checks out. Two documentation gaps remain open: an undocumented tier-5 gap in the blueprint, and an accessibility principle claim that doesn't hold for Workspace Framework and Workspace Layout. Neither is structural. See Architecture Summary.",
  },
  {
    code: "DS-2.1.6",
    title: "Foundation Audit",
    href: "/application-components/foundation-audit",
    external: true,
    status:
      "Certified. The aria-describedby field-description gap covers all 10 field types, not 9 of 10, and DatePickerField is not a reference implementation for it. Every other quantitative claim holds.",
  },
  {
    code: "DS-2.5.10",
    title: "Operational Certification",
    href: "/application-components/operational-certification",
    external: true,
    status:
      "Certified. All nine systems' component counts, the 113-component total, and the four Certified / five Production Ready readiness labels match current source.",
  },
  {
    code: "DS-3.9",
    title: "Workflow Certification",
    href: "/application-components/workflow-certification",
    external: true,
    status:
      "Certified. The 92-component, eight-system total matches current source. The WorkflowStep / PipelineStage naming collision remains open as a known limitation.",
  },
  {
    code: "DS-4.10",
    title: "Platform Certification",
    href: "/application-components/platform-certification",
    external: true,
    status:
      "Certified. The 96-component, eight-platform total matches current source. Production Workspace remains the only Business Feature built on a certified Platform library, and remains pilot-stage.",
  },
  {
    code: "DS-5.5",
    title: "Application Composition Certification",
    href: "/docs/application-composition-certification",
    external: true,
    status:
      "Certified. All thirteen Composition Framework parts Pass against current source. The two defects it identified remain resolved.",
  },
  {
    code: "DS-6.1 / DS-6.2",
    title: "Documentation Experience",
    href: "#documentation-summary",
    external: false,
    status:
      "Certified. Covers the docs shell, the navigation registry, and the five page archetypes. See Documentation Summary below for details.",
  },
  {
    code: "DS-6.3",
    title: "Accessibility & Interaction Quality Certification",
    href: "/application-components/accessibility-certification",
    external: true,
    status:
      "Certified. All five accessibility fixes and the Table accessibility-wiring correction are present in current source. TableRow keyboard activation and Popover aria-label on FilterPopover/DataGridColumnPicker are both Resolved.",
  },
  {
    code: "DS-6.4",
    title: "Enterprise Architecture & Adoption Audit",
    href: "/application-components/enterprise-architecture-audit",
    external: true,
    status: "Architecturally Sound. Zero structural violations across the full repository.",
  },
];
