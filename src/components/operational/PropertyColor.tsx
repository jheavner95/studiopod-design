"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PropertyColorProps {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/**
 * A color property editor — a native color swatch paired with its hex text
 * value. Foundation Forms has no color field yet (confirmed: no ColorField
 * exists alongside InputField/SelectField/SwitchField), so this is built
 * fresh from TextInput's own visual language rather than reusing a
 * primitive that doesn't exist — a genuine gap this package surfaces
 * rather than silently working around.
 */
export function PropertyColor({ label, value, onChange, error, disabled, className }: PropertyColorProps) {
  const id = useId();
  const helperId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-body-sm font-medium text-ink-primary">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="size-9 shrink-0 cursor-pointer rounded-md border border-border bg-surface p-1 disabled:cursor-not-allowed disabled:opacity-40"
        />
        <input
          type="text"
          value={value}
          disabled={disabled}
          aria-describedby={helperId}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 rounded-md border border-border bg-surface px-3 py-2 text-body-sm text-ink-primary outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] focus-visible:ring-2 focus-visible:ring-accent-500/30 disabled:cursor-not-allowed disabled:opacity-40"
        />
      </div>
      {error ? (
        <p id={helperId} className="text-caption text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
