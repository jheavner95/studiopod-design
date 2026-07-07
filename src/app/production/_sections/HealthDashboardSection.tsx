import { HealthDashboardDiagram } from "@/production";
import { productionHealthMetrics } from "@/production/examples";
import { PreviewSection } from "../_components/preview-primitives";

/** The rolled-up health of the production system, built on a responsive grid of ProductionHealthCard. */
export function HealthDashboardSection() {
  return (
    <PreviewSection
      id="health-dashboard"
      eyebrow="health dashboard"
      title="Production health"
      description="Jobs, queue depth, errors, warnings, completions, average time, and an overall health score."
    >
      <HealthDashboardDiagram metrics={productionHealthMetrics} />
    </PreviewSection>
  );
}
