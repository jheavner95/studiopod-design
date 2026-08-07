/**
 * Re-export, not a rebuild. Workflow Framework's own Workflow (header/
 * sidebar/scrollable-body/footer/loading/empty shell, itself composing
 * Operational Inspector Panel directly) already generalizes perfectly to a
 * guided wizard — the wizard-specific pieces (steps, connectors,
 * navigation) are separate components a caller composes into its header/
 * children/footer slots, not something the root shell itself needs new
 * props for.
 */
export { Workflow as WorkflowStepper } from "./Workflow";
