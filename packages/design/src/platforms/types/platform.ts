import type { ReactNode } from "react";
import type { NodeStatus, NodeHealth } from "@/illustrations";

/**
 * The Platform Architecture Library's own schema, layered on top of the
 * illustration and workflow engines. A `PlatformArchitecture` describes a
 * named system of platforms and their relationships, every future
 * architecture diagram is a value of this shape handed to
 * `<PlatformArchitectureDiagram architecture={...} />`, never bespoke
 * rendering code.
 */

export interface PlatformCapability {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export interface PlatformDomain {
  id: string;
  title: string;
  description?: string;
}

export interface PlatformLayer {
  id: string;
  title: string;
  description?: string;
  /** Stacking order, lowest first (e.g. foundation = 0). Falls back to array order when omitted. */
  order?: number;
}

export type PlatformRelationshipType = "dependency" | "data-flow" | "integration" | "composition";
export type PlatformRelationshipDirection = "forward" | "backward" | "bidirectional";
export type PlatformRelationshipStrength = "weak" | "medium" | "strong";

export interface PlatformRelationship {
  id: string;
  /** Source platform id. */
  source: string;
  /** Target platform id. */
  target: string;
  relationshipType: PlatformRelationshipType;
  direction?: PlatformRelationshipDirection;
  strength?: PlatformRelationshipStrength;
  /** Whether the flow draw-in animation plays. Defaults to true. */
  animated?: boolean;
  label?: ReactNode;
}

export interface PlatformFlowStep {
  id: string;
  title: string;
  /** The platform this artifact stage lives in, if any. */
  platformId?: string;
  icon?: ReactNode;
  description?: ReactNode;
}

export interface PlatformFlow {
  id: string;
  title: string;
  description?: string;
  /** An ordered chain of artifact stages, e.g. Creative Brief -> Artwork Project -> ... */
  steps: PlatformFlowStep[];
}

export type PlatformMetadata = Record<string, ReactNode>;

export interface Platform {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  /** The PlatformLayer id this platform belongs to, if the architecture defines layers. */
  layer?: string;
  status?: NodeStatus;
  health?: NodeHealth;
  icon?: ReactNode;
  /** A semantic color token key (e.g. "accent", "success"), for callers that want to tint beyond the status palette. */
  colorToken?: string;
  capabilities?: PlatformCapability[];
  domains?: PlatformDomain[];
  /** This platform's own relationships, for standalone platform data. The canonical graph lives on PlatformArchitecture.relationships. */
  relationships?: PlatformRelationship[];
  metadata?: PlatformMetadata;
}

export interface PlatformArchitecture {
  id: string;
  title: string;
  description?: string;
  platforms: Platform[];
  layers?: PlatformLayer[];
  relationships: PlatformRelationship[];
  flows?: PlatformFlow[];
  metadata?: PlatformMetadata;
}
