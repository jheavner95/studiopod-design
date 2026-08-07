/**
 * Re-export, not a rebuild. Dependency & Relationship Views' own
 * DependencyGroup (a structural boundary around nodes that happen to
 * belong together, built on Foundation Layout's Grid) already covers a
 * workflow visualization's own node clusters — checked directly against
 * WorkflowStageGroup (groups stages that run in the same pass) and
 * PipelineBranch (marks a genuine fork), neither of which fits a plain
 * "these nodes belong together" boundary. DependencyGroup's own doc
 * comment already draws the identical distinction against the
 * illustration-canvas layer's own IllustrationGroup, so this reuse carries
 * that reasoning forward rather than re-stating it in a third file.
 */
export { DependencyGroup as WorkflowGroup } from "./DependencyGroup";
