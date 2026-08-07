import type { Diagram, DiagramNode, DiagramConnection, DiagramGroup, ConnectionStyle } from "@/illustrations";
import type { Platform, PlatformRelationship, PlatformArchitecture } from "../types";
import { groupPlatformsByLayer } from "./layers";

/** Exported so PlatformLegend can render swatches that match what the diagram actually draws. */
export const RELATIONSHIP_STYLE: Record<PlatformRelationship["relationshipType"], ConnectionStyle> = {
  dependency: "dashed",
  "data-flow": "solid",
  integration: "dotted",
  composition: "solid",
};

const STRENGTH_WEIGHT: Record<NonNullable<PlatformRelationship["strength"]>, number> = {
  weak: 1,
  medium: 2,
  strong: 3,
};

export function compilePlatformToNode(platform: Platform, selectedPlatformId?: string): DiagramNode {
  return {
    id: platform.id,
    label: platform.shortName ?? platform.name,
    subtitle: platform.shortName ? platform.name : undefined,
    icon: platform.icon,
    status: platform.status,
    health: platform.health,
    selected: platform.id === selectedPlatformId,
  };
}

export interface CompileRelationshipOptions {
  /** When set, connections not touching this platform are dimmed to "inactive" instead of their default emphasis. */
  focusPlatformId?: string;
}

export function compileRelationshipToConnection(
  relationship: PlatformRelationship,
  options: CompileRelationshipOptions = {},
): DiagramConnection {
  const { focusPlatformId } = options;
  const touchesFocus =
    !focusPlatformId || relationship.source === focusPlatformId || relationship.target === focusPlatformId;

  return {
    id: relationship.id,
    source: relationship.source,
    target: relationship.target,
    direction: relationship.direction ?? "forward",
    style: RELATIONSHIP_STYLE[relationship.relationshipType],
    weight: relationship.strength ? STRENGTH_WEIGHT[relationship.strength] : 1,
    animated: relationship.animated ?? true,
    label: relationship.label,
    status: touchesFocus ? (focusPlatformId ? "highlighted" : "active") : "inactive",
  };
}

export interface CompileArchitectureOptions {
  selectedPlatformId?: string;
  /** Dims every relationship not touching this platform, for focus mode. */
  focusPlatformId?: string;
  /** Ignores each platform's authored status, for dependency views that shouldn't imply workflow progress. */
  neutralStatus?: boolean;
}

/** The single translation point from architecture data to the illustration engine's plain Diagram. */
export function compileArchitectureToDiagram(
  architecture: PlatformArchitecture,
  options: CompileArchitectureOptions = {},
): Diagram {
  const { selectedPlatformId, focusPlatformId, neutralStatus } = options;

  const nodes: DiagramNode[] = architecture.platforms.map((platform) => {
    const node = compilePlatformToNode(platform, selectedPlatformId);
    return neutralStatus ? { ...node, status: undefined, health: undefined } : node;
  });

  const connections: DiagramConnection[] = architecture.relationships.map((relationship) =>
    compileRelationshipToConnection(relationship, { focusPlatformId }),
  );

  const groups: DiagramGroup[] | undefined = architecture.layers
    ? groupPlatformsByLayer(architecture).map(({ layer, platforms }) => ({
        id: layer.id,
        title: layer.title,
        description: layer.description,
        nodes: platforms.map((platform) => platform.id),
      }))
    : undefined;

  return { nodes, connections, groups };
}
