/**
 * Re-export, not a rebuild. Pipeline Components' own PipelineGate (composing
 * Approval & Review's own ApprovalDecision/ApprovalStatus directly, keyed
 * to ApprovalStateValue) already covers "does this artifact clear its
 * quality gate" exactly — checked directly against all three status
 * vocabularies already in this tier (WorkflowStateValue, StateValue,
 * ApprovalStateValue): none has a literal "Validated" member, because
 * Validated isn't a missing lifecycle state, it's the ApprovalStateValue
 * outcome "approved" (with "rejected" as its failure case) — a gate
 * decision, not a ninth status value. Declaring a new ProductionStatusValue
 * here would duplicate ApprovalStateValue for no structural reason, the
 * same discipline that kept every lower-tier package from inventing a
 * redundant vocabulary where an existing one already fit.
 */
export { PipelineGate as ProductionValidationPanel } from "@/components/workflow";
