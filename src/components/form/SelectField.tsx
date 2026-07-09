import type { ReactNode } from "react";
import { Stack } from "@/components/layout";
import { Select, type SelectProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface SelectFieldProps extends Omit<SelectProps, "label" | "helperText" | "status"> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** Select plus the description line and accessibly-announced error message it doesn't own by itself. */
export function SelectField({ label, description, helperText, error, required = false, ...selectProps }: SelectFieldProps) {
  return (
    <Stack gap="xs">
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      <Select
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
        {...selectProps}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </Stack>
  );
}
