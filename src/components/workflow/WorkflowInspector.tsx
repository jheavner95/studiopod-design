import type { ReactNode } from "react";
import { InspectorPanel, InspectorHeader, InspectorSection, InspectorProperty } from "@/components/operational";
import type { WorkflowNodeStatus } from "./WorkflowNode";

type StatusTone = "neutral" | "accent" | "success" | "warning" | "error";

const STATUS_TONE: Record<WorkflowNodeStatus, StatusTone> = {
  idle: "neutral",
  running: "accent",
  paused: "warning",
  blocked: "warning",
  completed: "success",
  failed: "error",
};

const STATUS_LABEL: Record<WorkflowNodeStatus, string> = {
  idle: "Idle",
  running: "Running",
  paused: "Paused",
  blocked: "Blocked",
  completed: "Completed",
  failed: "Failed",
};

export interface WorkflowInspectorProperty {
  id: string;
  label: ReactNode;
  value: ReactNode;
}

interface WorkflowInspectorProps {
  icon?: ReactNode;
  name: ReactNode;
  type?: ReactNode;
  status: WorkflowNodeStatus;
  properties?: WorkflowInspectorProperty[];
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * The detail view for a single selected WorkflowNode — composes
 * Operational Inspector Panel's own family directly
 * (InspectorPanel/InspectorHeader/InspectorSection/InspectorProperty), the
 * identical pattern StateInspector and DependencyInspector already
 * established, rather than through any intermediate — this tier has no
 * canvas-level inspector of its own to route through instead.
 */
export function WorkflowInspector({ icon, name, type, status, properties, children, footer, className }: WorkflowInspectorProps) {
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
