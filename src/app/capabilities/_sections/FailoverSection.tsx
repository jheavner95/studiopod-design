import { CapabilityFlowDiagram } from "@/capabilities";
import { providerFailover } from "@/capabilities/examples";
import { PreviewSection } from "../_components/preview-primitives";

/** What happens automatically when a preferred provider goes down, built on the same CapabilityFlowDiagram as the AI capability layer. */
export function FailoverSection() {
  return (
    <PreviewSection
      id="provider-failover"
      eyebrow="provider failover"
      title="Routing around an outage"
      description="StudioPOD never talks to a provider directly, so when one goes down, the capability layer routes around it automatically."
    >
      <div className="scrollbar-none overflow-x-auto">
        <CapabilityFlowDiagram flow={providerFailover} />
      </div>
    </PreviewSection>
  );
}
