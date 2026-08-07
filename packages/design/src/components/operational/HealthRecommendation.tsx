import type { ReactNode } from "react";
import { Alert } from "@/components/feedback";

interface HealthRecommendationProps {
  title: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

/** A suggested next step — "Rotate this credential," "Increase your API quota" — a thin preset over Foundation Feedback's own Alert (info tone), fills the "Recommendation Card" gap the DS-0.2 inventory has tracked as Needed. */
export function HealthRecommendation({ title, children, action, onDismiss, className }: HealthRecommendationProps) {
  return (
    <Alert tone="info" title={title} action={action} onDismiss={onDismiss} className={className}>
      {children}
    </Alert>
  );
}
