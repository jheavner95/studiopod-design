export interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  status: "complete" | "next" | "future";
}

export const ENTERPRISE_ROADMAP: RoadmapStage[] = [
  { id: "tier-capstones", title: "Seven tier capstones (Workspace, Foundation, Operational, Workflow, Platform, Application Composition, Accessibility)", description: "Each independently certified its own slice of the six-tier stack — the source material this audit cross-checked rather than trusted.", status: "complete" },
  { id: "enterprise-architecture-audit", title: "Enterprise Architecture & Adoption Audit (this page)", description: "The final architectural audit before terminal sign-off — one full-repo dependency parse, a consolidated technical debt register, and a re-verified adoption/business-feature review, deliberately distinct from and short of the final certification below.", status: "complete" },
  { id: "debt-reconciliation", title: "Reconcile the Technical Debt Register's remaining open items", description: "8 Still-open and 4 Unconfirmed items, none structural — touch-target sizing, two naming collisions, the TableRow keyboard gap, and a handful of lower-severity API-consistency and duplication items.", status: "next" },
  { id: "production-business-feature", title: "Ship a production Business Feature", description: "Real repositories or APIs behind at least one certified Platform library — the single largest remaining gap between today's architecture and genuine enterprise adoption evidence.", status: "next" },
  { id: "ds-6-5", title: "DS-6.5 — Final Enterprise Certification", description: "The terminal milestone: the formal system-wide sign-off this audit deliberately did not perform. Now published — see Final Enterprise Certification. It certifies Design System Certified, not Enterprise-Ready: production adoption evidence still doesn't exist, so that rung remains explicitly, permanently unreached.", status: "complete" },
];
