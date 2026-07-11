import { Caption } from "@/components/ui";
import { StatusBadge, type NodeStatus, type ConnectionStatus } from "@/illustrations";
import { PreviewSection } from "../_components/preview-primitives";

const NODE_STATES: NodeStatus[] = ["idle", "active", "processing", "complete", "warning", "error"];
const CONNECTION_STATES: ConnectionStatus[] = ["inactive", "active", "flowing", "highlighted", "disabled"];
const GROUP_STATES = ["collapsed", "expanded", "focused"];

const CONNECTION_COLOR: Record<ConnectionStatus, string> = {
  inactive: "var(--color-border-strong)",
  active: "var(--color-accent-500)",
  flowing: "var(--color-accent-500)",
  highlighted: "var(--color-accent-300)",
  disabled: "var(--color-border-subtle)",
};

export function StateGallerySection() {
  return (
    <PreviewSection
      id="behavior"
      eyebrow="Behavior"
      title="The state system"
      description="Three independent state systems, one per object type. A node's status doesn't affect its group's collapsed state, and neither affects a connection's flow."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="text-body-sm font-medium text-ink-primary">Node</span>
          <div className="flex flex-wrap gap-2">
            {NODE_STATES.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="text-body-sm font-medium text-ink-primary">Connection</span>
          <div className="flex flex-col gap-2">
            {CONNECTION_STATES.map((status) => (
              <div key={status} className="flex items-center gap-2">
                <span className="h-0.5 w-8 rounded-full" style={{ background: CONNECTION_COLOR[status] }} />
                <Caption>{status}</Caption>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
          <span className="text-body-sm font-medium text-ink-primary">Group</span>
          <div className="flex flex-col gap-2">
            {GROUP_STATES.map((state) => (
              <Caption key={state}>{state}</Caption>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  );
}
