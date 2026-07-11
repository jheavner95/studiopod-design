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
  { id: "enterprise-ready", name: "Enterprise-Ready", description: "Architecturally sound, plus a fully reconciled technical debt register and at least one production (not pilot) Business Feature — the threshold DS-6.5 Final Enterprise Certification would formally sign off on." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "architecturally-sound";

export const CERTIFICATION_JUSTIFICATION = [
  "Zero structural violations were found anywhere across a full-repo parse of 2,892 resolved import edges spanning all six tiers — zero reverse dependencies, zero circular dependencies, zero unjustified layer skips, zero Business-Features leakage into any lower tier. Every one of the seven prior certification pages' own quantitative and structural claims was independently cross-checked against current source during this audit and found accurate, not merely trusted.",
  "This audit found two genuine, previously-undisclosed items no prior certification page's scope covered: a value-transition announcement pattern hand-copied across four Operational/Workflow status presets and rolled out inconsistently (two sibling presets, PipelineStatus and ApprovalStatus, got none of it), and two real accessibility improvements in the Production Workspace pilot (live-region wiring, a focus-restoration fix) that fully resolve a Deferred item from Application Composition Certification but were recorded nowhere until now.",
  "Of the 18 outstanding items consolidated from all seven prior certification pages' own REMAINING_BLOCKERS and DEFERRED arrays into one register, 3 are confirmed fully Resolved and 3 more Substantially resolved this pass (the underlying primitive now exists, covering most but not every originally-named consumer) — including WorkflowStepperStep's aria-current gap, closed cleanly. 8 are confirmed still genuinely open, re-verified unchanged rather than assumed fixed. 4 are honestly reported Unconfirmed — this audit did not verify them and does not claim to.",
  "Architecturally Sound, not Enterprise-Ready and explicitly not Enterprise Certified: real, disclosed, non-structural debt remains open (touch-target sizing, the TableRow keyboard gap, two naming collisions, three lower-severity API-consistency items, and one newly-found duplication), and production-scale adoption evidence — a real Business Feature running in production, not the mock-data pilot that exists today — does not exist anywhere in the codebase. This is a structural fact about where the roadmap sits, independently re-confirmed by this audit rather than newly discovered, and it is exactly the gap DS-6.5 Final Enterprise Certification exists to close.",
];

export interface RemainingBlocker {
  toLevel: "architecturally-sound" | "enterprise-ready";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "enterprise-ready", item: "Resolve the 8 Still-open and 4 Unconfirmed items in the Technical Debt Register below — none are structural, but Enterprise-Ready requires the register to be fully reconciled, not merely catalogued." },
  { toLevel: "enterprise-ready", item: "Ship at least one production Business Feature — real repositories or APIs behind at least one of the certified Platform libraries, not mock data and local state." },
  { toLevel: "enterprise-ready", item: "Extend Business Feature adoption beyond a single platform (Production) to prove the Composition Framework's own scalability claim with two or more real implementations, not one." },
];

export const DS65_NOTE =
  "DS-6.5 Final Enterprise Certification — the terminal milestone this audit exists to prepare the ground for — is explicitly out of scope for this package. This page audits and catalogues; it does not perform that final sign-off. The three Remaining Blockers above are exactly what DS-6.5 would need to close before it could reach Enterprise Certified for the system as a whole.";
