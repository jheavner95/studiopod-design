import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "upcoming" | "current" | "complete" | "error";

export interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  /** 0-indexed — every step before this is complete, this one is current, everything after is upcoming. */
  currentIndex: number;
  /** Marks one step as errored instead of its computed status — a stepper can only be mid-error on one step at a time. */
  errorIndex?: number;
  orientation?: "horizontal" | "vertical";
  /** Shows the step number inside the circle instead of leaving it blank until complete/error. */
  numbered?: boolean;
  className?: string;
}

function statusFor(index: number, currentIndex: number, errorIndex?: number): StepStatus {
  if (index === errorIndex) return "error";
  if (index < currentIndex) return "complete";
  if (index === currentIndex) return "current";
  return "upcoming";
}

/** Showing progress through a fixed, ordered sequence of steps — Horizontal/Vertical orientation, Numbered or plain markers, With labels. Read-only progress display, not an interactive control — no keyboard navigation of its own. */
export function Stepper({ steps, currentIndex, errorIndex, orientation = "horizontal", numbered = true, className }: StepperProps) {
  return (
    <ol aria-label="Progress" className={cn("flex", orientation === "horizontal" ? "w-full flex-row" : "flex-col", className)}>
      {steps.map((step, index) => {
        const status = statusFor(index, currentIndex, errorIndex);
        const isLast = index === steps.length - 1;

        const marker = (
          <span
            aria-current={status === "current" ? "step" : undefined}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-body-sm font-medium",
              status === "complete" && "bg-success text-white",
              status === "current" && "bg-accent-500 text-white",
              status === "upcoming" && "border border-border-strong text-ink-tertiary",
              status === "error" && "bg-error text-white",
            )}
          >
            {status === "complete" ? (
              <Check className="size-4" aria-hidden />
            ) : status === "error" ? (
              <X className="size-4" aria-hidden />
            ) : numbered ? (
              index + 1
            ) : null}
          </span>
        );

        const connector = !isLast ? (
          <div
            aria-hidden
            className={cn(
              orientation === "horizontal" ? "mx-2 h-px flex-1 self-center" : "my-1 ml-4 h-6 w-px",
              status === "complete" ? "bg-success" : "bg-border-subtle",
            )}
          />
        ) : null;

        const text = (
          <div className={orientation === "horizontal" ? "mt-2 text-center" : "pb-4"}>
            <span className={cn("block text-body-sm font-medium", status === "upcoming" ? "text-ink-tertiary" : "text-ink-primary")}>{step.label}</span>
            {step.description ? <span className="block text-caption text-ink-tertiary">{step.description}</span> : null}
          </div>
        );

        if (orientation === "horizontal") {
          return (
            <li key={step.id} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {marker}
                {connector}
              </div>
              {text}
            </li>
          );
        }

        return (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              {marker}
              {connector}
            </div>
            {text}
          </li>
        );
      })}
    </ol>
  );
}
