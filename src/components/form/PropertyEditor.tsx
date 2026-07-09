import type { ReactNode } from "react";
import { FormRow } from "./FormRow";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import { SwitchField } from "./SwitchField";
import type { SelectOption } from "@/components/ui";

export type PropertyEditorField =
  | { id: string; type: "text"; label: string; value: string; onChange: (value: string) => void; required?: boolean; error?: string }
  | { id: string; type: "select"; label: string; value: string; onChange: (value: string) => void; options: SelectOption[]; required?: boolean; error?: string }
  | { id: string; type: "switch"; label: string; value: boolean; onChange: (value: boolean) => void };

interface PropertyEditorProps {
  fields: PropertyEditorField[];
  columns?: 1 | 2 | 3;
  className?: string;
}

function renderField(field: PropertyEditorField): ReactNode {
  switch (field.type) {
    case "text":
      return <InputField label={field.label} value={field.value} onChange={(e) => field.onChange(e.target.value)} required={field.required} error={field.error} />;
    case "select":
      return (
        <SelectField
          label={field.label}
          value={field.value}
          options={field.options}
          onChange={(e) => field.onChange(e.target.value)}
          required={field.required}
          error={field.error}
        />
      );
    case "switch":
      return <SwitchField label={field.label} checked={field.value} onChange={field.onChange} />;
    default:
      return null;
  }
}

/**
 * A structured key/value editing grid — the read/write counterpart to
 * DS-0.2's own Property Editor gap ("a FieldGroup.tsx-adjacent building
 * block, but no dedicated component"), and to Foundation Metadata's
 * read-only PropertyGroup. Every field is controlled by the caller —
 * PropertyEditor arranges, it doesn't own state.
 */
export function PropertyEditor({ fields, columns = 2, className }: PropertyEditorProps) {
  return (
    <FormRow columns={columns} className={className}>
      {fields.map((field) => (
        <div key={field.id}>{renderField(field)}</div>
      ))}
    </FormRow>
  );
}
