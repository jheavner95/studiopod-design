import { Alert, ValidationSummary, type ValidationSummaryItem } from "@/components/feedback";

interface InspectorValidationProps {
  items: ValidationSummaryItem[];
  /** Shown in place of the summary when items is empty — omit to render nothing (matching ValidationSummary's own behavior). */
  emptyMessage?: string;
  className?: string;
}

/**
 * Whether the selected object is actually correct — errors, warnings, and
 * (via ValidationSummaryItem's severity) their fix guidance, delegated
 * entirely to Foundation Feedback's own ValidationSummary rather than a
 * second validation-list component.
 */
export function InspectorValidation({ items, emptyMessage, className }: InspectorValidationProps) {
  if (items.length === 0) {
    return emptyMessage ? (
      <Alert tone="success" className={className}>
        {emptyMessage}
      </Alert>
    ) : null;
  }
  return <ValidationSummary items={items} className={className} />;
}
