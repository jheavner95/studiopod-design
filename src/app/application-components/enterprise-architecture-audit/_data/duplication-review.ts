export interface DuplicationEntry {
  title: string;
  scope: string;
  detail: string;
}

/**
 * One genuinely new, previously-undisclosed duplication finding from this
 * audit's own investigation, plus the already-disclosed duplication
 * findings from every prior tier audit, reclassified against current
 * source rather than re-published unchanged.
 */
export const NEW_FINDING: DuplicationEntry = {
  title: "The same value-transition announcement pattern is hand-copied four times, and wired into only four of the six components that share it",
  scope: "Operational (QueueStatus, HealthIndicator, BulkStatus) and Workflow (WorkflowStatus)",
  detail: "All four files independently declare const previousValue = useRef(value) and an identical useEffect(() => { if (previousValue.current === value) return; previousValue.current = value; announce(...); }, [value]) block — the same ~6-line pattern, copy-pasted rather than extracted into one shared hook (e.g. usePreviousValueAnnounce). Worse, the rollout is incomplete: PipelineStatus and ApprovalStatus (Workflow) share the exact same STATUS_MAP architecture as WorkflowStatus but have no announce wiring at all — confirmed by direct grep returning zero useEffect/useRef/announce hits in either file. A caller composing PipelineStatus today gets silent status changes while a caller composing WorkflowStatus gets announced ones, with no structural reason for the difference.",
};

export const RESOLVED: DuplicationEntry[] = [
  {
    title: "Every platform's own \"zero real business-domain logic\" finding, independently re-verified",
    scope: "All eight Platform libraries",
    detail: "Re-confirmed by Platform Certification and re-checked again here: still true, no business-domain logic exists to migrate anywhere in the Platform tier.",
  },
  {
    title: "\"ProductionFeatureMetrics duplicates ProductionMetrics\" — considered and rejected",
    scope: "Production Workspace Feature pilot",
    detail: "Application Composition Certification's own investigated-and-rejected finding, re-confirmed still accurate: a thin feature-owned wrapper choosing a column count for its own layout context is the expected Business Feature → Platform composition pattern, not duplication.",
  },
];

export const DEFERRED: DuplicationEntry[] = [
  {
    title: "CellAlign declared twice inside Foundation Table",
    scope: "src/components/table/TableCell.tsx, TableHead.tsx",
    detail: "See API Consistency — a genuine, still-open internal duplication, LOW severity, unresolved since Foundation Audit first disclosed it.",
  },
  {
    title: "The value-transition announcement pattern above",
    scope: "Operational + Workflow status presets",
    detail: "Not fixed in this audit — extracting a shared hook and back-filling PipelineStatus/ApprovalStatus is a real, bounded code change (touching six files) beyond this audit's own identify-and-classify scope. Recorded in the technical debt register rather than fixed speculatively.",
  },
];

export const DUPLICATION_METHODOLOGY_NOTE =
  "This audit's own contribution is the value-transition announcement finding above, found by reading the live-region wiring the accessibility remediation pass added this session — no prior certification page's scope included re-auditing duplication across Operational and Workflow status presets specifically, since that wiring didn't exist when Workflow Certification and Operational Certification each ran their own audits. Every other duplication finding below was already disclosed by an earlier tier audit and is reclassified here against current source rather than re-investigated from first principles.";
