import type { ChangeEvent } from "react";
import { TextareaField } from "@/components/form";

interface ReviewCommentProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

/**
 * A single comment input for a review — a thin preset over Foundation
 * Forms' own TextareaField, not a second textarea implementation.
 */
export function ReviewComment({ value, onChange, label = "Comment", placeholder = "Add a comment…", error, className }: ReviewCommentProps) {
  return (
    <TextareaField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
      error={error}
      rows={3}
      className={className}
    />
  );
}
