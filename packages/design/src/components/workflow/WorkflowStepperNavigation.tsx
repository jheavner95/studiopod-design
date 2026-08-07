"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface WorkflowStepperNavigationProps {
  /** 1-indexed. */
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  className?: string;
}

/**
 * Back/Next controls for moving through a wizard — built fresh rather than
 * reusing Foundation Navigation's own Pagination. Pagination's "compact"
 * variant is visually close (chevron buttons, disabled-at-bounds, an "X of
 * Y" caption) but carries page-list ARIA wording ("Pagination," "Previous/
 * Next page") that would misdescribe a step wizard to a screen reader —
 * a real trade-off, not silently resolved by reusing it anyway. Bounds-
 * checking (Back disabled on step 1, Next relabeled "Finish" on the last
 * step) follows the same pattern Pagination's own compact variant already
 * establishes.
 */
export function WorkflowStepperNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextLabel,
  backLabel = "Back",
  nextDisabled,
  className,
}: WorkflowStepperNavigationProps) {
  const isFirst = currentStep <= 1;
  const isLast = currentStep >= totalSteps;

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <Button variant="secondary" size="sm" onClick={onBack} disabled={isFirst} aria-label="Previous step" leadingIcon={<ChevronLeft className="size-3.5" aria-hidden />}>
        {backLabel}
      </Button>
      <Button
        size="sm"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label={isLast ? "Finish" : "Next step"}
        trailingIcon={isLast ? undefined : <ChevronRight className="size-3.5" aria-hidden />}
      >
        {nextLabel ?? (isLast ? "Finish" : "Next")}
      </Button>
    </div>
  );
}
