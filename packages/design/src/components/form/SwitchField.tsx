import { useId, type ReactNode } from "react";
import { Stack } from "@/components/layout";
import { ToggleSwitch, type ToggleSwitchProps } from "@/components/ui";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

interface SwitchFieldProps extends Omit<ToggleSwitchProps, "label" | "helperText"> {
  label: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
}

/** ToggleSwitch plus an accessibly-announced error message — switches are rarely "required" in the validation sense, but the prop exists for the rare case (a mandatory consent toggle). */
export function SwitchField({ label, helperText, error, required = false, ...switchProps }: SwitchFieldProps) {
  const errorId = useId();
  return (
    <Stack gap="xs">
      <ToggleSwitch
        label={
          <>
            {label}
            {required ? <RequiredIndicator /> : null}
          </>
        }
        helperText={error ? undefined : helperText}
        describedBy={error ? errorId : undefined}
        {...switchProps}
      />
      {error ? (
        <FieldError id={errorId} className="pl-[52px]">
          {error}
        </FieldError>
      ) : null}
    </Stack>
  );
}
