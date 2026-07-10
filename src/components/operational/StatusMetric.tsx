/**
 * Re-export, not a rebuild. Foundation UI's own StatCard (value/label/
 * description/trend) is already the single-metric building block this
 * system needs — pair several with Foundation Metadata's own StatGroup for
 * the grid layout, rather than a second metric-display implementation.
 */
export { StatCard as StatusMetric } from "@/components/ui";
