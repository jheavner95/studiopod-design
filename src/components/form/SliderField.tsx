import type { ReactNode } from "react";
import { Stack } from "@/components/layout";
import { Slider, type SliderProps } from "@/components/ui";
import { FieldError } from "./FieldError";

interface SliderFieldProps extends Omit<SliderProps, "label" | "helperText"> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
}

/** Slider plus an accessibly-announced error message — sliders are validated by range, not required/optional, so no RequiredIndicator here. */
export function SliderField({ label, helperText, error, ...sliderProps }: SliderFieldProps) {
  return (
    <Stack gap="xs">
      <Slider label={label} helperText={error ? undefined : helperText} {...sliderProps} />
      {error ? <FieldError>{error}</FieldError> : null}
    </Stack>
  );
}
