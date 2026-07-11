import { ProductionMetrics } from "@/components/platform/production";
import type { StatGroupItem } from "@/components/metadata";

interface ProductionFeatureMetricsProps {
  items: StatGroupItem[];
}

/**
 * Feature-level metrics rollup — composes Platform's own ProductionMetrics
 * (a re-export of Workflow's PipelineMetrics) directly. The Business
 * Feature owns computing `items` from its own artwork state; this
 * component only renders what it's given. Two columns, not four — this
 * renders inside the Dashboard view's own narrow main-content column
 * (squeezed further by the sidebar), and StatGroup's own responsive grid
 * reads the viewport breakpoint, not this container's actual width.
 */
export function ProductionFeatureMetrics({ items }: ProductionFeatureMetricsProps) {
  return <ProductionMetrics items={items} columns={2} />;
}
