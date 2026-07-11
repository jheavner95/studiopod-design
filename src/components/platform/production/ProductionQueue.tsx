/**
 * Re-export, not a rebuild. Operational's own Queue<T extends QueueRowJob>
 * (real selection state, filtering, bulk-action integration, Foundation
 * Table rows underneath) already covers the render/print queue exactly —
 * checked directly against its full prop surface and found fully generic
 * over the job type, nothing operational-specific baked in that a
 * Production job type couldn't satisfy.
 */
export { Queue as ProductionQueue } from "@/components/operational";
