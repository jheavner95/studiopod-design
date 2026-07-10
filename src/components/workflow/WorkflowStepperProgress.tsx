import { WorkflowProgress } from "./WorkflowProgress";

interface WorkflowStepperProgressProps {
  /** 1-indexed. */
  currentStep: number;
  totalSteps: number;
  className?: string;
}

/**
 * A wizard's own "Step N of M" progress bar — a thin wrapper computing a
 * value and label, then delegating entirely to Workflow Framework's own
 * WorkflowProgress, the same "compute a label, delegate the render"
 * pattern Operational Bulk Actions' own BulkProgress already established
 * one layer below (over ProgressBar directly) — bypassing WorkflowProgress
 * to reach ProgressBar directly here would itself be a form of duplication.
 */
export function WorkflowStepperProgress({ currentStep, totalSteps, className }: WorkflowStepperProgressProps) {
  const value = totalSteps === 0 ? 0 : currentStep / totalSteps;
  return <WorkflowProgress value={value} label={`Step ${currentStep} of ${totalSteps}`} className={className} />;
}
