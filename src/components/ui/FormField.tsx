import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  className?: string;
  label?: ReactNode;
  /** Supporting copy between the label and the control — a sentence of context, not a validation message. */
  description?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  successText?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
}

/**
 * A generic label/description/control/message layout for wrapping *any*
 * control — a custom widget, a third-party component, a group of
 * checkboxes — with the same rhythm the standard inputs use internally.
 * TextInput/Textarea/Select/etc. already wire their own label + helper
 * text; reach for this when you need a description line, or you're
 * composing something those props don't cover.
 */
export function FormField({
  className,
  label,
  description,
  helperText,
  errorText,
  successText,
  required = false,
  htmlFor,
  children,
}: FormFieldProps) {
  const message = errorText ?? successText ?? helperText;
  const messageTone = errorText ? "text-error" : successText ? "text-success" : "text-ink-tertiary";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={htmlFor} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <span className="ml-0.5 text-error">*</span> : null}
        </label>
      ) : null}
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}

      {children}

      {message ? <p className={cn("text-caption", messageTone)}>{message}</p> : null}
    </div>
  );
}
