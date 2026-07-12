export type CertificationLevelId = "gaps-disclosed" | "audited" | "architecturally-sound" | "enterprise-ready";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
}

/**
 * This page's own four-level ladder, deliberately distinct from every
 * per-tier ladder's own "Enterprise Certified" top rung — this audit does
 * NOT certify Enterprise Certified for the system as a whole. That sign-off
 * is explicitly reserved for DS-6.5 Final Enterprise Certification, the
 * next and final package, not yet built. "Enterprise-Ready" here means
 * "the architecture is sound and the debt is fully catalogued, ready for
 * that final review" — not the review itself.
 */
export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  { id: "gaps-disclosed", name: "Gaps Disclosed", description: "Findings across all eight audit areas have been written up, but none have been independently re-verified against current source yet." },
  { id: "audited", name: "Audited", description: "Every layering, dependency, naming, API-consistency, and duplication claim from all seven prior certification pages has been independently re-checked against current source, with any drift reclassified — but real, structural gaps may still be open." },
  { id: "architecturally-sound", name: "Architecturally Sound", description: "Zero structural violations found anywhere in the six-tier stack — no reverse dependencies, no cycles, no unjustified skips, no undisclosed duplication. Every disclosed gap is bounded and non-structural (accessibility wiring, naming, documentation currency, adoption breadth), not an architecture defect." },
  { id: "enterprise-ready", name: "Enterprise-Ready", description: "Architecturally sound, plus a fully reconciled technical debt register and at least one production (not pilot) Business Feature — the threshold the system-wide Enterprise certification formally signs off on." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "architecturally-sound";

export const CERTIFICATION_JUSTIFICATION = [
  "Zero structural violations were found anywhere across a full-repo parse of 2,892 resolved import edges spanning all six tiers — zero reverse dependencies, zero circular dependencies, zero unjustified layer skips, zero Business-Features leakage into any lower tier. Every quantitative and structural claim across all seven certified tiers checks out against current source, not merely trusted.",
  "Two genuine items are disclosed here for the first time: a value-transition announcement pattern hand-copied across four Operational/Workflow status presets and rolled out inconsistently (two sibling presets, PipelineStatus and ApprovalStatus, got none of it), and two real accessibility improvements in the Production Workspace pilot (live-region wiring, a focus-restoration fix) that fully resolve a Deferred item from Application Composition Certification.",
  "18 items are tracked in the consolidated technical debt register: 3 Resolved and 3 Substantially resolved (the underlying primitive now exists, covering most but not every originally-named consumer) — including WorkflowStepperStep's aria-current gap, closed cleanly. 8 remain genuinely open. 4 are honestly reported Unconfirmed.",
  "Architecturally Sound, not Enterprise-Ready and explicitly not Enterprise Certified: real, disclosed, non-structural debt remains open (touch-target sizing, the TableRow keyboard gap, two naming collisions, three lower-severity API-consistency items, and one newly-found duplication), and production-scale adoption evidence — a real Business Feature running in production, not the mock-data pilot that exists today — does not exist anywhere in the codebase. This is exactly the gap the system-wide Enterprise certification exists to close.",
];

export interface RemainingBlocker {
  toLevel: "architecturally-sound" | "enterprise-ready";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "enterprise-ready", item: "Resolve the 8 Still-open and 4 Unconfirmed items in the technical debt register — none are structural, but Enterprise-Ready requires the register to be fully reconciled, not merely catalogued." },
  { toLevel: "enterprise-ready", item: "Ship at least one production Business Feature — real repositories or APIs behind at least one of the certified Platform libraries, not mock data and local state." },
  { toLevel: "enterprise-ready", item: "Extend Business Feature adoption beyond a single platform (Production) to prove the Composition Framework's own scalability claim with two or more real implementations, not one." },
];

export const DS65_NOTE =
  "The system-wide Enterprise certification is explicitly out of scope here. This page audits and catalogues; it does not perform that sign-off. The three Remaining Blockers above are exactly what that certification needs to close before the system as a whole could reach Enterprise Certified.";
