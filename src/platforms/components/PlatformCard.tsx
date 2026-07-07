import { FlowCard } from "@/components/illustration";
import { toSystemStatus } from "@/workflows";
import type { Platform } from "../types";

export interface PlatformCardProps {
  platform: Platform;
  className?: string;
}

/** Summarizes one platform as a card, built directly on the MS-1 FlowCard primitive. */
export function PlatformCard({ platform, className }: PlatformCardProps) {
  return (
    <FlowCard
      icon={platform.icon}
      title={platform.name}
      description={platform.description}
      status={toSystemStatus(platform.status ?? "idle")}
      className={className}
    />
  );
}
