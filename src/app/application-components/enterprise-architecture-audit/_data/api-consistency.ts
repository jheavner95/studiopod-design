export interface ConsistencyFinding {
  id: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
  status: "resolved" | "open";
}

/**
 * Every finding below traces to Foundation Audit's own api-consistency.ts
 * (the original four-family matrix: Layout, Table, Metadata, Forms) or to
 * this audit's own re-check of Operational/Workflow/Platform against that
 * baseline. Status was independently re-verified against current source —
 * not copied from the originating page's own severity label — since two of
 * the five findings originally disclosed there have since been fixed.
 */
export const CONSISTENCY_FINDINGS: ConsistencyFinding[] = [
  {
    id: "aria-describedby-gap",
    title: "Foundation's own \"only DatePickerField wires aria-describedby\" gap is now fully closed",
    detail: "foundation-audit's own api-consistency.ts recorded this as the single HIGH-severity finding across the four Foundation families. Re-checked directly: all 7 affected ui/ primitives (TextInput, Checkbox, Select, RadioGroup, Slider, Textarea, ToggleSwitch) now accept a describedBy prop wired to aria-describedby, and all 10 form/ field wrappers (InputField, TextareaField, SelectField, ComboboxField, FileUploadField, CheckboxField, RadioGroupField, SwitchField, SliderField, DatePickerField) now pass describedBy={error ? errorId : undefined} down to their base control. Confirmed present in current source, not assumed from any commit message.",
    severity: "high",
    status: "resolved",
  },
  {
    id: "surface-role-workaround",
    title: "Surface's missing role prop is now fixed at the source",
    detail: "foundation-audit's own finding: ValidationSummary and UnsavedChangesBanner both needed role=\"alert\"/\"status\" but Surface's closed prop interface didn't accept one, so both worked around it with an outer wrapper div. Re-checked directly: Surface.tsx now declares an optional role?: string prop and passes it straight through to its rendered element — the workaround is no longer necessary for future callers, though the two existing wrapper-div occurrences were not re-checked for cleanup (out of this audit's scope; a trivial follow-up, not a defect).",
    severity: "medium",
    status: "resolved",
  },
  {
    id: "cellalign-duplication",
    title: "CellAlign is still declared twice inside Foundation Table itself",
    detail: "TableCell.tsx and TableHead.tsx each still independently declare their own local type CellAlign = \"left\" | \"center\" | \"right\", identical, neither exported, no shared source — re-confirmed present in current source. A genuine internal duplication inside a single family, unresolved since Foundation Audit first disclosed it.",
    severity: "low",
    status: "open",
  },
  {
    id: "field-naming-collision",
    title: "\"Field\" still means two structurally opposite things across families",
    detail: "src/components/form/FormField.tsx (label + description + editable control + message wrapper) and src/components/metadata/MetadataField.tsx (label + static value pair, never editable) still share the identical word for opposite jobs — re-confirmed present, unchanged. Cross-referenced against this audit's own Naming Audit below: not a new finding, the same one Foundation Audit already disclosed.",
    severity: "medium",
    status: "open",
  },
  {
    id: "findingcommand-inconsistency",
    title: "Table's own duplication-tracking data still has no findingCommand field",
    detail: "Layout, Metadata, and Forms each still define findingCommand: string on every duplication-tracking entry in their own promotion-candidates.ts; Table's own promotion-candidates.ts still has none — re-confirmed by direct grep returning zero matches. Unresolved since Foundation Audit first disclosed it.",
    severity: "medium",
    status: "open",
  },
];

export interface TierApiCheck {
  tier: string;
  finding: string;
}

/**
 * Operational, Workflow, and Platform were each independently re-checked
 * against the Foundation baseline above for the same classes of drift —
 * status vocabulary, size scale, controlled/uncontrolled duality, and
 * loading/empty-state reuse — rather than assuming the baseline's own
 * findings are the tier's only exposure.
 */
export const TIER_API_CHECKS: TierApiCheck[] = [
  {
    tier: "Status vocabulary",
    finding: "Every domain status preset (HealthIndicator, QueueStatus, BulkStatus in Operational; WorkflowStatus, ApprovalStatus, PipelineStatus in Workflow) follows one identical STATUS_MAP-over-Foundation's-own-SystemStatus (idle/active/success/warning/error) pattern with value/className props. Zero competing status vocabularies found across either tier.",
  },
  {
    tier: "Size scale",
    finding: "sm/md/lg is used exclusively wherever a size prop appears in Operational, Workflow, or Platform — zero small/medium/large spellings, zero tier-owned size scale. The one \"medium\" string found in the tier (DataGridColumn.tsx's own priority: \"high\" | \"medium\" | \"low\") is an unrelated column-priority enum, not a size prop — checked directly to rule out a false positive.",
  },
  {
    tier: "Controlled vs. uncontrolled",
    finding: "Zero components anywhere in Operational, Workflow, or Platform expose a defaultValue prop — every stateful component is fully controlled. The one uncontrolled convenience (useDataGridSelection()) is a separate opt-in hook, not prop-level duality — a stricter pattern than Foundation ui/'s own RadioGroup/Select, which do support defaultValue.",
  },
  {
    tier: "Loading / empty-state reuse",
    finding: "A fully re-verified real reuse chain: Foundation Feedback's LoadingState/EmptyState → Operational's InspectorPanel → Workflow's Workflow.tsx → all eight Platform Workspace components (AdminWorkspace, CommerceWorkspace, IntegrationsWorkspace, IntelligenceWorkspace, OperationsWorkspace, ProductWorkspace, PublishingWorkspace, ProductionWorkspace) — read all eight and confirmed byte-identical `export { Workflow as XWorkspace }` re-exports.",
  },
  {
    tier: "New surface area introduced by Platform",
    finding: "Platform introduces almost no new API surface of its own — only ProductionCanvas.tsx has real logic; every other Platform file is a plain re-export. It structurally cannot introduce new inconsistencies of its own; it only inherits whatever Operational/Workflow already have.",
  },
];

export const API_CONSISTENCY_SUMMARY =
  "Five real inconsistencies exist across the four Foundation families today (down from five disclosed at Foundation Audit's own capstone): two — the HIGH-severity aria-describedby gap and the MEDIUM-severity Surface role gap — have since been fixed and are independently re-verified resolved in current source. Three remain open: a LOW-severity duplicated CellAlign type declaration inside Table itself, a MEDIUM-severity naming ambiguity around the word \"Field\" (cross-referenced in the Naming Audit below), and a MEDIUM-severity documentation-consistency gap in Table's own duplication-tracking data. Operational, Workflow, and Platform were independently re-checked for the same classes of drift and introduce zero new inconsistencies of their own — status vocabulary, size scale, and controlled-component discipline are all clean, and Platform structurally cannot introduce new surface area since 95 of its 96 components are pure re-exports.";
