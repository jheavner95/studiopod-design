import { ProgressRail } from "@/components/illustration";
import { toSystemStatus, resolveStepStatus } from "../utils";
import type { Workflow } from "../types";

export interface WorkflowRailProps {
  workflow: Workflow;
  className?: string;
}

/** A compact horizontal rail of a workflow's steps — built directly on the MS-1 ProgressRail primitive. */
export function WorkflowRail({ workflow, className }: WorkflowRailProps) {
  const steps = workflow.steps.map((step) => ({
    label: step.title,
    status: toSystemStatus(resolveStepStatus(step)),
    icon: step.icon,
  }));

  return <ProgressRail steps={steps} className={className} />;
}
