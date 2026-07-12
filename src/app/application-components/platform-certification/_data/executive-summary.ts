export interface WorkPackageSummary {
  code: string;
  title: string;
  href: string;
  oneLiner: string;
}

export const DS4_WORK_PACKAGES: WorkPackageSummary[] = [
  { code: "DS-4.1", title: "Platform Architecture", href: "/application-components/platform-architecture", oneLiner: "The blueprint every domain platform built against — layer composition, ownership model, certification ladder, and the canonical 8-platform list — written before any platform existed." },
  { code: "DS-4.2", title: "Production Platform", href: "/application-components/production-platform", oneLiner: "The first domain platform built — 11 pure re-exports plus one justified thin wrapper (ProductionCanvas), the only genuinely new code across all 96 Platform-tier components." },
  { code: "DS-4.3", title: "Product Platform", href: "/application-components/product-platform", oneLiner: "The first platform to reach 12-of-12 pure re-exports with zero new wrapper code — the pattern every later platform repeated." },
  { code: "DS-4.4", title: "Publishing Platform", href: "/application-components/publishing-platform", oneLiner: "Correctly avoided the WorkflowTimeline naming trap by composing State Machine's own StateHistory instead for a genuine chronological log." },
  { code: "DS-4.5", title: "Commerce Platform", href: "/application-components/commerce-platform", oneLiner: "Three distinct DataGrid consumers (Catalog, Orders, Inventory) over structurally different row shapes, and the first HealthStatusValue-verbatim state mapping." },
  { code: "DS-4.6", title: "Intelligence Platform", href: "/application-components/intelligence-platform", oneLiner: "The widest Operational reuse in the tier — five distinct widgets (RecommendationWidget, DataGrid, HealthPanel, HealthIssueList, ChartWidget) composed directly." },
  { code: "DS-4.7", title: "Operations Platform", href: "/application-components/operations-platform", oneLiner: "Generalized ProviderHealthPanel for generic multi-system monitoring rather than literal providers — confirmed structurally sound, not a naming trick." },
  { code: "DS-4.8", title: "Admin Platform", href: "/application-components/admin-platform", oneLiner: "The first real Platform-tier consumer of Approval & Review's own ApprovalStage, chosen correctly over the shell-only WorkflowStepper." },
  { code: "DS-4.9", title: "Integrations Platform", href: "/application-components/integrations-platform", oneLiner: "The ninth and final platform — the first real consumer of SyncStatusPanel, and a deliberate DataGrid/ProviderHealthPanel split between registry and per-connection health." },
  { code: "DS-4.10", title: "Platform Component Library Certification", href: "/application-components/platform-certification", oneLiner: "This platform tier's own capstone — nine independent audits, five real documentation defects found and fixed in the same pass, and a Certified verdict for all eight platforms." },
];

export const EXECUTIVE_SUMMARY_STRENGTHS = [
  "Zero platform-boundary violations found anywhere across 96 components in eight platforms — no real business-domain logic (authentication, payment processing, OAuth flows, sync execution, RBAC evaluation) exists anywhere in the tier, independently re-verified by re-reading each platform's own cited source files.",
  "Zero reverse-dependency violations in any direction — Platform never reaches up into Business Features or sideways into another platform's own directory, Workflow/Operational never reach down into Platform, and Foundation never reaches down into any of the three — confirmed by both eight independent per-platform audits and a direct repo-wide grep run during synthesis.",
  "95 of 96 components are literal one-line re-exports of already-certified Foundation/Operational/Workflow components; the lone exception (Production Platform's own ProductionCanvas) is a thin passthrough wrapper introducing zero new logic. A mature shared-ownership re-export precedent (StateHistory, ProviderHealthPanel, RelationshipView, and PipelineStage each reused by three or more platforms) caught what would otherwise have been repeated near-identical implementations.",
  "Five real documentation defects were found across the tier — and every one was corrected in the same pass, not left as a standing gap.",
  "Four of eight platforms (Product, Publishing, Commerce, Intelligence) cleared all 13 verification dimensions with zero findings of any kind on first independent audit.",
];

export const EXECUTIVE_SUMMARY_WEAKNESSES = [
  "No platform implements a first-party aria-live announcement pattern — the same systemic gap the Operational tier's own certification found one tier down and the Workflow tier's own certification reconfirmed one tier up, now confirmed unresolved a third tier up. Every platform discloses this honestly rather than hiding it.",
  "One real, previously-undisclosed naming collision (Production Platform's own ProductionPipeline vs. a pre-existing TypeScript interface of the same name) — no compile-time risk, now disclosed, but the only Naming dimension not a clean Pass across the tier.",
  "Zero real-screen adoption anywhere in the codebase — every one of the 96 components has only ever been exercised inside its own documentation gallery, the same structural gap the Operational and Workflow tiers' own certifications both found one and two tiers down. This tier cannot close it alone; it's the explicit subject of the next tier.",
];

export const DS4_COMPLETION_SUMMARY =
  "This platform tier set out to prove that real, usable domain-specific component libraries — the layer where business vocabulary (Order, Artwork, Content Item, Provider Connection) finally attaches to real UI — could be built entirely on top of the certified Foundation, Operational, and Workflow layers without duplicating any of them. On the evidence gathered across nine independent per-package audits, it did: eight platforms, 96 components, zero platform-boundary violations, zero reverse-dependency violations in any direction, and a shared-ownership re-export precedent mature enough that most platforms needed no new code at all. This certification found five real documentation defects along the way — three false or self-contradictory claims in three separate platform packages, one undisclosed naming collision, and a founding architecture document whose own \"nothing is built yet\" narrative had gone stale — and fixed every one in the same pass. What this tier could not yet prove, the same as the Operational and Workflow tiers before it, is that any of this holds up under real adoption, because nothing has adopted it yet — that is the next tier's job. All eight platforms are independently Certified; the tier as a whole is Certified, held back from Enterprise Certified only by the complete absence of real Business Feature adoption — a structural fact about where this tier sits in the roadmap, not a defect in the library itself.";
