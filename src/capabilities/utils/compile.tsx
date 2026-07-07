import type { Diagram, DiagramNode, DiagramConnection } from "@/illustrations";
import { Badge } from "@/components/ui";
import { toNodeStatus, toNodeHealth } from "./status";
import type {
  Capability,
  CapabilityProvider,
  CapabilityAdapter,
  CapabilityRelationship,
  CapabilityRegistry,
} from "../types";

export function compileCapabilityToNode(capability: Capability, selectedId?: string): DiagramNode {
  return {
    id: capability.id,
    label: capability.name,
    subtitle: capability.category,
    icon: capability.icon,
    status: capability.status ? toNodeStatus(capability.status) : undefined,
    selected: capability.id === selectedId,
  };
}

export function compileProviderToNode(provider: CapabilityProvider, selectedId?: string): DiagramNode {
  return {
    id: provider.id,
    label: provider.name,
    icon: provider.icon,
    status: provider.status ? toNodeStatus(provider.status) : undefined,
    health: provider.health ? toNodeHealth(provider.health) : undefined,
    selected: provider.id === selectedId,
    disabled: provider.available === false,
    badge:
      provider.status === "preferred" ? (
        <Badge tone="accent" size="sm">
          Preferred
        </Badge>
      ) : provider.status === "deprecated" ? (
        <Badge tone="warning" size="sm">
          Deprecated
        </Badge>
      ) : undefined,
  };
}

export interface CompileRelationshipOptions {
  /** Dims every connection not touching this id, for the "provider highlighting" / "capability focus" interactions. */
  focusId?: string;
}

export function compileRelationshipToConnection(
  relationship: CapabilityRelationship,
  options: CompileRelationshipOptions = {},
): DiagramConnection {
  const { focusId } = options;
  const touchesFocus = !focusId || relationship.source === focusId || relationship.target === focusId;

  return {
    id: relationship.id,
    source: relationship.source,
    target: relationship.target,
    direction: relationship.direction ?? "forward",
    style: relationship.relationshipType === "depends-on" ? "dashed" : "solid",
    animated: relationship.animated ?? true,
    label: relationship.label,
    status: touchesFocus ? (focusId ? "highlighted" : "active") : "inactive",
  };
}

export function compileAdapterToConnection(
  adapter: CapabilityAdapter,
  options: CompileRelationshipOptions = {},
): DiagramConnection {
  const { focusId } = options;
  const touchesFocus = !focusId || adapter.source === focusId || adapter.target === focusId;

  return {
    id: adapter.id,
    source: adapter.source,
    target: adapter.target,
    direction: "forward",
    style: adapter.status === "deprecated" ? "dotted" : "solid",
    animated: adapter.status !== "unavailable" && adapter.status !== "offline",
    label: adapter.latency,
    status: touchesFocus ? (focusId ? "highlighted" : "active") : "inactive",
  };
}

export interface CompileRegistryOptions {
  selectedId?: string;
  focusId?: string;
}

/** The single translation point from registry data to the illustration engine's plain Diagram: capabilities and providers as nodes, relationships and adapters as connections. */
export function compileRegistryToDiagram(registry: CapabilityRegistry, options: CompileRegistryOptions = {}): Diagram {
  const { selectedId, focusId } = options;

  const nodes: DiagramNode[] = [
    ...registry.capabilities.map((capability) => compileCapabilityToNode(capability, selectedId)),
    ...registry.providers.map((provider) => compileProviderToNode(provider, selectedId)),
  ];

  const connections: DiagramConnection[] = [
    ...(registry.relationships ?? []).map((relationship) => compileRelationshipToConnection(relationship, { focusId })),
    ...registry.adapters.map((adapter) => compileAdapterToConnection(adapter, { focusId })),
  ];

  const groups = registry.groups?.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description,
    nodes: group.memberIds,
  }));

  return { nodes, connections, groups };
}

/** A hub-and-spoke diagram: one capability at the center, its implementing providers as spokes. */
export function compileProviderFanToDiagram(
  capability: Capability,
  providers: CapabilityProvider[],
  options: CompileRegistryOptions = {},
): Diagram {
  const { selectedId, focusId } = options;
  const nodes: DiagramNode[] = [
    compileCapabilityToNode(capability, selectedId),
    ...providers.map((provider) => compileProviderToNode(provider, selectedId)),
  ];

  const connections: DiagramConnection[] = providers.map((provider) => ({
    id: `${capability.id}-${provider.id}`,
    source: capability.id,
    target: provider.id,
    status: !focusId || focusId === provider.id || focusId === capability.id ? "active" : "inactive",
  }));

  return { nodes, connections, layout: "hub-and-spoke" };
}

/** An adapter-focused diagram: only the capabilities/providers referenced by adapters, connected by the adapters themselves. */
export function compileAdaptersToDiagram(
  adapters: CapabilityAdapter[],
  registry: CapabilityRegistry,
  options: CompileRegistryOptions = {},
): Diagram {
  const { selectedId, focusId } = options;
  const capabilityById = new Map(registry.capabilities.map((capability) => [capability.id, capability]));
  const providerById = new Map(registry.providers.map((provider) => [provider.id, provider]));

  const nodeIds = new Set<string>();
  adapters.forEach((adapter) => {
    nodeIds.add(adapter.source);
    nodeIds.add(adapter.target);
  });

  const nodes: DiagramNode[] = Array.from(nodeIds).flatMap((id) => {
    const capability = capabilityById.get(id);
    if (capability) return [compileCapabilityToNode(capability, selectedId)];
    const provider = providerById.get(id);
    if (provider) return [compileProviderToNode(provider, selectedId)];
    return [];
  });

  const connections = adapters.map((adapter) => compileAdapterToConnection(adapter, { focusId }));

  return { nodes, connections };
}
