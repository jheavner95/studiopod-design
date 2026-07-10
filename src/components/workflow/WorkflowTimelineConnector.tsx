import { WorkflowTransition, type WorkflowTransitionStatus } from "./WorkflowTransition";

interface WorkflowTimelineConnectorProps {
  status?: WorkflowTransitionStatus;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * The line between two WorkflowTimelineEvent rows — a thin wrapper over
 * Workflow Framework's own WorkflowTransition, the same 3-state
 * pending/active/complete vocabulary a connector needs (an already-happened
 * event's connector reads "complete"; the connector leading to a still-
 * running event reads "active"). Defaults to vertical, unlike
 * WorkflowStepperConnector's horizontal default, since a chronological
 * timeline reads top-to-bottom rather than left-to-right.
 */
export function WorkflowTimelineConnector({ status = "complete", orientation = "vertical", className }: WorkflowTimelineConnectorProps) {
  return <WorkflowTransition status={status} orientation={orientation} className={className} />;
}
