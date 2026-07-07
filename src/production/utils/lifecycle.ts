import type { Workflow, WorkflowStep, WorkflowConnection } from "@/workflows";
import type { ProductionArtifact } from "../types";
import { toNodeStatus } from "./status";

/**
 * Converts an ordered list of artifacts into a plain Workflow value so an
 * artifact's lifecycle renders through the existing Workflow Engine
 * (WorkflowDiagram et al.) instead of a bespoke lifecycle renderer.
 */
export function compileArtifactsToWorkflow(artifacts: ProductionArtifact[], title = "Artifact Lifecycle"): Workflow {
  const steps: WorkflowStep[] = artifacts.map((artifact) => ({
    id: artifact.id,
    title: artifact.name,
    subtitle: artifact.type,
    icon: artifact.icon,
    status: artifact.status ? toNodeStatus(artifact.status) : undefined,
    health: artifact.health,
    description: artifact.version ? `Version ${artifact.version}` : undefined,
  }));

  const connections: WorkflowConnection[] = artifacts.slice(1).map((artifact, index) => ({
    id: `${artifacts[index].id}-${artifact.id}`,
    source: artifacts[index].id,
    target: artifact.id,
  }));

  return { id: "artifact-lifecycle", title, pattern: "linear", steps, connections };
}
