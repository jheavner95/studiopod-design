import { WorkflowProgress } from "./WorkflowProgress";

interface PipelineProgressProps {
  completedStages: number;
  totalStages: number;
  className?: string;
}

/** Computes a "Stage N of M" label and 0-1 value, then delegates entirely to Workflow Framework's own WorkflowProgress — the same compute-a-label-delegate-render pattern WorkflowStepperProgress already established one layer below. */
export function PipelineProgress({ completedStages, totalStages, className }: PipelineProgressProps) {
  const value = totalStages > 0 ? completedStages / totalStages : 0;
  return <WorkflowProgress value={value} label={`Stage ${completedStages} of ${totalStages}`} className={className} />;
}
