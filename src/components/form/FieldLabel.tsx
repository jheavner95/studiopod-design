import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RequiredIndicator } from "./RequiredIndicator";

interface FieldLabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

/** A field's label, with a consistent required asterisk — the piece TextInput/Select/etc. already render internally, exposed standalone for fields (Combobox, Date Picker, File Upload) that don't have a built-in label slot. */
export function FieldLabel({ children, htmlFor, required = false, className }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn("text-body-sm font-medium text-ink-primary", className)}>
      {children}
      {required ? <RequiredIndicator /> : null}
    </label>
  );
}
