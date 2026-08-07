import { FlowCard } from "@/components/illustration";
import { HealthIndicator } from "@/illustrations";
import { Caption, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { toSystemStatus, toNodeHealth } from "../utils";
import type { CapabilityProvider } from "../types";

export interface ProviderCardProps {
  provider: CapabilityProvider;
  className?: string;
}

/** Summarizes one provider as a card, built directly on the MS-1 FlowCard primitive. */
export function ProviderCard({ provider, className }: ProviderCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FlowCard
        icon={provider.icon}
        title={provider.name}
        description={provider.status === "preferred" ? "Preferred provider" : provider.status === "fallback" ? "Fallback provider" : undefined}
        status={provider.status ? toSystemStatus(provider.status) : "idle"}
      />
      <div className="flex items-center gap-2 px-1">
        {provider.health && <HealthIndicator health={toNodeHealth(provider.health)} />}
        {typeof provider.priority === "number" && <Caption className="text-ink-tertiary">Priority {provider.priority}</Caption>}
        {provider.available === false && (
          <Badge tone="error" size="sm">
            Unavailable
          </Badge>
        )}
      </div>
    </div>
  );
}
