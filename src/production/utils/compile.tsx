import type { Diagram, DiagramNode, DiagramConnection } from "@/illustrations";
import { Badge } from "@/components/ui";
import { toNodeStatus, resolveStageStatus } from "./status";
import { resolveGateStatus } from "./gates";
import type { ValidationStage, ProductionPipeline, QualityGate } from "../types";

export function compileStageToNode(stage: ValidationStage, selectedStageId?: string): DiagramNode {
  const status = resolveStageStatus(stage);
  return {
    id: stage.id,
    label: stage.title,
    subtitle: stage.description,
    icon: stage.icon,
    status: toNodeStatus(status),
    selected: stage.id === selectedStageId,
    disabled: status === "archived",
    badge: stage.blocking && status !== "passed" && status !== "completed" ? <Badge tone="error" size="sm">Blocking</Badge> : undefined,
  };
}

function autoChainConnections(stages: ValidationStage[]): DiagramConnection[] {
  return stages.slice(1).map((stage, index) => ({
    id: `${stages[index].id}-${stage.id}`,
    source: stages[index].id,
    target: stage.id,
    status: "active",
  }));
}

export interface CompilePipelineOptions {
  selectedStageId?: string;
}

/** The single translation point from pipeline data to the illustration engine's plain Diagram. */
export function compilePipelineToDiagram(
  pipeline: ProductionPipeline,
  options: CompilePipelineOptions = {},
): Diagram {
  const nodes = pipeline.stages.map((stage) => compileStageToNode(stage, options.selectedStageId));
  const connections: DiagramConnection[] = pipeline.connections
    ? pipeline.connections.map((connection) => ({
        id: connection.id,
        source: connection.source,
        target: connection.target,
        label: connection.label,
        status: "active",
      }))
    : autoChainConnections(pipeline.stages);

  return { nodes, connections };
}

export function compileGateToNode(gate: QualityGate, selectedGateId?: string): DiagramNode {
  const status = resolveGateStatus(gate);
  const countBadge =
    (gate.failed ?? 0) > 0 || (gate.warning ?? 0) > 0 ? (
      <Badge tone={(gate.failed ?? 0) > 0 ? "error" : "warning"} size="sm">
        {(gate.failed ?? 0) > 0 ? gate.failed : gate.warning}
      </Badge>
    ) : undefined;

  return {
    id: gate.id,
    label: gate.title,
    subtitle: gate.optional ? "Optional" : undefined,
    icon: gate.icon,
    status: toNodeStatus(status),
    selected: gate.id === selectedGateId,
    badge: countBadge,
  };
}

export interface CompileGatesOptions {
  selectedGateId?: string;
}

/** Compiles a flat list of quality gates into a Diagram, auto-chaining them left to right. */
export function compileGatesToDiagram(gates: QualityGate[], options: CompileGatesOptions = {}): Diagram {
  const nodes = gates.map((gate) => compileGateToNode(gate, options.selectedGateId));
  const connections: DiagramConnection[] = gates.slice(1).map((gate, index) => ({
    id: `${gates[index].id}-${gate.id}`,
    source: gates[index].id,
    target: gate.id,
    status: "active",
  }));

  return { nodes, connections };
}
