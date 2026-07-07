import { FlowCard } from "@/components/illustration";
import { toSystemStatus } from "../utils";
import type { Capability } from "../types";

export interface CapabilityCardProps {
  capability: Capability;
  className?: string;
}

/** Summarizes one capability as a card, built directly on the MS-1 FlowCard primitive. */
export function CapabilityCard({ capability, className }: CapabilityCardProps) {
  return (
    <FlowCard
      icon={capability.icon}
      title={capability.name}
      description={capability.description ?? capability.category}
      status={capability.status ? toSystemStatus(capability.status) : "idle"}
      className={className}
    />
  );
}
