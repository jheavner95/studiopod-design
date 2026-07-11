import { useId, type ReactNode } from "react";
import { Stack } from "@/components/layout";
import { Textarea, type TextareaProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface TextareaFieldProps extends Omit<TextareaProps, "label" | "helperText" | "status"> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** Textarea plus the description line and accessibly-announced error message it doesn't own by itself. */
export function TextareaField({ label, description, helperText, error, required = false, ...textareaProps }: TextareaFieldProps) {
  const errorId = useId();
  return (
    <Stack gap="xs">
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      <Textarea
        label={
          label ? (
            <>
              {label}
              {required ? <RequiredIndicator /> : null}
            </>
          ) : undefined
        }
        status={error ? "error" : "default"}
        helperText={error ? undefined : helperText}
        describedBy={error ? errorId : undefined}
        {...textareaProps}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </Stack>
  );
}
