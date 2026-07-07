import { StatusBadge, HealthIndicator, type NodeStatus, type NodeHealth } from "@/illustrations";
import { Caption } from "@/components/ui";
import { PreviewSection } from "../_components/preview-primitives";

const STATUSES: NodeStatus[] = ["idle", "active", "processing", "complete", "warning", "error"];
const HEALTHS: NodeHealth[] = ["healthy", "degraded", "critical"];

export function StatusGallerySection() {
  return (
    <PreviewSection
      id="status-gallery"
      eyebrow="status gallery"
      title="Status & health"
      description="StatusBadge maps a node's workflow status to the existing Badge primitive. HealthIndicator maps a health signal to a pulsing dot, entirely independent of status."
    >
      <div className="flex flex-col gap-8">
        <div>
          <Caption className="mb-4">Node status</Caption>
          <div className="flex flex-wrap gap-3">
            {STATUSES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </div>
        <div>
          <Caption className="mb-4">Health (independent of status)</Caption>
          <div className="flex flex-wrap gap-6">
            {HEALTHS.map((health) => (
              <div key={health} className="flex items-center gap-2">
                <HealthIndicator health={health} />
                <span className="text-body-sm text-ink-secondary">{health}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
