import { Expand } from "@/motion";
import { StatusBadge, HealthIndicator } from "@/illustrations";
import { Body, Caption } from "@/components/ui";
import { getIncoming, getOutgoing } from "../utils";
import type { Platform, PlatformArchitecture } from "../types";

export interface PlatformDetailsPanelProps {
  platform: Platform;
  architecture: PlatformArchitecture;
  open?: boolean;
  className?: string;
}

/** An expandable panel of a platform's detail: status/health, capabilities, domains, and its incoming/outgoing relationships. */
export function PlatformDetailsPanel({ platform, architecture, open = false, className }: PlatformDetailsPanelProps) {
  const incoming = getIncoming(platform.id, architecture.relationships);
  const outgoing = getOutgoing(platform.id, architecture.relationships);
  const platformById = new Map(architecture.platforms.map((item) => [item.id, item]));

  return (
    <Expand open={open} className={className}>
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          {platform.status && <StatusBadge status={platform.status} />}
          {platform.health && <HealthIndicator health={platform.health} />}
        </div>

        {platform.description && (
          <Body size="sm" muted>
            {platform.description}
          </Body>
        )}

        {platform.capabilities && platform.capabilities.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <Caption className="uppercase tracking-wide">Capabilities</Caption>
            <ul className="flex flex-col gap-1">
              {platform.capabilities.map((capability) => (
                <li key={capability.id} className="text-body-sm text-ink-primary">
                  {capability.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {platform.domains && platform.domains.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <Caption className="uppercase tracking-wide">Domains</Caption>
            <ul className="flex flex-col gap-1">
              {platform.domains.map((domain) => (
                <li key={domain.id} className="text-body-sm text-ink-primary">
                  {domain.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(incoming.length > 0 || outgoing.length > 0) && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Caption className="uppercase tracking-wide">Incoming</Caption>
              {incoming.length === 0 ? (
                <Caption className="text-ink-tertiary">None</Caption>
              ) : (
                <ul className="flex flex-col gap-1">
                  {incoming.map((relationship) => (
                    <li key={relationship.id} className="text-body-sm text-ink-primary">
                      {platformById.get(relationship.source)?.name ?? relationship.source}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Caption className="uppercase tracking-wide">Outgoing</Caption>
              {outgoing.length === 0 ? (
                <Caption className="text-ink-tertiary">None</Caption>
              ) : (
                <ul className="flex flex-col gap-1">
                  {outgoing.map((relationship) => (
                    <li key={relationship.id} className="text-body-sm text-ink-primary">
                      {platformById.get(relationship.target)?.name ?? relationship.target}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </Expand>
  );
}
