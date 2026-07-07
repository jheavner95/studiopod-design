import type { ReactNode } from "react";

/**
 * The Capability Library's own schema, layered on top of the motion,
 * illustration, workflow, platform architecture, and production engines.
 * A `CapabilityRegistry` describes StudioPOD's capabilities (AI,
 * publishing, commerce, and beyond) as provider-agnostic abstractions,
 * with providers as interchangeable implementations behind them. Every
 * future capability diagram is a value of this shape handed to
 * `<CapabilityRegistryDiagram registry={...} />`, never bespoke,
 * provider-specific rendering code.
 */

/** The shared state vocabulary across every entity in this library. */
export type CapabilityStatus =
  | "available"
  | "unavailable"
  | "healthy"
  | "warning"
  | "offline"
  | "preferred"
  | "fallback"
  | "deprecated";

/** A narrower, operational-health-only view of CapabilityStatus, for Provider.health. */
export type CapabilityHealth = "healthy" | "warning" | "offline";

export type CapabilityDirection = "input" | "output" | "bidirectional";

export type CapabilityMetadata = Record<string, ReactNode>;

export interface Capability {
  id: string;
  name: string;
  description?: string;
  /** A free-form grouping key, e.g. "ai", "publishing", "commerce", "notifications", "storage", "payments". */
  category: string;
  status?: CapabilityStatus;
  direction?: CapabilityDirection;
  /** Data this capability consumes, as plain labels. */
  inputs?: string[];
  /** Data this capability produces, as plain labels. */
  outputs?: string[];
  /** Provider ids that implement this capability. */
  providers?: string[];
  icon?: ReactNode;
  metadata?: CapabilityMetadata;
}

export interface CapabilityProvider {
  id: string;
  name: string;
  /** A stable key the host app can map to a real logo asset. Never rendered as provider-specific markup here. */
  logoKey?: string;
  /** Capability ids this provider implements. */
  capabilities?: string[];
  health?: CapabilityHealth;
  status?: CapabilityStatus;
  /** Lower is tried first during failover. */
  priority?: number;
  available?: boolean;
  icon?: ReactNode;
}

export interface CapabilityAdapter {
  id: string;
  /** Usually a capability id, the abstraction this adapter sits behind. */
  source: string;
  /** Usually a provider id, the concrete implementation this adapter routes to. */
  target: string;
  /** The capability id this adapter implements. */
  capability: string;
  health?: CapabilityHealth;
  status?: CapabilityStatus;
  /** A pre-formatted display value, e.g. "120ms". */
  latency?: string;
  version?: string;
}

export interface CapabilityStage {
  id: string;
  title: string;
  subtitle?: string;
  description?: ReactNode;
  status?: CapabilityStatus;
  icon?: ReactNode;
  /** The capability or provider id this stage stands in for, if any. */
  refId?: string;
}

export interface CapabilityFlow {
  id: string;
  title: string;
  description?: string;
  stages: CapabilityStage[];
}

export type CapabilityRelationshipType = "implements" | "routes-to" | "depends-on" | "fails-over-to";

export interface CapabilityRelationship {
  id: string;
  source: string;
  target: string;
  relationshipType: CapabilityRelationshipType;
  direction?: "forward" | "backward" | "bidirectional";
  animated?: boolean;
  label?: ReactNode;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description?: string;
  /** Capability or provider ids that belong to this group. */
  memberIds: string[];
}

export interface CapabilityRegistry {
  id: string;
  title: string;
  description?: string;
  capabilities: Capability[];
  providers: CapabilityProvider[];
  adapters: CapabilityAdapter[];
  relationships?: CapabilityRelationship[];
  groups?: CapabilityGroup[];
  flows?: CapabilityFlow[];
  metadata?: CapabilityMetadata;
}
