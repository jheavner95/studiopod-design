"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionShell } from "@/components/layout";
import { SectionHeader, Card, Expandable } from "@/components/ui";
import { StaggerGroup, StaggerItem } from "@/components/motion";
import { AnimatedNode, AnimatedConnector, PipelineStep, type SystemStatus } from "@/components/illustration";

export interface WorkflowStep {
  id: string;
  label: string;
  summary: ReactNode;
  /** When present, the step card becomes expandable and reveals this on click. */
  details?: ReactNode;
  status?: SystemStatus;
  icon?: ReactNode;
}

export interface WorkflowCompositionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  steps: WorkflowStep[];
  /** A pre-built <CTAGroup> or <Button>, centered below the steps. */
  cta?: ReactNode;
  className?: string;
}

function AnimatedPipeline({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="scrollbar-none overflow-x-auto">
      <div className="flex w-max items-start justify-center gap-2 px-1 sm:w-full">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <PipelineStep
              index={index + 1}
              icon={step.icon}
              label={step.label}
              description={step.summary}
              status={step.status ?? "idle"}
            />
            {index < steps.length - 1 ? (
              <div className="pt-4">
                <AnimatedConnector active={step.status === "success" || step.status === "active"} length={56} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowStepCard({
  step,
  index,
  isOpen,
  onOpenChange,
}: {
  step: WorkflowStep;
  index: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const header = (
    <div className="flex flex-1 items-center gap-4">
      <AnimatedNode
        status={step.status ?? "idle"}
        icon={step.icon ?? <span className="text-body-sm font-medium">{index + 1}</span>}
        size="sm"
      />
      <div className="flex flex-1 flex-col gap-0.5 text-left">
        <span className="text-body-md font-medium text-ink-primary">{step.label}</span>
        <span className="text-caption text-ink-tertiary">{step.summary}</span>
      </div>
      {step.details ? (
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-ink-tertiary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
            isOpen && "rotate-180",
          )}
        />
      ) : null}
    </div>
  );

  if (!step.details) {
    return <Card padding="md">{header}</Card>;
  }

  return (
    <Card padding="md">
      <Expandable
        open={isOpen}
        onOpenChange={onOpenChange}
        trigger={header}
        contentClassName="pl-16 pt-4 text-body-sm text-ink-secondary"
      >
        {step.details}
      </Expandable>
    </Card>
  );
}

/** Explains a sequential process: an animated pipeline up top, expandable detail cards below. */
export function WorkflowComposition({ eyebrow, title, description, steps, cta, className }: WorkflowCompositionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionShell spacing="lg" className={className}>
      <div className="flex flex-col gap-14">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <AnimatedPipeline steps={steps} />
        <StaggerGroup className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <StaggerItem key={step.id}>
              <WorkflowStepCard
                step={step}
                index={index}
                isOpen={openId === step.id}
                onOpenChange={(open) => setOpenId(open ? step.id : null)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
        {cta ? <div className="flex justify-center pt-2">{cta}</div> : null}
      </div>
    </SectionShell>
  );
}
