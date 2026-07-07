import { Fragment } from "react";
import { AnimatedNode, AnimatedConnector } from "@/components/illustration";
import { toSystemStatus } from "@/workflows";
import { getConnected } from "../utils";
import { cn } from "@/lib/utils";
import type { PlatformArchitecture } from "../types";

export interface PlatformMiniMapProps {
  architecture: PlatformArchitecture;
  activePlatformId?: string;
  className?: string;
}

/** A compact, label-less overview of an architecture's platforms, built directly on AnimatedNode and AnimatedConnector. */
export function PlatformMiniMap({ architecture, activePlatformId, className }: PlatformMiniMapProps) {
  return (
    <div className={cn("flex flex-wrap items-center", className)}>
      {architecture.platforms.map((platform, index) => {
        const isActive = platform.id === activePlatformId;
        const status = isActive ? "active" : toSystemStatus(platform.status ?? "idle");
        const nextPlatform = architecture.platforms[index + 1];
        const connected = nextPlatform
          ? getConnected(platform.id, architecture.relationships).some(
              (relationship) => relationship.source === nextPlatform.id || relationship.target === nextPlatform.id,
            )
          : false;

        return (
          <Fragment key={platform.id}>
            <AnimatedNode status={status} icon={platform.icon} size="sm" />
            {nextPlatform && <AnimatedConnector length={32} active={connected} />}
          </Fragment>
        );
      })}
    </div>
  );
}
