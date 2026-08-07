"use client";

import { useEffect, useRef } from "react";
import { useAnnounce } from "@/components/feedback";
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
 * Also announces the step transition itself ("Step 4 of 7") through the
 * shared LiveRegionProvider whenever currentStep changes, since this
 * component is the one place already computing that label from the
 * wizard's real advancing state.
 */
export function WorkflowStepperProgress({ currentStep, totalSteps, className }: WorkflowStepperProgressProps) {
  const value = totalSteps === 0 ? 0 : currentStep / totalSteps;
  const label = `Step ${currentStep} of ${totalSteps}`;
  const announce = useAnnounce();
  const previousStep = useRef(currentStep);

  useEffect(() => {
    if (previousStep.current === currentStep) return;
    previousStep.current = currentStep;
    announce(label);
  }, [currentStep, label, announce]);

  return <WorkflowProgress value={value} label={label} className={className} />;
}
