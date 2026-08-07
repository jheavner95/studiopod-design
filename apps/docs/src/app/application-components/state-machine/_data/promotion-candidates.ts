export interface StatePromotionCandidate {
  id: string;
  pattern: string;
  files: string[];
  description: string;
  migrationNote: string;
}

/**
 * A dispatched research agent grep-verified six named domains — Production,
 * Publishing, Commerce, Automation, Intelligence, Operations — plus a
 * repo-wide grep for exported StateMachine/FSM/Guard/StateNode/
 * canTransition/nextState/transitionTo declarations, reading function
 * bodies rather than guessing from names. It also read the pre-existing
 * (plural) Workflow Diagram Library's own "status mapper" and "playback
 * hook" in full, since those were the two most name-suggestive candidates
 * going in.
 */
export const STATE_PROMOTION_CANDIDATES: StatePromotionCandidate[] = [];

export const STATE_CLEAN_FINDINGS: string[] = [
  "No genuine state-machine implementation exists anywhere in the repo — no code anywhere defines a set of states plus explicit allowed-transition rules plus guard conditions that gate a transition plus entry/exit/transition-triggered actions. A repo-wide grep for exported StateMachine, FSM, Guard, StateNode, canTransition, nextState, and transitionTo declarations returned zero hits.",
  "Production: src/production/utils/status.ts (resolveStageStatus, toNodeStatus, toSystemStatus) and src/production/utils/gates.ts (resolveGateStatus, getGateSummary) were read in full — both are one-way status→display-tone bridges and pass/fail/warning count aggregation, not transition-rule functions. Neither takes a \"from state\" and \"to state\" and returns whether the move is allowed.",
  "Publishing, Commerce: PublishingDiagram.tsx/CommerceDiagram.tsx and their underlying CapabilityRegistry schema were checked — CapabilityStatus is a flat status vocabulary with no transition graph. The closest near-miss, getPreferredProvider()/sortByPriority() in src/capabilities/utils/providers.ts, picks which provider to use by priority, not which state to transition to — no source/target state pairing, no rule set. Clean.",
  "Automation: no src/automation/ directory exists anywhere in the repo — reconfirmed via a full directory search. Clean.",
  "Intelligence: the only \"intelligence\"-named file remains a static PlatformArchitecture example (Observe→Analyze→Recommend→Automate) with zero stage/gate/guard vocabulary — reconfirmed, nothing changed since the prior session's audit. Clean.",
  "Operations: InspectorValidation.tsx delegates entirely to Foundation Feedback's ValidationSummary/Alert, no transition logic. JobRetry.tsx was read in full — its needsConfirm/exhausted checks are simple attempt-count comparisons that disable a button or show a confirm dialog, not a state-transition guard (no notion of job \"state,\" no canTransition-equivalent). QueueStatus.tsx is a flat 8-value status enum mapped through a STATUS_MAP to a StatusIndicator tone, the same display-bridge pattern as everywhere else. Clean.",
  "The pre-existing (plural) Workflow Diagram Library at src/workflows/ — a different, unrelated library from src/components/workflow/ (singular), where this package lives — was checked specifically since its naming suggested the closest possible overlap. src/workflows/utils/status.ts (toSystemStatus, resolveStepStatus) is another status-display bridge. src/workflows/utils/useWorkflowPlayback.ts (the \"playback hook\") was read in full and confirmed to be a plain setInterval-driven activeIndex cursor stepping through workflow.steps modulo steps.length — it doesn't consult WorkflowBranch data at all (branches are drawn but never taken), has no guard conditions on advancement, and always advances on a fixed timer regardless of any target-step state. Index-stepping animation, not a state machine. Clean.",
  "Across every domain checked, the same recurring pattern reappears: a flat status enum (WorkflowStateValue, ApprovalStateValue, QueueStatusValue, HealthStatusValue, ProductionStatus, WorkflowTimelineEventStatus) plus a one-way Record<Status, DisplayTone> lookup table for rendering. None of these is a transition/guard system — this package is positioned as formalizing that recurring display pattern into a real state-transition vocabulary for the first time, not deduplicating an existing one.",
];
