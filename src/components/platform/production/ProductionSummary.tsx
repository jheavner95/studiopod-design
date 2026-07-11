/**
 * Re-export, not a rebuild. Pipeline Components' own PipelineSummary
 * (itself a re-export of Workflow Framework's own WorkflowSummary, a
 * StatGroup preset) already covers a production run's own at-a-glance
 * overview row — checked directly and found fully generic, no Production-
 * specific field needed.
 */
export { PipelineSummary as ProductionSummary } from "@/components/workflow";
