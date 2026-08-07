import type { ReactNode } from "react";
import { SelectField } from "@/components/form";
import type { SelectOption } from "@/components/ui";

interface PropertySelectProps {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** A choice property editor — a thin preset over Foundation Forms' own SelectField, not a second select implementation. */
export function PropertySelect({ label, value, onChange, options, error, disabled, className }: PropertySelectProps) {
  return (
    <SelectField
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={options}
      error={error}
      disabled={disabled}
      className={className}
    />
  );
}
