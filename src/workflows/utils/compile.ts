import type { Diagram, DiagramNode, DiagramConnection } from "@/illustrations";
import type { Workflow } from "../types";
import { resolveStepStatus } from "./status";

/**
 * Compiles a Workflow (steps + connections + branches) into a plain
 * illustration-engine Diagram. This is the only place workflow data ever
 * turns into node/connection objects — every workflow component that
 * renders a diagram goes through this, so there is exactly one
 * translation to keep correct.
 */
export function compileWorkflowToDiagram(workflow: Workflow, selectedStepId?: string): Diagram {
  const stepById = new Map(workflow.steps.map((step) => [step.id, step]));

  const nodes: DiagramNode[] = workflow.steps.map((step) => ({
    id: step.id,
    label: step.title,
    subtitle: step.subtitle,
    icon: step.icon,
    status: resolveStepStatus(step),
    health: step.health,
    badge: step.badge,
    selected: step.id === selectedStepId,
  }));

  function isReached(id: string): boolean {
    const step = stepById.get(id);
    return Boolean(step && (step.completed || step.active));
  }

  const connections: DiagramConnection[] = workflow.connections.map((connection) => {
    const sourceDone = stepById.get(connection.source)?.completed ?? false;
    const targetReached = isReached(connection.target);
    return {
      id: connection.id,
      source: connection.source,
      target: connection.target,
      label: connection.label,
      direction: connection.loop ? "backward" : "forward",
      status: sourceDone && targetReached ? "flowing" : sourceDone ? "active" : "inactive",
    };
  });

  const branchConnections: DiagramConnection[] = (workflow.branches ?? []).flatMap((branch) => {
    const sourceDone = stepById.get(branch.from)?.completed ?? false;
    return branch.to.map((targetId) => ({
      id: `${branch.id}-${targetId}`,
      source: branch.from,
      target: targetId,
      label: branch.label,
      direction: "forward" as const,
      status: (sourceDone && isReached(targetId) ? "flowing" : sourceDone ? "active" : "inactive") as DiagramConnection["status"],
    }));
  });

  return { nodes, connections: [...connections, ...branchConnections] };
}
