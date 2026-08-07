import { useId, type ReactNode } from "react";
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
  const errorId = useId();
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
        describedBy={error ? errorId : undefined}
        {...radioGroupProps}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </Stack>
  );
}
