import { Expand } from "@/motion";
import { Badge, Body, Caption } from "@/components/ui";
import { getProvidersForCapability, getAdaptersForCapability } from "../utils";
import type { Capability, CapabilityRegistry } from "../types";

export interface CapabilityDetailsProps {
  capability: Capability;
  registry: CapabilityRegistry;
  open?: boolean;
  className?: string;
}

/** An expandable panel of a capability's detail: inputs/outputs, its implementing providers, and their adapters. */
export function CapabilityDetails({ capability, registry, open = false, className }: CapabilityDetailsProps) {
  const providers = getProvidersForCapability(capability.id, registry.providers);
  const adapters = getAdaptersForCapability(capability.id, registry.adapters);

  return (
    <Expand open={open} className={className}>
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
        {capability.description && <Body size="sm" muted>{capability.description}</Body>}

        {(capability.inputs?.length || capability.outputs?.length) ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capability.inputs && capability.inputs.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <Caption className="uppercase tracking-wide">Inputs</Caption>
                <ul className="flex flex-col gap-1">
                  {capability.inputs.map((input) => (
                    <li key={input} className="text-body-sm text-ink-primary">
                      {input}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {capability.outputs && capability.outputs.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <Caption className="uppercase tracking-wide">Outputs</Caption>
                <ul className="flex flex-col gap-1">
                  {capability.outputs.map((output) => (
                    <li key={output} className="text-body-sm text-ink-primary">
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {providers.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <Caption className="uppercase tracking-wide">Providers</Caption>
            <ul className="flex flex-col gap-1">
              {providers.map((provider) => {
                const adapter = adapters.find((item) => item.target === provider.id);
                return (
                  <li key={provider.id} className="flex flex-wrap items-center gap-2 text-body-sm text-ink-primary">
                    {provider.name}
                    {provider.status === "preferred" && (
                      <Badge tone="accent" size="sm">
                        Preferred
                      </Badge>
                    )}
                    {adapter?.latency && <Caption className="text-ink-tertiary">{adapter.latency}</Caption>}
                    {adapter?.version && <Caption className="text-ink-tertiary">v{adapter.version}</Caption>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </Expand>
  );
}
