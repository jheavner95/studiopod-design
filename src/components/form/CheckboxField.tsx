import type { ReactNode } from "react";
import { Stack } from "@/components/layout";
import { Checkbox, type CheckboxProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface CheckboxFieldProps extends Omit<CheckboxProps, "label" | "helperText"> {
  label: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** Checkbox plus an accessibly-announced error message — Checkbox's own label sits inline next to the box, so the required asterisk appends to that label rather than a separate one above. */
export function CheckboxField({ label, helperText, error, required = false, ...checkboxProps }: CheckboxFieldProps) {
  return (
    <Stack gap="xs">
      <Checkbox
        label={
          <>
            {label}
            {required ? <RequiredIndicator /> : null}
          </>
        }
        helperText={error ? undefined : helperText}
        {...checkboxProps}
      />
      {error ? <FieldError className="pl-[30px]">{error}</FieldError> : null}
    </Stack>
  );
}
