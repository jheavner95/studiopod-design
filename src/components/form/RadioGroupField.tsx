import type { ReactNode } from "react";
import { Stack } from "@/components/layout";
import { RadioGroup, type RadioGroupProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface RadioGroupFieldProps extends Omit<RadioGroupProps, "label" | "helperText"> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** RadioGroup plus an accessibly-announced error message. */
export function RadioGroupField({ label, helperText, error, required = false, ...radioGroupProps }: RadioGroupFieldProps) {
  return (
    <Stack gap="xs">
      <RadioGroup
        label={
          label ? (
            <>
              {label}
              {required ? <RequiredIndicator /> : null}
            </>
          ) : undefined
        }
        helperText={error ? undefined : helperText}
        {...radioGroupProps}
      />
      {error ? <FieldError>{error}</FieldError> : null}
    </Stack>
  );
}
