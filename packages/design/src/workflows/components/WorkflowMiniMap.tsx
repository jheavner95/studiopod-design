import { Fragment } from "react";
import { AnimatedNode, AnimatedConnector } from "@/components/illustration";
import { cn } from "@/lib/utils";
import { toSystemStatus, resolveStepStatus } from "../utils";
import type { Workflow } from "../types";

export interface WorkflowMiniMapProps {
  workflow: Workflow;
  activeStepId?: string;
  className?: string;
}

/** A compact, label-less overview of a workflow's steps, built directly on AnimatedNode and AnimatedConnector. */
export function WorkflowMiniMap({ workflow, activeStepId, className }: WorkflowMiniMapProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {workflow.steps.map((step, index) => {
        const isActive = activeStepId ? step.id === activeStepId : step.active;
        const status = isActive ? "active" : toSystemStatus(resolveStepStatus(step));
        const nextStep = workflow.steps[index + 1];
        const nextActive = nextStep && (activeStepId ? nextStep.id === activeStepId : nextStep.active);
        const connectorActive = Boolean(step.completed || isActive) && !nextActive;

        return (
          <Fragment key={step.id}>
            <AnimatedNode status={status} icon={step.icon} size="sm" />
            {nextStep && <AnimatedConnector length={32} active={connectorActive} />}
          </Fragment>
        );
      })}
    </div>
  );
}
