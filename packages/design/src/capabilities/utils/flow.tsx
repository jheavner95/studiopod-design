import type { Workflow, WorkflowStep, WorkflowConnection } from "@/workflows";
import { toNodeStatus } from "./status";
import type { CapabilityFlow } from "../types";

/**
 * Converts a CapabilityFlow into a plain Workflow value so it renders
 * through the existing Workflow Engine (WorkflowDiagram et al.) instead of
 * a bespoke capability-flow renderer.
 */
export function compileFlowToWorkflow(flow: CapabilityFlow): Workflow {
  const steps: WorkflowStep[] = flow.stages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    subtitle: stage.subtitle,
    icon: stage.icon,
    status: stage.status ? toNodeStatus(stage.status) : undefined,
    description: stage.description,
  }));

  const connections: WorkflowConnection[] = flow.stages.slice(1).map((stage, index) => ({
    id: `${flow.stages[index].id}-${stage.id}`,
    source: flow.stages[index].id,
    target: stage.id,
  }));

  return { id: flow.id, title: flow.title, description: flow.description, pattern: "linear", steps, connections };
}
