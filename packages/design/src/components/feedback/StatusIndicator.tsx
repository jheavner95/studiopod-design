/**
 * Re-export, not a rebuild. src/components/illustration/StatusIndicator.tsx
 * already covers this exactly — a status dot (idle/active/success/warning/error)
 * plus label, pulsing only for in-progress states — the same shared-ownership
 * precedent as this family's own ValidationSummary and Skeleton re-exports.
 */
export { StatusIndicator, type SystemStatus } from "@/components/illustration";
