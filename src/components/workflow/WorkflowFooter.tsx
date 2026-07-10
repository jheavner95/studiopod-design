/**
 * Re-export, not a rebuild. Operational Inspector Panel's own
 * InspectorFooter (a sticky bottom bar pinning an actions row) already
 * covers this exactly — nothing inspector-specific in its implementation.
 */
export { InspectorFooter as WorkflowFooter } from "@/components/operational";
