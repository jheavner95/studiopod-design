import { StatusBadge, type NodeStatus } from "@/illustrations";
import { Caption } from "@/components/ui";
import { cn } from "@/lib/utils";
import { RELATIONSHIP_STYLE } from "../utils";
import type { PlatformArchitecture, PlatformRelationshipType } from "../types";

const ALL_STATUSES: NodeStatus[] = ["idle", "active", "processing", "complete", "warning", "error"];

const RELATIONSHIP_LABEL: Record<PlatformRelationshipType, string> = {
  dependency: "Dependency",
  "data-flow": "Data flow",
  integration: "Integration",
  composition: "Composition",
};

const DASH_ARRAY: Record<PlatformRelationshipType, string | undefined> = {
  dependency: "6 4",
  "data-flow": undefined,
  integration: "2 4",
  composition: undefined,
};

export interface PlatformLegendProps {
  architecture: PlatformArchitecture;
  /** Show only statuses/relationship types present in the architecture. Defaults to the full canonical sets. */
  onlyPresent?: boolean;
  className?: string;
}

/** A legend of the statuses and relationship types used in an architecture, built on StatusBadge plus the same dash styles the diagram actually draws. */
export function PlatformLegend({ architecture, onlyPresent = false, className }: PlatformLegendProps) {
  const statuses = onlyPresent
    ? ALL_STATUSES.filter((status) => architecture.platforms.some((platform) => platform.status === status))
    : ALL_STATUSES;

  const relationshipTypes = onlyPresent
    ? (Object.keys(RELATIONSHIP_STYLE) as PlatformRelationshipType[]).filter((type) =>
        architecture.relationships.some((relationship) => relationship.relationshipType === type),
      )
    : (Object.keys(RELATIONSHIP_STYLE) as PlatformRelationshipType[]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {relationshipTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <svg width="28" height="8" viewBox="0 0 28 8" aria-hidden>
              <line
                x1="0"
                y1="4"
                x2="28"
                y2="4"
                stroke="var(--color-accent-500)"
                strokeWidth={2}
                strokeDasharray={DASH_ARRAY[type]}
              />
            </svg>
            <Caption>{RELATIONSHIP_LABEL[type]}</Caption>
          </div>
        ))}
      </div>
    </div>
  );
}
