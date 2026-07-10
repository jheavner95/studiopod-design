import { ProgressRing, type ProgressTone } from "@/components/feedback";

interface HealthScoreProps {
  /** 0–100. */
  score: number;
  size?: number;
  label?: string;
  className?: string;
}

function toneForScore(score: number): ProgressTone {
  if (score >= 80) return "success";
  if (score >= 50) return "warning";
  return "error";
}

/** A 0–100 operational health score — a thin preset over Foundation Feedback's own ProgressRing (determinate circular fill, already solved there), scoring its own tone (success/warning/error) by threshold rather than a second circular-progress implementation. */
export function HealthScore({ score, size = 64, label = "Health score", className }: HealthScoreProps) {
  const clamped = Math.min(100, Math.max(0, score));
  return <ProgressRing value={clamped / 100} size={size} tone={toneForScore(clamped)} label={label} className={className} />;
}
