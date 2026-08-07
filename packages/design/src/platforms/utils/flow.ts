import type { Workflow, WorkflowStep, WorkflowConnection } from "@/workflows";
import type { Platform, PlatformFlow } from "../types";

/**
 * Converts a PlatformFlow into a plain Workflow value so artifact flows can
 * render through the existing Workflow Engine (WorkflowDiagram et al.)
 * instead of a bespoke flow renderer.
 */
export function compileFlowToWorkflow(flow: PlatformFlow, platforms: Platform[] = []): Workflow {
  const platformById = new Map(platforms.map((platform) => [platform.id, platform]));

  const steps: WorkflowStep[] = flow.steps.map((step) => {
    const platform = step.platformId ? platformById.get(step.platformId) : undefined;
    return {
      id: step.id,
      title: step.title,
      subtitle: platform?.shortName ?? platform?.name,
      icon: step.icon ?? platform?.icon,
      description: step.description,
    };
  });

  const connections: WorkflowConnection[] = flow.steps.slice(1).map((step, index) => ({
    id: `${flow.steps[index].id}-${step.id}`,
    source: flow.steps[index].id,
    target: step.id,
  }));

  return {
    id: flow.id,
    title: flow.title,
    description: flow.description,
    pattern: "linear",
    steps,
    connections,
  };
}
