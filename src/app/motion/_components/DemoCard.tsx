"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui";
import { MotionDebugOverlay } from "@/motion";
import { useMotion } from "@/hooks/useMotion";
import { DemoLabel } from "./preview-primitives";

interface DemoCardProps {
  label: string;
  /** Shown when the "Timing" diagnostic is toggled on in the control dock. */
  timingLabel?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The standard wrapper for one motion example: a labeled card, the
 * developer-diagnostics overlay, and a remount key tied to the global
 * replay counter so every demo on the page replays together.
 */
export function DemoCard({ label, timingLabel, className, children }: DemoCardProps) {
  const { replayKey } = useMotion();

  return (
    <Card className={className ?? "flex flex-col gap-4"}>
      <DemoLabel>{label}</DemoLabel>
      <MotionDebugOverlay label={timingLabel} className="flex min-h-20 items-center justify-center">
        <div key={replayKey} className="flex w-full items-center justify-center">
          {children}
        </div>
      </MotionDebugOverlay>
    </Card>
  );
}
