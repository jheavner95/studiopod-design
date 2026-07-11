/**
 * Re-export, not a rebuild. Pipeline Components' own PipelineStage (itself
 * a re-export of Workflow Framework's own WorkflowStage: title/status/
 * children) already covers a titled group of production steps — Proofing,
 * Printing, QA, Shipped — checked directly against its full prop surface
 * and found a 1:1 match, no Production-specific field needed.
 */
export { PipelineStage as ProductionStagePanel } from "@/components/workflow";
