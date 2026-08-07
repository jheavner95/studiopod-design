import { ProgressBar } from "@/components/feedback";

interface BulkProgressProps {
  processed: number;
  total: number;
  className?: string;
}

/** "Processing 12 of 40" — a thin preset over Foundation Feedback's own ProgressBar (determinate fill, label, percentage) rather than a second progress implementation. */
export function BulkProgress({ processed, total, className }: BulkProgressProps) {
  const value = total === 0 ? 0 : processed / total;

  return (
    <ProgressBar
      value={value}
      label={`Processing ${processed} of ${total}`}
      showPercentage
      className={className}
    />
  );
}
