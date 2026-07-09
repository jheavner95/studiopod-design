import type { ReactNode } from "react";
import { Stack } from "@/components/layout";
import { TextInput, type TextInputProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface InputFieldProps extends Omit<TextInputProps, "label" | "helperText" | "status"> {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** TextInput plus the description line and accessibly-announced error message it doesn't own by itself. */
export function InputField({ label, description, helperText, error, required = false, ...inputProps }: InputFieldProps) {
  return (
    <Stack gap="xs">
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      <TextInput
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
        {...inputProps}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </Stack>
  );
}
