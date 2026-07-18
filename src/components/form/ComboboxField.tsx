"use client";

import { useId, type ReactNode } from "react";
import { Stack } from "@/components/layout";
import { Combobox, type ComboboxOption } from "@/components/ui/Combobox";
import { RequiredIndicator } from "./RequiredIndicator";
import { FieldError } from "./FieldError";

export type { ComboboxOption };

interface ComboboxFieldProps {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * A real, working typeahead — searches options as you type, with
 * Arrow/Enter/Escape keyboard support and the ARIA combobox pattern
 * (role="combobox" + a role="listbox" popup).
 *
 * DS-5M: the typeahead itself now lives in the bare `Combobox` control; this
 * field tier only adds the label, description, and accessibly-announced error
 * message — no duplicated keyboard or listbox logic.
 */
export function ComboboxField({
  label,
  description,
  helperText,
  error,
  required = false,
  options,
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  id,
}: ComboboxFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const messageId = error || helperText ? `${fieldId}-message` : undefined;

  return (
    <Stack gap="xs" className={className}>
      {description ? <p className="text-caption text-ink-tertiary">{description}</p> : null}
      {label ? (
        <label htmlFor={fieldId} className="text-body-sm font-medium text-ink-primary">
          {label}
          {required ? <RequiredIndicator /> : null}
        </label>
      ) : null}

      <Combobox
        id={fieldId}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        status={error ? "error" : "default"}
        describedBy={messageId}
      />

      {error ? (
        <FieldError id={messageId}>{error}</FieldError>
      ) : helperText ? (
        <p id={messageId} className="text-caption text-ink-tertiary">
          {helperText}
        </p>
      ) : null}
    </Stack>
  );
}
