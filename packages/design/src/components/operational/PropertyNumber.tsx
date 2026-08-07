import type { ReactNode } from "react";
import { InputField } from "@/components/form";

interface PropertyNumberProps {
  label: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** A numeric property editor — a thin preset over Foundation Forms' own InputField (type="number"), not a second numeric-input implementation. */
export function PropertyNumber({ label, value, onChange, min, max, step, error, disabled, className }: PropertyNumberProps) {
  return (
    <InputField
      type="number"
      label={label}
      value={Number.isNaN(value) ? "" : String(value)}
      onChange={(event) => onChange(event.target.valueAsNumber)}
      min={min}
      max={max}
      step={step}
      error={error}
      disabled={disabled}
      className={className}
    />
  );
}
