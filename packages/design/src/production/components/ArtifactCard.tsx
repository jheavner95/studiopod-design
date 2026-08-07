import { FlowCard } from "@/components/illustration";
import { HealthIndicator } from "@/illustrations";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { toSystemStatus } from "../utils";
import type { ProductionArtifact } from "../types";

export interface ArtifactCardProps {
  artifact: ProductionArtifact;
  className?: string;
}

/** Summarizes one artifact as a card, built directly on the MS-1 FlowCard primitive. */
export function ArtifactCard({ artifact, className }: ArtifactCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FlowCard
        icon={artifact.icon}
        title={artifact.name}
        description={artifact.type}
        status={toSystemStatus(artifact.status ?? "pending")}
      />
      <div className="flex items-center gap-2 px-1">
        {artifact.health && <HealthIndicator health={artifact.health} />}
        {artifact.version && <Caption className="text-ink-tertiary">v{artifact.version}</Caption>}
      </div>
    </div>
  );
}
