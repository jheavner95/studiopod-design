import type { ReactNode } from "react";
import { InspectorPanel, InspectorHeader, InspectorSection, InspectorProperty } from "@/components/operational";
import type { StateValue } from "./StateNode";

type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

const STATE_TONE: Record<StateValue, StatusTone> = {
  initial: "neutral",
  active: "accent",
  waiting: "neutral",
  blocked: "warning",
  completed: "success",
  failed: "error",
  cancelled: "neutral",
  terminal: "neutral",
};

const STATE_LABEL: Record<StateValue, string> = {
  initial: "Initial",
  active: "Active",
  waiting: "Waiting",
  blocked: "Blocked",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  terminal: "Terminal",
};

export interface StateInspectorProperty {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

interface StateInspectorProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status: StateValue;
  properties?: StateInspectorProperty[];
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * The detail view for a single state — composes Operational Inspector
 * Panel's own family directly (InspectorPanel/InspectorHeader/
 * InspectorSection/InspectorProperty), the same pattern Workflow.tsx and
 * WorkflowHeader.tsx already establish at every level of this tier, rather
 * than going through any Pipeline-level component — Pipeline has no
 * inspector of its own to compose through.
 */
export function StateInspector({ icon, name, type, status, properties, children, footer, className }: StateInspectorProps) {
  return (
    <InspectorPanel
      header={<InspectorHeader icon={icon} name={name} type={type} status={{ label: STATE_LABEL[status], tone: STATE_TONE[status] }} />}
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
