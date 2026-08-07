"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import { Caption } from "@/components/ui";
import { BulkActionButton } from "./BulkActionButton";
import { BulkActionConfirmation } from "./BulkActionConfirmation";

interface JobRetryProps {
  attempts: number;
  maxAttempts?: number;
  onRetry: () => void;
  /** Gate the retry behind a confirmation once attempts are getting high — omit to retry immediately on click. */
  confirmAfterAttempts?: number;
  className?: string;
}

/** The retry affordance for a failed job — Bulk Actions' own BulkActionButton and BulkActionConfirmation reused directly rather than a second button/dialog pair, with an attempt counter so a caller can see how many tries have already happened. */
export function JobRetry({ attempts, maxAttempts, onRetry, confirmAfterAttempts, className }: JobRetryProps) {
  const [open, setOpen] = useState(false);
  const needsConfirm = confirmAfterAttempts !== undefined && attempts >= confirmAfterAttempts;
  const exhausted = maxAttempts !== undefined && attempts >= maxAttempts;

  return (
    <div className={className}>
      <BulkActionButton
        icon={<RotateCw className="size-3.5" />}
        disabled={exhausted}
        onClick={() => (needsConfirm ? setOpen(true) : onRetry())}
      >
        Retry
      </BulkActionButton>
      <Caption className="pt-1 text-ink-tertiary">
        {attempts} attempt{attempts === 1 ? "" : "s"}
        {maxAttempts !== undefined ? ` of ${maxAttempts}` : ""}
      </Caption>
      {needsConfirm ? (
        <BulkActionConfirmation
          open={open}
          onOpenChange={setOpen}
          title="Retry this job?"
          description={`This job has already failed ${attempts} times. Retrying will run it again with the same input.`}
          confirmLabel="Retry"
          onConfirm={onRetry}
        />
      ) : null}
    </div>
  );
}
