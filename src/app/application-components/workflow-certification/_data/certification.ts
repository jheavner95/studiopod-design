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
  "The one gap every single one of the eight independent audits found on its own is the same systemic gap DS-2.5.10 already found one tier down: no system implements a first-party aria-live announcement pattern. On top of that inherited gap, this tier's own audits surfaced two genuinely new, unresolved issues — WorkflowStepperStep's missing aria-current=\"step\" (a real regression against the Foundation pattern it claims lineage from) and a previously-undocumented PipelineStage naming collision. A library-wide certification should require every member system to clear the bar with zero open exceptions, not most of them.",
  "Enterprise Certified is not reachable regardless of the above — real-screen adoption evidence does not exist anywhere in the codebase today, confirmed independently by all eight audits and a direct repo-wide grep of all 92 component/hook export names. This is a structural fact about where DS-3 sits in the roadmap (Platform Components, the tier that would consume this library, is DS-4 and beyond), not a quality defect in the library itself.",
];

export interface RemainingBlocker {
  toLevel: "certified" | "enterprise-certified";
  item: string;
}

export const REMAINING_BLOCKERS: RemainingBlocker[] = [
  { toLevel: "certified", item: "Add aria-current=\"step\" to WorkflowStepperStep's current-step rendering — a direct, verified regression against the Foundation Navigation Stepper pattern it claims to follow." },
  { toLevel: "certified", item: "Resolve or explicitly rename the WorkflowStep (type) and PipelineStage (component) naming collisions found during this audit, alongside the five already-disclosed same-name cases against the plural Workflow Diagram Library and the Illustration Library." },
  { toLevel: "certified", item: "Add a first-party aria-live announcement pattern (or an explicitly documented, tested opt-in hook) to at least Workflow Visualization's WorkflowSelection and State Machine's status-change surfaces, where selection/status changes are most frequent." },
  { toLevel: "certified", item: "Decide, and document, whether WorkflowNode's selected/filtered boolean-prop pattern (introduced in Workflow Visualization) should be retrofitted onto StateNode/DependencyNode for full API-shape consistency across the tier, or remain a deliberate, scoped exception." },
  { toLevel: "enterprise-certified", item: "Ship at least one real Platform Components screen that adopts one or more of these eight systems in production." },
];
