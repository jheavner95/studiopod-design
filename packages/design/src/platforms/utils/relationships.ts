import type { PlatformRelationship } from "../types";

export function getIncoming(platformId: string, relationships: PlatformRelationship[]): PlatformRelationship[] {
  return relationships.filter((relationship) => relationship.target === platformId);
}

export function getOutgoing(platformId: string, relationships: PlatformRelationship[]): PlatformRelationship[] {
  return relationships.filter((relationship) => relationship.source === platformId);
}

export function getConnected(platformId: string, relationships: PlatformRelationship[]): PlatformRelationship[] {
  return relationships.filter(
    (relationship) => relationship.source === platformId || relationship.target === platformId,
  );
}
