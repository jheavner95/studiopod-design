export type ReadinessVerdict = "Ready" | "Mostly ready" | "Not ready";

export interface ReadinessRow {
  label: string;
  verdict: ReadinessVerdict;
  note: string;
}

export const READINESS_ASSESSMENT: ReadinessRow[] = [
  { label: "Architecture readiness", verdict: "Ready", note: "The composition architecture, the framework, and the templates form a complete, internally consistent, cross-referenced whole — every later package builds on the earlier ones' own vocabulary rather than inventing a competing one." },
  { label: "Feature readiness", verdict: "Ready", note: "The pilot proves the framework produces a working, accessible, responsive Business Feature, not just a paper design." },
  { label: "Composition quality", verdict: "Ready", note: "Zero layer violations, zero reverse dependencies, real certified components composed throughout — see Layering Review and Dependency Review." },
  { label: "Documentation quality", verdict: "Ready", note: "Every package documents its own composition diagrams, anatomy, and rules in full. One minor completeness gap disclosed (Template Review), not a missing-documentation defect." },
  { label: "Maintainability", verdict: "Ready", note: "Single-hook orchestration, pure repository functions, and a clean ten-part file-to-concern mapping make the pilot's own structure easy to extend or copy for the next feature." },
  { label: "Scalability", verdict: "Mostly ready", note: "The framework asserts it scales to Products, Publishing, Commerce, and the other planned adoption targets by design, but that claim rests on one real implementation so far, not two or more." },
  { label: "Adoption readiness", verdict: "Mostly ready", note: "One real (non-production) Business Feature now exists — an improvement over Platform Certification's own Fail verdict on this dimension one tier down — but zero production features exist yet." },
];
