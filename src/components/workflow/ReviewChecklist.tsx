import type { ReactNode, ChangeEvent } from "react";
import { Stack } from "@/components/layout";
import { CheckboxField } from "@/components/form";

export interface ReviewChecklistItem {
  id: string;
  label: ReactNode;
  checked: boolean;
  required?: boolean;
  helperText?: ReactNode;
}

interface ReviewChecklistProps {
  items: ReviewChecklistItem[];
  onToggle: (id: string, checked: boolean) => void;
  className?: string;
}

/**
 * A checklist of review items — arranges Foundation Forms' own
 * CheckboxField per item, the same "arrange existing fields, no new input
 * primitive" pattern PropertyEditor and FormRow already establish, rather
 * than a bespoke checkbox-list component.
 */
export function ReviewChecklist({ items, onToggle, className }: ReviewChecklistProps) {
  return (
    <Stack gap="sm" className={className}>
      {items.map((item) => (
        <CheckboxField
          key={item.id}
          label={item.label}
          checked={item.checked}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onToggle(item.id, event.target.checked)}
          required={item.required}
          helperText={item.helperText}
        />
      ))}
    </Stack>
  );
}
