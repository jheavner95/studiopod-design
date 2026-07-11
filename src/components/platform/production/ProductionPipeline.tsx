/**
 * Re-export, not a rebuild. Pipeline Components' own Pipeline (itself a
 * re-export of Workflow Framework's own Workflow) already covers the
 * production-run shell — checked directly, no DS-3.5 file bundles
 * Pipeline+PipelineConnector+PipelineGate together into a single wrapper;
 * every existing consumer composes stage/gate content as children at the
 * call site, the same "shell only, caller arranges content" precedent
 * ProductionStagePanel and ProductionWorkspace both already follow.
 */
export { Pipeline as ProductionPipeline } from "@/components/workflow";
