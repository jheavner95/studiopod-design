/**
 * Re-export, not a rebuild. Workflow Framework's own WorkflowHeader
 * (icon/name/type/children — IdentityBlock underneath) already covers "what
 * is this, and where does it stand," checked directly against its full
 * prop surface. No Production-specific default was added: `type` already
 * holds the per-instance entity label ("Print Job," "Creative Brief"), so
 * hard-coding a "Production" default would fight the field's own purpose
 * rather than help it. Consistent with every DS-3.5–3.8 package, none of
 * which built a per-tier Header wrapper either.
 */
export { WorkflowHeader as ProductionHeader } from "@/components/workflow";
