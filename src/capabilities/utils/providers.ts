import type { Capability, CapabilityProvider, CapabilityAdapter, CapabilityRegistry } from "../types";

export function getProvidersForCapability(
  capabilityId: string,
  providers: CapabilityProvider[],
): CapabilityProvider[] {
  return providers.filter((provider) => provider.capabilities?.includes(capabilityId));
}

export function getAdaptersForCapability(capabilityId: string, adapters: CapabilityAdapter[]): CapabilityAdapter[] {
  return adapters.filter((adapter) => adapter.capability === capabilityId);
}

/** Providers sorted for failover: available providers first, then by ascending priority (lower tries first). */
export function sortByPriority(providers: CapabilityProvider[]): CapabilityProvider[] {
  return [...providers].sort((a, b) => {
    if (a.available !== b.available) return a.available ? -1 : 1;
    return (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
  });
}

export function getPreferredProvider(providers: CapabilityProvider[]): CapabilityProvider | undefined {
  return sortByPriority(providers).find((provider) => provider.available);
}

export function filterByCategory(capabilities: Capability[], category: string): Capability[] {
  return capabilities.filter((capability) => capability.category === category);
}

/** Restricts a whole registry down to the capabilities in one category and everything that references them. */
export function scopeRegistryToCategory(registry: CapabilityRegistry, category: string): CapabilityRegistry {
  const capabilities = filterByCategory(registry.capabilities, category);
  const capabilityIds = new Set(capabilities.map((capability) => capability.id));

  const providers = registry.providers.filter((provider) =>
    provider.capabilities?.some((id) => capabilityIds.has(id)),
  );
  const providerIds = new Set(providers.map((provider) => provider.id));

  const adapters = registry.adapters.filter((adapter) => capabilityIds.has(adapter.capability));

  const relationships = registry.relationships?.filter(
    (relationship) =>
      (capabilityIds.has(relationship.source) || providerIds.has(relationship.source)) &&
      (capabilityIds.has(relationship.target) || providerIds.has(relationship.target)),
  );

  return { ...registry, capabilities, providers, adapters, relationships };
}
