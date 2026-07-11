import type { ReactNode } from "react";
import { InspectorPanel, InspectorHeader, InspectorSection, InspectorProperty } from "@/components/operational";
import type { DependencyStatusValue } from "./DependencyNode";

type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

const STATUS_TONE: Record<DependencyStatusValue, StatusTone> = {
  connected: "success",
  disconnected: "neutral",
  blocked: "warning",
  healthy: "success",
  warning: "warning",
  critical: "error",
  circular: "warning",
  hidden: "neutral",
};

const STATUS_LABEL: Record<DependencyStatusValue, string> = {
  connected: "Connected",
  disconnected: "Disconnected",
  blocked: "Blocked",
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
  circular: "Circular",
  hidden: "Hidden",
};

export interface DependencyInspectorProperty {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

interface DependencyInspectorProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status: DependencyStatusValue;
  properties?: DependencyInspectorProperty[];
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * The detail view for a single node — what it depends on, what depends on
 * it, and its own status. Composes Operational Inspector Panel's own
 * family directly (InspectorPanel/InspectorHeader/InspectorSection/
 * InspectorProperty), the identical pattern State Machine's own
 * StateInspector already established for this tier, since there is no
 * Dependency-level intermediate to route through — the same "compose the
 * true base, not an extra hop" reasoning StateInspector's own doc comment
 * already gives.
 */
export function DependencyInspector({ icon, name, type, status, properties, children, footer, className }: DependencyInspectorProps) {
  return (
    <InspectorPanel
      header={<InspectorHeader icon={icon} name={name} type={type} status={{ label: STATUS_LABEL[status], tone: STATUS_TONE[status] }} />}
      footer={footer}
      className={className}
    >
      {properties && properties.length > 0 ? (
        <InspectorSection title="Properties">
          <div className="flex flex-col gap-3">
            {properties.map((property) => (
              <InspectorProperty key={property.id} label={property.label} value={property.value} />
            ))}
          </div>
        </InspectorSection>
      ) : null}
      {children}
    </InspectorPanel>
  );
}
