/**
 * Re-export, not a rebuild. Pipeline Components' own PipelineMetrics
 * (itself a thin StatGroup preset, domain-agnostic) already covers a
 * production run's own measured numbers — throughput, cycle time, defect
 * rate — checked directly against its full prop surface (items/columns/
 * className) and found fully generic.
 */
export { PipelineMetrics as ProductionMetrics } from "@/components/workflow";
