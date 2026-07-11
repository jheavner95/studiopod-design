export type CertificationLevelId = "prototype" | "production-ready" | "certified" | "enterprise-certified";

export interface CertificationLevel {
  id: CertificationLevelId;
  name: string;
  description: string;
}

export const CERTIFICATION_LEVELS: CertificationLevel[] = [
  { id: "prototype", name: "Prototype", description: "Working, non-production implementation validating a direction before committing to real code." },
  { id: "production-ready", name: "Production Ready", description: "Functional, well-composed, and documented — safe to build against, but not every dimension has been formally verified with zero exceptions." },
  { id: "certified", name: "Certified", description: "Every system clears the full verification bar: Foundation/Operational compliance and accessibility are verified in code, not just documented, with no open exceptions." },
  { id: "enterprise-certified", name: "Enterprise Certified", description: "Certified, plus real-screen adoption evidence — at least one production platform screen genuinely built on top of the library." },
];

export const CERTIFICATION_DECISION: CertificationLevelId = "production-ready";

export const CERTIFICATION_JUSTIFICATION = [
  "Two of the eight systems (State Machine, Dependency & Relationship Views) individually cleared their own dedicated audit's bar for Certified — 12/12 dimensions Pass, zero naming collisions, zero gaps of any kind. The other six each carry at least one real, named, unresolved gap its own auditor declined to wave through: a verified aria-current regression (Workflow Stepper), a documented API-shape drift (Workflow Visualization), or a real naming collision left unresolved (Workflow Framework, Workflow Timeline, Pipeline Components — the last of which also surfaced one entirely new, previously-undocumented collision during this very audit).",
  "Foundation compliance, Operational compliance, and dependency layering are all a clean 8/8 across every system — zero duplicated Foundation or Operational functionality, and zero reverse-dependency imports into the app/Platform/diagram-library tiers, in either direction, confirmed by both the eight per-system audits and a direct repo-wide grep run during synthesis. This is the tier's strongest result and the reason it clears Production Ready comfortably: 88 of the 96 non-Adoption dimension checks (11 dimensions × 8 systems) are Pass, with the remaining 5 all Partial and zero Fail.",
  "The one gap every single one of the eight independent audits found on its own is the same systemic gap the Operational Component Library's own certification already found one tier down: at the time of those audits, no system implemented a first-party aria-live announcement pattern. Update, re-verified against current source: a later rollout has since added useAnnounce() to WorkflowStatus (Workflow Framework) and WorkflowStepperProgress (Workflow Stepper) — 2 of 92 components — but PipelineStatus, ApprovalStatus, WorkflowSelection, and StateNode remain unannounced, so this is now a partially-, not fully-, closed gap rather than a purely inherited one. On top of it, this tier's own audits surfaced two genuinely new issues at the time — WorkflowStepperStep's missing aria-current=\"step\" (a real regression against the Foundation pattern it claims lineage from) and a previously-undocumented PipelineStage naming collision. Update, re-verified against current source: the aria-current regression has since been fixed — WorkflowStepperStep.tsx now computes and renders aria-current on both its button and div paths — though the Remaining Blockers list below has not yet been updated to reflect that. The PipelineStage naming collision remains open. A library-wide certification should require every member system to clear the bar with zero open exceptions, not most of them.",
  "Enterprise Certified is not reachable regardless of the above — real-screen adoption evidence does not exist anywhere in the codebase today, confirmed independently by all eight audits and a direct repo-wide grep of all 92 component/hook export names. This is a structural fact about where this tier sits in the roadmap (Platform Components, the tier that would consume this library, hasn't been built yet), not a quality defect in the library itself.",
];

export interface RemainingBlocker {
  toLevel: "certified" | "enterprise-certified";
  item: string;
}

/**
 * "Add aria-current=\"step\" to WorkflowStepperStep's current-step rendering"
 * was removed from this list after a later fix landed: re-verified against
 * current source, WorkflowStepperStep.tsx now computes ariaCurrent and
 * renders aria-current={ariaCurrent} on both its button and div paths. The
 * "add a first-party aria-live pattern" item below is still accurate as
 * scoped (WorkflowSelection and State Machine's status-change surfaces
 * specifically) even though a later, narrower rollout did reach two other
 * components (WorkflowStatus, WorkflowStepperProgress) not named by this
 * item — see Accessibility for the full picture.
 */
export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "certified", item: "Resolve or explicitly rename the WorkflowStep (type) and PipelineStage (component) naming collisions found during this audit, alongside the five already-disclosed same-name cases against the plural Workflow Diagram Library and the Illustration Library." },
  { toLevel: "certified", item: "Add a first-party aria-live announcement pattern (or an explicitly documented, tested opt-in hook) to at least Workflow Visualization's WorkflowSelection and State Machine's status-change surfaces, where selection/status changes are most frequent." },
  { toLevel: "certified", item: "Decide, and document, whether WorkflowNode's selected/filtered boolean-prop pattern (introduced in Workflow Visualization) should be retrofitted onto StateNode/DependencyNode for full API-shape consistency across the tier, or remain a deliberate, scoped exception." },
  { toLevel: "enterprise-certified", item: "Ship at least one real Platform Components screen that adopts one or more of these eight systems in production." },
];
