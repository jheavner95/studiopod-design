import type { ReactNode } from "react";
import { SwitchField } from "@/components/form";

interface PropertyToggleProps {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helperText?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** A boolean property editor — a thin preset over Foundation Forms' own SwitchField, not a second switch implementation. */
export function PropertyToggle({ label, checked, onChange, helperText, disabled, className }: PropertyToggleProps) {
  return <SwitchField label={label} checked={checked} onChange={onChange} helperText={helperText} disabled={disabled} className={className} />;
}
