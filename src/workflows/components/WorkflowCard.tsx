import { FlowCard } from "@/components/illustration";
import { toSystemStatus, resolveStepStatus } from "../utils";
import type { WorkflowStep } from "../types";

export interface WorkflowCardProps {
  step: WorkflowStep;
  className?: string;
}

/** Summarizes one workflow step as a card — built directly on the MS-1 FlowCard primitive. */
export function WorkflowCard({ step, className }: WorkflowCardProps) {
  return (
    <FlowCard
      icon={step.icon}
      title={step.title}
      description={step.description ?? step.subtitle}
      status={toSystemStatus(resolveStepStatus(step))}
      className={className}
    />
  );
}
