import type { ReactNode } from "react";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Metadata } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { AnimatedNode, AnimatedConnector, PipelineStep, type SystemStatus } from "@/components/illustration";

export interface TimelineItem {
  id: string;
  date: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  status?: SystemStatus;
  icon?: ReactNode;
}

export type TimelineOrientation = "vertical" | "horizontal";

export interface TimelineCompositionProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  items: TimelineItem[];
  /** vertical: roadmap/milestone list with full descriptions. horizontal: compact scrollable rail. */
  orientation?: TimelineOrientation;
  className?: string;
}

function VerticalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <StaggerGroup className="flex flex-col">
      {items.map((item, index) => (
        <StaggerItem key={item.id}>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <AnimatedNode
                status={item.status ?? "idle"}
                icon={item.icon ?? <span className="text-body-sm font-medium">{index + 1}</span>}
                size="sm"
              />
              {index < items.length - 1 ? (
                <AnimatedConnector
                  orientation="vertical"
                  length={64}
                  active={item.status === "success" || item.status === "active"}
                />
              ) : null}
            </div>
            <div className="flex flex-col gap-1 pb-10">
              <Metadata>{item.date}</Metadata>
              <span className="text-body-md font-medium text-ink-primary">{item.title}</span>
              {item.description ? (
                <span className="text-body-sm text-ink-secondary">{item.description}</span>
              ) : null}
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

function HorizontalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="scrollbar-none overflow-x-auto">
      <div className="flex w-max items-start justify-center gap-2 px-1 sm:w-full">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-start">
            <PipelineStep icon={item.icon} label={item.title} description={item.date} status={item.status ?? "idle"} />
            {index < items.length - 1 ? (
              <div className="pt-4">
                <AnimatedConnector active={item.status === "success" || item.status === "active"} length={56} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Milestones, roadmaps, conference schedules, platform evolution — a vertical list or a compact horizontal rail. */
export function TimelineComposition({
  eyebrow,
  title,
  description,
  items,
  orientation = "vertical",
  className,
}: TimelineCompositionProps) {
  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        {title ? <SectionHeader eyebrow={eyebrow} title={title} description={description} /> : null}
        {orientation === "horizontal" ? <HorizontalTimeline items={items} /> : <VerticalTimeline items={items} />}
      </div>
    </SectionShell>
  );
}
