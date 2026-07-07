"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Card } from "@/components/ui";
import { AnimatedNode, AnimatedConnector, FlowCard, type SystemStatus } from "@/components/illustration";

export interface PlatformNode {
  id: string;
  label: string;
  description?: ReactNode;
  icon?: ReactNode;
  status?: SystemStatus;
}

export interface PlatformCompositionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Label for the central hub node in the architecture diagram. */
  hubLabel?: ReactNode;
  hubIcon?: ReactNode;
  platforms: PlatformNode[];
  /** Which platform starts highlighted. Defaults to the first one. */
  defaultActiveId?: string;
  cta?: ReactNode;
  className?: string;
}

function ArchitectureDiagram({
  hubLabel,
  hubIcon,
  platforms,
  activeId,
  onSelect,
}: {
  hubLabel: ReactNode;
  hubIcon?: ReactNode;
  platforms: PlatformNode[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex min-w-[560px] flex-col items-center">
      <div className="flex flex-col items-center gap-3">
        <AnimatedNode status="active" icon={hubIcon} size="lg" />
        <span className="text-body-sm font-medium text-ink-primary">{hubLabel}</span>
      </div>
      <AnimatedConnector orientation="vertical" active length={32} />
      <div className="relative w-full pt-2">
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 pt-8 sm:grid-cols-4">
          {platforms.map((platform) => {
            const isActive = activeId === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => onSelect(platform.id)}
                className="focus-ring flex flex-col items-center gap-2 rounded-lg"
              >
                <AnimatedConnector orientation="vertical" length={16} active={isActive} />
                <AnimatedNode
                  status={isActive ? "active" : (platform.status ?? "idle")}
                  icon={platform.icon}
                  size="md"
                />
                <span className={cn("text-caption font-medium", isActive ? "text-accent-400" : "text-ink-primary")}>
                  {platform.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * Platform module cards plus a hub-and-spoke architecture diagram. Both
 * views read from and write to the same active-selection state, so
 * clicking either one highlights the same module in both places.
 */
export function PlatformComposition({
  eyebrow,
  title,
  description,
  hubLabel = "StudioPOD Core",
  hubIcon,
  platforms,
  defaultActiveId,
  cta,
  className,
}: PlatformCompositionProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId ?? platforms[0]?.id ?? null);

  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <Card padding="lg" className="scrollbar-none overflow-x-auto">
          <ArchitectureDiagram
            hubLabel={hubLabel}
            hubIcon={hubIcon}
            platforms={platforms}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform) => {
            const isActive = activeId === platform.id;
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => setActiveId(platform.id)}
                className="focus-ring rounded-lg text-left"
              >
                <FlowCard
                  icon={platform.icon}
                  title={platform.label}
                  description={platform.description}
                  status={isActive ? "active" : (platform.status ?? "idle")}
                  className={cn(
                    "h-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)]",
                    isActive && "border-accent-500 bg-accent-soft/40",
                  )}
                />
              </button>
            );
          })}
        </div>

        {cta ? <div className="flex justify-center">{cta}</div> : null}
      </div>
    </SectionShell>
  );
}
