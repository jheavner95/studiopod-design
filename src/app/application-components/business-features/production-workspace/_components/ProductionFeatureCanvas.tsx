import { cn } from "@/lib/utils";
import { ProductionCanvas as ProductionFeatureViewport, ProductionStagePanel, ProductionQueue } from "@/components/platform/production";
import { WorkflowStep, type WorkflowStateValue } from "@/components/workflow";
import type { QueueRowJob } from "@/components/operational";
import { PRODUCTION_STAGES, type ProductionArtwork } from "../_data/mock-production";
import type { ProductionView } from "../_hooks/useProductionWorkspace";
import { ProductionFeatureMetrics } from "./ProductionFeatureMetrics";
import type { StatGroupItem } from "@/components/metadata";

interface ProductionFeatureCanvasProps {
  view: ProductionView;
  artworksByStage: Map<string, ProductionArtwork[]>;
  queueJobs: QueueRowJob[];
  selectedId: string | null;
  metrics: StatGroupItem[];
  onSelect: (id: string) => void;
  onQueueRowClick: (job: QueueRowJob) => void;
}

function stepStatus(artwork: ProductionArtwork): WorkflowStateValue {
  if (artwork.issues.some((issue) => issue.severity === "error" && !issue.resolved)) return "blocked";
  if (artwork.validationStatus === "complete") return "completed";
  return "running";
}

/**
 * The feature's own Primary View — switches between three views the
 * feature itself owns (DS-5.2's own "feature-level view switching"), each
 * composing certified Platform/Workflow/Operational components only:
 * pipeline (ProductionPipeline + ProductionStagePanel + WorkflowStep),
 * queue (ProductionQueue), and dashboard (ProductionFeatureMetrics).
 */
export function ProductionFeatureCanvas({ view, artworksByStage, queueJobs, selectedId, metrics, onSelect, onQueueRowClick }: ProductionFeatureCanvasProps) {
  if (view === "queue") {
    return <ProductionQueue title="Render queue" caption={`${queueJobs.length} jobs`} jobs={queueJobs} onRowClick={onQueueRowClick} />;
  }

  if (view === "dashboard") {
    return (
      <div className="flex flex-col gap-6">
        <ProductionFeatureMetrics items={metrics} />
      </div>
    );
  }

  return (
    <ProductionFeatureViewport maxHeight="640px">
      <div className="flex flex-col gap-4 p-1">
        {PRODUCTION_STAGES.map((stage) => {
          const artworks = artworksByStage.get(stage.id) ?? [];
          const stageStatus: WorkflowStateValue = artworks.length > 0 ? "running" : "not-started";
          return (
            <ProductionStagePanel key={stage.id} title={stage.label} status={stageStatus}>
              {artworks.length === 0 ? (
                <p className="px-2 py-1 text-body-sm text-ink-tertiary">No artwork in this stage.</p>
              ) : (
                artworks.map((artwork) => {
                  const isSelected = selectedId === artwork.id;
                  return (
                    <div
                      key={artwork.id}
                      className={cn("rounded-md", isSelected && "ring-2 ring-accent-400")}
                    >
                      <WorkflowStep
                        label={
                          <>
                            {artwork.name}
                            {isSelected ? <span className="sr-only"> (selected)</span> : null}
                          </>
                        }
                        description={artwork.batchRun ? `${artwork.sku} · ${artwork.assignee} · ${artwork.batchRun}` : `${artwork.sku} · ${artwork.assignee}`}
                        status={stepStatus(artwork)}
                        onClick={() => onSelect(artwork.id)}
                      />
                    </div>
                  );
                })
              )}
            </ProductionStagePanel>
          );
        })}
      </div>
    </ProductionFeatureViewport>
  );
}
